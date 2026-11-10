// content/y7-math/U03_1_2/widgets.jsx
// Two widgets, and each does one thing a still slide cannot.
//
//   PlaceShift   The whole point of 3.1: multiplying by a power of 10 does not
//                "add zeros", it MOVES every digit along the place-value table.
//                One press = one place. The decimal point never moves; the
//                digits do. Zeros that appear are marked orange, because they
//                are placeholders holding a column open, not digits someone
//                invented. Four sets: two multiplying, two dividing.
//
//   WhichWay     A full-slide `game` for quick-fire recall: a calculation
//                appears, the class shows the number of places on their fingers
//                and the direction with a hand (left hand = left), then Show
//                gives the direction and the answer. A clicker's Right arrow
//                shows, then moves on.
//
// PlaceShift is used on a showcase slide, which hands a widget no
// isDisplayMode, so its stage is ONE SVG (text scales with the panel) and only
// the buttons are HTML. Every SVG opens with a white plate.
import { useState, useEffect, useCallback } from 'react'
import { Undo2, RotateCcw, ArrowRight, Eye, Shuffle, Sparkles, Move, SkipForward } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']

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

/* ============================================================= *
 * WIDGET 1 — THE DIGITS MOVE
 * ============================================================= */
const SETS = [
  { n: '7.2', op: '×', k: 3 },
  { n: '6.5', op: '×', k: 4 },
  { n: '48600', op: '÷', k: 3 },
  { n: '702', op: '÷', k: 4 },
]

// "7.2" -> { 0: '7', -1: '2' }. Place 0 is the ones column; left is positive.
function parseNumber(text) {
  const [whole, frac = ''] = text.split('.')
  const map = {}
  ;[...whole].forEach((d, i) => { map[whole.length - 1 - i] = d })
  ;[...frac].forEach((d, i) => { map[-(i + 1)] = d })
  return map
}

// Every digit's place moves by `delta`. The decimal point stays where it is.
const shiftBy = (map, delta) =>
  Object.fromEntries(Object.entries(map).map(([p, d]) => [Number(p) + delta, d]))

// The cells actually written down: every column from the top digit (or the ones
// column, whichever is higher) down to the last digit that is not a trailing
// zero. Columns with no digit of their own get a placeholder zero.
function cellsFor(map) {
  const places = Object.keys(map).map(Number)
  let hi = Math.max(0, ...places)
  let lo = Math.min(0, ...places)
  while (lo < 0 && (map[lo] === undefined || map[lo] === '0')) lo += 1
  const out = []
  for (let p = hi; p >= lo; p -= 1) out.push({ p, ch: map[p] ?? '0', placeholder: map[p] === undefined })
  return out
}

const textOf = (cells) =>
  cells.map((c) => (c.p === -1 ? `.${c.ch}` : c.ch)).join('').replace(/^\./, '0.')

export function PlaceShift({ lang = 'en' }) {
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(0)
  const set = SETS[which]
  const dir = set.op === '×' ? 1 : -1

  const start = parseNumber(set.n)
  const now = shiftBy(start, dir * step)
  const cells = cellsFor(now)

  // Columns span every place the number visits, so nothing jumps out of frame.
  const endPlaces = cellsFor(shiftBy(start, dir * set.k)).map((c) => c.p)
  const startPlaces = cellsFor(start).map((c) => c.p)
  const hiP = Math.max(...startPlaces, ...endPlaces)
  const loP = Math.min(...startPlaces, ...endPlaces)
  const nCols = hiP - loP + 1
  const GAP = 20
  const CW = (960 - GAP) / nCols
  const X0 = 80
  const xOf = (p) => X0 + (hiP - p) * CW + (p < 0 ? GAP : 0)
  const pointX = X0 + (hiP + 1) * CW + GAP / 2
  const hasPoint = loP < 0

  const running =
    step === 0 ? set.n : `${set.n} ${set.op} 10${SUP[step]} = ${textOf(cells)}`

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          <text x="60" y="56" fontFamily={FONT} fontSize="34" fontWeight="bold" fill={INK} textAnchor="start">
            {set.n} {set.op} 10{SUP[set.k]}
          </text>
          <text x="1060" y="56" fontFamily={FONT} fontSize="24" fontWeight="bold" fill="#9aa5ae" textAnchor="end">
            {which + 1} / {SETS.length}
          </text>
          <text x="560" y="56" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={KEY} textAnchor="middle">
            {step === 0
              ? tr(lang, 'Ready', 'Sẵn sàng', 'Prêt')
              : tr(lang, `${step} of ${set.k} places ${dir > 0 ? 'left' : 'right'}`,
                        `${step} trên ${set.k} cột sang ${dir > 0 ? 'trái' : 'phải'}`,
                        `${step} sur ${set.k} rangs à ${dir > 0 ? 'gauche' : 'droite'}`)}
          </text>

          {/* Empty columns, so the class can see where a digit is heading. */}
          {Array.from({ length: nCols }, (_, i) => {
            const p = hiP - i
            return (
              <rect key={`c${p}`} x={xOf(p)} y="110" width={CW} height="130" rx="8"
                    fill={p < 0 ? '#fdf8f2' : '#f7f9fa'} stroke={RULE} strokeWidth="2" />
            )
          })}

          {hasPoint && <circle cx={pointX} cy="228" r="10" fill={INK} />}

          {cells.map((c) => (
            <g key={`${which}-${c.p}`}
               style={{ transform: `translate(${xOf(c.p)}px, 0px)`, transition: 'transform 600ms cubic-bezier(.4,0,.2,1)' }}>
              <text x={CW / 2} y="205" fontFamily={FONT} fontSize={Math.min(76, CW * 0.8)} fontWeight="bold"
                    fill={c.placeholder ? KEY : INK} textAnchor="middle">
                {c.ch}
              </text>
            </g>
          ))}

          <rect x="80" y="290" width="960" height="92" rx="16" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
          <text x="560" y="352" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={INK} textAnchor="middle">
            {running}
          </text>

          <text x="560" y="414" fontFamily={FONT} fontSize="24" fill={MUTED} textAnchor="middle">
            {tr(lang, 'An orange zero is holding a column open.',
                      'Số 0 màu cam giữ chỗ cho một cột.',
                      'Un zéro orange garde une colonne ouverte.')}
          </text>
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          {tr(lang, 'Back', 'Lùi', 'Retour')}
        </Btn>
        <Btn tone="orange" icon={Move} disabled={step === set.k} onClick={() => setStep((s) => Math.min(set.k, s + 1))}>
          {tr(lang, 'Move one place', 'Dịch một cột', 'Décale 1 rang')}
        </Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % SETS.length); setStep(0) }}>
          {tr(lang, 'Next number', 'Số khác', 'Suivant')}
        </Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 2 — WHICH WAY?
 * ============================================================= */
const CARDS = [
  { q: '4.7 × 10³', places: 3, left: true, a: '4700' },
  { q: '56 × 10²', places: 2, left: true, a: '5600' },
  { q: '9000 ÷ 10³', places: 3, left: false, a: '9' },
  { q: '0.8 × 10⁴', places: 4, left: true, a: '8000' },
  { q: '620000 ÷ 10⁴', places: 4, left: false, a: '62' },
  { q: '3.14 × 10²', places: 2, left: true, a: '314' },
  { q: '45 ÷ 10³', places: 3, left: false, a: '0.045' },
  { q: '7 × 10⁶', places: 6, left: true, a: '7000000' },
  { q: '850 ÷ 10²', places: 2, left: false, a: '8.5' },
  { q: '0.06 × 10³', places: 3, left: true, a: '60' },
  { q: '1200 ÷ 10⁵', places: 5, left: false, a: '0.012' },
  { q: '2.5 × 10⁵', places: 5, left: true, a: '250000' },
  { q: '30 ÷ 10⁴', places: 4, left: false, a: '0.003' },
  { q: '0.409 × 10⁴', places: 4, left: true, a: '4090' },
]

export function WhichWay({ lang = 'en', isDisplayMode = false }) {
  const [order, setOrder] = useState(() => CARDS.map((_, i) => i))
  const [pos, setPos] = useState(0)
  const [shown, setShown] = useState(false)

  const done = pos >= order.length
  const card = done ? null : CARDS[order[pos]]
  const big = isDisplayMode

  const advance = useCallback(() => {
    if (done) return
    if (!shown) { setShown(true); return }
    setShown(false)
    setPos((p) => p + 1)
  }, [done, shown])

  const deal = () => {
    const next = CARDS.map((_, i) => i)
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[next[i], next[j]] = [next[j], next[i]]
    }
    setOrder(next)
    setPos(0)
    setShown(false)
  }

  // A presenter clicker sends arrow keys: first press shows, second moves on.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); advance() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden select-none">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl text-white bg-[#c25e12] shrink-0">
            <Move className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {tr(lang, 'Which Way?', 'Đi hướng nào?', 'Quel sens ?')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Fingers: how many places. Hand: which way. Then press Show.',
                        'Ngón tay: mấy cột. Bàn tay: hướng nào. Rồi bấm Hiện.',
                        'Doigts : combien. Main : quel sens. Puis Voir.')}
            </div>
          </div>
        </div>
        {!done && (
          <div className={`font-black text-slate-400 dark:text-slate-500 tabular-nums shrink-0 ${big ? 'text-2xl' : 'text-base'}`}>
            {pos + 1} / {order.length}
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-[clamp(1rem,4vh,2.5rem)] p-4">
        {done ? (
          <>
            <div className="p-4 rounded-2xl bg-emerald-500 text-white"><Sparkles className="w-12 h-12" strokeWidth={2} /></div>
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>
              {tr(lang, 'All 14 done!', 'Xong cả 14!', 'Les 14 sont faits !')}
            </div>
          </>
        ) : (
          <>
            <div className={`font-black uppercase tracking-[0.2em] text-[#c25e12] ${big ? 'text-[clamp(1rem,2.2vh,1.6rem)]' : 'text-sm'}`}>
              {tr(lang, 'How many places, and which way?', 'Mấy cột, và về hướng nào?', 'Combien de rangs, quel sens ?')}
            </div>

            <div className={`rounded-3xl border-[6px] border-slate-300 bg-white flex items-center justify-center font-black text-[#2b2b2b] leading-none shadow-sm px-10 ${big ? 'h-[clamp(9rem,24vh,16rem)] text-[clamp(4rem,11vh,8rem)]' : 'h-[8rem] text-6xl'}`}>
              {card.q}
            </div>

            <div className="min-h-[clamp(6rem,19vh,12rem)] flex flex-col items-center justify-center gap-3">
              {shown ? (
                <>
                  <div className={`rounded-full text-white font-black px-8 py-2 ${card.left ? 'bg-[#c25e12]' : 'bg-[#0087a8]'} ${big ? 'text-[clamp(1.6rem,4vh,2.6rem)]' : 'text-2xl'}`}>
                    {tr(lang, `${card.places} places ${card.left ? 'left' : 'right'}`,
                              `${card.places} cột sang ${card.left ? 'trái' : 'phải'}`,
                              `${card.places} rangs à ${card.left ? 'gauche' : 'droite'}`)}
                  </div>
                  <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-[clamp(2.4rem,7vh,5rem)]' : 'text-4xl'}`}>
                    {card.a}
                  </div>
                </>
              ) : (
                <div className={`font-black text-slate-300 dark:text-slate-700 ${big ? 'text-8xl' : 'text-6xl'}`}>?</div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap px-4 pb-4 pt-2">
        <Btn tone="teal" icon={Shuffle} onClick={deal}>{tr(lang, 'Shuffle', 'Xáo trộn', 'Mélanger')}</Btn>
        {!done && (
          <Btn tone="orange" icon={shown ? ArrowRight : Eye} onClick={advance}>
            {shown ? tr(lang, 'Next', 'Tiếp', 'Suivant') : tr(lang, 'Show', 'Hiện', 'Voir')}
          </Btn>
        )}
        {done && (
          <Btn tone="slate" icon={RotateCcw} onClick={() => { setPos(0); setShown(false) }}>
            {tr(lang, 'Start again', 'Làm lại', 'Rejouer')}
          </Btn>
        )}
      </div>
    </div>
  )
}
