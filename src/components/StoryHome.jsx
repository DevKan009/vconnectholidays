import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import CountUp from './CountUp'
import { stats } from '../data/content'
import './StoryHome.css'

// Home-page "who we are" band: a short promise beside a bento of photos and numbers.
export default function StoryHome() {
  return (
    <section className="story-home" aria-labelledby="story-home-title">
      <div className="container story-home__grid">
        <div className="story-home__text">
          <span className="story-script">est. 2018 · Indore</span>
          <h2 id="story-home-title" className="story-home__title">
            Every trip, planned like it&rsquo;s <em>for family.</em>
          </h2>
          <p className="story-home__lead">
            A small, obsessive team that has quietly planned holidays for thousands of travellers, from first passports
            to fiftieth anniversaries.
          </p>
          <Link to="/about" className="story-home__link">
            <span>Read our story</span>
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="story-bento">
          <figure className="story-bento__tile story-bento__tile--tall">
            <img src="/story/manarola.webp" alt="Manarola, Cinque Terre, at dusk" loading="lazy" />
            <figcaption>Cinque Terre, Italy</figcaption>
          </figure>

          <div className="story-bento__stat story-bento__stat--gold">
            <strong>
              <CountUp value={stats.travellers} />
              <sup>K+</sup>
            </strong>
            <span className="story-bento__label">happy travellers</span>
          </div>

          <figure className="story-bento__tile story-bento__tile--wide">
            <img src="/story/aurora.webp" alt="Northern lights over Reine, Lofoten" loading="lazy" />
            <figcaption>Lofoten, Norway</figcaption>
          </figure>

          <figure className="story-bento__tile story-bento__tile--wide story-bento__tile--desktop">
            <img src="/story/oia.webp" alt="Sunset terrace in Oia, Santorini" loading="lazy" />
            <figcaption>Santorini, Greece</figcaption>
          </figure>

          <div className="story-bento__stat">
            <strong>
              <CountUp value={stats.destinations} />
              <sup>+</sup>
            </strong>
            <span className="story-bento__label">destinations</span>
          </div>
        </div>
      </div>
    </section>
  )
}
