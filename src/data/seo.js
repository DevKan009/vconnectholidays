// Page titles and descriptions in one place. The pages use these through
// usePageTitle, and scripts/prerender-meta.mjs bakes the same values into each
// route's HTML at build time, so link previews (WhatsApp, Facebook, LinkedIn)
// and crawlers see them without running JavaScript.
//
// Keep this file free of data imports: it is part of the main bundle.

export const SITE_URL = 'https://vconnectholidays.com'
export const SITE_NAME = 'Vconnect Holidays'
export const HOME_TITLE = `${SITE_NAME} – Holidays | Airtickets | Visas | Honeymoon trips`
export const DEFAULT_DESCRIPTION =
  'VConnect Holidays - Holidays | Airtickets | Visas | Honeymoon trips. Trusted travel specialists crafting bespoke domestic and international vacations since 2018.'
export const DEFAULT_OG_IMAGE = '/og-default.jpg'

export const formatTitle = (title) => (title ? `${title} – ${SITE_NAME}` : HOME_TITLE)

export const PAGE_META = {
  '/': { title: null, description: DEFAULT_DESCRIPTION },
  '/about': {
    title: 'About Us',
    description:
      'Meet VConnect Holidays, Indore: travel specialists since 2018 led by Vanita Jain, planning bespoke domestic and international holidays with 24/7 on-trip support.',
  },
  '/destinations': {
    title: 'Destination List',
    description:
      'All 40 international and domestic destinations planned by VConnect Holidays, Indore: Dubai, Thailand, Bali, Kashmir, Kerala, Goa and more.',
  },
  '/tour-packages': {
    title: 'International Tour Packages',
    description:
      'International holiday packages to Dubai, Thailand, Bali, Singapore, Maldives, Europe and more, with visas handled by VConnect Holidays, Indore.',
  },
  '/tour-packages?region=domestic': {
    title: 'Domestic Tour Packages',
    description:
      'Domestic holiday packages across India, from Kashmir and Kerala to Goa and the Andamans, planned by VConnect Holidays, Indore.',
  },
  '/services': {
    title: 'Our Services',
    description:
      'Hotels, flights, visas and e-visas, international SIM cards and travel insurance from VConnect Holidays, Indore. Book a single service or the full trip.',
  },
  '/group-tours': {
    title: 'Group Tours (Coming Soon)',
    description:
      'VConnect Holidays group tours are coming soon: fixed-departure trips with a tour manager. Register your interest or plan a private group trip today.',
  },
  '/visa': {
    title: 'Visa & E-Visa Services',
    description:
      'E-visa and embassy visa assistance from VConnect Holidays, Indore: document checklists, forms and appointments for 90+ countries.',
  },
  '/visa/required-documents': {
    title: 'Visa Required Documents',
    description: 'Visa and e-visa document checklists for Indian passport holders, by country, from VConnect Holidays, Indore.',
  },
  '/visa/required-documents/schengen': {
    title: 'Schengen Visa Required Documents',
    description:
      'Schengen visa document checklist for Indian passport holders: tourist, business and family visit. One visa for 29 European countries.',
  },
  '/contact': {
    title: 'Contact',
    description:
      'Contact VConnect Holidays, Vijay Nagar, Indore. Enquire about holidays, hotels, flights, visas or insurance by form, phone or WhatsApp.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'How VConnect Holidays collects, uses and protects the details you share through this website.',
  },
}

export const destinationMeta = (d) => ({
  title: `${d.place} Tour Packages, ${d.country}`,
  description: `${d.place} (${d.country}) holiday packages from Indore by VConnect Holidays. ${d.summary}`,
})

export const visaListMeta = (kind, count) =>
  kind === 'e-visa'
    ? {
        title: 'E-Visa Countries',
        description: `E-visa assistance for ${count} countries from VConnect Holidays, Indore. Document lists and processing times.`,
      }
    : {
        title: 'Visa Countries',
        description: `Embassy visa assistance for ${count} countries from VConnect Holidays, Indore. Document checklists, VFS appointments and processing times.`,
      }

export const visaMeta = (v, label) => ({
  title: `${v.name} ${label}`,
  description: `${v.name} ${label.toLowerCase()} for Indian passport holders: required documents, processing time and help from VConnect Holidays, Indore.`,
})
