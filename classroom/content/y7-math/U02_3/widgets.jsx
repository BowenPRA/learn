// content/y7-math/U02_3/widgets.jsx
// Widgets for 2.3 Collecting Like Terms. Three, and each does one thing a still
// slide cannot:
//
//   Collect       The method as a teacher-paced stepper: FIND the like terms
//                 (each kind takes its colour), MOVE them together (the tiles
//                 slide, and each sign travels with its term), COLLECT (the
//                 groups add up to the simplest form). Two sets, one per slide:
//                 CollectAdd (only + signs) and CollectSigns (− signs and
//                 numbers). The class says each step before it is pressed.
//
//   Pyramid       The workbook's algebraic pyramid, one block per press. The
//                 two blocks being used light up orange, and the working line
//                 is written underneath. The third pyramid is worked backwards.
//
//   LikeOrNot     A full-slide `game`: two terms appear, everyone shows thumbs
//                 up (like terms) or down (not), Show gives the verdict and the
//                 reason. A clicker's Right arrow shows, then moves on.
//
// The first two draw their stage as ONE SVG (text scales with the panel) and
// keep only the buttons as HTML, so they need no isDisplayMode — the deck now
// passes it to every widget, but an SVG stage scales without it. Every SVG opens with a white plate.
import { useState, useEffect, useCallback } from 'react'
import { Undo2, RotateCcw, ArrowRight, Eye, Shuffle, Sparkles, ThumbsUp, SkipForward } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const MINUS = '−'

// One colour per kind of term — the same as diagrams.js.
const KINDS = [
  { stroke: '#0087a8', fill: '#e2f2f6' },
  { stroke: '#5c2483', fill: '#f2ecf7' },
  { stroke: '#4a8b23', fill: '#eef6e6' },
]
const NUMBER_KIND = { stroke: '#5b6770', fill: '#eef1f4' }
const PLAIN = { stroke: '#8a979e', fill: '#ffffff' }

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
 * WIDGET 1 — FIND, MOVE, COLLECT
 * ============================================================= */
const T = (c, v = '') => ({ c, v })
const SETS = {
  add: [
    [T(2, 'b'), T(3, 'b')],
    [T(4, 'x'), T(1, 'x'), T(2, 'x')],
    [T(3, 'a'), T(2, 'b'), T(4, 'a'), T(1, 'b')],
    [T(5, 'm'), T(2, 'n'), T(1, 'm'), T(4, 'n')],
  ],
  signs: [
    [T(7, 'x'), T(5, 'y'), T(-3, 'x'), T(1, 'y')],
    [T(8, 'a'), T(-3, 'b'), T(2, 'a'), T(-1, 'b')],
    [T(6), T(5, 't'), T(-1), T(-2, 't')],
    [T(9, 'p'), T(-4, 'q'), T(-5, 'p'), T(7, 'q'), T(2)],
  ],
}

const bodyOf = (c, v) => (v && Math.abs(c) === 1 ? v : `${Math.abs(c)}${v}`)
// The first term shows only a minus; every later term shows its own sign.
const termText = (c, v, first) =>
  first ? `${c < 0 ? MINUS : ''}${bodyOf(c, v)}` : `${c < 0 ? MINUS : '+'} ${bodyOf(c, v)}`

// Letters in the order they first appear, then the numbers.
function kindOrder(terms) {
  const out = []
  terms.forEach((t) => { if (t.v && !out.includes(t.v)) out.push(t.v) })
  if (terms.some((t) => !t.v)) out.push('')
  return out
}
const kindColour = (kinds, v) => (v === '' ? NUMBER_KIND : KINDS[kinds.indexOf(v) % KINDS.length])

const TILE_Y = 96
const TILE_H = 118
const GAP = 18
const textWidth = (s) => [...s].reduce((w, ch) => w + (ch === ' ' ? 19 : 41), 0)

function layout(terms, order) {
  const widths = order.map((i, pos) => textWidth(termText(terms[i].c, terms[i].v, pos === 0)) + 52)
  const total = widths.reduce((a, b) => a + b, 0) + GAP * (order.length - 1)
  let x = 560 - total / 2
  const pos = {}
  order.forEach((i, k) => {
    pos[i] = { x, w: widths[k], first: k === 0 }
    x += widths[k] + GAP
  })
  return pos
}

function Collect({ lang = 'en', set }) {
  const list = SETS[set]
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(0) // 0 expression · 1 find · 2 move · 3 collect
  const terms = list[which]
  const kinds = kindOrder(terms)

  const original = terms.map((_, i) => i)
  const sorted = [...original].sort((a, b) => kinds.indexOf(terms[a].v) - kinds.indexOf(terms[b].v) || a - b)
  const pos = layout(terms, step >= 2 ? sorted : original)

  const groups = kinds.map((v, k) => {
    const members = sorted.filter((i) => terms[i].v === v)
    const c = members.reduce((s, i) => s + terms[i].c, 0)
    const left = Math.min(...members.map((i) => pos[i].x))
    const right = Math.max(...members.map((i) => pos[i].x + pos[i].w))
    return { v, c, left, right, text: termText(c, v, k === 0) }
  })
  const answer = groups.map((g) => g.text).join(' ')

  const pills = [tr(lang, '1 Find', '1 Tìm', '1 Trouve'), tr(lang, '2 Move', '2 Chuyển', '2 Bouge'), tr(lang, '3 Collect', '3 Gộp', '3 Réduis')]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          {pills.map((label, k) => {
            const n = k + 1
            const on = step === n
            const done = step > n
            return (
              <g key={label}>
                <rect x={320 + k * 170} y="18" width="150" height="50" rx="25" fill={on ? KEY : '#ffffff'} stroke={on || done ? KEY : '#c3cbd2'} strokeWidth="3" />
                <text x={395 + k * 170} y="52" fontFamily={FONT} fontSize="24" fontWeight="bold" fill={on ? '#ffffff' : done ? KEY : '#9aa5ae'} textAnchor="middle">{label}</text>
              </g>
            )
          })}
          <text x="1096" y="52" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#9aa5ae" textAnchor="end">{which + 1} / {list.length}</text>

          {terms.map((t, i) => {
            const p = pos[i]
            const col = step >= 1 ? kindColour(kinds, t.v) : PLAIN
            return (
              <g key={`${which}-${i}`} style={{ transform: `translate(${p.x}px, ${TILE_Y}px)`, transition: 'transform 700ms cubic-bezier(.4,0,.2,1)' }}>
                <rect x="0" y="0" width={p.w} height={TILE_H} rx="16" fill={col.fill} stroke={col.stroke} strokeWidth={step >= 1 ? 4 : 2.5} style={{ transition: 'width 700ms' }} />
                <text x={p.w / 2} y="84" fontFamily={FONT} fontSize="68" fontWeight="bold" fill={step >= 1 ? col.stroke : INK} textAnchor="middle">
                  {termText(t.c, t.v, p.first)}
                </text>
              </g>
            )
          })}

          {step >= 3 && groups.map((g) => {
            const col = kindColour(kinds, g.v)
            const mid = (g.left + g.right) / 2
            return (
              <g key={`g${g.v}`}>
                <path d={`M ${g.left + 8} 230 v 14 H ${g.right - 8} v -14`} fill="none" stroke={col.stroke} strokeWidth="4" strokeLinejoin="round" />
                <text x={mid} y="298" fontFamily={FONT} fontSize="52" fontWeight="bold" fill={col.stroke} textAnchor="middle">{g.text}</text>
              </g>
            )
          })}

          {step >= 3 && (
            <g>
              <rect x="150" y="320" width="820" height="106" rx="16" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
              <text x="560" y="390" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={INK} textAnchor="middle">
                {tr(lang, 'Simplest form: ', 'Dạng gọn nhất: ', 'Forme réduite : ')}
                <tspan fill={KEY}>{answer}</tspan>
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>{tr(lang, 'Back', 'Lùi', 'Retour')}</Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={step === 3} onClick={() => setStep((s) => Math.min(3, s + 1))}>{tr(lang, 'Next step', 'Bước tiếp', 'Suivant')}</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % list.length); setStep(0) }}>{tr(lang, 'Next expression', 'Biểu thức khác', 'Autre expression')}</Btn>
      </div>
    </div>
  )
}

export function CollectAdd({ lang }) { return <Collect lang={lang} set="add" /> }
export function CollectSigns({ lang }) { return <Collect lang={lang} set="signs" /> }

/* ============================================================= *
 * WIDGET 2 — ALGEBRAIC PYRAMIDS
 * ============================================================= */
// Blocks are named "row-col", row 0 at the bottom. `steps` is the reveal order;
// each step names the two blocks it uses and the working line to show.
const PYRAMIDS = [
  {
    back: false,
    rows: [['2x', '5x', 'x'], ['7x', '6x'], ['13x']],
    given: ['0-0', '0-1', '0-2'],
    steps: [
      { id: '1-0', from: ['0-0', '0-1'], en: '2x + 5x = 7x' },
      { id: '1-1', from: ['0-1', '0-2'], en: '5x + x = 6x' },
      { id: '2-0', from: ['1-0', '1-1'], en: '7x + 6x = 13x' },
    ],
  },
  {
    back: false,
    rows: [['a + b', '2a', '3b'], ['3a + b', '2a + 3b'], ['5a + 4b']],
    given: ['0-0', '0-1', '0-2'],
    steps: [
      { id: '1-0', from: ['0-0', '0-1'], en: 'a + b + 2a = 3a + b' },
      { id: '1-1', from: ['0-1', '0-2'], en: '2a + 3b: no like terms', vn: '2a + 3b: không có hạng tử đồng dạng', fr: '2a + 3b : pas de termes semblables' },
      { id: '2-0', from: ['1-0', '1-1'], en: '3a + b + 2a + 3b = 5a + 4b' },
    ],
  },
  {
    back: true,
    rows: [['2y', '3y', '4y'], ['5y', '7y'], ['12y']],
    given: ['0-0', '1-0', '2-0'],
    steps: [
      { id: '0-1', from: ['1-0', '0-0'], en: '5y − 2y = 3y' },
      { id: '1-1', from: ['2-0', '1-0'], en: '12y − 5y = 7y' },
      { id: '0-2', from: ['1-1', '0-1'], en: '7y − 3y = 4y' },
    ],
  },
]

// Drawn tight to its viewBox: a split panel is height-limited on the projector,
// so every spare pixel of margin shrinks the blocks.
const BW = 250
const BH = 108
const blockAt = (id) => {
  const [r, c] = id.split('-').map(Number)
  const y = 282 - r * BH
  const x = 420 - ((3 - r) * BW) / 2 + c * BW
  return { x, y }
}

export function Pyramid({ lang = 'en' }) {
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(0) // how many blocks have been revealed
  const p = PYRAMIDS[which]
  const shown = p.steps.slice(0, step).map((s) => s.id)
  const current = step > 0 ? p.steps[step - 1] : null

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 840 470" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="840" height="470" rx="14" fill="#ffffff" />
          <text x="420" y="42" fontFamily={FONT} fontSize="32" fontWeight="bold" fill={MUTED} textAnchor="middle">
            {p.back ? tr(lang, 'Work backwards', 'Làm ngược lại', 'Calcule à l’envers') : tr(lang, 'Add the two blocks below', 'Cộng hai ô bên dưới', 'Ajoute les deux cases du dessous')}
          </text>
          <text x="20" y="42" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#9aa5ae" textAnchor="start">{which + 1} / {PYRAMIDS.length}</text>

          {p.rows.flatMap((row, r) => row.map((label, c) => {
            const id = `${r}-${c}`
            const { x, y } = blockAt(id)
            const given = p.given.includes(id)
            const isNew = current?.id === id
            const open = given || shown.includes(id)
            const fill = isNew ? '#fdf1e3' : given ? '#e2f2f6' : open ? '#ffffff' : '#f1f5f9'
            const stroke = isNew ? KEY : given ? '#0087a8' : open ? INK : '#c3cbd2'
            return (
              <g key={id}>
                <rect x={x} y={y} width={BW} height={BH} fill={fill} stroke={stroke} strokeWidth={isNew ? 5 : 2.5} />
                <text x={x + BW / 2} y={y + 72} fontFamily={FONT} fontSize="50" fontWeight="bold" fill={open ? (isNew ? KEY : INK) : '#9aa5ae'} textAnchor="middle">
                  {open ? label : '?'}
                </text>
              </g>
            )
          }))}

          {/* The two blocks being used, outlined on top so neighbours cannot cover them. */}
          {current?.from.map((id) => {
            const { x, y } = blockAt(id)
            return <rect key={`f${id}`} x={x + 6} y={y + 6} width={BW - 12} height={BH - 12} fill="none" stroke={KEY} strokeWidth="4" strokeDasharray="12 8" pointerEvents="none" />
          })}

          {current ? (
            <text x="420" y="448" fontFamily={FONT} fontSize="38" fontWeight="bold" fill={KEY} textAnchor="middle">
              {tr(lang, current.en, current.vn, current.fr)}
            </text>
          ) : (
            <text x="420" y="448" fontFamily={FONT} fontSize="32" fill="#9aa5ae" textAnchor="middle">
              {tr(lang, 'Which block can you find first?', 'Em tìm được ô nào trước?', 'Quelle case trouves-tu en premier ?')}
            </text>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>{tr(lang, 'Back', 'Lùi', 'Retour')}</Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={step === p.steps.length} onClick={() => setStep((s) => Math.min(p.steps.length, s + 1))}>{tr(lang, 'Next block', 'Ô tiếp', 'Suivant')}</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % PYRAMIDS.length); setStep(0) }}>{tr(lang, 'Next pyramid', 'Kim tự tháp khác', 'Autre pyramide')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 3 — LIKE OR NOT?
 * ============================================================= */
const CARDS = [
  { a: '4a', b: '9a', like: true, en: 'the same letter', vn: 'cùng một chữ cái', fr: 'la même lettre' },
  { a: '4a', b: '4b', like: false, en: 'different letters', vn: 'khác chữ cái', fr: 'des lettres différentes' },
  { a: 'x', b: '7x', like: true, en: 'x means 1x', vn: 'x nghĩa là 1x', fr: 'x veut dire 1x' },
  { a: '3y', b: '3', like: false, en: '3 has no letter', vn: '3 không có chữ cái', fr: '3 n’a pas de lettre' },
  { a: '2ab', b: '5ba', like: true, en: 'ab = ba, because a × b = b × a', vn: 'ab = ba, vì a × b = b × a', fr: 'ab = ba, car a × b = b × a' },
  { a: '8', b: '2', like: true, en: 'both are numbers', vn: 'cả hai đều là số', fr: 'ce sont deux nombres' },
  { a: '6p', b: '6pq', like: false, en: 'p is not pq', vn: 'p khác pq', fr: 'p n’est pas pq' },
  { a: '5c', b: `${MINUS}2c`, like: true, en: 'both are c terms; the sign does not change that', vn: 'cả hai đều là hạng tử c; dấu không làm thay đổi điều đó', fr: 'deux termes en c ; le signe n’y change rien' },
  { a: 'm²', b: '4m', like: false, en: 'm² means m × m', vn: 'm² nghĩa là m × m', fr: 'm² veut dire m × m' },
  { a: '7xy', b: '7x', like: false, en: 'xy is not x', vn: 'xy khác x', fr: 'xy n’est pas x' },
  { a: '9n', b: 'n', like: true, en: 'n means 1n', vn: 'n nghĩa là 1n', fr: 'n veut dire 1n' },
  { a: '12t', b: '12', like: false, en: '12 has no letter', vn: '12 không có chữ cái', fr: '12 n’a pas de lettre' },
  { a: '2rd', b: '3dr', like: true, en: 'rd = dr', vn: 'rd = dr', fr: 'rd = dr' },
  { a: '3h²', b: 'h²', like: true, en: 'both are h² terms', vn: 'cả hai đều là hạng tử h²', fr: 'deux termes en h²' },
  { a: '10w', b: '10v', like: false, en: 'different letters', vn: 'khác chữ cái', fr: 'des lettres différentes' },
  { a: '20', b: `${MINUS}6`, like: true, en: 'both are numbers', vn: 'cả hai đều là số', fr: 'ce sont deux nombres' },
]

function TermTile({ text, verdict, big }) {
  const border = verdict === true ? 'border-[#4a8b23]' : verdict === false ? 'border-[#c8102e]' : 'border-slate-300'
  return (
    <div className={`rounded-3xl border-[6px] bg-white flex items-center justify-center font-black text-[#2b2b2b] leading-none shadow-sm px-8 ${border} ${big ? 'min-w-[clamp(12rem,28vh,20rem)] h-[clamp(10rem,26vh,18rem)] text-[clamp(5rem,14vh,10rem)]' : 'min-w-[10rem] h-[9rem] text-7xl'}`}>
      {text}
    </div>
  )
}

export function LikeOrNot({ lang = 'en', isDisplayMode = false }) {
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
              {tr(lang, 'Like or Not?', 'Đồng dạng hay không?', 'Semblables ou non ?')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Thumbs up: like terms. Thumbs down: not. Then press Show.', 'Ngón cái lên: đồng dạng. Ngón cái xuống: không. Rồi bấm Hiện.', 'Pouce levé : semblables. Baissé : non. Puis appuie sur Voir.')}
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
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-[clamp(1rem,4vh,2.5rem)] p-4">
        {done ? (
          <>
            <div className="p-4 rounded-2xl bg-emerald-500 text-white"><Sparkles className="w-12 h-12" strokeWidth={2} /></div>
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>{tr(lang, 'All 16 done!', 'Xong cả 16!', 'Les 16 sont faits !')}</div>
          </>
        ) : (
          <>
            <div className={`font-black uppercase tracking-[0.2em] text-[#c25e12] ${big ? 'text-[clamp(1rem,2.2vh,1.6rem)]' : 'text-sm'}`}>
              {tr(lang, 'Are these like terms?', 'Đây có phải hạng tử đồng dạng?', 'Des termes semblables ?')}
            </div>

            <div className="flex items-center justify-center gap-[clamp(1rem,3vw,3rem)] flex-wrap">
              <TermTile text={card.a} verdict={shown ? card.like : null} big={big} />
              <div className={`font-black text-slate-400 ${big ? 'text-[clamp(2rem,5vh,3.5rem)]' : 'text-3xl'}`}>{tr(lang, 'and', 'và', 'et')}</div>
              <TermTile text={card.b} verdict={shown ? card.like : null} big={big} />
            </div>

            <div className="min-h-[clamp(6rem,17vh,11rem)] flex flex-col items-center justify-center gap-3">
              {shown ? (
                <>
                  <div className={`rounded-full text-white font-black px-8 py-2 ${card.like ? 'bg-[#4a8b23]' : 'bg-[#c8102e]'} ${big ? 'text-[clamp(1.8rem,4.5vh,3rem)]' : 'text-3xl'}`}>
                    {card.like ? tr(lang, '✓ Like terms', '✓ Đồng dạng', '✓ Semblables') : tr(lang, '✗ Not like terms', '✗ Không đồng dạng', '✗ Pas semblables')}
                  </div>
                  <div className={`font-bold text-slate-600 dark:text-slate-300 ${big ? 'text-[clamp(1.2rem,2.8vh,2rem)]' : 'text-lg'}`}>
                    {tr(lang, card.en, card.vn, card.fr)}
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
            {shown ? tr(lang, 'Next', 'Tiếp', 'Suivant') : tr(lang, 'Show', 'Hiện', 'Voir')}
          </Btn>
        )}
        {done && (
          <Btn tone="slate" icon={RotateCcw} onClick={() => { setPos(0); setShown(false) }}>{tr(lang, 'Start again', 'Làm lại', 'Recommencer')}</Btn>
        )}
      </div>
    </div>
  )
}
