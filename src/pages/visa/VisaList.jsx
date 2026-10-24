import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import usePageTitle from '../../hooks/usePageTitle'
import PageBanner from '../../components/PageBanner'
import SectionHeading from '../../components/SectionHeading'
import VisaCountryCard from '../../components/VisaCountryCard'
import { VISA_KINDS, searchVisas } from '../../data/visas'
import { contactLink } from '../../utils/enquiry'
import bannerImg from '../../assets/images/page-banner-default.jpg'
import './Visa.css'

export default function VisaList({ kind }) {
  const k = VISA_KINDS[kind]
  const [query, setQuery] = useState('')
  const results = searchVisas(query, k.list)

  usePageTitle(
    `${k.label} Countries`,
    kind === 'e-visa'
      ? `E-visa assistance for ${k.list.length} countries from VConnect Holidays, Indore. Document lists and processing times.`
      : `Embassy visa assistance for ${k.list.length} countries from VConnect Holidays, Indore. Document checklists, VFS appointments and processing times.`,
  )

  return (
    <>
      <PageBanner title={k.label} eyebrow={k.tagline} image={bannerImg} trail={[{ label: 'Visa', to: '/visa' }]} crumb={k.crumb} />

      <section className="section">
        <div className="container">
          <SectionHeading
            before="Choose Your"
            highlight="Country"
            description={`${k.list.length} countries. Open one for its required documents and processing time.`}
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

          {results.length > 0 ? (
            <div className="visa-grid">
              {results.map((v) => (
                <VisaCountryCard key={v.slug} visa={v} />
              ))}
            </div>
          ) : (
            <p className="visa-empty">
              No {k.label.toLowerCase()} listed for &ldquo;{query}&rdquo;. We may still be able to help:{' '}
              <Link to={contactLink({ service: 'visa', country: query.trim().toLowerCase().replace(/\s+/g, '-') })}>ask our visa desk</Link>.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
