import { FaUser, FaSackDollar, FaEarthAmericas, FaClipboardList, FaCalendarCheck, FaCompass } from 'react-icons/fa6'
import './IconBox.css'

const ICONS = {
  user: FaUser,
  money: FaSackDollar,
  globe: FaEarthAmericas,
  plan: FaClipboardList,
  booking: FaCalendarCheck,
  guide: FaCompass,
}

export default function IconBox({ icon, title, text, light = false, horizontal = false, highlighted = false }) {
  const Icon = ICONS[icon] || FaCompass
  const classes = [
    'icon-box',
    light && 'icon-box--light',
    horizontal && 'icon-box--horizontal',
    highlighted && 'icon-box--highlighted',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className="icon-box__icon">
        <Icon />
      </div>
      <div className="icon-box__body">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}
