import { FaWhatsapp } from 'react-icons/fa6'
import { whatsappTextLink, track } from '../utils/enquiry'
import { logWhatsAppClick } from '../utils/leads'

// WhatsApp link that also records the click (analytics + lead Sheet).
// `item` names what was clicked, e.g. "Visa: France".
export default function WhatsAppButton({ text, item, className = 'btn btn--whatsapp', children = 'WhatsApp' }) {
  return (
    <a
      href={whatsappTextLink(text)}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => {
        track('whatsapp_click', { item })
        logWhatsAppClick(item)
      }}
    >
      <FaWhatsapp aria-hidden="true" />
      <span>{children}</span>
    </a>
  )
}
