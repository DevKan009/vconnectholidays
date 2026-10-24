import { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import usePageTitle from '../../hooks/usePageTitle'
import { PAGE_META } from '../../data/seo'
import PageBanner from '../../components/PageBanner'
import SectionHeading from '../../components/SectionHeading'
import VisaCountryCard, { Flag } from '../../components/VisaCountryCard'
import { VISA_KINDS, searchVisas } from '../../data/visas'
import bannerImg from '../../assets/images/page-banner-default.jpg'
import './Visa.css'

export default function RequiredDocuments() {
  const [query, setQuery] = useState('')
  usePageTitle(PAGE_META['/visa/required-documents'])
  const showSchengen = !query.trim() || 'schengen europe'.includes(query.trim().toLowerCase())

  return (
    <>
      <PageBanner title="Required Documents" image={bannerImg} trail={[{ label: 'Visa', to: '/visa' }]} crumb="Required Documents" />

      <section className="section">
        <div className="container">
          <SectionHeading
            before="Document"
            highlight="Checklists"
            description="Pick a country to see what to prepare. Each checklist can be printed."
          />
          <label className="search-field">
            <FaMagnifyingGlass aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a country"
              aria-label="Search a country"
            />
          </label>

          {Object.values(VISA_KINDS).map((k) => {
            const list = searchVisas(query, k.list)
            const withSchengen = k.id === 'visa' && showSchengen
            if (!list.length && !withSchengen) return null
            return (
              <div key={k.id} className="visa-group">
                <h2>
                  {k.label} <span className="accent">checklists</span>
                </h2>
                <div className="visa-grid">
                  {withSchengen && (
                    <Link to="/visa/required-documents/schengen" className="visa-card">
                      <Flag iso="eu" name="Schengen" />
                      <span className="visa-card__body">
                        <strong>Schengen Visa</strong>
                        <span>Visa · 29 European countries</span>
                      </span>
                    </Link>
                  )}
                  {list.map((v) => (
                    <VisaCountryCard key={v.slug} visa={v} hash="#documents" />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
