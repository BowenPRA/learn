// content/y7-science/U03_6/bounce.jsx
// THE BOUNCING BALL — the stepper the class answers before each press.
//
// Mr Bowen holds a tennis ball 2 m up and lets go. The next moment is always
// written on the screen ("Next: it hits the floor and squashes"); the class
// says which store will be biggest, then the press moves the ball and the
// bars show it. Each press is ONE change:
//
//   0  in his hand, 2 m up             gravitational potential 100
//   1  halfway down                    gravitational 50, kinetic 50
//   2  just before the floor           kinetic 100
//   3  squashed on the floor: bang!    elastic potential 55; 45 out as sound and heat
//   4  springing back off the floor    kinetic 55
//   5  the top of the bounce: 1.1 m    gravitational 55
//
// A real tennis ball bounces to just over half the height it fell from (the
// rules of tennis want 53–58%), so about 45% leaves the ball at the bounce, as
// sound and heat. That bar sits apart from the ball's three stores, and only
// the ball's stores light up as "biggest" (both, when they are equal). Why
// the ball cannot get back to 2 m is the next slide's question.
import { useState } from 'react'
import { Undo2, RotateCcw, ChevronRight } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { INK, MUTED, FONT, tennisBall } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1', BLUE = '#1a5fa8', RED = '#d83a2e'

// The ball's three stores, then what leaves it at the bounce.
const STORES = [
  { key: 'g', en: 'gravitational potential', fr: 'potentielle de pesanteur', color: '#0087a8' },
  { key: 'k', en: 'kinetic', fr: 'cinétique', color: '#1a5fa8' },
  { key: 'e', en: 'elastic potential', fr: 'potentielle élastique', color: '#5c2483' },
]
const OUT = { key: 's', en: 'sound and heat', fr: 'son et chaleur', color: RED }
// h = the ball's height in metres; squash = on the floor; dir = which way it moves
const STAGES = [
  { h: 2, g: 100, k: 0, e: 0, s: 0, en: 'Mr Bowen holds the ball 2 m up.', fr: 'M. Bowen tient la balle à 2 m.' },
  { h: 1, dir: 'down', g: 50, k: 50, e: 0, s: 0, en: 'It falls. Halfway down.', fr: 'Elle tombe. À mi-hauteur.' },
  { h: 0.02, dir: 'down', g: 0, k: 100, e: 0, s: 0, en: 'Just before it hits the floor.', fr: 'Juste avant le sol.' },
  { h: 0, squash: true, g: 0, k: 0, e: 55, s: 45, en: 'It squashes on the floor. Bang!', fr: 'Elle s’écrase sur le sol. Bang !' },
  { h: 0.02, dir: 'up', g: 0, k: 55, e: 0, s: 45, en: 'It springs back up.', fr: 'Elle rebondit vers le haut.' },
  { h: 1.1, g: 55, k: 0, e: 0, s: 45, en: 'The top of the bounce: 1.1 m.', fr: 'Le haut du rebond : 1.1 m.' },
]
const NEXT = [
  ['He lets go. Halfway down…', 'Il lâche. À mi-hauteur…'],
  ['Just before it hits the floor…', 'Juste avant le sol…'],
  ['It hits the floor and squashes…', 'Elle touche le sol et s’écrase…'],
  ['It springs back up…', 'Elle rebondit vers le haut…'],
  ['The top of the bounce…', 'Le haut du rebond…'],
]

const FLOOR = 470
const M = 168 // pixels per metre
const BALL_X = 360
const R = 24
const yOf = (h) => FLOOR - R - h * M
const BAR = { x: 820, w: 600, y0: 166, gap: 80, h: 40 }
const OUT_Y = 432 // the sound-and-heat bar, below a rule
// Drawn to this scale, 2 m is out of Mr Bowen's reach: he stands on a lab
// stool, his arm held out so the ball falls clear of him.
const BOWEN = 1.05
const HAND = [100, 36] // in his own frame: a straight arm, up and out
const STAND_X = BALL_X - 14 - HAND[0] * BOWEN
const STAND_Y = yOf(2) + R + 6 - HAND[1] * BOWEN
const SEAT = STAND_Y + 268 * BOWEN

function Bar({ s, y, value, on, lang, note }) {
  const fr = lang === 'fr'
  return (
    <g>
      <text x={BAR.x} y={y - 12} fontFamily={FONT} fontSize="24" fontWeight={on ? 900 : 700} fill={on ? s.color : MUTED}>
        {s.en}{fr && <tspan dx="14" fontSize="19" fontWeight="700" fill={MUTED}>{s.fr}</tspan>}
        {note && <tspan dx="14" fontSize="19" fontWeight="700" fill={MUTED}>{note}</tspan>}
      </text>
      <rect x={BAR.x} y={y} width={BAR.w} height={BAR.h} rx="8" fill="#f1f5f9" stroke={on ? s.color : RULE} strokeWidth={on ? 3 : 1.5} />
      <rect x={BAR.x} y={y} width={BAR.w} height={BAR.h} rx="8" fill={s.color}
        style={{ transform: `scaleX(${value / 100})`, transformOrigin: `${BAR.x}px 0px`, transition: 'transform 0.8s cubic-bezier(.4,0,.2,1)' }} />
    </g>
  )
}

export function BouncingBall({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const st = STAGES[k]
  const last = STAGES.length - 1
  const most = Math.max(...STORES.map((s) => st[s.key]))
  const ballY = yOf(st.h)

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the scene: Mr Bowen on his stool, the ball, a height scale */}
          <line x1="40" y1={FLOOR} x2="548" y2={FLOOR} stroke={INK} strokeWidth="4" />
          <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
            <rect x={STAND_X - 5} y={SEAT + 10} width="10" height={FLOOR - SEAT - 20} fill="#9aa7b4" />
            <line x1={STAND_X - 20} y1={SEAT + 34} x2={STAND_X + 20} y2={SEAT + 34} stroke="#6b7580" strokeWidth="5" strokeLinecap="round" />
            <path d={`M ${STAND_X - 34} ${FLOOR} L ${STAND_X - 7} ${FLOOR - 12} L ${STAND_X + 7} ${FLOOR - 12} L ${STAND_X + 34} ${FLOOR} Z`} fill="#6b7580" />
            <rect x={STAND_X - 42} y={SEAT} width="84" height="12" rx="5" fill="#4a5560" />
          </g>
          <MrBowen x={STAND_X} y={STAND_Y} scale={BOWEN} handRight={HAND} />
          {[0, 0.5, 1, 1.5, 2].map((m) => (
            <g key={m}>
              <line x1="560" y1={FLOOR - m * M} x2="584" y2={FLOOR - m * M} stroke={INK} strokeWidth="3" />
              <text x="596" y={FLOOR - m * M + 8} fontFamily={FONT} fontSize="22" fontWeight="700" fill={MUTED}>{m} m</text>
            </g>
          ))}
          <line x1="572" y1={FLOOR} x2="572" y2={FLOOR - 2 * M} stroke={INK} strokeWidth="3" />
          <line x1={BALL_X - 40} y1={FLOOR - 2 * M} x2="560" y2={FLOOR - 2 * M} stroke="#9aa7b4" strokeWidth="3" strokeDasharray="8 8" />
          {k === last && <line x1={BALL_X - 40} y1={FLOOR - 1.1 * M} x2="560" y2={FLOOR - 1.1 * M} stroke={RED} strokeWidth="3" strokeDasharray="8 8" />}
          {st.squash ? (
            <g>
              <ellipse cx={BALL_X} cy={FLOOR - 13} rx="34" ry="13" fill="#d7e84a" stroke={INK} strokeWidth="3" />
              <path d={`M ${BALL_X - 70} ${FLOOR - 40} l 18 12 M ${BALL_X - 60} ${FLOOR - 64} l 18 22 M ${BALL_X + 70} ${FLOOR - 40} l -18 12 M ${BALL_X + 60} ${FLOOR - 64} l -18 22`} stroke="#c25e12" strokeWidth="5" strokeLinecap="round" />
            </g>
          ) : (
            <g dangerouslySetInnerHTML={{ __html: tennisBall(BALL_X, ballY, R) }} />
          )}
          {/* which way it is moving */}
          {st.dir && (
            <g stroke="#9aa7b4" fill="#9aa7b4">
              <line x1={BALL_X + 52} y1={ballY + (st.dir === 'down' ? -30 : 26)} x2={BALL_X + 52} y2={ballY + (st.dir === 'down' ? 10 : -14)} strokeWidth="5" strokeLinecap="round" />
              <path d={st.dir === 'down'
                ? `M ${BALL_X + 40} ${ballY + 10} L ${BALL_X + 64} ${ballY + 10} L ${BALL_X + 52} ${ballY + 28} Z`
                : `M ${BALL_X + 40} ${ballY - 14} L ${BALL_X + 64} ${ballY - 14} L ${BALL_X + 52} ${ballY - 32} Z`} stroke="none" />
            </g>
          )}

          {/* now, and next */}
          <text x="40" y="46" fontFamily={FONT} fontSize="27" fontWeight="900" fill={INK}>{fr ? st.fr : st.en}</text>
          {k < last ? (
            <g>
              <rect x="652" y="16" width="824" height="56" rx="12" fill="#e9f1fa" stroke={BLUE} strokeWidth="2.5" />
              <text x="672" y="53" fontFamily={FONT} fontSize="24" fontWeight="800" fill={BLUE}>
                {t(lang, 'Next: ', 'Ensuite : ')}{fr ? NEXT[k][1] : NEXT[k][0]}
              </text>
            </g>
          ) : (
            <g>
              <rect x="652" y="16" width="824" height="56" rx="12" fill="#fdecee" stroke={RED} strokeWidth="2.5" />
              <text x="672" y="53" fontFamily={FONT} fontSize="24" fontWeight="800" fill={RED}>{t(lang, 'Only 1.1 m, not 2 m!', 'Seulement 1.1 m, pas 2 m !')}</text>
            </g>
          )}

          {/* the ball's three stores, then what left it */}
          <text x={BAR.x} y="108" fontFamily={FONT} fontSize="20" fontWeight="800" fill={INK}>{t(lang, 'The ball’s energy stores', 'Les réserves d’énergie de la balle')}</text>
          {STORES.map((s, i) => (
            <Bar key={s.key} s={s} y={BAR.y0 + i * BAR.gap} value={st[s.key]} on={most > 0 && st[s.key] === most} lang={lang} />
          ))}
          <line x1={BAR.x} y1="380" x2={BAR.x + BAR.w} y2="380" stroke={RULE} strokeWidth="3" strokeDasharray="10 8" />
          <Bar s={OUT} y={OUT_Y} value={st.s} on={st.s > 0} lang={lang} note={t(lang, 'out of the ball', 'sortis de la balle')} />
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === last} onClick={() => setK((v) => Math.min(last, v + 1))}>{t(lang, 'Next', 'Suivant')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
