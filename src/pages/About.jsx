import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import StatCounter from '../components/StatCounter'
import IconBox from '../components/IconBox'
import Button from '../components/Button'
import { aboutBenefits, aboutStats, aboutFaqTabs, team } from '../data/content'
import aboutBanner from '../assets/images/about-banner.jpg'
import aboutHero from '../assets/images/about-img2.jpeg'
import './About.css'

const VISION_MISSION = [
  {
    label: 'Our Vision',
    text: 'To redefine travel by setting the highest standards for customer care, environmental awareness, and innovation.',
  },
  {
    label: 'Our Mission',
    text: 'Promoting sustainable tourism by connecting travelers with local cultures, preserving nature, and fostering responsible travel.',
  },
]

export default function About() {
  usePageTitle('About')
  const [activeTab, setActiveTab] = useState(0)
  const [activeFaqTab, setActiveFaqTab] = useState(0)

  return (
    <>
      <PageBanner title="About" image={aboutBanner} />

      <section className="section about-intro">
        <div className="container about-intro__grid">
          <div>
            <h1 className="about-intro__title">
              VConnect Holidays — Delivering Bespoke Journeys &amp; Authentic Experiences{' '}
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
              <p className="vm-tabs__panel">{VISION_MISSION[activeTab].text}</p>
            </div>

            <p className="about-intro__body">
              At The VConnect Holidays, our foundation is built upon a steadfast commitment to excellence, a
              visionary approach to travel, a clear mission, and a set of deeply ingrained values. Our
              commitment drives every aspect of our operations, ensuring that every traveler&rsquo;s experience
              exceeds expectations. From meticulously curated itineraries to personalized customer service, we
              spare no effort in delivering unforgettable journeys.
            </p>

            <StatCounter
              items={[
                { value: aboutStats.travellers, suffix: ' K+', label: 'Happy Traveller' },
                { value: aboutStats.destinations, suffix: ' +', label: 'Travel Destinations' },
                { value: aboutStats.years, suffix: ' +', label: 'Year Of Service' },
              ]}
            />
          </div>
          <img src={aboutHero} alt="VConnect Holidays travellers" className="about-intro__img" />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            before="Benefit Our VConnect"
            highlight="Tours &amp; Travels"
            description="Below is a comprehensive list of the benefits of using our travel and tour agency"
          />
          <div className="card-grid card-grid--4">
            {aboutBenefits.map((item) => (
              <IconBox key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            before="Meet Our Professional"
            highlight="Guides"
            description="Our guides are seasoned experts with in-depth knowledge of local culture, history, & hidden gems."
          />
          <div className="team-grid">
            {team.map((member) => (
              <div className="team-card" key={member.name}>
                <img src={member.image} alt={member.name} loading="lazy" />
                <h3>{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            before="Frequently Asked"
            highlight="Questions"
            description="provides important details and answers to frequently asked questions"
          />
          <div className="faq-tabs">
            <div className="faq-tabs__list" role="tablist">
              {aboutFaqTabs.map((tab, i) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeFaqTab === i}
                  className={activeFaqTab === i ? 'is-active' : ''}
                  onClick={() => setActiveFaqTab(i)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="faq-tabs__panel">
              <p>
                We&rsquo;re putting together detailed answers for &ldquo;{aboutFaqTabs[activeFaqTab]}&rdquo;.
                In the meantime, reach out to our team directly and we&rsquo;ll help right away.
              </p>
              <Button to="/contact" variant="dark">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
