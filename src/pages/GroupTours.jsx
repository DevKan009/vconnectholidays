import { Link } from 'react-router-dom'
import { FaCalendarCheck, FaUserTie, FaTags, FaRoute, FaArrowRight } from 'react-icons/fa6'
import usePageTitle from '../hooks/usePageTitle'
import { PAGE_META } from '../data/seo'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import WhatsAppButton from '../components/WhatsAppButton'
import { contactLink, track } from '../utils/enquiry'
import bannerImg from '../assets/images/tourpackages-banner.jpg'
import './GroupTours.css'

// Coming Soon: every interaction on this page forwards to Contact.
const CONTACT = contactLink({ service: 'group-tours' })

const FEATURES = [
  { icon: FaCalendarCheck, title: 'Fixed departures', text: 'Set dates you can plan around, announced well in advance.' },
  { icon: FaUserTie, title: 'Tour manager on trip', text: 'A VConnect host travels with the group from start to finish.' },
  { icon: FaTags, title: 'Group pricing', text: 'Shared costs on hotels, transfers and sightseeing.' },
  { icon: FaRoute, title: 'Curated itineraries', text: 'Paced for groups, with free time built in.' },
]

export default function GroupTours() {
  usePageTitle(PAGE_META['/group-tours'])
  const onClick = (via) => track('group_tours_click', { via })

  return (
    <>
      <PageBanner title="Group Tours" image={bannerImg} crumb="Group Tours" trail={[{ label: 'Services', to: '/services' }]} />

      <section className="section group-intro">
        <div className="container container--narrow group-intro__inner">
          <span className="badge-soon group-intro__badge">Coming soon</span>
          <h2>
            Travel Together, <span className="accent">Worry Less.</span>
          </h2>
          <p>
            Fixed-departure trips with like-minded travellers, planned end to end by VConnect. We&rsquo;re putting the
            first departures together now.
          </p>
          <div className="group-intro__actions">
            <Button to={CONTACT} variant="dark">
              Register interest
            </Button>
            <WhatsAppButton
              item="Group Tours: register interest"
              text="Hi, I'd like to know when VConnect group tours open."
            />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading before="What To" highlight="Expect" />
          <div className="card-grid card-grid--4">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <Link key={title} to={CONTACT} className="group-feature" onClick={() => onClick(title)}>
                <span className="group-feature__icon" aria-hidden="true"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="group-feature__cta">
                  Get notified <FaArrowRight aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Link to={CONTACT} className="group-private" onClick={() => onClick('private group')}>
            <div>
              <span className="group-private__eyebrow">Available today</span>
              <h2>Travelling as a family or friends group now?</h2>
              <p>We plan private group trips today, for any size, any destination.</p>
            </div>
            <span className="btn btn--dark">
              <span>Plan a private group trip</span>
              <FaArrowRight className="btn-icon" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
