// Year 7 Science 5.2: the pictures for the step-practice sets in this folder.
// Each is drawn here from its own numbers and words; nothing comes from a book.
const FONT = 'font-family="Inter, ui-sans-serif, system-ui, sans-serif"'
const INK = '#1e293b'

/** A table as a picture: `head` and `rows` are lists of strings. */
export function tableSvg(head, rows, alt) {
  const [w, rowH, cols] = [460, 40, head.length]
  const colW = w / cols
  const h = rowH * (rows.length + 1)
  const out = [`<rect width="${w}" height="${h}" fill="#ffffff"/>`, `<rect width="${w}" height="${rowH}" fill="#e2e8f0"/>`]
  const cell = (text, c, r, bold) => out.push(`<text x="${c * colW + colW / 2}" y="${r * rowH + 26}" ${FONT} font-size="18" font-weight="${bold ? 800 : 600}" fill="${INK}" text-anchor="middle">${text}</text>`)
  head.forEach((t, c) => cell(t, c, 0, true))
  rows.forEach((row, r) => row.forEach((t, c) => cell(t, c, r + 1, false)))
  for (let r = 0; r <= rows.length + 1; r++) out.push(`<line x1="0" y1="${r * rowH}" x2="${w}" y2="${r * rowH}" stroke="#94a3b8" stroke-width="${r < 2 ? 2 : 1}"/>`)
  for (let c = 0; c <= cols; c++) out.push(`<line x1="${c * colW}" y1="0" x2="${c * colW}" y2="${h}" stroke="#94a3b8" stroke-width="1.5"/>`)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 ${w + 4} ${h + 4}" role="img" aria-label="${alt}">${out.join('')}</svg>`
}

/** A bar chart with two bars, A and B, on a grid from 0 to `top`. No labels on the axes: the questions ask for them. */
export function barChart(a, b, top, alt) {
  const [x0, y0, unit, barW] = [70, 300, 44, 90]
  const out = [`<rect width="420" height="350" fill="#ffffff"/>`]
  for (let n = 0; n <= top; n++) {
    const y = y0 - n * unit
    out.push(`<line x1="${x0}" y1="${y}" x2="390" y2="${y}" stroke="#cbd5e1" stroke-width="1"/>`)
    out.push(`<text x="${x0 - 12}" y="${y + 6}" ${FONT} font-size="17" font-weight="700" fill="${INK}" text-anchor="end">${n}</text>`)
  }
  for (const [value, x, name, fill] of [[a, 110, 'A', '#7dd3fc'], [b, 250, 'B', '#fdba74']]) {
    out.push(`<rect x="${x}" y="${y0 - value * unit}" width="${barW}" height="${value * unit}" fill="${fill}" stroke="${INK}" stroke-width="2.5"/>`)
    out.push(`<text x="${x + barW / 2}" y="${y0 + 28}" ${FONT} font-size="20" font-weight="800" fill="${INK}" text-anchor="middle">${name}</text>`)
  }
  out.push(`<line x1="${x0}" y1="${y0}" x2="390" y2="${y0}" stroke="${INK}" stroke-width="3"/>`, `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 - top * unit - 10}" stroke="${INK}" stroke-width="3"/>`)
  out.push(`<text x="24" y="${y0 - (top * unit) / 2}" ${FONT} font-size="22" font-weight="800" fill="#c2410c" text-anchor="middle">?</text>`)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 350" role="img" aria-label="${alt}">${out.join('')}</svg>`
}

/** A circuit to test a material: a cell, a lamp and a gap with two clips. `words` = [cell, lamp, gap]. */
export function circuit(words, alt) {
  const label = (x, y, t) => `<text x="${x}" y="${y}" ${FONT} font-size="19" font-weight="700" fill="${INK}" text-anchor="middle">${t}</text>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" role="img" aria-label="${alt}">
<rect width="480" height="320" fill="#ffffff"/>
<path d="M 226 60 H 80 V 240 H 180 M 300 240 H 400 V 60 H 254" fill="none" stroke="${INK}" stroke-width="3.5"/>
<line x1="226" y1="36" x2="226" y2="84" stroke="${INK}" stroke-width="3.5"/>
<line x1="254" y1="46" x2="254" y2="74" stroke="${INK}" stroke-width="7"/>
<circle cx="400" cy="150" r="24" fill="#fef9c3" stroke="${INK}" stroke-width="3.5"/>
<path d="M 383 133 L 417 167 M 417 133 L 383 167" stroke="${INK}" stroke-width="3"/>
<circle cx="180" cy="240" r="7" fill="#c2410c"/><circle cx="300" cy="240" r="7" fill="#c2410c"/>
<rect x="190" y="228" width="100" height="24" rx="6" fill="#fed7aa" stroke="#c2410c" stroke-width="2.5" stroke-dasharray="7 5"/>
<text x="240" y="247" ${FONT} font-size="20" font-weight="800" fill="#c2410c" text-anchor="middle">?</text>
${label(240, 112, words[0])}${label(338, 156, words[1])}${label(240, 290, words[2])}
</svg>`
}
