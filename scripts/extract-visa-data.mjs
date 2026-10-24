// One-time extractor for the visa reference content (tpvisa.com, a Framer site).
// Each country page embeds its CMS record in <script id="__framer__handoverData">
// as a flattened array; this walks the record in field order and keeps the
// text fields. Fees and images are deliberately skipped.
//
//   node scripts/extract-visa-data.mjs            -> scripts/out/raw-visas.json
//   node scripts/extract-visa-data.mjs <url>      -> prints one page (debugging)

import { mkdir, writeFile } from 'node:fs/promises'

const ORIGIN = 'https://www.tpvisa.com'

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (content migration)' } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

function handover(html) {
  const m = html.match(/<script type="framer\/handover" id="__framer__handoverData">([\s\S]*?)<\/script>/)
  return m ? JSON.parse(m[1]) : null
}

// Framer rich text: [1, ...nodes]; element = [4, tag, attrs, ...children]; text = [5, "..."]
function richText(src) {
  const root = JSON.parse(src)
  const blocks = []
  const textOf = (n) => (n[0] === 5 ? n[1] : n[0] === 4 ? n.slice(3).map(textOf).join(n[1] === 'br' ? '\n' : '') : '')
  const walk = (n) => {
    if (n[0] !== 4) return
    const tag = n[1]
    if (tag === 'ul' || tag === 'ol') {
      blocks.push({ list: n.slice(3).map((li) => textOf(li).trim()).filter(Boolean) })
    } else if (/^(p|h\d)$/.test(tag)) {
      const t = textOf(n).trim()
      if (t) blocks.push({ [tag === 'p' ? 'p' : 'h']: t })
    } else n.slice(3).forEach(walk)
  }
  root.slice(1).forEach(walk)
  return blocks
}

function record(arr, slug) {
  const at = (i) => arr[i]
  // The record is the object whose resolved values include the page slug's title row.
  const candidates = arr.filter((v) => v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length > 10)
  for (const obj of candidates) {
    const fields = []
    for (const idx of Object.values(obj)) {
      const v = at(idx)
      if (!v || typeof v !== 'object' || !('value' in v)) continue
      const val = at(v.value)
      if (typeof val === 'string') fields.push({ kind: 'string', value: val })
      else if (val && typeof val === 'object' && 'pointer' in val) {
        const src = at(val.pointer)
        if (typeof src === 'string' && src.startsWith('[')) fields.push({ kind: 'rich', value: richText(src) })
      }
    }
    if (fields.some((f) => f.kind === 'rich')) return { slug, fields }
  }
  return { slug, fields: [] }
}

async function page(url) {
  const html = await get(url)
  const arr = handover(html)
  const slug = url.split('/').pop()
  return arr ? record(arr, slug) : { slug, fields: [] }
}

const one = process.argv[2]
if (one) {
  console.log(JSON.stringify(await page(one), null, 2))
} else {
  const sitemap = await get(`${ORIGIN}/sitemap.xml`)
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => /\/(e-visa|stamping-visa)\/[^/]+$/.test(u))
  const out = { source: ORIGIN, fetchedAt: new Date().toISOString(), eVisa: [], visa: [] }
  for (const url of urls) {
    const rec = await page(url)
    ;(url.includes('/e-visa/') ? out.eVisa : out.visa).push(rec)
    process.stdout.write('.')
  }
  await mkdir(new URL('./out/', import.meta.url), { recursive: true })
  await writeFile(new URL('./out/raw-visas.json', import.meta.url), JSON.stringify(out, null, 2))
  console.log(`\n${out.eVisa.length} e-visa + ${out.visa.length} visa pages -> scripts/out/raw-visas.json`)
}
