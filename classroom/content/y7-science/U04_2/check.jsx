// content/y7-science/U04_2/check.jsx
// THE VIRUS AND THE SEVEN — after Activity 4.2.1, the groups' reasons checked
// against 4.1's seven characteristics, one row a press (the shape of 4.1's
// car check). Before each press, thumbs: up, a virus does it; down, it does
// not; sideways, sort of. The press marks it and says why. Adding it up is
// slide 17's two write panels, which leave the question open, as the book
// does ("Some scientists consider that viruses are living organisms. Others
// think that they are not.").
//
// Page 132: "They do not respire, feed, excrete or grow. They are not
// sensitive and cannot move." Reproduction is the one "sort of": a virus is
// copied, but only inside a living cell, and the cell does the work.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { SEVEN, mark, INK, KEY, MUTED, FONT } from './art.js'
import fluVirus from './images/flu-virus.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const TEAL = '#0087a8', RULE = '#d5dbe1', PALE = '#f4f6f8'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

const LETTERS = ['M', 'R', 'S', 'G', 'R', 'E', 'N']
// The seven in English in both languages: they are what the class writes, and
// their first letters spell MRS GREN.
const WORDS = ['Movement', 'Respiration', 'Sensitivity', 'Growth', 'Reproduction', 'Excretion', 'Nutrition']

// Does a virus do it, on its own? (page 132)
const VIRUS = [
  ['no', 'It cannot move on its own.', 'Il ne bouge pas tout seul.'],
  ['no', 'No cells, so no respiration.', 'Pas de cellules, pas de respiration.'],
  ['no', 'It notices nothing.', 'Il ne remarque rien.'],
  ['no', 'It never gets bigger.', 'Il ne grandit jamais.'],
  ['sort', 'Copies, but only inside a cell.', 'Des copies, mais dans une cellule.'],
  ['no', 'It makes no waste.', 'Il ne rejette rien.'],
  ['no', 'It never feeds.', 'Il ne se nourrit jamais.'],
]
const LAST = 7

const ROW0 = 26
const ROW_H = 62
const rowY = (i) => ROW0 + i * ROW_H

export function VirusSeven({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // rows 0..k-1 are shown
  const big = isDisplayMode
  const fr = lang === 'fr'
  const tag = t(lang, 'a flu virus', 'un virus de la grippe')
  const tagW = tag.length * 14 + 32

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          <defs>
            <clipPath id="virus-seven-photo"><rect x="20" y="26" width="470" height="428" rx="16" /></clipPath>
          </defs>
          <image href={fluVirus} x="20" y="26" width="470" height="428" preserveAspectRatio="xMidYMid slice" clipPath="url(#virus-seven-photo)" />
          <rect x="20" y="26" width="470" height="428" rx="16" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="34" y="40" width={tagW} height="44" rx="12" fill="#ffffff" fillOpacity="0.9" />
          <text x={34 + tagW / 2} y="71" fontFamily={FONT} fontSize="25" fontWeight="800" fill={INK} textAnchor="middle">{tag}</text>

          {LETTERS.map((letter, i) => {
            const y = rowY(i)
            const shown = i < k
            const next = i === k && k < 7
            const cy = y + ROW_H / 2 - 4
            const [kind, en, frText] = VIRUS[i]
            return (
              <g key={i}>
                <rect x="510" y={y} width="970" height={ROW_H - 8} rx="12" fill={shown ? '#fbfdff' : PALE} stroke={next ? KEY : shown ? '#c9d3dc' : RULE} strokeWidth={next ? 4 : 2} />
                <circle cx="550" cy={cy} r="25" fill={shown ? TEAL : next ? KEY : '#9aa5ae'} />
                <text x="550" y={cy + 11} fontFamily={FONT} fontSize="30" fontWeight="900" fill="#ffffff" textAnchor="middle">{letter}</text>
                <Pic svg={SEVEN[i](616, cy, 0.42)} />
                <text x="662" y={cy + 11} fontFamily={FONT} fontSize="31" fontWeight="900" fill={KEY}>{WORDS[i]}</text>
                {shown && (
                  <g>
                    <Pic svg={mark(922, cy, kind, 1)} />
                    <text x="954" y={cy + 10} fontFamily={FONT} fontSize="26" fontWeight="700" fill={INK}>{fr ? frText : en}</text>
                  </g>
                )}
              </g>
            )
          })}

          <text x="995" y="526" fontFamily={FONT} fontSize="24" fontWeight="800" fill={MUTED} textAnchor="middle">
            {t(lang, 'Thumbs up: yes. Down: no. Sideways: sort of.', 'Pouce en haut : oui. En bas : non. De côté : plus ou moins.')}
          </text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {t(lang, `Show ${LETTERS[Math.min(k, 6)]}`, `Voir ${LETTERS[Math.min(k, 6)]}`)}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
