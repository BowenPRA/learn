// content/y7-math/U04_review/widgets.jsx
// One widget, and it does one thing a still slide cannot.
//
//   UnitQuickFire   A full-slide `game` reviewing all of Unit 4: one card at a
//                   time, the class answers on whiteboards, Show gives the
//                   answer. Teacher-paced and shuffled on demand — a still slide
//                   would show every answer at once. Every card is pure maths,
//                   so it reads the same in English and French. A clicker's
//                   Right arrow shows, then moves on.
//
// The deck is English and French only (meta.vietnamese: false), so every string
// goes through `t(lang, en, fr)`.
import { useState, useEffect, useCallback } from 'react'
import { RotateCcw, ArrowRight, Eye, Shuffle, Sparkles, Zap } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)

function Btn({ onClick, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    slate: 'bg-slate-500 border-slate-700',
  }
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base ${tones[tones[tone] ? tone : 'teal']}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  )
}

// s: the section it comes from · q: the card · a: the answer
const CARDS = [
  { s: '4.1', q: '0.58 □ 0.6', a: '0.58 < 0.6' },
  { s: '4.2', q: '4.7 + 2.85', a: '7.55' },
  { s: '4.2', q: '10 − 3.42', a: '6.58' },
  { s: '4.3', q: '0.8 × 7', a: '5.6' },
  { s: '4.3', q: '2.35 × 4', a: '9.4' },
  { s: '4.4', q: '7.24 ÷ 4', a: '1.81' },
  { s: '4.4', q: '0.36 ÷ 6', a: '0.06' },
  { s: '4.5', q: '80 × 0.5', a: '40' },
  { s: '4.5', q: '300 × 0.03', a: '9' },
  { s: '4.5', q: '6.4 × 9', a: '57.6' },
  { s: '4.2', q: '1.25 + 0.75', a: '2' },
  { s: '4.4', q: '9.6 ÷ 12', a: '0.8' },
  { s: '4.5', q: '0.09 = □', a: '9/100' },
  { s: '4.2', q: '5 − 0.01', a: '4.99' },
]

export function UnitQuickFire({ lang = 'en', isDisplayMode = false }) {
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
          <div className="p-2 rounded-xl text-white bg-[#0087a8] shrink-0">
            <Zap className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {t(lang, 'Unit 4 Quick-Fire', 'Unité 4 en rafale')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {t(lang, 'Answer on your whiteboard. Then press Show.',
                       'Réponds sur ton ardoise. Puis Voir.')}
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
              {t(lang, 'All 14 done!', 'Les 14 sont faits !')}
            </div>
          </>
        ) : (
          <>
            <div className={`font-black uppercase tracking-[0.2em] text-[#0087a8] ${big ? 'text-[clamp(1rem,2.2vh,1.6rem)]' : 'text-sm'}`}>
              {t(lang, `From ${card.s}`, `Tiré de ${card.s}`)}
            </div>

            <div className={`rounded-3xl border-[6px] border-slate-300 bg-white flex items-center justify-center font-black text-[#2b2b2b] leading-none shadow-sm px-10 ${big ? 'h-[clamp(9rem,24vh,16rem)] text-[clamp(4rem,11vh,8rem)]' : 'h-[8rem] text-6xl'}`}>
              {card.q}
            </div>

            <div className="min-h-[clamp(6rem,19vh,12rem)] flex flex-col items-center justify-center gap-3">
              {shown ? (
                <div className={`font-black text-[#4a8b23] ${big ? 'text-[clamp(2.4rem,7vh,5rem)]' : 'text-4xl'}`}>
                  {card.a}
                </div>
              ) : (
                <div className={`font-black text-slate-300 dark:text-slate-700 ${big ? 'text-8xl' : 'text-6xl'}`}>?</div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap px-4 pb-4 pt-2">
        <Btn tone="teal" icon={Shuffle} onClick={deal}>{t(lang, 'Shuffle', 'Mélanger')}</Btn>
        {!done && (
          <Btn tone="orange" icon={shown ? ArrowRight : Eye} onClick={advance}>
            {shown ? t(lang, 'Next', 'Suivant') : t(lang, 'Show', 'Voir')}
          </Btn>
        )}
        {done && (
          <Btn tone="slate" icon={RotateCcw} onClick={() => { setPos(0); setShown(false) }}>
            {t(lang, 'Start again', 'Rejouer')}
          </Btn>
        )}
      </div>
    </div>
  )
}
