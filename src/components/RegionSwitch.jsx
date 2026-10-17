import { REGIONS } from '../data/destinations'
import './RegionSwitch.css'

export default function RegionSwitch({ value, onChange, label = 'Destination type' }) {
  return (
    <div className="region-switch" role="tablist" aria-label={label}>
      {REGIONS.map((r) => (
        <button
          key={r.id}
          type="button"
          role="tab"
          aria-selected={value === r.id}
          className={value === r.id ? 'is-active' : ''}
          onClick={() => onChange(r.id)}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}
