import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import TripCard from '../components/TripCard'
import RegionSwitch from '../components/RegionSwitch'
import TestimonialSlider from '../components/TestimonialSlider'
import Button from '../components/Button'
import useRegion from '../hooks/useRegion'
import { packagesTestimonials } from '../data/content'
import { destinationsByRegion } from '../data/destinations'
import bannerImg from '../assets/images/tourpackages-banner.jpg'
import './TourPackages.css'

export default function TourPackages() {
  const [region, setRegion] = useRegion('tour_packages')
  usePageTitle(
    region === 'domestic' ? 'Domestic Tour Packages' : 'International Tour Packages',
    region === 'domestic'
      ? 'Domestic holiday packages across India, from Kashmir and Kerala to Goa and the Andamans, planned by VConnect Holidays, Indore.'
      : 'International holiday packages to Dubai, Thailand, Bali, Singapore, Maldives, Europe and more, with visas handled by VConnect Holidays, Indore.',
  )

  return (
    <>
      <PageBanner title="Tour Packages" image={bannerImg} />

      <section className="section">
        <div className="container">
          <SectionHeading
            before="Choose Your Next"
            highlight="Holiday"
            description="Every trip can be tailored to your dates, hotels and budget."
          />
          <RegionSwitch value={region} onChange={setRegion} />
          <div className="card-grid card-grid--4">
            {destinationsByRegion(region).map((d) => (
              <TripCard key={d.slug} destination={d} source="tour_packages" />
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
