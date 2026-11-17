// content/y7-math/U07_1a/game.jsx
// SAME AMOUNT OR NOT? — a game for the whole class, standing. Two numbers:
// fractions, an improper fraction and a mixed number. Arms up: the same
// amount. Arms down: not the same. Show the answer draws both to scale, one
// under the other (A in blue, B in orange), so equal amounts end on the same
// dashed line, and says why in one sentence. Eight rounds in a fixed order with
// two kinds of trap (round 2 and round 7 add 1 to the top and bottom; round 5
// gets the remainder wrong), then random rounds, the same each time for a
// given round number.
import { useState } from 'react'
import { ChevronRight, Eye, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { ArmsFigure } from '../../y7-science/U03_4/bodies.jsx'
import { mixedWidth } from './measure.js'
import { Btn, Frac, Mixed, FONT, INK, KEY, MUTED, RULE, BLUE, GREEN_DARK, GREEN_T, RED } from './parts.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const A_FILL = '#9cc3ea'
const B_FILL = '#f3b98a'

// A value is { n, d } (a fraction) or { w, n, d } (a mixed number, n < d).
const F = (n, d) => ({ n, d })
const M = (w, n, d) => ({ w, n, d })
const top = (v) => (v.w || 0) * v.d + v.n // the numerator as an improper fraction
const txt = (v) => (v.w ? `${v.w} ${v.n}/${v.d}` : `${v.n}/${v.d}`)

const NBSP = '\u00a0' // a no-break space, for the French colon
const ADD = ['Adding 1 to the top and the bottom changes the amount.', 'Ajouter 1 en haut et en bas change la quantité.']
const times = (a, b, k, op = '×') => [`${txt(a)} = ${txt(b)}: ${op} ${k} top and bottom.`, `${txt(a)} = ${txt(b)}${NBSP}: ${op} ${k} en haut et en bas.`]
const divide = (imp, m, wrong) => {
  const w = Math.floor(imp.n / imp.d)
  const r = imp.n % imp.d
  const right = M(w, r, imp.d)
  return wrong
    ? [`${imp.n} ÷ ${imp.d} = ${w} remainder ${r}, so ${txt(imp)} = ${txt(right)}, not ${txt(m)}.`, `${imp.n} ÷ ${imp.d} = ${w} reste ${r}, donc ${txt(imp)} = ${txt(right)}, pas ${txt(m)}.`]
    : [`${imp.n} ÷ ${imp.d} = ${w} remainder ${r}, so ${txt(imp)} = ${txt(m)}.`, `${imp.n} ÷ ${imp.d} = ${w} reste ${r}, donc ${txt(imp)} = ${txt(m)}.`]
}

const FIXED = [
  { a: F(1, 2), b: F(4, 8), why: times(F(1, 2), F(4, 8), 4) },
  { a: F(2, 3), b: F(3, 4), why: ADD },
  { a: F(9, 4), b: M(2, 1, 4), why: divide(F(9, 4), M(2, 1, 4), false) },
  { a: F(6, 10), b: F(3, 5), why: times(F(3, 5), F(6, 10), 2) },
  { a: F(10, 3), b: M(3, 2, 3), why: divide(F(10, 3), M(3, 2, 3), true) },
  { a: F(8, 12), b: F(2, 3), why: times(F(8, 12), F(2, 3), 4, '÷') },
  { a: F(3, 8), b: F(4, 9), why: ADD },
  { a: F(7, 2), b: M(3, 1, 2), why: divide(F(7, 2), M(3, 1, 2), false) },
]

// The same random round for the same round number.
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let x = Math.imul(s ^ (s >>> 15), 1 | s)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a)

function randomRound(i) {
  const R = rng(i * 7919 + 13)
  const pick = (lo, hi) => lo + Math.floor(R() * (hi - lo + 1))
  const kind = pick(0, 3)
  let round
  if (kind === 0 || kind === 1) {
    const b = pick(2, 6)
    let a = pick(1, b - 1)
    while (gcd(a, b) !== 1) a = pick(1, b - 1)
    if (kind === 0) {
      const k = pick(2, 4)
      round = { a: F(a, b), b: F(a * k, b * k), why: times(F(a, b), F(a * k, b * k), k) }
    } else {
      round = { a: F(a, b), b: F(a + 1, b + 1), why: ADD }
    }
  } else {
    const d = pick(2, 5)
    const w = pick(1, 3)
    const r = pick(1, d - 1)
    const imp = F(w * d + r, d)
    if (kind === 2) {
      round = { a: imp, b: M(w, r, d), why: divide(imp, M(w, r, d), false) }
    } else {
      const m = d === 2 ? M(w + 1, r, d) : M(w, r === d - 1 ? r - 1 : r + 1, d)
      round = { a: imp, b: m, why: divide(imp, m, true) }
    }
  }
  return R() < 0.5 ? round : { a: round.b, b: round.a, why: round.why }
}

const roundAt = (i) => (i < FIXED.length ? FIXED[i] : randomRound(i))
const same = (r) => top(r.a) * r.b.d === top(r.b) * r.a.d

// One value, big and centred on cx; y is the fraction line.
function Value({ v, cx, y, fill }) {
  if (v.w) return <Mixed x={cx - mixedWidth(v.w, v.n, v.d, 92) / 2} y={y} whole={v.w} top={v.n} bottom={v.d} size={92} fill={fill} />
  return <Frac x={cx} y={y} top={v.n} bottom={v.d} size={92} fill={fill} />
}

// A value to scale: whole bars of d parts, the first top(v) parts filled.
function ScaleBar({ v, x0, y, unit, fill }) {
  const N = top(v)
  const wholes = Math.max(1, Math.ceil(N / v.d))
  const pw = unit / v.d
  return (
    <g>
      {Array.from({ length: wholes * v.d }, (_, i) => (
        <rect key={i} x={x0 + i * pw} y={y} width={pw} height="44" fill={i < N ? fill : '#ffffff'} stroke={INK} strokeWidth={i % v.d === 0 ? 4 : 2} />
      ))}
      <rect x={x0} y={y} width={wholes * unit} height="44" fill="none" stroke={INK} strokeWidth="4" />
    </g>
  )
}

export function SameOrNot({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const r = roundAt(n)
  const yes = same(r)
  const verdict = yes ? GREEN_DARK : RED
  const maxWholes = Math.max(1, Math.ceil(top(r.a) / r.a.d), Math.ceil(top(r.b) / r.b.d))
  const unit = Math.min(1000, 1380 / maxWholes)
  const endA = 60 + (unit * top(r.a)) / r.a.d
  const next = () => { setN((v) => v + 1); setShown(false) }

  const card = (x, up) => {
    const right = shown && up === yes
    const fade = shown && up !== yes
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="40" width="340" height="262" rx="20" fill={right ? GREEN_T : '#f7fafc'} stroke={right ? GREEN_DARK : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 170} y={150} up={up} color={up ? BLUE : KEY} s={0.95} />
        <text x={x + 170} y="244" fontFamily={FONT} fontSize="30" fontWeight="900" fill={up ? BLUE : KEY} textAnchor="middle">{up ? t(lang, 'ARMS UP', 'BRAS EN HAUT') : t(lang, 'ARMS DOWN', 'BRAS EN BAS')}</text>
        <text x={x + 170} y="282" fontFamily={FONT} fontSize="26" fontWeight="700" fill={INK} textAnchor="middle">{up ? t(lang, 'the same', 'pareil') : t(lang, 'not the same', 'pas pareil')}</text>
        {right && (
          <g>
            <circle cx={x + 306} cy="74" r="22" fill={GREEN_DARK} />
            <path d={`M ${x + 294} 74 l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />

          {/* the question */}
          <text x="40" y="54" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, `Round ${n + 1}`, `Manche ${n + 1}`)}</text>
          <text x="40" y="100" fontFamily={FONT} fontSize="34" fontWeight="900" fill={INK}>{t(lang, 'The same amount?', 'La même quantité ?')}</text>
          <Value v={r.a} cx={190} y={214} fill={BLUE} />
          <text x="370" y="248" fontFamily={FONT} fontSize="96" fontWeight="900" fill={shown ? verdict : MUTED} textAnchor="middle">{shown ? (yes ? '=' : '≠') : '?'}</text>
          <Value v={r.b} cx={550} y={214} fill={KEY} />

          {card(760, true)}
          {card(1124, false)}

          {/* the answer: both to scale */}
          {shown ? (
            <g>
              <ScaleBar v={r.a} x0={60} y={336} unit={unit} fill={A_FILL} />
              <ScaleBar v={r.b} x0={60} y={396} unit={unit} fill={B_FILL} />
              <line x1={endA} y1="324" x2={endA} y2="452" stroke={INK} strokeWidth="4" strokeDasharray="10 7" />
              <text x="60" y="510" fontFamily={FONT} fontSize="28" fontWeight="900" fill={verdict}>{t(lang, r.why[0], r.why[1])}</text>
            </g>
          ) : (
            <text x="60" y="420" fontFamily={FONT} fontSize="28" fontWeight="900" fill={MUTED}>
              {t(lang, 'Everyone answers at once. Wrong? Sit down.', 'Tout le monde répond en même temps. Faux ? Assieds-toi.')}
            </text>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the answer', 'Montrer la réponse')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} onClick={next}>{t(lang, 'Next round', 'Manche suivante')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={n === 0 && !shown} onClick={() => { setN(0); setShown(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
