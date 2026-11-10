// content/y7-science/U04_1/quiz.jsx
// QUESTIONS 1–7 (page 129), one at a time, on whiteboards. The book's word
// list stays on top; the sentence is big, with a gap. Everyone writes the
// missing word; Show the answer fills the gap and rings the word in the list.
// The list has traps (chewing, oxygen, sight) and a word can be used more
// than once or not at all, as the book says.
//
// The sentences stay in English (the class writes the English word); in
// French a grey line under each one says it in French.
import { useState } from 'react'
import { ChevronRight, Undo2, Eye } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, FONT } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const TEAL = '#0087a8', RULE = '#d5dbe1'
const GAP = '____'
const NB = String.fromCharCode(160) // a no-break space, for French punctuation in template strings

const WORDS = ['carbon dioxide', 'chewing', 'feeding', 'growth', 'movement', 'oxygen', 'sight', 'smell', 'reproduce', 'respiration']

// [English lines with one GAP, answer, French line]
const QUESTIONS = [
  [['Another word for taking in', `nutrition is ${GAP} .`], 'feeding', 'Un autre mot pour « prendre sa nourriture »…'],
  [['Polar bears can sense the', `${GAP} of meat with their nose.`], 'smell', 'Avec leur nez, les ours polaires sentent… de la viande.'],
  [[`Animals excrete ${GAP}`, 'when they breathe out.'], 'carbon dioxide', 'Les animaux rejettent… quand ils expirent.'],
  [[`Living organisms ${GAP} to make`, 'more of the same kind of organism.'], 'reproduce', 'Les êtres vivants… pour faire d’autres êtres comme eux.'],
  [['Young plants and animals get', `bigger. This is called ${GAP} .`], 'growth', 'Les jeunes plantes et animaux grossissent. On appelle ça…'],
  [['Organisms break down food to get', `energy. This is called ${GAP} .`], 'respiration', 'Ils décomposent la nourriture pour l’énergie. On appelle ça…'],
  [['Changing the shape and position', `of your body is called ${GAP} .`], 'movement', 'Changer la forme et la position de son corps, c’est…'],
]

// Two rows of five words, each chip as wide as its word.
const CHIP_H = 46
const chipW = (w) => 40 + w.length * 15
function chipRows() {
  const rows = [WORDS.slice(0, 5), WORDS.slice(5)]
  return rows.flatMap((row, r) => {
    const total = row.reduce((s, w) => s + chipW(w), 0) + (row.length - 1) * 16
    let x = 750 - total / 2
    return row.map((w) => {
      const chip = { w, x, y: 34 + r * (CHIP_H + 14), width: chipW(w) }
      x += chip.width + 16
      return chip
    })
  })
}
const CHIPS = chipRows()

export function BlankQuestions({ lang = 'en', isDisplayMode = false }) {
  const [q, setQ] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const [lines, answer, frLine] = QUESTIONS[q]

  const line = (s, y) => {
    const parts = s.split(GAP)
    return (
      <text x="750" y={y} fontFamily={FONT} fontSize="42" fontWeight="800" fill={INK} textAnchor="middle">
        {parts[0]}
        {parts.length > 1 && (
          <tspan fill={shown ? KEY : '#9aa5ae'} fontWeight="900" textDecoration={shown ? undefined : 'none'}>
            {shown ? answer : '________'}
          </tspan>
        )}
        {parts.length > 1 && parts[1]}
      </text>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
          <rect x="20" y="16" width="1460" height="140" rx="16" fill="#fff4e8" stroke={KEY} strokeWidth="2" />
          {CHIPS.map((c) => {
            const on = shown && c.w === answer
            return (
              <g key={c.w}>
                <rect x={c.x} y={c.y} width={c.width} height={CHIP_H} rx="23" fill={on ? KEY : '#ffffff'} stroke={on ? KEY : '#e0b48f'} strokeWidth={on ? 4 : 2} />
                <text x={c.x + c.width / 2} y={c.y + 32} fontFamily={FONT} fontSize="25" fontWeight="800" fill={on ? '#ffffff' : INK} textAnchor="middle">{c.w}</text>
              </g>
            )
          })}

          <circle cx="70" cy="226" r="30" fill={TEAL} />
          <text x="70" y="238" fontFamily={FONT} fontSize="32" fontWeight="900" fill="#ffffff" textAnchor="middle">{q + 1}</text>
          {line(lines[0], 260)}
          {line(lines[1], 330)}
          {lang === 'fr' && (
            <text x="750" y="400" fontFamily={FONT} fontSize="26" fontWeight="700" fill={MUTED} textAnchor="middle">{frLine}</text>
          )}
          <line x1="40" y1="440" x2="1460" y2="440" stroke={RULE} strokeWidth="2" />
          <text x="750" y="488" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED} textAnchor="middle">
            {t(lang, `Question ${q + 1} of 7: write the missing word on your whiteboard.`, `Question ${q + 1} sur 7${NB}: écris le mot qui manque sur ton ardoise.`)}
          </text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={q === 0 && !shown} onClick={() => { if (shown) setShown(false); else { setQ((v) => v - 1); setShown(true) } }}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the answer', 'Voir la réponse')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={q === QUESTIONS.length - 1} onClick={() => { setQ((v) => v + 1); setShown(false) }}>{t(lang, 'Next question', 'Question suivante')}</Btn>
      </div>
    </div>
  )
}
