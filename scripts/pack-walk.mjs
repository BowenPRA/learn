// Walks one pack in demo mode as a student and as the teacher, with screenshots at
// 1280x800 and 390x844 and checks a person would otherwise make by eye:
//   - every review slide (before and after its check), no sideways scroll, no SVG text
//     drawn smaller than 9 px, no picture that failed to load;
//   - every check answered (one wrong first on the first check, to see the explanation);
//   - every practice part solved step by step from the pack's own answers (desktop),
//     one slip typed on purpose; the first item on the phone;
//   - My results, the class page and Most missed as Mr. David.
// Needs the dev server (npm run dev, port 5201) and the pack in demo mode.
//   node scripts/pack-walk.mjs <slug> [outDir]       (default outDir: shots/<slug>)
// Chrome: debugging port CDP_PORT (default 9497), own profile, closed at the end.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { openChrome, sleep } from './lib/cdp.mjs'
import { askedSteps } from '../src/stepPractice/model.js'

const LEARN = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const slug = process.argv[2] || 'y5-math-u5-below-zero'
const OUT = resolve(process.argv[3] || join(LEARN, 'shots', slug))
const BASE = process.env.LEARN_URL || 'http://localhost:5201/'
const pack = JSON.parse(readFileSync(join(LEARN, 'packs', slug, 'pack.json'), 'utf8'))
mkdirSync(OUT, { recursive: true })

const c = await openChrome()
const { send, js, size } = c
const fails = []
const expect = (ok, what) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}`); if (!ok) fails.push(what) }

let visit = 0
async function settle() {
  for (let i = 0; i < 40; i += 1) {
    await sleep(120)
    if (!(await js("document.readyState !== 'complete' || !!document.querySelector('[role=status] .animate-spin')"))) break
  }
  await sleep(350)
}
async function go(hash, who = null, lang = 'en') {
  await send('Page.navigate', { url: `${BASE}?v=${++visit}#/__blank` })
  await sleep(250)
  await js(`(() => { sessionStorage.clear(); ${who ? `sessionStorage.setItem('learn-demo-who', '${who}');` : ''} localStorage.setItem('learn-lang', '${lang}'); return 1 })()`)
  await send('Page.navigate', { url: `${BASE}?v=${++visit}#${hash}` })
  await settle()
}
const resetDemo = () => js("(() => { localStorage.removeItem('learn-demo-v3'); return 1 })()")
const click = async (text, scope = 'button, a') => {
  const ok = await js(`(() => { const want = ${JSON.stringify(text)}; const el = [...document.querySelectorAll(${JSON.stringify(scope)})].find((e) => e.textContent.replace(/\\s+/g, ' ').trim().includes(want) && !e.disabled); if (!el) return false; el.click(); return true })()`)
  if (!ok) throw new Error(`no button "${text}"`)
  await settle()
}
async function inspect(name) {
  const r = await js(`(() => {
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth
    let small = 99
    for (const t of document.querySelectorAll('main svg text, section svg text')) {
      const h = t.getBoundingClientRect().height
      if (h > 0 && t.textContent.trim()) small = Math.min(small, h)
    }
    const broken = [...document.querySelectorAll('main img')].filter((i) => i.complete && i.naturalWidth === 0).length
    const noAlt = [...document.querySelectorAll('main img')].filter((i) => !i.alt).length
    return { overflow, small: Math.round(small * 10) / 10, broken, noAlt }
  })()`)
  const bad = []
  if (r.overflow > 0) bad.push(`sideways scroll ${r.overflow}px`)
  if (r.small < 9) bad.push(`SVG text only ${r.small}px tall`)
  if (r.broken) bad.push(`${r.broken} picture(s) did not load`)
  if (r.noAlt) bad.push(`${r.noAlt} picture(s) without alt`)
  if (bad.length) fails.push(`${name}: ${bad.join(', ')}`)
  return bad
}
async function shot(name) {
  await js("(() => { window.scrollTo(0, 0); const st = document.createElement('style'); st.id = 'shot-unstick'; st.textContent = '.sticky { position: relative !important; }'; document.head.appendChild(st); return 1 })()")
  await sleep(120)
  const m = await send('Page.getLayoutMetrics')
  const h = Math.min(Math.ceil(m.cssContentSize.height), 6000)
  const w = Math.ceil(m.cssLayoutViewport.clientWidth)
  const bad = await inspect(name)
  const img = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } })
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(img.data, 'base64'))
  await js("(() => { document.getElementById('shot-unstick')?.remove(); return 1 })()")
  console.log(`  ${name}.png ${w}x${h}${bad.length ? `  << ${bad.join(', ')}` : ''}`)
}

// ------------------------------------------------------------------ review
const review = pack.parts.find((p) => p.kind === 'review')
// Answer buttons only: the box also holds Listen buttons (read aloud), which come first.
const chooseCheck = (idx) => js(`(() => { const b = document.querySelectorAll('section[aria-live] .grid button')[${idx}]; if (!b || b.disabled) return false; b.click(); return true })()`)

async function walkReview(tag) {
  await go(`/p/${slug}/review`, 'student')
  let firstWrongDone = false
  for (let i = 0; i < review.slides.length; i += 1) {
    const s = review.slides[i]
    const n = String(i + 1).padStart(2, '0')
    await shot(`${tag}-review-${n}`)
    if (s.check) {
      const right = s.check.options.findIndex((o) => o.val === s.check.correct)
      if (!firstWrongDone) {
        const wrong = right === 0 ? 1 : 0
        expect(await chooseCheck(wrong), `${tag} slide ${i + 1}: a wrong answer can be chosen`)
        await sleep(250)
        const t = await js("document.querySelector('section[aria-live]').innerText")
        expect(/not quite/i.test(t), `${tag} slide ${i + 1}: a wrong answer says Not quite`)
        firstWrongDone = true
      }
      expect(await chooseCheck(right), `${tag} slide ${i + 1}: the right answer (${s.check.correct}) can be chosen`)
      await sleep(250)
      const t = await js("document.querySelector('section[aria-live]').innerText")
      expect(/right|well done|yes/i.test(t.split('\n').slice(-3).join(' ')) || !/not quite/i.test(t.split('\n').slice(-2).join(' ')), `${tag} slide ${i + 1}: the deck's answer is marked right`)
      await shot(`${tag}-review-${n}-answered`)
    }
    // open any Show me box, so the answer text is seen too
    const opened = await js(`(() => { const b = [...document.querySelectorAll('main button')].find((x) => x.closest('.border-dashed')); if (!b) return false; b.click(); return true })()`)
    if (opened) { await sleep(200); await shot(`${tag}-review-${n}-shown`) }
    await click(i === review.slides.length - 1 ? 'Done' : 'Next', 'footer button')
  }
  const end = await js('document.body.innerText')
  const total = review.slides.filter((s) => s.check).length
  expect(end.includes(`${total - 1} of ${total}`), `${tag} review end: ${total - 1} of ${total} right the first time`)
  await shot(`${tag}-review-end`)
}

// ------------------------------------------------------------------ practice
const setValue = (value) => js(`(() => {
  const input = document.querySelector('input[aria-label]:not([type=hidden])')
  if (!input) return false
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
  setter.call(input, ${JSON.stringify(value)})
  input.dispatchEvent(new Event('input', { bubbles: true }))
  return true
})()`)
const enter = () => js(`(() => { const input = document.querySelector('input[aria-label]'); input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); return 1 })()`)
const clickText = (text) => js(`(() => { const want = ${JSON.stringify(text)}; const b = [...document.querySelectorAll('button')].find((x) => x.textContent.replace(/\\s+/g, ' ').trim() === want && !x.disabled) || [...document.querySelectorAll('button')].find((x) => x.textContent.replace(/\\s+/g, ' ').trim().includes(want) && !x.disabled); if (!b) return false; b.click(); return true })()`)
const strip = (s) => String(s).replace(/\{\{|\}\}|\[\[|\]\]|<<|>>|\*\*/g, '').replace(/\s+/g, ' ').trim()

async function answerStep(step) {
  const inp = step.input
  if (inp.type === 'number' || inp.type === 'text') {
    expect(await setValue(String([].concat(inp.answer)[0])), `typed into the box (${step.title})`)
    await sleep(80)
    await enter()
  } else if (inp.type === 'choice') {
    const o = inp.options.find((x) => x.id === inp.answer)
    expect(await clickText(o.text), `chose "${o.text}" (${step.title})`)
  } else {
    // order, multi, gap, tap: not driven here; Show me fills the step
    await clickText('Show me')
    await sleep(450)
    return false
  }
  await sleep(450)
  return true
}

async function walkPractice(part, tag, { solve = true, slipOn = null } = {}) {
  await go(`/p/${slug}/practice${part.id === 'practice' ? '' : `?part=${part.id}`}`, 'student')
  await shot(`${tag}-${part.id}-01-first`)
  if (!solve) return
  for (let k = 0; k < part.set.items.length; k += 1) {
    const screen = strip(await js("document.querySelector('main, body').innerText"))
    const item = part.set.items.find((it) => screen.includes(strip(it.prompt).slice(0, 40)))
    if (!item) { expect(false, `${part.id}: could not tell which item is on screen (${k + 1})`); break }
    let clean = !(slipOn && slipOn.item === item.id)
    for (const si of askedSteps(item)) {
      const step = item.steps[si]
      if (slipOn && slipOn.item === item.id && slipOn.step === si) {
        await setValue(slipOn.value); await sleep(80); await enter(); await sleep(450)
        const said = await js('document.body.innerText')
        const slip = step.slips.find((x) => JSON.stringify(x.value) === JSON.stringify(slipOn.value))
        expect(said.includes(slip.msg.slice(0, 30)), `${part.id} ${item.id}: typing ${slipOn.value} shows its slip message`)
        await shot(`${tag}-${part.id}-02-slip`)
      }
      if (!(await answerStep(step))) clean = false
    }
    const done = await js('document.body.innerText')
    if (clean) expect(/first time/i.test(done), `${part.id} ${item.id}: finished right first time`)
    else console.log(`  ${part.id} ${item.id}: a step the walk cannot type (Show me used)`)
    if (k === 0) await shot(`${tag}-${part.id}-03-done-card`)
    const more = await clickText('Next') || await clickText('Finish') || await clickText('Done')
    await sleep(500)
    if (!more) break
  }
  await settle()
  await shot(`${tag}-${part.id}-04-end`)
  const end = await js('document.body.innerText')
  expect(/practice done|well done|finished/i.test(end), `${part.id}: the end screen shows`)
}

// ------------------------------------------------------------------ run
for (const [tag, w, h] of [['desk', 1280, 800], ['phone', 390, 844]]) {
  await size(w, h, w < 500 ? 2 : 1, w < 500)
  await go('/', 'student'); await resetDemo()
  await go('/', 'student'); await shot(`${tag}-00-home`)
  await go(`/p/${slug}`, 'student'); await shot(`${tag}-00-pack`)
  await walkReview(tag)
  for (const part of pack.parts.filter((p) => p.kind === 'practice')) {
    const first = part.set.items.find((it) => it.level === 'focus')
    const lastStep = first?.steps.length - 1
    const slip = first?.steps[lastStep]?.slips?.find((x) => typeof x.value === 'string')
    await walkPractice(part, tag, { solve: tag === 'desk', slipOn: slip ? { item: first.id, step: lastStep, value: slip.value } : null })
  }
  await go('/me', 'student'); await shot(`${tag}-20-my-results`)
  await go(`/p/${slug}`, 'teacher'); await shot(`${tag}-21-pack-as-teacher`)
  await go(`/t/${encodeURIComponent(pack.class_key)}`, 'teacher'); await shot(`${tag}-22-class`)
  try { await click('Most missed'); await shot(`${tag}-23-most-missed`) } catch (e) { expect(false, e.message) }
}

console.log(c.errors.length ? `Page errors:\n${[...new Set(c.errors)].join('\n')}` : 'No page errors.')
console.log(fails.length ? `${fails.length} problem(s):\n- ${fails.join('\n- ')}` : 'Walk passed.')
c.close()
process.exit(fails.length ? 1 : 0)
