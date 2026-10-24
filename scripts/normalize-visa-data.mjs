// Turns scripts/out/raw-visas.json (from extract-visa-data.mjs) into the
// site's visa data, and logs every dropped or corrected line so the client
// can review what changed against the reference site.
//
//   node scripts/normalize-visa-data.mjs
//     -> src/data/visas/eVisas.json, src/data/visas/embassyVisas.json
//     -> scripts/out/visa-changes.json (feeds docs/visa-content-changelog.md)

import { readFile, writeFile, mkdir } from 'node:fs/promises'

const raw = JSON.parse(await readFile(new URL('./out/raw-visas.json', import.meta.url), 'utf8'))

// ---------------------------------------------------------------------------
// Reference data

const SLUG_FIX = { crotia: 'croatia', saudia: 'saudi-arabia', dubai: 'uae' }
const NAME_FIX = {
  croatia: 'Croatia',
  'saudi-arabia': 'Saudi Arabia',
  uae: 'Dubai (UAE)',
  'east-africa': 'East Africa',
  'guinea-bissau': 'Guinea-Bissau',
  usa: 'USA',
  'united-kingdom': 'United Kingdom',
}

// ISO 3166-1 alpha-2 codes for flags (flagcdn.com).
const ISO = {
  armenia: 'am', australia: 'au', azerbaijan: 'az', bahrain: 'bh', cambodia: 'kh', uae: 'ae',
  ethiopia: 'et', egypt: 'eg', 'east-africa': 'ke', georgia: 'ge', 'guinea-bissau': 'gw',
  'hong-kong': 'hk', indonesia: 'id', kyrgyzstan: 'kg', kenya: 'ke', malaysia: 'my', morocco: 'ma',
  myanmar: 'mm', 'new-zealand': 'nz', oman: 'om', qatar: 'qa', rwanda: 'rw', 'saudi-arabia': 'sa',
  singapore: 'sg', 'south-africa': 'za', 'sri-lanka': 'lk', thailand: 'th', tanzania: 'tz',
  tajikistan: 'tj', taiwan: 'tw', turkey: 'tr', uganda: 'ug', uzbekistan: 'uz', vietnam: 'vn',
  zambia: 'zm', argentina: 'ar', austria: 'at', bangladesh: 'bd', belgium: 'be', brazil: 'br',
  canada: 'ca', china: 'cn', 'costa-rica': 'cr', croatia: 'hr', cyprus: 'cy', denmark: 'dk',
  estonia: 'ee', finland: 'fi', france: 'fr', germany: 'de', ghana: 'gh', greece: 'gr', haiti: 'ht',
  hungary: 'hu', iran: 'ir', ireland: 'ie', israel: 'il', italy: 'it', japan: 'jp', kuwait: 'kw',
  luxembourg: 'lu', madagascar: 'mg', malta: 'mt', mauritius: 'mu', netherlands: 'nl', norway: 'no',
  panama: 'pa', poland: 'pl', portugal: 'pt', russia: 'ru', slovenia: 'si', 'south-korea': 'kr',
  spain: 'es', sweden: 'se', switzerland: 'ch', ukraine: 'ua', 'united-kingdom': 'gb', usa: 'us',
  yemen: 'ye',
}

export const SCHENGEN = new Set([
  'austria', 'belgium', 'croatia', 'denmark', 'estonia', 'finland', 'france', 'germany', 'greece',
  'hungary', 'italy', 'luxembourg', 'malta', 'netherlands', 'norway', 'poland', 'portugal',
  'slovenia', 'spain', 'sweden', 'switzerland',
])

// Currencies that changed after the reference pages were written.
const CURRENCY_FIX = {
  croatia: { to: 'Euro', why: 'Croatia replaced the kuna with the euro on 1 January 2023', source: 'europa' },
  cyprus: { to: 'Euro', why: 'Cyprus has used the euro since 1 January 2008 (reference said "Cypriot Poun")', source: 'europa' },
}

// Why each COVID-era line was dropped, keyed by country (falls back to schengen/default).
const COVID_SOURCE = {
  schengen: 'EU Council recommendation lifting all COVID-19 travel restrictions from 22 Dec 2022 (https://data.consilium.europa.eu/doc/document/ST-6159-2022-INIT/en/pdf); Schengen states had dropped vaccination proof by Oct 2022 (https://news.gtp.gr/2022/12/14/eu-calls-on-member-states-to-lift-all-covid-19-travel-restrictions/)',
  switzerland: 'Swiss Federal Council: all COVID-19 entry restrictions lifted from 2 May 2022 (https://www.admin.ch/en/nsb?id=88604)',
  usa: 'Presidential Proclamation 10575: COVID-19 vaccination requirement for non-US air travellers ended 12 May 2023 (https://www.nafsa.org/regulatory-information/covid-vaccine-and-test-requirements-us-entry)',
  china: 'China removed all COVID-19 pre-entry testing for inbound travellers from 30 Aug 2023 (https://english.beijing.gov.cn/latest/news/202308/t20230831_3238696.html)',
  israel: 'Israel dropped vaccination (1 Mar 2022) and all remaining COVID entry rules (21 May 2022) (https://www.itij.com/latest/news/israel-remove-covid-vaccination-requirements-tourists)',
  'sri-lanka': 'Sri Lanka lifted vaccination, testing and quarantine rules for arrivals on 7 Dec 2022 (https://www.adaderana.lk/news/86652/sri-lanka-scraps-covid-vaccination-negative-test-requirement-on-overseas-arrivals)',
  malaysia: 'Malaysia removed all COVID-19 entry requirements regardless of vaccination status on 1 Aug 2022 (https://travelweekly.co.uk/all-content/malaysia-removes-all-covid-entry-requirements)',
  uae: 'UAE ended all COVID-19 entry restrictions on 7 Nov 2022 (https://www.insubuy.com/united-arab-emirates-ends-covid-entry-requirements/); visa products are now sold with standard travel insurance',
}

const SCHENGEN_INSURANCE =
  'Travel medical insurance with at least €30,000 cover, valid in all Schengen countries for the whole stay'
const SCHENGEN_INSURANCE_SOURCE =
  'Schengen Visa Code (Reg. 810/2009) Art. 15: minimum €30,000 travel medical insurance valid across the Schengen area (https://www.mzv.cz/newdelhi/en/ko/visa_information/schengen_visa_up_to_90_days/travel_medical_insurance.html)'
const BIOMETRICS =
  'Applicants must give fingerprints in person at VFS, unless they gave them for a Schengen visa in the last 59 months'
const BIOMETRICS_SOURCE =
  'EU Visa Information System: fingerprints can be reused for 59 months (https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy/applying-schengen-visa_en)'

// Word-level corrections. Each hit is logged as "corrected".
const FIXES = [
  [/\bPpt\b/gi, 'passport'],
  [/\bpaxs\b/gi, 'applicants'],
  [/\bpax\b/gi, 'applicant'],
  [/\bpassenger(s)?\b/gi, 'applicant$1'],
  [/\bOrg\.?(?=\s)/g, 'Original'],
  [/\bdully\b/gi, 'duly'],
  [/\btrvl\b/gi, 'travel'],
  [/\btkt\b/gi, 'ticket'],
  [/\byrs\b/gi, 'years'],
  [/\byr\b/gi, 'year'],
  [/\bappl form\b/gi, 'application form'],
  [/\bxerox copy\b/gi, 'photocopy'],
  [/\bxerox\b/gi, 'photocopy'],
  [/\blatter ?head\b/gi, 'letterhead'],
  [/\bcovering latter\b/gi, 'covering letter'],
  [/\borignal\b/gi, 'original'],
  [/\borg\b(?= bank)/gi, 'original'],
  [/\bstmnt\b/gi, 'statement'],
  [/\bprsnl\b/gi, 'personal'],
  [/\bappilicant\b/gi, 'applicant'],
  [/\basseseement\b/gi, 'assessment'],
  [/\battendbusiness\b/gi, 'attend business'],
  [/\bbbusiness\b/gi, 'business'],
  [/\bbooing\b/gi, 'booking'],
  [/\bcatd\b/gi, 'card'],
  [/\bconfirm ?tkt\b/gi, 'confirmed ticket'],
  [/\beligiblity\b/gi, 'eligibility'],
  [/\benployer\b/gi, 'employer'],
  [/\bfform\b/gi, 'form'],
  [/\binall\b/gi, 'in all'],
  [/\binsurence\b/gi, 'insurance'],
  [/\blangugae\b/gi, 'language'],
  [/\bnationalplease\b/gi, 'national. Please'],
  [/\bnmbr\b/gi, 'number'],
  [/\bpasspor\b|\bpassposrt\b/gi, 'passport'],
  [/\bperfom\b/gi, 'perform'],
  [/\bpermitte\b/gi, 'permit'],
  [/\bstampand\b/gi, 'stamp and'],
  [/\bticke\b|\btickects\b/gi, 'tickets'],
  [/\btransalate\b/gi, 'translate'],
  [/\btravell\b/gi, 'travel'],
  [/\bvaliditya\b/gi, 'validity. A'],
  [/\bapostile\b/gi, 'apostille'],
  [/\baadhar\b/gi, 'Aadhaar'],
  [/\bod passport\b/gi, 'old passport'],
  [/\bAttached from details\b/gi, 'Attached form details'],
  [/\bsupposed? to be reflect\b/gi, 'should reflect'],
  [/\bwhose signing\b/gi, 'who is signing'],
  [/\b1 lac\b/gi, '1 lakh'],
  [/\bTax paper of invite\b/gi, 'Tax papers of invitee'],
  [/\bAM Property paper\b/g, 'Property papers'],
  [/\(?Dummy will do\)?/gi, '(a provisional booking is fine)'],
  [/\s*List of Insurance is mentioned below/gi, ''],
  [/\s*Kindly mail us for further details/gi, ''],
  [/\bmail us\b/gi, 'send it to us'],
  [/\bitenary\b/gi, 'itinerary'],
  [/\bBookin\b/g, 'Booking'],
  [/\bProccessing\b/gi, 'Processing'],
  [/\bGURANTEE\b/gi, 'guarantee'],
  [/\bMULTIPLY ENTRY\b/gi, 'multiple entry'],
  [/\bPls\b/gi, 'Please'],
  [/\batleast\b/gi, 'at least'],
  [/\bUpto\b/gi, 'Up to'],
  [/\bI\.?\s?T\.?\s?papers?\b/gi, 'income tax returns (ITR)'],
  [/\bIT papers?\b/g, 'income tax returns (ITR)'],
  [/\bN O C\b/g, 'NOC'],
  [/\bAttestation Di Accuel\b/gi, "Attestation d'accueil"],
  [/\bletter head\b/gi, 'letterhead'],
  [/\bcertificated\b/gi, 'certificate'],
  [/\bhighest degree copy it travelling\b/gi, 'highest degree copy if travelling'],
  [/\bit travelling first time\b/gi, 'if travelling for the first time'],
  [/\bSchengan\b/gi, 'Schengen'],
  [/\bpasssport\b/gi, 'passport'],
  [/\bbirth certificated\b/gi, 'birth certificate'],
  [/\brecidence\b/gi, 'residence'],
  [/\bseperate\b/gi, 'separate'],
  [/\brecieve\b/gi, 'receive'],
  [/\bacommodation\b/gi, 'accommodation'],
  [/\bsponser\b/gi, 'sponsor'],
]

// ---------------------------------------------------------------------------
// Change log

const log = {}
const note = (slug, kind, entry) => ((log[slug] ??= { dropped: [], corrected: [], factChecked: [] })[kind].push(entry))

// ---------------------------------------------------------------------------
// Text helpers

const tidy = (s) =>
  s
    .replace(/ /g, ' ')
    .replace(/[`’]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/^\s*(?:[•\-–]|\d{1,2}[.)](?!\d))\s*/, '')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/([,;:])(?=[A-Za-z(])/g, '$1 ')
    .replace(/(https?): \/\//g, '$1://')
    .replace(/[\s,;]+$/, '')
    .replace(/\.$/, '')
    .replace(/\b0(\d)\b/g, '$1')
    .trim()

function sentenceCase(s) {
  const letters = s.replace(/[^A-Za-z]/g, '')
  if (letters.length > 6 && letters === letters.toUpperCase()) {
    s = s.toLowerCase().replace(/\b(usd|uk|usa|vfs|id|pan|itr|noc|uae|eu)\b/g, (m) => m.toUpperCase())
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function fix(slug, text) {
  let out = tidy(text)
  const before = out
  for (const [re, to] of FIXES) out = out.replace(re, to)
  out = sentenceCase(out)
  if (out !== sentenceCase(before)) note(slug, 'corrected', { from: before, to: out })
  return out
}

const splitBullets = (s) => s.split(/•|•/).map((x) => x.trim()).filter(Boolean)

const isFee = (s) =>
  !/card to pay/i.test(s) && /\b(fees?|charges?)\b/i.test(s) && (/\d/.test(s) || /refund|pay online/i.test(s))
const isCovid = (s) => /covishield|covaxin|2nd dose|both doses|covid|booster|fully vaccinated|vaccine certificate|\bpcr\b|quarantin|level 0?[o1] hotel|helloagain/i.test(s)
const isCovidInsurance = (s) => /insurance with covid/i.test(s) && !/covid coverage/i.test(s)

// ---------------------------------------------------------------------------
// Section titles

function sectionTitle(heading, kind) {
  const h = heading.replace(/\s+/g, ' ').trim()
  const types = [
    'Super Transit', 'Family Visit', 'Tourist', 'Business', 'Transit', 'Honeymoon', 'Student', 'Work',
    'Employment', 'Dependent', 'Religious', 'Family', 'Umrah', 'Single Entry',
  ]
  for (const t of types) if (new RegExp(`\\b${t}\\b`, 'i').test(h)) return t
  if (/state border/i.test(h)) return 'At the border'
  if (/additional/i.test(h)) return 'Additional requirements'
  if (/employment \/ business proof/i.test(h)) return 'Employment / business proof'
  if (/basic/i.test(h)) return 'Basic requirements'
  if (/^Indian passport/i.test(h)) return 'Online application'
  return kind === 'e-visa' ? 'E-Visa' : 'Visa'
}

const sectionId = (title) => title.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')

// ---------------------------------------------------------------------------
// Facts

function parseFactLine(facts, line) {
  const m = line.match(/^(processing time|time taken|working days|stay period|duration of stay|validity|valid|entry|entries)\s*[:–—-]\s*(.+)$/i)
  if (!m) return false
  const key = m[1].toLowerCase()
  const value = sentenceCase(tidy(m[2]))
  if (/processing|time taken|working days/.test(key)) facts.processing ??= value
  else if (/stay/.test(key)) facts.stay ??= value
  else if (/valid/.test(key)) facts.validity ??= value
  else if (/entr/.test(key)) facts.entries ??= value
  return true
}

// "Upto 90 Days" -> "Up to 90 days", "10 - 15 Working Days" -> "10–15 working days"
function cleanDuration(v) {
  const m = v?.match(/(up ?to\s*)?(\d+)\s*(?:-|–|to)?\s*(\d+)?\s*(day|month|year)s?/i)
  if (!m) return v
  const n = m[3] ? `${m[2]}–${m[3]}` : m[2]
  return `${m[1] ? 'Up to ' : ''}${n} ${m[4].toLowerCase()}${m[3] || m[2] !== '1' ? 's' : ''}`
}

function cleanProcessing(v) {
  const m = v?.match(/(\d+)\s*(?:-|–|to)?\s*(\d+)?\s*(working\s*)?(day|hour)s?/i)
  if (!m) return v
  const n = m[2] ? `${m[1]}–${m[2]}` : m[1]
  const unit = m[4].toLowerCase() + (m[2] || m[1] !== '1' ? 's' : '')
  return `${n} ${m[3] ? 'working ' : ''}${unit}${/after (the )?interview/i.test(v) ? ' after interview' : ''}`
}

// Bullets split mid-sentence on the reference pages ("…the" / "Document must prove…").
function mergeBroken(slug, items) {
  const out = []
  for (const item of items) {
    const prev = out[out.length - 1]
    const open = prev && (prev.split('(').length > prev.split(')').length || /\b(the|and|of|to|with|for)$/i.test(prev))
    if (prev && (open || /^so translate\b/i.test(item))) {
      const joined = `${prev} ${item.charAt(0).toLowerCase()}${item.slice(1)}`
      note(slug, 'corrected', { from: `${prev} | ${item}`, to: joined, why: 'One requirement was split across two bullets' })
      out[out.length - 1] = joined
    } else out.push(item)
  }
  return out
}

const isDuration = (s) => /\b(day|days|month|months|year|years)\b/i.test(s) && !/working/i.test(s)
const isProcessing = (s) => /working|hours?\b/i.test(s)

// ---------------------------------------------------------------------------
// Record normaliser

function normalise(rec, kind) {
  const base = rec.slug.replace(/-e-visa$|-visa$/, '')
  const slug = SLUG_FIX[base] ?? base
  const fields = rec.fields
  const titleField = fields.find((f) => f.kind === 'string' && f.value.trim())
  const name =
    NAME_FIX[slug] ??
    titleField.value.replace(/\s*(e-visa|visa)\s*$/i, '').trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

  const out = {
    slug,
    name,
    kind,
    iso: ISO[slug] ?? null,
    schengen: kind === 'visa' && SCHENGEN.has(slug),
    embassy: [],
    notes: [],
    sections: [],
    options: [],
    facts: {},
    currency: null,
  }

  let pendingHeading = null
  let seenSection = false
  const tail = []

  const takeItems = (blocks, sink, notes) => {
    for (const b of blocks) {
      const lines = b.list ?? splitBullets(b.p ?? b.h ?? '')
      const asNote = !b.list && lines.length === 1
      for (const line of lines) {
        if (!tidy(line)) continue
        if (isFee(line)) {
          note(slug, 'dropped', { text: tidy(line), why: 'Fee or price (site shows "Fees on request")' })
          continue
        }
        if (isCovidInsurance(line)) {
          const to = sentenceCase(tidy(line.replace(/with covid insurance/i, '')))
          note(slug, 'factChecked', { text: tidy(line), result: `Kept as "${to}" (COVID wording removed)`, source: COVID_SOURCE[slug] })
          sink.push(to)
          continue
        }
        if (/insurance with covid coverage/i.test(line)) {
          const to = out.schengen ? SCHENGEN_INSURANCE : 'Travel medical insurance for the whole stay'
          note(slug, 'factChecked', { text: tidy(line), result: `Replaced with "${to}"`, source: out.schengen ? SCHENGEN_INSURANCE_SOURCE : COVID_SOURCE[slug] })
          sink.push(to)
          continue
        }
        if (isCovid(line)) {
          // Biometrics notes are glued onto COVID lines on several Schengen pages.
          if (/biometric/i.test(line)) {
            note(slug, 'factChecked', { text: tidy(line), result: `COVID part dropped; biometrics rule kept as "${BIOMETRICS}"`, source: `${COVID_SOURCE[slug] ?? COVID_SOURCE.schengen}; ${BIOMETRICS_SOURCE}` })
            ;(notes ?? sink).push(BIOMETRICS)
          } else {
            note(slug, 'dropped', { text: tidy(line), why: 'COVID-era rule, no longer applies', source: COVID_SOURCE[slug] ?? (out.schengen ? COVID_SOURCE.schengen : 'See country entry') })
          }
          continue
        }
        if (/biometric/i.test(line) && out.schengen) {
          note(slug, 'factChecked', { text: tidy(line), result: `Kept as "${BIOMETRICS}"`, source: BIOMETRICS_SOURCE })
          ;(notes ?? sink).push(BIOMETRICS)
          continue
        }
        const text = fix(slug, line)
        if (!text) continue
        if (asNote && notes && /^(please|kindly|note|for |if |we |issued|indian passport holders)/i.test(text)) notes.push(text)
        else sink.push(text)
      }
    }
  }

  for (const f of fields) {
    if (f === titleField) continue
    if (f.kind === 'string') {
      const v = f.value.trim()
      if (!v) continue
      if (/currency/i.test(v)) {
        out.currency = tidy(v.split(/[=:]/).pop())
        continue
      }
      if (seenSection && !/requirement|visa|processing|charges|time|employment|additional|border|indian passport|guarantee/i.test(v) && v.length < 30) {
        tail.push(v)
        continue
      }
      pendingHeading = v
      continue
    }
    // rich text
    if (!pendingHeading && !seenSection) {
      // Embassy / VFS block right under the title.
      let label = ''
      for (const b of f.value) {
        const t = b.p ?? b.h
        if (!t) continue
        if (/^australian high commission accept/i.test(t)) {
          note(slug, 'dropped', { text: tidy(t), why: 'Internal agent note about which passports their Mumbai desk accepts' })
          continue
        }
        if (/^(please|kindly|we have|for vietnam|note)/i.test(t)) {
          out.notes.push(fix(slug, t))
          continue
        }
        const line = tidy(t).replace(/^[:\s]+/, '')
        // "VFS:" / "VFS Address:" sit on their own line above the address they label.
        if (/^(vfs( address| application centre| global.*)?|consulate address)\s*:?$/i.test(line)) {
          label = line.replace(/:$/, '')
          continue
        }
        out.embassy.push((label ? `${label}: ` : '') + line.replace(/(?<=\S)\s*(Phone|Tel|Fax)\b/g, ' · $1'))
        label = ''
      }
      continue
    }
    const heading = pendingHeading ?? ''
    pendingHeading = null
    seenSection = true

    if (/processing|visa info|charges/i.test(heading)) {
      for (const b of f.value) {
        for (const line of b.list ?? splitBullets(b.p ?? b.h ?? '')) {
          const t = tidy(line)
          if (!t) continue
          if (isFee(t)) {
            note(slug, 'dropped', { text: t, why: 'Fee or price (site shows "Fees on request")' })
            continue
          }
          if (parseFactLine(out.facts, t)) continue
          const valid = t.match(/valid for (\d+\s*\w+)/i)
          if (valid) {
            out.facts.validity ??= valid[1]
            continue
          }
          const stay = t.match(/duration of stay\s*:?\s*(.+)/i)
          if (stay) {
            out.facts.stay ??= stay[1]
            continue
          }
          if (/^(tourist|business) visa( \(.*\))?$/i.test(t)) continue
          if (/working day|days? after/i.test(t) && !out.facts.processing) out.facts.processing = sentenceCase(t.replace(/^(e visa processing time taken|visa time taken|pls note it takes|please note it takes)\s*:?\s*/i, ''))
          else if (/(short term|long term)/i.test(t)) continue
          else if (isDuration(t) && !out.facts.stay) out.facts.stay = sentenceCase(t)
          else if (t.length > 3) out.notes.push(fix(slug, t))
        }
      }
      continue
    }

    if (/guarantee|gurantee/i.test(heading)) {
      takeItems(f.value, out.options)
      continue
    }

    const title = sectionTitle(heading, kind)
    let section = out.sections.find((s) => s.title === title)
    if (!section) {
      section = { id: sectionId(title), title, items: [], notes: [] }
      out.sections.push(section)
    }
    takeItems(f.value, section.items, section.notes)
  }

  // Trailing "Visa Info" strings: duration then processing (either may be NA).
  for (const v of tail) {
    const t = tidy(v)
    if (/^na$/i.test(t)) continue
    if (isProcessing(t)) out.facts.processing ??= sentenceCase(t)
    else if (isDuration(t) || /^\d+$/.test(t)) out.facts.stay ??= sentenceCase(/^\d+$/.test(t) ? `${t} days` : t)
  }

  if (CURRENCY_FIX[slug] && out.currency !== CURRENCY_FIX[slug].to) {
    note(slug, 'corrected', { from: `Currency: ${out.currency}`, to: `Currency: ${CURRENCY_FIX[slug].to}`, why: CURRENCY_FIX[slug].why })
    out.currency = CURRENCY_FIX[slug].to
  }
  if (out.currency) out.currency = sentenceCase(out.currency)

  if (out.facts.processing) out.facts.processing = cleanProcessing(out.facts.processing)
  for (const k of ['stay', 'validity']) if (out.facts[k]) out.facts[k] = sentenceCase(cleanDuration(out.facts[k]))

  // De-duplicate items inside each section and drop empty sections.
  for (const s of out.sections) {
    s.items = [...new Set(mergeBroken(slug, s.items))]
    s.notes = [...new Set(s.notes)]
  }
  out.sections = out.sections.filter((s) => s.items.length || s.notes.length)
  out.notes = [...new Set(out.notes)]
  return out
}

const eVisas = raw.eVisa.map((r) => normalise(r, 'e-visa'))
const visas = raw.visa.map((r) => normalise(r, 'visa'))

// Per-country editorial overrides live in ./visa-overrides.mjs so this file stays generic.
const { applyOverrides } = await import('./visa-overrides.mjs')
applyOverrides({ eVisas, visas, note })

const byName = (a, b) => a.name.localeCompare(b.name)
await mkdir(new URL('../src/data/visas/', import.meta.url), { recursive: true })
await writeFile(new URL('../src/data/visas/eVisas.json', import.meta.url), JSON.stringify(eVisas.sort(byName), null, 2) + '\n')
await writeFile(new URL('../src/data/visas/embassyVisas.json', import.meta.url), JSON.stringify(visas.sort(byName), null, 2) + '\n')
await writeFile(new URL('./out/visa-changes.json', import.meta.url), JSON.stringify(log, null, 2))

const count = (k) => Object.values(log).reduce((n, c) => n + c[k].length, 0)

// Human-readable change log for the client.
const names = Object.fromEntries([...eVisas, ...visas].map((v) => [v.slug, v.name]))
const md = [
  '# Visa content change log',
  '',
  `Source: ${raw.source} (extracted ${raw.fetchedAt.slice(0, 10)}). Generated by \`scripts/normalize-visa-data.mjs\`; do not edit by hand.`,
  '',
  `**Totals:** ${count('dropped')} lines dropped, ${count('corrected')} lines corrected, ${count('factChecked')} lines fact-checked and kept in updated form.`,
  '',
  '## Rules applied everywhere (not listed per line)',
  '',
  '- Bullet symbols, list numbering ("11.", "•"), trailing commas and full stops removed; ALL-CAPS lines set in sentence case.',
  '- Leading zeros dropped ("03 months" → "3 months").',
  '- Agent shorthand expanded: ppt → passport, pax → applicant, Org → Original, IT papers → income tax returns (ITR), tkt → ticket, trvl → travel, yrs → years.',
  '- **Fees removed** from every page: the site shows "Fees on request" (the reference figures are B2B agent rates).',
  '- Visa-facts strip values tidied ("Upto 90 Days" → "Up to 90 days", "10 - 15 Working Days" → "10–15 working days").',
  '- Schengen and other European pages that asked for "insurance with COVID coverage" now state the standing Schengen rule (€30,000 travel medical insurance).',
  '',
  'The short visa facts on the holiday destination pages were checked separately: see `docs/destination-visa-facts.md`.',
  '',
  '## By country',
  '',
]
for (const slug of Object.keys(log).sort((a, b) => (names[a] ?? a).localeCompare(names[b] ?? b))) {
  const c = log[slug]
  md.push(`### ${names[slug] ?? slug}`, '')
  if (c.dropped.length) {
    md.push('**Dropped**', '')
    for (const d of c.dropped) md.push(`- "${d.text}" — ${d.why}${d.source ? `. Source: ${d.source}` : ''}`)
    md.push('')
  }
  if (c.factChecked.length) {
    md.push('**Fact-checked**', '')
    for (const d of c.factChecked) md.push(`- "${d.text}" → ${d.result}. Source: ${d.source}`)
    md.push('')
  }
  if (c.corrected.length) {
    md.push('**Corrected**', '')
    for (const d of c.corrected) md.push(`- "${d.from}" → "${d.to}"${d.why ? ` (${d.why})` : ''}`)
    md.push('')
  }
}
await mkdir(new URL('../docs/', import.meta.url), { recursive: true })
await writeFile(new URL('../docs/visa-content-changelog.md', import.meta.url), md.join('\n'))
console.log(`${eVisas.length} e-visas, ${visas.length} visas. dropped ${count('dropped')}, corrected ${count('corrected')}, fact-checked ${count('factChecked')}`)
