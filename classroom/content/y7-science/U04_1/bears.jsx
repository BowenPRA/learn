// content/y7-science/U04_1/bears.jsx
// THE POLAR BEARS — MRS GREN, one characteristic a press, big (the shape of
// 3.4's harbour stepper: a big readout on the left, the picture on the right).
//
//   left     the letter, the science word and what the bear does, huge
//   right    the book's polar bears, cropped tight, with an orange ring on
//            the part of the bear that shows it (the paw, the nose, the cubs)
//   bottom   seven tiles, M R S G R E N. Done ones keep their word; the next
//            one is ringed in orange, so the class says its word before the
//            press.
//
// The last press spells the name: Mrs Gren.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, FONT } from './art.js'
import bearsPhoto from './images/polar-bears.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const TEAL = '#0087a8', RULE = '#d5dbe1'

// The part of the photograph shown (photo pixels, 1200 × 800): the bears.
const CROP = { x: 110, y: 170, w: 990, h: 380 }
const PH = { x: 490, y: 20, w: 990, h: 380 } // where it sits on the stage (1 : 1)

// [letter, word EN, word FR, line EN, line FR, rings [cx, cy, rx, ry] in photo pixels]
const SEVEN = [
  ['M', 'Movement', 'Mouvement', ['It walks and swims.'], ['Il marche et il nage.'], [[165, 452, 46, 30], [300, 462, 46, 30]]],
  ['R', 'Respiration', 'Respiration', ['Its cells get', 'energy from food.'], ['Ses cellules tirent', 'l’énergie des aliments.'], [[350, 345, 150, 95]]],
  ['S', 'Sensitivity', 'Sensibilité', ['It smells meat.'], ['Il sent la viande.'], [[222, 282, 38, 34]]],
  ['G', 'Growth', 'Croissance', ['The cubs get bigger.'], ['Les petits grandissent.'], [[628, 410, 108, 76], [932, 420, 120, 76]]],
  ['R', 'Reproduction', 'Reproduction', ['It has cubs.'], ['L’ourse a des petits.'], [[628, 410, 108, 76], [932, 420, 120, 76]]],
  ['E', 'Excretion', 'Excrétion', ['It breathes out', 'carbon dioxide.'], ['Il rejette du', 'dioxyde de carbone.'], [[224, 300, 36, 26]]],
  ['N', 'Nutrition', 'Nutrition', ['It eats meat.'], ['Il mange de la viande.'], [[224, 300, 36, 26]]],
]
const LAST = 8 // seven, then the name

const TILE_W = 196
const TILE_GAP = 15
const TILE_Y = 430
const TILE_H = 122
const tileX = (i) => 20 + i * (TILE_W + TILE_GAP)

// A puff of breath beside the bear's nose (Excretion).
function Breath() {
  return (
    <g fill="#ffffff" fillOpacity="0.85" stroke={KEY} strokeWidth="3">
      <circle cx="184" cy="306" r="11" />
      <circle cx="162" cy="294" r="15" />
      <circle cx="160" cy="322" r="12" />
      <circle cx="136" cy="306" r="14" />
    </g>
  )
}

export function BearSeven({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // 0..7 shown so far; 8 = the name
  const big = isDisplayMode
  const fr = lang === 'fr'
  const cur = k >= 1 && k <= 7 ? SEVEN[k - 1] : null
  const lines = cur ? (fr ? cur[4] : cur[3]) : []

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 572" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="572" rx="16" fill="#ffffff" />

          {/* the photograph, cropped to the bears, and the ring */}
          <defs><clipPath id="bears-crop"><rect x={CROP.x} y={CROP.y} width={CROP.w} height={CROP.h} rx="16" /></clipPath></defs>
          <svg x={PH.x} y={PH.y} width={PH.w} height={PH.h} viewBox={`${CROP.x} ${CROP.y} ${CROP.w} ${CROP.h}`}>
            <g clipPath="url(#bears-crop)">
              <image href={bearsPhoto} x="0" y="0" width="1200" height="800" />
              {cur && cur[5].map(([cx, cy, rx, ry], j) => (
                <ellipse key={`${k}-${j}`} cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={KEY} strokeWidth="7" />
              ))}
              {cur && cur[0] === 'E' && <Breath />}
            </g>
          </svg>
          <rect x={PH.x} y={PH.y} width={PH.w} height={PH.h} rx="16" fill="none" stroke="#cbd5e1" strokeWidth="2" />

          {/* the readout */}
          {k === 0 && (
            <g>
              <circle cx="96" cy="88" r="64" fill={KEY} />
              <text x="96" y="110" fontFamily={FONT} fontSize="66" fontWeight="900" fill="#ffffff" textAnchor="middle">M</text>
              <text x="30" y="226" fontFamily={FONT} fontSize="52" fontWeight="900" fill="#b9c2ca">?</text>
              <text x="30" y="292" fontFamily={FONT} fontSize="33" fontWeight="800" fill={MUTED}>{t(lang, 'Say a word for M.', 'Dis un mot pour M.')}</text>
            </g>
          )}
          {cur && (
            <g>
              <circle cx="96" cy="88" r="64" fill={KEY} />
              <text x="96" y="110" fontFamily={FONT} fontSize="66" fontWeight="900" fill="#ffffff" textAnchor="middle">{cur[0]}</text>
              <text x="30" y="226" fontFamily={FONT} fontSize="52" fontWeight="900" fill={KEY}>{fr ? cur[2] : cur[1]}</text>
              {lines.map((line, j) => (
                <text key={j} x="30" y={292 + j * 44} fontFamily={FONT} fontSize="33" fontWeight="800" fill={INK}>{line}</text>
              ))}
            </g>
          )}
          {k >= LAST && (
            <g>
              <text x="30" y="120" fontFamily={FONT} fontSize="40" fontWeight="900" fill={INK}>{t(lang, 'Read the letters.', 'Lis les lettres.')}</text>
              <text x="30" y="196" fontFamily={FONT} fontSize="34" fontWeight="800" fill={INK}>{t(lang, 'Remember her name:', 'Retiens son nom :')}</text>
              <text x="30" y="278" fontFamily={FONT} fontSize="66" fontWeight="900" fill={KEY}>Mrs Gren</text>
            </g>
          )}

          {/* the seven tiles */}
          {SEVEN.map(([letter, en, frWord], i) => {
            const done = i < k
            const next = i === k && k < 7
            const x = tileX(i)
            const glow = k >= LAST
            return (
              <g key={i}>
                <rect x={x} y={TILE_Y} width={TILE_W} height={TILE_H} rx="16"
                  fill={glow ? '#fff4e8' : done ? '#e2f2f6' : '#f4f6f8'}
                  stroke={next ? KEY : glow ? KEY : done ? TEAL : RULE} strokeWidth={next ? 6 : 3} />
                <text x={x + TILE_W / 2} y={TILE_Y + 60} fontFamily={FONT} fontSize="52" fontWeight="900"
                  fill={glow ? KEY : done ? TEAL : next ? KEY : '#9aa5ae'} textAnchor="middle">{letter}</text>
                <text x={x + TILE_W / 2} y={TILE_Y + 102} fontFamily={FONT} fontSize="25" fontWeight="800"
                  fill={done ? INK : '#9aa5ae'} textAnchor="middle">{done ? (fr ? frWord : en) : '?'}</text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k >= 7 ? t(lang, 'Her name', 'Son nom') : t(lang, `Show ${SEVEN[k][0]}`, `Voir ${SEVEN[k][0]}`)}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
