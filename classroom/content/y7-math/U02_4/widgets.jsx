// content/y7-math/U02_4/widgets.jsx
// Widgets for 2.4 Expanding Brackets. Two, and each does one thing a still
// slide cannot:
//
//   Expand        The book's grid method, one box per press. The outside number
//                 and one inside term light up, the product lands in that box,
//                 and the working line is written underneath — so the class says
//                 "five times a" BEFORE the box is filled. Two sets, one per
//                 slide: ExpandPlus (plus signs only) and ExpandMinus (a minus
//                 inside the brackets, which is where the marks are lost).
//
//   RightOrWrong  A full-slide `game`: an expansion is shown already done.
//                 Thumbs up if it is right, thumbs down if it is wrong. Show
//                 gives the verdict, the reason, and the correct answer. A
//                 clicker's Right arrow shows, then moves on.
//
// A showcase slide hands a widget no isDisplayMode, so Expand draws its stage as
// ONE SVG (text scales with the panel) and keeps only the buttons as HTML. Every
// SVG opens with a white plate.
import { useState, useEffect, useCallback } from 'react'
import { Undo2, RotateCcw, ArrowRight, Eye, Shuffle, Sparkles, ThumbsUp, SkipForward } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
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
 * WIDGET 1 — THE GRID, ONE BOX AT A TIME
 * ============================================================= */
// `out` is the number outside the brackets; `inner` is the list of terms inside
// as [coefficient, letter].
const SETS = {
  plus: [
    { out: 2, inner: [[1, 'x'], [3, '']] },
    { out: 3, inner: [[1, 'x'], [4, '']] },
    { out: 5, inner: [[1, 'm'], [1, '']] },
    { out: 4, inner: [[2, 'n'], [3, '']] },
  ],
  minus: [
    { out: 3, inner: [[1, 'x'], [-2, '']] },
    { out: 6, inner: [[1, 'k'], [-3, '']] },
    { out: 2, inner: [[1, 'y'], [-4, '']] },
    { out: 7, inner: [[1, ''], [-1, 'w']] },
  ],
}

// 1x prints as x, −1w prints as −w; a bare number keeps its digits.
const body = ([c, v]) => (v && Math.abs(c) === 1 ? v : `${Math.abs(c)}${v}`)
const signed = (t, first) => (first ? `${t[0] < 0 ? MINUS : ''}${body(t)}` : `${t[0] < 0 ? MINUS : '+'} ${body(t)}`)
const product = (out, t) => [out * t[0], t[1]]
// On the working line a negative term is bracketed, so 3 × (−2) = −6 reads as
// the multiplication it is rather than as 3 × 2.
const factor = (t) => (t[0] < 0 ? `(${MINUS}${body(t)})` : body(t))
const value = (t) => `${t[0] < 0 ? MINUS : ''}${body(t)}`

const bracketText = (p) => `${p.out}(${p.inner.map((t, i) => signed(t, i === 0)).join(' ')})`
const answerText = (p) => p.inner.map((t, i) => signed(product(p.out, t), i === 0)).join(' ')

const COL0 = 150
const COLW = 200
const ROWH = 96
const TOP = 118

function Expand({ lang = 'en', set }) {
  const list = SETS[set]
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(0)
  const p = list[which]
  const n = p.inner.length
  const total = COL0 + COLW * n
  const x0 = 560 - total / 2
  const done = step >= n + 1
  const active = step >= 1 && step <= n ? step - 1 : -1

  const cellX = (i) => x0 + COL0 + COLW * i

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          <text x="560" y="78" fontFamily={FONT} fontSize="54" fontWeight="bold" fill={INK} textAnchor="middle">
            {tr(lang, 'Expand ', 'Khai triển ', 'Développe ')}
            <tspan fill={KEY}>{bracketText(p)}</tspan>
          </text>
          <text x="1096" y="52" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#9aa5ae" textAnchor="end">{which + 1} / {list.length}</text>

          {/* header row: × and each term inside */}
          <rect x={x0} y={TOP} width={COL0} height={ROWH} fill="#eef1f4" stroke={INK} strokeWidth="3" />
          <text x={x0 + COL0 / 2} y={TOP + 62} fontFamily={FONT} fontSize="44" fontWeight="bold" fill={MUTED} textAnchor="middle">×</text>
          {p.inner.map((t, i) => (
            <g key={`h${i}`}>
              <rect x={cellX(i)} y={TOP} width={COLW} height={ROWH} fill={active === i ? '#fdf1e3' : '#eef1f4'} stroke={active === i ? KEY : INK} strokeWidth={active === i ? 5 : 3} />
              <text x={cellX(i) + COLW / 2} y={TOP + 62} fontFamily={FONT} fontSize="44" fontWeight="bold" fill={active === i ? KEY : PURPLE} textAnchor="middle">
                {signed(t, true)}
              </text>
            </g>
          ))}

          {/* answer row: the outside number and the products */}
          <rect x={x0} y={TOP + ROWH} width={COL0} height={ROWH} fill={active >= 0 ? '#fdf1e3' : '#ffffff'} stroke={active >= 0 ? KEY : INK} strokeWidth={active >= 0 ? 5 : 3} />
          <text x={x0 + COL0 / 2} y={TOP + ROWH + 62} fontFamily={FONT} fontSize="44" fontWeight="bold" fill={active >= 0 ? KEY : TEAL} textAnchor="middle">{p.out}</text>
          {p.inner.map((t, i) => {
            // The box fills on the same press that lights it up, so the class
            // says the multiplication BEFORE the press and sees it land after.
            const filled = step >= i + 1
            const isNew = active === i
            return (
              <g key={`a${i}`}>
                <rect x={cellX(i)} y={TOP + ROWH} width={COLW} height={ROWH} fill={isNew ? '#fdf1e3' : '#ffffff'} stroke={isNew ? KEY : INK} strokeWidth={isNew ? 5 : 3} />
                <text x={cellX(i) + COLW / 2} y={TOP + ROWH + 62} fontFamily={FONT} fontSize="44" fontWeight="bold" fill={filled ? (isNew ? KEY : INK) : '#c3cbd2'} textAnchor="middle">
                  {filled ? signed(product(p.out, t), true) : '?'}
                </text>
              </g>
            )
          })}

          {/* the working line, then the finished expansion */}
          {active >= 0 && (
            <text x="560" y="392" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={KEY} textAnchor="middle">
              {p.out} × {factor(p.inner[active])} = {value(product(p.out, p.inner[active]))}
            </text>
          )}
          {done && (
            <g>
              <rect x="170" y="330" width="780" height="92" rx="16" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
              <text x="560" y="392" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={INK} textAnchor="middle">
                {bracketText(p)} = <tspan fill={KEY}>{answerText(p)}</tspan>
              </text>
            </g>
          )}
          {step === 0 && (
            <text x="560" y="392" fontFamily={FONT} fontSize="32" fill="#9aa5ae" textAnchor="middle">
              {tr(lang, 'Which box can you fill first?', 'Em điền được ô nào trước?', 'Quelle case remplis-tu en premier ?')}
            </text>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>{tr(lang, 'Back', 'Lùi', 'Retour')}</Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={done} onClick={() => setStep((s) => Math.min(n + 1, s + 1))}>{tr(lang, 'Next box', 'Ô tiếp', 'Suivant')}</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % list.length); setStep(0) }}>{tr(lang, 'Next question', 'Câu tiếp', 'Autre calcul')}</Btn>
      </div>
    </div>
  )
}

export function ExpandPlus({ lang }) { return <Expand lang={lang} set="plus" /> }
export function ExpandMinus({ lang }) { return <Expand lang={lang} set="minus" /> }

/* ============================================================= *
 * WIDGET 2 — RIGHT OR WRONG?
 * ============================================================= */
const CARDS = [
  { q: '5(a + 3)', a: '5a + 15', ok: true, en: 'both terms were multiplied', vn: 'cả hai hạng tử đều được nhân', fr: 'les deux termes sont multipliés' },
  { q: '4(b + 2)', a: '4b + 2', ok: false, fix: '4b + 8', en: 'the 2 was not multiplied', vn: 'số 2 chưa được nhân', fr: 'le 2 n’est pas multiplié' },
  { q: '6(k − 3)', a: '6k − 18', ok: true, en: 'the minus travels with the 3', vn: 'dấu trừ đi cùng với số 3', fr: 'le moins reste avec le 3' },
  { q: '3(4b − 5)', a: '12b − 8', ok: false, fix: '12b − 15', en: '3 × 5 = 15, not 3 + 5', vn: '3 × 5 = 15, không phải 3 + 5', fr: '3 × 5 = 15, pas 3 + 5' },
  { q: '2(3x + 1)', a: '6x + 2', ok: true, en: '2 × 3 = 6, and the x stays', vn: '2 × 3 = 6, và chữ x giữ nguyên', fr: '2 × 3 = 6, et le x reste' },
  { q: '5(2 − d)', a: '10 − 5d', ok: true, en: 'this is finished', vn: 'đến đây là xong', fr: 'c’est fini' },
  { q: '4(3 − c)', a: '8c', ok: false, fix: '12 − 4c', en: '12 and 4c are not like terms', vn: '12 và 4c không đồng dạng', fr: '12 et 4c ne sont pas semblables' },
  { q: '7(y + 4)', a: '7y + 28', ok: true, en: '7 × 4 = 28', vn: '7 × 4 = 28', fr: '7 × 4 = 28' },
  { q: '9(2r + 3)', a: '11r + 27', ok: false, fix: '18r + 27', en: '9 × 2 = 18, not 9 + 2', vn: '9 × 2 = 18, không phải 9 + 2', fr: '9 × 2 = 18, pas 9 + 2' },
  { q: '3(x − 7)', a: '3x + 21', ok: false, fix: '3x − 21', en: 'the minus does not change', vn: 'dấu trừ không đổi', fr: 'le moins ne change pas' },
  { q: '8(7 + z)', a: '56 + 8z', ok: true, en: 'both terms, in the same order', vn: 'cả hai hạng tử, theo đúng thứ tự', fr: 'les deux termes, dans le même ordre' },
  { q: '5(m + 1)', a: '5m + 5', ok: true, en: 'the 1 is multiplied too', vn: 'số 1 cũng được nhân', fr: 'le 1 est multiplié aussi' },
  { q: '2(5t − 4)', a: '10t − 8', ok: true, en: '2 × 5t = 10t and 2 × 4 = 8', vn: '2 × 5t = 10t và 2 × 4 = 8', fr: '2 × 5t = 10t et 2 × 4 = 8' },
  { q: '6(1 + 2v)', a: '6 + 12v', ok: true, en: '6 × 1 = 6 and 6 × 2v = 12v', vn: '6 × 1 = 6 và 6 × 2v = 12v', fr: '6 × 1 = 6 et 6 × 2v = 12v' },
  { q: '4(x + 4)', a: '4x + 4', ok: false, fix: '4x + 16', en: '4 × 4 = 16', vn: '4 × 4 = 16', fr: '4 × 4 = 16' },
  { q: '10(6 + 7x)', a: '60 + 7x', ok: false, fix: '60 + 70x', en: 'the 7x was not multiplied', vn: '7x chưa được nhân', fr: 'le 7x n’est pas multiplié' },
]

function Tile({ text, verdict, big }) {
  const border = verdict === true ? 'border-[#4a8b23]' : verdict === false ? 'border-[#c8102e]' : 'border-slate-300'
  return (
    <div className={`rounded-3xl border-[6px] bg-white flex items-center justify-center font-black leading-none shadow-sm text-[#2b2b2b] px-8 ${border} ${big ? 'min-w-[clamp(12rem,26vh,20rem)] h-[clamp(9rem,22vh,15rem)] text-[clamp(3.5rem,10vh,7rem)]' : 'min-w-[10rem] h-[8rem] text-6xl'}`}>
      {text}
    </div>
  )
}

export function RightOrWrong({ lang = 'en', isDisplayMode = false }) {
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
              {tr(lang, 'Right or Wrong?', 'Đúng hay sai?', 'Juste ou faux ?')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Thumbs up: right. Thumbs down: wrong. Then press Show.', 'Ngón cái lên: đúng. Ngón cái xuống: sai. Rồi bấm Hiện.', 'Pouce levé : juste. Baissé : faux. Appuie sur Voir.')}
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
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>{tr(lang, 'All 16 done!', 'Xong cả 16!', 'Les 16 sont faits !')}</div>
          </>
        ) : (
          <>
            <div className={`font-black uppercase tracking-[0.2em] text-[#c25e12] ${big ? 'text-[clamp(1rem,2.2vh,1.6rem)]' : 'text-sm'}`}>
              {tr(lang, 'Is this expansion right?', 'Khai triển này đúng không?', 'Ce développement est-il juste ?')}
            </div>

            <div className="flex items-center justify-center gap-[clamp(0.75rem,2.5vw,2.5rem)] flex-wrap">
              <Tile text={card.q} verdict={shown ? card.ok : null} big={big} />
              <div className={`font-black text-slate-400 ${big ? 'text-[clamp(2rem,5vh,3.5rem)]' : 'text-3xl'}`}>=</div>
              <Tile text={card.a} verdict={shown ? card.ok : null} big={big} />
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
