// content/y7-math/T01_formula-machine/widgets.jsx
// Two widgets for the Formula Machine task, and only two.
//
// WHY A WIDGET AND NOT A SLIDE, for each of them.
//
// FormulaMachine. A static slide can show one rectangle with one pair of
// numbers. What this task needs is the SAME formula meeting six different
// rectangles, with the picture changing every time — because the thing Year 7
// gets wrong is not the arithmetic, it is believing the formula stops applying
// when the drawing looks different. A 15 cm by 2 cm bookmark and a 12 cm by
// 5 cm tile have the same perimeter and look nothing alike, and you cannot make
// that point with one printed figure. It also holds the working back a line at
// a time, so the class does each line on paper before the button settles it.
//
// PourWidget. Conservation of volume is a MOVEMENT — the water leaves one tank
// and arrives in another — and a still picture of two tanks either spoils the
// answer or shows nothing. Here the pour is held back until after the class has
// worked the depth out, so the animation is the payoff rather than the spoiler.
// Both tanks are drawn 7 cm tall whatever the numbers say, so nobody can read
// the answer off the height of the picture.
//
// TWO THINGS ABOUT THE STAGES, both learned the hard way.
//
// EACH STAGE IS ONE SVG WITH A viewBox, not HTML. A `showcase` slide's widget
// gets the deck's `lang` but NOT `isDisplayMode` (see primitives.jsx → Media),
// so HTML type would stay windowed-sized on the projector. Everything that has
// to be read from the back of the room is SVG text, which scales with the panel
// for free; only the buttons are HTML.
//
// AND THE viewBox IS A WIDE STRIP — 1120 × 440 — because that is the shape of
// the box a showcase slide actually hands a widget once the header bar, the
// frame padding, the caption and these buttons have taken their share. A
// squarer stage is height-limited and renders at barely half the available
// width, with everything on it correspondingly small.
//
// The five stations share one interface on purpose — the class learns it once
// on the rectangles and then never thinks about it again.
import { useState } from 'react'

const pick = (lang, en, vn) => (lang === 'vn' ? (vn ?? en) : en)

const INK = '#2b2b2b'
const KEY = '#c25e12'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** 26 → "26", 98.60000000000001 → "98.6". Float noise never reaches a slide. */
const num = (n) => String(Math.round(n * 1000) / 1000)

// ── Bilingual interface strings, in one place so nothing ships English-only ──
const T = {
  nextStep: ['Next line', 'Dòng tiếp theo'],
  back: ['Back', 'Lùi'],
  nextProblem: ['Next problem', 'Bài tiếp theo'],
  whiteboards: ['Whiteboards first. Then press.', 'Làm ra bảng con trước. Rồi mới bấm.'],
  pour: ['Pour it', 'Đổ nước'],
  tankA: ['TANK A', 'BỂ A'],
  tankB: ['TANK B', 'BỂ B'],
  celsius: ['Celsius', 'Độ C'],
  fahrenheit: ['Fahrenheit', 'Độ F'],
}
const t = (lang, k) => T[k][lang === 'vn' ? 1 : 0]

// ── Shared SVG furniture. Shapes only — no text comes out of a helper. ───────
const card = (x, y, w, h, stroke, fill) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`

const ghostCard = (x, y, w, h) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="9 8"/>`

/* ============================================================= *
 * THE FOUR FORMULA STATIONS
 *
 * Each station owns its formula, its six problems, the line-by-line working —
 * generated from the values, so a typo cannot make the steps disagree with the
 * diagram — and a draw() that redraws the picture for the current values.
 *
 * A drawing occupies x 10–520, y 110–440 of the stage; the working goes in the
 * column from x 540 across.
 *
 * Every context sentence is ONE short sentence, because the English of the
 * question is the actual barrier in this class, not the arithmetic.
 * ============================================================= */

// ── Station 1 · perimeter of a rectangle ────────────────────────────────────
// The scale is capped on BOTH dimensions, so a 15 by 2 bookmark stays honestly
// long and thin and a 7 by 7 square still fits the panel.
const drawRect = (p, solved) => {
  const s = Math.min(300 / Math.max(p.l, p.w), 170 / p.w)
  const w = p.l * s
  const h = p.w * s
  const x = 305 - w / 2
  const y = 248 - h / 2
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#eef4fb" stroke="${INK}" stroke-width="3"/>
    <text x="305" y="${y + h + 42}" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">l = ${p.l} cm</text>
    <text x="${x - 14}" y="${y + h / 2 + 8}" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="end">w = ${p.w} cm</text>
    <text x="305" y="424" font-family="${FONT}" font-size="30" font-weight="bold" fill="${solved ? GREEN : KEY}" text-anchor="middle">P = ${solved ? `${num(2 * p.l + 2 * p.w)} cm` : '?'}</text>`
}

// ── Station 2 · area of a triangle ──────────────────────────────────────────
// Drawn leaning, never isosceles: on a symmetrical triangle the height and the
// slanted side look almost the same and the error hides until the exam.
const drawTriangle = (p, solved) => {
  const s = Math.min(280 / p.b, 172 / p.h)
  const bw = p.b * s
  const hh = p.h * s
  const baseY = 356
  const x0 = 230 - bw / 2
  const ax = x0 + bw * 0.68
  const ay = baseY - hh
  const midY = ay + hh / 2
  return `
    <polygon points="${x0},${baseY} ${x0 + bw},${baseY} ${ax},${ay}" fill="#eef6e6" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M ${ax} ${ay} L ${ax} ${baseY}" fill="none" stroke="${KEY}" stroke-width="3" stroke-dasharray="9 7"/>
    <path d="M ${ax} ${baseY - 15} L ${ax - 15} ${baseY - 15} L ${ax - 15} ${baseY}" fill="none" stroke="${KEY}" stroke-width="2.5"/>
    <path d="M ${ax + 8} ${midY} L 388 ${midY}" fill="none" stroke="${KEY}" stroke-width="2"/>
    <circle cx="390" cy="${midY}" r="4" fill="${KEY}"/>
    <text x="400" y="${midY + 8}" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">h = ${p.h} cm</text>
    <text x="230" y="${baseY + 42}" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">b = ${p.b} cm</text>
    <text x="265" y="432" font-family="${FONT}" font-size="30" font-weight="bold" fill="${solved ? GREEN : KEY}" text-anchor="middle">A = ${solved ? `${num(p.b * p.h / 2)} cm²` : '?'}</text>`
}

// ── Station 3 · Celsius to Fahrenheit ───────────────────────────────────────
// Both thermometers fill to the SAME height, because it is the same
// temperature. That is the whole point of the station, in one picture.
const thermo = (cx, frac, colour) => {
  const top = 166
  const bot = 344
  const fill = Math.max(7, Math.min(1, Math.max(0, frac)) * (bot - top))
  return `
    <rect x="${cx - 17}" y="${top}" width="34" height="${bot - top}" rx="17" fill="#f1f5f9" stroke="${INK}" stroke-width="2.5"/>
    <rect x="${cx - 9}" y="${bot - fill}" width="18" height="${fill}" fill="${colour}"/>
    <circle cx="${cx}" cy="${bot + 24}" r="25" fill="${colour}" stroke="${INK}" stroke-width="2.5"/>`
}

const drawTemp = (p, solved, lang) => `
    ${thermo(180, p.c / 100, BLUE)}
    ${thermo(390, p.c / 100, RED)}
    <text x="180" y="148" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">${p.c} °C</text>
    <text x="390" y="148" font-family="${FONT}" font-size="30" font-weight="bold" fill="${solved ? GREEN : KEY}" text-anchor="middle">${solved ? `${num(1.8 * p.c + 32)} °F` : '? °F'}</text>
    <text x="180" y="424" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">${t(lang, 'celsius')}</text>
    <text x="390" y="424" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">${t(lang, 'fahrenheit')}</text>`

// ── Station 4 · how far away is the storm ───────────────────────────────────
const drawStorm = (p, solved) => `
    <path d="M 56 212 Q 36 180 68 169 Q 76 140 114 144 Q 138 122 166 142 Q 204 135 211 169 Q 238 178 227 212 Z" fill="#dbe4ec" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="140,212 118,264 144,264 122,320 172,250 145,250 165,212" fill="#ffd23f" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="330" cy="222" r="38" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <path d="M 330 193 L 330 184 M 319 182 L 341 182" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <text x="330" y="233" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">${p.t} s</text>
    <circle cx="440" cy="292" r="14" fill="#fdf1e3" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 440 306 L 440 332 M 425 315 L 455 315 M 440 332 L 428 352 M 440 332 L 452 352" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 40 354 L 500 354" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 130 384 L 428 384" fill="none" stroke="${KEY}" stroke-width="3" marker-start="url(#fm-key)" marker-end="url(#fm-key)"/>
    <text x="279" y="424" font-family="${FONT}" font-size="28" font-weight="bold" fill="${solved ? GREEN : KEY}" text-anchor="middle">d = ${solved ? `${num(p.t / 3)} km` : '?'}</text>`

const STATIONS = {
  rect: {
    accent: TEAL,
    formula: 'P = 2l + 2w',
    draw: drawRect,
    steps: (p) => [
      ['P = 2l + 2w', 'Write the formula first.', 'Viết công thức trước đã.'],
      [`P = 2 × ${p.l} + 2 × ${p.w}`, 'Put the numbers in. Keep the × signs.', 'Thay số vào. Giữ lại dấu ×.'],
      [`P = ${num(2 * p.l)} + ${num(2 * p.w)}`, 'Multiply before you add.', 'Nhân trước, cộng sau.'],
      [`P = ${num(2 * p.l + 2 * p.w)} cm`, 'A perimeter is a length: cm.', 'Chu vi là độ dài: cm.'],
    ],
    problems: [
      { l: 9, w: 4, ctx: ['Mr Bowen has a photo frame 9 cm long and 4 cm wide.', 'Thầy Bowen có một khung ảnh dài 9 cm, rộng 4 cm.'] },
      { l: 12, w: 5, ctx: ['A wall tile is 12 cm long and 5 cm wide.', 'Một viên gạch tường dài 12 cm, rộng 5 cm.'] },
      { l: 7, w: 7, ctx: ['A sticky note is 7 cm on every side. It is still a rectangle.', 'Tờ giấy nhớ có mọi cạnh 7 cm. Nó vẫn là hình chữ nhật.'] },
      { l: 15, w: 2, ctx: ['A bookmark is 15 cm long and 2 cm wide.', 'Một cái đánh dấu sách dài 15 cm, rộng 2 cm.'] },
      { l: 6.5, w: 3, ctx: ['A phone screen is 6.5 cm long and 3 cm wide.', 'Màn hình điện thoại dài 6,5 cm, rộng 3 cm.'] },
      { l: 11, w: 4.5, ctx: ['A pencil case lid is 11 cm long and 4.5 cm wide.', 'Nắp hộp bút dài 11 cm, rộng 4,5 cm.'] },
    ],
  },

  triangle: {
    accent: GREEN,
    formula: 'A = b × h ÷ 2',
    draw: drawTriangle,
    steps: (p) => [
      ['A = b × h ÷ 2', 'Write the formula first.', 'Viết công thức trước đã.'],
      [`A = ${p.b} × ${p.h} ÷ 2`, 'h is the dashed line, not the slant.', 'h là đường nét đứt, không phải cạnh xiên.'],
      [`A = ${num(p.b * p.h)} ÷ 2`, 'Multiply first, then halve it.', 'Nhân trước, rồi chia đôi.'],
      [`A = ${num(p.b * p.h / 2)} cm²`, 'An area is a surface: cm².', 'Diện tích là bề mặt: cm².'],
    ],
    problems: [
      { b: 8, h: 5, ctx: ['A triangular flag has base 8 cm and height 5 cm.', 'Một lá cờ tam giác có đáy 8 cm và chiều cao 5 cm.'] },
      { b: 10, h: 6, ctx: ['A slice of watermelon has base 10 cm and height 6 cm.', 'Một miếng dưa hấu có đáy 10 cm và chiều cao 6 cm.'] },
      { b: 7, h: 4, ctx: ['A triangle in Mr Bowen\'s notebook: base 7 cm, height 4 cm.', 'Một tam giác trong vở thầy Bowen: đáy 7 cm, cao 4 cm.'] },
      { b: 9, h: 6, ctx: ['A road sign has base 9 cm and height 6 cm on the plan.', 'Một biển báo có đáy 9 cm và cao 6 cm trên bản vẽ.'] },
      { b: 5, h: 3, ctx: ['A very small triangle has base 5 cm and height 3 cm.', 'Một tam giác rất nhỏ có đáy 5 cm và cao 3 cm.'] },
      { b: 12, h: 7, ctx: ['A roof end has base 12 cm and height 7 cm on the drawing.', 'Đầu hồi mái nhà có đáy 12 cm và cao 7 cm trên bản vẽ.'] },
    ],
  },

  temp: {
    accent: RED,
    formula: 'F = 1.8 × c + 32',
    draw: drawTemp,
    steps: (p) => [
      ['F = 1.8 × c + 32', 'Write the formula first.', 'Viết công thức trước đã.'],
      [`F = 1.8 × ${p.c} + 32`, 'c is the Celsius number. Put it in.', 'c là số độ C. Thay vào.'],
      [`F = ${num(1.8 * p.c)} + 32`, 'Multiply before you add.', 'Nhân trước, cộng sau.'],
      [`F = ${num(1.8 * p.c + 32)} °F`, 'Same heat. Different scale.', 'Cùng độ nóng. Khác thang đo.'],
    ],
    problems: [
      { c: 10, ctx: ['A cold morning in Sa Pa is 10 °C.', 'Một buổi sáng lạnh ở Sa Pa là 10 °C.'] },
      { c: 25, ctx: ['A pleasant classroom is 25 °C.', 'Một lớp học dễ chịu là 25 °C.'] },
      { c: 0, ctx: ['Ice is 0 °C.', 'Nước đá là 0 °C.'] },
      { c: 35, ctx: ['Ha Noi in June is 35 °C. This is the one you argued about.', 'Hà Nội tháng Sáu là 35 °C. Đây là bài các em đã tranh luận.'] },
      { c: 37, ctx: ['Your body is 37 °C.', 'Cơ thể em là 37 °C.'] },
      { c: 100, ctx: ['Boiling water is 100 °C.', 'Nước sôi là 100 °C.'] },
    ],
  },

  storm: {
    accent: PURPLE,
    formula: 'd = t ÷ 3',
    draw: drawStorm,
    steps: (p) => [
      ['d = t ÷ 3', 'Write the formula first.', 'Viết công thức trước đã.'],
      [`d = ${p.t} ÷ 3`, 't is the seconds you counted.', 't là số giây em đếm được.'],
      [`d = ${num(p.t / 3)} km`, 'About 3 seconds per kilometre.', 'Khoảng 3 giây cho mỗi ki-lô-mét.'],
    ],
    problems: [
      { t: 9, ctx: ['You see the flash. You count 9 seconds. Then the bang.', 'Em thấy tia chớp. Em đếm 9 giây. Rồi tiếng sấm.'] },
      { t: 15, ctx: ['The next flash. You count 15 seconds.', 'Tia chớp tiếp theo. Em đếm 15 giây.'] },
      { t: 3, ctx: ['You count 3 seconds. Go inside.', 'Em đếm 3 giây. Vào nhà ngay.'] },
      { t: 24, ctx: ['You count 24 seconds.', 'Em đếm 24 giây.'] },
      { t: 45, ctx: ['You count 45 seconds. The storm is a long way off.', 'Em đếm 45 giây. Cơn giông còn rất xa.'] },
      { t: 6, ctx: ['You count 6 seconds. Is it closer than the last one?', 'Em đếm 6 giây. Có gần hơn lần trước không?'] },
    ],
  },
}

// ── The controls under both stages, identical so the class learns them once ──
function Controls({ lang, count, i, onPick, n, onBack, onNext, accent, solved, nextLabel }) {
  return (
    <div className="w-full flex-shrink-0 mt-2 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }, (_, k) => (
          <button
            key={k}
            onClick={() => onPick(k)}
            className={`w-9 h-9 rounded-xl font-black text-sm border-2 active:scale-95 transition-all ${k === i ? 'text-white border-transparent' : 'text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-600'}`}
            style={k === i ? { backgroundColor: accent } : undefined}>
            {k + 1}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        disabled={n === 0}
        className="px-3 py-2 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 disabled:opacity-30 active:scale-95">
        {t(lang, 'back')}
      </button>
      <button
        onClick={onNext}
        className="flex-1 min-w-[180px] py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 active:scale-95 transition-all"
        style={{ backgroundColor: solved ? PURPLE : accent, borderColor: solved ? PURPLE : accent }}>
        {solved ? t(lang, 'nextProblem') : nextLabel}
      </button>
      <span className="hidden xl:block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
        {t(lang, 'whiteboards')}
      </span>
    </div>
  )
}

/* ============================================================= *
 * FORMULA MACHINE — one stage, four stations
 * ============================================================= */
function FormulaMachine({ lang = 'en', station = 'rect' }) {
  const st = STATIONS[station]
  const [i, setI] = useState(0)
  const [n, setN] = useState(0) // lines of working revealed

  const p = st.problems[i]
  const steps = st.steps(p)
  const solved = n >= steps.length
  const accent = st.accent

  const slots = steps.map((s, k) => {
    const y = 118 + k * 80
    if (k >= n) return ghostCard(540, y, 560, 68)
    const tone = k === steps.length - 1 ? GREEN : k === 0 ? KEY : BLUE
    return `${card(540, y, 560, 68, tone, `${tone}12`)}
      <text x="562" y="${y + 34}" font-family="${FONT}" font-size="30" font-weight="bold" fill="${tone}">${s[0]}</text>
      <text x="562" y="${y + 57}" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}">${pick(lang, s[1], s[2])}</text>`
  }).join('')

  const stage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    <defs>
      <marker id="fm-key" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>
    <rect x="0" y="0" width="1120" height="440" rx="16" fill="#ffffff"/>
    ${card(20, 10, 500, 56, accent, `${accent}14`)}
    <text x="270" y="48" font-family="${FONT}" font-size="32" font-weight="bold" fill="${accent}" text-anchor="middle">${st.formula}</text>
    <text x="270" y="94" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">${pick(lang, p.ctx[0], p.ctx[1])}</text>
    ${st.draw(p, solved, lang)}
    ${slots}
  </svg>`

  const next = () => {
    if (solved) { setI((i + 1) % st.problems.length); setN(0) } else setN(n + 1)
  }

  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="flex-1 min-h-0 w-full" dangerouslySetInnerHTML={{ __html: stage }} />
      <Controls
        lang={lang} count={st.problems.length} i={i}
        onPick={(k) => { setI(k); setN(0) }}
        n={n} onBack={() => setN(Math.max(0, n - 1))} onNext={next}
        accent={accent} solved={solved} nextLabel={t(lang, 'nextStep')}
      />
    </div>
  )
}

// One interface, four stations. Written as named wrappers because slides.js is
// plain .js and cannot pass a prop through JSX.
export const PerimeterStation = (props) => <FormulaMachine {...props} station="rect" />
export const TriangleStation = (props) => <FormulaMachine {...props} station="triangle" />
export const TemperatureStation = (props) => <FormulaMachine {...props} station="temp" />
export const StormStation = (props) => <FormulaMachine {...props} station="storm" />

/* ============================================================= *
 * THE POUR — the same water, a different tank
 *
 * Tank A holds l × w × h centimetre cubes of water. Tank B has a known base
 * and the class has to find how deep the water ends up in it. The five problems
 * are ordered so the water FALLS, then RISES, then stays at exactly the SAME
 * depth in a differently shaped tank — because "same volume" and "same depth"
 * are the two ideas most easily confused, and problem 3 is the one that
 * separates them.
 * ============================================================= */
const POURS = [
  { a: [4, 3, 3], b: [6, 3], ctx: ['The tank from the last slide: 4 cm by 3 cm, water 3 cm deep.', 'Bể ở trang trước: 4 cm nhân 3 cm, nước sâu 3 cm.'] },
  { a: [6, 5, 2], b: [4, 3], ctx: ['A wide tank pours into a narrow one. Watch what the water does.', 'Bể rộng đổ sang bể hẹp. Xem nước làm gì nhé.'] },
  { a: [4, 3, 5], b: [6, 2], ctx: ['A different shape of tank. Is the water deeper, or not?', 'Bể có hình dạng khác. Nước sâu hơn hay không?'] },
  { a: [10, 4, 3], b: [8, 5], ctx: ['A long fish tank empties into a shorter, wider one.', 'Một bể cá dài đổ sang một bể ngắn hơn và rộng hơn.'] },
  { a: [5, 4, 3], b: [8, 3], ctx: ['This one does not come out as a whole number of centimetres.', 'Bài này đáp án không phải số nguyên xăng-ti-mét.'] },
]

const TANK_CM = 7 // both tanks are drawn 7 cm tall whatever the numbers say
const BASE_Y = 376

/**
 * Pixels per centimetre for one problem — the SAME for both tanks, always,
 * because a pair of tanks drawn to different scales would settle the question
 * by looking at it. Chosen so the wider of the two just fits its half of the
 * stage, and capped so a small pair of tanks does not balloon.
 */
const scaleFor = ([al, aw], [bl, bw]) =>
  Math.min(300 / (al + 0.42 * aw), 300 / (bl + 0.42 * bw), 34)

/**
 * An open tank in oblique projection. Shapes only. `mode` decides the water:
 * 'full' draws it at waterCm, 'empty' draws none, 'fill' rises to waterCm and
 * 'drain' falls to nothing — the last two on a press, which is the pour.
 */
const pourTank = (x, l, w, waterCm, mode, spc) => {
  const pw = l * spc
  const ph = TANK_CM * spc
  const y = BASE_Y - ph
  const dx = Math.round(w * spc * 0.42)
  const dy = -Math.round(dx * 0.62)
  const fill = waterCm * spc
  const wy = BASE_Y - fill
  const shell = `
    <polygon points="${x},${y} ${x + dx},${y + dy} ${x + pw + dx},${y + dy} ${x + pw},${y}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="${x + pw},${y} ${x + pw + dx},${y + dy} ${x + pw + dx},${BASE_Y + dy} ${x + pw},${BASE_Y}" fill="#eef4f8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`
  const frame = `<rect x="${x}" y="${y}" width="${pw}" height="${ph}" fill="none" stroke="${INK}" stroke-width="3"/>`
  if (mode === 'empty') return `${shell}${frame}`

  // The front face of the water and its top surface move together.
  const face = mode === 'fill'
    ? `<rect x="${x}" y="${BASE_Y}" width="${pw}" height="0" fill="#bfe6f4" stroke="#3d8fb0" stroke-width="2">
         <animate attributeName="y" from="${BASE_Y}" to="${wy}" dur="0.9s" begin="0.3s" fill="freeze"/>
         <animate attributeName="height" from="0" to="${fill}" dur="0.9s" begin="0.3s" fill="freeze"/>
       </rect>`
    : mode === 'drain'
      ? `<rect x="${x}" y="${wy}" width="${pw}" height="${fill}" fill="#bfe6f4" stroke="#3d8fb0" stroke-width="2">
           <animate attributeName="y" from="${wy}" to="${BASE_Y}" dur="0.9s" begin="0.3s" fill="freeze"/>
           <animate attributeName="height" from="${fill}" to="0" dur="0.9s" begin="0.3s" fill="freeze"/>
         </rect>`
      : `<rect x="${x}" y="${wy}" width="${pw}" height="${fill}" fill="#bfe6f4" stroke="#3d8fb0" stroke-width="2"/>`
  const move = mode === 'fill'
    ? `<animateTransform attributeName="transform" type="translate" from="0 ${fill}" to="0 0" dur="0.9s" begin="0.3s" fill="freeze"/>`
    : mode === 'drain'
      ? `<animateTransform attributeName="transform" type="translate" from="0 0" to="0 ${fill}" dur="0.9s" begin="0.3s" fill="freeze"/>`
      : ''
  // On a drain the surface has to disappear as well as fall, or the empty tank
  // is left with a blue parallelogram on its floor that reads as water.
  const fade = mode === 'drain'
    ? `<animate attributeName="opacity" from="1" to="0" dur="0.3s" begin="1.0s" fill="freeze"/>`
    : ''
  const surface = `<polygon points="${x},${wy} ${x + dx},${wy + dy} ${x + pw + dx},${wy + dy} ${x + pw},${wy}" fill="#7ec8e3" stroke="#3d8fb0" stroke-width="2" transform="translate(0 ${mode === 'fill' ? fill : 0})">${move}${fade}</polygon>`
  return `${shell}${face}${surface}${frame}`
}

export function PourWidget({ lang = 'en' }) {
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)

  const p = POURS[i]
  const [al, aw, ah] = p.a
  const [bl, bw] = p.b
  const vol = al * aw * ah
  const layer = bl * bw
  const depth = vol / layer
  const poured = n >= 4
  const spc = scaleFor(p.a, p.b)
  // The depth read-out sits just above the water once it has arrived, and in
  // the middle of the empty tank before that — never over the water itself.
  const readY = poured ? BASE_Y - depth * spc - 18 : BASE_Y - 3.5 * spc
  // Where tank A actually ends, so the pouring arrow spans the real gap
  // rather than a gap guessed from the widest problem.
  const aRight = 70 + al * spc + Math.round(aw * spc * 0.42)

  const steps = [
    [`${al} × ${aw} × ${ah} = ${vol} cm³`, 'How much water is in tank A?', 'Bể A có bao nhiêu nước?'],
    [`Still ${vol} cm³`, 'Pouring does not make new water.', 'Đổ nước không tạo ra nước mới.'],
    [`${bl} × ${bw} = ${layer} cm³`, 'One layer of tank B holds this.', 'Một lớp của bể B chứa được từng này.'],
    [`${vol} ÷ ${layer} = ${num(depth)} cm`, 'Total ÷ one layer = how many layers.', 'Tổng ÷ một lớp = số lớp.'],
  ]

  const slots = steps.map((s, k) => {
    const y = 118 + k * 80
    if (k >= n) return ghostCard(740, y, 360, 68)
    const tone = k === 3 ? GREEN : k === 1 ? BLUE : KEY
    return `${card(740, y, 360, 68, tone, `${tone}12`)}
      <text x="920" y="${y + 32}" font-family="${FONT}" font-size="25" font-weight="bold" fill="${tone}" text-anchor="middle">${s[0]}</text>
      <text x="920" y="${y + 55}" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">${pick(lang, s[1], s[2])}</text>`
  }).join('')

  const stage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    <defs>
      <marker id="pw-blue" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
    </defs>
    <rect x="0" y="0" width="1120" height="440" rx="16" fill="#ffffff"/>

    <text x="370" y="40" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">${pick(lang, p.ctx[0], p.ctx[1])}</text>

    <text x="70" y="102" font-family="${FONT}" font-size="19" font-weight="bold" fill="${TEAL}">${t(lang, 'tankA')}</text>
    <text x="420" y="102" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}">${t(lang, 'tankB')}</text>

    ${pourTank(70, al, aw, ah, poured ? 'drain' : 'full', spc)}
    ${pourTank(420, bl, bw, depth, poured ? 'fill' : 'empty', spc)}

    <path d="M ${aRight + 14} 268 Q ${(aRight + 420) / 2} 208 412 254" fill="none" stroke="${BLUE}" stroke-width="4" marker-end="url(#pw-blue)" opacity="${poured ? 1 : 0.22}"/>

    <text x="${70 + al * spc / 2}" y="${BASE_Y + 32}" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">${al} cm × ${aw} cm</text>
    <text x="56" y="${BASE_Y - ah * spc / 2 + 8}" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="end">${ah} cm</text>
    <text x="${420 + bl * spc / 2}" y="${BASE_Y + 32}" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">${bl} cm × ${bw} cm</text>
    <text x="${420 + bl * spc / 2}" y="${readY}" font-family="${FONT}" font-size="30" font-weight="bold" fill="${poured ? GREEN : KEY}" text-anchor="middle">${poured ? `${num(depth)} cm` : '? cm'}</text>

    ${slots}
  </svg>`

  const next = () => {
    if (poured) { setI((i + 1) % POURS.length); setN(0) } else setN(n + 1)
  }

  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="flex-1 min-h-0 w-full" dangerouslySetInnerHTML={{ __html: stage }} />
      <Controls
        lang={lang} count={POURS.length} i={i}
        onPick={(k) => { setI(k); setN(0) }}
        n={n} onBack={() => setN(Math.max(0, n - 1))} onNext={next}
        accent={TEAL} solved={poured}
        nextLabel={n === 3 ? t(lang, 'pour') : t(lang, 'nextStep')}
      />
    </div>
  )
}
