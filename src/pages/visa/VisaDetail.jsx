import { Link, useParams } from 'react-router-dom'
import { FaClock, FaCalendarDays, FaHourglassHalf, FaDoorOpen, FaIndianRupeeSign } from 'react-icons/fa6'
import usePageTitle from '../../hooks/usePageTitle'
import { visaMeta } from '../../data/seo'
import PageBanner from '../../components/PageBanner'
import DocumentChecklist from '../../components/DocumentChecklist'
import VisaCountryCard, { Flag } from '../../components/VisaCountryCard'
import WhatsAppButton from '../../components/WhatsAppButton'
import NotFound from '../NotFound'
import { VISA_KINDS, getVisa, matchingDestination, visasByKind } from '../../data/visas'
import { contactLink, track } from '../../utils/enquiry'
import bannerImg from '../../assets/images/page-banner-default.jpg'
import '../DestinationDetail.css'
import './Visa.css'

function otherCountries(v, count = 4) {
  const list = visasByKind(v.kind)
  const i = list.findIndex((x) => x.slug === v.slug)
  return [...list.slice(i + 1), ...list.slice(0, i)].slice(0, count)
}

export default function VisaDetail({ kind }) {
  const { slug } = useParams()
  const v = getVisa(kind, slug)
  const k = VISA_KINDS[kind]

  usePageTitle(v ? visaMeta(v, k.label) : 'Page Not Found')

  if (!v) return <NotFound />

  const enquire = contactLink({ service: 'visa', country: v.slug })
  const destination = matchingDestination(v)
  const facts = [
    { icon: FaClock, label: 'Processing', value: v.facts.processing },
    { icon: FaCalendarDays, label: 'Validity', value: v.facts.validity },
    { icon: FaHourglassHalf, label: 'Stay', value: v.facts.stay },
    { icon: FaDoorOpen, label: 'Entries', value: v.facts.entries },
    { icon: FaIndianRupeeSign, label: 'Fees', value: 'On request', highlight: true },
  ].filter((f) => f.value)
  const waText = `Hi, I need help with a ${v.name} ${k.label.toLowerCase()}.`

  return (
    <>
      <PageBanner
        title={`${v.name} ${k.label}`}
        eyebrow={k.tagline}
        image={bannerImg}
        trail={[
          { label: 'Visa', to: '/visa' },
          { label: k.crumb, to: k.path },
        ]}
        crumb={v.name}
      />

      <div className="dest-detail">
        <section className="dest-facts">
          <div className="container">
            <ul className="dest-facts__list">
              {facts.map(({ icon: Icon, label, value, highlight }) => (
                <li key={label} className={highlight ? 'is-highlight' : ''}>
                  <Icon aria-hidden="true" />
                  <div>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container visa-detail__grid">
            <div id="documents">
              {v.notes.length > 0 && (
                <div className="visa-notes">
                  {v.notes.map((n) => (
                    <p key={n}>{n}</p>
                  ))}
                </div>
              )}

              <DocumentChecklist sections={v.sections} />

              {v.options.length > 0 && (
                <div className="visa-options">
                  <h3>Visa options we arrange</h3>
                  <ul>
                    {v.options.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </div>
              )}

              {v.schengen && (
                <p className="visa-schengen-link">
                  This is a Schengen visa. <Link to="/visa/required-documents/schengen">Full Schengen checklist</Link>
                </p>
              )}
            </div>

            <aside className="visa-aside">
              <div className="visa-aside__box">
                <h3>
                  <Flag iso={v.iso} name={v.name} size={28} /> {v.name}
                </h3>
                <p>Send us your documents and we&rsquo;ll check them, fill the forms and book any appointment.</p>
                <div className="visa-aside__actions">
                  <Link to={enquire} className="btn btn--dark" onClick={() => track('visa_enquire_click', { visa: v.slug, kind })}>
                    <span>Enquire about this visa</span>
                  </Link>
                  <WhatsAppButton item={`Visa: ${v.name} ${k.label}`} text={waText} />
                </div>
              </div>

              {destination && (
                <Link to={`/destinations/${destination.slug}`} className="visa-crosssell" onClick={() => track('visa_crosssell_click', { visa: v.slug })}>
                  <span>Planning a holiday?</span>
                  <strong>See our {destination.place} packages &rarr;</strong>
                </Link>
              )}

              {v.embassy.length > 0 && (
                <div className="visa-aside__box">
                  <h3>Embassy &amp; VFS</h3>
                  <ul>
                    {v.embassy.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>

        <section className="section section--soft no-print">
          <div className="container">
            <h2 className="visa-group__title">Other {k.label} countries</h2>
            <div className="visa-grid">
              {otherCountries(v).map((o) => (
                <VisaCountryCard key={o.slug} visa={o} />
              ))}
            </div>
          </div>
        </section>

        <div className="dest-bookbar" role="region" aria-label={`Get help with your ${v.name} visa`}>
          <div className="container dest-bookbar__inner">
            <div className="dest-bookbar__text">
              <strong>{v.name} {k.label.toLowerCase()}</strong>
              <span>{[v.facts.processing, 'Fees on request'].filter(Boolean).join(' · ')}</span>
            </div>
            <div className="dest-bookbar__actions">
              <WhatsAppButton item={`Visa bar: ${v.name}`} text={waText} className="btn dest-bookbar__wa" />
              <Link to={enquire} className="btn btn--dark" onClick={() => track('visa_enquire_click', { visa: v.slug, kind, via: 'bar' })}>
                <span>Enquire</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
