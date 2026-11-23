// content/y7-science/U05_2/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's test circuit. A four-panel strip, one panel
// per press (the shape of 5.1's pan strip). Deadpan, never flagged as a joke.
//
//   1  Mr Bowen tests his spoon. The lamp stays off.
//   2  A key. A coin. A nail. Off. Off. Off.
//   3  "Everything is a non-metal." He writes it down.
//   4  He puts it on the wall. Big letters.
//   then the question — is everything a non-metal? What went wrong? — and the
//   clue: touch the two clips together first. His lamp is broken. The next
//   slide names it: check the lamp first, and make good contact.
// Mr Bowen is the shared cartoon (src/lib/mrBowen.js).
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { INK, TEAL, RULE, RED, KEY, FONT, circuit, GAP, spoonFlat, nail, mark } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const BLUE = '#1a5fa8'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 44
const BOWEN = 0.82
const BOWEN_Y = FLOOR - 268 * BOWEN
const BX = 82 // Mr Bowen's middle, from the panel's left edge
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

// the table, and the circuit on it
const TABLE_TOP = FLOOR - 116
const CS = 0.33
const cx0 = (x) => x + 158 // the circuit's left edge
const cy0 = TABLE_TOP - 108 // the circuit's top edge
const gapAt = (x) => [cx0(x) + GAP.x * CS, cy0 + GAP.y * CS]

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['Mr Bowen tests his spoon.', 'The lamp stays off.'], ['M. Bowen teste sa cuillère.', 'La lampe reste éteinte.']],
  [['A key. A coin. A nail.', 'Off. Off. Off.'], ['Clé, pièce, clou.', 'Éteinte. Éteinte. Éteinte.']],
  [['He writes it down.', 'He is very sure.'], ['Il l’écrit.', 'Il en est très sûr.']],
  [['He puts it on the wall.', 'Big letters.'], ['Il l’affiche au mur.', 'En grosses lettres.']],
]
const LAST = 4 // panels 0-3, then the clue

function Floor({ x }) {
  return <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke="#c9d3dc" strokeWidth="3" />
}

function Bench({ x, thing }) {
  const [gx, gy] = gapAt(x)
  return (
    <g>
      <rect x={x + 150} y={TABLE_TOP} width="222" height="16" rx="4" fill="#b5835a" stroke={INK} strokeWidth="3" />
      <path d={`M ${x + 168} ${TABLE_TOP + 16} V ${FLOOR} M ${x + 354} ${TABLE_TOP + 16} V ${FLOOR}`} stroke={INK} strokeWidth="5" />
      <Pic svg={circuit(cx0(x), cy0, CS)} />
      <Pic svg={thing(gx, gy, CS)} />
    </g>
  )
}

/* ── the four panels ── */
function Spoon({ x }) {
  return (
    <g>
      <Floor x={x} />
      <Bench x={x} thing={spoonFlat} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handRight={[84, 44]} />
    </g>
  )
}

function Everything({ x }) {
  return (
    <g>
      <Floor x={x} />
      <Bench x={x} thing={nail} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} mood="sad" />
      {[0, 1, 2].map((i) => <Pic key={i} svg={mark(x + 214 + i * 56, TOP + 70, false, 0.9)} />)}
    </g>
  )
}

function Writes({ x, lang }) {
  const [hx, hy] = [x + BX + 40 * BOWEN, BOWEN_Y + 70 * BOWEN]
  return (
    <g>
      <Floor x={x} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handRight={[40, 70]} />
      <rect x={hx - 6} y={hy - 40} width="46" height="58" rx="4" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <path d={`M ${hx + 2} ${hy - 26} h 30 M ${hx + 2} ${hy - 14} h 30 M ${hx + 2} ${hy - 2} h 22`} stroke="#9aa5ae" strokeWidth="3" />
      <path d={`M ${x + 182} ${TOP + 70} h 180 q 12 0 12 12 v 84 q 0 12 -12 12 h -120 l -26 26 l 4 -26 h -38 q -12 0 -12 -12 v -84 q 0 -12 12 -12 z`} fill="#ffffff" stroke={INK} strokeWidth="3" />
      <text x={x + 278} y={TOP + 116} fontFamily={FONT} fontSize="25" fontWeight="900" fill={INK} textAnchor="middle">{t(lang, 'Everything is', 'Tout est')}</text>
      <text x={x + 278} y={TOP + 148} fontFamily={FONT} fontSize="25" fontWeight="900" fill={INK} textAnchor="middle">{t(lang, 'a non-metal.', 'un non-métal.')}</text>
    </g>
  )
}

function Poster({ x, lang }) {
  return (
    <g>
      <Floor x={x} />
      <rect x={x + 150} y={TOP + 64} width="214" height="176" rx="8" fill="#fff8e6" stroke={KEY} strokeWidth="5" />
      <text x={x + 257} y={TOP + 120} fontFamily={FONT} fontSize="30" fontWeight="900" fill={RED} textAnchor="middle">{t(lang, 'EVERYTHING', 'TOUT EST')}</text>
      <text x={x + 257} y={TOP + 164} fontFamily={FONT} fontSize="30" fontWeight="900" fill={RED} textAnchor="middle">{t(lang, 'IS A', 'UN')}</text>
      <text x={x + 257} y={TOP + 208} fontFamily={FONT} fontSize="30" fontWeight="900" fill={RED} textAnchor="middle">{t(lang, 'NON-METAL', 'NON-MÉTAL')}</text>
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handRight={[78, -6]} elbowRight={[60, 70]} />
    </g>
  )
}

const PANELS = [Spoon, Everything, Writes, Poster]

export function LampStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`lampstory-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
            ))}
          </defs>
          {PANELS.map((Panel, i) => {
            const x = px(i)
            const shown = i <= k
            return (
              <g key={i}>
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? '#fbfdff' : '#f4f6f8'}
                  stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                {shown ? (
                  <g clipPath={`url(#lampstory-p${i})`}>
                    <Panel x={x} lang={lang} />
                  </g>
                ) : (
                  <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
                )}
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill="none" stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                <circle cx={x + 32} cy={TOP + 32} r="24" fill={shown ? BLUE : RULE} />
                <text x={x + 32} y={TOP + 42} fontFamily={FONT} fontSize="28" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                {shown && (
                  <g>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 40} fontFamily={FONT} fontSize="29" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 76} fontFamily={FONT} fontSize="27" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="512" width="1580" height="92" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 552 : 570} fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'Is everything a non-metal? What went wrong?', 'Tout est-il un non-métal ? Qu’est-ce qui n’a pas marché ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="590" fontFamily={FONT} fontSize="29" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: touch the two clips together first.', 'Un indice : touche d’abord les deux pinces ensemble.')}
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k >= LAST - 1 ? t(lang, 'A clue', 'Un indice') : t(lang, 'What happens next?', 'Et ensuite ?')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
