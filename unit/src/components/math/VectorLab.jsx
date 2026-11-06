import { useState, useRef } from 'react';
import { componentsOf, resultantOf, norm360, toRad, round1, signed } from '../../utils/vectors';

/**
 * VectorLab — two forces you can grab and drag, with the addition drawn live.
 *
 * It exists for the one thing a static diagram cannot do: hold the question on
 * screen while the student MOVES a force and watches the answer move with it.
 * "You cannot just add the sizes" stops being a rule to trust and becomes
 * something they made happen: drag the two forces onto each other and the
 * resultant really is 10 + 6; open them to a right angle and 10 and 6 make
 * 11.7, not 16; turn one round and it collapses to 4.
 *
 *   params.a / params.b   opening force, `{ mag, angle }` (angle in degrees,
 *                         anticlockwise from +x). Defaults 8 N at 0° / 6 N at 90°.
 *   params.show           which constructions start switched on, any of
 *                         'chain' | 'parts' | 'para', space separated.
 *                         Default 'chain parts'.
 *   params.span           grid reach in newtons each way (default 12).
 *   params.presets        false hides the three preset buttons.
 *   lang                  'en' | 'vn' — the chips and the read-out have words.
 *
 * House rules kept (docs/math-widgets.md §2): flex-col root, stage on top,
 * controls in a card below, monospace for numbers inside the SVG, dark:
 * variants on every surface, no external libs.
 *
 * EQUAL SCALE ON BOTH AXES. A squashed axis draws a 30° force at some other
 * angle, and the angle is the entire subject.
 *
 * The pointer → grid map goes through getScreenCTM(), not through
 * getBoundingClientRect() ratios: the svg is clamped by both a width and a
 * height, so whenever those disagree with the viewBox the browser letterboxes
 * the drawing and a ratio map drops the force a newton or two from the finger
 * that is dragging it.
 */

const SKY = '#1cb0f6';
const PLUM = '#ce82ff';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const PINK = '#ec4899';
const SLATE = '#94a3b8';

const W = 560;
const PAD = 30;

const EN = {
  chain: 'Tip to tail',
  parts: 'x and y parts',
  para: 'Parallelogram',
  same: 'Same way',
  right: 'Right angle',
  against: 'Against',
  drag: 'Drag either arrowhead.',
};

const VN = {
  chain: 'Nối đuôi',
  parts: 'Phần x và y',
  para: 'Hình bình hành',
  same: 'Cùng hướng',
  right: 'Vuông góc',
  against: 'Ngược hướng',
  drag: 'Kéo đầu mũi tên bất kỳ.',
};

/** An arrow with a solid head, shaft stopped short so nothing overshoots. */
function Arrow({ x1, y1, x2, y2, color, width = 5, opacity = 1, head = 16 }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return null;
  const h = Math.min(head, len * 0.55);
  const ux = dx / len;
  const uy = dy / len;
  const bx = x2 - ux * h;
  const by = y2 - uy * h;
  const px = -uy * h * 0.42;
  const py = ux * h * 0.42;
  return (
    <g opacity={opacity} pointerEvents="none">
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`} fill={color} />
    </g>
  );
}

function Tag({ x, y, children, color, size = 16, anchor = 'middle' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="800" fontFamily="ui-monospace, monospace"
      fill={color} strokeWidth="5" paintOrder="stroke" className="stroke-white dark:stroke-slate-900"
      pointerEvents="none">{children}</text>
  );
}

/** One toggle chip. Lit chips carry their construction's own colour. */
function Chip({ on, color, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider border-2 transition-colors ${on ? 'text-white' : 'text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
      style={on ? { backgroundColor: color, borderColor: color } : undefined}>
      {children}
    </button>
  );
}

export default function VectorLab({
  a: aStart = { mag: 8, angle: 0 },
  b: bStart = { mag: 6, angle: 90 },
  show = 'chain parts',
  span = 12,
  presets = true,
  lang = 'en',
}) {
  const [a, setA] = useState(aStart);
  const [b, setB] = useState(bStart);
  const [chain, setChain] = useState(show.includes('chain'));
  const [parts, setParts] = useState(show.includes('parts'));
  const [para, setPara] = useState(show.includes('para'));
  const [drag, setDrag] = useState(null);
  const svgRef = useRef(null);

  const t = lang === 'vn' ? VN : EN;

  const U = (W / 2 - PAD) / span;
  const X = (x) => W / 2 + x * U;
  const Y = (y) => W / 2 - y * U;

  const ca = componentsOf(a);
  const cb = componentsOf(b);
  // Forces that cancel leave floating-point dust (1e-15), and atan2 of dust is
  // an arbitrary angle — "0 N at 270°". Nothing is nothing, pointing nowhere.
  const rRaw = resultantOf([a, b]);
  const r = rRaw.mag < 1e-9 ? { ...rRaw, x: 0, y: 0, mag: 0, angle: 0 } : rRaw;
  const step = span <= 6 ? 1 : span <= 15 ? 2 : 5;

  // Multiples of the step, not offsets from -span: a span of 16 with a step of
  // 5 would otherwise rule the grid at 4, 9, 14 and make every reading wrong.
  const ticks = [];
  for (let v = step; v <= span + 1e-9; v += step) ticks.push(Math.round(v * 100) / 100, -Math.round(v * 100) / 100);

  /** Arc of the angle at the origin, from the +x axis round to `deg`. */
  const arcPath = (rad, deg) => {
    const d = norm360(deg);
    return `M${X(0) + rad},${Y(0)} A${rad},${rad} 0 ${d > 180 ? 1 : 0} 0 ` +
      `${X(0) + rad * Math.cos(toRad(d))},${Y(0) - rad * Math.sin(toRad(d))}`;
  };

  /** Pointer → newtons, through the transform the browser really used. */
  const toGrid = (e) => {
    const svg = svgRef.current;
    if (!svg || typeof svg.getScreenCTM !== 'function') return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    let pt;
    if (typeof svg.createSVGPoint === 'function') {
      pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
    } else if (typeof DOMPoint === 'function') {
      pt = new DOMPoint(e.clientX, e.clientY);
    } else return null;
    const loc = pt.matrixTransform(ctm.inverse());
    return { x: (loc.x - W / 2) / U, y: (W / 2 - loc.y) / U };
  };

  /** Whole-degree angles and half-newton sizes: numbers a student can read. */
  const grabbedTo = (p) => ({
    mag: Math.max(0.5, Math.min(span, Math.round(Math.hypot(p.x, p.y) * 2) / 2)),
    angle: Math.round(norm360(Math.atan2(p.y, p.x) * 180 / Math.PI)),
  });

  /**
   * Route the rest of the gesture to this handle, so a finger that slides off
   * the arrowhead keeps dragging it. Guarded: a pointer id the browser no
   * longer considers active throws, and an unguarded throw here would abort the
   * handler and the drag would never start at all.
   */
  const grab = (e) => {
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch { /* not capturable */ }
  };

  const onMove = (e) => {
    if (!drag) return;
    const p = toGrid(e);
    if (!p) return;
    (drag === 'a' ? setA : setB)(grabbedTo(p));
  };

  const preset = (which) => {
    if (which === 'same') setB({ mag: b.mag, angle: a.angle });
    if (which === 'right') setB({ mag: b.mag, angle: norm360(a.angle + 90) });
    if (which === 'against') setB({ mag: b.mag, angle: norm360(a.angle + 180) });
  };

  const tipB = { x: ca.x + cb.x, y: ca.y + cb.y };

  return (
    <div className="w-full h-full flex flex-col select-none touch-none gap-2">
      <div className="flex-1 min-h-[220px]">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${W}`} className="w-full h-full"
          onPointerMove={onMove}
          onPointerUp={() => setDrag(null)}
          onPointerCancel={() => setDrag(null)}
          onPointerLeave={() => setDrag(null)}>
          <rect x="0" y="0" width={W} height={W} rx="14" className="fill-white dark:fill-slate-900" />
          <rect x="0.75" y="0.75" width={W - 1.5} height={W - 1.5} rx="13" fill="none" strokeWidth="1.5"
            className="stroke-slate-200 dark:stroke-slate-700" />

          {ticks.map((v) => (
            <g key={`g${v}`}>
              <line x1={X(v)} y1={PAD} x2={X(v)} y2={W - PAD} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />
              <line x1={PAD} y1={Y(v)} x2={W - PAD} y2={Y(v)} strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />
            </g>
          ))}
          <line x1={PAD} y1={Y(0)} x2={W - PAD} y2={Y(0)} strokeWidth="2.2" className="stroke-slate-700 dark:stroke-slate-300" />
          <line x1={X(0)} y1={PAD} x2={X(0)} y2={W - PAD} strokeWidth="2.2" className="stroke-slate-700 dark:stroke-slate-300" />
          {ticks.filter((v) => v > 0).map((v) => (
            <Tag key={`t${v}`} x={X(v)} y={Y(0) + 20} color={SLATE} size={13}>{v}</Tag>
          ))}

          {/* the parallelogram: the same answer, drawn the other way round */}
          {para && (
            <path d={`M${X(0)},${Y(0)} L${X(ca.x)},${Y(ca.y)} L${X(tipB.x)},${Y(tipB.y)} L${X(cb.x)},${Y(cb.y)} Z`}
              fill={GREEN} fillOpacity="0.07" stroke={SLATE} strokeWidth="2" strokeDasharray="7 6" pointerEvents="none" />
          )}

          {/* the x and y parts of the resultant, as its right triangle */}
          {parts && (
            <g pointerEvents="none">
              <path d={`M${X(0)},${Y(0)} L${X(r.x)},${Y(0)} L${X(r.x)},${Y(r.y)} Z`} fill={GREEN} fillOpacity="0.09" />
              <line x1={X(0)} y1={Y(0)} x2={X(r.x)} y2={Y(0)} stroke={AMBER} strokeWidth="4" strokeDasharray="9 6" strokeLinecap="round" />
              <line x1={X(r.x)} y1={Y(0)} x2={X(r.x)} y2={Y(r.y)} stroke={PINK} strokeWidth="4" strokeDasharray="9 6" strokeLinecap="round" />
              <Tag x={X(r.x / 2)} y={Y(0) + (r.y >= 0 ? 32 : -18)} color={AMBER} size={15}>{signed(round1(r.x))}</Tag>
              <Tag x={X(r.x) + (r.x >= 0 ? 34 : -34)} y={Y(r.y / 2)} color={PINK} size={15}>{signed(round1(r.y))}</Tag>
              {r.mag > 0 && <path d={arcPath(48, r.angle)} fill="none" stroke={GREEN} strokeWidth="2.5" />}
              {r.mag > 0 && (
                <Tag x={X(0) + 76 * Math.cos(toRad(r.angle / 2))} y={Y(0) - 76 * Math.sin(toRad(r.angle / 2)) + 5}
                  color={GREEN} size={14}>{round1(r.angle)}°</Tag>
              )}
            </g>
          )}

          {/* B slid over so its tail sits on A's tip — the whole method, moving */}
          {chain && (
            <>
              <line x1={X(cb.x)} y1={Y(cb.y)} x2={X(tipB.x)} y2={Y(tipB.y)} stroke={SLATE} strokeWidth="1.5"
                strokeDasharray="4 5" opacity="0.5" pointerEvents="none" />
              <Arrow x1={X(ca.x)} y1={Y(ca.y)} x2={X(tipB.x)} y2={Y(tipB.y)} color={PLUM} width={4.5} opacity="0.85" />
            </>
          )}

          <Arrow x1={X(0)} y1={Y(0)} x2={X(r.x)} y2={Y(r.y)} color={GREEN} width={7} head={20} />
          <Arrow x1={X(0)} y1={Y(0)} x2={X(ca.x)} y2={Y(ca.y)} color={SKY} width={5} />
          <Arrow x1={X(0)} y1={Y(0)} x2={X(cb.x)} y2={Y(cb.y)} color={PLUM} width={5} />

          <Tag x={X(r.x * 0.55) + 26} y={Y(r.y * 0.55) + 24} color={GREEN} size={18}>R</Tag>

          {/* the handles. Big, ringed, and obviously grabbable. */}
          {[['a', ca, SKY, a], ['b', cb, PLUM, b]].map(([id, c, col, v]) => (
            <g key={id} className="cursor-grab" onPointerDown={(e) => { setDrag(id); grab(e); }}>
              <circle cx={X(c.x)} cy={Y(c.y)} r="20" fill="transparent" />
              <circle cx={X(c.x)} cy={Y(c.y)} r={drag === id ? 13 : 11} fill={col} strokeWidth="3.5"
                className="stroke-white dark:stroke-slate-900" />
              <Tag x={X(c.x)} y={Y(c.y) - 22} color={col} size={16}>
                {id.toUpperCase()} {v.mag}
              </Tag>
            </g>
          ))}

          <circle cx={X(0)} cy={Y(0)} r="4.5" className="fill-slate-700 dark:fill-slate-300" pointerEvents="none" />
        </svg>
      </div>

      <div className="shrink-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-3 flex flex-col gap-2.5">
        {/* The answer, always visible, always changing under the drag */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 font-mono font-black text-sm sm:text-base tabular-nums">
            <span style={{ color: SKY }}>{a.mag}@{a.angle}°</span>
            <span className="text-slate-400">+</span>
            <span style={{ color: PLUM }}>{b.mag}@{b.angle}°</span>
            <span className="text-slate-400">=</span>
            <span className="px-2 py-0.5 rounded-lg text-white" style={{ backgroundColor: GREEN }}>
              {round1(r.mag)}@{round1(r.angle)}°
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono font-black text-xs tabular-nums">
            <span style={{ color: AMBER }}>Rx {signed(round1(r.x))}</span>
            <span style={{ color: PINK }}>Ry {signed(round1(r.y))}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <Chip on={chain} color={PLUM} onClick={() => setChain((v) => !v)}>{t.chain}</Chip>
          <Chip on={parts} color={AMBER} onClick={() => setParts((v) => !v)}>{t.parts}</Chip>
          <Chip on={para} color={SLATE} onClick={() => setPara((v) => !v)}>{t.para}</Chip>
          {presets && (
            <>
              <span className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />
              {[['same', t.same], ['right', t.right], ['against', t.against]].map(([id, label]) => (
                <button key={id} onClick={() => preset(id)}
                  className="px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-600 active:scale-95 transition-transform">
                  {label}
                </button>
              ))}
            </>
          )}
        </div>

        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 text-center">
          {t.drag} 1 {lang === 'vn' ? 'ô' : 'square'} = {step} N
        </p>
      </div>
    </div>
  );
}
