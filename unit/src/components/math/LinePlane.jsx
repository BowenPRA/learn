import { lineEnds } from '../../utils/lines.js';
import { PLANE_PAD, LINE_COLORS } from './linePlaneGeom.js';

/**
 * LinePlane — a lattice coordinate plane with straight lines, segments and
 * named points on it. Drawn by the Line Lab task (src/tasks/LineLab.jsx) and
 * the Notes `line` activity (src/components/notes/LineActivity.jsx); both pass
 * pointer handlers and the aim, so the picture here never decides anything.
 *
 *   grid      { xMin, xMax, yMin, yMax } — whole numbers, both axes inside
 *   lines     [{ line: { a, b, c }, color, label?, dashed?, faint? }]   a·x + b·y = c
 *   circles   [{ centre: [x, y], r, color, dashed?, faint?, fill?, draw? }]   r in grid units;
 *             `draw` sweeps the circle on as it appears (the Circle Lab reveal)
 *   segments  [{ from: [x, y], to: [x, y], color, dashed?, label?, width? }]
 *   points    [{ at: [x, y], color, name?, flag? }]   flag = the coordinate text
 *   misses    [[x, y]] — wrong clicks, the newest labelled with `missFlag`
 *   aim       [x, y] | null — the lattice point under the pointer; `armed` rings it
 *
 * ONE UNIT IS ONE SQUARE in both directions, always: slope is the whole
 * subject, and a squashed axis would draw a slope of 1 at some other angle.
 * Every unit on each axis is numbered (every other one on a wide grid), so a
 * student checking a coordinate never has to count squares.
 *
 * Aiming follows GraphPlot: the aimed row and column light up, dashed guides
 * run back to both axes, the aimed ticks come forward, and the coordinate is
 * written beside the ring. Colours carry dark: variants; the lines and points
 * keep their own colours on either surface.
 */

const SKY = '#1cb0f6';
const RED = '#ff4b4b';

const fmt = (n) => (n < 0 ? `−${-n}` : `${n}`);
const pair = (x, y) => `(${fmt(x)}, ${fmt(y)})`;

export default function LinePlane({
  grid, lines = [], circles = [], segments = [], points = [], misses = [], missFlag = null,
  aim = null, armed = false, interactive = false, svgRef = null,
  onPointerMove, onPointerUp, onPointerLeave, onKeyDown, onClick,
  style, className = '', unit = 34, tabIndex,
}) {
  const { xMin, xMax, yMin, yMax } = grid;
  const cols = xMax - xMin;
  const rows = yMax - yMin;
  const U = unit;
  const PAD = PLANE_PAD;
  const W = cols * U + PAD * 2;
  const H = rows * U + PAD * 2;
  const X = (x) => PAD + (x - xMin) * U;
  const Y = (y) => PAD + (yMax - y) * U;
  const every = Math.max(cols, rows) > 14 ? 2 : 1;
  const xs = Array.from({ length: cols + 1 }, (_, i) => xMin + i);
  const ys = Array.from({ length: rows + 1 }, (_, i) => yMin + i);
  const win = { xMin, xMax, yMin, yMax };

  /** A coordinate flag pinned to a point, leaning away from the nearest edges. */
  const flagAt = (x, y, text, color, key) => {
    const w = text.length * 7.8 + 14;
    const left = X(x) + w + 20 > W;
    const below = Y(y) - 32 < 0;
    const bx = left ? X(x) - w - 11 : X(x) + 11;
    const by = below ? Y(y) + 8 : Y(y) - 29;
    return (
      <g key={key} pointerEvents="none">
        <rect x={bx} y={by} width={w} height={21} rx="7" className="fill-white dark:fill-slate-900" />
        <rect x={bx} y={by} width={w} height={21} rx="7" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.5" />
        <text x={bx + w / 2} y={by + 15} textAnchor="middle" fontSize="13" fontWeight="800"
          fontFamily="ui-monospace, monospace" fill={color}>{text}</text>
      </g>
    );
  };

  /** Label a line a little in from the end that sits higher on the page, written into the grid. */
  /** Does a drawn line (other than `skip`) pass through this px box? */
  const crossesBox = (box, skip) => lines.some((other, j) => {
    if (j === skip) return false;
    const { a, b, c } = other.line;
    if (b === 0) { const px = X(c / a); return px >= box[0] && px <= box[2]; }
    const y0 = Y((c - a * ((box[0] - PAD) / U + xMin)) / b);
    const y1 = Y((c - a * ((box[2] - PAD) / U + xMin)) / b);
    return Math.max(y0, y1) >= box[1] && Math.min(y0, y1) <= box[3];
  });

  const lineLabel = (ln, color, key, index) => {
    const ends = lineEnds(win, ln.line);
    if (!ends || !ln.label) return null;
    let x;
    let y;
    let anchor;
    if (ln.line.b === 0) { x = X(ln.line.c / ln.line.a) + 8; y = Y(yMax) + 16; anchor = 'start'; }
    else if (ln.line.a === 0) { x = X(xMax) - 6; y = Y(ln.line.c / ln.line.b) - 8; anchor = 'end'; }
    else {
      // Walk in from the end that sits higher on the page and take the first
      // spot where the label — written just above the line, into the grid —
      // clears both axes and their tick numbers and stays on the plate. A
      // label parked on the x-axis over "4 5 6" was the old failure.
      const [p, q] = ends;
      const [far, near] = Y(p[1]) < Y(q[1]) ? [p, q] : [q, p];
      const w = String(ln.label).length * 9.3;
      const place = (t) => {
        const lx = far[0] + t * (near[0] - far[0]);
        const ly = far[1] + t * (near[1] - far[1]);
        const right = X(lx) > (X(xMin) + X(xMax)) / 2;
        const bx = right ? X(lx) - 8 : X(lx) + 8;
        const by = Y(ly) - 10;
        const x0 = right ? bx - w : bx;
        const box = [x0, by - 13, x0 + w, by + 3];
        const hits = (a) => !(box[2] < a[0] || box[0] > a[2] || box[3] < a[1] || box[1] > a[3]);
        const clear = box[0] >= PAD && box[2] <= W - PAD && box[1] >= PAD - 6 && box[3] <= H - PAD
          && !hits([PAD, Y(0) - 4, W - PAD, Y(0) + 22])
          && !hits([X(0) - 30, PAD, X(0) + 6, H - PAD]);
        return { x: bx, y: by, anchor: right ? 'end' : 'start', clear, crosses: crossesBox(box, index) };
      };
      const tries = ln.labelT != null ? [ln.labelT] : [0.08, 0.16, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75];
      const spots = tries.map(place);
      const spot = spots.find((s) => s.clear && !s.crosses) || spots.find((s) => s.clear) || spots[0];
      ({ x, y, anchor } = spot);
    }
    return (
      <text key={key} x={x} y={y} textAnchor={anchor} fontSize="15" fontWeight="800" fontFamily="ui-monospace, monospace"
        fill={color} strokeWidth="4.5" paintOrder="stroke" className="stroke-white dark:stroke-slate-900" pointerEvents="none">
        {ln.label}
      </text>
    );
  };

  const lastMiss = misses.length ? misses[misses.length - 1] : null;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      tabIndex={tabIndex ?? (interactive ? 0 : -1)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
      onClick={onClick}
      style={style}
      className={`block select-none rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${interactive ? 'cursor-crosshair touch-none' : ''} ${className}`}>
      <rect x="0" y="0" width={W} height={H} rx="12" className="fill-white dark:fill-slate-900" />

      {xs.map((x) => <line key={`v${x}`} x1={X(x)} y1={PAD} x2={X(x)} y2={H - PAD} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />)}
      {ys.map((y) => <line key={`h${y}`} x1={PAD} y1={Y(y)} x2={W - PAD} y2={Y(y)} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />)}

      {aim && interactive && (
        <g pointerEvents="none">
          <rect x={X(aim[0]) - U / 2} y={PAD} width={U} height={H - PAD * 2} fill={SKY} opacity="0.07" />
          <rect x={PAD} y={Y(aim[1]) - U / 2} width={W - PAD * 2} height={U} fill={SKY} opacity="0.07" />
        </g>
      )}

      <line x1={PAD} y1={Y(0)} x2={W - PAD} y2={Y(0)} strokeWidth="2.4" className="stroke-slate-700 dark:stroke-slate-300" />
      <line x1={X(0)} y1={PAD} x2={X(0)} y2={H - PAD} strokeWidth="2.4" className="stroke-slate-700 dark:stroke-slate-300" />
      <text x={W - PAD + 12} y={Y(0) + 5} textAnchor="middle" fontSize="15" fontWeight="800" fontStyle="italic" className="fill-slate-400">x</text>
      <text x={X(0)} y={PAD - 10} textAnchor="middle" fontSize="15" fontWeight="800" fontStyle="italic" className="fill-slate-400">y</text>

      {xs.filter((x) => x !== 0 && x % every === 0).map((x) => {
        const on = interactive && !!aim && aim[0] === x;
        return (
          <text key={`tx${x}`} x={X(x)} y={Y(0) + 16} textAnchor="middle" fontSize={on ? 14 : 12} fontWeight={on ? 900 : 600}
            fontFamily="ui-monospace, monospace" strokeWidth="3.5" paintOrder="stroke" fill={on ? SKY : undefined}
            className={`stroke-white dark:stroke-slate-900 ${on ? '' : 'fill-slate-400'}`}>{fmt(x)}</text>
        );
      })}
      {ys.filter((y) => y !== 0 && y % every === 0).map((y) => {
        const on = interactive && !!aim && aim[1] === y;
        return (
          <text key={`ty${y}`} x={X(0) - 7} y={Y(y) + 4} textAnchor="end" fontSize={on ? 14 : 12} fontWeight={on ? 900 : 600}
            fontFamily="ui-monospace, monospace" strokeWidth="3.5" paintOrder="stroke" fill={on ? SKY : undefined}
            className={`stroke-white dark:stroke-slate-900 ${on ? '' : 'fill-slate-400'}`}>{fmt(y)}</text>
        );
      })}

      {interactive && xs.map((x) => ys.map((y) => (
        <circle key={`d${x}_${y}`} cx={X(x)} cy={Y(y)} r="2" className="fill-slate-300 dark:fill-slate-700" />
      )))}

      {/* circles under everything else that is drawn on the grid. The svg's own
          viewport clips one that runs off the plate. */}
      {circles.map((c, i) => {
        const color = c.color || LINE_COLORS[i % 4];
        return (
          <g key={`c${i}`} pointerEvents="none" opacity={c.faint ? 0.45 : 1}>
            {c.fill && <circle cx={X(c.centre[0])} cy={Y(c.centre[1])} r={c.r * U} fill={color} fillOpacity="0.07" stroke="none" />}
            <circle cx={X(c.centre[0])} cy={Y(c.centre[1])} r={c.r * U} fill="none" stroke={color} strokeWidth="3.6"
              strokeLinecap="round" pathLength={c.draw ? 1 : undefined}
              strokeDasharray={c.draw ? 1 : c.dashed ? '10 7' : undefined}>
              {/* No stroke-dashoffset attribute is set, so a browser that does
                  not run the animation simply shows the whole circle. */}
              {c.draw && <animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.9s" fill="freeze" />}
            </circle>
          </g>
        );
      })}

      {/* segments under the lines: the triangle legs, a hypotenuse */}
      {segments.map((s, i) => {
        const color = s.color || '#64748b';
        const mx = (X(s.from[0]) + X(s.to[0])) / 2;
        const my = (Y(s.from[1]) + Y(s.to[1])) / 2;
        const upright = Math.abs(s.from[0] - s.to[0]) < 1e-9;
        const flat = Math.abs(s.from[1] - s.to[1]) < 1e-9;
        const off = s.labelSide === 'before' ? -1 : 1;
        // A slanted segment is labelled off to one side along its normal —
        // the side facing up the page — so the text never sits on the line.
        let lx = mx;
        let ly = my + 5;
        let anchor = 'middle';
        if (upright) { lx = mx + 10 * off; anchor = off > 0 ? 'start' : 'end'; }
        else if (flat) ly = my + (off > 0 ? 20 : -9);
        else {
          const dx = X(s.to[0]) - X(s.from[0]);
          const dy = Y(s.to[1]) - Y(s.from[1]);
          const len = Math.hypot(dx, dy) || 1;
          let nx = -dy / len;
          let ny = dx / len;
          if (ny > 0) { nx = -nx; ny = -ny; }
          lx = mx + nx * 14;
          ly = my + ny * 14 + 5;
          anchor = nx < -0.2 ? 'end' : nx > 0.2 ? 'start' : 'middle';
        }
        return (
          <g key={`s${i}`} pointerEvents="none">
            <line x1={X(s.from[0])} y1={Y(s.from[1])} x2={X(s.to[0])} y2={Y(s.to[1])} stroke={color}
              strokeWidth={s.width || 3} strokeLinecap="round" strokeDasharray={s.dashed ? '7 6' : undefined} />
            {s.label && (
              <text x={lx} y={ly}
                textAnchor={anchor} fontSize="15" fontWeight="900"
                fontFamily="ui-monospace, monospace" fill={color} strokeWidth="4.5" paintOrder="stroke"
                className="stroke-white dark:stroke-slate-900">{s.label}</text>
            )}
          </g>
        );
      })}

      {lines.map((ln, i) => {
        const ends = lineEnds(win, ln.line);
        if (!ends) return null;
        const [[x1, y1], [x2, y2]] = ends;
        return (
          <line key={`l${i}`} x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke={ln.color || LINE_COLORS[i % 4]}
            strokeWidth="3.6" strokeLinecap="round" strokeDasharray={ln.dashed ? '10 7' : undefined}
            opacity={ln.faint ? 0.45 : 1} pointerEvents="none" />
        );
      })}
      {lines.map((ln, i) => lineLabel(ln, ln.color || LINE_COLORS[i % 4], `ll${i}`, i))}

      {misses.map(([x, y], i) => (
        <g key={`m${i}`} opacity={i === misses.length - 1 ? 0.9 : 0.35} pointerEvents="none">
          <line x1={X(x) - 7} y1={Y(y) - 7} x2={X(x) + 7} y2={Y(y) + 7} stroke={RED} strokeWidth="3.5" strokeLinecap="round" />
          <line x1={X(x) + 7} y1={Y(y) - 7} x2={X(x) - 7} y2={Y(y) + 7} stroke={RED} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      ))}
      {lastMiss && missFlag && (!aim || aim[0] !== lastMiss[0] || aim[1] !== lastMiss[1]) && flagAt(lastMiss[0], lastMiss[1], missFlag, RED, 'missflag')}

      {points.map((p, i) => {
        const [x, y] = p.at;
        const color = p.color || '#be185d';
        return (
          <g key={`p${i}`} pointerEvents="none">
            <circle cx={X(x)} cy={Y(y)} r={p.r || 7.5} fill={color} strokeWidth="3" className="stroke-white dark:stroke-slate-900" />
            {p.name && !p.flag && (
              <text x={X(x) + 11} y={Y(y) - 10} fontSize="16" fontWeight="900" fontFamily="ui-monospace, monospace"
                fill={color} strokeWidth="4.5" paintOrder="stroke" className="stroke-white dark:stroke-slate-900">{p.name}</text>
            )}
            {p.flag && flagAt(x, y, p.name ? `${p.name} ${p.flag}` : p.flag, color, `pf${i}`)}
          </g>
        );
      })}

      {aim && interactive && (
        <g pointerEvents="none">
          <line x1={X(aim[0])} y1={Y(aim[1])} x2={X(aim[0])} y2={Y(0)} stroke={SKY} strokeWidth="2" strokeDasharray="5 5" opacity="0.85" />
          <line x1={X(aim[0])} y1={Y(aim[1])} x2={X(0)} y2={Y(aim[1])} stroke={SKY} strokeWidth="2" strokeDasharray="5 5" opacity="0.85" />
          <circle cx={X(aim[0])} cy={Y(aim[1])} r="13" fill="none" stroke={SKY} strokeWidth="2.5"
            opacity={armed ? 0.95 : 0.55} strokeDasharray={armed ? undefined : '4 4'} />
          <circle cx={X(aim[0])} cy={Y(aim[1])} r="5" fill={SKY} strokeWidth="2.5" className="stroke-white dark:stroke-slate-900" />
          {flagAt(aim[0], aim[1], pair(aim[0], aim[1]), SKY, 'aimflag')}
        </g>
      )}
    </svg>
  );
}
