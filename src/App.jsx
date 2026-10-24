import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Destination from './pages/Destination'
import DestinationDetail from './pages/DestinationDetail'
import TourPackages from './pages/TourPackages'
import Contact from './pages/Contact'
import Services from './pages/Services'
import GroupTours from './pages/GroupTours'
import NotFound from './pages/NotFound'

// Visa pages and search carry the ~200 KB visa dataset, so they load on demand.
const VisaHub = lazy(() => import('./pages/visa/VisaHub'))
const VisaList = lazy(() => import('./pages/visa/VisaList'))
const VisaDetail = lazy(() => import('./pages/visa/VisaDetail'))
const RequiredDocuments = lazy(() => import('./pages/visa/RequiredDocuments'))
const SchengenChecklist = lazy(() => import('./pages/visa/SchengenChecklist'))
const SearchResults = lazy(() => import('./pages/SearchResults'))

export default function App() {
  return (
    <div className="site">
      <ScrollToTop />
      <Header />
      <main>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/destinations" element={<Destination />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/tour-packages" element={<TourPackages />} />
            <Route path="/services" element={<Services />} />
            <Route path="/group-tours" element={<GroupTours />} />
            <Route path="/visa" element={<VisaHub />} />
            <Route path="/visa/e-visa" element={<VisaList kind="e-visa" />} />
            <Route path="/visa/e-visa/:slug" element={<VisaDetail kind="e-visa" />} />
            <Route path="/visa/embassy-visa" element={<VisaList kind="visa" />} />
            <Route path="/visa/embassy-visa/:slug" element={<VisaDetail kind="visa" />} />
            <Route path="/visa/required-documents" element={<RequiredDocuments />} />
            <Route path="/visa/required-documents/schengen" element={<SchengenChecklist />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
