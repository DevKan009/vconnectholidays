import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import './Accordion.css'

export default function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div className={`accordion-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <button
              className="accordion-item__trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              {isOpen ? <FaMinus /> : <FaPlus />}
            </button>
            <div className="accordion-item__panel" style={{ maxHeight: isOpen ? '400px' : '0px' }}>
              <p>{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
