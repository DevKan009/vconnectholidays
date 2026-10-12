import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import DestinationCard from '../components/DestinationCard'
import Button from '../components/Button'
import { destinationList, aboutFaqTabs } from '../data/content'
import bannerImg from '../assets/images/page-banner-default.jpg'
import './Destination.css'

export default function Destination() {
  usePageTitle('Destination List')
  const [activeFaqTab, setActiveFaqTab] = useState(0)

  return (
    <>
      <PageBanner title="Destination List" image={bannerImg} />

      <section className="section">
        <div className="container">
          <SectionHeading
            before="Discover Your Next Dream"
            highlight="Destination"
            description="Here are some of the most visited destinations by tourists in 2024-2025."
          />
          <div className="dest-bento">
            {destinationList.map((d, i) => (
              <DestinationCard key={d.title} {...d} wide={i === 2 || i === 3} />
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
