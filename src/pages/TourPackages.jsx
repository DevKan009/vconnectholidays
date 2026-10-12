import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import PackageCard from '../components/PackageCard'
import TestimonialSlider from '../components/TestimonialSlider'
import Button from '../components/Button'
import { tourPackages, packagesTestimonials } from '../data/content'
import bannerImg from '../assets/images/tourpackages-banner.jpg'
import './TourPackages.css'

export default function TourPackages() {
  usePageTitle('Tour Packages')

  return (
    <>
      <PageBanner title="Tour Packages" image={bannerImg} />

      <section className="section">
        <div className="container">
          <div className="card-grid card-grid--4">
            {tourPackages.map((p, i) => (
              <PackageCard key={p.title + i} title={p.title} subtitle={p.subtitle} cost={p.price} duration={p.duration} image={p.image} />
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <SectionHeading
            before="Amazing Reviews From Our"
            highlight="Travelers"
            description="Read authentic experiences and reviews from happy travelers about their journeys with us."
            light
          />
          <TestimonialSlider items={packagesTestimonials} />
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>
            Take An Adventure To Our Featured <span className="accent">Destinations,</span> Contact Us Now!
          </h2>
          <p>We provide the best experiences for you, contact us now to plan your dream vacation.</p>
          <Button to="/contact" variant="outline-dark">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  )
}
