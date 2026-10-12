import { Link } from 'react-router-dom'
import './PageBanner.css'

export default function PageBanner({ title, image, crumb }) {
  return (
    <section className="page-banner" style={{ backgroundImage: `url(${image})` }}>
      <div className="page-banner__overlay" />
      <div className="container page-banner__content">
        <nav className="page-banner__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>&raquo;</span>
          <span>{crumb || title}</span>
        </nav>
        <h1>{title}</h1>
      </div>
    </section>
  )
}
