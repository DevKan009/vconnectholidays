import { contactInfo } from '../data/content'
import { tripName } from '../data/destinations'

export function bookLink(d) {
  return `/contact?destination=${d.slug}`
}

export function whatsappLink(d) {
  const text = d ? `Hi, I'm interested in ${tripName(d)}` : "Hi, I'd like to plan a holiday"
  return `https://wa.me/91${contactInfo.whatsapp}?text=${encodeURIComponent(text)}`
}

export function whatsappTextLink(text) {
  return `https://wa.me/91${contactInfo.whatsapp}?text=${encodeURIComponent(text)}`
}

// /contact?service=hotels&country=france — Contact preselects what the visitor needs.
export function contactLink({ service, country, destination } = {}) {
  const p = new URLSearchParams()
  if (service) p.set('service', service)
  if (country) p.set('country', country)
  if (destination) p.set('destination', destination)
  const qs = p.toString()
  return qs ? `/contact?${qs}` : '/contact'
}

// Sends an event to Google Analytics / Tag Manager when either is installed.
// Without them this is a no-op, so it is safe to call everywhere.
export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params })
  }
}
