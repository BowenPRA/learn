// content/y7-science/U04_2/flu.jsx
// FOLLOW THE FLU VIRUS — the book's "How viruses replicate" (page 132) as a
// model, one change a press, the class saying what happens next before each:
//
//   0  a flu virus is breathed in, up your nose
//   1  stick      its pegs stick to a cell in your nose
//   2  get in     it gets inside the cell
//   3  open       it bursts open; out comes its RNA
//   4  copy       the cell copies the RNA and makes new viruses
//   5  burst out  the cell bursts and dies; the new viruses go on to stick to
//                 more cells
//
// Five tiles along the bottom keep the verbs (the exit question asks for four
// of them in order). The next tile is ringed in orange with a "?", so the
// class says its verb first. The virus and the new viruses move between steps
// (CSS transitions): the one thing a static slide cannot show.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, FONT, CYTO, NUCLEUS, COAT_FILL, virus, pegArc, rnaThreads } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1', TEAL = '#0087a8', DEAD = '#eef1f3', DEAD_EDGE = '#9aa5ae'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />
const move = (x, y, ms = 900) => ({ transform: `translate(${x}px, ${y}px)`, transition: `transform ${ms}ms ease-in-out` })

// The cell in the nose (centre, radii) and its neighbour on the right.
const CELL = { cx: 960, cy: 250, rx: 260, ry: 175 }
const NEXT = { cx: 1370, cy: 240, rx: 118, ry: 150 }

// Where the first virus is at each step (it is opened at 3 and used up at 4).
const V = [[380, 330], [640, 250], [820, 250], [830, 250], [830, 250], [830, 250]]

// The ten new viruses: made inside the cell (step 4), then out (step 5): some
// float away, some stick to the next cell.
const INSIDE = [[800, 170], [860, 330], [1080, 160], [1110, 320], [900, 140], [1000, 380], [1160, 240], [770, 262], [1020, 130], [870, 210]]
const OUTSIDE = [[662, 178], [560, 230], [610, 360], [520, 404], [840, 40], [1050, 42], [1246, 150], [1246, 330], [1370, 60], [1180, 420]]

// [EN, FR] lines for each step
const SAY = [
  [['A flu virus is breathed in,', 'up your nose.'], ['On respire un virus de la grippe,', 'par le nez.']],
  [['Its pegs stick to a cell', 'in your nose.'], ['Ses picots se collent', 'à une cellule du nez.']],
  [['It gets inside', 'the cell.'], ['Il entre', 'dans la cellule.']],
  [['It bursts open.', 'Out comes its RNA.'], ['Il s’ouvre.', 'Son ARN sort.']],
  [['The cell copies the RNA', 'and makes new viruses.'], ['La cellule copie l’ARN', 'et fabrique de nouveaux virus.']],
  [['The cell bursts and dies.', 'New viruses infect more cells.'], ['La cellule éclate et meurt.', 'Les virus infectent d’autres cellules.']],
]
const TILES = [['stick', 'se coller'], ['get in', 'entrer'], ['open', 's’ouvrir'], ['copy', 'copier'], ['burst out', 'éclater']]
const LAST = 5

const TILE_W = 276
const TILE_GAP = 17
const TILE_Y = 458
const TILE_H = 90
const tileX = (i) => 26 + i * (TILE_W + TILE_GAP)

const cellPath = ({ cx, cy, rx, ry }) => `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`

// The virus, burst open: two halves of the coat apart, the RNA spilled out.
function OpenVirus() {
  return (
    <g>
      <g transform="translate(-40 -30) rotate(-24) scale(1.1)">
        <Pic svg={pegArc(200, 340, 6)} />
        <path d="M -42 0 A 42 42 0 0 1 42 0 L 31 0 A 31 31 0 0 0 -31 0 Z" fill={COAT_FILL} stroke={INK} strokeWidth="3" />
      </g>
      <g transform="translate(-30 40) rotate(20) scale(1.1)">
        <Pic svg={pegArc(20, 160, 6)} />
        <path d="M 42 0 A 42 42 0 0 1 -42 0 L -31 0 A 31 31 0 0 0 31 0 Z" fill={COAT_FILL} stroke={INK} strokeWidth="3" />
      </g>
      <g transform="translate(46 92) scale(1.5)"><Pic svg={rnaThreads()} /></g>
    </g>
  )
}

export function FluFollow({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const dead = k >= 5
  const lines = fr ? SAY[k][1] : SAY[k][0]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          <defs><clipPath id="flu-stage"><rect x="0" y="0" width="1500" height="446" rx="16" /></clipPath></defs>

          <g clipPath="url(#flu-stage)">
            {/* the neighbour cell, then the cell the virus gets into */}
            <path d={cellPath(NEXT)} fill={CYTO} stroke={INK} strokeWidth="6" />
            <ellipse cx={NEXT.cx + 10} cy={NEXT.cy + 10} rx="42" ry="40" fill={NUCLEUS} stroke={INK} strokeWidth="4" />
            <path d={cellPath(CELL)} fill={dead ? DEAD : CYTO} stroke={dead ? DEAD_EDGE : INK} strokeWidth="6"
              strokeDasharray={dead ? '110 52' : undefined} style={{ transition: 'fill 600ms' }} />
            <circle cx={CELL.cx} cy={CELL.cy} r="58" fill={dead ? '#dde2e6' : NUCLEUS} stroke={dead ? DEAD_EDGE : INK} strokeWidth="4" />

            {/* the RNA being copied, round the nucleus (step 4 only) */}
            {k === 4 && [[880, 290], [1050, 220], [990, 330], [1060, 300]].map(([x, y], j) => (
              <g key={j} transform={`translate(${x} ${y}) scale(0.7)`}><Pic svg={rnaThreads()} /></g>
            ))}

            {/* the first virus: in the air, stuck, inside, then open */}
            <g style={move(V[k][0], V[k][1])}>
              {k <= 2 ? <Pic svg={virus(0, 0, 1.1)} /> : k === 3 ? <OpenVirus /> : null}
            </g>

            {/* the new viruses */}
            {k >= 4 && INSIDE.map(([x, y], j) => {
              const [ox, oy] = dead ? OUTSIDE[j] : [x, y]
              return (
                <g key={j} style={move(ox, oy, 1100)}>
                  <Pic svg={virus(0, 0, 0.5, j * 7)} />
                </g>
              )
            })}
          </g>

          {/* what is happening, top left (clear of the cell) */}
          <text x="30" y="64" fontFamily={FONT} fontSize="31" fontWeight="900" fill={INK}>{lines[0]}</text>
          <text x="30" y="106" fontFamily={FONT} fontSize="31" fontWeight="900" fill={INK}>{lines[1]}</text>

          {/* the verbs */}
          {TILES.map(([en, frWord], i) => {
            const done = i < k
            const next = i === k && k < LAST
            const x = tileX(i)
            return (
              <g key={i}>
                <rect x={x} y={TILE_Y} width={TILE_W} height={TILE_H} rx="16" fill={done ? '#e2f2f6' : '#f4f6f8'} stroke={next ? KEY : done ? TEAL : RULE} strokeWidth={next ? 6 : 3} />
                <circle cx={x + 40} cy={TILE_Y + TILE_H / 2} r="24" fill={done ? TEAL : next ? KEY : '#9aa5ae'} />
                <text x={x + 40} y={TILE_Y + TILE_H / 2 + 10} fontFamily={FONT} fontSize="28" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                <text x={x + 76} y={TILE_Y + TILE_H / 2 + 12} fontFamily={FONT} fontSize="34" fontWeight="900" fill={done ? INK : '#9aa5ae'}>{done ? (fr ? frWord : en) : '?'}</text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {t(lang, 'What happens next?', 'Et ensuite ?')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
