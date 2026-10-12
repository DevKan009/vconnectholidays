import './Home.css'
import usePageTitle from '../hooks/usePageTitle'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import DestinationCard from '../components/DestinationCard'
import PackageCard from '../components/PackageCard'
import StatCounter from '../components/StatCounter'
import IconBox from '../components/IconBox'
import TestimonialSlider from '../components/TestimonialSlider'
import Accordion from '../components/Accordion'
import Button from '../components/Button'
import {
  homeDestinations,
  homePackages,
  homeTestimonials,
  homeFaqs,
  whyChooseUs,
  gallery,
  stats,
} from '../data/content'
import aboutImg1 from '../assets/images/about-img1.jpeg'
import aboutImg2 from '../assets/images/about-img2.jpeg'
import testiMohakImg from '../assets/images/testi-mohak.jpeg'
import whyChoose1 from '../assets/images/why-choose-1.jpg'
import whyChoose2 from '../assets/images/why-choose-2.jpg'
import whyChoose3 from '../assets/images/why-choose-3.jpg'

export default function Home() {
  usePageTitle(null)

  return (
    <>
      <Hero />

      <section className="section" id="destinations">
        <div className="container">
          <SectionHeading
            before="Discover Your Next Dream"
            highlight="Destination"
            description="Here are some of the most visited destinations by tourists in 2025."
          />
          <div className="dest-bento">
            {homeDestinations.map((d, i) => (
              <DestinationCard key={d.title + d.subtitle} {...d} to="/destination" wide={i === 2 || i === 3} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="packages">
        <div className="container">
          <SectionHeading
            before="Exclusive Tour &amp; Travel"
            highlight="Packages"
            description="Here are some of our Exclusive Tour Packages highlighting the unique aspects of each place."
          />
          <div className="card-grid card-grid--4">
            {homePackages.map((p, i) => (
              <PackageCard key={p.title + i} {...p} />
            ))}
            <div className="explore-world-card">
              <span className="explore-world-card__eyebrow">Explore The World</span>
              <h3>We Have Many Other Holiday Tour Packages</h3>
              <p>Connect with us and let&rsquo;s plan it your way</p>
              <Button to="/tour-packages" variant="dark">
                All Packages
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-teaser">
        <div className="container about-teaser__grid">
          <div className="about-teaser__media">
            <img src={aboutImg1} alt="VConnect Holidays travellers group" className="about-teaser__main-img" />
          </div>
          <div className="about-teaser__content">
            <h2>
              Your Trusted Partner For Curated Vacations &amp; Seamless Travel <span className="accent">Since 2018.</span>
            </h2>
            <div className="about-teaser__pair">
              <img src={aboutImg2} alt="VConnect Holidays couple travellers" />
              <img src={testiMohakImg} alt="VConnect Holidays travellers" />
            </div>
            <p>
              At The VConnect Holidays, our foundation is built upon a steadfast commitment to excellence, a
              visionary approach to travel, a clear mission, and a set of deeply ingrained values. Our
              commitment drives every aspect of our operations, ensuring that every traveler&rsquo;s experience
              exceeds expectations. From meticulously curated itineraries to personalized customer service, we
              spare no effort in delivering unforgettable journeys.
            </p>
            <Button to="/about" variant="dark">
              Discover More
            </Button>
            <StatCounter
              items={[
                { value: stats.travellers, suffix: ' K+', label: 'Happy Traveller' },
                { value: stats.destinations, suffix: ' +', label: 'Travel Destinations' },
                { value: stats.years, suffix: ' +', label: 'Year Of Service' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section section--soft" id="why-us">
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
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <SectionHeading
            before="Amazing Reviews From Our"
            highlight="Travelers"
            description="Read authentic experiences and reviews from happy travelers who explored the world with us."
            light
          />
          <TestimonialSlider items={homeTestimonials} />
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="container">
          <SectionHeading
            before="Explore Our Photo"
            highlight="Gallery"
            description="Every photo we take captures beauty, culture, adventure and experience."
          />
          <div className="gallery-grid">
            {gallery.map((item, i) => (
              <img
                key={i}
                src={item.src}
                alt="VConnect Holidays travel moment"
                loading="lazy"
                className={item.tall ? 'is-tall' : 'is-short'}
              />
            ))}
          </div>
        </div>
      </section>

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

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>
            Take An Adventure To Our Featured <span className="accent">Destinations,</span> Contact Us Now!
          </h2>
          <p>Your perfect escape with tailored travel services, ensuring every detail of your dream vacation</p>
          <Button to="/contact" variant="outline-dark">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  )
}
