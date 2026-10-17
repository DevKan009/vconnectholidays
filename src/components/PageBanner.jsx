import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './PageBanner.css'

export default function PageBanner({ title, image, fallbackImage, crumb, trail = [], eyebrow }) {
  // A missing first image simply doesn't paint, so the fallback shows through.
  const backgroundImage = [image, fallbackImage]
    .filter(Boolean)
    .map((src) => `url(${src})`)
    .join(', ')

  return (
    <section className="page-banner" style={{ backgroundImage }}>
      <div className="page-banner__overlay" />
      <div className="container page-banner__content">
        <nav className="page-banner__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {trail.map((item) => (
            <Fragment key={item.label}>
              <span>&raquo;</span>
              {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
            </Fragment>
          ))}
          <span>&raquo;</span>
          <span>{crumb || title}</span>
        </nav>
        {eyebrow && <span className="page-banner__eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
      </div>
    </section>
  )
}
