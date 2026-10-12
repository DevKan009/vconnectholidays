import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import Button from '../components/Button'
import './NotFound.css'

export default function NotFound() {
  usePageTitle('Page Not Found')

  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <span className="not-found__code">404</span>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.</p>
        <Button to="/" variant="dark">
          Back To Home
        </Button>
        <Link to="/contact" className="not-found__link">
          Or contact us for help
        </Link>
      </div>
    </section>
  )
}
