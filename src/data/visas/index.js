// Visa content, extracted from the reference site and cleaned by
// scripts/normalize-visa-data.mjs (see docs/visa-content-changelog.md).
// Re-run that script instead of editing the JSON by hand.

import eVisas from './eVisas.json'
import embassyVisas from './embassyVisas.json'
import { destinationsByRegion } from '../destinations'

export const VISA_KINDS = {
  'e-visa': {
    id: 'e-visa',
    path: '/visa/e-visa',
    label: 'E-Visa',
    crumb: 'E-Visa',
    tagline: 'Apply online, no embassy visit',
    list: eVisas,
  },
  visa: {
    id: 'visa',
    path: '/visa/embassy-visa',
    label: 'Visa',
    crumb: 'Embassy visa',
    tagline: 'Embassy / sticker visa',
    list: embassyVisas,
  },
}

export const visaPath = (v) => `${VISA_KINDS[v.kind].path}/${v.slug}`

export const visasByKind = (kind) => VISA_KINDS[kind]?.list ?? []

export const getVisa = (kind, slug) => visasByKind(kind).find((v) => v.slug === slug)

export const allVisas = [...eVisas, ...embassyVisas]

export function searchVisas(query, list = allVisas) {
  const q = query.trim().toLowerCase()
  if (!q) return list
  return list.filter((v) => v.name.toLowerCase().includes(q) || v.slug.includes(q.replace(/\s+/g, '-')))
}

export const flagUrl = (iso, width = 80) => (iso ? `https://flagcdn.com/w${width}/${iso}.png` : null)

// Schengen checklist: the cleaned France page is the most complete member list
// on the reference site, so it stands in for the shared Schengen requirements.
export const SCHENGEN_SOURCE_SLUG = 'france'

export const schengenMembers = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France',
  'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'Switzerland',
]

export function schengenChecklist() {
  const source = getVisa('visa', SCHENGEN_SOURCE_SLUG)
  if (!source) return []
  return source.sections
    .filter((s) => ['Tourist', 'Business', 'Family Visit'].includes(s.title))
    .map((s) => ({
      ...s,
      // France's own portal and sponsor form become their generic Schengen equivalents.
      items: s.items.map((t) =>
        t
          .replace(/\(\s*https:\/\/france-visas\.gouv\.fr\/?\s*\)/, '(on the portal of the country you apply to)')
          .replace(/\[Attestation d'accueil\]/i, "(the host country's invitation / sponsorship form)"),
      ),
    }))
}

// A holiday package for the same country, for the cross-sell on visa pages.
const COUNTRY_ALIASES = { uae: 'UAE', indonesia: 'Indonesia', 'united-kingdom': 'United Kingdom', 'south-korea': 'South Korea' }

export function matchingDestination(v) {
  const name = COUNTRY_ALIASES[v.slug] ?? v.name
  return destinationsByRegion('international').find((d) => d.country.toLowerCase() === name.toLowerCase()) ?? null
}
