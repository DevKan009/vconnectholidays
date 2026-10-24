import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaXmark, FaMagnifyingGlass, FaChevronDown } from 'react-icons/fa6'
import logoWhite from '../assets/images/logo-white.png'
import { services } from '../data/services'
import './Header.css'

// Visa splits into its two flows in the menu; the rest come straight from services.js.
const SERVICE_MENU = [
  { label: 'All services', to: '/services' },
  ...services.flatMap((s) =>
    s.id === 'visa'
      ? [
          { label: 'E-Visa', to: '/visa/e-visa' },
          { label: 'Visa', to: '/visa/embassy-visa' },
        ]
      : [{ label: s.title, to: s.to, comingSoon: s.comingSoon }],
  ),
]

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Tour Packages', to: '/tour-packages' },
  { label: 'Services', to: '/services', menu: SERVICE_MENU },
  { label: 'Visa', to: '/visa' },
  { label: 'Contact', to: '/contact' },
]

function MenuItems({ onPick }) {
  return SERVICE_MENU.map((item) => (
    <li key={item.label}>
      <Link to={item.to} onClick={onPick}>
        <span>{item.label}</span>
        {item.comingSoon && <span className="badge-soon">Soon</span>}
      </Link>
    </li>
  ))
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close the desktop dropdown whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setDropdownOpen(false)
  }

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
    setMenuOpen(false)
  }

  function closeAll() {
    setMenuOpen(false)
    setDropdownOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" onClick={() => setMenuOpen(false)}>
          <img src={logoWhite} alt="VConnect Holidays" />
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.menu ? (
              <div
                key={link.to}
                className={`site-header__dropdown ${dropdownOpen ? 'is-open' : ''}`}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                onKeyDown={(e) => e.key === 'Escape' && setDropdownOpen(false)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `site-header__link ${isActive || pathname.startsWith('/group-tours') ? 'is-active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
                <button
                  type="button"
                  className="site-header__caret"
                  aria-label="Show services"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((o) => !o)}
                >
                  <FaChevronDown />
                </button>
                <ul className="site-header__menu">
                  <MenuItems onPick={closeAll} />
                </ul>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `site-header__link ${isActive ? 'is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ),
          )}
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
          {NAV_LINKS.map((link) =>
            link.menu ? (
              <div key={link.to} className={`mobile-menu__group ${mobileServicesOpen ? 'is-open' : ''}`}>
                <div className="mobile-menu__group-row">
                  <NavLink to={link.to} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </NavLink>
                  <button
                    type="button"
                    className="mobile-menu__expand"
                    aria-label="Show services"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((o) => !o)}
                  >
                    <FaChevronDown />
                  </button>
                </div>
                {mobileServicesOpen && (
                  <ul className="mobile-menu__sub">
                    <MenuItems onPick={() => setMenuOpen(false)} />
                  </ul>
                )}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ),
          )}
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
