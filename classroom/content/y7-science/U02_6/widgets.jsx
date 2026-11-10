// content/y7-science/U02_6/widgets.jsx
// Widgets for 2.6 Compounds and formulae. Three, and each does one thing a
// still slide cannot:
//
//   NameCompound       Flashcards for the naming rules. The elements appear;
//                      the class says the name; Show writes it with the new
//                      ending (-ide or -ate) in orange and the rule underneath.
//
//   FormulaReader      A formula read one symbol at a time. Each press lights up
//                      the next symbol, writes what it means ("H₂ → 2 hydrogen
//                      atoms", "O → no number → 1 oxygen atom") and adds those
//                      atoms to the particle. The last press counts the atoms
//                      and says element or compound.
//
//   ElementOrCompound  A full-slide game: a formula appears and everyone votes
//                      at once — LEFT hand element, RIGHT hand compound. Show
//                      gives the verdict and the reason. A clicker's Right
//                      arrow shows, then moves on.
//
// Showcase slides give a widget no isDisplayMode, so the first two draw their
// stage as ONE wide SVG (text scales with the panel) and keep only the buttons
// as HTML. Every SVG opens with a white plate.
import { useState, useEffect, useCallback } from 'react'
import { Undo2, ArrowRight, Eye, Shuffle, Sparkles, SkipForward, Hand, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const BLUE = '#1a5fa8'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const METAL = { fill: '#fbe7a1', stroke: '#b8912a' }
const NONMETAL = { fill: '#cfe5f5', stroke: '#4f8fbf' }

const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
const sub = (n) => String(n).split('').map((d) => SUB[+d]).join('')

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
 * WIDGET 1 — NAME THE COMPOUND
 * ============================================================= */
const E = {
  sodium: { sym: 'Na', metal: true },
  potassium: { sym: 'K', metal: true },
  calcium: { sym: 'Ca', metal: true },
  lithium: { sym: 'Li', metal: true },
  copper: { sym: 'Cu', metal: true },
  chlorine: { sym: 'Cl', metal: false },
  oxygen: { sym: 'O', metal: false },
  sulfur: { sym: 'S', metal: false },
  carbon: { sym: 'C', metal: false },
  nitrogen: { sym: 'N', metal: false },
}

// stem + ending = the compound's name; the ending is drawn in orange.
const NAME_CARDS = [
  { els: ['sodium', 'chlorine'], stem: 'sodium chlor', end: 'ide', vn: 'natri clorua', fr: 'chlorure de sodium' },
  { els: ['potassium', 'chlorine'], stem: 'potassium chlor', end: 'ide', vn: 'kali clorua', fr: 'chlorure de potassium' },
  { els: ['calcium', 'oxygen'], stem: 'calcium ox', end: 'ide', vn: 'canxi oxit', fr: 'oxyde de calcium' },
  { els: ['lithium', 'oxygen'], stem: 'lithium ox', end: 'ide', vn: 'liti oxit', fr: 'oxyde de lithium' },
  { els: ['sodium', 'sulfur'], stem: 'sodium sulf', end: 'ide', vn: 'natri sunfua', fr: 'sulfure de sodium' },
  { els: ['copper', 'sulfur', 'oxygen'], stem: 'copper sulf', end: 'ate', vn: 'đồng sunfat', fr: 'sulfate de cuivre' },
  { els: ['calcium', 'carbon', 'oxygen'], stem: 'calcium carbon', end: 'ate', vn: 'canxi cacbonat', fr: 'carbonate de calcium' },
  { els: ['potassium', 'nitrogen', 'oxygen'], stem: 'potassium nitr', end: 'ate', vn: 'kali nitrat', fr: 'nitrate de potassium' },
  { els: ['sodium', 'carbon', 'oxygen'], stem: 'sodium carbon', end: 'ate', vn: 'natri cacbonat', fr: 'carbonate de sodium' },
]

const TILE_W = 300
const PLUS_W = 70

export function NameCompound({ lang = 'en' }) {
  const [pos, setPos] = useState(0)
  const [shown, setShown] = useState(false)
  const card = NAME_CARDS[pos]
  const n = card.els.length
  const rowW = n * TILE_W + (n - 1) * PLUS_W
  const x0 = 560 - rowW / 2

  // Where the stem ends and the ending starts: an estimate of the name's width
  // at 96px, so the whole name sits roughly centred.
  const CH = 96 * 0.56
  const split = 560 - ((card.stem.length + card.end.length) * CH) / 2 + card.stem.length * CH
  const ate = card.end === 'ate'

  const next = () => {
    if (!shown) { setShown(true); return }
    setShown(false)
    setPos((p) => (p + 1) % NAME_CARDS.length)
  }
  const back = () => {
    if (shown) { setShown(false); return }
    setPos((p) => (p - 1 + NAME_CARDS.length) % NAME_CARDS.length)
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />
          <text x="1096" y="426" fontFamily={FONT} fontSize="22" fontWeight="bold" fill="#9aa5ae" textAnchor="end">{pos + 1} / {NAME_CARDS.length}</text>

          {card.els.map((name, k) => {
            const el = E[name]
            const x = x0 + k * (TILE_W + PLUS_W)
            const c = el.metal ? METAL : NONMETAL
            return (
              <g key={name + k}>
                <rect x={x} y="16" width={TILE_W} height="150" rx="18" fill={c.fill} stroke={c.stroke} strokeWidth="3" />
                <text x={x + TILE_W / 2} y="98" fontFamily={FONT} fontSize="70" fontWeight="bold" fill={INK} textAnchor="middle">{el.sym}</text>
                <text x={x + TILE_W / 2} y="146" fontFamily={FONT} fontSize="32" fill={MUTED} textAnchor="middle">{name}</text>
                {k < n - 1 && (
                  <text x={x + TILE_W + PLUS_W / 2} y="110" fontFamily={FONT} fontSize="56" fontWeight="bold" fill={INK} textAnchor="middle">+</text>
                )}
              </g>
            )
          })}

          <path d="M 560 178 v 32 m -14 -14 l 14 14 l 14 -14" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

          {shown ? (
            <g>
              <text x={split} y="304" fontFamily={FONT} fontSize="96" fontWeight="bold" fill={INK} textAnchor="end">{card.stem}</text>
              <text x={split} y="304" fontFamily={FONT} fontSize="96" fontWeight="bold" fill={KEY} textAnchor="start">{card.end}</text>
              <rect x="210" y="330" width="700" height="52" rx="26" fill="#fdf1e3" stroke={KEY} strokeWidth="2.5" />
              <text x="560" y="365" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={KEY} textAnchor="middle">
                {ate
                  ? tr(lang, 'Two elements + oxygen: ends in -ate', 'Hai nguyên tố + oxi: kết thúc bằng -ate', 'Deux éléments + oxygène : finit en -ate')
                  : tr(lang, 'Two elements: the non-metal ends in -ide', 'Hai nguyên tố: phi kim kết thúc bằng -ide', 'Deux éléments : non-métal finit en -ide')}
              </text>
              {/* The name in the class's other language: Vietnamese or French only. */}
              {tr(lang, null, card.vn, card.fr) && (
                <text x="560" y="420" fontFamily={FONT} fontSize="26" fill={MUTED} textAnchor="middle">({tr(lang, null, card.vn, card.fr)})</text>
              )}
            </g>
          ) : (
            <text x="560" y="320" fontFamily={FONT} fontSize="120" fontWeight="bold" fill="#c3cbd2" textAnchor="middle">?</text>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={pos === 0 && !shown} onClick={back}>{tr(lang, 'Back', 'Lùi', 'Retour')}</Btn>
        <Btn tone="orange" icon={shown ? ArrowRight : Eye} onClick={next}>
          {shown ? tr(lang, 'Next', 'Tiếp', 'Suivant') : tr(lang, 'Show the name', 'Hiện tên', 'Voir le nom')}
        </Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 2 — READ THE FORMULA
 * ============================================================= */
const ATOM = {
  H: { r: 30, fill: '#ffffff', stroke: '#6b7580', en: 'hydrogen', vn: 'hiđro', fr: 'd’hydrogène' },
  O: { r: 40, fill: '#f08b82', stroke: '#b3261e', en: 'oxygen', vn: 'oxi', fr: 'd’oxygène' },
  C: { r: 40, fill: '#aab4bc', stroke: '#3b444b', en: 'carbon', vn: 'cacbon', fr: 'de carbone' },
  S: { r: 44, fill: '#efe04a', stroke: '#8a7c00', en: 'sulfur', vn: 'lưu huỳnh', fr: 'de soufre' },
  Na: { r: 44, fill: '#d9c7ef', stroke: '#5c2483', en: 'sodium', vn: 'natri', fr: 'de sodium' },
  Ca: { r: 48, fill: '#fbe7a1', stroke: '#b8912a', en: 'calcium', vn: 'canxi', fr: 'de calcium' },
}

// parts: the formula in reading order; atoms: positions around the particle's
// centre, drawn touching like the book's particle diagrams.
const FORMULAE = [
  { parts: [['C', 1], ['O', 1]], atoms: [['C', -38, 0], ['O', 38, 0]] },
  { parts: [['C', 1], ['O', 2]], atoms: [['O', -76, 0], ['C', 0, 0], ['O', 76, 0]] },
  { parts: [['H', 2], ['O', 1]], atoms: [['H', -54, 26], ['H', 54, 26], ['O', 0, -20]] },
  { parts: [['C', 1], ['H', 4]], atoms: [['H', -48, -48], ['H', 48, -48], ['H', -48, 48], ['H', 48, 48], ['C', 0, 0]] },
  { parts: [['O', 2]], atoms: [['O', -38, 0], ['O', 38, 0]] },
  { parts: [['Ca', 1], ['O', 1]], atoms: [['Ca', -42, 0], ['O', 42, 0]] },
  { parts: [['H', 2], ['S', 1]], atoms: [['H', -58, 30], ['H', 58, 30], ['S', 0, -20]] },
  { parts: [['Na', 1], ['O', 1], ['H', 1]], atoms: [['Na', -80, 0], ['H', 66, 0], ['O', 0, 0]] },
  { parts: [['Ca', 1], ['C', 1], ['O', 3]], atoms: [['Ca', -112, 38], ['O', 40, -76], ['O', 106, 38], ['O', -26, 38], ['C', 40, 0]] },
]

// Fixed advances for the big formula, so a part can be boxed without measuring.
const ADV = { C: 82, O: 94, H: 90, S: 74, N: 90, a: 66 }
const SUB_ADV = 44

function layoutFormula(parts) {
  const glyphs = []
  const boxes = []
  let x = 0
  parts.forEach(([sym, n], p) => {
    const start = x
    sym.split('').forEach((ch) => {
      const w = ADV[ch] ?? 80
      glyphs.push({ ch, x: x + w / 2, sub: false, part: p })
      x += w
    })
    if (n > 1) {
      glyphs.push({ ch: String(n), x: x + SUB_ADV / 2, sub: true, part: p })
      x += SUB_ADV
    }
    boxes.push({ x: start, w: x - start })
  })
  return { glyphs, boxes, width: x }
}

export function FormulaReader({ lang = 'en' }) {
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(0) // 0 formula · 1..P parts · P+1 summary
  const f = FORMULAE[which]
  const P = f.parts.length
  const { glyphs, boxes, width } = layoutFormula(f.parts)
  const fx = 290 - width / 2
  const total = f.parts.reduce((s, [, n]) => s + n, 0)
  const kinds = P
  const lit = step >= 1 && step <= P ? step - 1 : -1

  const line = ([sym, n]) => {
    const a = ATOM[sym]
    // French carries its own "de"/"d’": 2 atomes d’hydrogène, 1 atome de carbone.
    const count = tr(lang,
      `${n} ${a.en} atom${n > 1 ? 's' : ''}`,
      `${n} nguyên tử ${a.vn}`,
      `${n} atome${n > 1 ? 's' : ''} ${a.fr}`)
    const none = n === 1 ? tr(lang, ' (no number)', ' (không có số)', ' (sans nombre)') : ''
    return `${sym}${n > 1 ? sub(n) : ''} → ${count}${none}`
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />
          <line x1="580" y1="24" x2="580" y2="416" stroke="#e2e8f0" strokeWidth="2" />
          <text x="28" y="34" fontFamily={FONT} fontSize="20" fontWeight="bold" fill="#9aa5ae" textAnchor="start">{which + 1} / {FORMULAE.length}</text>

          {lit >= 0 && (
            <rect x={fx + boxes[lit].x - 3} y="44" width={boxes[lit].w + 6} height="160" rx="14" fill="#fdf1e3" stroke={KEY} strokeWidth="4" />
          )}
          {glyphs.map((g, i) => (
            <text key={i} x={fx + g.x} y={g.sub ? 196 : 164} fontFamily={FONT} fontSize={g.sub ? 70 : 120} fontWeight="bold"
              fill={g.part === lit ? KEY : INK} textAnchor="middle">
              {g.ch}
            </text>
          ))}

          {f.parts.map((part, p) => (
            step > p && (
              <text key={p} x="40" y={264 + p * 44} fontFamily={FONT} fontSize="30" fontWeight={p === lit ? 'bold' : 'normal'} fill={p === lit ? KEY : INK}>
                {line(part)}
              </text>
            )
          ))}
          {step === 0 && (
            <text x="290" y="290" fontFamily={FONT} fontSize="30" fill="#9aa5ae" textAnchor="middle">
              {tr(lang, 'How many atoms? Which elements?', 'Bao nhiêu nguyên tử? Nguyên tố nào?', 'Combien d’atomes ? Quels éléments ?')}
            </text>
          )}

          {f.atoms.map(([sym, dx, dy], i) => {
            const a = ATOM[sym]
            const p = f.parts.findIndex(([s]) => s === sym)
            const on = step > p
            return (
              <g key={`${which}-${i}`} style={{ opacity: on ? 1 : 0, transition: 'opacity 450ms' }}>
                <circle cx={840 + dx} cy={180 + dy} r={a.r} fill={a.fill} stroke={p === lit ? KEY : a.stroke} strokeWidth={p === lit ? 5 : 3} />
                <text x={840 + dx} y={180 + dy + 10} fontFamily={FONT} fontSize="28" fontWeight="bold" fill={INK} textAnchor="middle">{sym}</text>
              </g>
            )
          })}

          {step > P && (
            <g>
              <text x="840" y="360" fontFamily={FONT} fontSize="42" fontWeight="bold" fill={INK} textAnchor="middle">
                {tr(lang, `${total} atoms in one particle`, `${total} nguyên tử trong một hạt`, `${total} atomes dans une particule`)}
              </text>
              <text x="840" y="406" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={kinds > 1 ? KEY : BLUE} textAnchor="middle">
                {kinds > 1
                  ? tr(lang, `a compound: ${kinds} kinds of atom`, `một hợp chất: ${kinds} loại nguyên tử`, 'un composé : ' + kinds + ' types d’atomes')
                  : tr(lang, 'an element: one kind of atom', 'một nguyên tố: một loại nguyên tử', 'un élément : 1 seul type d’atome')}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>{tr(lang, 'Back', 'Lùi', 'Retour')}</Btn>
        <Btn tone="orange" icon={ArrowRight} disabled={step === P + 1} onClick={() => setStep((s) => Math.min(P + 1, s + 1))}>{tr(lang, 'Next step', 'Bước tiếp', 'Étape suivante')}</Btn>
        <Btn tone="teal" icon={SkipForward} onClick={() => { setWhich((w) => (w + 1) % FORMULAE.length); setStep(0) }}>{tr(lang, 'Next formula', 'Công thức khác', 'Autre formule')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 3 — ELEMENT OR COMPOUND?
 * ============================================================= */
const CARDS = [
  { f: 'N2', compound: false, en: 'Two atoms, but both are nitrogen.', vn: 'Hai nguyên tử, nhưng đều là nitơ.', fr: 'Deux atomes, mais tous deux d’azote.' },
  { f: 'H2O', compound: true, en: 'Hydrogen and oxygen.', vn: 'Hiđro và oxi.', fr: 'Hydrogène et oxygène.' },
  { f: 'Fe', compound: false, en: 'Only iron.', vn: 'Chỉ có sắt.', fr: 'Seulement du fer.' },
  { f: 'CO2', compound: true, en: 'Carbon and oxygen.', vn: 'Cacbon và oxi.', fr: 'Carbone et oxygène.' },
  { f: 'S8', compound: false, en: 'Eight atoms, all sulfur.', vn: 'Tám nguyên tử, đều là lưu huỳnh.', fr: 'Huit atomes, tous de soufre.' },
  { f: 'MgO', compound: true, en: 'Magnesium and oxygen.', vn: 'Magie và oxi.', fr: 'Magnésium et oxygène.' },
  { f: 'Ne', compound: false, en: 'Only neon.', vn: 'Chỉ có neon.', fr: 'Seulement du néon.' },
  { f: 'KCl', compound: true, en: 'Potassium and chlorine.', vn: 'Kali và clo.', fr: 'Potassium et chlore.' },
  { f: 'Cl2', compound: false, en: 'Both atoms are chlorine.', vn: 'Cả hai nguyên tử đều là clo.', fr: 'Les deux atomes sont du chlore.' },
  { f: 'CH4', compound: true, en: 'Carbon and hydrogen.', vn: 'Cacbon và hiđro.', fr: 'Carbone et hydrogène.' },
  { f: 'Co', compound: false, en: 'Co is cobalt: one element. (Small o!)', vn: 'Co là coban: một nguyên tố. (Chữ o thường!)', fr: 'Co, c’est le cobalt : un élément. (o minuscule !)' },
  { f: 'CO', compound: true, en: 'C and O: carbon and oxygen. (Capital O!)', vn: 'C và O: cacbon và oxi. (Chữ O hoa!)', fr: 'C et O : carbone et oxygène. (O majuscule !)' },
  { f: 'O3', compound: false, en: 'Three atoms, all oxygen.', vn: 'Ba nguyên tử, đều là oxi.', fr: 'Trois atomes, tous d’oxygène.' },
  { f: 'NaOH', compound: true, en: 'Sodium, oxygen and hydrogen.', vn: 'Natri, oxi và hiđro.', fr: 'Sodium, oxygène et hydrogène.' },
  { f: 'Cu', compound: false, en: 'Only copper.', vn: 'Chỉ có đồng.', fr: 'Seulement du cuivre.' },
  { f: 'CaCO3', compound: true, en: 'Calcium, carbon and oxygen.', vn: 'Canxi, cacbon và oxi.', fr: 'Calcium, carbone et oxygène.' },
]

// Digits in a formula are subscripts. Real <sub> markup, because the Unicode
// subscript digits fall back to a font that draws them almost full size.
function Formula({ text }) {
  return (
    <span>
      {text.split(/(\d+)/).filter(Boolean).map((part, i) => (/^\d+$/.test(part)
        ? <sub key={i} className="text-[0.55em] align-baseline relative top-[0.3em]">{part}</sub>
        : <span key={i}>{part}</span>))}
    </span>
  )
}

function VoteSide({ side, label, active, big }) {
  const blue = side === 'left'
  return (
    <div className={`flex flex-col items-center justify-center gap-2 rounded-3xl border-4 px-4 py-5 transition-all duration-300 ${active === null ? 'opacity-100' : active ? 'opacity-100 scale-105' : 'opacity-25'} ${blue ? 'border-[#1a5fa8] bg-[#e9f1fa] text-[#1a5fa8]' : 'border-[#c25e12] bg-[#fdf1e3] text-[#c25e12]'}`}>
      <Hand className={`${big ? 'w-[clamp(4rem,11vh,8rem)] h-[clamp(4rem,11vh,8rem)]' : 'w-20 h-20'} ${blue ? '-scale-x-100' : ''}`} strokeWidth={2.2} />
      <div className={`font-black uppercase tracking-wide ${big ? 'text-[clamp(1.2rem,3vh,2.2rem)]' : 'text-xl'}`}>{label}</div>
    </div>
  )
}

export function ElementOrCompound({ lang = 'en', isDisplayMode = false }) {
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
              {tr(lang, 'Element or Compound?', 'Nguyên tố hay hợp chất?', 'Élément ou composé ?')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Left hand: element. Right hand: compound. Everyone at once.', 'Tay trái: nguyên tố. Tay phải: hợp chất. Cả lớp cùng lúc.', 'Main gauche : élément. Main droite : composé. Tous ensemble.')}
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
      <div className="flex-1 min-h-0 flex items-center justify-center gap-[clamp(1rem,4vw,4rem)] p-4">
        {done ? (
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500 text-white"><Sparkles className="w-12 h-12" strokeWidth={2} /></div>
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>{tr(lang, 'All 16 done!', 'Xong cả 16!', 'Les 16 sont faits !')}</div>
          </div>
        ) : (
          <>
            <VoteSide side="left" label={tr(lang, 'Element', 'Nguyên tố', 'Élément')} active={verdict === null ? null : !verdict} big={big} />

            <div className="flex flex-col items-center gap-[clamp(0.75rem,3vh,2rem)] min-w-0">
              <div className={`rounded-3xl border-[6px] bg-white flex items-center justify-center font-black text-[#2b2b2b] leading-none shadow-sm px-10 ${verdict === null ? 'border-slate-300' : verdict ? 'border-[#c25e12]' : 'border-[#1a5fa8]'} ${big ? 'min-w-[clamp(16rem,36vh,26rem)] h-[clamp(11rem,28vh,19rem)] text-[clamp(5rem,15vh,11rem)]' : 'min-w-[14rem] h-[10rem] text-7xl'}`}>
                <Formula text={card.f} />
              </div>
              <div className="min-h-[clamp(5rem,14vh,9rem)] flex flex-col items-center justify-center gap-2 text-center">
                {shown ? (
                  <>
                    <div className={`rounded-full text-white font-black px-8 py-2 ${card.compound ? 'bg-[#c25e12]' : 'bg-[#1a5fa8]'} ${big ? 'text-[clamp(1.6rem,4vh,2.8rem)]' : 'text-2xl'}`}>
                      {card.compound ? tr(lang, 'Compound', 'Hợp chất', 'Composé') : tr(lang, 'Element', 'Nguyên tố', 'Élément')}
                    </div>
                    <div className={`font-bold text-slate-600 dark:text-slate-300 ${big ? 'text-[clamp(1.1rem,2.6vh,1.9rem)]' : 'text-lg'}`}>
                      {tr(lang, card.en, card.vn, card.fr)}
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
