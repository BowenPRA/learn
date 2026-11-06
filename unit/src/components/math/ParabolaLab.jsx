import { useState } from 'react';
import { rootsOf } from '../../utils/parabola';

/**
 * ParabolaLab — y = a(x − h)² + k with one, two or three live sliders.
 *
 * It exists for the one thing a static diagram cannot do: hold the curve on
 * screen while a SINGLE number changes, so the student watches the same
 * parabola move instead of comparing two pictures. y = x² stays on the grid in
 * dashed grey at all times, so "narrower", "moved right" and "upside down" are
 * statements about something visible rather than remembered.
 *
 *   params.show   which sliders to expose: "k" | "a" | "h" | "ahk" (any subset)
 *   params.aStart/hStart/kStart   opening values (default 1 / 0 / 0)
 *   params.zeros  true → also mark where the curve crosses the x-axis, with a
 *                 live count. Used by the Zeros unit, off by default.
 *   lang          'en' | 'vn' — only the Reset button and the legend have words
 *
 * House rules kept (docs/math-widgets.md §2): flex-col root, stage on top,
 * controls in a card below, sliders on the concept's colour, monospace for
 * numbers inside the SVG, dark: variants on every surface, no external libs.
 *
 * EQUAL SCALE ON BOTH AXES (40px per unit). A squashed y-axis would make the
 * a-slider a lie, and the a-slider is the point.
 */

const SKY = '#1cb0f6';
const GREEN = '#58cc02';
const PURPLE = '#ce82ff';
const AMBER = '#f59e0b';

const W = 880;
const H = 540;
const U = 40;
const OX = 440;
const OY = 320;
const XMIN = -11;
const XMAX = 11;
const YMIN = -5.5;
const YMAX = 8;

const X = (x) => OX + x * U;
const Y = (y) => OY - y * U;

const AXIS_X = [-10, -8, -6, -4, -2, 2, 4, 6, 8, 10];
const AXIS_Y = [-4, -2, 2, 4, 6];

const EN = { reset: 'Reset', ghost: 'y = x²', zeros: 'zeros', noZeros: 'no zeros' };
const VN = { reset: 'Đặt lại', ghost: 'y = x²', zeros: 'nghiệm', noZeros: 'không có nghiệm' };

/** Sampled path for y = f(x), broken wherever it leaves the window. */
function pathFor(f) {
  let d = '';
  let pen = false;
  for (let i = 0; i <= 600; i++) {
    const x = XMIN + (i / 600) * (XMAX - XMIN);
    const y = f(x);
    if (!Number.isFinite(y) || y < YMIN || y > YMAX) { pen = false; continue; }
    d += `${pen ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)} `;
    pen = true;
  }
  return d.trim();
}

const num = (v) => String(Math.abs(Math.round(v * 100) / 100));
const signed = (v) => (v < 0 ? `−${num(v)}` : num(v));

/** The equation as it would be written on the board, with the signs folded in. */
function equationOf(a, h, k) {
  const lead = a === 1 ? '' : a === -1 ? '−' : signed(a);
  const body = h === 0 ? 'x²' : `(x ${h > 0 ? '−' : '+'} ${num(h)})²`;
  const tail = k === 0 ? '' : k > 0 ? ` + ${num(k)}` : ` − ${num(k)}`;
  return `y = ${lead}${body}${tail}`;
}

function Slider({ label, tone, value, min, max, step, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-[4.5rem] shrink-0 font-black text-base tabular-nums rounded-lg px-2 py-1 text-center text-white"
        style={{ backgroundColor: tone }}>
        {label} = {signed(value)}
      </span>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        // Same track treatment as MathGraph: without an explicit background the
        // unfilled half of the track renders near-black in Chrome.
        className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
        style={{ accentColor: tone }}
      />
    </div>
  );
}

export default function ParabolaLab({
  show = 'ahk',
  aStart = 1,
  hStart = 0,
  kStart = 0,
  zeros = false,
  lang = 'en',
}) {
  const [a, setA] = useState(aStart);
  const [h, setH] = useState(hStart);
  const [k, setK] = useState(kStart);

  const t = lang === 'vn' ? VN : EN;
  const f = (x) => a * (x - h) * (x - h) + k;
  const moved = a !== aStart || h !== hStart || k !== kStart;
  const tone = show.includes('a') && show.length === 1 ? SKY
    : show === 'h' ? GREEN
      : show === 'k' ? PURPLE
        : AMBER;
  const roots = zeros ? rootsOf({ a, h, k }) : [];

  return (
    <div className="w-full h-full flex flex-col select-none touch-none gap-3">
      <div className="flex-1 min-h-[220px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          <rect x="0" y="0" width={W} height={H} rx="14" className="fill-white dark:fill-slate-900" />
          <rect x="0.75" y="0.75" width={W - 1.5} height={H - 1.5} rx="13" fill="none" strokeWidth="1.5" className="stroke-slate-200 dark:stroke-slate-700" />

          {Array.from({ length: XMAX - XMIN + 1 }, (_, i) => XMIN + i).map((x) => (
            <line key={`v${x}`} x1={X(x)} y1={0} x2={X(x)} y2={H} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />
          ))}
          {Array.from({ length: 14 }, (_, i) => -5 + i).map((y) => (
            <line key={`hz${y}`} x1={0} y1={Y(y)} x2={W} y2={Y(y)} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />
          ))}
          <line x1={0} y1={Y(0)} x2={W} y2={Y(0)} strokeWidth="2.2" className="stroke-slate-700 dark:stroke-slate-300" />
          <line x1={X(0)} y1={0} x2={X(0)} y2={H} strokeWidth="2.2" className="stroke-slate-700 dark:stroke-slate-300" />

          {AXIS_X.map((x) => (
            <text key={`tx${x}`} x={X(x)} y={Y(0) + 22} textAnchor="middle" fontSize="17" fontFamily="monospace" className="fill-slate-500 dark:fill-slate-400">
              {x < 0 ? `−${-x}` : x}
            </text>
          ))}
          {AXIS_Y.map((y) => (
            <text key={`ty${y}`} x={X(0) - 10} y={Y(y) + 6} textAnchor="end" fontSize="17" fontFamily="monospace" className="fill-slate-500 dark:fill-slate-400">
              {y < 0 ? `−${-y}` : y}
            </text>
          ))}

          {/* y = x², never moving, so every claim about the live curve is visible */}
          <path d={pathFor((x) => x * x)} fill="none" strokeWidth="3" strokeDasharray="9 7" strokeLinecap="round" className="stroke-slate-300 dark:stroke-slate-600" />
          <path d={pathFor(f)} fill="none" stroke={tone} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {roots.map((r, i) => (
            <circle key={`r${i}`} cx={X(r)} cy={Y(0)} r="8" fill={AMBER} strokeWidth="3" className="stroke-white dark:stroke-slate-900" />
          ))}

          <circle cx={X(h)} cy={Y(k)} r="9" fill={tone} strokeWidth="3" className="stroke-white dark:stroke-slate-900" />
          <text
            x={X(h) + 16}
            y={Y(k) + (a < 0 ? 30 : -14)}
            fontSize="21"
            fontWeight="800"
            fill={tone}
            strokeWidth="5"
            paintOrder="stroke"
            fontFamily="monospace"
            className="stroke-white dark:stroke-slate-900">
            ({signed(h)}, {signed(k)})
          </text>
        </svg>
      </div>

      <div className="shrink-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-3 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="flex-1 font-black text-xl sm:text-2xl tabular-nums" style={{ color: tone }}>
            {equationOf(a, h, k)}
          </span>
          {zeros && (
            <span className="shrink-0 rounded-lg px-3 py-1 font-black text-xs uppercase tracking-widest text-white" style={{ backgroundColor: AMBER }}>
              {roots.length ? `${roots.length} ${t.zeros}` : t.noZeros}
            </span>
          )}
          <button
            onClick={() => { setA(aStart); setH(hStart); setK(kStart); }}
            disabled={!moved}
            className="shrink-0 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-slate-400 dark:bg-slate-600 disabled:opacity-40 active:scale-95 transition-all">
            {t.reset}
          </button>
        </div>
        {show.includes('a') && <Slider label="a" tone={SKY} value={a} min={-2} max={2} step={0.25} onChange={setA} />}
        {show.includes('h') && <Slider label="h" tone={GREEN} value={h} min={-5} max={5} step={0.5} onChange={setH} />}
        {show.includes('k') && <Slider label="k" tone={PURPLE} value={k} min={-4} max={6} step={0.5} onChange={setK} />}
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 text-center">
          — — — {t.ghost}
        </p>
      </div>
    </div>
  );
}
