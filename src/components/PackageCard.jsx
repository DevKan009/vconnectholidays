import { Link } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'
import './PackageCard.css'

export default function PackageCard({ title, subtitle, cost, duration, image }) {
  return (
    <div className="pkg-card">
      <div className="pkg-card__image" style={{ backgroundImage: `url(${image})` }}>
        <Link to="/contact" className="pkg-card__book">
          Book Now
        </Link>
      </div>
      <div className="pkg-card__body">
        <span className="pkg-card__location">
          <FaLocationDot /> {title}
        </span>
        <h3>{subtitle}</h3>
        <p className="pkg-card__cost">{cost}</p>
        <p className="pkg-card__duration">{duration}</p>
      </div>
    </div>
  )
}
