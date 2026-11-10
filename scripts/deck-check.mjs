/**
 * Deck smoke-check: walks every slide of a classroom deck in headless Chrome and
 * reports the failures that lint, build and svg-audit cannot see:
 *
 *   · content overflowing a slide (on a projector that means cut-off text)
 *   · images that failed to load (wrong path, missing from the build)
 *   · errors thrown while rendering
 *
 * Start the dev server (`npm run dev`, port 5201), then:
 *
 *   node scripts/deck-check.mjs "http://localhost:5201/classroom/?demo#/lesson/y7-science/U03_4"
 *   node scripts/deck-check.mjs <url> 22 dark
 *   node scripts/deck-check.mjs <url> fr        (or vn: walk it in that language)
 *
 * `?demo` opens the deck without a PRA Learn sign-in. A deck that is not listed in
 * src/data/classroomLessons.js does not open at all: the page sends you to the PRA
 * Learn home, and this script says so.
 *
 * It measures the deck WINDOWED at 1440x900. Project mode (what the class sees) is
 * the new-lesson skill's project-check.mjs. Set CHROME to override the browser path,
 * PORT for the Chrome debugging port (default 9333) when several checks run at once.
 * Exits non-zero if anything fails, so it can gate a deploy.
 */
import { spawn, spawnSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'

const args = process.argv.slice(2)
const URL_ARG = args.find((a) => a.startsWith('http'))
const DARK = args.includes('dark')
const LANG = args.find((a) => a === 'vn' || a === 'fr') || 'en'
const SLIDES = Number(args.find((a) => /^\d+$/.test(a)) || 150)
const PORT = Number(process.env.PORT || 9333)
// Images come off the network on a deployed site; sample too early and every
// slide looks broken. This is a settle delay, not a page-load timeout.
const SETTLE_MS = 1400

if (!URL_ARG) {
  console.error('usage: node scripts/deck-check.mjs "<lesson-url>" [slideCount] [dark] [vn|fr]')
  console.error('  e.g. "http://localhost:5201/classroom/?demo#/lesson/y7-science/U03_4"')
  process.exit(2)
}

const CANDIDATES = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)

const chromePath = CANDIDATES.find((p) => fs.existsSync(p))
if (!chromePath) {
  console.error('No Chrome found. Set CHROME=/path/to/chrome')
  process.exit(2)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-check-'))
const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' })

const cleanup = () => {
  // kill() alone leaves Chrome's child processes on Windows, holding the port.
  try { if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }); else chrome.kill() } catch { /* already gone */ }
  try { fs.rmSync(profile, { recursive: true, force: true }) } catch { /* best effort */ }
}
process.on('exit', cleanup)
const fail = (msg) => { console.error(msg); cleanup(); process.exit(2) }

// Wait for the debugger to come up.
let targets = null
for (let i = 0; i < 80 && !targets; i++) {
  await sleep(250)
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json() } catch { /* not ready */ }
}
if (!targets) fail(`Chrome did not start (is port ${PORT} busy? set PORT)`)

const page = targets.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject })

let msgId = 0
const pending = new Map()
const consoleErrors = []
let walking = true
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) }
  if (walking && m.method === 'Runtime.exceptionThrown') {
    consoleErrors.push(m.params?.exceptionDetails?.exception?.description?.split('\n')[0] || 'exception')
  }
}
const send = (method, params = {}) => new Promise((res) => {
  const id = ++msgId
  pending.set(id, res)
  ws.send(JSON.stringify({ id, method, params }))
})
// A navigation destroys the page's context mid-evaluate; that comes back as undefined.
const evalJs = async (expression, awaitPromise = true) =>
  (await send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true }))?.result?.value

// "On the deck": the classroom page, at a #/lesson/ route.
const ON_DECK = `(location.pathname.includes('/classroom/') && location.hash.includes('/lesson/'))`

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: 'about:blank' })
await sleep(200)
// `?demo` puts PRA Learn in demo mode, but a fresh browser is still signed out until
// someone presses "Try as Mr. David" on the sign-in page. Do the same by hand: the demo
// keeps its sign-in in sessionStorage under 'learn-demo-who' (src/lib/demo/backend.js),
// which lasts for this tab on this origin. AS=student signs in as the demo student.
if (/[?&]demo(=|&|$|#)/.test(URL_ARG)) {
  await send('Page.navigate', { url: new URL(URL_ARG).origin + '/favicon.svg' })
  await sleep(500)
  await evalJs(`sessionStorage.setItem('learn-demo-who', ${JSON.stringify(process.env.AS === 'student' ? 'student' : 'teacher')})`, false)
}
await send('Page.navigate', { url: URL_ARG })
await sleep(2000)

// A cold dev server can take well over 2 s (about 12 s after a restart) to render
// the first slide. Wait for a slide title; give up if the page leaves the deck.
const ready = await evalJs(`(async () => {
  for (let i = 0; i < 240; i++) {
    if (!${ON_DECK}) return 'left';
    if (document.querySelector('h1, h2')) return 'ok';
    await new Promise((r) => setTimeout(r, 250));
  }
  return 'timeout';
})()`)
if (ready !== 'ok') {
  fail(ready === 'timeout'
    ? 'The deck never rendered a slide title. Is the dev server up, and is the port right?'
    : 'The page left the deck. Is the lesson listed in src/data/classroomLessons.js, and does the URL carry ?demo (or a signed-in browser)?')
}

// The language toggle's buttons are labelled with the language code.
if (LANG !== 'en') {
  const hit = await evalJs(`(async () => {
    for (let i = 0; i < 160; i++) {
      const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim().toLowerCase() === '${LANG}');
      if (b) { b.click(); return true }
      await new Promise((r) => setTimeout(r, 250));
    }
    return false;
  })()`)
  if (!hit) fail(`No ${LANG.toUpperCase()} button. Does this deck offer that language?`)
  await sleep(300)
}

await evalJs(`document.documentElement.classList.${DARK ? 'add' : 'remove'}('dark')`, false)
// A mark on the page: if it is gone later, the page reloaded under the walk (the dev
// server reloads when someone saves a file the deck uses) and the deck is back on slide 1.
await evalJs('window.__deckWalk = true', false)

// The walk runs slide by slide from here, not in one script inside the page: Next on
// the last slide leaves the classroom page for the PRA Learn home, which would throw
// away everything a single in-page loop had collected.
const rows = []
let last = null
for (let i = 1; i <= SLIDES; i++) {
  await sleep(SETTLE_MS)
  const r = await evalJs(`(() => {
    if (!${ON_DECK}) return null;
    if (!window.__deckWalk) return { reloaded: true };
    const title = ((document.querySelector('h1,h2') || {}).textContent || '(none)').trim();
    const overflow = [];
    document.querySelectorAll('div').forEach((el) => {
      if (!/auto|scroll/.test(getComputedStyle(el).overflowY)) return;
      const over = el.scrollHeight - el.clientHeight;
      if (over > 16) overflow.push(over + 'px');
    });
    const broken = [...document.querySelectorAll('img')]
      .filter((x) => !(x.complete && x.naturalWidth > 0)).length;
    return { title, overflow, broken };
  })()`, false)
  if (!r) break
  if (r.reloaded) fail(`The page reloaded at slide ${i} (a file was saved while the walk ran?). Re-run.`)
  // Two slides in a row with the same title end the walk (see docs/TRAPS.md).
  if (r.title === last && i > 1) break
  last = r.title
  rows.push({ n: i, title: r.title.slice(0, 38), overflow: r.overflow, broken: r.broken })
  // Click the deck's own Next (the last button) rather than pressing →:
  // a game slide locks the arrow keys, and an open reveal absorbs them.
  await evalJs(`(() => { const bs = document.querySelectorAll('button'); bs[bs.length - 1].click(); })()`, false)
}
walking = false

// An empty walk is a failure, not a pass.
if (!rows.length) fail('The walk returned no slides. Did the page render? Re-run.')
let bad = 0
for (const r of rows) {
  const problems = []
  if (r.overflow.length) problems.push(`overflow ${r.overflow.join(', ')}`)
  if (r.broken) problems.push(`${r.broken} broken image(s)`)
  if (problems.length) bad++
  console.log(`${String(r.n).padStart(3)}  ${r.title.padEnd(40)} ${problems.join(' · ') || 'ok'}`)
}
if (consoleErrors.length) {
  console.log('\nconsole errors:')
  for (const e of [...new Set(consoleErrors)]) console.log('  ' + e)
}

console.log(`\n${LANG.toUpperCase()}${DARK ? ', dark' : ''}: ${rows.length} slides checked, ${bad} with layout issues, ${consoleErrors.length} console error(s)`)
ws.close()
cleanup()
process.exit(bad || consoleErrors.length ? 1 : 0)
