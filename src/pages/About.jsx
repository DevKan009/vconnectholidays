import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaShieldHeart, FaCompass, FaPhoneVolume, FaStar, FaXmark } from 'react-icons/fa6'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import CountUp from '../components/CountUp'
import Button from '../components/Button'
import FoundersNote from '../components/FoundersNote'
import { aboutStats, team } from '../data/content'
import { googleBusiness } from '../data/googleReviews'
import aboutBanner from '../assets/images/about-banner.jpg'
import '../components/StoryHome.css'
import './AboutStory.css'
import './About.css'

const PILLARS = [
  { label: 'Vision', text: 'Set the benchmark for caring, honest travel, to popular hotspots and hidden gems alike.' },
  { label: 'Mission', text: 'Stress-free, tailor-made journeys backed by honest advice and 24/7 support.' },
  { label: 'Values', text: 'Trust, empathy and transparent pricing, with zero compromises.' },
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

      {/* Intro / our story */}
      <section className="story-about">
        <div className="container story-about__grid">
          <div className="story-about__text">
            <span className="story-script">our little story</span>
            <h1 className="story-about__title">
              Seven years. Thousands of <em>journeys.</em> One promise.
            </h1>
            <p className="story-about__lead">
              Custom-built holidays planned in Indore, from Bali honeymoons to European expeditions, with every detail
              handled for you.
            </p>

            <dl className="story-about__pillars">
              {PILLARS.map(({ label, text }, i) => (
                <div key={label} className="story-pillar">
                  <dt>
                    <span className="story-pillar__num">0{i + 1}</span>
                    {label}
                  </dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="story-collage">
            <figure className="story-polaroid story-polaroid--main">
              <img src="/story/moraine.webp" alt="Moraine Lake in the Canadian Rockies" />
              <figcaption>Moraine Lake, Canada</figcaption>
            </figure>
            <figure className="story-polaroid story-polaroid--small">
              <img src="/story/hallstatt.webp" alt="Hallstatt village on the lake" loading="lazy" />
              <figcaption>Hallstatt, Austria</figcaption>
            </figure>

            <a href={googleBusiness.reviewsUrl} target="_blank" rel="noreferrer" className="story-sticker">
              <FcGoogle className="story-sticker__logo" aria-hidden="true" />
              <strong>{googleBusiness.rating.toFixed(1)}</strong>
              <span className="story-sticker__stars" aria-label="5 out of 5 stars" role="img">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} aria-hidden="true" />
                ))}
              </span>
              <span className="story-sticker__count">{googleBusiness.reviewCount} reviews</span>
            </a>
          </div>
        </div>

        <div className="container">
          <ul className="story-numbers">
            <li>
              <strong>
                <CountUp value={aboutStats.travellers} />
                <sup>K+</sup>
              </strong>
              <span className="story-numbers__label">happy travellers</span>
            </li>
            <li>
              <strong>
                <CountUp value={aboutStats.destinations} />
                <sup>+</sup>
              </strong>
              <span className="story-numbers__label">destinations</span>
            </li>
            <li>
              <strong>
                <CountUp value={aboutStats.years} />
                <sup>yrs</sup>
              </strong>
              <span className="story-numbers__label">of holidays</span>
            </li>
          </ul>
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
