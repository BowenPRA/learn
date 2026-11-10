// content/y7-science/U02_8/widgets.jsx
// Widgets for 2.8 Acids and bases. Two, and each does one thing a still slide
// cannot:
//
//   PhDipper   Eleven everyday liquids, dipped one at a time. The class says
//              acid, neutral or alkali BEFORE the press; the press colours the
//              paper, drops a marker onto the 1-14 scale and prints the number.
//              A stepper like 2.5's HalvingWidget: nothing appears until it is
//              pressed, so a slide full of answers never spoils the guessing.
//              Walking the list left to right also walks the scale from pH 2 to
//              pH 13, so the marker crawls across the colours in order.
//
//   AcidSnap   Quick-fire recall from the front, like 2.5's Symbol Snap and
//              2.4's Which Stage. A different twelve from the dipper's eleven,
//              so it is recall on new examples rather than a second look at the
//              same ones. The whole room says it out loud, then Show. Full-slide
//              `game` layout, so it gets isDisplayMode.
//
// NOTE: `npm run audit:svg` reads diagrams.js and slides.js only, so nothing
// checks the <text> in here. The scale below is sized by hand to end inside the
// 1120 frame (14 cells of 60 from x=240 ends at 1080), and every label is sized
// against its Vietnamese twin, which is the longer of the two. Changing a cell
// width or a font size here means re-checking the widget by eye.
//
// A showcase slide hands a widget a short wide box and no isDisplayMode, so
// PhDipper draws its stage as ONE wide SVG (text scales with the panel) and
// keeps only the buttons as HTML. Every SVG opens with a white plate, so it
// reads the same on a light or dark slide.
import { useState, useEffect, useCallback } from 'react'
import { Undo2, RotateCcw, ArrowRight, Eye, Shuffle, Droplet, FlaskConical, Sparkles } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const ACID_S = '#c0392b'
const BASE_S = '#2c6fbb'
const NEUT_S = '#2f8f3f'

// Universal indicator, pH 1 at the left to pH 14 at the right. Same list as
// diagrams.js — the drawn scale on the Draw This slide and the widget's scale
// must be the same colours, or the class is learning two different pictures.
const PH = [
  '#d7191c', '#e8462c', '#f06e28', '#f79b2c', '#fac432', '#ecdf2a', '#4caf50',
  '#24a58c', '#1f8ac0', '#1f6bb5', '#2f4fa3', '#4a2f96', '#63258c', '#7a1f7a',
]
const phColour = (n) => PH[Math.min(14, Math.max(1, n)) - 1]

const verdict = (ph) => (ph < 7 ? 'acid' : ph > 7 ? 'alkali' : 'neutral')
const VERDICT = {
  acid: { en: 'ACID', vn: 'AXIT', fr: 'ACIDE', colour: ACID_S },
  neutral: { en: 'NEUTRAL', vn: 'TRUNG TÍNH', fr: 'NEUTRE', colour: NEUT_S },
  alkali: { en: 'ALKALI', vn: 'KIỀM', fr: 'ALCALIN', colour: BASE_S },
}

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
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${tones[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  )
}

/* ============================================================= *
 * WIDGET 1 — DIP THE PAPER
 * ============================================================= */
// In pH order, so the marker walks the scale from left to right.
const LIQUIDS = [
  { en: 'lemon juice', vn: 'nước chanh', fr: 'jus de citron', ph: 2 },
  { en: 'vinegar', vn: 'giấm', fr: 'vinaigre', ph: 3 },
  { en: 'orange juice', vn: 'nước cam', fr: 'jus d’orange', ph: 4 },
  { en: 'black coffee', vn: 'cà phê đen', fr: 'café noir', ph: 5 },
  { en: 'milk', vn: 'sữa', fr: 'lait', ph: 6 },
  { en: 'pure water', vn: 'nước tinh khiết', fr: 'eau pure', ph: 7 },
  { en: 'sea water', vn: 'nước biển', fr: 'eau de mer', ph: 8 },
  { en: 'baking soda', vn: 'bột nở', fr: 'bicarbonate', ph: 9 },
  { en: 'soap', vn: 'nước xà phòng', fr: 'eau savonneuse', ph: 10 },
  { en: 'limewater', vn: 'nước vôi trong', fr: 'eau de chaux', ph: 12 },
  { en: 'oven cleaner', vn: 'nước tẩy lò', fr: 'décape-four', ph: 13 },
]

const CELL_W = 60
const cellX = (n) => 240 + (n - 1) * CELL_W

export function PhDipper({ lang = 'en' }) {
  const [i, setI] = useState(0)
  const [wet, setWet] = useState(false)

  const liquid = LIQUIDS[i]
  const v = VERDICT[verdict(liquid.ph)]
  const paper = wet ? phColour(liquid.ph) : '#e8edf1'
  const last = i === LIQUIDS.length - 1

  const advance = () => {
    if (!wet) { setWet(true); return }
    if (!last) { setI((n) => n + 1); setWet(false) }
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          {/* the liquid, in a beaker */}
          <rect x="16" y="16" width="252" height="262" rx="18" fill="#f4f7f9" stroke="#cfd8dc" strokeWidth="3" />
          <path d="M 103 74 v 120 q 0 13 13 13 h 52 q 13 0 13 -13 v -120" fill="#ffffff" stroke="#6b7a86" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M 103 118 v 76 q 0 13 13 13 h 52 q 13 0 13 -13 v -76 Z" fill={wet ? phColour(liquid.ph) : '#dbe6ec'} />
          <path d="M 103 74 v 120 q 0 13 13 13 h 52 q 13 0 13 -13 v -120" fill="none" stroke="#6b7a86" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M 93 71 q 10 8 20 3" fill="none" stroke="#6b7a86" strokeWidth="3.5" strokeLinecap="round" />
          <text x="142" y="254" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={INK} textAnchor="middle">
            {tr(lang, liquid.en, liquid.vn, liquid.fr)}
          </text>

          {/* the paper */}
          <rect x="282" y="16" width="192" height="262" rx="18" fill="#f4f7f9" stroke="#cfd8dc" strokeWidth="3" />
          <path d="M 356 54 h 44 v 170 h -44 Z" fill="#e8edf1" stroke="#6b7a86" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 356 140 h 44 v 84 h -44 Z" fill={paper} stroke="#6b7a86" strokeWidth="3" strokeLinejoin="round" />
          {!wet && <text x="378" y="196" fontFamily={FONT} fontSize="54" fontWeight="bold" fill="#aeb9c2" textAnchor="middle">?</text>}
          <text x="378" y="254" fontFamily={FONT} fontSize="22" fill={MUTED} textAnchor="middle">
            {tr(lang, 'indicator paper', 'giấy chỉ thị', 'papier pH')}
          </text>

          {/* the verdict */}
          <rect x="488" y="16" width="616" height="262" rx="18" fill={wet ? '#fdf1e3' : '#f4f7f9'} stroke={wet ? KEY : '#cfd8dc'} strokeWidth="3" />
          {wet ? (
            <>
              <text x="796" y="122" fontFamily={FONT} fontSize="96" fontWeight="bold" fill={v.colour} textAnchor="middle">
                {tr(lang, v.en, v.vn, v.fr)}
              </text>
              <text x="796" y="218" fontFamily={FONT} fontSize="76" fontWeight="bold" fill={INK} textAnchor="middle">
                pH {liquid.ph}
              </text>
              <text x="796" y="258" fontFamily={FONT} fontSize="26" fill={MUTED} textAnchor="middle">
                {liquid.ph < 7
                  ? tr(lang, 'below 7', 'nhỏ hơn 7', 'moins de 7')
                  : liquid.ph > 7
                    ? tr(lang, 'above 7', 'lớn hơn 7', 'plus de 7')
                    : tr(lang, 'exactly 7', 'đúng bằng 7', 'égal à 7')}
              </text>
            </>
          ) : (
            <>
              <text x="796" y="130" fontFamily={FONT} fontSize="38" fontWeight="bold" fill="#9aa5ae" textAnchor="middle">
                {tr(lang, 'Acid, neutral or alkali?', 'Axit, trung tính hay kiềm?', 'Acide, neutre ou alcalin ?')}
              </text>
              <text x="796" y="200" fontFamily={FONT} fontSize="32" fill="#aeb9c2" textAnchor="middle">
                {tr(lang, 'Say it, then dip the paper.', 'Nói đáp án, rồi nhúng giấy.', 'Dis-le. Trempe le papier.')}
              </text>
            </>
          )}

          {/* the scale */}
          {PH.map((c, k) => (
            <rect key={k} x={cellX(k + 1)} y="330" width={CELL_W} height="60" fill={c} stroke="#ffffff" strokeWidth="2" />
          ))}
          {PH.map((_, k) => (
            <text key={k} x={cellX(k + 1) + CELL_W / 2} y="372" fontFamily={FONT} fontSize="28" fontWeight="bold" fill={k === 5 ? INK : '#ffffff'} textAnchor="middle">
              {k + 1}
            </text>
          ))}
          <text x="140" y="372" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={INK} textAnchor="middle">
            {tr(lang, 'pH scale', 'thang pH', 'échelle pH')}
          </text>
          {wet && (
            <g>
              <path
                d={`M ${cellX(liquid.ph) + CELL_W / 2} 322 l -18 -24 h 36 Z`}
                fill={INK}
              />
              <rect x={cellX(liquid.ph) - 2} y="328" width={CELL_W + 4} height="64" fill="none" stroke={INK} strokeWidth="5" />
            </g>
          )}
          <text x="560" y="428" fontFamily={FONT} fontSize="24" fill={MUTED} textAnchor="middle">
            {tr(lang, 'red = acid  ·  green = neutral  ·  blue and purple = alkali', 'đỏ = axit  ·  xanh lá = trung tính  ·  xanh dương và tím = kiềm', 'rouge = acide  ·  vert = neutre  ·  bleu et violet = alcalin')}
          </text>
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={i === 0 && !wet} onClick={() => (wet ? setWet(false) : (setI((n) => n - 1), setWet(true)))}>
          {tr(lang, 'Back', 'Lùi', 'Retour')}
        </Btn>
        <Btn tone="orange" icon={wet ? ArrowRight : Droplet} disabled={wet && last} onClick={advance}>
          {wet ? tr(lang, 'Next liquid', 'Chất tiếp theo', 'Liquide suivant') : tr(lang, 'Dip the paper', 'Nhúng giấy', 'Trempe le papier')}
        </Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={i === 0 && !wet} onClick={() => { setI(0); setWet(false) }}>
          {tr(lang, 'Start again', 'Làm lại', 'Recommencer')}
        </Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 2 — ACID SNAP
 * ============================================================= */
// Twelve that the dipper did NOT show, so this is recall, not a repeat.
const CARDS = [
  { en: 'tamarind', vn: 'quả me', fr: 'tamarin', ph: 3 },
  { en: 'toothpaste', vn: 'kem đánh răng', fr: 'dentifrice', ph: 9 },
  { en: 'tap water', vn: 'nước máy', fr: 'eau du robinet', ph: 7 },
  { en: 'car battery acid', vn: 'axit ắc quy', fr: 'acide de batterie', ph: 1 },
  { en: 'an indigestion tablet', vn: 'viên thuốc đau dạ dày', fr: 'un comprimé antiacide', ph: 10 },
  { en: 'cola', vn: 'nước cô-ca', fr: 'cola', ph: 3 },
  { en: 'shampoo', vn: 'dầu gội', fr: 'shampooing', ph: 8 },
  { en: 'the acid in your stomach', vn: 'axit trong dạ dày', fr: 'l’acide de ton estomac', ph: 2 },
  { en: 'salty water', vn: 'nước muối', fr: 'eau salée', ph: 7 },
  { en: 'an ant bite', vn: 'vết kiến cắn', fr: 'une piqûre de fourmi', ph: 3 },
  { en: 'oven cleaner', vn: 'nước tẩy lò', fr: 'décape-four', ph: 13 },
  { en: 'green tea', vn: 'trà xanh', fr: 'thé vert', ph: 6 },
]

const ORDER = CARDS.map((_, k) => k)

export function AcidSnap({ lang = 'en', isDisplayMode = false }) {
  const [order, setOrder] = useState(ORDER)
  const [pos, setPos] = useState(0)
  const [shown, setShown] = useState(false)

  const done = pos >= order.length
  const card = done ? null : CARDS[order[pos]]
  const v = card ? VERDICT[verdict(card.ph)] : null
  const big = isDisplayMode

  const advance = useCallback(() => {
    if (done) return
    if (!shown) { setShown(true); return }
    setShown(false)
    setPos((p) => p + 1)
  }, [done, shown])

  const deal = () => {
    const next = [...ORDER]
    for (let k = next.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1))
      ;[next[k], next[j]] = [next[j], next[k]]
    }
    setOrder(next)
    setPos(0)
    setShown(false)
  }

  // A presenter clicker sends arrow keys: first press shows, second moves on.
  // Not Space or Enter — those already click whichever button has focus.
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
            <FlaskConical className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {tr(lang, 'Acid Snap', 'Đoán nhanh axit', 'Acide express')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Everyone says it out loud. Then press Show.', 'Cả lớp nói to. Rồi bấm Hiện.', 'Tout le monde le dit à voix haute. Puis appuie sur Voir.')}
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
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>
              {tr(lang, 'All twelve done!', 'Xong cả mười hai!', 'Les douze sont faits !')}
            </div>
          </>
        ) : (
          <>
            <div className={`font-black uppercase tracking-[0.2em] text-[#c25e12] ${big ? 'text-[clamp(1rem,2.2vh,1.6rem)]' : 'text-sm'}`}>
              {tr(lang, 'Acid, neutral or alkali?', 'Axit, trung tính hay kiềm?', 'Acide, neutre ou alcalin ?')}
            </div>

            <div className="text-center">
              <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-[clamp(3rem,8vh,6rem)]' : 'text-4xl sm:text-5xl'}`}>
                {tr(lang, card.en, card.vn, card.fr)}
              </div>
            </div>

            <div className="min-h-[clamp(9rem,26vh,17rem)] flex flex-col items-center justify-center gap-3">
              {shown ? (
                <>
                  <div
                    className={`rounded-2xl border-4 px-[clamp(1.5rem,4vh,3rem)] py-[clamp(0.5rem,1.5vh,1.25rem)] font-black text-white leading-none ${big ? 'text-[clamp(3rem,9vh,7rem)]' : 'text-5xl'}`}
                    style={{ backgroundColor: v.colour, borderColor: v.colour }}
                  >
                    {tr(lang, v.en, v.vn, v.fr)}
                  </div>
                  <div
                    className={`rounded-full border-4 bg-white dark:bg-slate-900 font-black px-6 py-1.5 ${big ? 'text-[clamp(1.6rem,4vh,3rem)]' : 'text-2xl'}`}
                    style={{ color: INK, borderColor: phColour(card.ph) }}
                  >
                    pH {card.ph}
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
      </div>
    </div>
  )
}
