// Screenshots of every page in demo mode, at 1280x800 and 390x844, through headless
// Chrome's DevTools protocol (Node 24's built-in WebSocket). Needs the dev server:
//   npm run dev            (port 5201)
//   node scripts/shots.mjs [outDir]     (default: shots/, git-ignored)
// Chrome runs with its own profile on debugging port 9481 and is closed at the end.
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, mkdtempSync, openSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import process from 'node:process'

const BASE = 'http://localhost:5201/'
const PORT = 9481
const OUT = process.argv[2] || 'shots'
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
mkdirSync(OUT, { recursive: true })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const profile = mkdtempSync(join(tmpdir(), 'learn-shots-'))
const log = openSync(join(profile, 'chrome.log'), 'w')
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: ['ignore', log, log] })

async function target() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()
      const page = list.find((t) => t.type === 'page')
      if (page) return page.webSocketDebuggerUrl
    } catch { /* not up yet */ }
    await sleep(200)
  }
  throw new Error('Chrome did not start')
}

const ws = new WebSocket(await target())
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let seq = 0
const waiting = new Map()
const errors = []
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && waiting.has(msg.id)) { waiting.get(msg.id)(msg); waiting.delete(msg.id) }
  if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text)
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') errors.push(msg.params.args.map((a) => a.value ?? a.description).join(' '))
})
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++seq
  waiting.set(id, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)))
  ws.send(JSON.stringify({ id, method, params }))
})
const js = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (r.exceptionDetails) throw new Error(`${expression.slice(0, 60)}: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`)
  return r.result.value
}
await send('Page.enable')
await send('Runtime.enable')

async function size(w, h) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: w < 500 ? 2 : 1, mobile: w < 500 })
}
let visit = 0
// A new query string each time, so the page really reloads (a hash change alone does not).
async function go(hash, who = null, lang = 'en') {
  await send('Page.navigate', { url: `${BASE}?v=${++visit}#/__blank` })
  await sleep(300)
  await js(`(() => { sessionStorage.clear(); localStorage.removeItem('learn-demo-v3'); ${who ? `sessionStorage.setItem('learn-demo-who', '${who}');` : ''} localStorage.setItem('learn-lang', '${lang}'); return 1 })()`)
  await send('Page.navigate', { url: `${BASE}?v=${++visit}#${hash}` })
  await settle()
}
async function settle() {
  for (let i = 0; i < 40; i += 1) {
    await sleep(150)
    const busy = await js(`document.readyState !== 'complete' || !!document.querySelector('[role=status] .animate-spin')`)
    if (!busy) break
  }
  await sleep(400)
}
const click = async (text) => {
  const ok = await js(`(() => { const want = ${JSON.stringify(text)}; const els = [...document.querySelectorAll('button, a')]; const el = els.find((e) => e.textContent.trim().includes(want) && !e.disabled); if (!el) return false; el.click(); return true })()`)
  if (!ok) throw new Error(`no button "${text}"`)
  await settle()
}
async function shot(name) {
  // A full-page picture of a scrolled page draws sticky bars mid-page: show them where
  // they sit at either end of the page instead.
  await js("(() => { window.scrollTo(0, 0); const st = document.createElement('style'); st.id = 'shot-unstick'; st.textContent = '.sticky { position: relative !important; }'; document.head.appendChild(st); return 1 })()")
  await sleep(150)
  const metrics = await send('Page.getLayoutMetrics')
  const h = Math.min(Math.ceil(metrics.cssContentSize.height), 6000)
  const w = Math.ceil(metrics.cssLayoutViewport.clientWidth)
  const overflow = await js('document.documentElement.scrollWidth - document.documentElement.clientWidth')
  const img = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } })
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(img.data, 'base64'))
  await js("(() => { document.getElementById('shot-unstick')?.remove(); return 1 })()")
  console.log(`${name}.png  ${w}x${h}${overflow > 0 ? `  SIDEWAYS SCROLL ${overflow}px` : ''}`)
}

const SIZES = [['desk', 1280, 800], ['phone', 390, 844]]
for (const [tag, w, h] of SIZES) {
  await size(w, h)
  await go('/'); await shot(`${tag}-01-signin`)
  await click('teacher'); await shot(`${tag}-02-signin-staff`)
  await go('/', 'student'); await shot(`${tag}-03-student-home`)
  await go('/', 'student', 'vn'); await shot(`${tag}-04-student-home-vi`)
  await go('/p/y5-math-u5-negatives', 'student'); await shot(`${tag}-05-pack`)
  await go('/p/y5-math-u5-negatives/review', 'student'); await shot(`${tag}-06-review-hero`)
  await click('Next'); await shot(`${tag}-07-review-check`)
  await click('0'); await click('−4'); await shot(`${tag}-08-review-answered`)
  await go('/p/y5-math-u5-negatives/practice', 'student'); await shot(`${tag}-09-practice`)
  await go('/me', 'student'); await shot(`${tag}-10-my-results`)
  await go('/', 'teacher'); await shot(`${tag}-11-teacher-home`)
  await go(`/t/${encodeURIComponent('math:Year 5')}`, 'teacher'); await shot(`${tag}-12-class`)
  await click('Most missed'); await shot(`${tag}-13-class-misses`)
  await click('Make a login'); await shot(`${tag}-14-login-cards`)
}
console.log(errors.length ? `Page errors:\n${[...new Set(errors)].join('\n')}` : 'No page errors.')
ws.close()
chrome.kill()
