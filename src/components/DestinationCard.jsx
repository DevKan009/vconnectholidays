import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import './DestinationCard.css'

export default function DestinationCard({ title, subtitle, image, to, wide = false }) {
  return (
    <div
      className={`dest-card ${wide ? 'dest-card--wide' : ''}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="dest-card__overlay" />
      <div className="dest-card__body">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        {to ? (
          <Link to={to} className="dest-card__arrow" aria-label={`Explore ${title}`}>
            <FaArrowRight />
          </Link>
        ) : (
          <span className="dest-card__arrow" aria-hidden="true">
            <FaArrowRight />
          </span>
        )}
      </div>
    </div>
  )
}
