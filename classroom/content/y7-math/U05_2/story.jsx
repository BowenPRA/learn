// content/y7-math/U05_2/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's bookshelf, a four-panel strip, one panel per
// press, so the class predicts each step before it is shown. Deadpan, never
// flagged as a joke:
//
//   1  He builds a bookshelf. He has a hammer.
//   2  He puts up three shelves. By eye. No ruler.   (the middle one tilts)
//   3  He puts his books on. Very carefully.
//   4  The books slide off. (They are now on the floor.)
//   then the question the second part of the lesson answers — how can he
//   check that his shelves are parallel? — and the clue: look at the angle
//   where each shelf meets the side. Slide 20 comes back to it with numbers.
//
// Mr Bowen himself is the cartoon from Coffee, Carbon and Stars, as in Tides.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { MrBowen } from '../../y7-science/U03_coffee/dating.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8'
const WOOD = '#c8955c', WOOD_EDGE = '#8a5d2e', WALL = '#f6f1e7'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 25 // 395
const SIDE_X = 58 // the upright, from the panel's left edge
const SIDE_W = 24
const SHELF_L = 196
const SHELVES = [138, 228, 318] // the top of each shelf, at the side
const TILT = 8 // degrees: the middle shelf, put up by eye
const BOWEN = 0.5

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['Mr Bowen builds a bookshelf.', 'He has a hammer.'], ['M. Bowen fabrique des étagères.', 'Il a un marteau.']],
  [['He puts up three shelves.', 'By eye. No ruler.'], ['Il pose trois étagères.', 'À l’œil. Sans règle.']],
  [['He puts his books on.', 'Very carefully.'], ['Il pose ses livres.', 'Très soigneusement.']],
  [['The books slide off.', '(They are now on the floor.)'], ['Les livres glissent.', '(Ils sont par terre.)']],
]
const LAST = 4 // panels 0-3, then the clue

const BOOKS = [
  ['#1a5fa8', 16, 50], ['#c25e12', 13, 44], ['#4a8b23', 18, 54], ['#5c2483', 14, 46],
  ['#d83a2e', 17, 52], ['#0087a8', 13, 42], ['#e8a317', 15, 48],
]

/* ── the pieces ── */
function Upright({ x }) {
  return <rect x={x + SIDE_X} y={TOP + 40} width={SIDE_W} height={FLOOR - TOP - 40} fill={WOOD} stroke={WOOD_EDGE} strokeWidth="3" />
}

// A shelf fixed to the upright at height y; `tilt` turns it down to the right.
function Shelf({ x, y, tilt = 0, children }) {
  const x0 = x + SIDE_X + SIDE_W
  return (
    <g transform={`rotate(${tilt} ${x0} ${y})`}>
      {children}
      <rect x={x0} y={y} width={SHELF_L} height="12" fill={WOOD} stroke={WOOD_EDGE} strokeWidth="3" />
    </g>
  )
}

// A row of books standing on a shelf whose top is at y, from x0 onwards.
function Books({ x0, y, from = 0, n = 5, lean = 0 }) {
  const row = BOOKS.slice(from, from + n)
  const lefts = row.map((_, i) => x0 + row.slice(0, i).reduce((sum, [, w]) => sum + w + 3, 0))
  return (
    <g>
      {row.map(([fill, w, h], i) => {
        const bx = lefts[i]
        return (
          <g key={i} transform={lean ? `rotate(${lean} ${bx + w} ${y})` : undefined}>
            <rect x={bx} y={y - h} width={w} height={h} rx="2" fill={fill} stroke={INK} strokeWidth="2" />
            <line x1={bx + 2} y1={y - h + 9} x2={bx + w - 2} y2={y - h + 9} stroke="#ffffff" strokeWidth="2" opacity="0.8" />
          </g>
        )
      })}
    </g>
  )
}

function Bowen({ x, mood = 'happy', hammer = false }) {
  const bx = x + 326
  const by = FLOOR - 268 * BOWEN
  // the hammer first, so his hand closes over the handle
  return (
    <g>
      {hammer && (
        <g>
          <line x1={bx - 46} y1={by + 34} x2={bx - 52} y2={by - 8} stroke="#8a6a3c" strokeWidth="7" strokeLinecap="round" />
          <rect x={bx - 68} y={by - 20} width="32" height="15" rx="3" fill="#59636e" stroke={INK} strokeWidth="2" />
        </g>
      )}
      <MrBowen x={bx} y={by} scale={BOWEN} mood={mood} handLeft={hammer ? [-92, 64] : undefined} />
    </g>
  )
}

/* ── the four panels ── */
function BuildIt({ x }) {
  return (
    <g>
      <Upright x={x} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={x + 120 + i * 30} y={FLOOR - 190} width="14" height="190" rx="2" fill={WOOD} stroke={WOOD_EDGE} strokeWidth="3"
          transform={`rotate(${-8 + i * 2} ${x + 127 + i * 30} ${FLOOR})`} />
      ))}
      <Bowen x={x} hammer />
    </g>
  )
}

function ShelvesUp({ x }) {
  return (
    <g>
      <Upright x={x} />
      <Shelf x={x} y={SHELVES[0]} />
      <Shelf x={x} y={SHELVES[1]} tilt={TILT} />
      <Shelf x={x} y={SHELVES[2]} />
      <Bowen x={x} hammer />
    </g>
  )
}

function BooksOn({ x }) {
  const x0 = x + SIDE_X + SIDE_W + 14
  return (
    <g>
      <Upright x={x} />
      <Shelf x={x} y={SHELVES[0]}><Books x0={x0} y={SHELVES[0]} from={0} n={6} /></Shelf>
      <Shelf x={x} y={SHELVES[1]} tilt={TILT}><Books x0={x0 + 20} y={SHELVES[1]} from={1} n={6} lean={4} /></Shelf>
      <Shelf x={x} y={SHELVES[2]}><Books x0={x0} y={SHELVES[2]} from={2} n={5} /></Shelf>
      <Bowen x={x} />
    </g>
  )
}

function OnTheFloor({ x }) {
  const x0 = x + SIDE_X + SIDE_W + 14
  return (
    <g>
      <Upright x={x} />
      <Shelf x={x} y={SHELVES[0]}><Books x0={x0} y={SHELVES[0]} from={0} n={6} /></Shelf>
      <Shelf x={x} y={SHELVES[1]} tilt={TILT} />
      <Shelf x={x} y={SHELVES[2]}><Books x0={x0} y={SHELVES[2]} from={2} n={5} /></Shelf>
      {/* the middle shelf's books, in a pile on the floor */}
      <rect x={x + 170} y={FLOOR - 14} width="54" height="14" rx="2" fill="#1a5fa8" stroke={INK} strokeWidth="2" />
      <rect x={x + 178} y={FLOOR - 28} width="48" height="14" rx="2" fill="#4a8b23" stroke={INK} strokeWidth="2" transform={`rotate(-6 ${x + 200} ${FLOOR - 21})`} />
      <rect x={x + 226} y={FLOOR - 13} width="44" height="13" rx="2" fill="#d83a2e" stroke={INK} strokeWidth="2" />
      <rect x={x + 120} y={FLOOR - 12} width="46" height="12" rx="2" fill="#5c2483" stroke={INK} strokeWidth="2" transform={`rotate(4 ${x + 143} ${FLOOR - 6})`} />
      <path d={`M ${x + 186} ${FLOOR - 30} l 18 -10 l 18 10`} fill="#ffffff" stroke={INK} strokeWidth="2" />
      <Bowen x={x} mood="sad" />
      <rect x={x + 309} y={FLOOR - 268 * BOWEN - 24} width="36" height="12" rx="2" fill="#c25e12" stroke={INK} strokeWidth="2" transform={`rotate(-7 ${x + 327} ${FLOOR - 268 * BOWEN - 18})`} />
    </g>
  )
}

const PANELS = [BuildIt, ShelvesUp, BooksOn, OnTheFloor]

export function ShelfStory({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // panels 0..k are shown; k = 4 adds the clue
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const asked = k >= 3

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1640 610" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1640" height="610" rx="16" fill="#ffffff" />
          <defs>
            {PANELS.map((_, i) => (
              <clipPath key={i} id={`shelf-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
            ))}
          </defs>
          {PANELS.map((Panel, i) => {
            const x = px(i)
            const shown = i <= k
            return (
              <g key={i}>
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? WALL : '#f4f6f8'}
                  stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                {shown ? (
                  <g clipPath={`url(#shelf-p${i})`}>
                    <rect x={x} y={FLOOR} width={PANEL_W} height={TOP + PANEL_H - FLOOR} fill="#e4d6c1" />
                    <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke="#b9a68a" strokeWidth="3" />
                    <Panel x={x} />
                  </g>
                ) : (
                  <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
                )}
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill="none" stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                <circle cx={x + 30} cy={TOP + 30} r="19" fill={shown ? BLUE : RULE} />
                <text x={x + 30} y={TOP + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                {shown && (
                  <g>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 68} fontFamily={FONT} fontSize="22" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="514" width="1580" height="88" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 550 : 568} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'How can he check that his shelves are parallel?', 'Comment vérifier que ses étagères sont parallèles ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: look at the angle where each shelf meets the side.', 'Un indice : regarde l’angle entre chaque étagère et le montant.')}
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k === LAST - 1 ? t(lang, 'A clue', 'Un indice') : t(lang, 'What happens next?', 'Et ensuite ?')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
