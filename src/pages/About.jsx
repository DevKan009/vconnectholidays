import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaShieldHeart, FaCompass, FaPhoneVolume, FaEye, FaBullseye, FaHandshake, FaStar, FaXmark } from 'react-icons/fa6'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import StatCounter from '../components/StatCounter'
import Button from '../components/Button'
import FoundersNote from '../components/FoundersNote'
import { aboutStats, team } from '../data/content'
import { googleBusiness } from '../data/googleReviews'
import aboutBanner from '../assets/images/about-banner.jpg'
import aboutHero from '../assets/images/gallery-2.jpg'
import './About.css'

const PILLARS = [
  { icon: FaEye, label: 'Vision', text: 'Set the benchmark for caring, honest travel, to popular hotspots and hidden gems alike.' },
  { icon: FaBullseye, label: 'Mission', text: 'Stress-free, tailor-made journeys backed by honest advice and 24/7 support.' },
  { icon: FaHandshake, label: 'Values', text: 'Trust, empathy and transparent pricing, with zero compromises.' },
]

const STEPS = [
  { icon: FaCompass, title: 'Tell Us Your Dream', text: 'Share your dates, travel style and budget. We listen first.' },
  { icon: FaShieldHeart, title: 'We Handcraft It', text: 'A day-by-day plan with handpicked stays, transfers and transparent pricing.' },
  { icon: FaPhoneVolume, title: 'We Stay With You', text: 'Our team and local partners support you around the clock, 24/7.' },
]

export default function About() {
  usePageTitle('About Us')
  const { hash } = useLocation()
  const [openMember, setOpenMember] = useState(null)

  // Links like /about#founders-note land on that section (the app otherwise scrolls to the top).
  useEffect(() => {
    if (!hash) return
    const id = requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ block: 'start' }))
    return () => cancelAnimationFrame(id)
  }, [hash])

  return (
    <>
      <PageBanner title="About Us" image={aboutBanner} />

      {/* Intro */}
      <section className="section about-intro">
        <div className="container about-intro__grid">
          <div className="about-intro__content">
            <div className="about-intro__eyebrow">
              <span className="about-eyebrow-line" aria-hidden="true" />
              <span>Our Story &amp; Philosophy</span>
            </div>

            <h1 className="about-intro__title">
              Delivering Bespoke Journeys &amp; Authentic Experiences <span className="accent">Since 2018.</span>
            </h1>

            <p className="about-intro__lead">
              Custom-built holidays planned in Indore, from Bali honeymoons to European expeditions, with every detail
              handled for you.
            </p>

            <ul className="about-pillars">
              {PILLARS.map(({ icon: Icon, label, text }) => (
                <li key={label} className="about-pillar">
                  <span className="about-pillar__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <strong>{label}</strong>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <StatCounter
              items={[
                { value: aboutStats.travellers, suffix: ' K+', label: 'Happy Travelers' },
                { value: aboutStats.destinations, suffix: ' +', label: 'Curated Destinations' },
                { value: aboutStats.years, suffix: ' +', label: 'Years of Excellence' },
              ]}
            />
          </div>

          <div className="about-intro__media-wrap">
            <div className="about-intro__img-frame">
              <img src={aboutHero} alt="VConnect Holidays travellers on a trip" className="about-intro__img" />
            </div>

            <a href={googleBusiness.reviewsUrl} target="_blank" rel="noreferrer" className="about-google-badge">
              <FcGoogle className="about-google-badge__logo" aria-hidden="true" />
              <div>
                <span className="about-google-badge__score">
                  {googleBusiness.rating.toFixed(1)}
                  <span className="about-google-badge__stars" aria-label="5 out of 5 stars" role="img">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar key={i} aria-hidden="true" />
                    ))}
                  </span>
                </span>
                <span className="about-google-badge__count">{googleBusiness.reviewCount} Google reviews</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* How we work (replaces "Why choose us" + "How we plan") */}
      <section className="section section--soft about-process-section">
        <div className="container">
          <SectionHeading before="How We Plan Your" highlight="Dream Vacation" />
          <ol className="about-steps">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="about-step">
                <span className="about-step__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="about-step__num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FoundersNote />

      {/* Team */}
      <section className="section about-team-section" id="team">
        <div className="container">
          <SectionHeading before="Meet Our" highlight="Travel Specialists" />
          <p className="about-team-hint">Tap a photo to meet them</p>
          <ul className="about-team-grid">
            {team.map((member, i) => {
              const open = openMember === i
              return (
                <li key={member.name}>
                  <button
                    type="button"
                    className={`about-team-card ${open ? 'is-open' : ''}`}
                    aria-expanded={open}
                    aria-label={`${member.name}, ${member.role}`}
                    onClick={() => setOpenMember(open ? null : i)}
                  >
                    <span className="about-team-card__photo">
                      <img src={member.image} alt="" loading="lazy" />
                      <span className="about-team-card__overlay">
                        <strong>{member.name}</strong>
                        <span>{member.role}</span>
                        <em>{member.specialty}</em>
                        {open && <FaXmark className="about-team-card__close" aria-hidden="true" />}
                      </span>
                    </span>
                    <span className="about-team-card__caption">
                      <strong>{member.name}</strong>
                      <span>{member.role}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Call to Action Band */}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>
            Ready To Plan Your Next <span className="accent">Unforgettable Journey?</span>
          </h2>
          <p>Connect with our expert travel curators today and let&rsquo;s bring your dream vacation to life.</p>
          <Button to="/contact" variant="outline-dark">
            Connect With Us
          </Button>
        </div>
      </section>
    </>
  )
}
