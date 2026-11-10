// content/y7-science/U01_3/widgets.jsx
// Interactive tool for 1.3 Specialised cells.
//
// One widget only, on purpose. The definitions and the table are things the
// class copies into a notebook, not things to click. What a static slide cannot
// do is make the class PREDICT before it sees the answer, one cell at a time, at
// the teacher's pace — so this deck shows each specialised cell's real photo and
// reveals its job, then its adaptation, only when the class has committed to a
// guess. It is the recall pass that builds straight into the structure-function
// table they have to make.
//
// It takes the deck's `lang` so its own text is bilingual, and colours each cell
// crimson (animal) or green (plant) to keep the two groups straight.
import { useState } from 'react'
import { tr as pick } from '../../../src/lib/lang.js'
import blood from './images/blood.jpg'
import neuron from './images/neuron.jpg'
import trachea from './images/trachea.jpg'
import roothair from './images/roothair.jpg'
import leaf from './images/leaf.jpg'

const IMG = { blood, neuron, trachea, roothair, leaf }

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const CRIMSON = '#c2185b'

// Five specialised cells: three animal, two plant. Each is a job (function) and
// the structure that is adapted to carry it out — the two halves of the table.
const CARDS = [
  {
    img: 'blood', type: 'animal',
    name: 'Red blood cell', nameVn: 'Tế bào hồng cầu', nameFr: 'Globule rouge',
    job: 'Carries oxygen around the body.',
    jobVn: 'Vận chuyển oxy đi khắp cơ thể.',
    jobFr: 'Transporte l’oxygène dans tout le corps.',
    feature: 'It is packed with the red pigment haemoglobin, and has no nucleus — so there is more room for it.',
    featureVn: 'Nó chứa đầy sắc tố đỏ haemoglobin, và không có nhân — nên có nhiều chỗ hơn cho haemoglobin.',
    featureFr: 'Elle est pleine d’un pigment rouge, l’hémoglobine, et n’a pas de noyau — donc il y a plus de place pour l’hémoglobine.',
  },
  {
    img: 'neuron', type: 'animal',
    name: 'Neurone (nerve cell)', nameVn: 'Tế bào thần kinh', nameFr: 'Neurone',
    job: 'Carries electrical signals from one part of the body to another.',
    jobVn: 'Truyền tín hiệu điện từ bộ phận này của cơ thể đến bộ phận khác.',
    jobFr: 'Transporte des signaux électriques d’une partie du corps à une autre.',
    feature: 'It has a very long axon, so a signal can travel a long way, very fast.',
    featureVn: 'Nó có một sợi trục rất dài, nên tín hiệu truyền được rất xa và rất nhanh.',
    featureFr: 'Il a un très long axone, donc un signal peut aller très loin, très vite.',
  },
  {
    img: 'trachea', type: 'animal',
    name: 'Ciliated cell', nameVn: 'Tế bào có lông rung', nameFr: 'Cellule ciliée',
    job: 'Sweeps mucus, with trapped dust and germs, away from the lungs.',
    jobVn: 'Quét chất nhầy, cùng bụi và vi khuẩn bị giữ lại, ra khỏi phổi.',
    jobFr: 'Chasse le mucus, avec la poussière et les microbes piégés, loin des poumons.',
    feature: 'It has tiny moving hairs called cilia along its top edge.',
    featureVn: 'Nó có những sợi lông nhỏ biết chuyển động gọi là lông rung (cilia) ở mép trên.',
    featureFr: 'Elle a de minuscules poils qui bougent, les cils, sur son bord supérieur.',
  },
  {
    img: 'roothair', type: 'plant',
    name: 'Root hair cell', nameVn: 'Tế bào lông hút', nameFr: 'Poil absorbant',
    job: 'Absorbs (soaks up) water from the soil.',
    jobVn: 'Hấp thụ (hút) nước từ đất.',
    jobFr: 'Absorbe (aspire) l’eau du sol.',
    feature: 'It has a long, thin extension, giving a big surface for water to move in through.',
    featureVn: 'Nó có phần kéo dài, dài và mảnh, tạo bề mặt lớn để nước đi vào.',
    featureFr: 'Elle a un prolongement long et fin, qui donne une grande surface pour que l’eau entre.',
  },
  {
    img: 'leaf', type: 'plant',
    name: 'Palisade cell', nameVn: 'Tế bào mô giậu', nameFr: 'Cellule palissadique',
    job: 'Makes food for the plant by photosynthesis.',
    jobVn: 'Tạo thức ăn cho cây bằng quang hợp.',
    jobFr: 'Fabrique la nourriture de la plante par photosynthèse.',
    feature: 'It is packed with chloroplasts, near the top of the leaf where the sunlight is.',
    featureVn: 'Nó chứa đầy lục lạp, nằm gần mặt trên của lá nơi có ánh sáng mặt trời.',
    featureFr: 'Elle est pleine de chloroplastes, près du haut de la feuille, là où est la lumière du soleil.',
  },
]

const Stage = ({ children }) => (
  <div className="flex-1 min-h-[240px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-hidden">
    {children}
  </div>
)

export const SpecialisedCellWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0)
  const [step, setStep] = useState(0) // 0 prompt · 1 job · 2 feature
  const c = CARDS[i]
  const colour = c.type === 'plant' ? GREEN : CRIMSON
  const last = i === CARDS.length - 1
  const go = (n) => { setI(n); setStep(0) }

  const nextLabel =
    step === 0 ? pick(lang, 'What is its job?', 'Nhiệm vụ của nó là gì?', 'Quel est son travail ?')
      : step === 1 ? pick(lang, 'How is it adapted?', 'Nó thích nghi thế nào?', 'Quelle adaptation ?')
        : pick(lang, 'Next cell', 'Tế bào tiếp theo', 'Cellule suivante')

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white rounded-full px-2 py-0.5 shrink-0"
            style={{ backgroundColor: colour }}>
            {c.type === 'plant' ? pick(lang, 'Plant', 'Thực vật', 'Plante') : pick(lang, 'Animal', 'Động vật', 'Animal')}
          </span>
          <span className="font-black text-xs sm:text-sm uppercase tracking-[0.12em] truncate" style={{ color: colour }}>
            {pick(lang, c.name, c.nameVn, c.nameFr)}
          </span>
          <span className="ml-auto font-mono font-black text-slate-400 text-xs tabular-nums shrink-0">{i + 1}/{CARDS.length}</span>
        </div>

        <div className="flex-1 min-h-0 rounded-xl overflow-hidden border-2 transition-colors duration-300" style={{ borderColor: colour }}>
          <img src={IMG[c.img]} alt={pick(lang, c.name, c.nameVn, c.nameFr)} className="w-full h-full object-cover" draggable={false} />
        </div>

        <div className="mt-2 space-y-1.5 flex-shrink-0">
          {step >= 1 && (
            <div className="rounded-xl px-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ backgroundColor: `${TEAL}12` }}>
              <span className="text-[10px] font-black uppercase tracking-widest mr-2" style={{ color: TEAL }}>{pick(lang, 'Its job', 'Nhiệm vụ', 'Travail')}</span>
              <span className="font-bold text-[13px] sm:text-[15px] text-slate-700 dark:text-slate-200">{pick(lang, c.job, c.jobVn, c.jobFr)}</span>
            </div>
          )}
          {step >= 2 && (
            <div className="rounded-xl px-3 py-2 border-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ borderColor: colour, backgroundColor: `${colour}0f` }}>
              <span className="text-[10px] font-black uppercase tracking-widest mr-2" style={{ color: colour }}>{pick(lang, 'Adapted because', 'Thích nghi vì', 'Adaptée car')}</span>
              <span className="font-bold text-[13px] sm:text-[15px] text-slate-700 dark:text-slate-200">{pick(lang, c.feature, c.featureVn, c.featureFr)}</span>
            </div>
          )}
        </div>
      </Stage>

      <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(Math.max(0, i - 1))}
            disabled={i === 0}
            className="px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 disabled:opacity-30 active:scale-95">
            {pick(lang, 'Back', 'Lùi', 'Retour')}
          </button>
          <button
            onClick={() => (step < 2 ? setStep(step + 1) : !last && go(i + 1))}
            disabled={step === 2 && last}
            className="flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 disabled:opacity-40 active:scale-95 transition-all"
            style={{ backgroundColor: step === 2 ? PURPLE : colour, borderColor: step === 2 ? PURPLE : colour }}>
            {step === 2 && last ? pick(lang, 'That is all five', 'Hết cả năm tế bào', 'Fini — les cinq') : nextLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
