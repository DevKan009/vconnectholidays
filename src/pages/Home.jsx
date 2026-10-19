import './Home.css'
import usePageTitle from '../hooks/usePageTitle'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import TripCard from '../components/TripCard'
import RegionSwitch from '../components/RegionSwitch'
import GoogleReviews from '../components/GoogleReviews'
import Accordion from '../components/Accordion'
import Button from '../components/Button'
import FoundersNote from '../components/FoundersNote'
import StoryHome from '../components/StoryHome'
import useRegion from '../hooks/useRegion'
import { destinationsByRegion, HOME_COUNT, HOME_COUNT_PHONE } from '../data/destinations'
import {
  homeFaqs,
} from '../data/content'

export default function Home() {
  usePageTitle(null)
  const [region, setRegion] = useRegion('home')
  const featured = destinationsByRegion(region).slice(0, HOME_COUNT)

  return (
    <>
      <Hero />

      <section className="section section--soft" id="packages">
        <div className="container">
          <SectionHeading
            before="Exclusive Tour &amp; Travel"
            highlight="Packages"
          />
          <RegionSwitch value={region} onChange={setRegion} />
          <div className="card-grid card-grid--4">
            {featured.map((d, i) => (
              <TripCard key={d.slug} destination={d} hideOnPhone={i >= HOME_COUNT_PHONE} source="home" />
            ))}
            <div className="explore-world-card">
              <span className="explore-world-card__eyebrow">Explore The World</span>
              <h3>We Have Many Other Holiday Tour Packages</h3>
              <p>Connect with us and let&rsquo;s plan it your way</p>
              <Button to={region === 'domestic' ? '/tour-packages?region=domestic' : '/tour-packages'} variant="dark">
                All Packages
              </Button>
            </div>
          </div>
        </div>
      </section>

      <StoryHome />

      {/* <section className="section section--soft" id="why-us">
        <div className="container why-choose__grid">
          <div className="why-choose__media">
            <div className="why-choose__media-row">
              <img src={whyChoose1} alt="Traveler sitting near the bay" loading="lazy" />
              <img src={whyChoose2} alt="Friends walking a forest road" loading="lazy" />
            </div>
            <img src={whyChoose3} alt="Traveler photographing the mountains" className="why-choose__media-wide" loading="lazy" />
          </div>
          <div className="why-choose__content">
            <SectionHeading
              before="Why Choose"
              highlight="VConnect Holidays?"
              description="At VConnect Holidays, we pride ourselves on providing exceptional travel experiences that go beyond just a booking. Here are the reasons why travelers trust us for their adventures"
              align="left"
            />
            <div className="why-choose__list">
              {whyChooseUs.map((item, i) => (
                <IconBox key={item.title} {...item} highlighted={i === 0} horizontal />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <GoogleReviews />

      <FoundersNote compact />


      <section className="section section--soft" id="faq">
        <div className="container container--narrow">
          <SectionHeading
            before="Frequently Asked"
            highlight="Questions"
            description="provides important details and answers to frequently asked questions"
          />
          <Accordion items={homeFaqs} />
        </div>
      </section>

    </>
  )
}
