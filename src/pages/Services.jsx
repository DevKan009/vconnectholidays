import usePageTitle from '../hooks/usePageTitle'
import { PAGE_META } from '../data/seo'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import OnlyBand from '../components/OnlyBand'
import GoogleReviews from '../components/GoogleReviews'
import Button from '../components/Button'
import { services } from '../data/services'
import bannerImg from '../assets/images/page-banner-default.jpg'
import './Services.css'

const STEPS = [
  { title: 'Tell us what you need', text: 'One hotel, a visa, or the whole trip. Share your dates and we take it from there.' },
  { title: 'We plan & quote', text: 'A travel expert sends options and a clear quote, usually within 2 working hours.' },
  { title: 'Travel with support', text: 'Vouchers, tickets and visas arrive before you fly, with 24/7 help on the trip.' },
]

export default function Services() {
  usePageTitle(PAGE_META['/services'])

  return (
    <>
      <PageBanner title="Our Services" image={bannerImg} />

      <OnlyBand />

      <section className="section">
        <div className="container">
          <SectionHeading
            before="One Travel Desk For"
            highlight="Everything"
            description="Since 2018 we have looked after every part of the journey. Pick one service or combine them; the care is the same."
          />
          <div className="card-grid card-grid--3 services-grid">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading before="How It" highlight="Works" />
          <ol className="services-steps">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="services-steps__num">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <GoogleReviews set="text" />

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>
            Not Sure What You Need? <span className="accent">Ask Us,</span> It&rsquo;s Free.
          </h2>
          <p>Tell us where you&rsquo;re going and we&rsquo;ll suggest what&rsquo;s worth booking.</p>
          <Button to="/contact" variant="outline-dark">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  )
}
