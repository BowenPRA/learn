// content/y7-science/U05_2/game.jsx
// TRUE OR FALSE? — the whole class standing (the shape of 5.1's Why This
// Material?). One sentence about metals or non-metals. Everyone answers at
// once: arms up for true, arms down for false. Wrong? Sit down. Eight rounds
// in a fixed order, four of each answer, and each "most" or "some" round is
// followed by its "every" twin, which is the trap:
//
//   1 Most metals are solid at room temperature.       true
//   2 Every metal is solid at room temperature.        FALSE (mercury)
//   3 Every non-metal is a gas.                        FALSE (sulfur, carbon)
//   4 Many non-metals are gases.                       true
//   5 Graphite conducts electricity, so it is a metal. FALSE (a non-metal)
//   6 Most non-metals do not conduct electricity.      true
//   7 Some metals are magnetic.                        true
//   8 A magnet picks up every metal.                   FALSE (copper, aluminium)
import { useState } from 'react'
import { ChevronRight, Eye, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { ArmsFigure } from '../U03_4/bodies.jsx'
import { INK, KEY, MUTED, FONT, RULE, TEAL } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const BLUE = '#1a5fa8', GREEN_DARK = '#3d731c'

// the sentence as [[English lines], [French lines]], whether it is true, and why
const ROUNDS = [
  { s: [['Most metals are solid', 'at room temperature.'], ['La plupart des métaux sont', 'solides à température ambiante.']], ok: true,
    why: ['Iron, copper and gold are solids in this room.', 'Le fer, le cuivre et l’or sont solides ici.'] },
  { s: [['Every metal is solid', 'at room temperature.'], ['Tous les métaux sont solides', 'à température ambiante.']], ok: false,
    why: ['Mercury is a metal, and it is a liquid.', 'Le mercure est un métal, et il est liquide.'] },
  { s: [['Every non-metal is a gas.'], ['Tous les non-métaux sont des gaz.']], ok: false,
    why: ['Sulfur and carbon are solids.', 'Le soufre et le carbone sont solides.'] },
  { s: [['Many non-metals are gases.'], ['Beaucoup de non-métaux sont des gaz.']], ok: true,
    why: ['Oxygen, nitrogen and helium are gases.', 'L’oxygène, l’azote et l’hélium sont des gaz.'] },
  { s: [['Graphite conducts electricity,', 'so it is a metal.'], ['Le graphite conduit l’électricité,', 'donc c’est un métal.']], ok: false,
    why: ['Graphite is carbon: a non-metal.', 'Le graphite, c’est du carbone : un non-métal.'] },
  { s: [['Most non-metals do not', 'conduct electricity.'], ['La plupart des non-métaux ne', 'conduisent pas l’électricité.']], ok: true,
    why: ['Sulfur and oxygen do not. Graphite does.', 'Le soufre et l’oxygène, non. Le graphite, oui.'] },
  { s: [['Some metals are magnetic.'], ['Certains métaux sont magnétiques.']], ok: true,
    why: ['Iron, nickel and cobalt are magnetic.', 'Le fer, le nickel et le cobalt le sont.'] },
  { s: [['A magnet picks up every metal.'], ['Un aimant attire tous les métaux.']], ok: false,
    why: ['Not copper, not aluminium, not gold.', 'Ni le cuivre, ni l’aluminium, ni l’or.'] },
]
const LAST = ROUNDS.length - 1

export function TrueOrFalse({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const L = (pair) => (fr ? pair[1] : pair[0])
  const round = ROUNDS[n]
  const lines = L(round.s)
  const next = () => { setN((v) => Math.min(LAST, v + 1)); setShown(false) }

  const card = (x, up) => {
    const right = shown && round.ok === up
    const fade = shown && round.ok !== up
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="214" width="440" height="206" rx="20" fill={right ? '#eef6e6' : '#f7fafc'} stroke={right ? GREEN_DARK : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 110} y={330} up={up} color={up ? BLUE : KEY} s={0.95} />
        <text x={x + 290} y="306" fontFamily={FONT} fontSize="46" fontWeight="900" fill={up ? BLUE : KEY} textAnchor="middle">{up ? t(lang, 'TRUE', 'VRAI') : t(lang, 'FALSE', 'FAUX')}</text>
        <text x={x + 290} y="352" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED} textAnchor="middle">{up ? t(lang, 'arms up', 'bras en haut') : t(lang, 'arms down', 'bras en bas')}</text>
        {right && (
          <g>
            <circle cx={x + 404} cy="250" r="22" fill={GREEN_DARK} />
            <path d={`M ${x + 392} 250 l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
          <text x="1480" y="38" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED} textAnchor="end">{t(lang, `Round ${n + 1} of ${ROUNDS.length}`, `Manche ${n + 1} sur ${ROUNDS.length}`)}</text>

          {/* the sentence */}
          <rect x="30" y="52" width="1440" height="140" rx="18" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
          {lines.map((line, i) => (
            <text key={i} x="750" y={lines.length === 1 ? 140 : 112 + i * 56} fontFamily={FONT} fontSize="44" fontWeight="900" fill={INK} textAnchor="middle">{line}</text>
          ))}

          {card(250, true)}
          {card(810, false)}
          <text x="750" y="482" fontFamily={FONT} fontSize="30" fontWeight="900" fill={shown ? GREEN_DARK : MUTED} textAnchor="middle">
            {shown ? L(round.why) : t(lang, 'Everyone at once. Wrong? Sit down.', 'Tous ensemble. Tu t’es trompé ? Assieds-toi.')}
          </text>
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
