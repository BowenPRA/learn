import { useState } from 'react';

/**
 * SlopeLab — y = mx + b with a live slope and a live intercept.
 *
 * The slide widget for the AOPS lines units. It exists for what a static
 * diagram cannot do: hold ONE line on screen while a single number changes,
 * so "steeper", "downhill" and "moved up" are things the student watches the
 * same line do. The slope triangle is drawn from the y-intercept — run the
 * slope's denominator to the right, rise its numerator — so the fraction on
 * the slider is also a path on the grid. y = x stays dashed behind it as the
 * slope-1 line to compare against.
 *
 *   params.show     which sliders: "m" | "b" | "mb"
 *   params.mStart   the opening slope, as a string from the list below ("1/2")
 *   params.bStart   the opening intercept (default 0)
 *   params.triangle show the rise/run triangle (default true)
 *   lang            'en' | 'vn' — the legend, the steepness words, Reset
 *
 * House rules (docs/math-widgets.md §2): flex-col root, stage on top,
 * controls in a card below, monospace numbers, dark: on every surface, equal
 * scale on both axes (a squashed axis would draw slope 1 at some other angle).
 */

const SKY = '#0891b2';
const PURPLE = '#a855f7';
const AMBER = '#d97706';
const GREEN = '#16a34a';

// The slopes the slider steps through: every one has a small denominator, so
// its triangle fits on the grid and reads as whole squares.
const SLOPES = ['-4', '-3', '-2', '-3/2', '-1', '-2/3', '-1/2', '-1/3', '-1/4', '0', '1/4', '1/3', '1/2', '2/3', '1', '3/2', '2', '3', '4'];
const parseSlope = (s) => {
  const [n, d = '1'] = s.split('/');
  return { n: Number(n), d: Number(d) };
};

// Wide and short on purpose: the widget sits in a split slide's media column,
// which on a 1280 x 720 laptop is about twice as wide as the height left over
// after the controls. A squarer stage was squeezed to a postage stamp.
const W = 880;
const H = 480;
const U = 40;
const OX = 440;
const OY = 240;
const XMIN = -10.5;
const XMAX = 10.5;
const YMIN = -5.5;
const YMAX = 5.5;
const X = (x) => OX + x * U;
const Y = (y) => OY - y * U;

const EN = {
  reset: 'Reset', ghost: 'y = x', rise: 'rise', run: 'run',
  up: 'uphill', down: 'downhill', flat: 'flat — slope 0', steep: 'steeper than y = x', gentle: 'gentler than y = x', one: 'exactly as steep as y = x',
};
const VN = {
  reset: 'Đặt lại', ghost: 'y = x', rise: 'dọc', run: 'ngang',
  up: 'đi lên', down: 'đi xuống', flat: 'nằm ngang — hệ số góc 0', steep: 'dốc hơn y = x', gentle: 'thoải hơn y = x', one: 'dốc đúng bằng y = x',
};

const fmt = (v) => (v < 0 ? `−${-v}` : `${v}`);
const slopeText = ({ n, d }) => (d === 1 ? fmt(n) : `${n < 0 ? '−' : ''}${Math.abs(n)}/${d}`);

/** "y = −1/2x + 3" as it would be written on the board. */
function equationOf(m, b) {
  const mv = m.n / m.d;
  let lead;
  if (mv === 0) lead = '';
  else if (m.d === 1) lead = m.n === 1 ? 'x' : m.n === -1 ? '−x' : `${fmt(m.n)}x`;
  else lead = `${m.n < 0 ? '−' : ''}${Math.abs(m.n)}/${m.d} x`;
  if (!lead) return `y = ${fmt(b)}`;
  const tail = b === 0 ? '' : b > 0 ? ` + ${b}` : ` − ${-b}`;
  return `y = ${lead}${tail}`;
}

function Slider({ label, tone, text, value, min, max, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[5.5rem] shrink-0 font-black text-base tabular-nums rounded-lg px-2 py-1 text-center text-white" style={{ backgroundColor: tone }}>
        {label} = {text}
      </span>
      <input type="range" aria-label={label} min={min} max={max} step={1} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
        style={{ accentColor: tone }} />
    </div>
  );
}

/** The line's two ends where it leaves the window. */
function ends(mv, b) {
  const pts = [];
  const push = (x, y) => { if (x >= XMIN - 1e-9 && x <= XMAX + 1e-9 && y >= YMIN - 1e-9 && y <= YMAX + 1e-9) pts.push([x, y]); };
  push(XMIN, mv * XMIN + b);
  push(XMAX, mv * XMAX + b);
  if (mv !== 0) { push((YMIN - b) / mv, YMIN); push((YMAX - b) / mv, YMAX); }
  pts.sort((p, q) => p[0] - q[0]);
  return pts.length >= 2 ? [pts[0], pts[pts.length - 1]] : null;
}

export default function SlopeLab({ show = 'mb', mStart = '1', bStart = 0, triangle = true, lang = 'en' }) {
  const start = Math.max(0, SLOPES.indexOf(String(mStart)));
  const [mi, setMi] = useState(start);
  const [b, setB] = useState(bStart);
  const t = lang === 'vn' ? VN : EN;
  const m = parseSlope(SLOPES[mi]);
  const mv = m.n / m.d;
  const e = ends(mv, b);
  const moved = mi !== start || b !== bStart;
  const feel = mv === 0 ? t.flat
    : `${mv > 0 ? t.up : t.down} · ${Math.abs(mv) > 1 ? t.steep : Math.abs(mv) < 1 ? t.gentle : t.one}`;

  // The triangle: from (0, b), run d to the right, then rise n.
  const tri = triangle && mv !== 0 ? { x0: 0, y0: b, x1: m.d, y1: b + m.n } : null;
  const triFits = tri && tri.y1 >= YMIN && tri.y1 <= YMAX && tri.y0 >= YMIN && tri.y0 <= YMAX;

  return (
    <div className="w-full h-full flex flex-col select-none gap-3">
      <div className="flex-1 min-h-[180px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          <rect x="0" y="0" width={W} height={H} rx="14" className="fill-white dark:fill-slate-900" />
          {Array.from({ length: 21 }, (_, i) => -10 + i).map((x) => (
            <line key={`v${x}`} x1={X(x)} y1={Y(YMAX)} x2={X(x)} y2={Y(YMIN)} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />
          ))}
          {Array.from({ length: 11 }, (_, i) => -5 + i).map((y) => (
            <line key={`h${y}`} x1={X(XMIN)} y1={Y(y)} x2={X(XMAX)} y2={Y(y)} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />
          ))}
          <line x1={X(XMIN)} y1={Y(0)} x2={X(XMAX)} y2={Y(0)} strokeWidth="2.2" className="stroke-slate-700 dark:stroke-slate-300" />
          <line x1={X(0)} y1={Y(YMAX)} x2={X(0)} y2={Y(YMIN)} strokeWidth="2.2" className="stroke-slate-700 dark:stroke-slate-300" />
          {[-8, -6, -4, -2, 2, 4, 6, 8].map((x) => (
            <text key={`tx${x}`} x={X(x)} y={Y(0) + 26} textAnchor="middle" fontSize="22" fontWeight="600" fontFamily="monospace" className="fill-slate-500 dark:fill-slate-400">{fmt(x)}</text>
          ))}
          {[-4, -2, 2, 4].map((y) => (
            <text key={`ty${y}`} x={X(0) - 10} y={Y(y) + 7} textAnchor="end" fontSize="22" fontWeight="600" fontFamily="monospace" className="fill-slate-500 dark:fill-slate-400">{fmt(y)}</text>
          ))}

          {/* y = x, never moving: the slope-1 line to measure "steep" against */}
          <line x1={X(YMIN)} y1={Y(YMIN)} x2={X(YMAX)} y2={Y(YMAX)} strokeWidth="3" strokeDasharray="10 8" className="stroke-slate-300 dark:stroke-slate-600" />
          <text x={X(YMAX) + 10} y={Y(YMAX) + 22} fontSize="22" fontWeight="700" fontFamily="monospace" className="fill-slate-400 dark:fill-slate-500">{t.ghost}</text>

          {e && <line x1={X(e[0][0])} y1={Y(e[0][1])} x2={X(e[1][0])} y2={Y(e[1][1])} stroke={SKY} strokeWidth="5.5" strokeLinecap="round" />}

          {triFits && (
            <g>
              <line x1={X(tri.x0)} y1={Y(tri.y0)} x2={X(tri.x1)} y2={Y(tri.y0)} stroke={AMBER} strokeWidth="3.5" strokeDasharray="7 5" />
              <line x1={X(tri.x1)} y1={Y(tri.y0)} x2={X(tri.x1)} y2={Y(tri.y1)} stroke={GREEN} strokeWidth="3.5" strokeDasharray="7 5" />
              <text x={(X(tri.x0) + X(tri.x1)) / 2} y={Y(tri.y0) + (m.n > 0 ? (b === 0 ? 58 : 30) : -14)} textAnchor="middle" fontSize="26" fontWeight="800"
                fontFamily="monospace" fill={AMBER} strokeWidth="5" paintOrder="stroke" className="stroke-white dark:stroke-slate-900">{t.run} {m.d}</text>
              <text x={X(tri.x1) + 12} y={(Y(tri.y0) + Y(tri.y1)) / 2 + 9} fontSize="26" fontWeight="800"
                fontFamily="monospace" fill={GREEN} strokeWidth="5" paintOrder="stroke" className="stroke-white dark:stroke-slate-900">{t.rise} {fmt(m.n)}</text>
            </g>
          )}

          <circle cx={X(0)} cy={Y(b)} r="11" fill={PURPLE} strokeWidth="3" className="stroke-white dark:stroke-slate-900" />
          <text x={X(0) - 16} y={Y(b) - 14} textAnchor="end" fontSize="26" fontWeight="800" fontFamily="monospace" fill={PURPLE}
            strokeWidth="5" paintOrder="stroke" className="stroke-white dark:stroke-slate-900">(0, {fmt(b)})</text>
        </svg>
      </div>

      <div className="shrink-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm px-3 py-2.5 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="flex-1 min-w-0">
            <span className="block font-black text-xl sm:text-2xl tabular-nums leading-tight" style={{ color: SKY }}>{equationOf(m, b)}</span>
            <span className="block text-[11px] font-black uppercase tracking-widest leading-tight" style={{ color: SKY }}>{feel}</span>
          </span>
          <button onClick={() => { setMi(start); setB(bStart); }} disabled={!moved}
            className="shrink-0 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-slate-400 dark:bg-slate-600 disabled:opacity-40 active:scale-95 transition-all">
            {t.reset}
          </button>
        </div>
        {show.includes('m') && <Slider label="m" tone={SKY} text={slopeText(m)} value={mi} min={0} max={SLOPES.length - 1} onChange={setMi} />}
        {show.includes('b') && <Slider label="b" tone={PURPLE} text={fmt(b)} value={b} min={-5} max={5} onChange={setB} />}
      </div>
    </div>
  );
}
