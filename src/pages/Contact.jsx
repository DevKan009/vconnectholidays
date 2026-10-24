import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { PAGE_META } from '../data/seo'
import PageBanner from '../components/PageBanner'
import { FaLocationDot, FaEnvelope, FaPhone, FaFacebookF, FaXTwitter, FaYoutube, FaTelegram, FaInstagram, FaWhatsapp, FaCircleCheck } from 'react-icons/fa6'
import { contactInfo } from '../data/content'
import { getDestination, tripName } from '../data/destinations'
import { enquiryOptions, enquiryOptionFor, HOTELS_ONLY_LINE } from '../data/services'
import { whatsappTextLink, track } from '../utils/enquiry'
import { submitLead } from '../utils/leads'
import bannerImg from '../assets/images/page-banner-default.jpg'
import './Contact.css'

const SOCIALS = [
  { icon: FaFacebookF, label: 'Facebook' },
  { icon: FaXTwitter, label: 'Twitter' },
  { icon: FaYoutube, label: 'Youtube' },
  { icon: FaTelegram, label: 'Telegram-plane' },
  { icon: FaInstagram, label: 'Instagram' },
]

// Extra fields shown for the services that need them; values go into `details`.
const EXTRA_FIELDS = {
  visa: [
    { name: 'visaCountry', label: 'Visa for which country?', placeholder: 'e.g. France', fromParam: 'country' },
    { name: 'travelMonth', label: 'Travel month', type: 'month' },
  ],
  'group-tours': [
    { name: 'groupSize', label: 'Group size', type: 'number', placeholder: 'How many travellers?', min: 2 },
    { name: 'preferredMonth', label: 'Preferred month', type: 'month' },
    { name: 'groupDestination', label: 'Destination interest', placeholder: 'Where would you like to go?' },
  ],
  hotels: [
    { name: 'hotelCity', label: 'Hotel city', placeholder: 'e.g. Dubai' },
    { name: 'hotelDates', label: 'Check-in / check-out', placeholder: 'e.g. 12–16 Dec' },
  ],
  flights: [
    { name: 'flightRoute', label: 'Route', placeholder: 'e.g. Indore → Bangkok' },
    { name: 'flightDates', label: 'Travel dates', placeholder: 'e.g. 12 Dec, return 18 Dec' },
  ],
}

const titleCase = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

function contextBanner(service, country) {
  if (service === 'hotels') return { title: 'Enquiring about: Hotels', text: HOTELS_ONLY_LINE }
  if (service === 'group-tours')
    return { title: 'Group Tours', soon: true, text: "Register your interest and we'll tell you first when departures open." }
  if (service === 'visa')
    return { title: `Enquiring about: ${country ? `${titleCase(country)} visa` : 'Visa'}`, text: 'Only the visa? We do that too.' }
  const label = enquiryOptions.find((o) => o.id === service)?.label
  return label && service !== 'package' ? { title: `Enquiring about: ${label}`, text: 'No package required. We do that too.' } : null
}

export default function Contact() {
  usePageTitle(PAGE_META['/contact'])
  const [params] = useSearchParams()
  const chosen = getDestination(params.get('destination') || '')
  const destinationValue = chosen ? tripName(chosen) : params.get('destination') || ''
  const serviceParam = enquiryOptionFor(params.get('service'))
  const countryParam = params.get('country') || ''

  const [selected, setSelected] = useState(() => new Set(serviceParam ? [serviceParam] : chosen ? ['package'] : []))
  const [status, setStatus] = useState({ state: 'idle' })

  const banner = contextBanner(serviceParam, countryParam)
  const extras = [...selected].flatMap((id) => EXTRA_FIELDS[id] ?? [])
  const showDestination = selected.size === 0 || selected.has('package')

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function collect(form) {
    const data = new FormData(form)
    const details = {}
    for (const f of extras) {
      const v = String(data.get(f.name) || '').trim()
      if (v) details[f.label] = v
    }
    const labels = enquiryOptions.filter((o) => selected.has(o.id)).map((o) => o.label)
    return {
      services: labels.length ? labels : ['General enquiry'],
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      destination: String(data.get('destination') || '').trim(),
      country: details['Visa for which country?'] || '',
      details,
      message: String(data.get('message') || '').trim(),
      botcheck: String(data.get('botcheck') || ''),
    }
  }

  function whatsappSummary(lead) {
    const lines = [
      `Hi VConnect, I'm ${lead.name}.`,
      `I need: ${lead.services.join(', ')}`,
      lead.destination && `Destination: ${lead.destination}`,
      ...Object.entries(lead.details).map(([k, v]) => `${k}: ${v}`),
      lead.message && `Message: ${lead.message}`,
      `Phone: ${lead.phone}`,
    ]
    return lines.filter(Boolean).join('\n')
  }

  async function send(form, channel) {
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    const lead = collect(form)
    // Open WhatsApp inside the click so popup blockers allow it, then log the lead.
    if (channel === 'whatsapp') window.open(whatsappTextLink(whatsappSummary(lead)), '_blank', 'noopener')
    setStatus({ state: 'sending' })
    track('enquiry_submit', { channel, services: lead.services.join('|') })
    const res = await submitLead({ ...lead, channel })
    if (res.ok) {
      setStatus({ state: 'success', name: lead.name, email: lead.email, channel })
      form.reset()
    } else if (channel === 'whatsapp') {
      // The visitor already reached us on WhatsApp; don't show them an error.
      setStatus({ state: 'success', name: lead.name, channel })
      form.reset()
    } else {
      setStatus({ state: 'error', message: res.message })
    }
  }

  return (
    <>
      <PageBanner title="Contact" image={bannerImg} />

      <section className="section">
        <div className={`container contact-grid ${serviceParam ? 'contact-grid--focus' : ''}`.trim()}>
          <div className="contact-intro">
            <h2>
              Start Your Travel Story With Us, Don&rsquo;t Hesitate To <span className="accent">Contact Us</span>
            </h2>
            <p>
              Got questions about your next trip, need itinerary advice, or want help with bookings? Our travel
              experts are ready to assist. Whether you&rsquo;re planning a relaxing getaway or an
              adrenaline-filled adventure, we&rsquo;re just a message away!
            </p>

            <ul className="contact-details">
              <li>
                <span className="contact-details__icon"><FaLocationDot /></span>
                <div>
                  <strong>Office Address</strong>
                  <span>{contactInfo.address}</span>
                </div>
              </li>
              <li>
                <span className="contact-details__icon"><FaEnvelope /></span>
                <div>
                  <strong>Email Address</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {contactInfo.emails.map((email) => (
                      <a key={email} href={`mailto:${email}`}>{email}</a>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <span className="contact-details__icon"><FaPhone /></span>
                <div>
                  <strong>Office Phone Numbers</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                    {contactInfo.phones.map((phone, idx) => (
                      <span key={phone} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {idx > 0 && <span style={{ marginRight: '8px', opacity: 0.4 }}>|</span>}
                        <a href={`tel:+91${phone}`}>+91 {phone}</a>
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </ul>

            <div className="contact-socials">
              <span>Follow Us On :</span>
              <div>
                {SOCIALS.map(({ icon: Icon, label }) => (
                  <a key={label} href="#top" aria-label={label}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {status.state === 'success' ? (
            <div className="contact-form contact-success" role="status">
              <FaCircleCheck className="contact-success__icon" aria-hidden="true" />
              <h3>Thanks {status.name}, we&rsquo;ve got it.</h3>
              <p>
                Our travel expert will call you within 2 working hours (Mon&ndash;Sat, 10am&ndash;7pm).
                {status.email && status.channel === 'email' && <> A confirmation is on its way to {status.email}.</>}
              </p>
              <button type="button" className="btn btn--outline-dark" onClick={() => setStatus({ state: 'idle' })}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              noValidate
              onSubmit={(e) => {
                e.preventDefault()
                send(e.currentTarget, 'email')
              }}
            >
              {banner && (
                <div className="contact-context">
                  <strong>
                    {banner.title}
                    {banner.soon && <span className="badge-soon">Coming soon</span>}
                  </strong>
                  <span>{banner.text}</span>
                </div>
              )}

              <fieldset className="contact-needs">
                <legend>What do you need?</legend>
                <div className="contact-needs__chips">
                  {enquiryOptions.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`chip ${selected.has(o.id) ? 'is-selected' : ''}`}
                      aria-pressed={selected.has(o.id)}
                      onClick={() => toggle(o.id)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="contact-form__row">
                <label>
                  Full Name
                  <input type="text" name="name" required autoComplete="name" placeholder="Your name" />
                </label>
                <label>
                  Phone Number
                  <input type="tel" name="phone" required autoComplete="tel" pattern="[0-9+\s\-]{8,}" placeholder="Your phone number" />
                </label>
              </div>
              <div className="contact-form__row">
                <label>
                  Email Address
                  <input type="email" name="email" required autoComplete="email" placeholder="you@example.com" />
                </label>
                {showDestination && (
                  <label>
                    Destination
                    <input
                      key={destinationValue}
                      type="text"
                      name="destination"
                      defaultValue={destinationValue}
                      placeholder="Where do you want to go?"
                    />
                  </label>
                )}
              </div>

              {extras.length > 0 && (
                <div className="contact-form__row contact-form__row--extras">
                  {extras.map((f) => (
                    <label key={f.name}>
                      {f.label}
                      <input
                        type={f.type || 'text'}
                        name={f.name}
                        min={f.min}
                        placeholder={f.placeholder}
                        defaultValue={f.fromParam && countryParam ? titleCase(countryParam) : undefined}
                      />
                    </label>
                  ))}
                </div>
              )}

              <label>
                Message <span className="contact-form__optional">(optional)</span>
                <textarea name="message" rows="4" placeholder="Anything else we should know?" />
              </label>

              {/* Honeypot: hidden from people, filled in by bots. */}
              <input type="text" name="botcheck" className="contact-form__hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="contact-form__actions">
                <button type="submit" className="btn btn--dark" disabled={status.state === 'sending'}>
                  {status.state === 'sending' ? 'Sending…' : 'Send Enquiry'}
                </button>
                <button
                  type="button"
                  className="btn btn--whatsapp"
                  disabled={status.state === 'sending'}
                  onClick={(e) => send(e.currentTarget.form, 'whatsapp')}
                >
                  <FaWhatsapp aria-hidden="true" />
                  <span>Send on WhatsApp</span>
                </button>
              </div>
              <p className="contact-form__consent">
                By sending, you agree we may contact you about this enquiry by phone, email or WhatsApp. See our{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>.
              </p>

              {status.state === 'error' && (
                <p className="contact-form__status contact-form__status--error" role="alert">
                  {status.message} Please message us on{' '}
                  <a href={whatsappTextLink("Hi, I'd like to make an enquiry")} target="_blank" rel="noreferrer">WhatsApp</a> or call{' '}
                  <a href={`tel:+91${contactInfo.phones[0]}`}>+91 {contactInfo.phones[0]}</a>.
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  )
}
