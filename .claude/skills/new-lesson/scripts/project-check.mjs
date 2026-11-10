/**
 * Project-mode overflow check.
 *
 * scripts/deck-check.mjs measures the deck WINDOWED at 1440x900. The lesson is
 * taught FULL SCREEN, where every layout swaps to clamp() type roughly 40% larger.
 * A deck can be spotless in deck-check and still scroll on a third of its slides in
 * front of the class, so this has to be checked separately: in every language the
 * deck offers, at the room's real resolution.
 *
 *   node .claude/skills/new-lesson/scripts/project-check.mjs "<lesson-url>" [vn|fr]
 *   WSIZE=1366,768 node .claude/skills/new-lesson/scripts/project-check.mjs "<lesson-url>" fr
 *   REVEALS=1 WSIZE=1366,768 node .claude/skills/new-lesson/scripts/project-check.mjs "<lesson-url>"
 *
 * <lesson-url> is the classroom page with ?demo, e.g.
 *   http://localhost:5201/classroom/?demo#/lesson/y7-science/U03_4
 * With ?demo the script signs in to PRA Learn's demo first (as deck-check does);
 * AS=student signs in as the demo student instead of the demo teacher.
 *
 * Three things make this awkward, all handled below:
 *   1. Project mode calls requestFullscreen(), which needs a TRUSTED user
 *      gesture. el.click() from injected JS is not one: the click has to be
 *      dispatched through CDP as a real mouse event.
 *   2. Headless Chrome ignores --window-size here (it reports 800x600 and
 *      everything looks broken). Set the viewport with
 *      Emulation.setDeviceMetricsOverride, and set it AGAIN after entering
 *      fullscreen, which resets the override.
 *   3. Headless Chrome 157 refuses requestFullscreen() even then. The deck has
 *      already switched to display mode (useDisplayMode turns it on before
 *      asking), which lays out the same at the emulated viewport, so the
 *      check accepts either and says which one it measured. The deck marks
 *      the mode on its root: data-display-mode="on".
 *
 * Baseline before panicking: a deck that teaches fine can still overflow a
 * slide at 1366x768. Run this against a known-good deck to calibrate.
 * PORT is the Chrome debugging port (default 9455): give each run at the same time its own.
 */
import { spawn, spawnSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'

const [URL_ARG, ...flags] = process.argv.slice(2)
if (!URL_ARG) {
  console.error('usage: node project-check.mjs "<lesson-url>" [vn|fr]   (env: WSIZE=1920,1080, REVEALS=1, PORT, AS=student)')
  process.exit(2)
}
const LANG = flags.find((f) => f === 'vn' || f === 'fr') || 'en'
const [VW, VH] = (process.env.WSIZE || '1920,1080').split(',').map(Number)
// REVEALS=1 opens every reveal box before measuring, whatever its label
// ("Answer", "Why?", "Check your answer"…): each one carries a chevron-down
// icon. Every other check walks with reveals shut, which hid four overflows in
// Maths 1.5 and eleven (EN and FR) in Coffee, Carbon and Stars.
const REVEALS = process.env.REVEALS === '1'
const PORT = Number(process.env.PORT || 9455)

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
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'proj-check-'))
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

let targets = null
for (let i = 0; i < 80 && !targets; i++) {
  await sleep(250)
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json() } catch { /* not up yet */ }
}
if (!targets) fail(`Chrome did not start (is port ${PORT} busy? set PORT)`)

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
// A navigation destroys the page's context mid-evaluate; that comes back as undefined.
const evalJs = async (expression, awaitPromise = true) =>
  (await send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true }))?.result?.value

const metrics = () => send('Emulation.setDeviceMetricsOverride', {
  width: VW, height: VH, deviceScaleFactor: 1, mobile: false,
})
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

// A cold dev server can take ~12 s to render the first deck: wait for its Full screen button.
const rect = await evalJs(`(async () => {
  for (let i = 0; i < 240; i++) {
    if (!${ON_DECK}) return 'left';
    const b = [...document.querySelectorAll('button')].find(x => /full ?screen/i.test(x.textContent.trim()));
    if (b) {
      const r = b.getBoundingClientRect();
      return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
    }
    await new Promise(r => setTimeout(r, 250));
  }
  return null;
})()`)
if (rect === 'left') fail('The page left the deck. Is the lesson listed in src/data/classroomLessons.js, and does the URL carry ?demo?')
if (!rect) fail('No Full screen button found. Is the dev server up, and is this a lesson URL?')

if (LANG !== 'en') {
  const found = await evalJs(`(() => {
    const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim().toLowerCase() === '${LANG}');
    if (b) { b.click(); return true }
    return false;
  })()`, false)
  if (!found) fail(`No ${LANG.toUpperCase()} button. Does this deck offer that language?`)
  await sleep(400)
}

// A trusted gesture: synthetic el.click() will not satisfy requestFullscreen().
for (const type of ['mousePressed', 'mouseReleased']) {
  await send('Input.dispatchMouseEvent', { type, x: rect.x, y: rect.y, button: 'left', clickCount: 1 })
}
await sleep(1200)
await metrics() // fullscreen resets the override
await sleep(600)

const real = await evalJs('!!document.fullscreenElement', false)
const on = real || (await evalJs(`!!document.querySelector('[data-display-mode="on"]')`, false))
const size = await evalJs('window.innerWidth + "x" + window.innerHeight', false)
if (!on) fail('Could not enter project mode')
console.log(`project mode${real ? '' : ' (windowed: this Chrome refused fullscreen)'}: ${size}, ${LANG.toUpperCase()}${REVEALS ? ', reveals open' : ''}`)
// If this mark disappears, the page reloaded under the walk (a file was saved).
await evalJs('window.__deckWalk = true', false)

// Slide by slide from Node, not one loop inside the page: Next on the last slide
// leaves the classroom page for the PRA Learn home, which would lose the results.
const rows = []
let last = null
for (let i = 1; i <= 150; i++) {
  await sleep(520)
  const r = await evalJs(`(async () => {
    if (!${ON_DECK}) return null;
    if (!window.__deckWalk) return { reloaded: true };
    const title = ((document.querySelector('h1,h2') || {}).textContent || '(none)').trim();
    if (${REVEALS}) {
      [...document.querySelectorAll('button')]
        .filter((b) => b.querySelector('svg.lucide-chevron-down'))
        .forEach((b) => b.click());
      await new Promise(r => setTimeout(r, 400));
    }
    let over = 0;
    document.querySelectorAll('div').forEach((el) => {
      if (!/auto|scroll/.test(getComputedStyle(el).overflowY)) return;
      const o = el.scrollHeight - el.clientHeight;
      if (o > over) over = o;
    });
    return { title, over };
  })()`)
  if (!r) break
  if (r.reloaded) fail(`The page reloaded at slide ${i} (a file was saved while the walk ran?). Re-run.`)
  if (r.title === last && i > 1) break
  last = r.title
  rows.push(String(i).padStart(2) + '  ' + r.title.slice(0, 34).padEnd(36) + (r.over > 16 ? 'OVERFLOW ' + r.over + 'px' : 'ok'))
  // The dock's Next is the last button. Clicking it, not pressing →, gets
  // past an open reveal and past a game slide, which locks the arrow keys.
  await evalJs(`(() => { const bs = document.querySelectorAll('button'); bs[bs.length - 1].click(); })()`, false)
}

// An empty walk is a failure, not a pass (a busy machine can return nothing).
if (!rows.length) fail('The walk returned no slides. Did the page render? Re-run.')
console.log(rows.join('\n'))
const bad = rows.filter((r) => r.includes('OVERFLOW')).length
console.log(`\n${LANG.toUpperCase()} @ ${size}: ${rows.length} slides, ${bad} overflowing`)
ws.close()
cleanup()
process.exit(bad ? 1 : 0)
