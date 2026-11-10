// content/y7-science/U02_7/widgets.jsx
// Widgets for 2.7 Compounds and mixtures. Two, and each does one thing a still
// slide cannot:
//
//   IronSulfurClip     The book's practical, filmed: iron and sulfur heated
//                      until they glow and become iron sulfide. The class has
//                      no Bunsen burners, so this IS the experiment. A plain
//                      <video> with its own controls, downloaded into the unit
//                      so it plays on school wifi (or none). The film is 4:29;
//                      the first three minutes are weighing and mixing, so it
//                      opens at 3:15 (#t=195), just before the heating.
//
//   MixtureOrCompound  A full-slide game: a substance appears and everyone votes
//                      at once — LEFT hand mixture, RIGHT hand compound. Show
//                      gives the verdict and the reason. A clicker's Right
//                      arrow shows, then moves on. Pairs are deliberate: salt /
//                      sea water, pure water / tap water, iron sulfide / iron
//                      and sulfur stirred.
import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, Eye, Shuffle, Sparkles, Hand, RotateCcw } from 'lucide-react'
import ironSulfurVideo from './images/ironsulfur.webm'
import { tr } from '../../../src/lib/lang.js'

function Btn({ onClick, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    slate: 'bg-slate-500 border-slate-700',
  }
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base ${tones[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  )
}

/* ============================================================= *
 * WIDGET 1 — THE VIDEO
 * ============================================================= */
// No Stage and no extra frame: `showcase` already wraps the media in a padded
// panel. Sized from the HEIGHT it is given (showcase boxes are short and wide).
export function IronSulfurClip({ lang = 'en' }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="h-full max-w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: '16 / 9' }}>
        <video
          className="w-full h-full object-contain"
          src={`${ironSulfurVideo}#t=195`}
          controls
          playsInline
          preload="metadata"
          aria-label={tr(lang, 'Iron and sulfur heated together', 'Đun nóng sắt và lưu huỳnh', 'Fer et soufre chauffés ensemble')}
        />
      </div>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 2 — MIXTURE OR COMPOUND?
 * ============================================================= */
const CARDS = [
  { en: 'air', vn: 'không khí', fr: 'l’air', compound: false, why: 'Nitrogen, oxygen and other gases. Not bonded.', whyVn: 'Nitơ, oxi và các khí khác. Không liên kết.', whyFr: 'Azote, oxygène et autres gaz. Pas liés.' },
  { en: 'carbon dioxide', vn: 'cacbon đioxit', fr: 'dioxyde de carbone', compound: true, why: 'Carbon and oxygen atoms, bonded.', whyVn: 'Nguyên tử cacbon và oxi, liên kết với nhau.', whyFr: 'Atomes de carbone et d’oxygène, liés.' },
  { en: 'sea water', vn: 'nước biển', fr: 'eau de mer', compound: false, why: 'Water with salt dissolved in it.', whyVn: 'Nước có muối hòa tan trong đó.', whyFr: 'De l’eau avec du sel dissous dedans.' },
  { en: 'salt (sodium chloride)', vn: 'muối ăn (natri clorua)', fr: 'sel (chlorure de sodium)', compound: true, why: 'Sodium and chlorine, bonded.', whyVn: 'Natri và clo, liên kết với nhau.', whyFr: 'Sodium et chlore, liés.' },
  { en: 'iron and sulfur, stirred', vn: 'sắt và lưu huỳnh, khuấy đều', fr: 'fer et soufre, mélangés', compound: false, why: 'A magnet can still pull the iron out.', whyVn: 'Nam châm vẫn hút được sắt ra.', whyFr: 'Un aimant peut encore retirer le fer.' },
  { en: 'iron sulfide', vn: 'sắt sunfua', fr: 'sulfure de fer', compound: true, why: 'Iron and sulfur, bonded. Not magnetic.', whyVn: 'Sắt và lưu huỳnh, liên kết. Không bị nam châm hút.', whyFr: 'Fer et soufre, liés. Pas attiré par l’aimant.' },
  { en: 'tap water', vn: 'nước máy', fr: 'eau du robinet', compound: false, why: 'Water with minerals dissolved in it.', whyVn: 'Nước có khoáng chất hòa tan trong đó.', whyFr: 'De l’eau avec des minéraux dissous dedans.' },
  { en: 'pure water', vn: 'nước tinh khiết', fr: 'eau pure', compound: true, why: 'Only H₂O: hydrogen and oxygen, bonded.', whyVn: 'Chỉ có H₂O: hiđro và oxi, liên kết với nhau.', whyFr: 'Seulement H₂O : hydrogène et oxygène, liés.' },
  { en: 'mineral water', vn: 'nước khoáng', fr: 'eau minérale', compound: false, why: 'Water and minerals. Read the label!', whyVn: 'Nước và khoáng chất. Đọc nhãn chai!', whyFr: 'De l’eau et des minéraux. Lis l’étiquette !' },
  { en: 'sugar', vn: 'đường', fr: 'sucre', compound: true, why: 'Carbon, hydrogen and oxygen, bonded.', whyVn: 'Cacbon, hiđro và oxi, liên kết với nhau.', whyFr: 'Carbone, hydrogène et oxygène, liés.' },
  { en: 'fish sauce', vn: 'nước mắm', fr: 'sauce de poisson', compound: false, why: 'Fish, salt and water. Delicious. Not pure.', whyVn: 'Cá, muối và nước. Rất ngon. Không tinh khiết.', whyFr: 'Poisson, sel et eau. Délicieux. Pas pur.' },
  { en: 'iron oxide', vn: 'sắt oxit', fr: 'oxyde de fer', compound: true, why: 'Iron and oxygen, bonded.', whyVn: 'Sắt và oxi, liên kết với nhau.', whyFr: 'Fer et oxygène, liés.' },
  { en: 'Mr Bowen’s iced coffee', vn: 'cà phê sữa đá của thầy Bowen', fr: 'le café glacé de M. Bowen', compound: false, why: 'Coffee, milk, sugar and ice. Very important.', whyVn: 'Cà phê, sữa, đường và đá. Rất quan trọng.', whyFr: 'Café, lait, sucre et glaçons. Très important.' },
  { en: 'calcium carbonate', vn: 'canxi cacbonat', fr: 'carbonate de calcium', compound: true, why: 'Calcium, carbon and oxygen, bonded.', whyVn: 'Canxi, cacbon và oxi, liên kết với nhau.', whyFr: 'Calcium, carbone et oxygène, liés.' },
]

function VoteSide({ side, label, active, big }) {
  const blue = side === 'left'
  return (
    <div className={`flex flex-col items-center justify-center gap-2 rounded-3xl border-4 px-4 py-5 transition-all duration-300 shrink-0 ${active === null ? 'opacity-100' : active ? 'opacity-100 scale-105' : 'opacity-25'} ${blue ? 'border-[#1a5fa8] bg-[#e9f1fa] text-[#1a5fa8]' : 'border-[#c25e12] bg-[#fdf1e3] text-[#c25e12]'}`}>
      <Hand className={`${big ? 'w-[clamp(4rem,11vh,8rem)] h-[clamp(4rem,11vh,8rem)]' : 'w-20 h-20'} ${blue ? '-scale-x-100' : ''}`} strokeWidth={2.2} />
      <div className={`font-black uppercase tracking-wide ${big ? 'text-[clamp(1.2rem,3vh,2.2rem)]' : 'text-xl'}`}>{label}</div>
    </div>
  )
}

export function MixtureOrCompound({ lang = 'en', isDisplayMode = false }) {
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

  const verdict = shown ? card.compound : null

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl text-white bg-[#c25e12] shrink-0">
            <Hand className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {tr(lang, 'Mixture or Compound?', 'Hỗn hợp hay hợp chất?', 'Mélange ou composé ?')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Left hand: mixture. Right hand: compound. Everyone at once.', 'Tay trái: hỗn hợp. Tay phải: hợp chất. Cả lớp cùng lúc.', 'Main gauche : mélange. Main droite : composé. Tous ensemble.')}
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
      <div className="flex-1 min-h-0 flex items-center justify-center gap-[clamp(1rem,3vw,3rem)] p-4">
        {done ? (
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500 text-white"><Sparkles className="w-12 h-12" strokeWidth={2} /></div>
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>{tr(lang, 'All 14 done!', 'Xong cả 14!', 'Les 14 sont faits !')}</div>
          </div>
        ) : (
          <>
            <VoteSide side="left" label={tr(lang, 'Mixture', 'Hỗn hợp', 'Mélange')} active={verdict === null ? null : !verdict} big={big} />

            <div className="flex flex-col items-center gap-[clamp(0.75rem,3vh,2rem)] min-w-0 flex-1 max-w-[52rem]">
              <div className={`w-full rounded-3xl border-[6px] bg-white flex flex-col items-center justify-center text-center font-black text-[#2b2b2b] leading-tight shadow-sm px-8 ${verdict === null ? 'border-slate-300' : verdict ? 'border-[#c25e12]' : 'border-[#1a5fa8]'} ${big ? 'h-[clamp(11rem,28vh,19rem)] text-[clamp(2.6rem,8vh,5.5rem)]' : 'h-[10rem] text-5xl'}`}>
                <div>{card.en}</div>
                {tr(lang, null, card.vn, card.fr) && (
                  <div className={`font-bold text-slate-500 ${big ? 'text-[clamp(1.2rem,3.2vh,2.2rem)]' : 'text-xl'}`}>({tr(lang, null, card.vn, card.fr)})</div>
                )}
              </div>
              <div className="min-h-[clamp(5rem,14vh,9rem)] flex flex-col items-center justify-center gap-2 text-center">
                {shown ? (
                  <>
                    <div className={`rounded-full text-white font-black px-8 py-2 ${card.compound ? 'bg-[#c25e12]' : 'bg-[#1a5fa8]'} ${big ? 'text-[clamp(1.6rem,4vh,2.8rem)]' : 'text-2xl'}`}>
                      {card.compound ? tr(lang, 'Compound', 'Hợp chất', 'Composé') : tr(lang, 'Mixture', 'Hỗn hợp', 'Mélange')}
                    </div>
                    <div className={`font-bold text-slate-600 dark:text-slate-300 ${big ? 'text-[clamp(1.1rem,2.6vh,1.9rem)]' : 'text-lg'}`}>
                      {tr(lang, card.why, card.whyVn, card.whyFr)}
                    </div>
                  </>
                ) : (
                  <div className={`font-black text-slate-300 dark:text-slate-700 ${big ? 'text-7xl' : 'text-5xl'}`}>?</div>
                )}
              </div>
            </div>

            <VoteSide side="right" label={tr(lang, 'Compound', 'Hợp chất', 'Composé')} active={verdict} big={big} />
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
