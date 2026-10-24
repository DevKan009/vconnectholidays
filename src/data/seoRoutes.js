// Every indexable URL with its title, description and share image.
// Build-time only: scripts/prerender-meta.mjs loads this through Vite (so the
// image imports in destinations.js resolve), writes one HTML file per route,
// and builds sitemap.xml. The app itself never imports this file.

import { destinations } from './destinations'
import { VISA_KINDS } from './visas'
import { PAGE_META, DEFAULT_OG_IMAGE, destinationMeta, visaListMeta, visaMeta } from './seo'

const page = (path, meta, extra = {}) => ({ path, ...meta, image: DEFAULT_OG_IMAGE, priority: 0.6, ...extra })

export function seoRoutes() {
  const routes = [
    page('/', PAGE_META['/'], { priority: 1 }),
    page('/about', PAGE_META['/about']),
    page('/tour-packages', PAGE_META['/tour-packages'], { priority: 0.9 }),
    page('/destinations', PAGE_META['/destinations']),
    page('/services', PAGE_META['/services'], { priority: 0.9 }),
    page('/group-tours', PAGE_META['/group-tours'], { priority: 0.5 }),
    page('/visa', PAGE_META['/visa'], { priority: 0.9 }),
    page('/visa/required-documents', PAGE_META['/visa/required-documents'], { priority: 0.8 }),
    page('/visa/required-documents/schengen', PAGE_META['/visa/required-documents/schengen'], { priority: 0.8 }),
    page('/contact', PAGE_META['/contact'], { priority: 0.8 }),
    page('/privacy-policy', PAGE_META['/privacy-policy'], { priority: 0.2 }),
  ]

  for (const d of destinations) {
    // `cover` is an imported asset (/src/...) or a /public path that may not exist yet.
    routes.push(page(`/destinations/${d.slug}`, destinationMeta(d), { image: d.cover, imageKey: d.slug, priority: 0.8 }))
  }

  for (const k of Object.values(VISA_KINDS)) {
    routes.push(page(k.path, visaListMeta(k.id, k.list.length), { priority: 0.8 }))
    for (const v of k.list) routes.push(page(`${k.path}/${v.slug}`, visaMeta(v, k.label), { priority: 0.6 }))
  }

  return routes
}
