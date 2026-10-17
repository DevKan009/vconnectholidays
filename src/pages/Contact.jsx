import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import { FaLocationDot, FaEnvelope, FaPhone, FaFacebookF, FaXTwitter, FaYoutube, FaTelegram, FaInstagram } from 'react-icons/fa6'
import { contactInfo } from '../data/content'
import { getDestination, tripName } from '../data/destinations'
import bannerImg from '../assets/images/page-banner-default.jpg'
import './Contact.css'

const SOCIALS = [
  { icon: FaFacebookF, label: 'Facebook' },
  { icon: FaXTwitter, label: 'Twitter' },
  { icon: FaYoutube, label: 'Youtube' },
  { icon: FaTelegram, label: 'Telegram-plane' },
  { icon: FaInstagram, label: 'Instagram' },
]

export default function Contact() {
  usePageTitle('Contact')
  const [status, setStatus] = useState(null)
  const [params] = useSearchParams()
  const chosen = getDestination(params.get('destination') || '')
  const destinationValue = chosen ? tripName(chosen) : params.get('destination') || ''

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setStatus('success')
    form.reset()
  }

  return (
    <>
      <PageBanner title="Contact" image={bannerImg} />

      <section className="section">
        <div className="container contact-grid">
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

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <label>
                Full Name
                <input type="text" name="name" required placeholder="Your name" />
              </label>
              <label>
                Email Address
                <input type="email" name="email" required placeholder="you@example.com" />
              </label>
            </div>
            <div className="contact-form__row">
              <label>
                Phone Number
                <input type="tel" name="phone" placeholder="Your phone number" />
              </label>
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
            </div>
            <label>
              Message
              <textarea name="message" rows="5" required placeholder="Tell us about your dream trip" />
            </label>
            <button type="submit" className="btn btn--dark">
              Send Message
            </button>
            {status === 'success' && (
              <p className="contact-form__status">
                Thanks for reaching out! This is a front-end demo form, so no message was actually sent &mdash;
                please call or email us directly for a real response.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
