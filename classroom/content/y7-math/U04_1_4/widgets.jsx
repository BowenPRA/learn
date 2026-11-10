// content/y7-math/U04_1_4/widgets.jsx
// One widget, and it does one thing a still slide cannot.
//
//   LineUp   Adding and subtracting decimals, one press at a time, in the
//            book's grid (Workbook 4.2 Q3). It starts the way a hurried student
//            writes the sum — lined up on the RIGHT — and the first press slides
//            the numbers until the POINTS line up. Then the gaps fill with orange
//            zeros, then one column per press from the right, showing each
//            carry or exchange, then the check. The class says each step before
//            it is pressed. Three sets: the vote's 1 − 0.72 first, then
//            23.4 + 6.78 and 15 − 3.46.
//
// It sits on a showcase slide, so the stage is ONE SVG (text scales with the
// panel) and only the buttons are HTML. The SVG opens with a white plate.
//
// This deck is English and French only (meta.vietnamese: false), so every
// string goes through `t(lang, en, fr)`.
import { useState } from 'react'
import { Undo2, StepForward, SkipForward } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const RULE = '#cfd8dc'
const GREEN = '#4a8b23'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const t = (lang, en, fr) => tr(lang, en, null, fr)

function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    slate: 'bg-slate-500 border-slate-700',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${tones[tones[tone] ? tone : 'teal']}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  )
}

const SETS = [
  { a: '1', b: '0.72', op: '−', check: '0.28 + 0.72 = 1.00', estimate: false },
  { a: '23.4', b: '6.78', op: '+', check: '23 + 7 = 30', estimate: true },
  { a: '15', b: '3.46', op: '−', check: '11.54 + 3.46 = 15.00', estimate: false },
]

// Place 0 is the ones column; left is positive, so tenths are −1.
const COL_NAMES = {
  2: ['hundreds', 'centaines'],
  1: ['tens', 'dizaines'],
  0: ['ones', 'unités'],
  [-1]: ['tenths', 'dixièmes'],
  [-2]: ['hundredths', 'centièmes'],
  [-3]: ['thousandths', 'millièmes'],
}

// "23.4" -> digits by place, and the characters in writing order.
function parse(text) {
  const [whole, frac = ''] = text.split('.')
  const digits = {}
  const chars = []
  ;[...whole].forEach((d, i) => {
    const p = whole.length - 1 - i
    digits[p] = Number(d)
    chars.push({ ch: d, p })
  })
  if (text.includes('.')) chars.push({ ch: '.', p: 'pt' })
  ;[...frac].forEach((d, i) => {
    const p = -(i + 1)
    digits[p] = Number(d)
    chars.push({ ch: d, p })
  })
  return { digits, chars, lo: -frac.length, hasPoint: text.includes('.') }
}

// A digit of R at place p. A decimal place R does not have is one of the orange
// zeros the second press writes in, so it counts as 0; a whole-number place it
// does not have is blank.
const valueAt = (R, p) => R.digits[p] ?? (p < 0 ? 0 : undefined)

// Everything the stepper shows, worked out once: the answer, and for each
// column (right to left) the digit written, the words for the step, and the
// exchanges or carries made so far.
function build(set) {
  const A = parse(set.a)
  const B = parse(set.b)
  const lo = Math.min(A.lo, B.lo)
  const scale = 10 ** -lo
  const toInt = (s) => Math.round(Number(s) * scale)
  const ansInt = set.op === '+' ? toInt(set.a) + toInt(set.b) : toInt(set.a) - toInt(set.b)
  const ansText = (ansInt / scale).toFixed(-lo)
  const hi = Math.max(...Object.keys(A.digits).map(Number), ...Object.keys(B.digits).map(Number), ansText.split('.')[0].length - 1)

  const cols = []
  if (set.op === '+') {
    let carry = 0
    const carries = {}
    for (let p = lo; p <= hi; p += 1) {
      const x = valueAt(A, p)
      const y = valueAt(B, p)
      const terms = [x, y, carry || undefined].filter((v) => v !== undefined)
      const s = terms.reduce((acc, v) => acc + v, 0)
      const expr = terms.length > 1 ? `${terms.join(' + ')} = ${s}` : `${s}`
      carry = Math.floor(s / 10)
      if (carry) carries[p + 1] = carry
      cols.push({ p, digit: s % 10, expr, carries: { ...carries }, marks: {} })
    }
  } else {
    const cur = {}
    for (let p = lo; p <= hi; p += 1) cur[p] = A.digits[p] ?? 0
    const marks = {}
    for (let p = lo; p <= hi; p += 1) {
      const y = valueAt(B, p) ?? 0
      if (cur[p] < y) {
        let q = p + 1
        while (cur[q] === 0) q += 1
        cur[q] -= 1
        marks[q] = cur[q]
        for (let r = q - 1; r > p; r -= 1) { cur[r] = 9; marks[r] = 9 }
        cur[p] += 10
        marks[p] = cur[p]
      }
      const d = cur[p] - y
      const expr = valueAt(B, p) === undefined ? `${d}` : `${cur[p]} − ${y} = ${d}`
      cols.push({ p, digit: d, expr, carries: {}, marks: { ...marks } })
    }
  }
  return { A, B, lo, hi, cols }
}

// Grid geometry, in the SVG's own units.
const CW = 104 // a digit column
const PW = 34 // the point column
const OPW = 84 // the + or − column
const Y_EXCH = 124
const TOP = { y: 134, base: 192 }
const BOT = { y: 214, base: 272 }
const ANS = { y: 302, base: 360 }
const Y_CARRY = 410
const ROW_H = 76

export function LineUp({ lang = 'en' }) {
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(0)
  const set = SETS[which]
  const { A, B, lo, hi, cols } = build(set)
  const n = cols.length
  const last = 3 + n // the check

  const width = OPW + n * CW + PW
  const x0 = 560 - width / 2
  const colX = (p) => x0 + OPW + (hi - p) * CW + (p < 0 ? PW : 0)
  const colC = (p) => colX(p) + CW / 2
  const pointC = x0 + OPW + (hi + 1) * CW + PW / 2
  const xOfChar = (c) => (c.p === 'pt' ? pointC : colC(c.p))

  const aligned = step >= 1
  const filled = step >= 2
  const done = step >= 3 ? Math.min(step - 3, n - 1) : -1 // last column worked
  const current = step >= 3 && step < last ? cols[step - 3] : null
  const marks = done >= 0 ? cols[done].marks : {}
  const carries = done >= 0 ? cols[done].carries : {}

  // Written right-aligned before the first press, like a hurried student.
  const rowChars = (R) => {
    const lastChar = R.chars[R.chars.length - 1]
    const shift = aligned ? 0 : colC(lo) - xOfChar(lastChar)
    return R.chars.map((c, i) => ({ ...c, i, x: xOfChar(c) + shift }))
  }

  // Orange zeros (and an orange point on a whole number) that fill the gaps.
  const fillers = (R) => {
    const out = []
    if (!R.hasPoint && lo < 0) out.push({ ch: '.', x: pointC, p: 'pt' })
    for (let p = R.lo - 1; p >= lo; p -= 1) out.push({ ch: '0', x: colC(p), p })
    return out
  }

  // The answer's digits so far, without a leading zero in front of the ones.
  const answer = cols.slice(0, done + 1).filter((c) => {
    if (c.p <= 0) return true
    return cols.some((d) => d.p >= c.p && d.digit !== 0)
  })

  let label
  let labelColour = KEY
  if (step === 0) label = t(lang, 'Is this lined up?', 'Est-ce bien aligné\u00a0?')
  else if (step === 1) label = t(lang, 'Line up the points', 'Aligne les points')
  else if (step === 2) label = t(lang, 'Fill the gaps with zeros', 'Complète avec des zéros')
  else if (current) {
    const [en, fr] = COL_NAMES[current.p]
    label = t(lang, `${en}: ${current.expr}`, `${fr}\u00a0: ${current.expr}`)
  } else {
    label = set.estimate
      ? t(lang, `Estimate: ${set.check} ✓`, `Estimation\u00a0: ${set.check} ✓`)
      : t(lang, `Check: ${set.check} ✓`, `Vérifie\u00a0: ${set.check} ✓`)
    labelColour = GREEN
  }

  const digitText = (key, ch, x, base, fill) => (
    <g key={key} style={{ transform: `translate(${x}px, 0px)`, transition: 'transform 600ms cubic-bezier(.4,0,.2,1)' }}>
      <text x="0" y={base} fontFamily={FONT} fontSize="64" fontWeight="bold" fill={fill} textAnchor="middle">{ch}</text>
    </g>
  )

  const cells = []
  for (let p = hi; p >= lo; p -= 1) cells.push({ x: colX(p), w: CW, p })
  if (lo < 0) cells.push({ x: pointC - PW / 2, w: PW, p: 'pt' })

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          <text x="60" y="56" fontFamily={FONT} fontSize="34" fontWeight="bold" fill={INK} textAnchor="start">
            {set.a} {set.op} {set.b}
          </text>
          <text x="560" y="56" fontFamily={FONT} fontSize="28" fontWeight="bold" fill={labelColour} textAnchor="middle">
            {label}
          </text>
          <text x="1060" y="56" fontFamily={FONT} fontSize="24" fontWeight="bold" fill="#9aa5ae" textAnchor="end">
            {which + 1} / {SETS.length}
          </text>

          {/* The book's grid appears once the points are lined up. */}
          <g style={{ opacity: aligned ? 1 : 0, transition: 'opacity 400ms' }}>
            {current && (
              <rect x={colX(current.p)} y={TOP.y} width={CW} height={ANS.y + ROW_H - TOP.y} fill="#fdf1e3" />
            )}
            {[TOP, BOT, ANS].map((row) =>
              cells.map((c) => (
                <rect key={`${row.y}-${c.p}`} x={c.x} y={row.y} width={c.w} height={ROW_H}
                      fill="none" stroke={RULE} strokeWidth="2" />
              )),
            )}
            <line x1={x0} y1={ANS.y - 2} x2={x0 + width} y2={ANS.y - 2} stroke={INK} strokeWidth="5" />
          </g>

          <text x={x0 + OPW / 2} y={BOT.base} fontFamily={FONT} fontSize="56" fontWeight="bold" fill={INK} textAnchor="middle">
            {set.op}
          </text>

          {rowChars(A).map((c) => digitText(`${which}-a-${c.i}`, c.ch, c.x, TOP.base, INK))}
          {rowChars(B).map((c) => digitText(`${which}-b-${c.i}`, c.ch, c.x, BOT.base, INK))}

          {[[A, TOP], [B, BOT]].map(([R, row], k) =>
            fillers(R).map((f) => (
              <text key={`${which}-f${k}-${f.p}`} x={f.x} y={row.base} fontFamily={FONT} fontSize="64" fontWeight="bold"
                    fill={KEY} textAnchor="middle" style={{ opacity: filled ? 1 : 0, transition: 'opacity 400ms' }}>
                {f.ch}
              </text>
            )),
          )}

          {/* Exchanges: the old top digit struck through, the new value above it. */}
          {Object.keys(marks).map(Number).map((p) => (
            <g key={`${which}-m${p}`}>
              <line x1={colC(p) - 22} y1={TOP.base + 4} x2={colC(p) + 22} y2={TOP.base - 50} stroke={KEY} strokeWidth="4" strokeLinecap="round" />
              <text x={colC(p)} y={Y_EXCH} fontFamily={FONT} fontSize="30" fontWeight="bold" fill={KEY} textAnchor="middle">
                {marks[p]}
              </text>
            </g>
          ))}

          {/* Carries, small, under the answer — where the book writes them. */}
          {Object.keys(carries).map(Number).map((p) => (
            <text key={`${which}-c${p}`} x={colC(p)} y={Y_CARRY} fontFamily={FONT} fontSize="30" fontWeight="bold" fill={KEY} textAnchor="middle">
              {carries[p]}
            </text>
          ))}

          {done >= 0 && lo < 0 && (
            <text x={pointC} y={ANS.base} fontFamily={FONT} fontSize="64" fontWeight="bold" fill={INK} textAnchor="middle">.</text>
          )}
          {answer.map((c) => (
            <text key={`${which}-ans${c.p}`} x={colC(c.p)} y={ANS.base} fontFamily={FONT} fontSize="64" fontWeight="bold"
                  fill={step === last ? GREEN : INK} textAnchor="middle">
              {c.digit}
            </text>
          ))}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          {t(lang, 'Back', 'Retour')}
        </Btn>
        <Btn tone="orange" icon={StepForward} disabled={step === last} onClick={() => setStep((s) => Math.min(last, s + 1))}>
          {t(lang, 'Next step', 'Étape suivante')}
        </Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % SETS.length); setStep(0) }}>
          {t(lang, 'Next calculation', 'Calcul suivant')}
        </Btn>
      </div>
    </div>
  )
}
