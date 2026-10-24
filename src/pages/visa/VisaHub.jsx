import { Link } from 'react-router-dom'
import { FaLaptop, FaBuildingColumns, FaCheck, FaArrowRight, FaFileLines } from 'react-icons/fa6'
import usePageTitle from '../../hooks/usePageTitle'
import { PAGE_META } from '../../data/seo'
import PageBanner from '../../components/PageBanner'
import SectionHeading from '../../components/SectionHeading'
import Accordion from '../../components/Accordion'
import Button from '../../components/Button'
import { VISA_KINDS } from '../../data/visas'
import { contactLink } from '../../utils/enquiry'
import bannerImg from '../../assets/images/page-banner-default.jpg'
import './Visa.css'

const CHOICES = [
  {
    kind: 'e-visa',
    icon: FaLaptop,
    points: ['Applied for online, approval by email', 'Usually scans of passport and photo', 'Often ready in 1–5 working days'],
  },
  {
    kind: 'visa',
    icon: FaBuildingColumns,
    points: ['Stamped in your passport by the embassy', 'Biometrics or interview at VFS for many countries', 'Full document file, which we prepare with you'],
  },
]

const FAQS = [
  {
    q: 'What is the difference between an e-visa and a visa?',
    a: 'An e-visa is applied for and issued online, so you usually only send scanned documents. A regular (sticker) visa is stamped into your passport by the embassy or consulate, and often needs an appointment at VFS for fingerprints or an interview.',
  },
  {
    q: 'Can I book only the visa with you, without a holiday package?',
    a: 'Yes. Many of our clients come to us only for the visa. We check your documents, fill the forms, book the appointment and track the application.',
  },
  {
    q: 'How early should I apply?',
    a: 'For e-visas, one to two weeks before travel is usually enough. For embassy visas such as Schengen, UK, USA, Canada or Australia, start four to eight weeks ahead, longer in peak season.',
  },
  {
    q: 'What are the visa fees?',
    a: 'Fees depend on the country, visa type and how fast you need it, and embassies change them often. Ask us and we will send the exact, current amount with your quote.',
  },
]

export default function VisaHub() {
  usePageTitle(PAGE_META['/visa'])

  return (
    <>
      <PageBanner title="Visa Services" image={bannerImg} trail={[{ label: 'Services', to: '/services' }]} crumb="Visa" />

      <section className="section">
        <div className="container">
          <SectionHeading
            before="Which Visa"
            highlight="Do You Need?"
            description="Choose how the country issues its visa. Every country page lists the documents to prepare."
          />
          <div className="visa-choice">
            {CHOICES.map(({ kind, icon: Icon, points }) => {
              const k = VISA_KINDS[kind]
              return (
                <Link key={kind} to={k.path} className="visa-choice__card">
                  <span className="visa-choice__icon" aria-hidden="true"><Icon /></span>
                  <span className="visa-choice__tag">{k.tagline}</span>
                  <h2>{k.label}</h2>
                  <ul>
                    {points.map((p) => (
                      <li key={p}>
                        <FaCheck aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="visa-choice__cta">
                    See {k.list.length} countries <FaArrowRight aria-hidden="true" />
                  </span>
                </Link>
              )
            })}
          </div>
          <p className="visa-only-line">
            Only the visa? We do that too. <Link to={contactLink({ service: 'visa' })}>Talk to our visa desk</Link>
          </p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="visa-docs-link">
            <div>
              <h3>Required Documents</h3>
              <p>Every country&rsquo;s checklist in one place, ready to print.</p>
            </div>
            <Button to="/visa/required-documents" variant="outline-light">
              <FaFileLines aria-hidden="true" /> View checklists
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHeading before="Visa" highlight="Questions" />
          <Accordion items={FAQS} />
        </div>
      </section>
    </>
  )
}
