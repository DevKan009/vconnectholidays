// Sends enquiries and WhatsApp-click events to the Google Apps Script web app
// (scripts/apps-script/Code.gs), which stores them in a Google Sheet and emails
// the team. The body goes as text/plain so the browser skips the CORS
// preflight that Apps Script cannot answer.

const ENDPOINT = import.meta.env.VITE_LEADS_ENDPOINT
const TOKEN = import.meta.env.VITE_LEADS_TOKEN || ''

function sessionId() {
  try {
    let id = sessionStorage.getItem('vc_session')
    if (!id) {
      id = Math.random().toString(36).slice(2, 10)
      sessionStorage.setItem('vc_session', id)
    }
    return id
  } catch {
    return 'no-storage'
  }
}

function payload(type, fields) {
  return JSON.stringify({
    type,
    token: TOKEN,
    page: window.location.href,
    sessionId: sessionId(),
    ...fields,
  })
}

export async function submitLead(fields) {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) console.warn('VITE_LEADS_ENDPOINT is not set; enquiry not sent.', fields)
    return { ok: false, message: 'Our enquiry form is temporarily unavailable.' }
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: payload('enquiry', fields),
    })
    const data = await res.json().catch(() => ({}))
    return data.ok ? { ok: true } : { ok: false, message: data.error || 'Something went wrong.' }
  } catch {
    return { ok: false, message: 'We could not reach our server.' }
  }
}

// One log per page per session; repeat clicks are counted by the Sheet only once.
export function logWhatsAppClick(item) {
  if (!ENDPOINT) return
  const key = `vc_wa:${window.location.pathname}:${item}`
  try {
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
  } catch {
    // storage blocked: send anyway
  }
  const body = payload('whatsapp_click', { item, referrer: document.referrer, botcheck: '' })
  const blob = new Blob([body], { type: 'text/plain;charset=utf-8' })
  if (!navigator.sendBeacon?.(ENDPOINT, blob)) {
    fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' } }).catch(() => {})
  }
}
