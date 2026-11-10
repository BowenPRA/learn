// content/y7-science/U02_5/widgets.jsx
// Widgets for 2.5 Atoms, elements and the Periodic Table. Three, and each does
// one thing a still slide cannot:
//
//   HalvingWidget   Democritus's question as a count. Press to halve Mr Bowen's
//                   1 cm gold cube; the class counts aloud and watches the width
//                   pass a grain of sand, a hair, a cell, a virus — and reach one
//                   gold atom after only 25 halvings. A stepper, like 1.1's scale
//                   calculator: nothing is revealed until it is pressed.
//
//   PeriodicTable   The book's first-20 table (p.54), drawn once, in four modes.
//                   Each slide gets ONE mode with one job, so no slide carries a
//                   control panel: TableRowsCols (a period is a row, a group is a
//                   column), TableMass (lightest to heaviest, in reading order),
//                   TableMetals (yellow, then blue) and TableExplore (tap an
//                   element to check answers to the book questions). Whatever is
//                   highlighted keeps its colour and gains a heavy outline;
//                   everything else drops to flat grey.
//
//   SymbolSnap      The book's Activity — "make a game to learn the symbols" —
//                   played once from the front. A name appears; everyone writes
//                   the symbol; Show reveals it and HOW it was made (first letter,
//                   first letter + another, or the Latin name). Switch turns it
//                   round. Full-slide `game` layout, so it gets isDisplayMode.
//
// Showcase slides hand a widget a short wide box and no isDisplayMode, so the
// first two draw their stage as ONE wide SVG (text scales with the panel) and
// keep only the buttons as HTML. Every SVG opens with a white plate, so it reads
// the same on a light or dark slide.
import { useState, useEffect, useCallback } from 'react'
import { Scissors, Undo2, RotateCcw, ArrowRight, Eye, Shuffle, ArrowLeftRight, Sparkles, Atom } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const GOLD = '#d4a017'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const METAL = { fill: '#fbe7a1', stroke: '#b8912a' }
const NONMETAL = { fill: '#cfe5f5', stroke: '#4f8fbf' }
const PLAIN = { fill: '#ffffff', stroke: '#8a979e' }
const OFF = { fill: '#eef1f4', stroke: '#d5dbe1', text: '#b8c1ca', name: '#c8d0d7' }

// An element's name in the deck's language, shown beside the English one. A
// French name spelled exactly like the English is not repeated.
const localName = (lang, el) => {
  if (lang === 'en') return ''
  const name = tr(lang, el.en, el.vn, el.fr)
  return lang === 'fr' && name === el.en ? '' : name
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
 * WIDGET 1 — HALF, AND HALF AGAIN
 * ============================================================= */
const LAST_CUT = 25
const MILESTONES = [
  { n: 0, en: 'gold cube', vn: 'khối vàng', fr: 'cube d’or', longEn: "Mr Bowen's gold cube", longVn: 'Khối vàng của thầy Bowen', longFr: 'Le cube d’or de M. Bowen' },
  { n: 3, en: 'sand', vn: 'hạt cát', fr: 'sable', longEn: 'a grain of sand', longVn: 'một hạt cát', longFr: 'un grain de sable' },
  { n: 7, en: 'hair', vn: 'sợi tóc', fr: 'cheveu', longEn: 'as thin as a hair', longVn: 'mỏng như sợi tóc', longFr: 'fin comme un cheveu' },
  { n: 9, en: 'cell', vn: 'tế bào', fr: 'cellule', longEn: 'one cell (Unit 1)', longVn: 'một tế bào (Bài 1)', longFr: 'une cellule (Unité 1)' },
  { n: 13, en: 'bacterium', vn: 'vi khuẩn', fr: 'bactérie', longEn: 'a bacterium', longVn: 'một vi khuẩn', longFr: 'une bactérie' },
  { n: 17, en: 'virus', vn: 'vi-rút', fr: 'virus', longEn: 'a virus', longVn: 'một vi-rút', longFr: 'un virus' },
  { n: 25, en: 'atom', vn: 'nguyên tử', fr: 'atome', longEn: 'ONE GOLD ATOM', longVn: 'MỘT NGUYÊN TỬ VÀNG', longFr: 'UN ATOME D’OR' },
]

// 10 mm halved n times, to two significant figures, written out in full so the
// zeros do the work: 0.0000003 mm.
function widthMm(n) {
  const v = 10 / 2 ** n
  if (v >= 1) return String(Number(v.toPrecision(3)))
  const digits = -Math.floor(Math.log10(v)) + 1
  return v.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '')
}

const trackX = (k) => 60 + k * 40

export function HalvingWidget({ lang = 'en' }) {
  const [n, setN] = useState(0)
  const here = MILESTONES.find((m) => m.n === n)

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          {/* counter */}
          <rect x="20" y="16" width="340" height="262" rx="18" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
          <text x="190" y="66" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={INK} textAnchor="middle">{tr(lang, 'Cut in half', 'Cắt đôi', 'Coupe en deux')}</text>
          <text x="190" y="214" fontFamily={FONT} fontSize="140" fontWeight="bold" fill={KEY} textAnchor="middle">{n}</text>
          <text x="190" y="260" fontFamily={FONT} fontSize="30" fill={INK} textAnchor="middle">{tr(lang, n === 1 ? 'time' : 'times', 'lần', 'fois')}</text>

          {/* width read-out */}
          <text x="740" y="70" fontFamily={FONT} fontSize="28" fill={MUTED} textAnchor="middle">{tr(lang, 'How wide?', 'Rộng bao nhiêu?', 'Quelle largeur ?')}</text>
          <text x="740" y="160" fontFamily={FONT} fontSize="76" fontWeight="bold" fill={INK} textAnchor="middle">{widthMm(n)} mm</text>
          {here ? (
            <text x="740" y="236" fontFamily={FONT} fontSize={n === LAST_CUT ? 46 : 38} fontWeight="bold" fill={KEY} textAnchor="middle">
              {n === 0 ? tr(lang, here.longEn, here.longVn, here.longFr) : `≈ ${tr(lang, here.longEn, here.longVn, here.longFr)}`}
            </text>
          ) : (
            <text x="740" y="236" fontFamily={FONT} fontSize="34" fill="#9aa5ae" textAnchor="middle">{tr(lang, 'Keep cutting…', 'Cắt tiếp…', 'Continue…')}</text>
          )}

          {/* track */}
          <line x1={trackX(0)} y1="330" x2={trackX(LAST_CUT)} y2="330" stroke="#d5dbe1" strokeWidth="6" strokeLinecap="round" />
          {n > 0 && <line x1={trackX(0)} y1="330" x2={trackX(n)} y2="330" stroke={GOLD} strokeWidth="6" strokeLinecap="round" />}
          {Array.from({ length: LAST_CUT + 1 }, (_, k) => {
            const big = MILESTONES.some((m) => m.n === k)
            return <circle key={k} cx={trackX(k)} cy="330" r={big ? 9 : 5} fill={k <= n ? GOLD : '#c3cbd2'} stroke="#ffffff" strokeWidth="2" />
          })}
          <rect x={trackX(n) - 13} y="290" width="26" height="26" rx="4" fill={GOLD} stroke="#8a6a00" strokeWidth="2" />

          {MILESTONES.map((m, i) => {
            const y = i % 2 === 0 ? 380 : 414
            const reached = m.n <= n
            const anchor = m.n === 0 ? 'start' : m.n === LAST_CUT ? 'end' : 'middle'
            const lx = m.n === 0 ? 44 : m.n === LAST_CUT ? 1076 : trackX(m.n)
            return (
              <g key={m.n}>
                <line x1={trackX(m.n)} y1="341" x2={trackX(m.n)} y2={y - 22} stroke={reached ? KEY : '#c3cbd2'} strokeWidth="2" />
                <text x={lx} y={y} fontFamily={FONT} fontSize="22" fontWeight={reached ? 'bold' : 'normal'} fill={reached ? KEY : '#9aa5ae'} textAnchor={anchor}>
                  {tr(lang, m.en, m.vn, m.fr)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={n === 0} onClick={() => setN((v) => Math.max(0, v - 1))}>{tr(lang, 'Back', 'Lùi', 'Retour')}</Btn>
        <Btn tone="orange" icon={Scissors} disabled={n === LAST_CUT} onClick={() => setN((v) => Math.min(LAST_CUT, v + 1))}>{tr(lang, 'Cut in half', 'Cắt đôi', 'Coupe en deux')}</Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={n === 0} onClick={() => setN(0)}>{tr(lang, 'Start again', 'Làm lại', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 2 — THE FIRST 20 ELEMENTS
 * ============================================================= */
const ELEMENTS = [
  { z: 1, sym: 'H', en: 'hydrogen', vn: 'hiđro', fr: 'hydrogène', metal: false, period: 1, group: null },
  { z: 2, sym: 'He', en: 'helium', vn: 'heli', fr: 'hélium', metal: false, period: 1, group: 8 },
  { z: 3, sym: 'Li', en: 'lithium', vn: 'liti', fr: 'lithium', metal: true, period: 2, group: 1 },
  { z: 4, sym: 'Be', en: 'beryllium', vn: 'beri', fr: 'béryllium', metal: true, period: 2, group: 2 },
  { z: 5, sym: 'B', en: 'boron', vn: 'bo', fr: 'bore', metal: false, period: 2, group: 3 },
  { z: 6, sym: 'C', en: 'carbon', vn: 'cacbon', fr: 'carbone', metal: false, period: 2, group: 4 },
  { z: 7, sym: 'N', en: 'nitrogen', vn: 'nitơ', fr: 'azote', metal: false, period: 2, group: 5 },
  { z: 8, sym: 'O', en: 'oxygen', vn: 'oxi', fr: 'oxygène', metal: false, period: 2, group: 6 },
  { z: 9, sym: 'F', en: 'fluorine', vn: 'flo', fr: 'fluor', metal: false, period: 2, group: 7 },
  { z: 10, sym: 'Ne', en: 'neon', vn: 'neon', fr: 'néon', metal: false, period: 2, group: 8 },
  { z: 11, sym: 'Na', en: 'sodium', vn: 'natri', fr: 'sodium', metal: true, period: 3, group: 1, latin: 'natrium' },
  { z: 12, sym: 'Mg', en: 'magnesium', vn: 'magie', fr: 'magnésium', metal: true, period: 3, group: 2 },
  { z: 13, sym: 'Al', en: 'aluminium', vn: 'nhôm', fr: 'aluminium', metal: true, period: 3, group: 3 },
  { z: 14, sym: 'Si', en: 'silicon', vn: 'silic', fr: 'silicium', metal: false, period: 3, group: 4 },
  { z: 15, sym: 'P', en: 'phosphorus', vn: 'photpho', fr: 'phosphore', metal: false, period: 3, group: 5 },
  { z: 16, sym: 'S', en: 'sulfur', vn: 'lưu huỳnh', fr: 'soufre', metal: false, period: 3, group: 6 },
  { z: 17, sym: 'Cl', en: 'chlorine', vn: 'clo', fr: 'chlore', metal: false, period: 3, group: 7 },
  { z: 18, sym: 'Ar', en: 'argon', vn: 'agon', fr: 'argon', metal: false, period: 3, group: 8 },
  { z: 19, sym: 'K', en: 'potassium', vn: 'kali', fr: 'potassium', metal: true, period: 4, group: 1, latin: 'kalium' },
  { z: 20, sym: 'Ca', en: 'calcium', vn: 'canxi', fr: 'calcium', metal: true, period: 4, group: 2 },
]

// Layout of the book's table: two wide columns, a strip of ten narrow empty
// cells in period 4, six wide columns; hydrogen floats above the gap.
const X0 = 120, Y0 = 90, CW = 88, CH = 86, TW = 26
const colX = (g) => (g <= 2 ? X0 + (g - 1) * CW : X0 + 2 * CW + 10 * TW + (g - 3) * CW)
const rowY = (p) => Y0 + (p - 1) * CH
const posOf = (el) => (el.sym === 'H' ? { x: X0 + 2 * CW + 52, y: rowY(1) } : { x: colX(el.group), y: rowY(el.period) })
const RIGHT = colX(8) + CW

const BLANKS = [
  ...Array.from({ length: 10 }, (_, k) => ({ x: X0 + 2 * CW + k * TW, w: TW })),
  ...[3, 4, 5, 6, 7, 8].map((g) => ({ x: colX(g), w: CW })),
]

const bookColour = (el) => (el.metal ? METAL : NONMETAL)

function periodBand(p) {
  return { x: X0 - 8, y: rowY(p) - 8, w: RIGHT - X0 + 16, h: CH + 16 }
}
function groupBand(g) {
  const top = g === 8 ? 1 : 2
  return { x: colX(g) - 8, y: rowY(top) - 8, w: CW + 16, h: (5 - top) * CH + 16 }
}

function PeriodicTable({ lang = 'en', mode }) {
  const [sel, setSel] = useState(null) // rowscols: { kind, idx }; explore: z
  const [step, setStep] = useState(0) // mass: 0..20; metals: 0..3

  // What each tile looks like, and what the status line says, for this mode.
  let look = () => ({ ...PLAIN, text: INK, name: MUTED, sw: 1.5 })
  let status = ''
  let bands = []

  if (mode === 'rowscols') {
    const inSel = (el) => (sel?.kind === 'period' ? el.period === sel.idx : el.group === sel?.idx)
    if (sel) {
      look = (el) => (inSel(el) ? { ...PLAIN, text: INK, name: MUTED, sw: 2.5, stroke: INK } : { ...OFF, sw: 1.5 })
      bands = [sel.kind === 'period' ? periodBand(sel.idx) : groupBand(sel.idx)]
    }
    status = !sel
      ? tr(lang, 'The first 20 elements', '20 nguyên tố đầu tiên', 'Les 20 premiers éléments')
      : sel.kind === 'period'
        ? tr(lang, 'A row is called a period', 'Một hàng gọi là một chu kì', 'Une ligne s’appelle une période')
        : tr(lang, 'A column is called a group', 'Một cột gọi là một nhóm', 'Une colonne s’appelle un groupe')
  }

  if (mode === 'mass') {
    look = (el) =>
      el.z === step
        ? { fill: '#fdf1e3', stroke: KEY, sw: 5, text: INK, name: MUTED }
        : el.z < step
          ? { ...PLAIN, text: INK, name: MUTED, sw: 1.5 }
          : { ...OFF, sw: 1.5 }
    const cur = ELEMENTS[step - 1]
    status = step === 0
      ? tr(lang, 'Press Next: the lightest atom first', 'Bấm Tiếp: nguyên tử nhẹ nhất trước', 'Appuie sur Suivant : le plus léger d’abord')
      : `${step}. ${cur.en}${localName(lang, cur) ? ` (${localName(lang, cur)})` : ''}` +
        (step === 1 ? tr(lang, ' — the lightest', ' — nhẹ nhất', ' — le plus léger') : step === 20 ? tr(lang, ' — the heaviest here', ' — nặng nhất ở đây', ' — le plus lourd ici') : '')
  }

  if (mode === 'metals') {
    const on = (el) => step === 3 || (step === 1 && el.metal) || (step === 2 && !el.metal)
    look = (el) =>
      step === 0
        ? { ...PLAIN, text: INK, name: MUTED, sw: 1.5 }
        : on(el)
          ? { ...bookColour(el), text: INK, name: MUTED, sw: step === 3 ? 1.5 : 2.5 }
          : { ...OFF, sw: 1.5 }
    status = [
      tr(lang, 'Metals and non-metals', 'Kim loại và phi kim', 'Métaux et non-métaux'),
      tr(lang, 'Metals: the yellow boxes', 'Kim loại: các ô màu vàng', 'Métaux : les cases jaunes'),
      tr(lang, 'Non-metals: the blue boxes', 'Phi kim: các ô màu xanh', 'Non-métaux : les cases bleues'),
      tr(lang, 'Similar elements sit close together', 'Các nguyên tố giống nhau nằm gần nhau', 'Les éléments semblables sont proches'),
    ][step]
  }

  if (mode === 'explore') {
    const picked = ELEMENTS.find((el) => el.z === sel)
    look = (el) => {
      if (!picked) return { ...bookColour(el), text: INK, name: MUTED, sw: 1.5 }
      if (el.z === picked.z) return { ...bookColour(el), stroke: KEY, sw: 5, text: INK, name: MUTED }
      const related = el.period === picked.period || (picked.group && el.group === picked.group)
      return related ? { ...bookColour(el), text: INK, name: MUTED, sw: 1.5 } : { ...OFF, sw: 1.5 }
    }
    if (picked) {
      bands = [periodBand(picked.period), ...(picked.group ? [groupBand(picked.group)] : [])]
      status = `${picked.sym} · ${picked.en}${localName(lang, picked) ? ` (${localName(lang, picked)})` : ''} · ` +
        (picked.metal ? tr(lang, 'a metal', 'kim loại', 'un métal') : tr(lang, 'a non-metal', 'phi kim', 'un non-métal'))
    } else {
      status = tr(lang, 'Tap an element', 'Chạm vào một nguyên tố', 'Touche un élément')
    }
  }

  const blankOff = (mode === 'rowscols' && sel) || mode === 'mass' || (mode === 'metals' && step > 0 && step < 3) || (mode === 'explore' && sel)
  const tap = (z) => setSel((cur) => (cur === z ? null : z))
  const cycle = (kind, max) => setSel((cur) => ({ kind, idx: cur?.kind === kind ? (cur.idx % max) + 1 : 1 }))

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="450" rx="14" fill="#ffffff" />
          <text x="560" y="54" fontFamily={FONT} fontSize="32" fontWeight="bold" fill={INK} textAnchor="middle">{status}</text>

          {BLANKS.map((b, i) => (
            <rect key={`b${i}`} x={b.x} y={rowY(4)} width={b.w} height={CH} fill={blankOff ? '#f7f8fa' : '#ffffff'} stroke={blankOff ? '#e1e6ea' : '#b9c3c9'} strokeWidth="1.5" />
          ))}

          {ELEMENTS.map((el) => {
            const { x, y } = posOf(el)
            const s = look(el)
            return (
              <g key={el.z} onClick={mode === 'explore' ? () => tap(el.z) : undefined} style={mode === 'explore' ? { cursor: 'pointer' } : undefined}>
                <rect x={x} y={y} width={CW} height={CH} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} />
                <text x={x + CW / 2} y={y + 47} fontFamily={FONT} fontSize="34" fontWeight="bold" fill={s.text} textAnchor="middle">{el.sym}</text>
                <text x={x + CW / 2} y={y + 72} fontFamily={FONT} fontSize="13.5" fill={s.name} textAnchor="middle">{el.en}</text>
              </g>
            )
          })}

          {/* Re-draw the focused tile's outline on top, so its neighbours cannot cover it. */}
          {ELEMENTS.filter((el) => look(el).sw >= 5).map((el) => {
            const { x, y } = posOf(el)
            return <rect key={`f${el.z}`} x={x} y={y} width={CW} height={CH} fill="none" stroke={KEY} strokeWidth="5" pointerEvents="none" />
          })}

          {bands.map((b, i) => (
            <rect key={`band${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx="12" fill="none" stroke={KEY} strokeWidth={mode === 'explore' ? 3 : 5} strokeDasharray={mode === 'explore' ? '10 7' : undefined} pointerEvents="none" />
          ))}

          {mode === 'mass' && ELEMENTS.filter((el) => el.z <= step).map((el) => {
            const { x, y } = posOf(el)
            return (
              <g key={`n${el.z}`} pointerEvents="none">
                <circle cx={x + 17} cy={y + 17} r="13" fill={KEY} />
                <text x={x + 17} y={y + 22} fontFamily={FONT} fontSize="15" fontWeight="bold" fill="#ffffff" textAnchor="middle">{el.z}</text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        {mode === 'rowscols' && (
          <>
            <Btn tone="orange" icon={ArrowRight} onClick={() => cycle('period', 4)}>{tr(lang, 'Next row', 'Hàng tiếp', 'Ligne suivante')}</Btn>
            <Btn tone="orange" icon={ArrowRight} onClick={() => cycle('group', 8)}>{tr(lang, 'Next column', 'Cột tiếp', 'Colonne suivante')}</Btn>
            <Btn tone="slate" icon={RotateCcw} disabled={!sel} onClick={() => setSel(null)}>{tr(lang, 'Clear', 'Xóa', 'Effacer')}</Btn>
          </>
        )}
        {mode === 'mass' && (
          <>
            <Btn tone="slate" icon={Undo2} disabled={step === 0} onClick={() => setStep((v) => Math.max(0, v - 1))}>{tr(lang, 'Back', 'Lùi', 'Retour')}</Btn>
            <Btn tone="orange" icon={ArrowRight} disabled={step === 20} onClick={() => setStep((v) => Math.min(20, v + 1))}>{tr(lang, 'Next atom', 'Nguyên tử tiếp', 'Atome suivant')}</Btn>
            <Btn tone="teal" icon={RotateCcw} disabled={step === 0} onClick={() => setStep(0)}>{tr(lang, 'Start again', 'Làm lại', 'Recommencer')}</Btn>
          </>
        )}
        {mode === 'metals' && (
          <>
            <Btn tone="orange" icon={ArrowRight} disabled={step === 3} onClick={() => setStep((v) => Math.min(3, v + 1))}>{tr(lang, 'Next', 'Tiếp', 'Suivant')}</Btn>
            <Btn tone="teal" icon={RotateCcw} disabled={step === 0} onClick={() => setStep(0)}>{tr(lang, 'Start again', 'Làm lại', 'Recommencer')}</Btn>
          </>
        )}
        {mode === 'explore' && (
          <Btn tone="slate" icon={RotateCcw} disabled={!sel} onClick={() => setSel(null)}>{tr(lang, 'Clear', 'Xóa', 'Effacer')}</Btn>
        )}
      </div>
    </div>
  )
}

export function TableRowsCols({ lang }) { return <PeriodicTable lang={lang} mode="rowscols" /> }
export function TableMass({ lang }) { return <PeriodicTable lang={lang} mode="mass" /> }
export function TableMetals({ lang }) { return <PeriodicTable lang={lang} mode="metals" /> }
export function TableExplore({ lang }) { return <PeriodicTable lang={lang} mode="explore" /> }

/* ============================================================= *
 * WIDGET 3 — SYMBOL SNAP
 * ============================================================= */
// A fixed first order, so the first round never opens on hydrogen, helium,
// lithium. Shuffle deals a fresh one.
const FIRST_ORDER = [12, 1, 19, 6, 11, 2, 17, 8, 13, 4, 20, 9, 3, 15, 10, 18, 5, 14, 7, 16]
const cap = (s) => s[0].toUpperCase() + s.slice(1)

function howMade(el, lang) {
  if (el.latin) return tr(lang, `from the Latin name: ${el.latin}`, `từ tên La-tinh: ${el.latin}`, `du nom latin\u00A0: ${el.latin}`)
  if (el.sym.length === 1) return tr(lang, 'the first letter', 'chữ cái đầu tiên', 'la première lettre')
  return tr(lang, 'the first letter + another letter', 'chữ cái đầu + một chữ khác', 'première lettre + une autre')
}

function SymbolTile({ el, big }) {
  const c = bookColour(el)
  return (
    <div
      className={`rounded-2xl border-4 flex items-center justify-center font-black text-[#2b2b2b] leading-none shadow-sm ${big ? 'w-[clamp(9rem,22vh,15rem)] h-[clamp(9rem,22vh,15rem)] text-[clamp(5rem,13vh,9rem)]' : 'w-[clamp(7rem,17vh,11rem)] h-[clamp(7rem,17vh,11rem)] text-[clamp(3.5rem,10vh,6.5rem)]'}`}
      style={{ backgroundColor: c.fill, borderColor: c.stroke }}
    >
      {el.sym}
    </div>
  )
}

export function SymbolSnap({ lang = 'en', isDisplayMode = false }) {
  const [order, setOrder] = useState(FIRST_ORDER)
  const [pos, setPos] = useState(0)
  const [shown, setShown] = useState(false)
  const [askSymbol, setAskSymbol] = useState(true) // true: name → symbol

  const done = pos >= order.length
  const el = done ? null : ELEMENTS[order[pos] - 1]
  const big = isDisplayMode

  const advance = useCallback(() => {
    if (done) return
    if (!shown) { setShown(true); return }
    setShown(false)
    setPos((p) => p + 1)
  }, [done, shown])

  const deal = () => {
    const next = [...FIRST_ORDER]
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[next[i], next[j]] = [next[j], next[i]]
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

  const nameBlock = el && (
    <div className="text-center">
      <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-[clamp(3.5rem,9vh,7rem)]' : 'text-5xl sm:text-6xl'}`}>{cap(el.en)}</div>
      {localName(lang, el) && <div className={`mt-2 font-bold text-slate-400 ${big ? 'text-[clamp(1.2rem,2.6vh,2rem)]' : 'text-lg'}`}>({localName(lang, el)})</div>}
    </div>
  )

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl text-white bg-[#c25e12] shrink-0">
            <Atom className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>Symbol Snap</div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Write your answer. Then press Show.', 'Viết câu trả lời. Rồi bấm Hiện.', 'Écris ta réponse. Puis appuie sur Voir.')}
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
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>{tr(lang, 'All 20 done!', 'Xong cả 20!', 'Les 20 terminés !')}</div>
          </>
        ) : (
          <>
            <div className={`font-black uppercase tracking-[0.2em] text-[#c25e12] ${big ? 'text-[clamp(1rem,2.2vh,1.6rem)]' : 'text-sm'}`}>
              {askSymbol ? tr(lang, 'What is the symbol?', 'Kí hiệu là gì?', 'Quel est le symbole ?') : tr(lang, 'Which element?', 'Nguyên tố nào?', 'Quel élément ?')}
            </div>

            {askSymbol ? nameBlock : <SymbolTile el={el} big />}

            <div className="min-h-[clamp(10rem,30vh,20rem)] flex flex-col items-center justify-center gap-3">
              {shown ? (
                <>
                  {askSymbol ? <SymbolTile el={el} /> : nameBlock}
                  <div className={`rounded-full bg-white dark:bg-slate-800 border-2 border-[#c25e12] font-bold text-slate-700 dark:text-slate-200 px-5 py-1.5 ${big ? 'text-[clamp(1.1rem,2.4vh,1.8rem)]' : 'text-base'}`}>
                    {howMade(el, lang)}
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
        <Btn tone="slate" icon={ArrowLeftRight} onClick={() => { setAskSymbol((v) => !v); setShown(false) }}>
          {askSymbol ? tr(lang, 'Show symbols instead', 'Hiện kí hiệu', 'Voir les symboles') : tr(lang, 'Show names instead', 'Hiện tên', 'Voir les noms')}
        </Btn>
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
