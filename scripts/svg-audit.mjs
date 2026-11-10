/**
 * SVG text-fit audit for classroom lesson diagrams.
 *   A) text overflowing the viewBox (FRAME)
 *   B) text overflowing the <rect> it sits inside (BOX)  <-- the usual bug
 * Scans classroom/content/<course>/<unit>/diagrams.js template blocks and inline
 * `inlineSvg:` blocks in slides.js. It estimates text width from the character count,
 * and sees only label <text> written out literally (docs/TRAPS.md, "SVG and the audit").
 *
 *   node scripts/svg-audit.mjs              every course
 *   node scripts/svg-audit.mjs y7-science   one course
 *
 * Exits 1 when anything overflows, so it can gate a deploy.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const SRC = fileURLToPath(new URL('../classroom/content', import.meta.url))
const ONLY = process.argv[2]
const PAD = 6

const factor = (w) => (w === '900' ? 0.6 : w === 'bold' ? 0.57 : 0.52)
const widthOf = (s, size, w) => s.length * size * factor(w)

function extractBlocks(src) {
  const out = []
  const re = /^[ \t]*([A-Z_0-9]+):[ \t]*`/gm
  let m
  while ((m = re.exec(src))) {
    const start = re.lastIndex
    let i = start
    while (i < src.length) {
      if (src[i] === '\\') { i += 2; continue }
      if (src[i] === '`') break
      i++
    }
    out.push([m[1], src.slice(start, i)])
    re.lastIndex = i + 1
  }
  return out
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").trim()

function parseTexts(svg) {
  const out = []
  for (const m of svg.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)) {
    const a = m[1]
    const content = decode(m[2])
    if (!content) continue
    out.push({
      content,
      x: Number(/\bx="(-?[\d.]+)"/.exec(a)?.[1] ?? NaN),
      y: Number(/\by="(-?[\d.]+)"/.exec(a)?.[1] ?? NaN),
      size: Number(/font-size="([\d.]+)"/.exec(a)?.[1] ?? 16),
      weight: /font-weight="([^"]+)"/.exec(a)?.[1] || 'normal',
      anchor: /text-anchor="([^"]+)"/.exec(a)?.[1] || 'start',
      rotated: /transform="[^"]*rotate/.test(a),
    })
  }
  return out
}

function parseRects(svg) {
  const out = []
  for (const m of svg.matchAll(/<rect\b([^>]*)\/?>/g)) {
    const a = m[1]
    const x = Number(/\bx="(-?[\d.]+)"/.exec(a)?.[1] ?? NaN)
    const y = Number(/\by="(-?[\d.]+)"/.exec(a)?.[1] ?? NaN)
    const w = Number(/\bwidth="([\d.]+)"/.exec(a)?.[1] ?? NaN)
    const h = Number(/\bheight="([\d.]+)"/.exec(a)?.[1] ?? NaN)
    if ([x, y, w, h].some(Number.isNaN)) continue
    out.push({ x, y, w, h })
  }
  return out
}

const bounds = (t) => {
  const w = widthOf(t.content, t.size, t.weight)
  if (t.anchor === 'middle') return [t.x - w / 2, t.x + w / 2]
  if (t.anchor === 'end') return [t.x - w, t.x]
  return [t.x, t.x + w]
}

const findings = []
let diagrams = 0
let labels = 0

function audit(label, key, svg) {
  const vb = /viewBox="([\d.\-\s]+)"/.exec(svg)
  if (!vb) return
  const [minX, , vw] = vb[1].trim().split(/\s+/).map(Number)
  const maxX = minX + vw
  const rects = parseRects(svg)
  diagrams++

  for (const t of parseTexts(svg)) {
    if (Number.isNaN(t.x) || t.rotated) continue
    labels++
    const [l, r] = bounds(t)
    const over = []
    if (l < minX - 1) over.push(`${Math.round(minX - l)}px past left edge`)
    if (r > maxX + 1) over.push(`${Math.round(r - maxX)}px past right edge`)
    if (over.length) {
      findings.push({ label, key, kind: 'FRAME', msg: `"${t.content.slice(0, 46)}" ${over.join(' and ')}` })
      continue
    }
    if (Number.isNaN(t.y)) continue
    const holders = rects
      .filter((c) => t.x >= c.x && t.x <= c.x + c.w && t.y >= c.y - t.size && t.y <= c.y + c.h + 2)
      .sort((a, b) => a.w * a.h - b.w * b.h)
    const box = holders[0]
    if (!box) continue
    const slackL = l - box.x
    const slackR = box.x + box.w - r
    if (slackL < PAD || slackR < PAD) {
      const amt = Math.round(Math.max(PAD - slackL, PAD - slackR))
      findings.push({ label, key, kind: 'BOX', msg: `"${t.content.slice(0, 46)}${t.content.length > 46 ? '…' : ''}" (${t.size}px) short by ${amt}px in a ${box.w}px box` })
    }
  }
}

if (!fs.existsSync(SRC)) {
  console.error(`No lessons folder at ${SRC}`)
  process.exit(2)
}
{
  for (const course of fs.readdirSync(SRC)) {
    if (ONLY && course !== ONLY) continue
    const cp = path.join(SRC, course)
    if (!fs.statSync(cp).isDirectory()) continue
    for (const unit of fs.readdirSync(cp)) {
      const dir = path.join(cp, unit)
      if (!fs.statSync(dir).isDirectory()) continue
      const dg = path.join(dir, 'diagrams.js')
      if (fs.existsSync(dg)) for (const [key, svg] of extractBlocks(fs.readFileSync(dg, 'utf8'))) audit(`${course}/${unit}`, key, svg)
      const sl = path.join(dir, 'slides.js')
      if (fs.existsSync(sl)) {
        const src = fs.readFileSync(sl, 'utf8')
        let i = 0
        for (const m of src.matchAll(/inlineSvg:\s*`([\s\S]*?)`,\n/g)) audit(`${course}/${unit}`, `slides.js inline #${++i}`, m[1])
      }
    }
  }
}

const byUnit = {}
for (const f of findings) (byUnit[f.label] ||= []).push(f)
for (const u of Object.keys(byUnit).sort()) {
  const frame = byUnit[u].filter((f) => f.kind === 'FRAME')
  const box = byUnit[u].filter((f) => f.kind === 'BOX')
  console.log(`\n${u}   ${frame.length} frame, ${box.length} box`)
  for (const f of [...frame, ...box]) console.log(`  [${f.kind}] ${f.key.padEnd(28)} ${f.msg}`)
}
// Zero labels measured means the audit saw nothing, not that everything fits.
console.log(`\n${diagrams} diagrams, ${labels} literal labels measured${ONLY ? ` in ${ONLY}` : ''}`)
console.log(`total: ${findings.filter((f) => f.kind === 'FRAME').length} frame overflows, ${findings.filter((f) => f.kind === 'BOX').length} box overflows`)
process.exit(findings.length ? 1 : 0)
