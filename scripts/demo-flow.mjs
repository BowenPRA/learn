// The demo walked through as a child would, with checks on what was saved, through
// headless Chrome's DevTools protocol (Node 24's built-in WebSocket). Needs the dev server:
//   npm run dev            (port 5201)
//   node scripts/demo-flow.mjs [outDir]  (default: shots/, git-ignored)
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
  await js(`(() => { sessionStorage.clear(); localStorage.removeItem('learn-demo-v2'); ${who ? `sessionStorage.setItem('learn-demo-who', '${who}');` : ''} localStorage.setItem('learn-lang', '${lang}'); return 1 })()`)
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


// Walk the demo as a student: the whole review (one wrong answer first), then the
// first practice item with Show me; check what was saved; then the class page.
const fails = []
const expect = (ok, what) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}`); if (!ok) fails.push(what) }
const saved = () => js("JSON.stringify(JSON.parse(localStorage.getItem('learn-demo-v2') || '{}').progress?.filter((g) => g.student_id === 'demo-s-A' && g.pack_id === 'demo-p-neg') || [])").then(JSON.parse)
await size(1280, 800)
await go('/p/y5-math-u5-negatives/review', 'student')
const answers = { 2: ['A', 'C'], 3: ['A'], 4: ['B'], 5: ['B'], 6: ['A'], 7: ['B'] }
for (let slide = 1; slide <= 9; slide += 1) {
  for (const val of answers[slide] || []) {
    await js(`(() => { const b = [...document.querySelectorAll('section button')].find((x) => x.textContent.trim().startsWith(${JSON.stringify(val)}) || x.textContent.trim() === ${JSON.stringify(val)}); b?.click(); return !!b })()`)
    await sleep(200)
  }
  await click(slide === 9 ? 'Done' : 'Next')
}
const text = await js('document.body.innerText')
expect(text.includes('Review done!') && text.includes('5 of 6 right the first time'), 'review end screen: 5 of 6 right the first time')
let rows = await saved()
const review = rows.find((g) => g.part === 'review')
expect(review && review.done && review.runs === 1 && Math.abs(review.score - 0.8333) < 0.001 && review.items.c1.ok === false && review.items.c1.tries === 2, 'review saved: done, 1 run, score 0.8333, c1 wrong first')

await click('Now practise')
for (let i = 0; i < 6; i += 1) {
  const more = await js("(() => { const b = [...document.querySelectorAll('button')].find((x) => /show me/i.test(x.textContent)); if (!b) return false; b.click(); return true })()")
  await sleep(250)
  if (!more) break
}
await shot('flow-practice-item-done')
rows = await saved()
const practice = rows.find((g) => g.part === 'practice')
const first = practice && Object.entries(practice.items)[0]
expect(practice && first && first[1].ok === false && first[1].shown === true && !practice.done, 'practice: first item saved as needing help (Show me), set not finished')

await go('/', 'student')
const home = await js('document.body.innerText')
expect(home.includes('Adding and subtracting with negative numbers'), 'home lists the pack')
await go(`/t/${encodeURIComponent('math:Year 5')}`, 'teacher')
const cls = await js('document.body.innerText')
expect(cls.includes('Learner A') && cls.includes('Who did what'), 'class page shows the class')
console.log(errors.length ? `Page errors:\n${[...new Set(errors)].join('\n')}` : 'No page errors.')
console.log(fails.length ? `${fails.length} check(s) failed` : 'All demo flow checks passed.')
ws.close()
chrome.kill()
process.exit(fails.length ? 1 : 0)
