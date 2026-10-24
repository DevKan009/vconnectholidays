import { useState } from 'react'
import { FaCheck, FaPrint } from 'react-icons/fa6'

// Required-documents module: one tab per visa type, printable.
export default function DocumentChecklist({ sections, title = 'Required Documents' }) {
  const [active, setActive] = useState(0)
  const current = sections[Math.min(active, sections.length - 1)]
  if (!current) return null

  return (
    <div className="doc-checklist">
      <div className="doc-checklist__head">
        <h2>{title}</h2>
        <button type="button" className="doc-checklist__print" onClick={() => window.print()}>
          <FaPrint aria-hidden="true" /> Print checklist
        </button>
      </div>

      {sections.length > 1 && (
        <div className="doc-checklist__tabs" role="tablist" aria-label="Visa type">
          {sections.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`doc-checklist__tab ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {s.title}
            </button>
          ))}
        </div>
      )}

      {sections.map((s, i) => (
        <div key={s.id} role="tabpanel" className="doc-checklist__panel" hidden={i !== active} data-print-title={s.title}>
          {s.notes.map((n) => (
            <p key={n} className="doc-checklist__note">{n}</p>
          ))}
          <ul className="doc-checklist__list">
            {s.items.map((item) => (
              <li key={item}>
                <FaCheck aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="doc-checklist__disclaimer">
        Requirements can change; our team confirms the latest list before you apply.
      </p>
    </div>
  )
}
