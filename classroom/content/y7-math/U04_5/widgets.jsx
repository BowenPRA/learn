// content/y7-math/U04_5/widgets.jsx
// One widget, and it does one thing a still slide cannot.
//
//   MakeItEasy   A full-slide `game` for quick-fire practice of every shortcut
//                in 4.5. A calculation appears; the class writes the EASY
//                version and the answer on whiteboards; Show gives both. One
//                card at a time, teacher-paced, shuffled on demand — a still
//                slide would show all fourteen answers at once. A clicker's
//                Right arrow shows, then moves on.
//
// The deck is English and French only (meta.vietnamese: false), so every string
// goes through `t(lang, en, fr)`. The calculations themselves are maths and the
// same in both languages.
import { useState, useEffect, useCallback } from 'react'
import { RotateCcw, ArrowRight, Eye, Shuffle, Sparkles, Wand2 } from 'lucide-react'
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

// q: the calculation · easy: the easier calculation · a: the answer
const CARDS = [
  { q: '86 × 0.5', easy: '86 ÷ 2', a: '43' },
  { q: '120 × 0.25', easy: '120 ÷ 4', a: '30' },
  { q: '73 × 0.1', easy: '73 ÷ 10', a: '7.3' },
  { q: '40 × 0.3', easy: '40 ÷ 10 × 3', a: '12' },
  { q: '600 × 0.02', easy: '600 ÷ 100 × 2', a: '12' },
  { q: '4.5 × 9', easy: '45 − 4.5', a: '40.5' },
  { q: '2.7 × 11', easy: '27 + 2.7', a: '29.7' },
  { q: '250 × 0.04', easy: '250 ÷ 100 × 4', a: '10' },
  { q: '6.4 × 0.5', easy: '6.4 ÷ 2', a: '3.2' },
  { q: '5.1 × 4', easy: '20 + 0.4', a: '20.4' },
  { q: '90 × 0.7', easy: '90 ÷ 10 × 7', a: '63' },
  { q: '7.9 × 3', easy: '24 − 0.3', a: '23.7' },
  { q: '1.8 × 9', easy: '18 − 1.8', a: '16.2' },
  { q: '36 × 0.25', easy: '36 ÷ 4', a: '9' },
]

export function MakeItEasy({ lang = 'en', isDisplayMode = false }) {
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
            <Wand2 className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {t(lang, 'Make It Easy', 'Rends-le facile')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {t(lang, 'Write the easy way and the answer. Then press Show.',
                       'Écris le moyen facile et la réponse. Puis Voir.')}
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
            <div className={`font-black uppercase tracking-[0.2em] text-[#c25e12] ${big ? 'text-[clamp(1rem,2.2vh,1.6rem)]' : 'text-sm'}`}>
              {t(lang, 'What is the easy way?', 'Quel est le moyen facile ?')}
            </div>

            <div className={`rounded-3xl border-[6px] border-slate-300 bg-white flex items-center justify-center font-black text-[#2b2b2b] leading-none shadow-sm px-10 ${big ? 'h-[clamp(9rem,24vh,16rem)] text-[clamp(4rem,11vh,8rem)]' : 'h-[8rem] text-6xl'}`}>
              {card.q}
            </div>

            <div className="min-h-[clamp(6rem,19vh,12rem)] flex flex-col items-center justify-center gap-3">
              {shown ? (
                <>
                  <div className={`rounded-full text-white font-black px-8 py-2 bg-[#c25e12] ${big ? 'text-[clamp(1.6rem,4vh,2.6rem)]' : 'text-2xl'}`}>
                    {card.easy}
                  </div>
                  <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-[clamp(2.4rem,7vh,5rem)]' : 'text-4xl'}`}>
                    = {card.a}
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
