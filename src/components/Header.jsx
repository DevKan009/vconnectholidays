import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaXmark, FaMagnifyingGlass } from 'react-icons/fa6'
import logoWhite from '../assets/images/logo-white.png'
import './Header.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Tour Packages', to: '/tour-packages' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/?s=${encodeURIComponent(query.trim())}`)
    }
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" onClick={() => setMenuOpen(false)}>
          <img src={logoWhite} alt="VConnect Holidays" />
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `site-header__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form className="site-header__search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          <button type="submit" aria-label="Search">
            <FaMagnifyingGlass />
          </button>
        </form>

        <button
          className="site-header__toggle"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu__top">
          <Link to="/" className="site-header__logo" onClick={() => setMenuOpen(false)}>
            <img src={logoWhite} alt="VConnect Holidays" className="mobile-menu__logo" />
          </Link>
          <button className="mobile-menu__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <FaXmark />
          </button>
        </div>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <form className="mobile-menu__search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          <button type="submit" aria-label="Search">
            <FaMagnifyingGlass />
          </button>
        </form>
      </div>
      {menuOpen && (
        <button className="mobile-menu__backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  )
}
