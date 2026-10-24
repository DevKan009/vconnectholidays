// Re-encodes images over 300 KB in place (same file name and format, so no
// imports change). Photos are capped at 1600px wide, hero/cover banners at
// 1920px. A file is only replaced when the result is at least 15% smaller.
//   node scripts/optimize-images.mjs

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import sharp from 'sharp'

const MIN_BYTES = 300_000
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))

const files = [...walk('src/assets'), ...walk('public')].filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && statSync(f).size > MIN_BYTES)
let saved = 0

for (const file of files) {
  const before = statSync(file).size
  const banner = /hero-|cover\./.test(file)
  let img = sharp(readFileSync(file)).rotate().resize({ width: banner ? 1920 : 1600, withoutEnlargement: true })
  const ext = extname(file).toLowerCase()
  if (ext === '.png') img = img.png({ palette: true, quality: 90, effort: 10 })
  else if (ext === '.webp') img = img.webp({ quality: 72, effort: 6 })
  else img = img.jpeg({ quality: 76, mozjpeg: true })
  const out = await img.toBuffer()

  if (out.length <= before * 0.85) {
    writeFileSync(file, out)
    saved += before - out.length
    console.log(`${file}: ${Math.round(before / 1024)} KB -> ${Math.round(out.length / 1024)} KB`)
  } else {
    console.log(`${file}: kept (${Math.round(before / 1024)} KB, re-encode only ${Math.round(out.length / 1024)} KB)`)
  }
}
console.log(`Saved ${Math.round(saved / 1024)} KB across ${files.length} files`)
