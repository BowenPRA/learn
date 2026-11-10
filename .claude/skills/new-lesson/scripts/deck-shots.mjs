/**
 * Screenshot every slide of a deck, as the class sees it.
 *
 * The checks measure overflow; they cannot tell you a label sits on top of a
 * drawing, a photo is the wrong one, or a widget says "a an". This walks the
 * deck the way project-check.mjs does (fullscreen, trusted click, viewport set
 * again after entering fullscreen) and saves one JPEG per slide plus 2×2
 * contact sheets, so a deck can be LOOKED at slide by slide without a browser.
 *
 *   node .claude/skills/new-lesson/scripts/deck-shots.mjs "<lesson-url>" <out-dir> [fr|vn] [dark] [windowed]
 *   REVEALS=1 WSIZE=1366,768 PORT=9461 node .claude/skills/new-lesson/scripts/deck-shots.mjs "<url>" <scratch>/shots/fr fr
 *
 * <lesson-url> is the classroom page with ?demo, e.g.
 *   http://localhost:5201/classroom/?demo#/lesson/y7-science/U03_4
 * With ?demo the script signs in to PRA Learn's demo first (AS=student for the demo
 * student). Put <out-dir> in your scratchpad, never inside the repo: it is public.
 *
 * Output: <out-dir>/NN.jpg (one per slide) and <out-dir>/sheet-K.jpg (slides
 * 4K−3 … 4K at half size). Read the sheets for the overview and the single
 * slides when the detail matters. REVEALS=1 opens every reveal box before the
 * shot, whatever its label (each one carries a chevron-down icon). PORT is the
 * Chrome debugging port: give each run that happens at the same time its own.
 *
 * Headless Chrome 157 refuses requestFullscreen() even after a trusted click.
 * The deck is in display mode by then all the same (data-display-mode="on" on
 * its root), which lays out the same at the emulated viewport, so that is
 * accepted and the log says "windowed".
 */
import { spawn, spawnSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'

const [URL_ARG, OUT_ARG, ...flags] = process.argv.slice(2)
if (!URL_ARG || !OUT_ARG) {
  console.error('usage: node .claude/skills/new-lesson/scripts/deck-shots.mjs "<lesson-url>" <out-dir> [fr|vn] [dark] [windowed]   (env: WSIZE, REVEALS=1, PORT)')
  process.exit(2)
}
const LANG = flags.find((f) => f === 'vn' || f === 'fr') || 'en'
const DARK = flags.includes('dark')
const WINDOWED = flags.includes('windowed')
const [VW, VH] = (process.env.WSIZE || '1366,768').split(',').map(Number)
const REVEALS = process.env.REVEALS === '1'
const PORT = Number(process.env.PORT || 9477)
const OUT = path.resolve(OUT_ARG)
fs.mkdirSync(OUT, { recursive: true })
for (const f of fs.readdirSync(OUT)) if (/^(\d\d|sheet-\d+)\.jpg$/.test(f)) fs.rmSync(path.join(OUT, f))

const CANDIDATES = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const chromePath = CANDIDATES.find((p) => fs.existsSync(p))
if (!chromePath) { console.error('No Chrome found. Set CHROME=/path/to/chrome'); process.exit(2) }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-shots-'))
const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' })
const cleanup = () => {
  // kill() alone leaves Chrome's child processes on Windows, holding the port.
  try { if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }); else chrome.kill() } catch { /* already gone */ }
  try { fs.rmSync(profile, { recursive: true, force: true }) } catch { /* best effort */ }
}
process.on('exit', cleanup)

let targets = null
for (let i = 0; i < 80 && !targets; i++) {
  await sleep(250)
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json() } catch { /* not up yet */ }
}
if (!targets) { console.error(`Chrome did not start (is port ${PORT} busy? set PORT)`); cleanup(); process.exit(2) }

const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })
let msgId = 0
const pending = new Map()
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) }
}
const send = (method, params = {}) => new Promise((res) => {
  const id = ++msgId
  pending.set(id, res)
  ws.send(JSON.stringify({ id, method, params }))
})
const evalJs = async (expression, awaitPromise = true) =>
  (await send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true }))?.result?.value
const metrics = () => send('Emulation.setDeviceMetricsOverride', {
  width: VW, height: VH, deviceScaleFactor: 1, mobile: false,
})
const shot = async (file, clip) => {
  const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82, ...(clip ? { clip } : {}) })
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'))
}

// "On the deck": the classroom page, at a #/lesson/ route.
const ON_DECK = `(location.pathname.includes('/classroom/') && location.hash.includes('/lesson/'))`

await send('Page.enable')
await send('Runtime.enable')
await metrics()
// The demo's sign-in lives in sessionStorage ('learn-demo-who', src/lib/demo/backend.js).
if (/[?&]demo(=|&|$|#)/.test(URL_ARG)) {
  await send('Page.navigate', { url: new URL(URL_ARG).origin + '/favicon.svg' })
  await sleep(500)
  await evalJs(`sessionStorage.setItem('learn-demo-who', ${JSON.stringify(process.env.AS === 'student' ? 'student' : 'teacher')})`, false)
}
await send('Page.navigate', { url: URL_ARG })
await sleep(2600)

// Wait for the deck to render (a cold dev server can take ~12 s).
const ready = await evalJs(`(async () => {
  for (let i = 0; i < 240; i++) {
    if (!${ON_DECK}) return 'left';
    if ([...document.querySelectorAll('button')].some(x => /full ?screen/i.test(x.textContent.trim()))) return 'ok';
    await new Promise(r => setTimeout(r, 250));
  }
  return 'timeout';
})()`)
if (ready === 'left') { console.error('The page left the deck. Is the lesson listed in src/data/classroomLessons.js, and does the URL carry ?demo?'); cleanup(); process.exit(2) }
if (ready !== 'ok') { console.error('Deck did not render. Is this a lesson URL, and is the dev server up?'); cleanup(); process.exit(2) }

await evalJs(`document.documentElement.classList.${DARK ? 'add' : 'remove'}('dark')`, false)

if (LANG !== 'en') {
  const found = await evalJs(`(() => {
    const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim().toLowerCase() === '${LANG}');
    if (b) { b.click(); return true }
    return false;
  })()`, false)
  if (!found) { console.error(`No ${LANG.toUpperCase()} button — does this deck offer that language?`); cleanup(); process.exit(2) }
  await sleep(400)
}

if (!WINDOWED) {
  const rect = await evalJs(`(() => {
    const b = [...document.querySelectorAll('button')].find(x => /full ?screen/i.test(x.textContent.trim()));
    const r = b.getBoundingClientRect();
    return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
  })()`, false)
  for (const type of ['mousePressed', 'mouseReleased']) {
    await send('Input.dispatchMouseEvent', { type, x: rect.x, y: rect.y, button: 'left', clickCount: 1 })
  }
  await sleep(1200)
  await metrics() // fullscreen resets the override
  await sleep(600)
}
const real = !WINDOWED && (await evalJs('!!document.fullscreenElement', false))
if (!WINDOWED && !real && !(await evalJs(`!!document.querySelector('[data-display-mode="on"]')`, false))) {
  console.error('Could not enter project mode'); cleanup(); process.exit(2)
}
const size = await evalJs('window.innerWidth + "x" + window.innerHeight', false)
const mode = WINDOWED ? 'windowed' : real ? 'project mode' : 'project mode (windowed: this Chrome refused fullscreen)'
console.log(`${mode}: ${size}, ${LANG.toUpperCase()}${DARK ? ', dark' : ''}${REVEALS ? ', reveals open' : ''}`)

// Park the mouse off the deck so hover styles and idle-hiding controls settle.
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: VH - 2 })
// If this mark disappears, the page reloaded under the walk (a file was saved).
await evalJs('window.__deckWalk = true', false)

const files = []
let last = null
for (let i = 1; i <= 150; i++) {
  await sleep(1300)
  // Next on the last slide leaves for the PRA Learn home: evalJs then returns
  // undefined or inDeck false, and the walk ends.
  const state = await evalJs(`(() => ({
    inDeck: ${ON_DECK},
    reloaded: !window.__deckWalk,
    title: ((document.querySelector('h1,h2') || {}).textContent || '(none)').trim(),
  }))()`, false)
  if (!state?.inDeck) break
  if (state.reloaded) { console.error(`The page reloaded at slide ${i} (a file was saved while the walk ran?). Re-run.`); cleanup(); process.exit(2) }
  // The last slide's Next does nothing, so the title repeats: that is the end.
  if (state.title === last && i > 1) break
  last = state.title
  if (REVEALS) {
    await evalJs(`[...document.querySelectorAll('button')]
      .filter((b) => b.querySelector('svg.lucide-chevron-down'))
      .forEach((b) => b.click())`, false)
    await sleep(500)
  }
  const file = path.join(OUT, `${String(i).padStart(2, '0')}.jpg`)
  await shot(file)
  files.push(file)
  console.log(`${String(i).padStart(2)}  ${state.title.slice(0, 60)}`)
  // The dock's Next is the last button: it gets past an open reveal and past a
  // game slide, which locks the arrow keys.
  await evalJs(`(() => { const bs = document.querySelectorAll('button'); bs[bs.length - 1].click(); })()`, false)
}

// Contact sheets: four slides per sheet at half size, numbered.
const cells = files.map((f) => ({ n: path.basename(f, '.jpg'), src: 'data:image/jpeg;base64,' + fs.readFileSync(f).toString('base64') }))
const sheetW = VW, sheetH = VH
for (let k = 0; k * 4 < cells.length; k++) {
  const group = cells.slice(k * 4, k * 4 + 4)
  const html = `<!doctype html><html><body style="margin:0;background:#888;width:${sheetW}px;height:${sheetH}px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:4px">${
    group.map((c) => `<div style="position:relative;overflow:hidden;background:#fff"><img src="${c.src}" style="width:100%;height:100%;object-fit:contain;display:block"><span style="position:absolute;left:0;top:0;background:#ff0;font:bold 18px sans-serif;padding:2px 6px">${c.n}</span></div>`).join('')
  }</body></html>`
  const tmp = path.join(profile, `sheet-${k + 1}.html`)
  fs.writeFileSync(tmp, html)
  await send('Emulation.setDeviceMetricsOverride', { width: sheetW, height: sheetH, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: 'file:///' + tmp.replace(/\\/g, '/') })
  await sleep(700)
  await shot(path.join(OUT, `sheet-${k + 1}.jpg`), { x: 0, y: 0, width: sheetW, height: sheetH, scale: 1 })
}

console.log(`\n${files.length} slides → ${OUT} (${Math.ceil(files.length / 4)} sheets)`)
ws.close()
cleanup()
process.exit(0)
