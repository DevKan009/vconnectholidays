import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import { track } from '../utils/enquiry'
import './ServiceCard.css'

// Whole card is one link. `compact` is the Home-strip tile.
export default function ServiceCard({ service: s, compact = false, source = 'services' }) {
  const Icon = s.icon
  const onClick = () => track('service_click', { service: s.id, source })

  if (compact) {
    return (
      <Link to={s.to} className="service-tile" onClick={onClick}>
        <span className="service-tile__icon" aria-hidden="true"><Icon /></span>
        <span className="service-tile__title">{s.title}</span>
        {s.comingSoon && <span className="badge-soon">Coming soon</span>}
      </Link>
    )
  }

  return (
    <article className={`service-card ${s.comingSoon ? 'service-card--soon' : ''}`.trim()}>
      <div className="service-card__head">
        <span className="service-card__icon" aria-hidden="true"><Icon /></span>
        {s.comingSoon && <span className="badge-soon">Coming soon</span>}
      </div>
      <h3>
        <Link to={s.to} className="service-card__link" onClick={onClick}>
          {s.title}
        </Link>
      </h3>
      <p>{s.summary}</p>
      {s.quote && <blockquote className="service-card__quote">{s.quote}</blockquote>}
      <span className="service-card__only">{s.onlyLine}</span>
      {s.links ? (
        <div className="service-card__sublinks">
          {s.links.map((l) => (
            <Link key={l.to} to={l.to} className="service-card__sublink" onClick={onClick}>
              {l.label} <FaArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      ) : (
        <span className="service-card__cta" aria-hidden="true">
          {s.comingSoon ? 'Register interest' : 'Talk to us'} <FaArrowRight />
        </span>
      )}
    </article>
  )
}
