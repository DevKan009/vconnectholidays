// One-off: builds public/og-default.jpg, the 1200×630 card used when a page
// has no image of its own (WhatsApp, Facebook, LinkedIn link previews).
//   node scripts/make-og-default.mjs

import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const img = (f) => join(root, 'src/assets/images', f)

const logo = await sharp(img('logo-white.png')).resize({ width: 420 }).toBuffer()
const shade = Buffer.from(
  `<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
     <stop offset="0" stop-color="#141414" stop-opacity="0.15"/><stop offset="1" stop-color="#141414" stop-opacity="0.75"/>
   </linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/>
   <text x="60" y="560" font-family="Georgia, serif" font-style="italic" font-size="44" fill="#ffffff">Holidays · Hotels · Flights · Visas</text></svg>`,
)

await sharp(img('hero-riga.jpg'))
  .resize(1200, 630, { fit: 'cover' })
  .composite([{ input: shade }, { input: logo, top: 60, left: 60 }])
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(join(root, 'public/og-default.jpg'))

console.log('public/og-default.jpg written')
