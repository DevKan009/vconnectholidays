import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import { flagUrl, visaPath, VISA_KINDS } from '../data/visas'

export function Flag({ iso, name, size = 40 }) {
  const [failed, setFailed] = useState(false)
  if (!iso || failed) {
    return (
      <span className="visa-flag visa-flag--fallback" style={{ width: size, height: size * 0.7 }} aria-hidden="true">
        {name.charAt(0)}
      </span>
    )
  }
  return (
    <img
      className="visa-flag"
      src={flagUrl(iso, 80)}
      alt=""
      width={size}
      height={Math.round(size * 0.7)}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function VisaCountryCard({ visa: v, hash = '' }) {
  return (
    <Link to={visaPath(v) + hash} className="visa-card">
      <Flag iso={v.iso} name={v.name} />
      <span className="visa-card__body">
        <strong>{v.name}</strong>
        <span>
          {VISA_KINDS[v.kind].label}
          {v.facts.processing ? ` · ${v.facts.processing}` : ''}
        </span>
      </span>
      <FaArrowRight className="visa-card__arrow" aria-hidden="true" />
    </Link>
  )
}
