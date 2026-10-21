import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheck } from 'react-icons/fa6'
import ranjanImg from '../assets/images/ranjan-jain.webp'
import './CoFounder.css'

const POINTS = [
  'Built a new B2B vertical for Madhya Pradesh',
  'Promotes MP to inbound travellers, from Ujjain and Omkareshwar to Pachmarhi',
  'Helps travellers from MP plan trips across India and abroad',
]

// A simpler companion to the Founder's Note.
export default function CoFounder() {
  return (
    <section className="section cofounder" id="co-founder" aria-labelledby="cofounder-title">
      <div className="container">
        <div className="cofounder__card">
          <img
            src={ranjanImg}
            alt="Ranjan Jain, Co-Founder of VConnect Holidays"
            className="cofounder__photo"
            loading="lazy"
          />
          <div className="cofounder__body">
            <span className="cofounder__eyebrow">Co-Founder</span>
            <h2 id="cofounder-title" className="cofounder__title">
              Ranjan Jain, growing VConnect <span className="accent">beyond holidays.</span>
            </h2>
            <p className="cofounder__text">
              Ranjan joined to make VConnect Holidays stronger by adding one more vertical: B2B travel across Madhya
              Pradesh. He puts his energy into promoting MP among both inbound and outbound travellers, so the places
              closest to our Indore home get the attention they deserve.
            </p>
            <ul className="cofounder__points">
              {POINTS.map((point) => (
                <li key={point}>
                  <FaCheck aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link to="/destinations/madhya-pradesh" className="cofounder__link">
              <span>Explore Madhya Pradesh</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
