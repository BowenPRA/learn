// content/y7-science/U02_4/widgets.jsx
// One widget for 2.4, and it does the one thing a still slide cannot: put the
// four -ation words up together, in a random order, twelve times, so every
// student has to choose between them rather than read the one on the screen.
//
// WhichStage — an everyday sentence appears with the four words underneath.
// The class says the word (or writes it), then Show lights the right one and
// gives the reason in six words. A presenter clicker's Right arrow shows, then
// moves on, exactly as SymbolSnap and MixtureOrCompound do.
//
// The traps in the card list are deliberate and all come from the lesson:
// mist, breath and the cold glass are CONDENSATION, not evaporation, because
// what you can see is already liquid (the VAPOUR_GAP diagram); the rice field
// is TRANSPIRATION, not evaporation, because the water leaves through plants.
import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, Eye, Shuffle, Sparkles, Droplets, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const STAGES = [
  { id: 'evaporation', en: 'evaporation', vn: 'bay hơi', fr: 'évaporation', color: '#1a5fa8' },
  { id: 'transpiration', en: 'transpiration', vn: 'thoát hơi nước', fr: 'transpiration', color: '#4a8b23' },
  { id: 'condensation', en: 'condensation', vn: 'ngưng tụ', fr: 'condensation', color: '#0087a8' },
  { id: 'precipitation', en: 'precipitation', vn: 'giáng thủy', fr: 'précipitations', color: '#c25e12' },
]

const CARDS = [
  {
    en: 'A puddle on the road disappears.', vn: 'Một vũng nước trên đường biến mất.', fr: 'Une flaque sur la route disparaît.',
    a: 'evaporation', why: 'Liquid to gas, straight into the air.', whyVn: 'Từ lỏng thành khí, bay thẳng vào không khí.', whyFr: 'Du liquide au gaz, directement dans l’air.',
  },
  {
    en: 'Drops form on a cold glass of iced coffee.', vn: 'Giọt nước đọng trên ly cà phê đá lạnh.', fr: 'Des gouttes se forment sur un verre de café glacé.',
    a: 'condensation', why: 'The gas in the air cooled and became liquid.', whyVn: 'Khí trong không khí lạnh đi và thành chất lỏng.', whyFr: 'Le gaz de l’air a refroidi et est devenu liquide.',
  },
  {
    en: 'Rain falls on Hanoi.', vn: 'Mưa rơi xuống Hà Nội.', fr: 'La pluie tombe sur Hanoi.',
    a: 'precipitation', why: 'It fell out of the cloud.', whyVn: 'Nó rơi xuống từ đám mây.', whyFr: 'Elle est tombée du nuage.',
  },
  {
    en: 'A rice field loses water through the rice plants.', vn: 'Ruộng lúa mất nước qua cây lúa.', fr: 'Une rizière perd de l’eau par les plants de riz.',
    a: 'transpiration', why: 'Out of the leaves. Not off the ground.', whyVn: 'Qua lá cây, không phải từ mặt đất.', whyFr: 'Par les feuilles. Pas par le sol.',
  },
  {
    en: 'A cloud forms high in the sky.', vn: 'Một đám mây hình thành trên cao.', fr: 'Un nuage se forme haut dans le ciel.',
    a: 'condensation', why: 'Gas to liquid. A cloud is tiny drops.', whyVn: 'Từ khí thành lỏng. Mây là những giọt nước nhỏ.', whyFr: 'Du gaz au liquide. Un nuage, c’est de petites gouttes.',
  },
  {
    en: 'Wet clothes dry in the sun.', vn: 'Quần áo ướt khô dưới nắng.', fr: 'Des vêtements mouillés sèchent au soleil.',
    a: 'evaporation', why: 'The Sun gives the particles energy.', whyVn: 'Mặt Trời cho các hạt năng lượng.', whyFr: 'Le Soleil donne de l’énergie aux particules.',
  },
  {
    en: 'Hail bounces off the road.', vn: 'Mưa đá nảy trên mặt đường.', fr: 'La grêle rebondit sur la route.',
    a: 'precipitation', why: 'Rain, snow, hail and sleet are all this.', whyVn: 'Mưa, tuyết, mưa đá và mưa tuyết đều là nó.', whyFr: 'Pluie, neige, grêle et grésil : c’est le même mot.',
  },
  {
    en: 'Mist sits on a lake at sunrise.', vn: 'Sương mù nằm trên mặt hồ lúc bình minh.', fr: 'De la brume flotte sur un lac au lever du soleil.',
    a: 'condensation', why: 'You can see it, so it is already liquid.', whyVn: 'Em nhìn thấy được, nên nó đã là chất lỏng.', whyFr: 'Tu la vois, donc c’est déjà du liquide.',
  },
  {
    en: 'The sea warms up and water goes into the air.', vn: 'Biển ấm lên và nước đi vào không khí.', fr: 'La mer se réchauffe et l’eau monte dans l’air.',
    a: 'evaporation', why: 'The biggest one. Most of it comes from the sea.', whyVn: 'Lớn nhất. Phần lớn nước đến từ biển.', whyFr: 'La plus grande. L’essentiel vient de la mer.',
  },
  {
    en: 'Your breath makes a white cloud on a cold morning.', vn: 'Hơi thở tạo làn khói trắng vào sáng lạnh.', fr: 'Ton souffle fait un nuage blanc par un matin froid.',
    a: 'condensation', why: 'The cold air turned your breath into drops.', whyVn: 'Không khí lạnh biến hơi thở thành giọt nước.', whyFr: 'L’air froid a changé ton souffle en gouttes.',
  },
  {
    en: 'A forest puts water vapour into the air.', vn: 'Một khu rừng đưa hơi nước vào không khí.', fr: 'Une forêt envoie de la vapeur d’eau dans l’air.',
    a: 'transpiration', why: 'Water vapour, but it came out of plants.', whyVn: 'Vẫn là hơi nước, nhưng đi ra từ cây.', whyFr: 'De la vapeur d’eau, mais sortie des plantes.',
  },
  {
    en: 'Snow lands on a mountain in Sa Pa.', vn: 'Tuyết rơi xuống núi ở Sa Pa.', fr: 'La neige tombe sur une montagne à Sa Pa.',
    a: 'precipitation', why: 'Frozen, but it still fell from a cloud.', whyVn: 'Đóng băng, nhưng vẫn rơi từ đám mây.', whyFr: 'Gelée, mais elle est quand même tombée d’un nuage.',
  },
]

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

export function WhichStage({ lang = 'en', isDisplayMode = false }) {
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
          <div className="p-2 rounded-xl text-white bg-[#0087a8] shrink-0">
            <Droplets className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {tr(lang, 'Which Stage?', 'Giai đoạn nào?', 'Quelle étape ?')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Write the word. Then we check.', 'Viết từ đó ra. Rồi mình kiểm tra.', 'Écris le mot. Puis on vérifie.')}
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
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-[clamp(0.75rem,2.5vh,1.75rem)] p-4">
        {done ? (
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500 text-white"><Sparkles className="w-12 h-12" strokeWidth={2} /></div>
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>
              {tr(lang, 'All 12 done!', 'Xong cả 12!', 'Les 12 terminées !')}
            </div>
          </div>
        ) : (
          <>
            <div className={`w-full max-w-[62rem] rounded-3xl border-[6px] border-slate-300 bg-white flex flex-col items-center justify-center text-center font-black text-[#2b2b2b] leading-tight shadow-sm px-8 ${big ? 'h-[clamp(9rem,24vh,16rem)] text-[clamp(1.9rem,5.2vh,3.6rem)]' : 'h-[8.5rem] text-3xl'}`}>
              <div>{card.en}</div>
              {lang !== 'en' && (
                <div className={`font-bold text-slate-500 ${big ? 'text-[clamp(1.1rem,2.8vh,2rem)]' : 'text-lg'}`}>({tr(lang, card.en, card.vn, card.fr)})</div>
              )}
            </div>

            {/* The four words, always all four */}
            <div className="flex items-stretch justify-center gap-[clamp(0.5rem,1.4vw,1.25rem)] flex-wrap">
              {STAGES.map((s) => {
                const right = shown && s.id === card.a
                const dim = shown && s.id !== card.a
                return (
                  <div
                    key={s.id}
                    className={`rounded-2xl border-4 font-black text-center transition-all duration-300 ${big ? 'px-[clamp(0.75rem,1.6vw,1.75rem)] py-[clamp(0.4rem,1.2vh,0.9rem)] text-[clamp(1.05rem,2.7vh,2rem)]' : 'px-4 py-2 text-lg'} ${dim ? 'opacity-20' : 'opacity-100'} ${right ? 'scale-105 text-white' : 'bg-white dark:bg-slate-900'}`}
                    style={right ? { backgroundColor: s.color, borderColor: s.color } : { borderColor: s.color, color: s.color }}
                  >
                    <div>{s.en}</div>
                    {lang !== 'en' && tr(lang, s.en, s.vn, s.fr) !== s.en && (
                      <div className={`font-bold ${big ? 'text-[clamp(0.75rem,1.7vh,1.15rem)]' : 'text-xs'} ${right ? 'text-white/85' : 'opacity-70'}`}>{tr(lang, s.en, s.vn, s.fr)}</div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className={`min-h-[clamp(2.5rem,7vh,4.5rem)] flex items-center justify-center text-center px-6`}>
              {shown ? (
                <div className={`font-bold text-slate-600 dark:text-slate-300 ${big ? 'text-[clamp(1.1rem,2.8vh,2rem)]' : 'text-lg'}`}>
                  {tr(lang, card.why, card.whyVn, card.whyFr)}
                </div>
              ) : (
                <div className={`font-black text-slate-300 dark:text-slate-700 ${big ? 'text-6xl' : 'text-4xl'}`}>?</div>
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
