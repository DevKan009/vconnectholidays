import { contactInfo } from '../data/content'
import { tripName } from '../data/destinations'

export function bookLink(d) {
  return `/contact?destination=${d.slug}`
}

export function whatsappLink(d) {
  const text = d ? `Hi, I'm interested in ${tripName(d)}` : "Hi, I'd like to plan a holiday"
  return `https://wa.me/91${contactInfo.whatsapp}?text=${encodeURIComponent(text)}`
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
