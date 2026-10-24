import { Link } from 'react-router-dom'
import { FaFacebookF, FaXTwitter, FaYoutube, FaTelegram, FaInstagram, FaLocationDot, FaEnvelope, FaPhone } from 'react-icons/fa6'
import logoWhite from '../assets/images/logo-white.png'
import { contactInfo } from '../data/content'
import './Footer.css'

const CURRENT_YEAR = new Date().getFullYear()

const SOCIALS = [
  { icon: FaFacebookF, label: 'Facebook' },
  { icon: FaXTwitter, label: 'Twitter' },
  { icon: FaYoutube, label: 'Youtube' },
  { icon: FaTelegram, label: 'Telegram-plane' },
  { icon: FaInstagram, label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <img src={logoWhite} alt="VConnect Holidays" className="site-footer__logo" />
          <div className="site-footer__newsletter">
            <h4>Our Newsletter</h4>
            <NewsletterForm />
          </div>
        </div>

        <nav className="site-footer__col site-footer__col--links" aria-label="Quick links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/tour-packages">Packages</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/visa">Visa</Link></li>
            <li><Link to="/visa/required-documents">Required Documents</Link></li>
            <li><Link to="/group-tours">Group Tours</Link></li>
            <li><Link to="/#faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="site-footer__col site-footer__col--support">
          <h4>Support</h4>
          {/* These items are plain, non-linked text on the live reference site too. */}
          <ul>
            <li>Help Center</li>
            <li>Booking</li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li>Terms &amp; Conditions</li>
            <li>Online Supports</li>
          </ul>
        </div>

        <div className="site-footer__col site-footer__col--contact">
          <h4>Contact Info</h4>
          <ul className="site-footer__contact">
            <li>
              <span className="site-footer__icon"><FaLocationDot /></span>
              <div>
                <span className="site-footer__contact-label">Address</span>
                <p>{contactInfo.address}</p>
              </div>
            </li>
            <li>
              <span className="site-footer__icon"><FaEnvelope /></span>
              <div>
                <span className="site-footer__contact-label">Email</span>
                {contactInfo.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`}>{email}</a>
                ))}
              </div>
            </li>
            <li>
              <span className="site-footer__icon"><FaPhone /></span>
              <div>
                <span className="site-footer__contact-label">Phone</span>
                <div className="site-footer__phones">
                  {contactInfo.phones.map((phone) => (
                    <a key={phone} href={`tel:+91${phone}`}>+91 {phone}</a>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>&copy; VConnect Holidays. All Right Reserved {CURRENT_YEAR}.</p>
          <div className="site-footer__socials">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a key={label} href="#top" aria-label={label} className="site-footer__social">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function NewsletterForm() {
  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const email = form.elements.email.value
    const message = form.querySelector('.newsletter-message')
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      message.textContent = 'Please enter a valid email address.'
      message.dataset.state = 'error'
      return
    }
    message.textContent = 'Thanks for subscribing!'
    message.dataset.state = 'success'
    form.reset()
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <div className="newsletter-form__row">
        <input type="email" name="email" placeholder="Your email address" aria-label="Email address" />
        <button type="submit">Subscribe</button>
      </div>
      <p className="newsletter-message" role="status" />
    </form>
  )
}
