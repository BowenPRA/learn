/**
 * Static checks on a unit's slides.js that eslint cannot see.
 *
 *   node .claude/skills/new-lesson/scripts/slides-lint.mjs classroom/content/y7-science/U03_4/slides.js --no-vn
 *   node .claude/skills/new-lesson/scripts/slides-lint.mjs classroom/content/y7-science/U02_5/slides.js
 *
 * `--no-vn` is for an English-and-French deck (meta.vietnamese: false, every Year 7
 * deck since 15 October 2026); without it the script expects EN/VN/FR, as in the
 * older decks.
 *
 * Three failures this catches, all of which ship silently:
 *
 *  1. A user-facing string with no `…Vn` twin, or no `…Fr` twin. A missing
 *     twin silently falls back to English mid-slide, so the class reading the
 *     other language loses that line. Pass `--no-fr` for a deck that does not
 *     set `meta.french` (the Year 7 tasks).
 *  2. An UNBALANCED `$`. `parseInlineText` splits on /(\$[\s\S]+?\$)/ to find
 *     KaTeX, so dollar signs pair up greedily. Balanced pairs are fine and the
 *     maths decks rely on them — but an odd number of `$` in a string means
 *     one of them will either pair with the wrong partner and swallow the
 *     words between, or render as a stray. Currency is the usual culprit:
 *     write "20 dollars". An escaped `\$` does not help; it prints the
 *     backslash and still counts.
 *  3. A `…Fr` twin whose `$…$` maths differs from the English. The maths is
 *     the same in every language; a changed span is a translation that
 *     touched a number or a decimal point.
 *
 * slides.js imports diagrams, widgets (.jsx) and images, none of which node
 * can load directly — so the imports are stripped and every imported
 * identifier is replaced with a permissive stub before evaluating.
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import { pathToFileURL } from 'url'

const target = process.argv.slice(2).find((a) => !a.startsWith('--'))
const FRENCH = !process.argv.includes('--no-fr')
// An English-and-French deck (meta.vietnamese: false — Year 7 from Unit 4).
const VIETNAMESE = !process.argv.includes('--no-vn')
if (!target) {
  console.error('usage: node slides-lint.mjs <path-to-slides.js> [--no-fr] [--no-vn]')
  process.exit(2)
}
const src = fs.readFileSync(target, 'utf8')

// Collect every identifier the file imports, so each can be stubbed.
const ids = []
for (const m of src.matchAll(/^import\s+([^'"]+?)\s+from\s+['"][^'"]+['"];?\s*$/gm)) {
  const clause = m[1].trim()
  const named = /\{([^}]*)\}/.exec(clause)
  if (named) {
    for (const part of named[1].split(',')) {
      const id = part.split(/\s+as\s+/).pop().trim()
      if (id) ids.push(id)
    }
  }
  const dflt = clause.replace(/\{[^}]*\}/, '').replace(/,/g, '').trim()
  if (dflt && /^[A-Za-z_$][\w$]*$/.test(dflt)) ids.push(dflt)
}

// A stub that is callable, indexable and stringifiable, so `DIAGRAMS.FOO`,
// `widget: SomeWidget` and `image: someJpg` all behave.
const stub = ids
  .map((id) => `const ${id} = new Proxy(function () {}, { get: () => 'stub' });`)
  .join('\n')
const body = src.replace(/^import\s+[^'"]+?from\s+['"][^'"]+['"];?\s*$/gm, '')

const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'slides-lint-')), 'slides.mjs')
fs.writeFileSync(tmp, `${stub}\n${body}`)
const { slides } = await import(pathToFileURL(tmp).href)

// Identifier/styling fields carry no prose, so they need no translation.
const SKIP = new Set([
  'layout', 'accent', 'color', 'icon', 'labelIcon', 'tone', 'columns', 'ratio',
  'side', 'variant', 'drawThis', 'inlineSvg', 'image', 'widget', 'date',
])

const problems = []
const walk = (node, at) => {
  if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${at}[${i}]`))
  if (!node || typeof node !== 'object') return
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === 'object') { walk(v, `${at}.${k}`); continue }
    if (typeof v !== 'string') continue
    // Balanced $…$ pairs are real KaTeX and are fine. An odd count is not.
    // Count per line: parseInlineText works line by line via renderContent.
    v.split('\n').forEach((line, ln) => {
      const at2 = `${at}.${k}${v.includes('\n') ? `:${ln + 1}` : ''}`
      if (line.includes('\\$')) problems.push(`ESCAPED-$ ${at2} — "${line.slice(0, 54)}"`)
      const n = (line.match(/\$/g) || []).length
      if (n % 2 === 1) problems.push(`UNPAIRED-$ ${at2} — "${line.slice(0, 54)}"`)
    })
    if (/(Vn|Fr)$/.test(k) || SKIP.has(k)) continue
    if (VIETNAMESE && !(`${k}Vn` in node)) problems.push(`NO-VN    ${at}.${k} — "${v.slice(0, 48)}"`)
    if (!VIETNAMESE && `${k}Vn` in node) problems.push(`STRAY-VN ${at}.${k}Vn — this deck has no Vietnamese`)
    if (!FRENCH) continue
    const fr = node[`${k}Fr`]
    if (typeof fr !== 'string') { problems.push(`NO-FR    ${at}.${k} — "${v.slice(0, 48)}"`); continue }
    // Words inside \text{…} are prose and may be translated.
    const maths = (t) => (t.match(/\$[\s\S]+?\$/g) || []).join(' ').replace(/\\text\{[^}]*\}/g, '\\text{}')
    if (maths(fr) !== maths(v)) problems.push(`FR-MATHS ${at}.${k}Fr — "${maths(v).slice(0, 30)}" became "${maths(fr).slice(0, 30)}"`)
  }
}
slides.forEach((s, i) => walk(s, `slide${i + 1}`))

fs.rmSync(path.dirname(tmp), { recursive: true, force: true })

if (problems.length) {
  console.log(problems.join('\n'))
  console.log(`\n${slides.length} slides checked, ${problems.length} problem(s)`)
  process.exit(1)
}
const twins = [VIETNAMESE && 'a Vn', FRENCH && 'an Fr'].filter(Boolean).join(' and ')
console.log(`${slides.length} slides checked — every string has ${twins || 'no'} twin, every $ is paired`)
