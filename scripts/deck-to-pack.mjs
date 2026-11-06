// Turns a classroom lesson folder into a PRA Learn pack (docs/DESIGN.md section 7,
// docs/PACKS.md for the operator's steps).
//
//   node scripts/deck-to-pack.mjs <lesson folder> [--overlay <file.mjs>] [--out <dir>]
//        [--server <url of the classroom app>] [--no-shots]
//
// What it does by itself:
//   - keeps the nine layouts with their text and inline SVG (diagrams.js resolved);
//     drops `game` slides and teacher-only fields (drawThis, plan, speaker notes);
//   - an inline SVG that holds photos (<image href>) is drawn in headless Chrome to one
//     JPEG asset (the portal's SVG cleaner removes <image>), with the photos' credits
//     from images/CREDITS.json; an `image` file is copied with its credit;
//   - a widget becomes a still of its first state (headless Chrome against the
//     classroom app at --server; by default it starts its own `npx vite --port 5203`
//     in the deck's repo and stops it at the end);
//   - a vote (a compare slide whose columns are "A · …", "B · …") followed by a slide
//     that says "Answer: X" becomes a check question with the deck's own answer, and
//     the answer slide's "X is wrong" note as the explanation;
//   - teacher words in eyebrows ("Vote with one hand", "Whiteboards", "Talk to your
//     partner", "Say it first") are rewritten for a child working alone; any left in
//     the text are listed for the operator.
// What the overlay adds (packs/<slug>/overlay.mjs, written by the operator): the pack's
// slug, class and teacher; per deck slide number: `check` (a question, options with a
// * before the right one), `patch` (fields to replace; null removes one), `drop`,
// `keepReveal`, `widget: 'image' | 'check' | 'drop'`, `alt`; and the practice parts.
//
// Writes <out>/pack.json, <out>/assets/*, <out>/convert-log.txt, then checks the pack
// with the portal's own validator. Exit code 1 when the pack has errors.
import { spawn, execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { basename, extname, join, resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import process from 'node:process'
import { loadDeck } from './lib/load-deck.mjs'
import { openChrome, sleep } from './lib/cdp.mjs'
import { validatePack, LAYOUTS } from '../src/pack/validate.js'
import { FORMAT } from '../src/pack/model.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const LEARN = resolve(HERE, '..')

// ---------------------------------------------------------------- arguments
const argv = process.argv.slice(2)
const opt = { shots: true }
const pos = []
for (let i = 0; i < argv.length; i += 1) {
  const a = argv[i]
  if (a === '--overlay') opt.overlay = argv[++i]
  else if (a === '--out') opt.out = argv[++i]
  else if (a === '--server') opt.server = argv[++i]
  else if (a === '--slug') opt.slug = argv[++i]
  else if (a === '--no-shots') opt.shots = false
  else if (a === '--help' || a === '-h') opt.help = true
  else pos.push(a)
}
if (opt.help || !pos[0]) {
  console.log('Usage: node scripts/deck-to-pack.mjs <lesson folder> [--overlay <file.mjs>] [--out <dir>] [--server <url>] [--no-shots]')
  process.exit(pos[0] ? 0 : 2)
}

const log = []
const say = (line = '') => { log.push(line); console.log(line) }
const todo = []   // things the operator must look at
const lost = []   // things that did not convert

// ---------------------------------------------------------------- helpers
const TEACHER_FIELDS = ['drawThis', 'plan', 'speaker', 'speakerNotes', 'teacherNotes', 'say', 'timer', 'remote', 'color', 'brand', 'date', 'copy', 'copyLabel']
const EYEBROWS = [
  [/^vote\b.*$/i, 'Choose'],
  [/^say it first$/i, 'Watch'],
  [/^whiteboards?\s*[·:-]\s*/i, ''],
  [/^whiteboards?$/i, 'Your turn'],
  [/^(talk|tell|explain) (to )?your partner$/i, 'Think'],
  [/^pair (talk|work)$/i, 'Think'],
  [/^(a game|game)\b.*$/i, 'Think'],
  [/^back to the starter$/i, 'The starter'],
  [/^exit (question|ticket)$/i, 'Last question'],
  [/^before you leave$/i, 'Before you finish'],
  [/^today$/i, 'This lesson'],
]
const TEACHER_WORDS = /\b(whiteboards?|your partner|hands? up|left hand|right hand|everyone stands?|stand up|sit down|say it|say the|tell the class|the class|vote|press|arms (up|down)|in pairs|in groups|students|your group|on the board)\b/i
const TEXT_FIELDS = ['eyebrow', 'title', 'subtitle', 'objective', 'text', 'sub', 'label', 'content', 'caption', 'example']

const kebab = (s) => String(s).replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase()
const pad = (n) => String(n).padStart(2, '0')
const decode = (s) => s.replace(/&#160;|&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
const svgText = (svg) => [...String(svg || '').matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map((m) => decode(m[1].replace(/<[^>]+>/g, '')).trim()).filter(Boolean)
const isPhotoSvg = (svg) => typeof svg === 'string' && /<image\b/i.test(svg)

function deepPatch(target, patch) {
  for (const [k, v] of Object.entries(patch || {})) {
    if (v === null) delete target[k]
    else if (v && typeof v === 'object' && !Array.isArray(v) && target[k] && typeof target[k] === 'object' && !Array.isArray(target[k])) deepPatch(target[k], v)
    else target[k] = v
  }
  return target
}

/** A check written in the overlay's short form: options as strings, the right one starts with '*'. */
function makeCheck(c, id) {
  const out = { id: c.id || id, q: c.q }
  if (c.qVn) out.qVn = c.qVn
  const letters = 'ABCDEF'
  if (Array.isArray(c.options) && c.options.every((o) => typeof o === 'string')) {
    out.options = c.options.map((o, i) => ({ val: letters[i], text: o.replace(/^\*/, '') }))
    const right = c.options.findIndex((o) => o.startsWith('*'))
    out.correct = right >= 0 ? letters[right] : c.correct
  } else {
    out.options = c.options
    out.correct = c.correct
  }
  for (const k of ['exp', 'expVn']) if (c[k]) out[k] = c[k]
  return out
}

function classKeyOf(course) {
  const m = /^y(\d+)-([a-z]+)/i.exec(course || '')
  if (!m) return null
  const subject = { math: 'math', maths: 'math', sci: 'science', science: 'science', eng: 'english', english: 'english', hist: 'history' }[m[2].toLowerCase()] || m[2].toLowerCase()
  return `${subject}:Year ${m[1]}`
}

function gitRef(dir) {
  try {
    const sha = execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
    const dirty = execFileSync('git', ['-C', dir, 'status', '--porcelain', '--', '.'], { encoding: 'utf8' }).trim()
    return `${sha}${dirty ? '+changes' : ''}`
  } catch { return 'no-git' }
}

// ---------------------------------------------------------------- load
const deck = await loadDeck(pos[0])
const overlay = opt.overlay ? (await import(pathToFileURL(resolve(opt.overlay)).href)).default || {} : {}
const oSlides = overlay.slides || {}
const slug = opt.slug || overlay.slug || kebab(`${deck.course}-${deck.unit}`)
const outDir = resolve(opt.out || join(LEARN, 'packs', slug))
const assetDir = join(outDir, 'assets')
mkdirSync(assetDir, { recursive: true })

say(`Deck: ${deck.rel} (${deck.slides.length} slides) from ${deck.root} @ ${gitRef(deck.folder)}`)
say(`Pack: ${slug} -> ${outDir}`)
say()

// ---------------------------------------------------------------- convert the slides
const assets = {}
const jobs = []   // pictures to draw in Chrome: { kind: 'widget' | 'svg', n, file, ... }
const out = []

const creditOf = (files) => {
  const list = files.map((f) => deck.creditFor(f)).filter(Boolean)
  if (!list.length) return null
  return {
    credit: `${list.length > 1 ? 'Photos' : 'Photo'}: ${list.map((c) => `${c.artist || 'unknown'} (${c.license || 'licence not given'})`).join('; ')}${list.every((c) => /wikimedia/i.test(c.descUrl || '')) ? ', Wikimedia Commons' : ''}`,
    credits: list.map((c) => ({ file: c.file, title: c.title, artist: c.artist, license: c.license, url: c.descUrl })),
  }
}

/** Media on an object (a slide, a column, an item): photos in SVG become a JPEG job, files are copied. */
function convertMedia(obj, n, where, alt) {
  for (const key of ['inlineSvg', 'inlineSvgVn', 'inlineSvgFr']) {
    const svg = obj[key]
    if (!isPhotoSvg(svg)) continue
    const files = [...svg.matchAll(/href="asset-file:([^"]+)"/g)].map((m) => m[1])
    const file = `s${pad(n)}${where ? `-${where}` : ''}-photo${key === 'inlineSvg' ? '' : `-${key.slice(-2).toLowerCase()}`}.jpg`
    jobs.push({ kind: 'svg', n, file, svg, files })
    const words = svgText(svg)
    assets[file] = { alt: alt || words.join('. '), ...creditOf(files), from: `slide ${n}: an SVG with ${files.length} photo(s), drawn to JPEG` }
    if (!alt) todo.push(`slide ${n}: check the alt text of ${file} ("${assets[file].alt}")`)
    if (key === 'inlineSvg') { obj.image = `asset:${file}`; delete obj.inlineSvg } else delete obj[key]
    say(`  photo SVG -> asset ${file} (${files.map((f) => basename(f)).join(', ')})`)
  }
  if (typeof obj.image === 'string' && obj.image.startsWith('asset-file:')) {
    const src = obj.image.slice('asset-file:'.length)
    const file = basename(src)
    if (existsSync(src)) {
      copyFileSync(src, join(assetDir, file))
      assets[file] = { alt: alt || obj.alt || '', ...creditOf([src]), from: `slide ${n}: ${basename(src)}` }
      if (!assets[file].alt) todo.push(`slide ${n}: ${file} needs alt text (overlay alt)`)
      obj.image = `asset:${file}`
      say(`  image -> asset ${file}`)
    } else {
      lost.push(`slide ${n}: image ${src} not found`)
      delete obj.image
    }
  }
}

function eyebrowFor(text) {
  if (!text) return text
  for (const [re, to] of EYEBROWS) {
    if (re.test(text)) {
      const next = text.replace(re, to).trim()
      return next ? next.charAt(0).toUpperCase() + next.slice(1) : undefined
    }
  }
  return text
}

/** A vote slide + the slide after it ("Answer: B") as a check. */
function voteCheck(s, next, n) {
  const cols = Array.isArray(s.columns) ? s.columns : []
  if (s.layout !== 'compare' || cols.length < 2) return null
  const letters = cols.map((c) => /^\s*([A-F])\s*[·.:)\-–]/.exec(c.heading || '')?.[1])
  if (letters.some((l) => !l)) return null
  const said = /answer\s*:?\s*([A-F])\b/i.exec(`${next?.eyebrow || ''} ${next?.title || ''}`)
  if (!said) { todo.push(`slide ${n}: a vote with no "Answer: X" slide after it; write its check in the overlay`); return null }
  const options = cols.map((c, i) => {
    const text = (c.content && String(c.content).trim()) || svgText(c.inlineSvg).join(' ') || c.heading.replace(/^\s*[A-F]\s*[·.:)\-–]\s*/, '')
    return { val: letters[i], text }
  })
  // pictures as answers (two drawings with the same words): the check names them Picture A, B
  const texts = options.map((o) => o.text)
  const pictures = texts.some((t) => !t.trim()) || new Set(texts).size !== texts.length
  if (pictures) options.forEach((o) => { o.text = `Picture ${o.val}` })
  const notes = [...(next?.notes || [])]
  const wrong = notes.map((x) => x.text || '').find((t) => /\b[A-F]\s+is\s+wrong\b/i.test(t))
    || notes.find((x) => x.tone === 'write')?.text
  const text = String(s.text || s.title || '')
  // sentences end at . ! ? followed by a capital (so "6 a.m. it is" stays whole)
  const sentences = text.split(/(?<=[.!?](?:\*\*)?)\s+(?=(?:\*\*)?[A-Z0-9−-])/)
  const qi = sentences.map((x) => x.includes('?')).lastIndexOf(true)
  const q = qi >= 0 ? sentences[qi].trim() : 'Which answer is right?'
  const rest = sentences.filter((_, i) => i !== qi).join(' ').trim()
  return { check: { id: `c${n}`, q, options, correct: said[1].toUpperCase(), ...(wrong ? { exp: wrong } : {}) }, rest, pictures, letters }
}

const deckSlides = deck.slides
for (let i = 0; i < deckSlides.length; i += 1) {
  const n = i + 1
  const o = oSlides[n] || {}
  const src = deckSlides[i]
  if (o.drop) { say(`${pad(n)} dropped: ${o.drop === true ? 'overlay' : o.drop}`); continue }
  if (src.layout === 'game' || !LAYOUTS.includes(src.layout)) {
    lost.push(`slide ${n}: layout "${src.layout}" has no place in a pack; dropped`)
    say(`${pad(n)} dropped: layout ${src.layout}`)
    continue
  }
  const s = JSON.parse(JSON.stringify(src))
  for (const k of TEACHER_FIELDS) delete s[k]
  const notes = []

  // a vote becomes a check
  const vote = !o.check || o.check.merge ? voteCheck(src, deckSlides[i + 1], n) : null
  if (vote && vote.pictures) {
    // keep the two drawings on the slide, headed Picture A and Picture B
    s.columns.forEach((col, ci) => { col.heading = `Picture ${vote.letters[ci]}`; delete col.icon })
    s.text = vote.rest || s.text
    s.check = vote.check
    notes.push(`vote with pictures -> check "Picture A / B" under the drawings (answer ${vote.check.correct}${vote.check.exp ? ', explanation from the next slide' : ', NO explanation found'})`)
    if (!vote.check.exp) todo.push(`slide ${n}: the vote's check has no explanation; add exp in the overlay`)
  } else if (vote) {
    s.layout = 'statement'
    delete s.columns
    s.text = vote.rest || s.text
    s.check = vote.check
    if (!vote.rest) s.check.q = 'Which answer is right?'
    notes.push(`vote -> check (answer ${vote.check.correct}${vote.check.exp ? ', explanation from the next slide' : ', NO explanation found'})`)
    if (!vote.check.exp) todo.push(`slide ${n}: the vote's check has no explanation; add exp in the overlay`)
  }

  // the widget
  if (s.widget) {
    const mode = o.widget || 'image'
    const name = s.widget.__widget || 'widget'
    delete s.widget
    if (mode === 'image') {
      if (!opt.shots) {
        lost.push(`slide ${n}: widget ${name} not drawn (--no-shots)`)
      } else {
        const file = `s${pad(n)}-${kebab(name)}.png`
        s.image = `asset:${file}`
        jobs.push({ kind: 'widget', n, file, name })
        assets[file] = { alt: o.alt || `${name}: the first screen`, from: `slide ${n}: widget ${name}, first state` }
        if (!o.alt) todo.push(`slide ${n}: write alt text for the still of ${name}`)
        notes.push(`widget ${name} -> still ${file}`)
      }
    } else if (mode === 'check') {
      notes.push(`widget ${name} -> replaced by a question`)
      if (!o.check) todo.push(`slide ${n}: widget ${name} set to 'check' but the overlay has no check`)
    } else {
      notes.push(`widget ${name} dropped`)
    }
  }
  for (const c of [...(Array.isArray(s.columns) ? s.columns : []), ...(Array.isArray(s.items) ? s.items : [])]) {
    if (c && typeof c === 'object' && c.widget) { lost.push(`slide ${n}: a widget inside a column or item (${c.widget.__widget}) was removed`); delete c.widget }
  }

  // eyebrows written for the teacher
  const before = s.eyebrow
  s.eyebrow = eyebrowFor(s.eyebrow)
  if (s.eyebrow === undefined) delete s.eyebrow
  if (before && before !== s.eyebrow) notes.push(`eyebrow "${before}" -> "${s.eyebrow || '(none)'}"`)

  // overlay: patch, check, reveal
  if (o.patch) deepPatch(s, o.patch)
  if (o.check) {
    const base = vote && o.check.merge ? s.check : {}
    const merged = { ...base, ...o.check }
    delete merged.merge
    s.check = makeCheck(merged, `c${n}`)
    notes.push(`check ${s.check.id}${vote ? ' (vote, edited in the overlay)' : ''}`)
  }
  if (s.check && s.reveal && !o.keepReveal) { delete s.reveal; notes.push('reveal -> the check') }
  if (s.reveal && !s.check) notes.push('reveal kept as "Show me" (not scored)')

  // media
  convertMedia(s, n, '', o.alt)
  ;(Array.isArray(s.columns) ? s.columns : []).forEach((c, ci) => c && typeof c === 'object' && convertMedia(c, n, `col${ci + 1}`, o.alts?.[ci]))
  ;(Array.isArray(s.items) ? s.items : []).forEach((c, ci) => c && typeof c === 'object' && convertMedia(c, n, `item${ci + 1}`, o.alts?.[ci]))

  // teacher words still on the slide
  const texts = []
  const collect = (obj) => {
    if (!obj || typeof obj !== 'object') return
    for (const k of TEXT_FIELDS) if (typeof obj[k] === 'string') texts.push(obj[k])
    for (const k of ['notes', 'columns', 'items', 'steps']) if (Array.isArray(obj[k])) obj[k].forEach((x) => (typeof x === 'string' ? texts.push(x) : (collect(x), x?.text && texts.push(x.text), x?.heading && texts.push(x.heading))))
    if (obj.card) { texts.push(obj.card.text || ''); texts.push(obj.card.badge || '') }
    if (obj.reveal) { texts.push(obj.reveal.label || ''); texts.push(obj.reveal.prompt || ''); texts.push(obj.reveal.answer || '') }
  }
  collect(s)
  const hit = texts.map((t) => TEACHER_WORDS.exec(t)?.[0]).filter(Boolean)
  if (hit.length) todo.push(`slide ${n}: teacher words left: ${[...new Set(hit)].join(', ')}`)
  if (texts.some((t) => t.includes('$$'))) lost.push(`slide ${n}: $$…$$ maths is not drawn in the portal; use $…$`)

  out.push(s)
  say(`${pad(n)} ${s.layout}${s.check ? ` + check ${s.check.id}` : ''}${notes.length ? `: ${notes.join('; ')}` : ''}`)
}

// overlay: slides added at the end (rare)
for (const extra of overlay.extraSlides || []) out.push(extra)

// ---------------------------------------------------------------- pictures in Chrome
let ownServer = null
async function serverUrl() {
  if (opt.server) return opt.server.endsWith('/') ? opt.server : `${opt.server}/`
  const port = 5203
  const url = `http://localhost:${port}/classroom/`
  say(`Starting the classroom app: npx vite --port ${port} --strictPort in ${deck.root}`)
  ownServer = spawn('npx', ['vite', '--port', String(port), '--strictPort'], { cwd: deck.root, shell: true, stdio: 'ignore' })
  for (let i = 0; i < 120; i += 1) {
    try { if ((await fetch(url)).ok) return url } catch { /* not up yet */ }
    await sleep(500)
  }
  throw new Error(`the classroom app did not start on port ${port}`)
}
function stopServer() {
  if (!ownServer) return
  if (process.platform === 'win32') { try { execFileSync('taskkill', ['/pid', String(ownServer.pid), '/T', '/F'], { stdio: 'ignore' }) } catch { /* gone */ } } else ownServer.kill()
}

if (jobs.length) {
  const chrome = await openChrome()
  try {
    // photos inside SVGs: the SVG on a blank page, its photos as data: links
    for (const job of jobs.filter((j) => j.kind === 'svg')) {
      let svg = job.svg
      for (const f of job.files) {
        const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' }[extname(f).toLowerCase()] || 'application/octet-stream'
        svg = svg.split(`asset-file:${f}`).join(`data:${mime};base64,${readFileSync(f).toString('base64')}`)
      }
      const vb = /viewBox="\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)/.exec(svg)
      const w = vb ? Math.round(Number(vb[1])) : 1120
      const h = vb ? Math.round(Number(vb[2])) : 440
      await chrome.size(w, h, 1.5)
      await chrome.send('Page.navigate', { url: 'about:blank' })
      await sleep(200)
      const sized = svg.replace(/<svg\b/, `<svg width="${w}" height="${h}"`).replace(/\sclass="[^"]*"/, '')
      await chrome.js(`(async () => { document.documentElement.style.background = '#fff'; document.body.style.margin = '0'; document.body.innerHTML = ${JSON.stringify(sized)}; await new Promise((r) => setTimeout(r, 600)); return 1 })()`)
      const img = await chrome.send('Page.captureScreenshot', { format: 'jpeg', quality: 84, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } })
      writeFileSync(join(assetDir, job.file), Buffer.from(img.data, 'base64'))
      Object.assign(assets[job.file], { w, h })
    }
    // widgets: the slide in the classroom app, the widget's drawing at its first state
    const widgetJobs = jobs.filter((j) => j.kind === 'widget')
    if (widgetJobs.length) {
      const base = await serverUrl()
      await chrome.size(1280, 800, 2)
      for (const job of widgetJobs) {
        await chrome.send('Page.navigate', { url: `${base}?v=${Date.now()}#/lesson/${deck.course}/${deck.unit}` })
        let ready = false
        for (let k = 0; k < 60 && !ready; k += 1) { await sleep(250); ready = await chrome.js('!!document.querySelector("[data-slide]")') }
        if (!ready) { lost.push(`slide ${job.n}: the classroom app did not show the deck at ${base}`); continue }
        const slideNow = () => chrome.js('Number(document.querySelector("[data-slide]")?.getAttribute("data-slide"))')
        let at = await slideNow()
        // press → until the slide is reached (a key now and then is lost while a slide animates)
        for (let k = 0; k < job.n + 15 && at < job.n; k += 1) {
          await chrome.key('ArrowRight', 'ArrowRight', 39)
          await sleep(180)
          at = await slideNow()
        }
        await sleep(400)
        at = await slideNow()
        if (at !== job.n) { lost.push(`slide ${job.n}: could not reach it in the classroom app (got slide ${at})`); continue }
        await sleep(2500) // let the widget settle
        const box = await chrome.js(`(() => {
          const slide = document.querySelector('[data-slide]')
          const els = [...slide.querySelectorAll('svg, canvas')].map((e) => [e, e.getBoundingClientRect()]).filter(([, r]) => r.width > 300 && r.height > 120)
          els.sort((a, b) => b[1].width * b[1].height - a[1].width * a[1].height)
          if (!els.length) return null
          const [el, r] = els[0]
          // An SVG that keeps its shape is drawn centred inside its box: photograph the drawing, not the margins.
          let { x, y, width, height } = r
          const vb = el.viewBox?.baseVal
          const keep = (el.getAttribute('preserveAspectRatio') || 'xMidYMid meet') !== 'none'
          if (el.tagName.toLowerCase() === 'svg' && vb && vb.width && vb.height && keep) {
            const ar = vb.width / vb.height
            const w = Math.min(width, height * ar)
            const h = w / ar
            x += (width - w) / 2; y += (height - h) / 2; width = w; height = h
          }
          return { x: x + window.scrollX, y: y + window.scrollY, width, height }
        })()`)
        if (!box) { lost.push(`slide ${job.n}: widget ${job.name} has no drawing to photograph (no large svg or canvas)`); continue }
        const img = await chrome.send('Page.captureScreenshot', { format: 'png', clip: { ...box, scale: 1 } })
        writeFileSync(join(assetDir, job.file), Buffer.from(img.data, 'base64'))
        Object.assign(assets[job.file], { w: Math.round(box.width), h: Math.round(box.height) })
        say(`  widget ${job.name} -> ${job.file} (${Math.round(box.width)}x${Math.round(box.height)})`)
      }
    }
  } finally {
    chrome.close()
    stopServer()
  }
}
// pictures that failed: take them off their slides
for (const job of jobs) {
  if (existsSync(join(assetDir, job.file))) continue
  delete assets[job.file]
  for (const s of out) {
    if (s.image === `asset:${job.file}`) delete s.image
    for (const c of [...(Array.isArray(s.columns) ? s.columns : []), ...(Array.isArray(s.items) ? s.items : [])]) if (c?.image === `asset:${job.file}`) delete c.image
  }
}
// old pictures from an earlier run
for (const f of readdirSync(assetDir)) if (!assets[f]) rmSync(join(assetDir, f))

// ---------------------------------------------------------------- the pack
const meta = deck.meta
const parts = [{ id: 'review', kind: 'review', title: 'Review', titleVn: 'Ôn bài', slides: out }]
for (const p of overlay.practice || []) parts.push({ kind: 'practice', ...p })
if (!(overlay.practice || []).length) todo.push('no practice part: add one in the overlay (practice: [{ id, title, set }])')

const pack = {
  format: FORMAT,
  slug,
  class_key: overlay.class_key || classKeyOf(deck.course) || 'unknown:Year 0',
  title: overlay.title || meta.title || slug,
  ...(overlay.titleVn ? { titleVn: overlay.titleVn } : {}),
  teacher: overlay.teacher || null,
  unit: overlay.unit || (meta.unit ? `Unit ${String(meta.unit).split('·')[0].trim()}` : null),
  langs: overlay.langs || ['en'],
  request_id: overlay.request_id ?? null,
  from: { deck: `classroom@${gitRef(deck.folder)}:${deck.rel}`, ...(overlay.from || {}) },
  parts,
  assets,
}
writeFileSync(join(outDir, 'pack.json'), `${JSON.stringify(pack, null, 2)}\n`)

const checks = out.filter((s) => s.check).length
const { errors, warnings } = validatePack(pack)
const kb = Math.round(Buffer.byteLength(JSON.stringify(pack)) / 1000)
say()
say(`Review: ${out.length} slides from ${deckSlides.length}, ${checks} check question(s). Practice parts: ${(overlay.practice || []).map((p) => `${p.id} (${p.set?.items?.length || 0} items)`).join(', ') || 'none'}.`)
say(`Assets: ${Object.keys(assets).length} (${Object.keys(assets).join(', ') || 'none'}). pack.json ${kb} kB.`)
if (lost.length) { say(); say('Did not convert:'); lost.forEach((x) => say(`  - ${x}`)) }
if (todo.length) { say(); say('For the operator to look at:'); todo.forEach((x) => say(`  - ${x}`)) }
say()
warnings.forEach((w) => say(`warning: ${w}`))
errors.forEach((e) => say(`ERROR: ${e}`))
say(errors.length ? `${errors.length} error(s): the pack cannot be published yet.` : `OK: ${slug} passes the portal's checks${warnings.length ? ` (${warnings.length} warning(s))` : ''}.`)
writeFileSync(join(outDir, 'convert-log.txt'), `${log.join('\n')}\n`)
process.exit(errors.length ? 1 : 0)
