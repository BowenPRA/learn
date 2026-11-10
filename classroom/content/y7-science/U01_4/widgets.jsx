// content/y7-science/U01_4/widgets.jsx
// One interactive tool for 1.4 Cells, tissues and organs.
//
// The four definitions are things the class copies into a notebook, not things
// to click. What a static slide cannot do is run a whole-class drill: put up ONE
// thing at a time, make all thirty students commit to an answer at once, and
// only then show whether they were right — at the teacher's pace, twelve times
// in five minutes. Slides cannot hide the answer and reveal it on cue; a printed
// list of twelve answers is a list of twelve answers.
//
// The commitment is physical, which is the point in an ESL room: fingers up,
// 1 to 5, no English required to answer. The five-level key stays on screen the
// whole time so a student who has forgotten the word can still play, and the
// levels run left to right in the same order as the ladder they have just drawn.
//
// It takes the deck's `lang`, so every string here has Vietnamese and French twins.
import { useState } from 'react'
import { tr as pick } from '../../../src/lib/lang.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'

// The five levels, in ladder order. The index+1 is the number of fingers.
const LEVELS = [
  { name: 'cell', nameVn: 'tế bào', nameFr: 'cellule', colour: '#c2185b' },
  { name: 'tissue', nameVn: 'mô', nameFr: 'tissu', colour: '#4a8b23' },
  { name: 'organ', nameVn: 'cơ quan', nameFr: 'organe', colour: '#c25e12' },
  { name: 'organ system', nameVn: 'hệ cơ quan', nameFr: 'système d’organes', colour: '#0087a8' },
  { name: 'organism', nameVn: 'sinh vật', nameFr: 'organisme', colour: '#5c2483' },
]

// Twelve items, deliberately mixed: animal and plant, familiar and just-taught,
// and several near-misses (a leaf is an organ, not a tissue; the palisade layer
// is a tissue, not an organ) because those are the ones the class gets wrong.
const ITEMS = [
  {
    name: 'a red blood cell', nameVn: 'một tế bào hồng cầu', nameFr: 'un globule rouge', level: 0,
    why: 'One single cell, on its own.',
    whyVn: 'Chỉ một tế bào đơn lẻ.',
    whyFr: 'Une seule cellule, toute seule.',
  },
  {
    name: 'ciliated epithelium', nameVn: 'biểu mô có lông rung', nameFr: 'l’épithélium cilié', level: 1,
    why: 'Many cells of the SAME kind, joined together, doing one job.',
    whyVn: 'Nhiều tế bào CÙNG loại, nối liền nhau, làm một nhiệm vụ.',
    whyFr: 'Beaucoup de cellules du MÊME type, collées, pour une seule tâche.',
  },
  {
    name: 'the heart', nameVn: 'quả tim', nameFr: 'le cœur', level: 2,
    why: 'One structure, built from several different tissues.',
    whyVn: 'Một cấu trúc, tạo nên từ nhiều loại mô khác nhau.',
    whyFr: 'Une structure faite de plusieurs tissus différents.',
  },
  {
    name: 'a leaf', nameVn: 'một chiếc lá', nameFr: 'une feuille', level: 2,
    why: 'Careful — a leaf is an ORGAN. It holds four different tissues.',
    whyVn: 'Cẩn thận — lá là một CƠ QUAN. Nó chứa bốn loại mô khác nhau.',
    whyFr: 'Attention — une feuille est un ORGANE. Elle contient quatre tissus différents.',
  },
  {
    name: 'the digestive system', nameVn: 'hệ tiêu hoá', nameFr: 'le système digestif', level: 3,
    why: 'Mouth, gullet, stomach and intestines, all working on the same job.',
    whyVn: 'Miệng, thực quản, dạ dày và ruột, tất cả cùng làm một nhiệm vụ.',
    whyFr: 'Bouche, œsophage, estomac et intestins, tous pour la même tâche.',
  },
  {
    name: 'a cat', nameVn: 'một con mèo', nameFr: 'un chat', level: 4,
    why: 'A whole living thing.',
    whyVn: 'Một sinh vật hoàn chỉnh.',
    whyFr: 'Un être vivant entier.',
  },
  {
    name: 'the palisade layer', nameVn: 'lớp mô giậu', nameFr: 'la couche palissadique', level: 1,
    why: 'Careful — a LAYER of one kind of cell is a tissue, not an organ.',
    whyVn: 'Cẩn thận — một LỚP gồm một loại tế bào là mô, không phải cơ quan.',
    whyFr: 'Attention — une COUCHE d’un seul type de cellule est un tissu, pas un organe.',
  },
  {
    name: 'a root hair cell', nameVn: 'một tế bào lông hút', nameFr: 'une cellule de poil absorbant', level: 0,
    why: 'One cell again — the one that soaks up water.',
    whyVn: 'Lại là một tế bào — loại tế bào hút nước.',
    whyFr: 'Encore une cellule — celle qui absorbe l’eau.',
  },
  {
    name: 'the stomach', nameVn: 'dạ dày', nameFr: 'l’estomac', level: 2,
    why: 'One organ. It is part of the digestive system.',
    whyVn: 'Một cơ quan. Nó thuộc hệ tiêu hoá.',
    whyFr: 'Un organe. Il fait partie du système digestif.',
  },
  {
    name: 'onion epidermis', nameVn: 'biểu bì hành tây', nameFr: 'l’épiderme d’oignon', level: 1,
    why: 'A plant tissue: the thin skin covering each layer inside the onion.',
    whyVn: 'Một loại mô thực vật: lớp da mỏng phủ mỗi lớp bên trong củ hành.',
    whyFr: 'Un tissu végétal : la peau fine qui couvre chaque couche de l’oignon.',
  },
  {
    name: 'the breathing system', nameVn: 'hệ hô hấp', nameFr: 'le système respiratoire', level: 3,
    why: 'Nose, windpipe and lungs — a set of organs sharing one job.',
    whyVn: 'Mũi, khí quản và phổi — một nhóm cơ quan cùng chung một nhiệm vụ.',
    whyFr: 'Nez, trachée et poumons — des organes qui partagent une tâche.',
  },
  {
    name: 'Mr Bowen', nameVn: 'Thầy Bowen', nameFr: 'M. Bowen', level: 4,
    why: 'A living thing, built from all four levels below.',
    whyVn: 'Một sinh vật sống, tạo nên từ cả bốn cấp độ bên dưới.',
    whyFr: 'Un être vivant, fait des quatre niveaux en dessous.',
  },
]

const Stage = ({ children }) => (
  <div className="flex-1 min-h-[240px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-hidden">
    {children}
  </div>
)

export const LevelDrillWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(false)
  const item = ITEMS[i]
  const answer = LEVELS[item.level]
  const last = i === ITEMS.length - 1
  const go = (n) => { setI(n); setShown(false) }

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center gap-2 mb-2 flex-shrink-0">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white rounded-full px-2 py-0.5 shrink-0"
            style={{ backgroundColor: PURPLE }}>
            {pick(lang, 'Fingers up', 'Giơ ngón tay', 'Doigts levés')}
          </span>
          <span className="font-black text-xs sm:text-sm uppercase tracking-[0.12em] truncate" style={{ color: PURPLE }}>
            {pick(lang, 'Which level is it?', 'Đây là cấp độ nào?', 'Quel niveau ?')}
          </span>
          <span className="ml-auto font-mono font-black text-slate-400 text-xs tabular-nums shrink-0">{i + 1}/{ITEMS.length}</span>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center rounded-xl border-2 px-4 transition-colors duration-300"
          style={{ borderColor: shown ? answer.colour : '#cbd5e1', backgroundColor: shown ? `${answer.colour}0f` : 'transparent' }}>
          <span className="font-black text-center leading-tight text-[clamp(1.3rem,3.4vw,2.4rem)] text-slate-800 dark:text-slate-100">
            {pick(lang, item.name, item.nameVn, item.nameFr)}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 mt-2 flex-shrink-0">
          {LEVELS.map((l, n) => {
            const hit = shown && n === item.level
            return (
              <div key={l.name}
                className={`rounded-lg border-2 px-1 py-1.5 text-center transition-all duration-300 ${hit ? 'scale-105' : ''}`}
                style={{
                  borderColor: hit ? l.colour : '#e2e8f0',
                  backgroundColor: hit ? l.colour : 'transparent',
                  opacity: shown && !hit ? 0.35 : 1,
                }}>
                <div className="font-mono font-black text-[13px] sm:text-base tabular-nums"
                  style={{ color: hit ? '#ffffff' : l.colour }}>{n + 1}</div>
                <div className="font-black uppercase tracking-wide text-[8px] sm:text-[10px] leading-tight"
                  style={{ color: hit ? '#ffffff' : l.colour }}>{pick(lang, l.name, l.nameVn, l.nameFr)}</div>
              </div>
            )
          })}
        </div>

        {shown && (
          <div className="mt-2 rounded-xl px-3 py-2 flex-shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ backgroundColor: `${TEAL}12` }}>
            <span className="text-[10px] font-black uppercase tracking-widest mr-2" style={{ color: TEAL }}>
              {pick(lang, 'Because', 'Vì', 'Car')}
            </span>
            <span className="font-bold text-[13px] sm:text-[15px] text-slate-700 dark:text-slate-200">
              {pick(lang, item.why, item.whyVn, item.whyFr)}
            </span>
          </div>
        )}
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
            onClick={() => (shown ? !last && go(i + 1) : setShown(true))}
            disabled={shown && last}
            className="flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 disabled:opacity-40 active:scale-95 transition-all"
            style={{ backgroundColor: shown ? PURPLE : ORANGE, borderColor: shown ? PURPLE : ORANGE }}>
            {shown
              ? (last ? pick(lang, 'That is all twelve', 'Hết cả mười hai', 'Fini, les douze') : pick(lang, 'Next one', 'Cái tiếp theo', 'Suivant'))
              : pick(lang, 'Show the answer', 'Hiện đáp án', 'Voir la réponse')}
          </button>
        </div>
      </div>
    </div>
  )
}
