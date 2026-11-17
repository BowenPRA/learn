// content/y7-science/U04_5/game.jsx
// GOOD QUESTION OR BAD? — the whole class standing (the shape of 4.4's Yes or
// No?). One real photograph from 4.4 and ONE question someone might put in a
// key. Is it a good question for a key? Everyone answers at once: arms up,
// good; arms down, bad. Wrong? Sit down. Eight rounds in a fixed order, four
// of each answer.
//
// A good question is one everyone answers the same way: you can count it,
// measure it or see it. The traps:
//   a snake     Is it longer than 1 metre?  GOOD (it sounds like "long", but
//                                            it has a number: measure it)
//   a bee       Is it dangerous?            BAD  (it sounds scientific, but
//                                            people will not agree)
// The photographs are 4.4's (classroom/content/y7-science/U04_4/images,
// credited in its CREDITS.json).
import { useState } from 'react'
import { ChevronRight, Eye, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { ArmsFigure } from '../U03_4/bodies.jsx'
import { INK, KEY, MUTED, FONT, RULE, TEAL } from '../U04_4/art.js'
import spider from '../U04_4/images/spider.jpg'
import snail from '../U04_4/images/snail.jpg'
import butterfly from '../U04_4/images/butterfly.jpg'
import snake from '../U04_4/images/snake.jpg'
import bee from '../U04_4/images/bee.jpg'
import earthworm from '../U04_4/images/earthworm.jpg'
import chicken from '../U04_4/images/chicken.jpg'
import ladybird from '../U04_4/images/ladybird.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const BLUE = '#1a5fa8', GREEN_DARK = '#3d731c'

// pic, [English name, French name], [the question, in English and French],
// good or bad, and why.
const ROUNDS = [
  { pic: spider, name: ['a spider', 'une araignée'], q: ['Does it have eight legs?', 'A-t-il huit pattes ?'], good: true,
    why: ['Good: count them.', 'Bonne : on peut compter.'] },
  { pic: snail, name: ['a snail', 'un escargot'], q: ['Is it slow?', 'Est-il lent ?'], good: false,
    why: ['Bad: slow next to what?', 'Mauvaise : lent à côté de quoi ?'] },
  { pic: butterfly, name: ['a butterfly', 'un papillon'], q: ['Is it beautiful?', 'Est-il beau ?'], good: false,
    why: ['Bad: people will not agree.', 'Mauvaise : on ne sera pas d’accord.'] },
  { pic: snake, name: ['a snake', 'un serpent'], q: ['Is it longer than 1 metre?', 'Mesure-t-il plus de 1 mètre ?'], good: true,
    why: ['Good: measure it.', 'Bonne : on peut mesurer.'] },
  { pic: bee, name: ['a bee', 'une abeille'], q: ['Is it dangerous?', 'Est-elle dangereuse ?'], good: false,
    why: ['Bad: you cannot see it. People disagree.', 'Mauvaise : ça ne se voit pas.'] },
  { pic: earthworm, name: ['an earthworm', 'un ver de terre'], q: ['Is its body made up of rings?', 'Son corps est-il fait d’anneaux ?'], good: true,
    why: ['Good: look and see.', 'Bonne : on peut regarder.'] },
  { pic: chicken, name: ['a chicken', 'une poule'], q: ['Is it big?', 'Est-elle grande ?'], good: false,
    why: ['Bad: big next to what?', 'Mauvaise : grande à côté de quoi ?'] },
  { pic: ladybird, name: ['a ladybird', 'une coccinelle'], q: ['Does it have black spots?', 'A-t-elle des points noirs ?'], good: true,
    why: ['Good: look and see.', 'Bonne : on peut regarder.'] },
]
const LAST = ROUNDS.length - 1

export function GoodOrBad({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const L = (pair) => (fr ? pair[1] : pair[0])
  const round = ROUNDS[n]
  const next = () => { setN((v) => Math.min(LAST, v + 1)); setShown(false) }

  const card = (x, up) => {
    const right = shown && up === round.good
    const fade = shown && up !== round.good
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="140" width="380" height="236" rx="20" fill={right ? '#eef6e6' : '#f7fafc'} stroke={right ? GREEN_DARK : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 190} y={234} up={up} color={up ? BLUE : KEY} s={0.9} />
        <text x={x + 190} y="322" fontFamily={FONT} fontSize="32" fontWeight="900" fill={up ? BLUE : KEY} textAnchor="middle">{up ? t(lang, 'ARMS UP', 'BRAS EN HAUT') : t(lang, 'ARMS DOWN', 'BRAS EN BAS')}</text>
        <text x={x + 190} y="360" fontFamily={FONT} fontSize="30" fontWeight="800" fill={INK} textAnchor="middle">{up ? t(lang, 'good question', 'bonne question') : t(lang, 'bad question', 'mauvaise question')}</text>
        {right && (
          <g>
            <circle cx={x + 342} cy="178" r="22" fill={GREEN_DARK} />
            <path d={`M ${x + 330} 178 l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
          <defs><clipPath id="gob-pic"><rect x="20" y="16" width="620" height="440" rx="16" /></clipPath></defs>

          <image href={round.pic} x="20" y="16" width="620" height="440" preserveAspectRatio="xMidYMid slice" clipPath="url(#gob-pic)" />
          <rect x="20" y="16" width="620" height="440" rx="16" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <text x="330" y="500" fontFamily={FONT} fontSize="34" fontWeight="900" fill={KEY} textAnchor="middle">{L(round.name)}</text>

          <text x="1480" y="40" fontFamily={FONT} fontSize="28" fontWeight="800" fill={MUTED} textAnchor="end">{t(lang, `Round ${n + 1} of ${ROUNDS.length}`, `Manche ${n + 1} sur ${ROUNDS.length}`)}</text>
          <rect x="680" y="56" width="790" height="66" rx="14" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
          <text x="1075" y="101" fontFamily={FONT} fontSize="34" fontWeight="900" fill={INK} textAnchor="middle">{L(round.q)}</text>

          {card(680, true)}
          {card(1090, false)}
          <text x="680" y="430" fontFamily={FONT} fontSize="31" fontWeight="900" fill={shown ? GREEN_DARK : MUTED}>
            {shown ? L(round.why) : t(lang, 'Good for a key? Everyone at once.', 'Bonne pour une clé ? Tous ensemble.')}
          </text>
          {!shown && <text x="680" y="472" fontFamily={FONT} fontSize="31" fontWeight="900" fill={MUTED}>{t(lang, 'Wrong? Sit down.', 'Faux ? Assieds-toi.')}</text>}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the answer', 'Voir la réponse')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={n === LAST} onClick={next}>{t(lang, 'Next round', 'Manche suivante')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={n === 0 && !shown} onClick={() => { setN(0); setShown(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
