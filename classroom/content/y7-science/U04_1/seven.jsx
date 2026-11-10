// content/y7-science/U04_1/seven.jsx
// SEVEN ROWS — the seven characteristics, M R S G R E N down the side of a
// photograph, one row a press. Two uses, one drawing:
//
//   BearSeven   the book's polar bears (page 128). Only the letters show at
//               first. Before each press the class says the word for the
//               next letter (the ring shows which); the press shows what the
//               bear does and the science word. The last press spells the
//               name: Mrs Gren.
//   CarCheck    Activity 4.1.1, Is a car alive? The seven words show. Before
//               each press, thumbs: up, the car does it; down, it does not;
//               sideways, sort of. The press marks it and says why. The last
//               press gives the verdict.
//
// The picture is never hidden, and a row never shows before its press.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { SEVEN, mark, INK, KEY, MUTED, RED, FONT } from './art.js'
import bearsPhoto from './images/polar-bears.jpg'
import carPhoto from './images/car.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const TEAL = '#0087a8', RULE = '#d5dbe1', PALE = '#f4f6f8'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

const LETTERS = ['M', 'R', 'S', 'G', 'R', 'E', 'N']
const WORDS = [
  ['Movement', 'Mouvement'],
  ['Respiration', 'Respiration'],
  ['Sensitivity', 'Sensibilité'],
  ['Growth', 'Croissance'],
  ['Reproduction', 'Reproduction'],
  ['Excretion', 'Excrétion'],
  ['Nutrition', 'Nutrition'],
]

// What the polar bear does (the book's labels and Questions 2, 3 and 5).
const BEAR = [
  ['It walks and swims.', 'Il marche et il nage.'],
  ['It gets energy from food.', 'Il tire de l’énergie des aliments.'],
  ['It smells meat.', 'Il sent l’odeur de la viande.'],
  ['The cubs get bigger.', 'Les petits grandissent.'],
  ['It has cubs.', 'Il a des petits.'],
  ['It breathes out carbon dioxide.', 'Il rejette du dioxyde de carbone.'],
  ['It eats meat.', 'Il mange de la viande.'],
]

// Does a car do it? (the book's four facts about cars, page 129)
const CAR = [
  ['yes', 'It moves.', 'Elle avance.'],
  ['sort', 'Energy from fuel, but no cells.', 'De l’énergie, mais sans cellules.'],
  ['sort', 'Some cars sense the dark.', 'Certaines sentent le noir.'],
  ['no', 'It never gets bigger.', 'Elle ne grandit jamais.'],
  ['no', 'It cannot make baby cars.', 'Pas de bébés voitures.'],
  ['sort', 'Waste gases leave the exhaust.', 'Des gaz sortent de l’échappement.'],
  ['sort', 'It takes in fuel, not food.', 'Du carburant, pas de nourriture.'],
]

const ROW0 = 26
const ROW_H = 62
const rowY = (i) => ROW0 + i * ROW_H

function SevenRows({ lang, isDisplayMode, mode }) {
  const [k, setK] = useState(0) // rows 0..k-1 are shown; k = 8 adds the last line
  const big = isDisplayMode
  const fr = lang === 'fr'
  const bear = mode === 'bear'
  const LAST = 8
  const photo = bear ? bearsPhoto : carPhoto

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          <defs>
            <clipPath id={`seven-photo-${mode}`}><rect x="20" y="140" width="470" height="248" rx="16" /></clipPath>
          </defs>
          <image href={photo} x="20" y="140" width="470" height="248" preserveAspectRatio="xMidYMid slice" clipPath={`url(#seven-photo-${mode})`} />
          <rect x="20" y="140" width="470" height="248" rx="16" fill="none" stroke="#cbd5e1" strokeWidth="2" />

          {LETTERS.map((letter, i) => {
            const y = rowY(i)
            const shown = i < k
            const next = i === k && k < 7
            const cy = y + ROW_H / 2 - 4
            const glow = bear && k >= LAST
            return (
              <g key={i}>
                <rect x="510" y={y} width="970" height={ROW_H - 8} rx="12" fill={shown ? '#fbfdff' : PALE} stroke={next ? KEY : shown ? '#c9d3dc' : RULE} strokeWidth={next ? 4 : 2} />
                <circle cx="550" cy={cy} r="25" fill={glow ? KEY : shown ? TEAL : next ? KEY : '#9aa5ae'} />
                <text x="550" y={cy + 11} fontFamily={FONT} fontSize="30" fontWeight="900" fill="#ffffff" textAnchor="middle">{letter}</text>
                {(shown || !bear) && <Pic svg={SEVEN[i](616, cy, 0.42)} />}
                {(shown || !bear) && (
                  <text x="662" y={cy + 11} fontFamily={FONT} fontSize="31" fontWeight="900" fill={KEY}>{fr ? WORDS[i][1] : WORDS[i][0]}</text>
                )}
                {bear && shown && (
                  <text x="906" y={cy + 10} fontFamily={FONT} fontSize="27" fontWeight="700" fill={INK}>{fr ? BEAR[i][1] : BEAR[i][0]}</text>
                )}
                {!bear && shown && (
                  <g>
                    <Pic svg={mark(922, cy, CAR[i][0], 1)} />
                    <text x="954" y={cy + 10} fontFamily={FONT} fontSize="26" fontWeight="700" fill={INK}>{fr ? CAR[i][2] : CAR[i][1]}</text>
                  </g>
                )}
                {!shown && bear && (
                  <text x="662" y={cy + 11} fontFamily={FONT} fontSize="31" fontWeight="900" fill="#b9c2ca">?</text>
                )}
              </g>
            )
          })}

          {k >= LAST && bear && (
            <g>
              <rect x="510" y="486" width="970" height="60" rx="14" fill="#fff4e8" stroke={KEY} strokeWidth="3" />
              <text x="995" y="527" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'Remember her name: Mrs Gren', 'Retiens son nom : Mrs Gren')}
              </text>
            </g>
          )}
          {k >= LAST && !bear && (
            <g>
              <rect x="510" y="486" width="970" height="60" rx="14" fill="#fdecee" stroke={RED} strokeWidth="3" />
              <text x="995" y="527" fontFamily={FONT} fontSize="27" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'Some of the seven, not all: a car is not alive.', 'Quelques-unes, pas toutes : elle n’est pas vivante.')}
              </text>
            </g>
          )}
          {k < LAST && !bear && (
            <text x="995" y="526" fontFamily={FONT} fontSize="24" fontWeight="800" fill={MUTED} textAnchor="middle">
              {t(lang, 'Thumbs up: yes. Down: no. Sideways: sort of.', 'Pouce en haut : oui. En bas : non. De côté : un peu.')}
            </text>
          )}
          {k < LAST && bear && (
            <text x="995" y="526" fontFamily={FONT} fontSize="24" fontWeight="800" fill={MUTED} textAnchor="middle">
              {k < 7 ? t(lang, 'Say the word before each press.', 'Dis le mot avant chaque clic.') : t(lang, 'Now read the letters down.', 'Lis maintenant les lettres de haut en bas.')}
            </text>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k >= 7 ? (bear ? t(lang, 'Her name', 'Son nom') : t(lang, 'Is it alive?', 'Est-elle vivante ?')) : t(lang, `Show ${LETTERS[k]}`, `Voir ${LETTERS[k]}`)}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

export function CarCheck({ lang = 'en', isDisplayMode = false }) {
  return <SevenRows lang={lang} isDisplayMode={isDisplayMode} mode="car" />
}
