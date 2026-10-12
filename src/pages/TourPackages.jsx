import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import PackageCard from '../components/PackageCard'
import TestimonialSlider from '../components/TestimonialSlider'
import Button from '../components/Button'
import BlogTeaser from '../components/BlogTeaser'
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
            description="Read some interesting reviews and experiences from travelers about Their Travels With Us"
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
          <p>We provides the best experience for you, contact us now to get attractive promotions from us.</p>
          <Button to="/contact" variant="outline-dark">
            Contact Us
          </Button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            before="Read Our Latest Blog &amp;"
            highlight="Articles"
            description="Following is a detailed blog article on our Tours and travel topics"
          />
          <BlogTeaser />
        </div>
      </section>
    </>
  )
}
