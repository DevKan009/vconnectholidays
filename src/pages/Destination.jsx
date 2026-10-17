import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import DestinationCard from '../components/DestinationCard'
import Button from '../components/Button'
import { aboutFaqTabs } from '../data/content'
import { REGIONS, destinationsByRegion } from '../data/destinations'
import bannerImg from '../assets/images/page-banner-default.jpg'
import './Destination.css'

export default function Destination() {
  usePageTitle(
    'Destination List',
    'All 40 international and domestic destinations planned by VConnect Holidays, Indore: Dubai, Thailand, Bali, Kashmir, Kerala, Goa and more.',
  )
  const [activeFaqTab, setActiveFaqTab] = useState(0)

  return (
    <>
      <PageBanner title="Destination List" image={bannerImg} />

      <section className="section">
        <div className="container">
          <SectionHeading
            before="Discover Your Next Dream"
            highlight="Destination"
            description="Here are the destinations our travellers love most, international and across India."
          />
          {REGIONS.map((r) => (
            <div key={r.id} className="dest-group" id={r.id}>
              <h3 className="dest-group__title">{r.label}</h3>
              <div className="dest-bento">
                {destinationsByRegion(r.id).map((d) => (
                  <DestinationCard
                    key={d.slug}
                    title={d.place}
                    subtitle={d.country}
                    image={d.cover}
                    to={`/destinations/${d.slug}`}
                  />
                ))}
              </div>
            </div>
          ))}
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
