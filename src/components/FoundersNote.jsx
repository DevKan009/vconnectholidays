import { Link } from 'react-router-dom'
import { FaQuoteLeft, FaWhatsapp, FaArrowRight, FaCheck } from 'react-icons/fa6'
import founderImg from '../assets/images/founder.png'
import { founderYears } from '../data/content'
import { logWhatsAppClick } from '../utils/leads'
import './FoundersNote.css'

// `compact` is the short home-page version; the full note lives on the About page.
export default function FoundersNote({ compact = false }) {
  return (
    <section
      className={`section founders-note-section ${compact ? 'founders-note-section--compact' : ''}`}
      id={compact ? undefined : 'founders-note'}
      aria-labelledby="founders-note-title"
    >
      <div className="container">
        <div className={`founders-note-card ${compact ? 'founders-note-card--compact' : ''}`}>
          {/* Media Column */}
          <div className="founders-note-media">
            <div className="founders-note-image-frame">
              <img
                src={founderImg}
                alt="Vanita Jain, Founder of VConnect Holidays"
                className="founders-note-img"
                loading="lazy"
              />
              <div className="founders-note-gold-accent" aria-hidden="true" />
            </div>

            {!compact && (
            <>
            <div className="founders-note-badge">
              <span className="founders-badge-dot" />
              <span>Founder &amp; Travel Curator</span>
            </div>

            <div className="founders-note-trust-tag">
              <span className="founders-trust-years">{founderYears}+ Years</span>
              <span className="founders-trust-sub">Crafting Bespoke Holidays</span>
            </div>
            </>
            )}
          </div>

          {/* Content Column */}
          <div className="founders-note-content">
            <div className="founders-note-eyebrow">
              <span className="founders-eyebrow-line" aria-hidden="true" />
              <span>From The Founder&rsquo;s Desk</span>
            </div>

            <div className="founders-quote-wrapper">
              <FaQuoteLeft className="founders-quote-icon" aria-hidden="true" />
              <h2 id="founders-note-title" className="founders-note-headline">
                Travel isn&rsquo;t just about destinations — it&rsquo;s about the feelings that{' '}
                <span className="accent">stay with you forever.</span>
              </h2>
            </div>

            {compact ? (
              <div className="founders-note-body">
                <p>
                  When I founded VConnect Holidays in 2018, my promise was simple: to plan every traveler&rsquo;s vacation
                  with the same care and honesty as I would for my own family.
                </p>
              </div>
            ) : (
              <>
            <div className="founders-note-body">
              <p>
                When I founded VConnect Holidays in 2018 in Indore, my promise was simple yet deeply personal: to plan
                every traveler&rsquo;s vacation with the same affection, honesty, and attention to detail as I would for my
                own family. Travel should never feel like a cookie-cutter transaction — it should be a soulful escape
                filled with authentic discovery and complete peace of mind.
              </p>
              <p>
                Whether you are stepping into a romantic honeymoon in the tropics, chasing the Northern Lights, or
                taking your family on their first international adventure, my team and I stay by your side 24/7. Thank
                you for inviting us to be part of your most cherished travel memories.
              </p>
            </div>

            <div className="founders-highlights" aria-label="Key Commitments">
              <span className="founders-pill">
                <FaCheck className="founders-pill-icon" aria-hidden="true" /> Handcrafted Itineraries
              </span>
              <span className="founders-pill">
                <FaCheck className="founders-pill-icon" aria-hidden="true" /> 24/7 Dedicated On-Trip Care
              </span>
              <span className="founders-pill">
                <FaCheck className="founders-pill-icon" aria-hidden="true" /> 25000+ Happy Travelers
              </span>
            </div>
              </>
            )}

            <div className="founders-footer">
              <div className="founders-signature-block">
                <span className="founders-signature-name">Vanita Jain</span>
                <span className="founders-signature-role">Founder &amp; Managing Director</span>
                <span className="founders-signature-location">VConnect Holidays • Indore, India</span>
              </div>

              <div className="founders-actions">
                <a
                  href="https://wa.me/919098686133?text=Hi%20Vanita,%20I'd%20like%20to%20plan%20my%20next%20vacation%20with%20VConnect%20Holidays!"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--founder-whatsapp"
                  aria-label="Chat with Vanita Jain on WhatsApp"
                  onClick={() => logWhatsAppClick("Founder's note: Chat with Vanita")}
                >
                  <FaWhatsapp className="btn-icon" aria-hidden="true" />
                  <span>Chat With Vanita</span>
                </a>

                {compact ? (
                  <Link to="/about#founders-note" className="btn btn--outline-dark">
                    <span>Read Vanita&rsquo;s Story</span>
                    <FaArrowRight className="btn-icon" aria-hidden="true" />
                  </Link>
                ) : (
                  <Link to="/contact" className="btn btn--outline-dark" aria-label="Plan your customized trip">
                    <span>Plan Your Trip</span>
                    <FaArrowRight className="btn-icon" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
