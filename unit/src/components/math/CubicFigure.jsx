import { useMemo } from 'react';
import { sketchWindow, samplePaths, rootsOf, yInterceptOf } from '../../utils/cubic';
import { fnum, fracText } from '../../utils/modulus';

/* ------------------------------------------------------------------ *
 * The sketch of a cubic, drawn from its factors, shared by the Sketch It task
 * and the `reflect` slide activity.
 *
 * It draws what a book sketch draws and nothing more: the axes, the curve,
 * the intercepts named where they sit. There is no y scale, because a
 * sketch is about shape and intercepts and a cubic's y values would flatten
 * everything interesting into the axis.
 *
 * `arcs` are the pieces of the curve between roots (plus the two tails), each
 * its own path so it can be tapped — `selected` arcs are highlighted, and
 * `reflected` draws y = |f(x)| with the folded pieces in the reflect colour.
 * `showRoots` / `showY` / `showCurve` reveal the sketch a stage at a time.
 * ------------------------------------------------------------------ */

const SKY = '#1cb0f6';
const AMBER = '#f59e0b';
const INK = '#1e293b';
const RULE = '#94a3b8';

export default function CubicFigure({
  item, showCurve = true, showRoots = true, showY = true, reflected = false,
  selected = [], onArc, arcsTappable = false, height = 300, className = '',
}) {
  const win = useMemo(() => sketchWindow(item), [item]);
  const paths = useMemo(() => samplePaths(item, win), [item, win]);
  const absPaths = useMemo(() => (reflected ? samplePaths(item, win, { absolute: true }) : null), [item, win, reflected]);
  const roots = useMemo(() => rootsOf(item), [item]);
  const yInt = useMemo(() => yInterceptOf(item), [item]);

  const W = 560;
  const H = height;
  const PAD = 26;
  const X = (x) => PAD + ((x - win.xMin) / (win.xMax - win.xMin)) * (W - PAD * 2);
  const Y = (y) => PAD + ((win.yMax - y) / (win.yMax - win.yMin)) * (H - PAD * 2);

  /** One arc as an SVG path, broken where it leaves the window. */
  const d = (points) => {
    let out = '';
    let pen = false;
    for (const [x, y, inside] of points) {
      if (!inside) { pen = false; continue; }
      out += `${pen ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)} `;
      pen = true;
    }
    return out.trim();
  };

  const selectedSet = new Set(selected);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`w-full h-auto select-none ${className}`} style={{ touchAction: 'manipulation' }}>
      <rect x="0" y="0" width={W} height={H} rx="14" fill="#ffffff" />
      {/* axes */}
      <line x1={PAD - 8} y1={Y(0)} x2={W - PAD + 8} y2={Y(0)} stroke={INK} strokeWidth="2" />
      <path d={`M${W - PAD + 8} ${Y(0)} l-9 -4.5 l0 9 z`} fill={INK} />
      <line x1={X(0)} y1={H - PAD + 8} x2={X(0)} y2={PAD - 8} stroke={INK} strokeWidth="2" />
      <path d={`M${X(0)} ${PAD - 8} l-4.5 9 l9 0 z`} fill={INK} />
      <text x={W - PAD + 4} y={Y(0) + 18} fontSize="14" fontStyle="italic" fontFamily="serif" fill={INK}>x</text>
      <text x={X(0) + 8} y={PAD - 2} fontSize="14" fontStyle="italic" fontFamily="serif" fill={INK}>y</text>
      <text x={X(0) - 6} y={Y(0) + 16} fontSize="12" fontFamily="monospace" fill={RULE} textAnchor="end">O</text>

      {/* the curve, one path per arc */}
      {showCurve && paths.map((arc) => {
        const on = selectedSet.has(arc.i);
        const folded = reflected && arc.below;
        return (
          <g key={arc.i}>
            {/* the original piece: faint once it has been reflected */}
            <path d={d(arc.points)} fill="none" stroke={on ? AMBER : SKY} strokeWidth={on ? 6 : 3.5}
              strokeLinecap="round" strokeLinejoin="round" opacity={folded ? 0.22 : 1}
              strokeDasharray={folded ? '6 5' : undefined} pointerEvents="none" />
            {folded && absPaths && (
              <path d={d(absPaths[arc.i].points)} fill="none" stroke={AMBER} strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" pointerEvents="none" />
            )}
            {arcsTappable && (
              <path d={d(arc.points)} fill="none" stroke="transparent" strokeWidth="26" strokeLinecap="round"
                className="cursor-pointer" onClick={() => onArc?.(arc)} />
            )}
          </g>
        );
      })}
      {reflected && absPaths && paths.filter((a) => !a.below).map((arc) => (
        <path key={`keep-${arc.i}`} d={d(arc.points)} fill="none" stroke={AMBER} strokeWidth="4"
          strokeLinecap="round" strokeLinejoin="round" pointerEvents="none" />
      ))}

      {/* intercepts */}
      {showRoots && roots.map((r) => {
        const x = fnum(r.x);
        const label = fracText(r.x);
        // a root at the origin shares its label with the y-intercept
        if (x === 0) return null;
        return (
          <g key={`r-${label}`} pointerEvents="none">
            <circle cx={X(x)} cy={Y(0)} r="5" fill={r.touches ? AMBER : INK} />
            <text x={X(x)} y={Y(0) + 20} textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="900" fill={INK}>{label}</text>
          </g>
        );
      })}
      {showY && (
        <g pointerEvents="none">
          <circle cx={X(0)} cy={Y(fnum(yInt))} r="5" fill={INK} />
          <text x={X(0) - 8} y={Y(fnum(yInt)) + (fnum(yInt) >= 0 ? -8 : 18)} textAnchor="end" fontSize="14" fontFamily="monospace" fontWeight="900" fill={INK}>
            {fracText(yInt)}
          </text>
        </g>
      )}
    </svg>
  );
}
