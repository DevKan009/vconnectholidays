import { Link } from 'react-router-dom'
import usePageTitle from '../../hooks/usePageTitle'
import { PAGE_META } from '../../data/seo'
import PageBanner from '../../components/PageBanner'
import DocumentChecklist from '../../components/DocumentChecklist'
import WhatsAppButton from '../../components/WhatsAppButton'
import { schengenChecklist, schengenMembers, visasByKind, visaPath } from '../../data/visas'
import { contactLink } from '../../utils/enquiry'
import bannerImg from '../../assets/images/page-banner-default.jpg'
import './Visa.css'

export default function SchengenChecklist() {
  usePageTitle(PAGE_META['/visa/required-documents/schengen'])
  const pages = Object.fromEntries(visasByKind('visa').filter((v) => v.schengen).map((v) => [v.name, v]))

  return (
    <>
      <PageBanner
        title="Schengen Visa"
        eyebrow="Required documents"
        image={bannerImg}
        trail={[
          { label: 'Visa', to: '/visa' },
          { label: 'Required Documents', to: '/visa/required-documents' },
        ]}
        crumb="Schengen"
      />

      <section className="section">
        <div className="container visa-detail__grid">
          <div>
            <div className="visa-notes">
              <p>
                One short-stay Schengen visa covers all 29 member countries: up to 90 days in any 180-day period.
                Apply to the country where you will spend the most nights, or enter first if the nights are equal.
              </p>
            </div>
            <DocumentChecklist sections={schengenChecklist()} title="Schengen Checklist" />
          </div>

          <aside className="visa-aside">
            <div className="visa-aside__box">
              <h3>Need help with the file?</h3>
              <p>We check every document, fill the form and book your VFS appointment.</p>
              <div className="visa-aside__actions">
                <Link to={contactLink({ service: 'visa', country: 'schengen' })} className="btn btn--dark">
                  <span>Enquire</span>
                </Link>
                <WhatsAppButton item="Visa: Schengen" text="Hi, I need help with a Schengen visa." />
              </div>
            </div>
            <div className="visa-aside__box">
              <h3>Countries it covers</h3>
              <ul className="schengen-members">
                {schengenMembers.map((name) => (
                  <li key={name}>{pages[name] ? <Link to={visaPath(pages[name])}>{name}</Link> : <span>{name}</span>}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
