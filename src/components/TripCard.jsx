import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa6'
import CoverImage from './CoverImage'
import { tripLine } from '../data/destinations'
import { bookLink, whatsappLink, track } from '../utils/enquiry'
import { logWhatsAppClick } from '../utils/leads'
import './TripCard.css'

export default function TripCard({ destination: d, hideOnPhone = false, source = 'card' }) {
  const detailLink = `/destinations/${d.slug}`
  const params = { destination: d.slug, region: d.region, source }

  return (
    <article className={`trip-card ${hideOnPhone ? 'trip-card--hide-phone' : ''}`.trim()}>
      <div className="trip-card__media">
        <CoverImage src={d.cover} alt={`${d.place}, ${d.country}`} label={d.place} />
        <div className="trip-card__actions">
          <Link to={bookLink(d)} className="trip-card__btn trip-card__btn--book" onClick={() => track('book_now_click', params)}>
            Book Now
          </Link>
          <Link to={detailLink} className="trip-card__btn" onClick={() => track('explore_click', params)}>
            Explore {d.country}
          </Link>
          <a
            href={whatsappLink(d)}
            target="_blank"
            rel="noreferrer"
            className="trip-card__btn trip-card__btn--wa"
            aria-label={`Enquire about ${d.place} on WhatsApp`}
            onClick={() => {
              track('whatsapp_click', params)
              logWhatsAppClick(`Trip card: ${d.place}`)
            }}
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
      <div className="trip-card__body">
        <span className="trip-card__country">{d.country}</span>
        <h3>
          <Link to={detailLink} className="trip-card__link" onClick={() => track('explore_click', { ...params, via: 'card' })}>
            {d.place}
          </Link>
        </h3>
        <p className="trip-card__meta">{tripLine(d)}</p>
      </div>
    </article>
  )
}
