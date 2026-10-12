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

        <div className="site-footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/destination">Destination</Link></li>
            <li><Link to="/tour-packages">Packages</Link></li>
            <li><Link to="/#faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Support</h4>
          {/* These items are plain, non-linked text on the live reference site too. */}
          <ul className="site-footer__col--static">
            <li>Help Center</li>
            <li>Booking</li>
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
            <li>Online Supports</li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Contact Info</h4>
          <ul className="site-footer__contact">
            <li>
              <span className="site-footer__contact-label"><FaLocationDot /> Address</span>
              {contactInfo.address}
            </li>
            <li>
              <span className="site-footer__contact-label"><FaEnvelope /> Email</span>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
            <li>
              <span className="site-footer__contact-label"><FaPhone /> Phone</span>
              {contactInfo.phones.join(' | ')}
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
