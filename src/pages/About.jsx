import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import StatCounter from '../components/StatCounter'
import IconBox from '../components/IconBox'
import Button from '../components/Button'
import FoundersNote from '../components/FoundersNote'
import { aboutBenefits, aboutStats, team } from '../data/content'
import aboutBanner from '../assets/images/about-banner.jpg'
import aboutHero from '../assets/images/about-img2.jpeg'
import { FaShieldHeart, FaCompass, FaPhoneVolume, FaAward } from 'react-icons/fa6'
import './About.css'

const VISION_MISSION = [
  {
    label: 'Our Vision',
    title: 'Redefining Modern Travel',
    text: 'To redefine travel by setting the benchmark for customer care, sustainable exploration, and unforgettable cultural encounters across both popular hotspots and hidden gems.',
  },
  {
    label: 'Our Mission',
    title: 'Connecting Travelers with Authentic World Experiences',
    text: 'To craft stress-free, tailor-made journeys that bring people closer to nature, local traditions, and lifelong memories through honest advice and 24/7 dedicated support.',
  },
  {
    label: 'Our Values',
    title: 'Trust, Empathy & Excellence',
    text: 'We treat every traveler’s vacation with the same love, honesty, and meticulous attention to detail as our own family’s. Transparent pricing, handpicked stays, and zero compromises.',
  },
]

export default function About() {
  usePageTitle('About Us')
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <PageBanner title="About Us" image={aboutBanner} />

      {/* Intro & Story Section */}
      <section className="section about-intro">
        <div className="container about-intro__grid">
          <div className="about-intro__content">
            <div className="about-intro__eyebrow">
              <span className="about-eyebrow-line" aria-hidden="true" />
              <span>Our Story &amp; Philosophy</span>
            </div>

            <h1 className="about-intro__title">
              Delivering Bespoke Journeys &amp; Authentic Experiences{' '}
              <span className="accent">Since 2018.</span>
            </h1>

            <div className="vm-tabs">
              <div className="vm-tabs__list" role="tablist">
                {VISION_MISSION.map((tab, i) => (
                  <button
                    key={tab.label}
                    role="tab"
                    aria-selected={activeTab === i}
                    className={activeTab === i ? 'is-active' : ''}
                    onClick={() => setActiveTab(i)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="vm-tabs__panel">
                <h4>{VISION_MISSION[activeTab].title}</h4>
                <p>{VISION_MISSION[activeTab].text}</p>
              </div>
            </div>

            <p className="about-intro__body">
              At VConnect Holidays, our foundation is built upon a steadfast commitment to personal excellence,
              transparent guidance, and genuine empathy. We believe that no two travelers are alike, which is why every
              itinerary we design is custom-built around your personal passions, preferred pacing, and comfort. From
              private romantic escapes in Bali and the Maldives to grand European expeditions and serene Himalayan
              retreats, we take care of every detail so you can simply embrace the wonder.
            </p>

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
              <img src={aboutHero} alt="VConnect Holidays travelers experiencing memorable journeys" className="about-intro__img" />
              <div className="about-intro__img-glow" aria-hidden="true" />
            </div>

            <div className="about-intro__floating-card">
              <div className="about-intro__floating-icon">
                <FaAward />
              </div>
              <div>
                <strong>Top Rated Travel Agency</strong>
                <span>4.9 / 5.0 Rating Across 1,000+ Journeys</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits / Pillars */}
      <section className="section section--soft about-benefits-section">
        <div className="container">
          <SectionHeading
            before="Why Travelers Choose"
            highlight="VConnect Holidays"
            description="We go far beyond standard online bookings to deliver seamless, handcrafted vacations backed by unmatched personal care."
          />
          <div className="card-grid card-grid--4">
            {aboutBenefits.map((item) => (
              <IconBox key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <FoundersNote />

      {/* Meet Our Passionate Team */}
      <section className="section about-team-section" id="team">
        <div className="container">
          <SectionHeading
            before="Meet Our Dedicated"
            highlight="Travel Specialists"
            description="The passionate team of travel curators, tour coordinators, and logistics specialists working round the clock to make every vacation flawless."
          />
          <div className="about-team-grid">
            {team.map((member) => (
              <div className="about-team-card" key={member.name}>
                <div className="about-team-card__image-wrap">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="about-team-card__overlay">
                    <span className="about-team-card__overlay-text">{member.role}</span>
                  </div>
                </div>
                <div className="about-team-card__content">
                  <h3 className="about-team-card__name">{member.name}</h3>
                  <span className="about-team-card__role">{member.role}</span>
                  <p className="about-team-card__specialty">{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Plan Your Vacation */}
      <section className="section section--soft about-process-section">
        <div className="container">
          <SectionHeading
            before="How We Create Your"
            highlight="Dream Vacation"
            description="A transparent, hassle-free process from your very first conversation to your safe return back home."
          />
          <div className="about-process-grid">
            <div className="about-process-card">
              <span className="about-process-card__step">01</span>
              <div className="about-process-card__icon" aria-hidden="true">
                <FaCompass />
              </div>
              <h3>Dream &amp; Discover</h3>
              <p>
                Share your travel vision, preferred style, dates, and budget. We listen closely to understand what makes
                your perfect getaway.
              </p>
            </div>

            <div className="about-process-card">
              <span className="about-process-card__step">02</span>
              <div className="about-process-card__icon" aria-hidden="true">
                <FaShieldHeart />
              </div>
              <h3>Handcrafted Itinerary</h3>
              <p>
                Our specialists craft a custom day-by-day itinerary with handpicked boutique stays, seamless transfers,
                and transparent pricing.
              </p>
            </div>

            <div className="about-process-card">
              <span className="about-process-card__step">03</span>
              <div className="about-process-card__icon" aria-hidden="true">
                <FaPhoneVolume />
              </div>
              <h3>24/7 On-Trip Care</h3>
              <p>
                Travel with complete peace of mind. Our team and local partners are available around the clock to support
                you through every step.
              </p>
            </div>
          </div>
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
