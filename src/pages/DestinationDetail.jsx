import { Link, useParams } from 'react-router-dom'
import { FaCalendarDays, FaPassport, FaPlaneDeparture, FaClock, FaIndianRupeeSign, FaWhatsapp } from 'react-icons/fa6'
import usePageTitle from '../hooks/usePageTitle'
import { destinationMeta } from '../data/seo'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import CoverImage from '../components/CoverImage'
import PackageCard from '../components/PackageCard'
import TripCard from '../components/TripCard'
import NotFound from './NotFound'
import {
  getDestination,
  destinationsByRegion,
  regionLabel,
  formatPrice,
  formatDuration,
} from '../data/destinations'
import { bookLink, whatsappLink, track } from '../utils/enquiry'
import { logWhatsAppClick } from '../utils/leads'
import bannerFallback from '../assets/images/page-banner-default.jpg'
import './DestinationDetail.css'

function relatedTo(d, count = 3) {
  const list = destinationsByRegion(d.region).filter((x) => x.slug !== d.slug)
  const start = Math.min(d.rank - 1, list.length)
  return [...list.slice(start), ...list.slice(0, start)].slice(0, count)
}

export default function DestinationDetail() {
  const { slug } = useParams()
  const d = getDestination(slug)

  usePageTitle(d ? destinationMeta(d) : 'Page Not Found')

  if (!d) return <NotFound />

  const region = regionLabel(d.region)
  const params = { destination: d.slug, region: d.region, source: 'destination_page' }
  const facts = [
    { icon: FaCalendarDays, label: 'Best time to visit', value: d.facts.bestTime },
    { icon: FaPassport, label: d.region === 'international' ? 'Visa' : 'Permits', value: d.facts.entry, highlight: true },
    { icon: FaPlaneDeparture, label: 'Getting there', value: d.facts.travel },
    { icon: FaClock, label: 'Ideal trip', value: d.facts.idealDays },
    { icon: FaIndianRupeeSign, label: 'Starting price', value: formatPrice(d.priceFrom) },
  ]

  return (
    <>
      <PageBanner
        title={d.place}
        eyebrow={d.country}
        image={d.cover}
        fallbackImage={bannerFallback}
        trail={[{ label: region, to: d.region === 'domestic' ? '/tour-packages?region=domestic' : '/tour-packages' }]}
        crumb={d.country}
      />

      <div className="dest-detail">
        <section className="dest-facts">
          <div className="container">
            <ul className="dest-facts__list">
              {facts.map(({ icon: Icon, label, value, highlight }) => (
                <li key={label} className={highlight ? 'is-highlight' : ''}>
                  <Icon aria-hidden="true" />
                  <div>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section dest-overview">
          <div className="container container--narrow">
            <SectionHeading before="Discover" highlight={d.place} description={d.summary} />
          </div>
        </section>

        <section className="section section--soft">
          <div className="container">
            <SectionHeading before="Places To Visit In" highlight={d.country} />
            <div className="card-grid card-grid--3 dest-places">
              {d.places.map((p) => (
                <article key={p.name} className="dest-place">
                  <CoverImage src={p.image} alt={`${p.name}, ${p.city}`} label={p.name} />
                  <div className="dest-place__body">
                    <span>{p.city}</span>
                    <h3>{p.name}</h3>
                    <p>{p.blurb}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <SectionHeading
              before={d.place}
              highlight="Packages"
              description={
                d.packages.length
                  ? 'Every package can be customised to your dates, hotels and budget.'
                  : 'We tailor every trip to your dates, hotels and budget. Tell us what you have in mind.'
              }
            />
            {d.packages.length > 0 ? (
              <div className="card-grid card-grid--4">
                {d.packages.map((p) => (
                  <PackageCard
                    key={p.title}
                    title={d.country}
                    subtitle={p.title}
                    cost={formatPrice(p.priceFrom)}
                    duration={formatDuration(p.duration) || 'Flexible duration'}
                    image={p.image}
                    bookTo={bookLink(d)}
                    onBook={() => track('book_now_click', { ...params, package: p.title })}
                  />
                ))}
              </div>
            ) : (
              <div className="dest-custom">
                <p>
                  {formatDuration(d.duration)} suggested itinerary &middot; {formatPrice(d.priceFrom)}
                </p>
                <Link to={bookLink(d)} className="btn btn--dark" onClick={() => track('book_now_click', params)}>
                  <span>Get a custom quote</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="section section--soft">
          <div className="container">
            <SectionHeading before="You May Also" highlight="Like" />
            <div className="card-grid card-grid--3">
              {relatedTo(d).map((r) => (
                <TripCard key={r.slug} destination={r} source="related" />
              ))}
            </div>
          </div>
        </section>

        <div className="dest-bookbar" role="region" aria-label={`Plan your ${d.country} trip`}>
          <div className="container dest-bookbar__inner">
            <div className="dest-bookbar__text">
              <strong>Plan my {d.country} trip</strong>
              <span>{[formatDuration(d.duration), formatPrice(d.priceFrom)].filter(Boolean).join(' · ')}</span>
            </div>
            <div className="dest-bookbar__actions">
              <a
                href={whatsappLink(d)}
                target="_blank"
                rel="noreferrer"
                className="btn dest-bookbar__wa"
                onClick={() => {
                  track('whatsapp_click', params)
                  logWhatsAppClick(`Destination: ${d.place}`)
                }}
              >
                <FaWhatsapp aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <Link to={bookLink(d)} className="btn btn--dark" onClick={() => track('book_now_click', params)}>
                <span>Enquire</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
