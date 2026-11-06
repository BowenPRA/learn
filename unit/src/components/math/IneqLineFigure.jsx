import { numText } from '../../utils/ineqLine';

/* ------------------------------------------------------------------ *
 * A number line for a Year 7 inequality (utils/ineqLine.js), drawn the way
 * the book draws it: an OPEN circle above the number, and an arrow from the
 * circle over all the numbers that work.
 *
 *            ○──────────────▶
 *   ──┼───┼───┼───┼───┼───┼───┼──
 *     1   2   3   4   5   6   7            x > 3
 *
 * Shared by the Show It task and the `ineq` deck activity. The parent owns
 * what is drawn:
 *
 *   lo, hi     the integers at the ends of the line
 *   rays       [{ n, dir: 'left' | 'right' | null, tone? }] — a circle at n,
 *              with its arrow once `dir` is set. A second ray is drawn higher.
 *   halves     mark (and make tappable) the halves between the integers
 *   onPick(v)  a position was tapped (placing the circle)
 *   picks      integers chosen in a "which integers work?" list
 *   onToggle(v)  an integer's label was tapped (the list)
 *   lit        integers shown as working (green), once the answer is settled
 *   dim        integers shown as NOT working (struck grey), e.g. the circle's own number
 * ------------------------------------------------------------------ */

const W = 760;
const H = 176;
const PAD = 46;
const AXIS_Y = 112;
const KEY = '#c25e12';
const INK = '#1e293b';
const TONES = { key: KEY, good: '#4a8b23', bad: '#e11d48', shown: '#d97706', blue: '#1a5fa8' };

export default function IneqLineFigure({
  lo, hi, rays = [], halves = false, onPick, picks = [], onToggle, lit = [], dim = [],
}) {
  const step = (W - PAD * 2) / (hi - lo);
  const px = (v) => PAD + (v - lo) * step;
  const ticks = [];
  for (let v = lo; v <= hi; v += 1) ticks.push(v);
  const spots = [];                                   // where a circle can be put
  for (let v = lo; v <= hi; v += halves ? 0.5 : 1) spots.push(v);
  const hitW = halves ? step / 2 : step;
  const small = hi - lo > 11;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" style={{ touchAction: 'manipulation' }} role="img" aria-label="number line">
      {/* a white plate: the ink is dark, and this is drawn on dark cards too */}
      <rect x="0" y="0" width={W} height={H} rx="12" fill="#ffffff" />

      {/* the axis */}
      <line x1={PAD - 26} y1={AXIS_Y} x2={W - PAD + 26} y2={AXIS_Y} stroke={INK} strokeWidth="2.5" />
      <path d={`M ${PAD - 32} ${AXIS_Y} l 12 -6 l 0 12 z`} fill={INK} />
      <path d={`M ${W - PAD + 32} ${AXIS_Y} l -12 -6 l 0 12 z`} fill={INK} />

      {/* half marks */}
      {halves && ticks.slice(0, -1).map((v) => (
        <line key={`h${v}`} x1={px(v + 0.5)} y1={AXIS_Y - 4} x2={px(v + 0.5)} y2={AXIS_Y + 4} stroke="#94a3b8" strokeWidth="1.5" />
      ))}

      {/* the integers */}
      {ticks.map((v) => {
        const picked = picks.includes(v);
        const on = lit.includes(v);
        const off = dim.includes(v);
        return (
          <g key={`t${v}`}>
            <line x1={px(v)} y1={AXIS_Y - 8} x2={px(v)} y2={AXIS_Y + 8} stroke="#475569" strokeWidth="2" />
            {(picked || on) && (
              <rect x={px(v) - (small ? 17 : 21)} y={AXIS_Y + 14} width={small ? 34 : 42} height="30" rx="9"
                fill={on ? '#d7ffb8' : '#dbeafe'} stroke={on ? '#58a700' : '#1a5fa8'} strokeWidth="2" />
            )}
            <text x={px(v)} y={AXIS_Y + 36} textAnchor="middle" fontSize={small ? 17 : 20} fontFamily="ui-monospace, Menlo, Consolas, monospace" fontWeight="900"
              fill={on ? '#3e7500' : picked ? '#1a5fa8' : off ? '#cbd5e1' : '#334155'}
              textDecoration={off ? 'line-through' : undefined}>
              {numText(v)}
            </text>
            {onToggle && (
              <rect x={px(v) - step / 2} y={AXIS_Y + 8} width={step} height="46" fill="transparent" className="cursor-pointer" onClick={() => onToggle(v)} />
            )}
          </g>
        );
      })}

      {/* the circles and their arrows */}
      {rays.map((r, i) => {
        const y = AXIS_Y - 38 - i * 30;
        const c = TONES[r.tone] || KEY;
        const end = r.dir === 'right' ? W - PAD + 22 : PAD - 22;
        const sign = r.dir === 'right' ? 1 : -1;
        return (
          <g key={`r${i}`} pointerEvents="none">
            <line x1={px(r.n)} y1={y + 12} x2={px(r.n)} y2={AXIS_Y - 9} stroke={c} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
            {r.dir && (
              <>
                <line x1={px(r.n) + sign * 12} y1={y} x2={end - sign * 12} y2={y} stroke={c} strokeWidth="5" strokeLinecap="round" />
                <path d={`M ${end} ${y} l ${-sign * 18} -10 l 0 20 z`} fill={c} />
              </>
            )}
            <circle cx={px(r.n)} cy={y} r="11" fill="#ffffff" stroke={c} strokeWidth="4.5" />
          </g>
        );
      })}

      {/* tap targets for placing the circle: a column over each position */}
      {onPick && spots.map((v) => (
        <rect key={`s${v}`} x={px(v) - hitW / 2} y="6" width={hitW} height={AXIS_Y + 44} fill="transparent" className="cursor-pointer" onClick={() => onPick(v)}>
          <title>{numText(v)}</title>
        </rect>
      ))}
    </svg>
  );
}
