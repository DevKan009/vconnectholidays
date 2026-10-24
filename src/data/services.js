import { FaHotel, FaPlane, FaPassport, FaSimCard, FaShieldHalved, FaPeopleGroup } from 'react-icons/fa6'
import { contactLink } from '../utils/enquiry'

// Single source for everything the agency sells besides packages: the Services
// page, the header dropdown, the Home strip and site search all read this.
// `comingSoon` hard-codes the Coming Soon badge (Group Tours for now).

export const HOTELS_ONLY_LINE = 'Even if you need only hotels for your travel, we are open to do the hotels also.'

export const ONLY_HEADLINE = 'Only need a hotel? We do that too.'
export const ONLY_SUPPORT =
  'No package required. Book just the hotel, just the flight, just the visa or insurance, with the same expert care and 24/7 support.'

export const services = [
  {
    id: 'hotels',
    title: 'Hotels',
    icon: FaHotel,
    summary: 'Handpicked stays from boutique villas to city hotels, at rates we negotiate for you.',
    quote: HOTELS_ONLY_LINE,
    onlyLine: 'Only need a hotel? We do that too.',
    chip: 'Only hotels',
    to: contactLink({ service: 'hotels' }),
  },
  {
    id: 'flights',
    title: 'Flights',
    icon: FaPlane,
    summary: 'Domestic and international tickets with sensible routings and fare alerts from our team.',
    onlyLine: 'Just the flights? We do that too.',
    chip: 'Only flights',
    to: contactLink({ service: 'flights' }),
  },
  {
    id: 'visa',
    title: 'Visa & E-Visa',
    icon: FaPassport,
    summary: 'Document checklists, form filling and appointments for 90+ countries, done right the first time.',
    onlyLine: 'Only the visa? We do that too.',
    chip: 'Only visa',
    to: '/visa',
    links: [
      { label: 'E-Visa', to: '/visa/e-visa' },
      { label: 'Visa', to: '/visa/embassy-visa' },
    ],
  },
  {
    id: 'sim',
    title: 'International SIM Cards',
    icon: FaSimCard,
    summary: 'Stay connected from the moment you land, with data plans for the countries you visit.',
    onlyLine: 'Just a SIM card? We do that too.',
    chip: 'Only a SIM',
    to: contactLink({ service: 'sim' }),
  },
  {
    id: 'insurance',
    title: 'Travel Insurance',
    icon: FaShieldHalved,
    summary: 'Medical, baggage and trip-delay cover that meets visa rules such as the Schengen minimum.',
    onlyLine: 'Only insurance? We do that too.',
    chip: 'Only insurance',
    to: contactLink({ service: 'insurance' }),
  },
  {
    id: 'group-tours',
    title: 'Group Tours',
    icon: FaPeopleGroup,
    summary: 'Fixed-departure trips with like-minded travellers, planned end to end by VConnect.',
    onlyLine: 'Travelling as a group? Talk to us.',
    to: '/group-tours',
    comingSoon: true,
  },
]

export const getService = (id) => services.find((s) => s.id === id)

// "What do you need?" chips on the Contact form. `?service=` values map onto these ids.
export const enquiryOptions = [
  { id: 'package', label: 'Full holiday package' },
  { id: 'hotels', label: 'Hotels only' },
  { id: 'flights', label: 'Flights only' },
  { id: 'visa', label: 'Visa' },
  { id: 'insurance', label: 'Travel insurance' },
  { id: 'sim', label: 'SIM card' },
  { id: 'group-tours', label: 'Group tour' },
]

const SERVICE_ALIASES = { 'e-visa': 'visa', 'embassy-visa': 'visa', tour: 'package', holiday: 'package' }

export function enquiryOptionFor(param) {
  if (!param) return null
  const id = SERVICE_ALIASES[param] ?? param
  return enquiryOptions.some((o) => o.id === id) ? id : null
}
