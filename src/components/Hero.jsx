import { useEffect, useRef, useState } from 'react'
import { FaPhone, FaEnvelope, FaWhatsapp, FaXmark } from 'react-icons/fa6'
import Button from './Button'
import { contactInfo } from '../data/content'
import heroRiga from '../assets/images/hero-riga.jpg'
import heroHeritage from '../assets/images/hero-heritage.jpg'
import heroNyc from '../assets/images/hero-nyc.jpg'
import './Hero.css'

const SLIDES = [heroRiga, heroHeritage, heroNyc]

export default function Hero() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 6000)
    return () => clearInterval(id)
  }, [])

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [open])

  return (
    <section className="hero">
      <div className="hero__slides-bg">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className={`hero__slide ${i === active ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <div className="hero__heading-block">
          <span className="hero__badge">Trusted Travel Specialist • Since 2018</span>
          <h1>
            Unlock The Wonders Of The <span className="accent">World</span> With VConnect Holidays
          </h1>
        </div>

        <div className="hero__footer-row">
          <div className="hero__contact-wrap" ref={menuRef}>
            <Button
              variant="outline-light"
              withArrow={false}
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-haspopup="dialog"
              className={open ? 'is-active' : ''}
            >
              Contact Us
            </Button>

            {open && (
              <div className="hero__contact-dropdown" role="dialog" aria-label="Contact options">
                <div className="hero__dropdown-header">
                  <div className="hero__dropdown-title-group">
                    <span className="hero__dropdown-title">Get In Touch</span>
                    <span className="hero__dropdown-status">Online 24/7</span>
                  </div>
                  <button
                    type="button"
                    className="hero__dropdown-close"
                    onClick={() => setOpen(false)}
                    aria-label="Close contact menu"
                  >
                    <FaXmark />
                  </button>
                </div>

                <a
                  href={`https://wa.me/91${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__dropdown-whatsapp"
                >
                  <FaWhatsapp />
                  <div className="hero__dropdown-whatsapp-text">
                    <span className="hero__dropdown-whatsapp-title">Chat on WhatsApp</span>
                    <span className="hero__dropdown-whatsapp-sub">+91 {contactInfo.whatsapp}</span>
                  </div>
                </a>

                <div className="hero__dropdown-section">
                  <div className="hero__dropdown-label">
                    <FaPhone />
                    <span>Call Us</span>
                  </div>
                  <div className="hero__dropdown-phones-grid">
                    {contactInfo.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:+91${phone}`}
                        className="hero__dropdown-phone-chip"
                      >
                        +91 {phone}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="hero__dropdown-section">
                  <div className="hero__dropdown-label">
                    <FaEnvelope />
                    <span>Email Us</span>
                  </div>
                  <div className="hero__dropdown-emails-list">
                    {contactInfo.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="hero__dropdown-email-chip"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
