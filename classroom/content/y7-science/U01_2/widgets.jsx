import { useState } from 'react'
import { tr as t } from '../../../src/lib/lang.js'
import mossCells from './images/moss-cells.jpg'
import cheekCells from './images/cheek-cells.jpg'
import onionCells from './images/onion-cells.jpg'
import bloodCells from './images/blood-cells.jpg'
import quizPondweed from './images/quiz-pondweed.jpg'
import quizMuscle from './images/quiz-muscle.jpg'
import quizRhoeo from './images/quiz-rhoeo.jpg'
import quizBlood from './images/quiz-blood.jpg'

// Cambridge palette, matching the deck's note cards and diagrams.
const TEAL = '#0087a8'
const GREEN = '#4a8b23'
const CRIMSON = '#c2185b'
const RED = '#c8102e'

/* ============================================================= *
 * PLANT OR ANIMAL?
 *
 * Two halves, and the difference between them matters.
 *
 * 1. Four WORKED EXAMPLES. The caption names the specimen, so
 *    there is nothing to guess — these are for teaching the rule,
 *    and the reason is on screen straight away. No buttons.
 *
 * 2. Four to GUESS. Numbered only: nothing in the caption gives
 *    the answer away. Buttons appear, the class votes, then the
 *    verdict and the reason.
 *
 * Photograph 3 of the guessing round is the trap on purpose:
 * Rhoeo epidermis is a plant with no chloroplasts at all, so
 * anyone running on "green means plant" gets it wrong. The slide
 * after this widget is built on them getting it wrong.
 * ============================================================= */
const SPECIMENS = [
  // ── Worked examples: named, answer shown immediately ──────────
  {
    image: mossCells,
    name: 'A moss leaf', nameVn: 'Lá rêu', nameFr: 'Feuille de mousse',
    answer: 'plant',
    why: 'Straight walls in a brick pattern, and every cell is stuffed with green **chloroplasts**. Both are plant-only.',
    whyVn: 'Những vách thẳng xếp như gạch, và mỗi tế bào chứa đầy **lục lạp** xanh. Cả hai đều chỉ có ở thực vật.',
    whyFr: 'Des parois droites rangées comme des briques, et chaque cellule est pleine de **chloroplastes** verts. Les deux existent seulement chez les plantes.',
  },
  {
    image: cheekCells,
    name: 'Cells from someone’s cheek', nameVn: 'Tế bào lấy từ má một người', nameFr: 'Cellules d’une joue',
    answer: 'animal',
    why: 'Soft, shapeless and not a single straight edge — so there is no **cell wall**. The small dark dot in each one is its nucleus.',
    whyVn: 'Mềm, không có hình dạng cố định và không hề có cạnh thẳng — vậy là không có **thành tế bào**. Chấm sẫm nhỏ trong mỗi tế bào là nhân.',
    whyFr: 'Molles, sans forme et sans un seul bord droit — donc pas de **paroi cellulaire**. Le petit point foncé dans chacune est son noyau.',
  },
  {
    image: onionCells,
    name: 'An onion', nameVn: 'Củ hành', nameFr: 'Un oignon',
    answer: 'plant',
    why: 'No green at all — and still a plant. Look for the long **straight walls** stacked like bricks. An onion bulb grows underground in the dark, so it has no chloroplasts.',
    whyVn: 'Không hề có màu xanh — mà vẫn là thực vật. Hãy nhìn những **thành tế bào thẳng** xếp như gạch. Củ hành mọc dưới đất trong bóng tối nên không có lục lạp.',
    whyFr: 'Pas de vert du tout — et pourtant c’est une plante. Cherche les longues **parois droites** rangées comme des briques. Un bulbe d’oignon pousse sous terre, dans le noir, donc il n’a pas de chloroplastes.',
  },
  {
    image: bloodCells,
    name: 'Human blood', nameVn: 'Máu người', nameFr: 'Sang humain',
    answer: 'animal',
    why: 'Round, separate and free to slide past each other. Nothing stiff is holding them in a shape, so there is no **cell wall**.',
    whyVn: 'Tròn, tách rời và trượt qua nhau được. Không có gì cứng giữ hình dạng cho chúng, nên không có **thành tế bào**.',
    whyFr: 'Rondes, séparées et libres de glisser les unes sur les autres. Rien de rigide ne leur donne une forme, donc pas de **paroi cellulaire**.',
  },

  // ── Your turn: numbered only, nothing given away ──────────────
  {
    quiz: true,
    image: quizPondweed,
    answer: 'plant',
    why: 'Every cell is a neat box with a **straight wall**, and packed with green **chloroplasts**. It is the tip of a pondweed leaf.',
    whyVn: 'Mỗi tế bào là một chiếc hộp gọn gàng có **thành thẳng**, và chứa đầy **lục lạp** xanh. Đây là đầu lá rong đuôi chó.',
    whyFr: 'Chaque cellule est une boîte nette avec une **paroi droite**, pleine de **chloroplastes** verts. C’est le bout d’une feuille de plante d’étang.',
  },
  {
    quiz: true,
    image: quizMuscle,
    answer: 'animal',
    why: 'Long soft pink fibres with dark **nuclei** scattered along them, and no straight walls anywhere. This is **muscle** — the tissue that moves you.',
    whyVn: 'Những sợi hồng dài và mềm, có các **nhân** sẫm màu rải rác, và không hề có thành thẳng. Đây là **cơ** — mô giúp em cử động.',
    whyFr: 'De longues fibres roses et molles, avec des **noyaux** foncés éparpillés, et aucune paroi droite. C’est du **muscle** — le tissu qui te fait bouger.',
  },
  {
    quiz: true,
    image: quizRhoeo,
    answer: 'plant',
    why: 'Purple, with not one chloroplast in sight — and still a plant. Look at the edges: every cell sits in a **straight-sided wall**, packed against its neighbours.',
    whyVn: 'Màu tím, không hề thấy một lục lạp nào — mà vẫn là thực vật. Hãy nhìn các cạnh: mỗi tế bào nằm trong một **thành có cạnh thẳng**, ép sát vào tế bào bên cạnh.',
    whyFr: 'Violet, sans un seul chloroplaste — et pourtant c’est une plante. Regarde les bords : chaque cellule est dans une **paroi à côtés droits**, serrée contre ses voisines.',
  },
  {
    quiz: true,
    image: quizBlood,
    answer: 'animal',
    why: 'Round, loose and soft — no walls. The big one with the purple middle is a **white blood cell**; the rest are red blood cells.',
    whyVn: 'Tròn, rời rạc và mềm — không có thành. Tế bào lớn có phần giữa màu tím là **bạch cầu**; những tế bào còn lại là hồng cầu.',
    whyFr: 'Rondes, libres et molles — pas de paroi. La grosse au centre violet est un **globule blanc** ; les autres sont des globules rouges.',
  },
]

const FIRST_QUIZ = SPECIMENS.findIndex((s) => s.quiz)

/** Split on **bold** so a key word inside a reason can be emphasised. */
const withBold = (text, colour) =>
  text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} style={{ color: colour }}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>,
  )

export const PlantOrAnimalWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0)
  const [choice, setChoice] = useState(null)
  const cur = SPECIMENS[i]
  const isQuiz = !!cur.quiz
  const answered = choice !== null
  const right = choice === cur.answer
  // An example always shows its answer colour; a quiz photo stays neutral
  // until the class has committed to a vote.
  const colour = !isQuiz
    ? (cur.answer === 'plant' ? GREEN : CRIMSON)
    : !answered ? TEAL : right ? GREEN : RED
  const last = i === SPECIMENS.length - 1
  const showWhy = !isQuiz || answered

  const caption = isQuiz
    ? t(lang, `Photograph ${i - FIRST_QUIZ + 1}`, `Ảnh ${i - FIRST_QUIZ + 1}`, `Photo ${i - FIRST_QUIZ + 1}`)
    : t(lang, cur.name, cur.nameVn, cur.nameFr)
  const badge = isQuiz
    ? t(lang, 'Your turn', 'Đến lượt em', 'À toi')
    : t(lang, 'Example', 'Ví dụ', 'Exemple')

  const go = (n) => { setI(n); setChoice(null) }

  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="flex-1 min-h-[240px] w-full bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-inner flex flex-col p-3 sm:p-4 overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-white rounded-full px-2 py-0.5 shrink-0"
            style={{ backgroundColor: isQuiz ? TEAL : '#94a3b8' }}>
            {badge}
          </span>
          <span className="font-black text-xs sm:text-sm uppercase tracking-[0.12em] truncate" style={{ color: colour }}>
            {caption}
          </span>
          <span className="ml-auto font-mono font-black text-slate-400 text-xs tabular-nums shrink-0">{i + 1}/{SPECIMENS.length}</span>
        </div>

        {/* The photograph never leaves the screen — the class needs to keep
            pointing at it while they justify the answer. */}
        <div className="flex-1 min-h-0 rounded-xl overflow-hidden border-2 transition-colors duration-300"
          style={{ borderColor: colour }}>
          <img src={cur.image} alt={caption} className="w-full h-full object-cover" draggable={false} />
        </div>

        {isQuiz && !answered ? (
          <div className="grid grid-cols-2 gap-2 mt-2.5 flex-shrink-0">
            {[['plant', GREEN, t(lang, 'Plant cell', 'Tế bào thực vật', 'Cellule végétale')],
              ['animal', CRIMSON, t(lang, 'Animal cell', 'Tế bào động vật', 'Cellule animale')]].map(([key, c, label]) => (
              <button key={key} onClick={() => setChoice(key)}
                className="py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest text-white border-b-4 border-black/25 active:border-b-0 active:translate-y-1 transition-all"
                style={{ backgroundColor: c }}>
                {label}
              </button>
            ))}
          </div>
        ) : showWhy ? (
          <div className="mt-2.5 rounded-xl border-2 p-2.5 sm:p-3 flex-shrink-0 animate-in fade-in"
            style={{ borderColor: colour, backgroundColor: `${colour}0f` }}>
            <div className="font-black text-sm sm:text-base mb-1" style={{ color: colour }}>
              {!isQuiz
                ? t(lang, cur.answer === 'plant' ? 'A plant cell.' : 'An animal cell.',
                    cur.answer === 'plant' ? 'Tế bào thực vật.' : 'Tế bào động vật.',
                    cur.answer === 'plant' ? 'Une cellule végétale.' : 'Une cellule animale.')
                : right
                  ? t(lang, `Yes — ${cur.answer === 'plant' ? 'a plant' : 'an animal'} cell.`, `Đúng — tế bào ${cur.answer === 'plant' ? 'thực vật' : 'động vật'}.`, `Oui — cellule ${cur.answer === 'plant' ? 'végétale' : 'animale'}.`)
                  : t(lang, `No — it is ${cur.answer === 'plant' ? 'a plant' : 'an animal'} cell.`, `Chưa đúng — đây là tế bào ${cur.answer === 'plant' ? 'thực vật' : 'động vật'}.`, `Non — c’est une cellule ${cur.answer === 'plant' ? 'végétale' : 'animale'}.`)}
            </div>
            <p className="text-[13px] sm:text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug">
              {withBold(t(lang, cur.why, cur.whyVn, cur.whyFr), colour)}
            </p>
          </div>
        ) : null}
      </div>

      <div className="w-full flex items-center gap-2 mt-2 flex-shrink-0">
        <button
          onClick={() => go(Math.max(0, i - 1))}
          disabled={i === 0}
          className="px-4 py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2 border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-30 active:scale-95 transition-all">
          {t(lang, 'Back', 'Quay lại', 'Retour')}
        </button>
        <button
          onClick={() => go(Math.min(SPECIMENS.length - 1, i + 1))}
          disabled={last}
          className="flex-1 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest text-white disabled:opacity-40 active:scale-95 transition-all"
          style={{ backgroundColor: last ? GREEN : TEAL }}>
          {last
            ? t(lang, 'That is all eight', 'Hết cả tám ảnh', 'Fini — les huit')
            : i === FIRST_QUIZ - 1
              ? t(lang, 'Now you try', 'Giờ đến lượt em', 'À toi maintenant')
              : t(lang, 'Next photograph', 'Ảnh tiếp theo', 'Photo suivante')}
        </button>
      </div>
    </div>
  )
}
