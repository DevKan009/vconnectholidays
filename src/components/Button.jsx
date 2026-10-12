import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'dark',
  withArrow = true,
  type = 'button',
  className = '',
}) {
  const classes = `btn btn--${variant} ${className}`.trim()
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <FaArrowRight className="btn-icon" aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  )
}
