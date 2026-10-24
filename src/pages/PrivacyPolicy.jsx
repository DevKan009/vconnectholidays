import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import PageBanner from '../components/PageBanner'
import { PAGE_META } from '../data/seo'
import { contactInfo } from '../data/content'
import bannerImg from '../assets/images/page-banner-default.jpg'
import './PrivacyPolicy.css'

// Plain-language notice for what the enquiry form and WhatsApp buttons collect.
// Draft for the client to review; update it if analytics or new forms are added.
const UPDATED = '24 October 2026'

export default function PrivacyPolicy() {
  usePageTitle(PAGE_META['/privacy-policy'])

  return (
    <>
      <PageBanner title="Privacy Policy" image={bannerImg} />

      <section className="section">
        <div className="container container--narrow privacy">
          <p className="privacy__updated">Last updated: {UPDATED}</p>

          <h2>Who we are</h2>
          <p>
            VConnect Holidays, {contactInfo.address}. This notice explains what we collect through
            vconnectholidays.com, why, and what you can ask us to do with it.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>When you send an enquiry:</strong> your name, phone number, email address, the services you
              need, and any trip details or message you add.
            </li>
            <li>
              <strong>When you tap a WhatsApp button:</strong> which page and button you used, the time, the page you
              came from, and a random visit ID. We don&rsquo;t see your WhatsApp messages unless you send them to us.
            </li>
          </ul>
          <p>We don&rsquo;t use advertising cookies, and we don&rsquo;t sell your details.</p>

          <h2>Why we use it</h2>
          <ul>
            <li>To reply to your enquiry and call you back.</li>
            <li>To plan, quote and book the trip, hotel, flight, visa or insurance you ask for.</li>
            <li>To send you a confirmation of your enquiry.</li>
          </ul>

          <h2>Where it is stored and who sees it</h2>
          <p>
            Enquiries are stored in our Google account (Google Sheets and email), which only our team can access. When you book, we share only what is needed with the hotels, airlines, insurers, embassies or
            visa centres involved.
          </p>

          <h2>How long we keep it</h2>
          <p>
            As long as we need it to handle your enquiry or booking, and longer only where the law requires us to keep
            records.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to show, correct or delete your details, or to stop contacting you, at any time. Email{' '}
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> or call{' '}
            <a href={`tel:+91${contactInfo.phones[0]}`}>+91 {contactInfo.phones[0]}</a>.
          </p>

          <p className="privacy__back">
            <Link to="/contact">Back to Contact</Link>
          </p>
        </div>
      </section>
    </>
  )
}
