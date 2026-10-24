// Runs after `vite build`. The site is a single-page app, so without this every
// URL would return the same index.html, and link previews (WhatsApp, Facebook,
// LinkedIn don't run JavaScript) would show the same generic card everywhere.
//
// For each route in src/data/seoRoutes.js this writes dist/<route>/index.html:
// the built shell with that page's title, description, canonical, Open Graph
// and Twitter tags. It also writes __spa-fallback.html (noindex, for search and
// unknown URLs), sitemap.xml, robots.txt and 1200×630 share images.
//
// Phase 2 (React Router framework mode with pre-rendering) replaces this script.

import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const vite = await createServer({ root, logLevel: 'error', server: { middlewareMode: true }, appType: 'custom' })
const { seoRoutes } = await vite.ssrLoadModule('/src/data/seoRoutes.js')
const { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, formatTitle } = await vite.ssrLoadModule('/src/data/seo.js')
await vite.close()

const routes = seoRoutes()
const template = await readFile(join(dist, 'index.html'), 'utf8')
const BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/
if (!BLOCK.test(template)) throw new Error('index.html is missing the <!-- seo:start --> … <!-- seo:end --> block')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// Trailing slash matches how the server serves <route>/index.html.
const urlFor = (path) => SITE_URL + (path === '/' ? '/' : `${path}/`)

// Share images: turn a cover into a 1200×630 JPEG under dist/og/ (JPEG because
// Facebook ignores AVIF). Covers that don't exist fall back to the default.
async function shareImage(route) {
  if (!route.imageKey || route.image === DEFAULT_OG_IMAGE) return DEFAULT_OG_IMAGE
  const src = route.image.startsWith('/src/') ? join(root, route.image) : join(root, 'public', route.image)
  if (!existsSync(src)) return DEFAULT_OG_IMAGE
  const out = `/og/${route.imageKey}.jpg`
  await mkdir(join(dist, 'og'), { recursive: true })
  await sharp(src).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 78, mozjpeg: true }).toFile(join(dist, out))
  return out
}

function headBlock({ title, description, url, image, noindex }) {
  const t = esc(formatTitle(title))
  const d = esc(description)
  const img = esc(SITE_URL + image)
  return [
    '<!-- seo:start -->',
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${esc(url)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    url ? `<meta property="og:url" content="${esc(url)}" />` : '',
    `<meta property="og:image" content="${img}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:locale" content="en_IN" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    '<!-- seo:end -->',
  ]
    .filter(Boolean)
    .join('\n    ')
}

const write = async (file, html) => {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

for (const route of routes) {
  const image = await shareImage(route)
  const html = template.replace(BLOCK, headBlock({ ...route, url: urlFor(route.path), image }))
  await write(route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html'), html)
}

// Served by .htaccess for anything not listed above (search results, typos).
await write(
  join(dist, '__spa-fallback.html'),
  template.replace(BLOCK, headBlock({ title: null, description: routes[0].description, image: DEFAULT_OG_IMAGE, noindex: true })),
)

const today = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((r) => `  <url><loc>${esc(urlFor(r.path))}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`),
  '</urlset>',
  '',
].join('\n')
await writeFile(join(dist, 'sitemap.xml'), sitemap)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /search\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(`prerender-meta: ${routes.length} pages, sitemap.xml, robots.txt, __spa-fallback.html`)
