import { Link, useSearchParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import TripCard from '../components/TripCard'
import ServiceCard from '../components/ServiceCard'
import VisaCountryCard from '../components/VisaCountryCard'
import { destinations } from '../data/destinations'
import { services } from '../data/services'
import { searchVisas } from '../data/visas'
import { contactLink } from '../utils/enquiry'
import bannerImg from '../assets/images/page-banner-default.jpg'
import './visa/Visa.css'
import './SearchResults.css'

const has = (q, ...fields) => fields.some((f) => f && f.toLowerCase().includes(q))

export default function SearchResults() {
  const [params] = useSearchParams()
  const query = (params.get('q') || '').trim()
  const q = query.toLowerCase()
  usePageTitle(query ? `Search: ${query}` : 'Search')

  const trips = q ? destinations.filter((d) => has(q, d.place, d.country, d.summary)) : []
  const visas = q ? searchVisas(q) : []
  const matchedServices = q ? services.filter((s) => has(q, s.title, s.summary, s.id)) : []
  const total = trips.length + visas.length + matchedServices.length

  return (
    <>
      <PageBanner title="Search" image={bannerImg} crumb={query || 'Search'} />

      <section className="section">
        <div className="container">
          <p className="search-summary">
            {query ? (
              <>
                {total} result{total === 1 ? '' : 's'} for <strong>&ldquo;{query}&rdquo;</strong>
              </>
            ) : (
              'Type a destination, country or service in the search box.'
            )}
          </p>

          {trips.length > 0 && (
            <div className="search-group">
              <h2>Holiday packages</h2>
              <div className="card-grid card-grid--4">
                {trips.map((d) => (
                  <TripCard key={d.slug} destination={d} source="search" />
                ))}
              </div>
            </div>
          )}

          {visas.length > 0 && (
            <div className="search-group">
              <h2>Visas</h2>
              <div className="visa-grid">
                {visas.map((v) => (
                  <VisaCountryCard key={`${v.kind}-${v.slug}`} visa={v} />
                ))}
              </div>
            </div>
          )}

          {matchedServices.length > 0 && (
            <div className="search-group">
              <h2>Services</h2>
              <div className="card-grid card-grid--3">
                {matchedServices.map((s) => (
                  <ServiceCard key={s.id} service={s} source="search" />
                ))}
              </div>
            </div>
          )}

          {query && total === 0 && (
            <div className="search-empty">
              <h2>Nothing matched &ldquo;{query}&rdquo;</h2>
              <p>We plan trips to far more places than we list. Tell us where you want to go.</p>
              <Link to={contactLink({ destination: query })} className="btn btn--dark">
                <span>Ask our travel experts</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
