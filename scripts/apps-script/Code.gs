/**
 * VConnect Holidays — lead capture web app (Google Apps Script, V8).
 *
 * Bound to the leads Google Sheet. The website POSTs `text/plain` JSON to the
 * deployed /exec URL (no CORS preflight) and logs WhatsApp clicks with
 * navigator.sendBeacon. Every request that passes validation becomes a Sheet
 * row; emails are best-effort and are skipped (never fatal) when the free
 * MailApp quota runs out.
 *
 * Script Properties (Project Settings → Script properties):
 *   SITE_TOKEN     shared token the site sends with every request (required)
 *   NOTIFY_EMAILS  comma-separated agency inboxes for new-lead alerts (required)
 *   SHEET_ID       optional; only needed if the script is NOT bound to the Sheet
 *
 * See README.md in this folder for deployment steps.
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BRAND = {
  name: 'VConnect Holidays',
  dark: '#141414',
  gold: '#cea521',
  ink: '#2b2b2b',
  muted: '#6b6b6b',
  paper: '#f6f4ef',
  replyTo: 'vanita@vconnectholidays.com',
  website: 'https://vconnectholidays.com',
  whatsapp: '919098686133',
  phones: ['9098686133', '6263346650', '9399090152', '6264268858'],
  address: '408, Apollo Premier, Vijay Nagar Square, Indore',
};

const CALLBACK_PROMISE = 'within 2 working hours (Mon–Sat, 10am–7pm)';
const TIMEZONE = 'Asia/Kolkata';

const SHEETS = {
  enquiries: {
    name: 'Enquiries',
    headers: ['Timestamp', 'Services', 'Name', 'Email', 'Phone', 'Country', 'Destination', 'Details', 'Message', 'Channel', 'Page', 'Session'],
  },
  whatsapp: {
    name: 'WhatsApp Clicks',
    headers: ['Timestamp', 'Page', 'Item', 'Referrer', 'Session'],
  },
};

const LIMITS = {
  sessionRequests: 10,        // max requests per session ...
  sessionWindowSec: 10 * 60,  // ... in this window
  globalRequests: 150,        // max requests across all visitors in the same window
  waDedupeSec: 6 * 60 * 60,   // one agency email per session+page for WhatsApp clicks
  lockWaitMs: 20000,
  maxConfirmLog: 400,         // confirmation-dedupe entries kept per day
};

// "What happens on the call" lines, picked by matching the chosen services.
// Order matters: the first few matches are used. Keeps hotel-only or
// flight-only leads from getting holiday-package wording.
const SERVICE_NEXT_STEPS = [
  { match: /holiday|package|tour|honeymoon|itinerar|trip|group/i, text: 'shape a day-by-day itinerary around your dates and budget' },
  { match: /hotel|stay|resort|accommodation/i, text: 'shortlist hotels that match your dates, location and budget' },
  { match: /flight|air|ticket/i, text: 'compare fares and routings for your travel dates' },
  { match: /visa|passport/i, text: 'walk you through the visa documents and timelines' },
  { match: /cab|car|taxi|transfer|transport|bus|train/i, text: 'plan your transfers and local travel' },
  { match: /insurance/i, text: 'recommend travel insurance that suits your trip' },
  { match: /forex|currency/i, text: 'sort out your forex needs' },
  { match: /cruise/i, text: 'go through cruise options and cabins' },
];
const DEFAULT_NEXT_STEP = 'go through your requirements and share the best options';

// ---------------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------------

function doGet() {
  return json_({ ok: true, service: 'vconnect-leads', time: new Date().toISOString() });
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '');
  } catch (err) {
    return json_({ ok: false, error: 'bad_json' });
  }
  if (!data || typeof data !== 'object') return json_({ ok: false, error: 'bad_json' });

  // Honeypot: real visitors never fill this field.
  if (str_(data.botcheck, 200)) return json_({ ok: false, error: 'rejected' });

  const props = PropertiesService.getScriptProperties();
  const siteToken = props.getProperty('SITE_TOKEN');
  if (!siteToken) return json_({ ok: false, error: 'not_configured' });
  if (str_(data.token, 200) !== siteToken) return json_({ ok: false, error: 'unauthorized' });

  try {
    if (data.type === 'enquiry') return json_(handleEnquiry_(data));
    if (data.type === 'whatsapp_click') return json_(handleWhatsAppClick_(data));
    return json_({ ok: false, error: 'unknown_type' });
  } catch (err) {
    console.error('doPost failed', err && err.stack ? err.stack : err);
    return json_({ ok: false, error: 'server_error' });
  }
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

function handleEnquiry_(data) {
  const lead = normaliseEnquiry_(data);
  if (!lead.name || (!lead.phone && !lead.email)) return { ok: false, error: 'missing_fields' };

  let sendConfirmation = false;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(LIMITS.lockWaitMs)) return { ok: false, error: 'busy' };
  try {
    if (isThrottled_(lead.sessionId)) return { ok: false, error: 'rate_limited' };
    const sheet = getSheet_(SHEETS.enquiries);
    sheet.appendRow([
      new Date(),
      lead.services.join(', '),
      lead.name,
      lead.email,
      lead.phone,
      lead.country,
      lead.destination,
      lead.details.map(function (d) { return d[0] + ': ' + d[1]; }).join('\n'),
      lead.message,
      lead.channel,
      lead.page,
      lead.sessionId,
    ].map(cell_));
    SpreadsheetApp.flush();
    // Claim today's confirmation slot while we hold the lock so two quick
    // submissions from the same address can't both send one.
    sendConfirmation = isEmail_(lead.email) && claimConfirmation_(lead.email);
  } finally {
    lock.releaseLock();
  }

  // Row is saved — emails below are best-effort.
  const emails = { agency: false, visitor: false };
  try {
    emails.agency = sendAgencyEnquiryEmail_(lead);
  } catch (err) {
    console.error('Agency enquiry email failed', err);
  }
  // Only promise a call-back if the agency was actually alerted.
  if (sendConfirmation && emails.agency) {
    try {
      emails.visitor = sendVisitorConfirmation_(lead);
    } catch (err) {
      console.error('Visitor confirmation failed', err);
    }
  }
  if (sendConfirmation && !emails.visitor) releaseConfirmation_(lead.email);
  return { ok: true, emails: emails };
}

function handleWhatsAppClick_(data) {
  const click = {
    page: str_(data.page, 300),
    item: str_(data.item, 200),
    referrer: str_(data.referrer, 500),
    sessionId: str_(data.sessionId, 100),
  };

  const cache = CacheService.getScriptCache();
  const key = 'wa:' + hash_((click.sessionId || 'anon') + '|' + click.page);
  let shouldEmail = false;

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(LIMITS.lockWaitMs)) return { ok: false, error: 'busy' };
  try {
    if (isThrottled_(click.sessionId)) return { ok: false, error: 'rate_limited' };
    getSheet_(SHEETS.whatsapp).appendRow([new Date(), click.page, click.item, click.referrer, click.sessionId].map(cell_));
    SpreadsheetApp.flush();
    // Claim the session+page email slot under the lock so parallel beacons
    // can't both send.
    if (!cache.get(key)) {
      cache.put(key, '1', LIMITS.waDedupeSec);
      shouldEmail = true;
    }
  } finally {
    lock.releaseLock();
  }

  let emailed = false;
  if (shouldEmail) {
    try {
      emailed = sendAgencyWhatsAppEmail_(click);
    } catch (err) {
      console.error('WhatsApp click email failed', err);
    }
    if (!emailed) cache.remove(key);
  }
  return { ok: true, emailed: emailed };
}

// ---------------------------------------------------------------------------
// Emails
// ---------------------------------------------------------------------------

function sendAgencyEnquiryEmail_(lead) {
  const to = notifyEmails_();
  if (!to.length || !hasQuota_(to.length)) return false;

  const servicesText = lead.services.length ? lead.services.join(', ') : 'General enquiry';
  const phoneDigits = waNumber_(lead.phone, lead.country);
  const waText = 'Hi ' + lead.name + ', this is ' + BRAND.name + ' regarding your enquiry for ' + servicesText + '.';

  const rows = [
    ['Services', esc_(servicesText)],
    ['Name', esc_(lead.name)],
    ['Phone', lead.phone
      ? esc_(lead.phone) + (phoneDigits
        ? ' &nbsp;·&nbsp; <a href="tel:+' + phoneDigits + '" style="color:' + BRAND.gold + ';">Call</a>' +
          ' &nbsp;·&nbsp; <a href="https://wa.me/' + phoneDigits + '?text=' + encodeURIComponent(waText) + '" style="color:' + BRAND.gold + ';">WhatsApp</a>'
        : '')
      : '—'],
    ['Email', isEmail_(lead.email) ? '<a href="mailto:' + esc_(lead.email) + '" style="color:' + BRAND.gold + ';">' + esc_(lead.email) + '</a>' : esc_(lead.email || '—')],
    ['Country', esc_(lead.country || '—')],
    ['Destination', esc_(lead.destination || '—')],
  ];
  lead.details.forEach(function (d) { rows.push([esc_(d[0]), esc_(d[1])]); });
  rows.push(['Message', lead.message ? nl2br_(esc_(lead.message)) : '—']);
  rows.push(['Preferred channel', esc_(lead.channel || '—')]);
  rows.push(['Page', esc_(lead.page || '—')]);
  rows.push(['Received', esc_(nowText_())]);

  const html = layout_(
    'New enquiry',
    '<p style="margin:0 0 16px;font-size:15px;">A new enquiry just came in from the website. Call back ' + esc_(CALLBACK_PROMISE) + '.</p>' +
    table_(rows),
    'Saved to the "' + SHEETS.enquiries.name + '" sheet.'
  );

  const options = {
    to: to.join(','),
    subject: oneLine_('New enquiry: ' + servicesText + ' – ' + lead.name, 200),
    htmlBody: html,
    body: plainRows_(rows),
    name: BRAND.name + ' Website',
  };
  if (isEmail_(lead.email)) options.replyTo = lead.email;
  MailApp.sendEmail(options);
  return true;
}

function sendVisitorConfirmation_(lead) {
  if (!hasQuota_(1)) return false;

  const firstName = lead.name.split(/\s+/)[0];
  const servicesText = listText_(lead.services) || 'your trip';
  const waText = 'Hi ' + BRAND.name + ', I just sent an enquiry for ' + servicesText + '. My name is ' + lead.name + '.';
  const waUrl = 'https://wa.me/' + BRAND.whatsapp + '?text=' + encodeURIComponent(waText);

  const callLine = lead.phone
    ? 'Our travel expert will call you on <strong>' + esc_(lead.phone) + '</strong> ' + esc_(CALLBACK_PROMISE) + '.'
    : 'Our travel expert will get back to you by email ' + esc_(CALLBACK_PROMISE) + '.';
  const callLineText = lead.phone
    ? 'Our travel expert will call you on ' + lead.phone + ' ' + CALLBACK_PROMISE + '.'
    : 'Our travel expert will get back to you by email ' + CALLBACK_PROMISE + '.';
  const nextSteps = 'On the call we’ll ' + listText_(nextStepsFor_(lead.services)) + '.';

  const summary = [['Services', esc_(listText_(lead.services) || '—')], ['Name', esc_(lead.name)]];
  if (lead.phone) summary.push(['Phone', esc_(lead.phone)]);
  summary.push(['Email', esc_(lead.email)]);
  if (lead.country) summary.push(['Country', esc_(lead.country)]);
  if (lead.destination) summary.push(['Destination', esc_(lead.destination)]);
  lead.details.forEach(function (d) { summary.push([esc_(d[0]), esc_(d[1])]); });
  if (lead.message) summary.push(['Your message', nl2br_(esc_(lead.message))]);

  const phonesHtml = BRAND.phones.map(function (p) {
    return '<a href="tel:+91' + p + '" style="color:' + BRAND.ink + ';text-decoration:none;">' + p + '</a>';
  }).join(' &nbsp;|&nbsp; ');

  const body =
    '<p style="margin:0 0 12px;font-size:16px;">Hi ' + esc_(firstName) + ',</p>' +
    '<p style="margin:0 0 12px;font-size:15px;line-height:1.6;">Thank you for reaching out — we’ve received your enquiry for <strong>' + esc_(servicesText) + '</strong>.</p>' +
    '<p style="margin:0 0 12px;font-size:15px;line-height:1.6;">' + callLine + ' ' + esc_(nextSteps) + '</p>' +
    (lead.channel === 'whatsapp'
      ? '<p style="margin:0 0 12px;font-size:15px;line-height:1.6;">You chose WhatsApp, so we may message you there too.</p>'
      : '') +
    '<p style="margin:0 0 20px;font-size:15px;line-height:1.6;">Can’t wait? Message us on WhatsApp and we’ll pick it up right away.</p>' +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr><td style="background:' + BRAND.gold + ';border-radius:6px;">' +
    '<a href="' + esc_(waUrl) + '" style="display:inline-block;padding:12px 22px;color:' + BRAND.dark + ';font-weight:bold;font-size:15px;text-decoration:none;">Chat with us on WhatsApp</a>' +
    '</td></tr></table>' +
    '<p style="margin:0 0 8px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:' + BRAND.muted + ';">What you sent us</p>' +
    table_(summary) +
    '<p style="margin:24px 0 4px;font-size:14px;line-height:1.6;">Warm regards,<br><strong>Team ' + esc_(BRAND.name) + '</strong></p>';

  const footer =
    '<div style="margin-bottom:6px;">Call us: ' + phonesHtml + '</div>' +
    '<div>' + esc_(BRAND.address) + '</div>';

  const text = [
    'Hi ' + firstName + ',',
    '',
    'Thank you for reaching out — we’ve received your enquiry for ' + servicesText + '.',
    callLineText + ' ' + nextSteps,
    '',
    'Chat with us on WhatsApp: ' + waUrl,
    '',
    'What you sent us:',
    plainRows_(summary),
    '',
    'Warm regards,',
    'Team ' + BRAND.name,
    'Call us: ' + BRAND.phones.join(', '),
    BRAND.address,
  ].join('\n');

  MailApp.sendEmail({
    to: lead.email,
    subject: oneLine_('We’ve received your enquiry for ' + servicesText + ' – ' + BRAND.name, 200),
    htmlBody: layout_('Enquiry received', body, footer),
    body: text,
    name: BRAND.name,
    replyTo: BRAND.replyTo,
  });
  return true;
}

function sendAgencyWhatsAppEmail_(click) {
  const to = notifyEmails_();
  if (!to.length || !hasQuota_(to.length)) return false;

  const rows = [
    ['Page', esc_(click.page || '—')],
    ['Item', esc_(click.item || '—')],
    ['Referrer', esc_(click.referrer || '—')],
    ['Session', esc_(click.sessionId || '—')],
    ['Clicked', esc_(nowText_())],
  ];
  const html = layout_(
    'WhatsApp click',
    '<p style="margin:0 0 16px;font-size:15px;">A visitor tapped a WhatsApp button on the website. Watch the business WhatsApp for their message.</p>' +
    table_(rows),
    'Saved to the "' + SHEETS.whatsapp.name + '" sheet. Further clicks from this visitor on this page are not emailed for 6 hours.'
  );
  MailApp.sendEmail({
    to: to.join(','),
    subject: oneLine_('WhatsApp click: ' + (click.item || click.page || 'website'), 200),
    htmlBody: html,
    body: plainRows_(rows),
    name: BRAND.name + ' Website',
  });
  return true;
}

function layout_(heading, bodyHtml, footerHtml) {
  return '' +
    '<div style="margin:0;padding:24px 12px;background:' + BRAND.paper + ';font-family:Arial,Helvetica,sans-serif;color:' + BRAND.ink + ';">' +
    '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">' +
    '<tr><td style="background:' + BRAND.dark + ';padding:22px 28px;">' +
    '<div style="color:' + BRAND.gold + ';font-size:20px;font-weight:bold;letter-spacing:1px;">' + esc_(BRAND.name) + '</div>' +
    '<div style="color:#d9d9d9;font-size:13px;margin-top:4px;">' + esc_(heading) + '</div>' +
    '</td></tr>' +
    '<tr><td style="height:3px;background:' + BRAND.gold + ';"></td></tr>' +
    '<tr><td style="padding:28px;">' + bodyHtml + '</td></tr>' +
    '<tr><td style="padding:16px 28px;background:' + BRAND.paper + ';font-size:12px;line-height:1.6;color:' + BRAND.muted + ';">' + footerHtml + '</td></tr>' +
    '</table></div>';
}

// rows: [[labelHtml, valueHtml]] — both must already be escaped.
function table_(rows) {
  return '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:14px;">' +
    rows.map(function (r) {
      return '<tr>' +
        '<td style="padding:8px 12px 8px 0;border-bottom:1px solid #eee;color:' + BRAND.muted + ';vertical-align:top;width:34%;">' + r[0] + '</td>' +
        '<td style="padding:8px 0;border-bottom:1px solid #eee;vertical-align:top;">' + r[1] + '</td>' +
        '</tr>';
    }).join('') +
    '</table>';
}

function plainRows_(rows) {
  return rows.map(function (r) { return htmlToText_(r[0]) + ': ' + htmlToText_(r[1]); }).join('\n');
}

// ---------------------------------------------------------------------------
// Rate limiting, de-dupe and quota
// ---------------------------------------------------------------------------

// Fixed-window counters in CacheService; call while holding the script lock.
function isThrottled_(sessionId) {
  const cache = CacheService.getScriptCache();
  const sessionKey = 'rl:' + hash_(sessionId || 'anon');
  const globalOver = bump_(cache, 'rl:global', LIMITS.globalRequests);
  const sessionOver = bump_(cache, sessionKey, LIMITS.sessionRequests);
  return globalOver || sessionOver;
}

function bump_(cache, key, max) {
  const now = Date.now();
  let entry = null;
  try { entry = JSON.parse(cache.get(key) || 'null'); } catch (err) { entry = null; }
  if (!entry || now - entry.t >= LIMITS.sessionWindowSec * 1000) entry = { n: 0, t: now };
  entry.n += 1;
  const ttl = Math.max(1, Math.ceil((entry.t + LIMITS.sessionWindowSec * 1000 - now) / 1000));
  cache.put(key, JSON.stringify(entry), ttl);
  return entry.n > max;
}

// One visitor confirmation per email address per (IST) day. CacheService caps
// TTLs at 6h, so the day's list lives in a single Script Property instead.
function claimConfirmation_(email) {
  const props = PropertiesService.getScriptProperties();
  const log = readConfirmLog_(props);
  const h = hash_(email.toLowerCase());
  if (log.h.indexOf(h) !== -1) return false;
  log.h.push(h);
  if (log.h.length > LIMITS.maxConfirmLog) log.h = log.h.slice(-LIMITS.maxConfirmLog);
  props.setProperty('CONFIRM_LOG', JSON.stringify(log));
  return true;
}

function releaseConfirmation_(email) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(LIMITS.lockWaitMs)) return;
  try {
    const props = PropertiesService.getScriptProperties();
    const log = readConfirmLog_(props);
    const h = hash_(email.toLowerCase());
    log.h = log.h.filter(function (x) { return x !== h; });
    props.setProperty('CONFIRM_LOG', JSON.stringify(log));
  } finally {
    lock.releaseLock();
  }
}

function readConfirmLog_(props) {
  const today = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd');
  let log = null;
  try { log = JSON.parse(props.getProperty('CONFIRM_LOG') || 'null'); } catch (err) { log = null; }
  if (!log || log.d !== today || !Array.isArray(log.h)) log = { d: today, h: [] };
  return log;
}

function hasQuota_(recipients) {
  const left = MailApp.getRemainingDailyQuota();
  if (left < recipients) {
    console.warn('MailApp daily quota exhausted (' + left + ' left, need ' + recipients + '); email skipped, row kept.');
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Sheet helpers
// ---------------------------------------------------------------------------

function getSheet_(def) {
  const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  const ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(def.name);
  if (!sheet) sheet = ss.insertSheet(def.name);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, def.headers.length).setValues([def.headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Stop user text being interpreted as a formula (=, +, -, @) and keep
// leading "+" on phone numbers.
function cell_(v) {
  if (typeof v !== 'string') return v;
  return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

// ---------------------------------------------------------------------------
// Input normalisation
// ---------------------------------------------------------------------------

function normaliseEnquiry_(data) {
  let services = data.services;
  if (typeof services === 'string') services = services.split(',');
  if (!Array.isArray(services)) services = [];
  services = services.map(function (s) { return str_(s, 80); }).filter(Boolean).slice(0, 12);

  const details = [];
  if (data.details && typeof data.details === 'object' && !Array.isArray(data.details)) {
    Object.keys(data.details).slice(0, 40).forEach(function (k) {
      let v = data.details[k];
      if (Array.isArray(v)) v = v.join(', ');
      else if (v && typeof v === 'object') v = JSON.stringify(v);
      v = str_(v, 500);
      if (v) details.push([humanise_(str_(k, 60)), v]);
    });
  }

  const channel = str_(data.channel, 20).toLowerCase();
  return {
    services: services,
    name: oneLine_(str_(data.name, 120), 120),
    email: str_(data.email, 200).toLowerCase(),
    phone: str_(data.phone, 40),
    country: str_(data.country, 80),
    destination: str_(data.destination, 160),
    details: details,
    message: str_(data.message, 3000),
    channel: channel === 'whatsapp' || channel === 'email' ? channel : '',
    page: str_(data.page, 300),
    sessionId: str_(data.sessionId, 100),
  };
}

function nextStepsFor_(services) {
  const joined = services.join(' ');
  const steps = SERVICE_NEXT_STEPS.filter(function (s) { return s.match.test(joined); })
    .map(function (s) { return s.text; })
    .slice(0, 3);
  return steps.length ? steps : [DEFAULT_NEXT_STEP];
}

function notifyEmails_() {
  return (PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAILS') || '')
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(isEmail_);
}

// Digits for tel:/wa.me. Bare 10-digit numbers (or 0-prefixed) are assumed Indian.
function waNumber_(phone, country) {
  let d = String(phone || '').replace(/\D/g, '');
  if (!d) return '';
  if (/^00/.test(d)) d = d.slice(2);
  const india = !country || /india/i.test(country);
  if (d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
  if (d.length === 10 && india) d = '91' + d;
  return d.length >= 8 && d.length <= 15 ? d : '';
}

// ---------------------------------------------------------------------------
// Small utilities
// ---------------------------------------------------------------------------

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function str_(v, max) {
  if (v === null || v === undefined) return '';
  return String(v).trim().slice(0, max || 500);
}

function oneLine_(s, max) {
  return String(s || '').replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, max || 200);
}

function esc_(s) {
  return String(s === null || s === undefined ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br_(escaped) {
  return escaped.replace(/\r?\n/g, '<br>');
}

function htmlToText_(html) {
  return String(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function isEmail_(s) {
  return /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/.test(String(s || ''));
}

// "a", "a and b", "a, b and c"
function listText_(items) {
  if (!items.length) return '';
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
}

// "travelDate" / "travel_date" → "Travel date"
function humanise_(key) {
  const s = key.replace(/[_-]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Detail';
}

function hash_(s) {
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, String(s), Utilities.Charset.UTF_8));
}

function nowText_() {
  return Utilities.formatDate(new Date(), TIMEZONE, 'EEE d MMM yyyy, h:mm a') + ' IST';
}

// ---------------------------------------------------------------------------
// Manual helpers (run from the Apps Script editor)
// ---------------------------------------------------------------------------

/** Creates both tabs and triggers the authorisation prompt. Safe to re-run. */
function setup() {
  getSheet_(SHEETS.enquiries);
  getSheet_(SHEETS.whatsapp);
  const props = PropertiesService.getScriptProperties();
  ['SITE_TOKEN', 'NOTIFY_EMAILS'].forEach(function (k) {
    if (!props.getProperty(k)) console.warn('Script property ' + k + ' is not set.');
  });
  console.log('Setup done. Email quota left today: ' + MailApp.getRemainingDailyQuota());
}

/**
 * Sends a fake enquiry through doPost. The confirmation goes to the first
 * NOTIFY_EMAILS address so you can see what visitors receive (only once per
 * day per address — later runs still save the row and send the agency email).
 */
function testEnquiry() {
  const props = PropertiesService.getScriptProperties();
  const payload = {
    type: 'enquiry',
    token: props.getProperty('SITE_TOKEN'),
    botcheck: '',
    services: ['Hotels'],
    name: 'Test Visitor',
    email: notifyEmails_()[0] || '',
    phone: '9876543210',
    country: 'India',
    destination: 'Dubai',
    details: { checkIn: '2026-12-20', checkOut: '2026-12-24', rooms: 2, guests: '4 adults' },
    message: 'Test enquiry from testEnquiry() — please ignore.\n<b>HTML should appear escaped.</b>',
    channel: 'email',
    page: '/contact',
    sessionId: 'test-' + Date.now(),
  };
  const out = doPost({ postData: { contents: JSON.stringify(payload), type: 'text/plain' } });
  console.log(out.getContent());
}

/** Logs a fake WhatsApp click through doPost. */
function testWhatsAppClick() {
  const payload = {
    type: 'whatsapp_click',
    token: PropertiesService.getScriptProperties().getProperty('SITE_TOKEN'),
    botcheck: '',
    page: '/destinations/dubai',
    item: 'Floating WhatsApp button',
    referrer: 'https://www.google.com/',
    sessionId: 'test-' + Date.now(),
  };
  const out = doPost({ postData: { contents: JSON.stringify(payload), type: 'text/plain' } });
  console.log(out.getContent());
}
