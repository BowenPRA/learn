// content/y7-math/U02_6/widgets.jsx
// Widgets for 2.6 Inequalities. Two, and each does one thing a still slide
// cannot:
//
//   ShowIt        An inequality drawn on a number line, one part per press:
//                 the number, the open circle, the arrow, then the integers
//                 that work lit up green with the smallest (or largest) one
//                 named. The class says each part BEFORE it is pressed. Two
//                 sets, one per slide: ShowOne (positive numbers) and ShowTwo
//                 (negative numbers and one decimal — where "less than" going
//                 LEFT is the whole difficulty).
//
//   CouldItBe     A full-slide `game`: an inequality and a number. Thumbs up
//                 if the letter could be that number, down if not. Show gives
//                 the verdict and the reason in one short sentence. A
//                 clicker's Right arrow shows, then moves on.
//
// A showcase slide hands a widget no isDisplayMode, so ShowIt draws its stage
// as ONE SVG (text scales with the panel) and keeps only the buttons as HTML.
// Every SVG opens with a white plate.
import { useState, useEffect, useCallback } from 'react'
import { Undo2, RotateCcw, ArrowRight, Eye, Shuffle, Sparkles, ThumbsUp, SkipForward } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const GREEN = '#4a8b23'
const MUTED = '#5b6770'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MINUS = '−'

const num = (v) => (v < 0 ? `${MINUS}${-v}` : `${v}`)

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
 * WIDGET 1 — SHOW IT ON A NUMBER LINE
 * ============================================================= */
// `op` is '>' or '<'; `n` is the number (a decimal is allowed: its circle sits
// between two ticks). The line shows ten intervals around n.
const SETS = {
  one: [
    { L: 'x', op: '>', n: 3 },
    { L: 'x', op: '<', n: 5 },
    { L: 'y', op: '>', n: 0 },
    { L: 'm', op: '<', n: 8 },
  ],
  two: [
    { L: 't', op: '<', n: -2 },
    { L: 'x', op: '>', n: -4 },
    { L: 'y', op: '<', n: 0 },
    { L: 'p', op: '>', n: 2.5 },
  ],
}

const LINE_Y = 250
const X0 = 110
const X1 = 1010

function ShowIt({ lang = 'en', set }) {
  const list = SETS[set]
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(0)
  const p = list[which]
  const greater = p.op === '>'
  const lo = Math.floor(p.n) - 4
  const hi = lo + 10
  const xof = (v) => X0 + ((v - lo) * (X1 - X0)) / (hi - lo)
  const ticks = []
  for (let v = lo; v <= hi; v++) ticks.push(v)

  // The integers that work, in reading order away from the circle.
  const works = ticks.filter((v) => (greater ? v > p.n : v < p.n))
  const edge = greater ? Math.floor(p.n) + 1 : Math.ceil(p.n) - 1
  const list3 = greater
    ? [edge, edge + 1, edge + 2].map(num).join(', ') + ', …'
    : [edge, edge - 1, edge - 2].map(num).join(', ') + ', …'
  const nText = num(p.n)
  const last = 3

  const cx = xof(p.n)
  const cy = LINE_Y - 46
  const opText = greater ? '>' : '<'

  let line
  if (step === 0) {
    line = (
      <text x="560" y="400" fontFamily={FONT} fontSize="36" fill="#9aa5ae" textAnchor="middle">
        {tr(lang, `Where is ${nText}? Is ${nText} included?`, `${nText} ở đâu? ${nText} có được tính không?`, 'Où est ' + nText + ' ? ' + nText + ' est-il inclus ?')}
      </text>
    )
  } else if (step === 1) {
    line = (
      <text x="560" y="400" fontFamily={FONT} fontSize="40" fontWeight="bold" fill={KEY} textAnchor="middle">
        {tr(lang, `Open circle: ${nText} is not included.`, `Vòng tròn rỗng: không tính ${nText}.`, 'Cercle vide : ' + nText + ' n’est pas inclus.')}
      </text>
    )
  } else if (step === 2) {
    line = (
      <text x="560" y="400" fontFamily={FONT} fontSize="40" fontWeight="bold" fill={KEY} textAnchor="middle">
        {greater
          ? tr(lang, 'Greater than: the arrow goes right.', 'Lớn hơn: mũi tên sang phải.', 'Plus grand : flèche à droite.')
          : tr(lang, 'Less than: the arrow goes left.', 'Nhỏ hơn: mũi tên sang trái.', 'Plus petit : flèche à gauche.')}
      </text>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="u26-w-arr" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill={KEY} />
            </marker>
          </defs>
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          <text x="560" y="86" fontFamily={FONT} fontSize="64" fontWeight="bold" fill={INK} textAnchor="middle">
            {p.L} {opText} {nText}
          </text>
          <text x="1096" y="52" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#9aa5ae" textAnchor="end">{which + 1} / {list.length}</text>

          {/* the number line */}
          <path d={`M ${X0 - 30} ${LINE_Y} H ${X1 + 30}`} fill="none" stroke={INK} strokeWidth="4" />
          {ticks.map((v) => (
            <g key={v}>
              <path d={`M ${xof(v)} ${LINE_Y - 14} V ${LINE_Y + 14}`} fill="none" stroke={INK} strokeWidth="4" />
              <text x={xof(v)} y={LINE_Y + 56} fontFamily={FONT} fontSize="36" fill={INK} textAnchor="middle">{num(v)}</text>
            </g>
          ))}

          {/* the integers that work */}
          {step >= 3 && works.map((v) => <circle key={`d${v}`} cx={xof(v)} cy={LINE_Y} r="13" fill={GREEN} />)}

          {/* the arrow, then the open circle on top of it */}
          {step >= 2 && (
            <path d={greater ? `M ${cx + 18} ${cy} H ${X1 + 26}` : `M ${cx - 18} ${cy} H ${X0 - 26}`}
              fill="none" stroke={KEY} strokeWidth="7" markerEnd="url(#u26-w-arr)" />
          )}
          {step >= 1 && (
            <g>
              <path d={`M ${cx} ${cy + 17} V ${LINE_Y - 8}`} fill="none" stroke={KEY} strokeWidth="3" strokeDasharray="6 6" />
              <circle cx={cx} cy={cy} r="17" fill="#ffffff" stroke={KEY} strokeWidth="6" />
            </g>
          )}

          {step < last && line}
          {step === last && (
            <g>
              <rect x="110" y="344" width="900" height="84" rx="16" fill="#eef6e6" stroke={GREEN} strokeWidth="3" />
              <text x="560" y="400" fontFamily={FONT} fontSize="38" fontWeight="bold" fill={GREEN} textAnchor="middle">
                {greater ? tr(lang, 'Smallest integer: ', 'Số nguyên nhỏ nhất: ', 'Plus petit entier : ') : tr(lang, 'Largest integer: ', 'Số nguyên lớn nhất: ', 'Plus grand entier : ')}
                {num(edge)}
                <tspan dx="30" fill={MUTED} fontSize="32">{list3}</tspan>
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>{tr(lang, 'Back', 'Lùi', 'Retour')}</Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={step === last} onClick={() => setStep((s) => Math.min(last, s + 1))}>{step === 2 ? tr(lang, 'Integers', 'Số nguyên', 'Entiers') : tr(lang, 'Next step', 'Bước tiếp', 'Suivant')}</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % list.length); setStep(0) }}>{tr(lang, 'Next question', 'Câu tiếp', 'Autre question')}</Btn>
      </div>
    </div>
  )
}

export function ShowOne({ lang }) { return <ShowIt lang={lang} set="one" /> }
export function ShowTwo({ lang }) { return <ShowIt lang={lang} set="two" /> }

/* ============================================================= *
 * WIDGET 2 — COULD IT BE?
 * ============================================================= */
const CARDS = [
  { q: 'x > 4', v: 'x = 6', ok: true, why: '6 > 4' },
  { q: 'x > 4', v: 'x = 4', ok: false, why: '4 is not greater than 4', whyVn: '4 không lớn hơn 4', whyFr: '4 n’est pas plus grand que 4' },
  { q: 'x < 10', v: 'x = 9', ok: true, why: '9 < 10' },
  { q: 'x < 10', v: 'x = 11', ok: false, why: '11 > 10' },
  { q: 'y > −2', v: 'y = 0', ok: true, why: '0 > −2' },
  { q: 'y > −2', v: 'y = −3', ok: false, why: '−3 < −2' },
  { q: 't < −5', v: 't = −6', ok: true, why: '−6 < −5' },
  { q: 't < −5', v: 't = −4', ok: false, why: '−4 > −5' },
  { q: 'm < 0', v: 'm = −1', ok: true, why: '−1 < 0' },
  { q: 'm < 0', v: 'm = 0', ok: false, why: '0 is not less than 0', whyVn: '0 không nhỏ hơn 0', whyFr: '0 n’est pas plus petit que 0' },
  { q: 'p > 2.5', v: 'p = 3', ok: true, why: '3 > 2.5' },
  { q: 'p > 2.5', v: 'p = 2', ok: false, why: '2 < 2.5' },
  { q: 'k > −10', v: 'k = −9', ok: true, why: '−9 > −10' },
  { q: 'k < 1', v: 'k = −100', ok: true, why: '−100 < 1' },
  { q: 'n > 7', v: 'n = 70', ok: true, why: '70 > 7' },
  { q: 'q < −1', v: 'q = 1', ok: false, why: '1 > −1' },
]

function Tile({ text, verdict, big }) {
  const border = verdict === true ? 'border-[#4a8b23]' : verdict === false ? 'border-[#c8102e]' : 'border-slate-300'
  return (
    <div className={`rounded-3xl border-[6px] bg-white flex items-center justify-center font-black leading-none shadow-sm text-[#2b2b2b] px-8 whitespace-nowrap ${border} ${big ? 'min-w-[clamp(12rem,26vh,20rem)] h-[clamp(9rem,22vh,15rem)] text-[clamp(3.5rem,9vh,6.5rem)]' : 'min-w-[10rem] h-[8rem] text-6xl'}`}>
      {text}
    </div>
  )
}

export function CouldItBe({ lang = 'en', isDisplayMode = false }) {
  const [order, setOrder] = useState(() => CARDS.map((_, i) => i))
  const [pos, setPos] = useState(0)
  const [shown, setShown] = useState(false)

  const done = pos >= order.length
  const card = done ? null : CARDS[order[pos]]
  const big = isDisplayMode
  const letter = card ? card.q[0] : ''

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
              {tr(lang, 'Could It Be?', 'Có thể không?', 'Est-ce possible ?')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Thumbs up: it could. Thumbs down: it could not. Then press Show.', 'Ngón cái lên: có thể. Ngón cái xuống: không thể. Rồi bấm Hiện.', 'Pouce en haut : oui. Pouce en bas : non. Puis clique sur Montrer.')}
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
              {tr(lang, `Could ${letter} be this number?`, `${letter} có thể là số này không?`, letter + ' peut-il valoir ce nombre ?')}
            </div>

            <div className="flex items-center justify-center gap-[clamp(0.75rem,2.5vw,2.5rem)] flex-wrap">
              <Tile text={card.q} verdict={null} big={big} />
              <div className={`font-black text-slate-400 ${big ? 'text-[clamp(2rem,5vh,3.5rem)]' : 'text-3xl'}`}>?</div>
              <Tile text={card.v} verdict={shown ? card.ok : null} big={big} />
            </div>

            <div className="min-h-[clamp(6rem,17vh,11rem)] flex flex-col items-center justify-center gap-3">
              {shown ? (
                <>
                  <div className={`rounded-full text-white font-black px-8 py-2 ${card.ok ? 'bg-[#4a8b23]' : 'bg-[#c8102e]'} ${big ? 'text-[clamp(1.6rem,4vh,2.6rem)]' : 'text-2xl'}`}>
                    {card.ok ? tr(lang, '✓ Yes, it could', '✓ Có thể', '✓ Oui, c’est possible') : tr(lang, '✗ No', '✗ Không thể', '✗ Non')}
                  </div>
                  <div className={`font-bold text-slate-600 dark:text-slate-300 ${big ? 'text-[clamp(1.2rem,2.8vh,2rem)]' : 'text-lg'}`}>
                    {tr(lang, card.why, card.whyVn, card.whyFr)}
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
