// content/y7-math/U05_3/protractor.jsx
// The drawn protractor (used here and by the construction steppers in
// build.jsx), and the say-it-first stepper that teaches how to read it.
//
//   Protractor       a half-disc with two scales: the outer one starts at 0 on
//                    the right, the inner one at 0 on the left. Drawn with its
//                    centre at (cx, cy) and its straight edge level.
//   ProtractorReader say it first. Six angles in a fixed order; each opens on
//                    one side or the other, so the class must choose the scale
//                    that starts at 0 on the line. The class says the angle,
//                    then Show the answer rings that 0 and gives the reading.
//                    The first angle is the vote on slide 4 (40°, not 140°).
import { useState } from 'react'
import { Eye, ChevronRight, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { at, f1 } from '../U05_2/lines.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', BLUE = '#1a5fa8', RED = '#c8102e'
const BODY = '#e6f1fa', EDGE = '#5f87ab'

/** A protractor, straight edge level, centre at (cx, cy). `ring` circles the
 *  0 that starts the right scale: 'right' (outer) or 'left' (inner). */
export function Protractor({ cx, cy, r, ring = null, numbers = true }) {
  const P = [cx, cy]
  const ticks = []
  for (let d = 0; d <= 180; d++) {
    const len = d % 10 === 0 ? r * 0.1 : d % 5 === 0 ? r * 0.065 : r * 0.035
    const [x1, y1] = at(P, r, d)
    const [x2, y2] = at(P, r - len, d)
    ticks.push(<line key={d} x1={f1(x1)} y1={f1(y1)} x2={f1(x2)} y2={f1(y2)} stroke={EDGE} strokeWidth={d % 10 === 0 ? 2.2 : 1.3} />)
  }
  const outer = r * 0.86
  const inner = r * 0.72
  const fsOuter = Math.round(r * 0.075)
  const fsInner = Math.round(r * 0.062)
  const [i0x, i0y] = at(P, inner, 176)
  const [o0x, o0y] = at(P, outer, 4)
  return (
    <g>
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`} fill={BODY} fillOpacity="0.88" stroke={EDGE} strokeWidth="3" />
      <path d={`M ${cx - r * 0.55} ${cy} A ${r * 0.55} ${r * 0.55} 0 0 1 ${cx + r * 0.55} ${cy}`} fill="none" stroke={EDGE} strokeWidth="1.5" opacity="0.6" />
      {ticks}
      <line x1={cx} y1={cy} x2={cx} y2={cy - r * 0.18} stroke={EDGE} strokeWidth="2" />
      <line x1={cx - r * 0.06} y1={cy} x2={cx + r * 0.06} y2={cy} stroke={INK} strokeWidth="3" />
      {numbers && [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180].map((d) => {
        const [ox, oy] = at(P, outer, d)
        const [ix, iy] = at(P, inner, d)
        return (
          <g key={d}>
            <text x={f1(ox)} y={f1(oy + fsOuter * 0.36)} fontFamily={FONT} fontSize={fsOuter} fontWeight="800" fill="#24486b" textAnchor="middle">{d}</text>
            <text x={f1(ix)} y={f1(iy + fsInner * 0.36)} fontFamily={FONT} fontSize={fsInner} fontWeight="600" fill="#5f87ab" textAnchor="middle">{180 - d}</text>
          </g>
        )
      })}
      {ring === 'right' && <circle cx={f1(o0x)} cy={f1(o0y)} r={fsOuter * 0.95} fill="none" stroke={KEY} strokeWidth="4" />}
      {ring === 'left' && <circle cx={f1(i0x)} cy={f1(i0y)} r={fsInner * 1.05} fill="none" stroke={KEY} strokeWidth="4" />}
    </g>
  )
}

// [the angle, the side its first arm points to]
const ANGLES = [[40, 'right'], [120, 'right'], [65, 'left'], [150, 'left'], [90, 'right'], [25, 'left']]
const C = [1010, 452]
const R = 330
const ARM = 440

export function ProtractorReader({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const [deg, side] = ANGLES[n]
  const dir = side === 'right' ? deg : 180 - deg
  const [mx, my] = at(C, ARM, dir)
  const [fx, fy] = at(C, ARM, side === 'right' ? 0 : 180)
  const [rx, ry] = at(C, R + 34, dir)
  // the reading sits beside the arm, on the side away from the angle, so the
  // arm never runs through it
  const [lx, ly] = at([rx, ry], 50, side === 'right' ? dir + 90 : dir - 90)
  const last = ANGLES.length - 1
  const next = () => { setN((v) => Math.min(last, v + 1)); setShown(false) }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the read-out */}
          <text x="40" y="64" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, `Angle ${n + 1} of ${ANGLES.length}`, `Angle ${n + 1} sur ${ANGLES.length}`)}</text>
          <text x="40" y="116" fontFamily={FONT} fontSize="34" fontWeight="900" fill={INK}>{t(lang, 'What size is it?', 'Quelle est sa taille ?')}</text>
          <text x="40" y="236" fontFamily={FONT} fontSize="104" fontWeight="900" fill={shown ? KEY : '#c9d3dc'}>{shown ? `${deg}°` : '?'}</text>
          {shown && (
            <g>
              <text x="40" y="304" fontFamily={FONT} fontSize="27" fontWeight="800" fill={INK}>{t(lang, 'Start at 0 on the line.', 'Pars du 0 sur la droite.')}</text>
              <text x="40" y="344" fontFamily={FONT} fontSize="27" fontWeight="800" fill={INK}>{t(lang, `Count up to ${deg}.`, `Compte jusqu’à ${deg}.`)}</text>
              {deg !== 90 && (
                <text x="40" y="400" fontFamily={FONT} fontSize="24" fontWeight="700" fill={RED}>
                  {t(lang, `Not ${180 - deg}°: that scale starts at 180.`, `Pas ${180 - deg}°\u00a0: cette échelle part de 180.`)}
                </text>
              )}
              <text x="40" y="452" fontFamily={FONT} fontSize="24" fontWeight="700" fill={MUTED}>
                {deg < 90 ? t(lang, 'Check: less than 90°, so it is acute.', 'Vérifie : moins de 90°, il est aigu.') : deg > 90 ? t(lang, 'Check: more than 90°, so it is obtuse.', 'Vérifie : plus de 90°, il est obtus.') : t(lang, 'Check: a right angle.', 'Vérifie : un angle droit.')}
              </text>
            </g>
          )}

          {/* the angle, with the protractor on it */}
          <Protractor cx={C[0]} cy={C[1]} r={R} ring={shown ? side : null} />
          <line x1={C[0]} y1={C[1]} x2={f1(fx)} y2={f1(fy)} stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1={C[0]} y1={C[1]} x2={f1(mx)} y2={f1(my)} stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <circle cx={C[0]} cy={C[1]} r="7" fill={INK} />
          {shown && <circle cx={f1(rx)} cy={f1(ry)} r="12" fill={KEY} stroke="#ffffff" strokeWidth="3" />}
          {shown && <text x={f1(lx)} y={f1(ly + 12)} fontFamily={FONT} fontSize="34" fontWeight="900" fill={KEY} textAnchor="middle">{deg}°</text>}
          <text x={side === 'right' ? 1440 : 580} y="500" fontFamily={FONT} fontSize="22" fontWeight="700" fill={BLUE} textAnchor={side === 'right' ? 'end' : 'start'}>{t(lang, 'the line', 'la droite')}</text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the answer', 'Montrer la réponse')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={n === last} onClick={next}>{t(lang, 'Next angle', 'Angle suivant')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={n === 0 && !shown} onClick={() => { setN(0); setShown(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
