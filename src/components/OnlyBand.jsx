import { Link } from 'react-router-dom'
import { services, ONLY_HEADLINE, ONLY_SUPPORT } from '../data/services'
import { contactLink, track } from '../utils/enquiry'
import './OnlyBand.css'

// "Book only what you need": single-service enquiries are a normal request,
// not a lesser one. Each chip opens Contact with that service preselected.
export default function OnlyBand() {
  const chips = services.filter((s) => s.chip)

  return (
    <section className="only-band">
      <div className="container only-band__inner">
        <div className="only-band__copy">
          <span className="only-band__eyebrow">Book only what you need</span>
          <h2>
            Only need a hotel? <span className="accent">We do that too.</span>
          </h2>
          <p>{ONLY_SUPPORT}</p>
        </div>
        <div className="only-band__chips" aria-label={ONLY_HEADLINE}>
          {chips.map((s) => {
            const Icon = s.icon
            const to = s.id === 'visa' ? contactLink({ service: 'visa' }) : s.to
            return (
              <Link key={s.id} to={to} className="only-band__chip" onClick={() => track('only_chip_click', { service: s.id })}>
                <Icon aria-hidden="true" />
                <span>{s.chip}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
