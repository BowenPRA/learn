// content/y7-math/U02_5/widgets.jsx
// Widgets for 2.5 Constructing and Solving Equations. Two, and each does one
// thing a still slide cannot:
//
//   Reverse       The book's flow chart, one box per press. Forward first: what
//                 happens to the letter, box by box. Then backwards from the
//                 right: each press drops the inverse operation into a reverse
//                 box and the new number beside it, with the working line
//                 underneath. The last press checks the answer by putting it
//                 back in. The class says each box BEFORE it is pressed. Two
//                 sets, one per slide: ReverseOne (one step) and ReverseTwo
//                 (two steps — where undoing the last step first matters).
//
//   CheckIt       A full-slide `game`: an equation is shown already solved.
//                 Thumbs up if the answer is right, down if it is wrong. Show
//                 gives the verdict and the check — the answer put back in. A
//                 clicker's Right arrow shows, then moves on.
//
// A showcase slide hands a widget no isDisplayMode, so Reverse draws its stage
// as ONE SVG (text scales with the panel) and keeps only the buttons as HTML.
// Every SVG opens with a white plate.
import { useState, useEffect, useCallback } from 'react'
import { Undo2, RotateCcw, ArrowRight, Eye, Shuffle, Sparkles, ThumbsUp, SkipForward } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const MUTED = '#5b6770'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MINUS = '−'

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
 * WIDGET 1 — REVERSE THE FLOW CHART
 * ============================================================= */
// `ops` is what happens to the letter, in order, as [sign, number]; `r` is the
// number on the right of the = sign. A × always comes first, so the letter
// prints as 2a, never a × 2.
const SETS = {
  one: [
    { L: 'x', ops: [[MINUS, 4]], r: 6 },
    { L: 'x', ops: [['+', 9]], r: 15 },
    { L: 'y', ops: [['×', 3]], r: 21 },
    { L: 'm', ops: [[MINUS, 15]], r: 12 },
  ],
  two: [
    { L: 'a', ops: [['×', 2], ['+', 4]], r: 18 },
    { L: 'b', ops: [['×', 3], [MINUS, 5]], r: 25 },
    { L: 'c', ops: [['×', 5], ['+', 2]], r: 32 },
    { L: 'd', ops: [['×', 4], [MINUS, 7]], r: 25 },
  ],
}

const INVERSE = { '+': MINUS, [MINUS]: '+', '×': '÷', '÷': '×' }
const apply = (sign, v, n) => (sign === '+' ? v + n : sign === MINUS ? v - n : sign === '×' ? v * n : v / n)
const num = (v) => (v < 0 ? `${MINUS}${-v}` : `${v}`)

// The expression after each operation: a, 2a, 2a + 4.
function exprs(p) {
  const out = [p.L]
  p.ops.forEach(([s, n]) => {
    const prev = out[out.length - 1]
    out.push(s === '×' ? `${n}${prev}` : `${prev} ${s} ${n}`)
  })
  return out
}

// The same chain with a number put in for the letter: 2 × 7 + 4.
function substituted(p, value) {
  let s = num(value)
  p.ops.forEach(([sign, n]) => { s = sign === '×' ? `${n} × ${s}` : `${s} ${sign} ${n}` })
  return s
}

// values[k] is the number at position k of the chain, worked backwards from r.
function values(p) {
  const v = new Array(p.ops.length + 1)
  v[p.ops.length] = p.r
  for (let k = p.ops.length; k >= 1; k--) {
    const [s, n] = p.ops[k - 1]
    v[k - 1] = apply(INVERSE[s], v[k], n)
  }
  return v
}

const NODE_W = 130
const BOX_W = 190
const GAP = 16
const BOX_H = 84
const TOP_Y = 132
const BOT_Y = 240

function Reverse({ lang = 'en', set }) {
  const list = SETS[set]
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(0)
  const p = list[which]
  const n = p.ops.length
  const ex = exprs(p)
  const vals = values(p)
  const last = 2 * n + 1

  // Press 1..n builds the forward row; press n+1..2n fills the reverse row from
  // the right; press 2n+1 is the check.
  const fwdShown = Math.min(step, n)
  const backShown = Math.max(0, Math.min(step - n, n))
  const checked = step === last

  const total = (n + 1) * NODE_W + n * BOX_W + 2 * n * GAP
  const x0 = 560 - total / 2
  const nodeX = (k) => x0 + k * (NODE_W + BOX_W + 2 * GAP) + NODE_W / 2
  const boxX = (k) => x0 + NODE_W + GAP + (k - 1) * (NODE_W + BOX_W + 2 * GAP)

  const equation = `${ex[n]} = ${p.r}`
  // The reverse box just filled, counted from the left (1..n).
  const activeBack = step > n && step <= 2 * n ? n - (step - n) + 1 : 0
  const activeFwd = step >= 1 && step <= n ? step : 0

  let line = null
  if (step === 0) {
    line = (
      <text x="560" y="392" fontFamily={FONT} fontSize="34" fill="#9aa5ae" textAnchor="middle">
        {n === 1 ? tr(lang, `What happens to ${p.L}?`, `Điều gì xảy ra với ${p.L}?`, 'Que devient ' + p.L + ' ?') : tr(lang, `What happens to ${p.L} first?`, `Điều gì xảy ra với ${p.L} trước tiên?`, 'Que devient ' + p.L + ' en premier ?')}
      </text>
    )
  } else if (step === n) {
    line = (
      <text x="560" y="392" fontFamily={FONT} fontSize="34" fill="#9aa5ae" textAnchor="middle">
        {tr(lang, 'Now undo it, starting from the right.', 'Giờ làm ngược lại, bắt đầu từ bên phải.', 'Maintenant, annule depuis la droite.')}
      </text>
    )
  } else if (activeBack) {
    const [s, k] = p.ops[activeBack - 1]
    line = (
      <text x="560" y="394" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={KEY} textAnchor="middle">
        {num(vals[activeBack])} {INVERSE[s]} {k} = {num(vals[activeBack - 1])}
      </text>
    )
  } else if (step > 0 && step < n) {
    line = (
      <text x="560" y="392" fontFamily={FONT} fontSize="34" fill="#9aa5ae" textAnchor="middle">
        {tr(lang, 'What happens next?', 'Tiếp theo là gì?', 'Et ensuite ?')}
      </text>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          <text x="560" y="84" fontFamily={FONT} fontSize="56" fontWeight="bold" fill={INK} textAnchor="middle">
            {tr(lang, 'Solve ', 'Giải ', 'Résous ')}
            <tspan fill={KEY}>{equation}</tspan>
          </text>
          <text x="1096" y="52" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#9aa5ae" textAnchor="end">{which + 1} / {list.length}</text>

          {/* forward row: the letter, each operation, and what it has become */}
          {ex.map((e, k) => {
            const open = k === 0 || k === n || k <= fwdShown
            const text = k === n ? `${p.r}` : e
            return (
              <text key={`fn${k}`} x={nodeX(k)} y={TOP_Y + 60} fontFamily={FONT} fontSize={k > 0 && k < n ? 46 : 60} fontWeight="bold"
                fill={!open ? '#c3cbd2' : k === 0 ? TEAL : k < n ? MUTED : INK} textAnchor="middle">
                {open ? text : '?'}
              </text>
            )
          })}
          {p.ops.map(([s, k], i) => {
            const idx = i + 1
            const open = idx <= fwdShown
            const hot = activeFwd === idx
            const x = boxX(idx)
            return (
              <g key={`fb${i}`}>
                <path d={`M ${x} ${TOP_Y} H ${x + BOX_W - 28} L ${x + BOX_W} ${TOP_Y + BOX_H / 2} L ${x + BOX_W - 28} ${TOP_Y + BOX_H} H ${x} Z`}
                  fill={open ? (hot ? '#fdf1e3' : '#f2ecf7') : '#f8fafc'} stroke={open ? (hot ? KEY : PURPLE) : '#c3cbd2'} strokeWidth={hot ? 5 : 3}
                  strokeDasharray={open ? undefined : '10 8'} strokeLinejoin="round" />
                <text x={x + (BOX_W - 28) / 2 + 6} y={TOP_Y + 58} fontFamily={FONT} fontSize="46" fontWeight="bold" fill={open ? PURPLE : '#c3cbd2'} textAnchor="middle">
                  {open ? `${s} ${k}` : '?'}
                </text>
              </g>
            )
          })}

          {/* reverse row: filled from the right, one box and one number per press */}
          {vals.map((v, k) => {
            const open = k === n ? backShown >= 1 : n - k <= backShown
            if (!open) return null
            const isAnswer = k === 0
            return (
              <text key={`bn${k}`} x={nodeX(k)} y={BOT_Y + 60} fontFamily={FONT} fontSize={isAnswer ? 64 : 56} fontWeight="bold"
                fill={isAnswer ? KEY : INK} textAnchor="middle">
                {num(v)}
              </text>
            )
          })}
          {p.ops.map(([s, k], i) => {
            const idx = i + 1
            const open = n - idx + 1 <= backShown
            const hot = activeBack === idx
            const x = boxX(idx)
            return (
              <g key={`bb${i}`}>
                <path d={`M ${x + 28} ${BOT_Y} H ${x + BOX_W} V ${BOT_Y + BOX_H} H ${x + 28} L ${x} ${BOT_Y + BOX_H / 2} Z`}
                  fill={open ? '#fdf1e3' : '#f8fafc'} stroke={open ? KEY : '#c3cbd2'} strokeWidth={hot ? 5 : 3}
                  strokeDasharray={open ? undefined : '10 8'} strokeLinejoin="round" />
                <text x={x + 28 + (BOX_W - 28) / 2 - 6} y={BOT_Y + 58} fontFamily={FONT} fontSize="46" fontWeight="bold" fill={open ? KEY : '#c3cbd2'} textAnchor="middle">
                  {open ? `${INVERSE[s]} ${k}` : '?'}
                </text>
              </g>
            )
          })}

          {/* the working line, then the answer and its check */}
          {!checked && line}
          {checked && (
            <g>
              <rect x="110" y="340" width="900" height="88" rx="16" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
              <text x="560" y="398" fontFamily={FONT} fontSize="44" fontWeight="bold" fill={KEY} textAnchor="middle">
                {p.L} = {num(vals[0])}
                <tspan dx="36" fill={INK} fontSize="36">{tr(lang, 'Check: ', 'Thử lại: ', 'Vérifie : ')}{substituted(p, vals[0])} = {p.r}</tspan>
                <tspan dx="14" fill={GREEN}>✓</tspan>
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>{tr(lang, 'Back', 'Lùi', 'Retour')}</Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={checked} onClick={() => setStep((s) => Math.min(last, s + 1))}>{step === 2 * n ? tr(lang, 'Check', 'Thử lại', 'Vérifier') : tr(lang, 'Next box', 'Ô tiếp', 'Suivant')}</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % list.length); setStep(0) }}>{tr(lang, 'Next question', 'Câu tiếp', 'Autre question')}</Btn>
      </div>
    </div>
  )
}

export function ReverseOne({ lang }) { return <Reverse lang={lang} set="one" /> }
export function ReverseTwo({ lang }) { return <Reverse lang={lang} set="two" /> }

/* ============================================================= *
 * WIDGET 2 — CHECK IT!
 * ============================================================= */
const CARDS = [
  { eq: 'x + 9 = 15', ans: 'x = 6', ok: true, check: '6 + 9 = 15' },
  { eq: 'x − 3 = 8', ans: 'x = 5', ok: false, fix: 'x = 11', check: '5 − 3 = 2, not 8', checkVn: '5 − 3 = 2, không phải 8', checkFr: '5 − 3 = 2, pas 8' },
  { eq: '4x = 28', ans: 'x = 7', ok: true, check: '4 × 7 = 28' },
  { eq: 'x + 12 = 20', ans: 'x = 32', ok: false, fix: 'x = 8', check: '32 + 12 = 44, not 20', checkVn: '32 + 12 = 44, không phải 20', checkFr: '32 + 12 = 44, pas 20' },
  { eq: '15 = x + 6', ans: 'x = 9', ok: true, check: '9 + 6 = 15' },
  { eq: '6x = 42', ans: 'x = 36', ok: false, fix: 'x = 7', check: '6 × 36 = 216, not 42', checkVn: '6 × 36 = 216, không phải 42', checkFr: '6 × 36 = 216, pas 42' },
  { eq: 'x − 7 = 13', ans: 'x = 20', ok: true, check: '20 − 7 = 13' },
  { eq: '30 = 5x', ans: 'x = 6', ok: true, check: '5 × 6 = 30' },
  { eq: 'x + 4 = 11', ans: 'x = 7', ok: true, check: '7 + 4 = 11' },
  { eq: 'x − 10 = 5', ans: 'x = −5', ok: false, fix: 'x = 15', check: '−5 − 10 = −15, not 5', checkVn: '−5 − 10 = −15, không phải 5', checkFr: '−5 − 10 = −15, pas 5' },
  { eq: '9x = 54', ans: 'x = 6', ok: true, check: '9 × 6 = 54' },
  { eq: '25 = x − 5', ans: 'x = 20', ok: false, fix: 'x = 30', check: '20 − 5 = 15, not 25', checkVn: '20 − 5 = 15, không phải 25', checkFr: '20 − 5 = 15, pas 25' },
  { eq: 'x + 8 = 8', ans: 'x = 0', ok: true, check: '0 + 8 = 8' },
  { eq: '2x = 30', ans: 'x = 28', ok: false, fix: 'x = 15', check: '2 × 28 = 56, not 30', checkVn: '2 × 28 = 56, không phải 30', checkFr: '2 × 28 = 56, pas 30' },
  { eq: 'x − 6 = 0', ans: 'x = 6', ok: true, check: '6 − 6 = 0' },
  { eq: '7x = 7', ans: 'x = 0', ok: false, fix: 'x = 1', check: '7 × 0 = 0, not 7', checkVn: '7 × 0 = 0, không phải 7', checkFr: '7 × 0 = 0, pas 7' },
]

function Tile({ text, verdict, big }) {
  const border = verdict === true ? 'border-[#4a8b23]' : verdict === false ? 'border-[#c8102e]' : 'border-slate-300'
  return (
    <div className={`rounded-3xl border-[6px] bg-white flex items-center justify-center font-black leading-none shadow-sm text-[#2b2b2b] px-8 whitespace-nowrap ${border} ${big ? 'min-w-[clamp(12rem,26vh,20rem)] h-[clamp(9rem,22vh,15rem)] text-[clamp(3.5rem,9vh,6.5rem)]' : 'min-w-[10rem] h-[8rem] text-6xl'}`}>
      {text}
    </div>
  )
}

export function CheckIt({ lang = 'en', isDisplayMode = false }) {
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
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl text-white bg-[#c25e12] shrink-0">
            <ThumbsUp className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {tr(lang, 'Check It!', 'Thử lại nào!', 'Vérifie !')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Put the answer back in. Thumbs up: right. Thumbs down: wrong. Then press Show.', 'Thay đáp án vào lại. Ngón cái lên: đúng. Ngón cái xuống: sai. Rồi bấm Hiện.', 'Remplace la réponse. Pouce en haut : juste. En bas : faux. Puis clique sur Montrer.')}
            </div>
          </div>
        </div>
        {!done && (
          <div className={`font-black text-slate-400 dark:text-slate-500 tabular-nums shrink-0 ${big ? 'text-2xl' : 'text-base'}`}>
            {pos + 1} / {order.length}
          </div>
        )}
      </div>

      {/* Card */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-[clamp(0.75rem,3vh,2rem)] p-4">
        {done ? (
          <>
            <div className="p-4 rounded-2xl bg-emerald-500 text-white"><Sparkles className="w-12 h-12" strokeWidth={2} /></div>
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>{tr(lang, 'All 16 done!', 'Xong cả 16!', 'Les 16 sont finies !')}</div>
          </>
        ) : (
          <>
            <div className={`font-black uppercase tracking-[0.2em] text-[#c25e12] ${big ? 'text-[clamp(1rem,2.2vh,1.6rem)]' : 'text-sm'}`}>
              {tr(lang, 'Is this answer right?', 'Đáp án này đúng không?', 'Cette réponse est-elle juste ?')}
            </div>

            <div className="flex items-center justify-center gap-[clamp(0.75rem,2.5vw,2.5rem)] flex-wrap">
              <Tile text={card.eq} verdict={null} big={big} />
              <div className={`font-black text-slate-400 ${big ? 'text-[clamp(2rem,5vh,3.5rem)]' : 'text-3xl'}`}>{tr(lang, 'so', 'nên', 'donc')}</div>
              <Tile text={card.ans} verdict={shown ? card.ok : null} big={big} />
            </div>

            <div className="min-h-[clamp(6rem,17vh,11rem)] flex flex-col items-center justify-center gap-3">
              {shown ? (
                <>
                  <div className={`rounded-full text-white font-black px-8 py-2 ${card.ok ? 'bg-[#4a8b23]' : 'bg-[#c8102e]'} ${big ? 'text-[clamp(1.6rem,4vh,2.6rem)]' : 'text-2xl'}`}>
                    {card.ok
                      ? tr(lang, '✓ Right', '✓ Đúng', '✓ Juste')
                      : tr(lang, `✗ Wrong — it is ${card.fix}`, `✗ Sai — phải là ${card.fix}`, `✗ Faux — c’est ${card.fix}`)}
                  </div>
                  <div className={`font-bold text-slate-600 dark:text-slate-300 ${big ? 'text-[clamp(1.2rem,2.8vh,2rem)]' : 'text-lg'}`}>
                    {tr(lang, 'Check: ', 'Thử lại: ', 'Vérifie : ')}{tr(lang, card.check, card.checkVn, card.checkFr)}
                  </div>
                </>
              ) : (
                <div className={`font-black text-slate-300 dark:text-slate-700 ${big ? 'text-8xl' : 'text-6xl'}`}>?</div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap px-4 pb-4 pt-2">
        <Btn tone="teal" icon={Shuffle} onClick={deal}>{tr(lang, 'Shuffle', 'Xáo trộn', 'Mélanger')}</Btn>
        {!done && (
          <Btn tone="orange" icon={shown ? ArrowRight : Eye} onClick={advance}>
            {shown ? tr(lang, 'Next', 'Tiếp', 'Suivant') : tr(lang, 'Show', 'Hiện', 'Montrer')}
          </Btn>
        )}
        {done && (
          <Btn tone="slate" icon={RotateCcw} onClick={() => { setPos(0); setShown(false) }}>{tr(lang, 'Start again', 'Làm lại', 'Recommencer')}</Btn>
        )}
      </div>
    </div>
  )
}
