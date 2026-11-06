import { NEG_INF, POS_INF } from '../../utils/interval';
import { regionsOf } from '../../utils/numberLine';

/* ------------------------------------------------------------------ *
 * A tappable number line, shared by the Case Solver's "shade the answer"
 * stage and the `numberline` slide activity.
 *
 * Everything drawn comes from the caller's own `points` and `marks`, so what
 * is on screen and what is marked can never disagree:
 *
 *   points   [{ x, closed, fixed?, label? }] — the endpoints. `fixed` ones
 *            are placed by the app (the critical values a student has just
 *            found) and can be toggled open/closed but not removed; `label`
 *            prints under a point that sits between ticks (−7/2).
 *   marks    representative x-values, one per shaded region — a region is
 *            shaded when a mark falls inside it. Kept as values rather than
 *            indices so a mark survives an endpoint moving.
 *   onTick(n)     a tick was tapped (place / fill / remove an endpoint)
 *   onPoint(p)    a placed point was tapped (toggle open ↔ closed)
 *   onRegion(r)   the band above a region was tapped (shade / unshade)
 *
 * The same rule decides shading for the drawing, the tap and the marking —
 * `regionsOf` in src/utils/numberLine.js: a mark m is inside (lo, hi) when
 * lo < m < hi.
 * ------------------------------------------------------------------ */

const PAD = 34;
const W = 760;
const AXIS_Y = 74;
const BAND_TOP = 22;
const BAND_H = 40;

export default function NumberLineSVG({
  min, max, points = [], marks = [], onTick, onPoint, onRegion, readOnly = false, accent = '#7c3aed',
}) {
  const span = max - min;
  const step = (W - PAD * 2) / span;
  const px = (n) => PAD + (n - min) * step;
  const ticks = [];
  for (let n = min; n <= max; n += 1) ticks.push(n);
  const regions = regionsOf(points, marks, min, max);
  const sorted = [...points].sort((a, b) => a.x - b.x);

  return (
    <svg viewBox={`0 0 ${W} 140`} className="w-full h-auto select-none" style={{ touchAction: 'manipulation' }}>
      {/* A white plate, like the other figures: the axis ink is slate-800, which
          vanishes against the dark-mode card this is drawn on. */}
      <rect x="0" y="0" width={W} height="140" rx="12" fill="#ffffff" />
      {/* the band above the line: tap to shade a region */}
      {!readOnly && onRegion && regions.map((r) => (
        <rect key={`hit-${r.i}`} x={px(r.loDraw)} y={BAND_TOP} width={Math.max(2, px(r.hiDraw) - px(r.loDraw))} height={BAND_H}
          fill="transparent" className="cursor-pointer" onClick={() => onRegion(r)} />
      ))}
      {regions.filter((r) => r.shaded).map((r) => (
        <rect key={`fill-${r.i}`} x={px(r.loDraw)} y={BAND_TOP} width={Math.max(2, px(r.hiDraw) - px(r.loDraw))} height={BAND_H}
          fill={accent} opacity="0.14" rx="6" pointerEvents="none" />
      ))}
      {!readOnly && onRegion && regions.filter((r) => !r.shaded).map((r) => (
        <text key={`plus-${r.i}`} x={(px(r.loDraw) + px(r.hiDraw)) / 2} y={BAND_TOP + BAND_H / 2 + 6} textAnchor="middle"
          fontSize="18" fontFamily="sans-serif" fill="#cbd5e1" fontWeight="bold" pointerEvents="none">+</text>
      ))}

      {/* the axis */}
      <line x1={PAD - 22} y1={AXIS_Y} x2={W - PAD + 22} y2={AXIS_Y} stroke="#1e293b" strokeWidth="2.5" />
      <path d={`M ${PAD - 22} ${AXIS_Y} l 12 -6 l 0 12 z`} fill="#1e293b" />
      <path d={`M ${W - PAD + 22} ${AXIS_Y} l -12 -6 l 0 12 z`} fill="#1e293b" />

      {/* the solution bar, on the axis */}
      {regions.filter((r) => r.shaded).map((r) => (
        <g key={`bar-${r.i}`} pointerEvents="none">
          <line x1={px(r.loDraw)} y1={AXIS_Y} x2={px(r.hiDraw)} y2={AXIS_Y} stroke={accent} strokeWidth="7" />
          {r.lo === NEG_INF && <path d={`M ${px(min - 0.85)} ${AXIS_Y} l 13 -7 l 0 14 z`} fill={accent} />}
          {r.hi === POS_INF && <path d={`M ${px(max + 0.85)} ${AXIS_Y} l -13 -7 l 0 14 z`} fill={accent} />}
        </g>
      ))}

      {/* ticks */}
      {ticks.map((n) => (
        <g key={`t-${n}`}>
          <line x1={px(n)} y1={AXIS_Y - 6} x2={px(n)} y2={AXIS_Y + 6} stroke="#64748b" strokeWidth="1.5" pointerEvents="none" />
          <text x={px(n)} y={AXIS_Y + 26} textAnchor="middle" fontSize="13" fontFamily="monospace" fill="#475569" fontWeight="bold" pointerEvents="none">
            {n < 0 ? `−${-n}` : n}
          </text>
          {!readOnly && onTick && (
            <rect x={px(n) - step / 2} y={AXIS_Y - 4} width={step} height={44} fill="transparent" className="cursor-pointer" onClick={() => onTick(n)} />
          )}
        </g>
      ))}

      {/* the endpoints; a tap on one toggles open ↔ closed */}
      {sorted.map((p) => (
        <g key={`p-${p.x}`}>
          <circle cx={px(p.x)} cy={AXIS_Y} r="9" fill={p.closed ? accent : '#ffffff'} stroke={accent} strokeWidth="3.5" pointerEvents="none" />
          {p.label && (
            <text x={px(p.x)} y={AXIS_Y + 48} textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="900" fill={accent} pointerEvents="none">{p.label}</text>
          )}
          {!readOnly && onPoint && (
            <circle cx={px(p.x)} cy={AXIS_Y} r="16" fill="transparent" className="cursor-pointer" onClick={() => onPoint(p)} />
          )}
        </g>
      ))}
    </svg>
  );
}
