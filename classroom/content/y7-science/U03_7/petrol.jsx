// content/y7-science/U03_7/petrol.jsx
// MR BOWEN'S PETROL — the stepper the class answers before each press.
//
// He buys 100 000 đồng of petrol: four blocks of 25 000 đ in the tank. Each
// press sends ONE block somewhere, and before it the class answers with a
// thumb: up, it moves the bike; down, it does not.
//
//   0  the tank: 4 × 25 000 đ of petrol
//   1  25 000 đ: the exhaust pipe gets hot         → heat and sound
//   2  25 000 đ: the bike moves!                    → moves the bike
//   3  25 000 đ: the engine gets hot                → heat and sound
//   4  25 000 đ: rubbing parts get hot, and the noise → heat and sound
//
// About a quarter moves the bike and three quarters do not: the book's
// numbers (page 118). The useful block comes second, so the first thumbs-up
// is already wrong. The three wasted blocks show the three places the heat
// and sound come out; the book gives them only as one total (plan.js).
import { useState } from 'react'
import { Undo2, RotateCcw, ChevronRight } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, MUTED, FONT, USEFUL, WASTED, motorbike, squiggles, noise, arrow } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const BLUE = '#1a5fa8', PETROL = '#f6c445'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

// Where each block goes, in the order it leaves the tank (top first).
const DEST = ['heat', 'move', 'heat', 'heat']
const STAGES = [
  { en: 'Mr Bowen buys 100 000 đ of petrol.', fr: 'M. Bowen achète 100 000 đ d’essence.' },
  { en: '25 000 đ: the exhaust pipe gets hot.', fr: '25 000 đ : le pot d’échappement chauffe.' },
  { en: '25 000 đ: the bike moves!', fr: '25 000 đ : la moto avance !' },
  { en: '25 000 đ: the engine gets hot.', fr: '25 000 đ : le moteur chauffe.' },
  { en: '25 000 đ: rubbing parts get hot, and the noise.', fr: '25 000 đ : des pièces frottent et chauffent, et le bruit.' },
]

// The scene: the motorbike on the road, left.
const BX = 290, BY = 316, BS = 1.2
const ROAD = BY + 92 * BS
// The money: the tank, then the two bins.
const BLOCK = { w: 170, h: 58, gap: 12 }
const TANK = { x: 630, y: 128, w: 200 }
const BIN_MOVE = { x: 868, w: 280 }
const BIN_HEAT = { x: 1186, w: 290 }
const BOX_H = 4 * BLOCK.h + 3 * BLOCK.gap + 30 // 304
const slotY = (fromBottom) => TANK.y + 15 + (3 - fromBottom) * (BLOCK.h + BLOCK.gap)

// Block i's place at stage k: still in the tank, or in its bin.
function place(i, k) {
  if (i >= k) return { x: TANK.x + (TANK.w - BLOCK.w) / 2, y: slotY(3 - i), where: 'tank' }
  const dest = DEST[i]
  const before = DEST.slice(0, i).filter((d) => d === dest).length
  const bin = dest === 'move' ? BIN_MOVE : BIN_HEAT
  return { x: bin.x + (bin.w - BLOCK.w) / 2, y: slotY(before), where: dest }
}

const money = (n) => `${n * 25} 000 đ`

export function PetrolStepper({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const last = STAGES.length - 1
  const done = DEST.slice(0, k)
  const moved = done.filter((d) => d === 'move').length
  const heated = done.filter((d) => d === 'heat').length

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />

          {/* now */}
          <text x="40" y="54" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK}>{fr ? STAGES[k].fr : STAGES[k].en}</text>

          {/* the scene: what each block does, kept once it has happened */}
          <line x1="30" y1={ROAD} x2="600" y2={ROAD} stroke={INK} strokeWidth="4" />
          {k >= 3 && <circle cx={BX} cy={BY + 34 * BS} r="70" fill={WASTED} opacity="0.16" />}
          <Pic svg={motorbike(BX, BY, BS)} />
          {k >= 1 && <Pic svg={squiggles(60, BY + 54, 2, 24, 2, WASTED, 6)} />}
          {k >= 2 && <Pic svg={arrow(486, BY - 10, 590, BY - 10, USEFUL, 10, 34)} />}
          {k >= 3 && <Pic svg={squiggles(BX + 4, BY + 6, 3, 26, 2, WASTED, 6)} />}
          {k >= 4 && <Pic svg={noise(BX - 120, BY - 104, '#c25e12', 6)} />}

          {/* the money */}
          <text x={TANK.x + TANK.w / 2} y="114" fontFamily={FONT} fontSize="26" fontWeight="900" fill={INK} textAnchor="middle">{t(lang, 'the petrol', 'l’essence')}</text>
          <rect x={TANK.x} y={TANK.y} width={TANK.w} height={BOX_H} rx="16" fill="#fffaf0" stroke={MUTED} strokeWidth="3" />
          <text x={BIN_MOVE.x + BIN_MOVE.w / 2} y="114" fontFamily={FONT} fontSize="25" fontWeight="900" fill={USEFUL} textAnchor="middle">{t(lang, 'moves the bike', 'fait avancer')}</text>
          <rect x={BIN_MOVE.x} y={TANK.y} width={BIN_MOVE.w} height={BOX_H} rx="16" fill="#eef6e6" stroke={USEFUL} strokeWidth="3" />
          <text x={BIN_HEAT.x + BIN_HEAT.w / 2} y="114" fontFamily={FONT} fontSize="25" fontWeight="900" fill={WASTED} textAnchor="middle">{t(lang, 'heat and sound', 'chaleur et son')}</text>
          <rect x={BIN_HEAT.x} y={TANK.y} width={BIN_HEAT.w} height={BOX_H} rx="16" fill="#fdecee" stroke={WASTED} strokeWidth="3" />
          {[0, 1, 2, 3].map((i) => {
            const p = place(i, k)
            const fill = p.where === 'tank' ? PETROL : p.where === 'move' ? USEFUL : WASTED
            return (
              <g key={i} style={{ transform: `translate(${p.x}px, ${p.y}px)`, transition: 'transform 0.9s cubic-bezier(.4,0,.2,1)' }}>
                <rect x="0" y="0" width={BLOCK.w} height={BLOCK.h} rx="10" fill={fill} stroke={INK} strokeWidth="3" style={{ transition: 'fill 0.9s' }} />
                <text x={BLOCK.w / 2} y="39" fontFamily={FONT} fontSize="27" fontWeight="900" fill={p.where === 'tank' ? INK : '#ffffff'} textAnchor="middle">{'25 000 đ'}</text>
              </g>
            )
          })}
          {moved > 0 && <text x={BIN_MOVE.x + BIN_MOVE.w / 2} y="472" fontFamily={FONT} fontSize="28" fontWeight="900" fill={USEFUL} textAnchor="middle">{money(moved)}</text>}
          {heated > 0 && <text x={BIN_HEAT.x + BIN_HEAT.w / 2} y="472" fontFamily={FONT} fontSize="28" fontWeight="900" fill={WASTED} textAnchor="middle">{money(heated)}</text>}

          {/* next */}
          {k < last ? (
            <g>
              <rect x="30" y="488" width="1440" height="44" rx="12" fill="#e9f1fa" stroke={BLUE} strokeWidth="2.5" />
              <text x="750" y="519" fontFamily={FONT} fontSize="24" fontWeight="800" fill={BLUE} textAnchor="middle">
                {k === 0
                  ? t(lang, 'He rides to school. The first 25 000 đ: does it move the bike?', 'Il va à l’école. Les premiers 25 000 đ : font-ils avancer la moto ?')
                  : t(lang, 'Next 25 000 đ: does it move the bike?', 'Les 25 000 đ suivants : font-ils avancer la moto ?')}
              </text>
            </g>
          ) : (
            <g>
              <rect x="30" y="488" width="1440" height="44" rx="12" fill="#fdecee" stroke={WASTED} strokeWidth="2.5" />
              <text x="750" y="520" fontFamily={FONT} fontSize="25" fontWeight="900" fill={WASTED} textAnchor="middle">{t(lang, 'Only 25 000 đ moves the bike!', 'Seulement 25 000 đ fait avancer la moto !')}</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === last} onClick={() => setK((v) => Math.min(last, v + 1))}>{t(lang, 'Next 25 000 đ', '25 000 đ suivants')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
