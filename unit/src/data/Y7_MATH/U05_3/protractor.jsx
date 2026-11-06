// src/data/Y7_MATH/U05_3/protractor.jsx
// The drawn protractor (ported from the classroom deck content/y7-math/U05_3/
// protractor.jsx) and the board Zero on the Line draws on: the task screen
// (src/tasks/ZeroLine.jsx) and the deck activity (components/notes/
// ZeroLineActivity.jsx) both use it. Kept in the unit folder on purpose: the
// integrator decides whether it becomes shared.
//
// The board never asks for dexterity. The protractor is placed for the student
// (centre on the vertex, baseline on the line). The live inputs are taps:
// a 0 (`onZero`), a point on the scale (`onMark`, snapped to 1°, dragging
// allowed) and a point on AB (`onPlace`, snapped to 1 mm). Everything is one
// SVG on a white plate, sized by its viewBox, so it scales from 375 px to a
// laptop; `zoom` crops it round the place that matters.
import { useRef } from 'react';
import { at, f1, sector } from './lines.js';
import { S, dirOf, norm, markDir, drawnAngle } from '../../../utils/zeroLine.js';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', BLUE = '#1a5fa8', GREEN = '#3d731c', RED = '#c8102e';
const BODY = '#e6f1fa', EDGE = '#5f87ab';
const ORANGE_T = '#fdf1e3', GREEN_T = '#eef6e6', RED_T = '#fde8ea';

/** A protractor, straight edge level, centre at (cx, cy). `ring` circles the 0 of one scale:
 *  'right' (the outer scale's) or 'left' (the inner scale's). */
export function Protractor({ cx, cy, r, ring = null, numbers = true, ringTone = KEY, fontScale = 1 }) {
  const P = [cx, cy];
  const ticks = [];
  for (let d = 0; d <= 180; d++) {
    const len = d % 10 === 0 ? r * 0.1 : d % 5 === 0 ? r * 0.065 : r * 0.035;
    const [x1, y1] = at(P, r, d);
    const [x2, y2] = at(P, r - len, d);
    ticks.push(<line key={d} x1={f1(x1)} y1={f1(y1)} x2={f1(x2)} y2={f1(y2)} stroke={EDGE} strokeWidth={d % 10 === 0 ? r * 0.0067 : r * 0.004} />);
  }
  const outer = r * 0.86;
  const inner = r * 0.72;
  const fsOuter = r * 0.075 * fontScale;
  const fsInner = r * 0.062 * fontScale;
  const [i0x, i0y] = at(P, inner, 176);
  const [o0x, o0y] = at(P, outer, 4);
  return (
    <g>
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`} fill={BODY} fillOpacity="0.88" stroke={EDGE} strokeWidth={r * 0.009} />
      <path d={`M ${cx - r * 0.55} ${cy} A ${r * 0.55} ${r * 0.55} 0 0 1 ${cx + r * 0.55} ${cy}`} fill="none" stroke={EDGE} strokeWidth={r * 0.0045} opacity="0.6" />
      {ticks}
      <line x1={cx} y1={cy} x2={cx} y2={cy - r * 0.18} stroke={EDGE} strokeWidth={r * 0.006} />
      <line x1={cx - r * 0.06} y1={cy} x2={cx + r * 0.06} y2={cy} stroke={INK} strokeWidth={r * 0.009} />
      {numbers && [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180].map((d) => {
        const [ox, oy] = at(P, outer, d);
        const [ix, iy] = at(P, inner, d);
        return (
          <g key={d}>
            <text x={f1(ox)} y={f1(oy + fsOuter * 0.36)} fontFamily={FONT} fontSize={f1(fsOuter)} fontWeight="800" fill="#24486b" textAnchor="middle">{d}</text>
            <text x={f1(ix)} y={f1(iy + fsInner * 0.36)} fontFamily={FONT} fontSize={f1(fsInner)} fontWeight="600" fill="#5f87ab" textAnchor="middle">{180 - d}</text>
          </g>
        );
      })}
      {ring === 'right' && <circle cx={f1(o0x)} cy={f1(o0y)} r={f1(fsOuter * 0.95)} fill="none" stroke={ringTone} strokeWidth={r * 0.013} />}
      {ring === 'left' && <circle cx={f1(i0x)} cy={f1(i0y)} r={f1(fsInner * 1.05)} fill="none" stroke={ringTone} strokeWidth={r * 0.013} />}
    </g>
  );
}

/** The two 0s of a protractor turned to `rot` at c, in board coordinates. */
const zeroSpots = (c, r, rot) => ({ right: at(c, r * 0.86, rot + 4), left: at(c, r * 0.72, rot + 176) });

/** Where a length label sits: off the middle of its side, away from the figure, and far
 *  enough out to clear the line by half its width when the side is steep. */
function lensPos(l, fig) {
  const mid = [(l.a[0] + l.b[0]) / 2, (l.a[1] + l.b[1]) / 2];
  const d = dirOf(l.a, l.b);
  const c = fig.centre || [mid[0], mid[1] - 100];
  const side = norm(dirOf(mid, c) - d) < 180 ? d - 90 : d + 90;
  const half = (l.text.length * 13 * 0.58) / 2;
  return { p: at(mid, 10 + half * Math.abs(Math.cos((side * Math.PI) / 180)), side), half };
}

function bboxOf(points, pad) {
  const xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
  const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad;
  return [x0, y0, Math.max(...xs) + pad - x0, Math.max(...ys) + pad - y0];
}

function Ruler({ from, cm: n }) {
  const marks = [];
  for (let mm = 0; mm <= n * 10; mm++) {
    const x = from[0] + (mm * S) / 10;
    const len = mm % 10 === 0 ? 12 : mm % 5 === 0 ? 8 : 5;
    marks.push(<line key={mm} x1={f1(x)} y1={from[1] + 6} x2={f1(x)} y2={from[1] + 6 + len} stroke="#8a6d12" strokeWidth={mm % 10 === 0 ? 1.4 : 0.8} />);
  }
  return (
    <g>
      <rect x={from[0] - 10} y={from[1] + 5} width={n * S + 20} height="32" rx="4" fill="#fbe7a1" fillOpacity="0.92" stroke="#c9a227" strokeWidth="1.5" />
      {marks}
      {Array.from({ length: n + 1 }, (_, k) => (
        <text key={k} x={f1(from[0] + k * S)} y={from[1] + 32} fontFamily={FONT} fontSize="9.5" fontWeight="700" fill="#6b5410" textAnchor="middle">{k}</text>
      ))}
    </g>
  );
}

/**
 * The board. `model` comes from zeroLineModel; the rest is the screen's state:
 *   ring        the 0 the student chose ('right' | 'left'), ringed
 *   onZero      set while the Zero stage is live: both 0s become tap targets
 *   mark        an outer reading (0–180) the student has pointed at, or null
 *   onMark      set while the Mark stage is live
 *   drawn       { mark, ok } once a mark is checked: the arm (or line) is drawn
 *   place       cm along AB (the perpendicular), onPlace while it is live
 *   foot        the perpendicular is drawn (CD and the right angle at D)
 *   ruler       the ruler lies along AB, its 0 at A
 *   finished    a sketch's shape is completed (BC and DC)
 *   reveal      show the answer: the angle's size beside its arc
 *   zoom        crop round the place that matters
 */
export function ZeroLineBoard({
  model, ring = null, onZero = null, mark = null, onMark = null, drawn = null,
  place = null, onPlace = null, foot = false, ruler = false, finished = false, reveal = null, zoom = false, className = '',
}) {
  const svgRef = useRef(null);
  const dragging = useRef(false);
  const fig = model.fig;
  const prot = model.prot;
  const isPerp = model.kind === 'perp';
  const pc = isPerp ? [(place ?? model.mid) * S, 0] : prot.c;

  // the extent: the figure, the protractor, the ruler
  const pts = [];
  for (const s of fig.segs) pts.push(s.a, s.b);
  for (const p of fig.pts) pts.push(p.p, at(p.p, 30, p.away));
  if (isPerp) { pts.push([-prot.r * 0.6, 0], [model.AB * S + prot.r * 0.6, 0], [0, 50], [model.C[0], model.C[1] - 24]); }
  else for (let d = 0; d <= 180; d += 15) pts.push(at(prot.c, prot.r, prot.rot + d));
  if (model.kind === 'sketch') pts.push(model.P.C);
  const lensAt = fig.lens.map((l) => lensPos(l, fig));
  for (const { p, half } of lensAt) pts.push([p[0] - half, p[1]], [p[0] + half, p[1]]);
  // a plain angle hugs its protractor (it grows to the card on a phone); a figure keeps room for its labels
  const full = bboxOf(pts, ['read', 'reflex', 'draw'].includes(model.kind) ? 12 : 26);
  const focus = isPerp ? [pc[0], -model.height * S * 0.5] : (onMark && mark != null ? at(prot.c, prot.r, markDir(model.draw, mark)) : model.focus);
  const zw = prot.r * 1.05, zh = zw * 0.72;
  const vb = zoom ? [focus[0] - zw / 2, focus[1] - zh / 2, zw, zh] : full;

  const toBoard = (e) => {
    const svg = svgRef.current;
    if (!svg?.getScreenCTM) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return [p.x, p.y];
  };
  const pointAt = (e) => {
    const p = toBoard(e);
    if (!p) return;
    if (onMark) {
      let o = norm(dirOf(prot.c, p) - prot.rot);
      if (o > 180) o = o > 270 ? 0 : 180;
      onMark(Math.round(o));
    } else if (onPlace) {
      const x = Math.max(0, Math.min(model.AB, Math.round((p[0] / S) * 10) / 10));
      onPlace(x);
    }
  };
  const live = !!(onMark || onPlace);
  const handlers = live ? {
    onPointerDown: (e) => { dragging.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); pointAt(e); },
    onPointerMove: (e) => { if (dragging.current) pointAt(e); },
    onPointerUp: () => { dragging.current = false; },
    onPointerCancel: () => { dragging.current = false; },
  } : {};

  const g = model.draw;
  const showMark = mark != null && g;
  const markEnd = showMark ? at(prot.c, prot.r * 1.04, markDir(g, mark)) : null;
  const drawnDir = drawn && g ? markDir(g, drawn.mark) : null;
  const lw = Math.max(2.4, prot.r * 0.02);

  return (
    <svg ref={svgRef} viewBox={vb.map((v) => f1(v)).join(' ')} preserveAspectRatio="xMidYMid meet"
      className={`w-full h-full select-none ${live ? 'cursor-crosshair touch-none' : ''} ${className}`} {...handlers}>
      <rect x={f1(full[0] - 400)} y={f1(full[1] - 400)} width={f1(full[2] + 800)} height={f1(full[3] + 800)} fill="#ffffff" />

      {/* the protractor, placed for the student — under the figure, so the arms cross its scale */}
      {!(isPerp && (foot || ruler)) && (
        <g transform={`translate(${f1(pc[0])} ${f1(pc[1])}) rotate(${f1(-prot.rot)})`} opacity={finished ? 0.35 : 1}>
          <Protractor cx={0} cy={0} r={prot.r} ring={ring} fontScale={1.15} />
          {isPerp && <line x1="0" y1="0" x2="0" y2={f1(-model.height * S - 26)} stroke={KEY} strokeWidth="1.8" strokeDasharray="6 5" />}
        </g>
      )}

      {/* the figure */}
      {fig.arcs.map((a, i) => (
        <path key={`a${i}`} d={sector(a.c, a.r, a.from, a.to)} fill={a.tone === 'given' ? ORANGE_T : '#eef2f6'} stroke={a.tone === 'given' ? KEY : MUTED} strokeWidth="1.6" />
      ))}
      {fig.segs.map((s, i) => (
        <line key={`s${i}`} x1={f1(s.a[0])} y1={f1(s.a[1])} x2={f1(s.b[0])} y2={f1(s.b[1])} stroke={s.tone === 'muted' ? MUTED : INK} strokeWidth={s.tone === 'muted' ? lw * 0.8 : lw} strokeLinecap="round" />
      ))}
      {finished && model.kind === 'sketch' && (
        <g>
          <line x1={f1(model.P.B[0])} y1={f1(model.P.B[1])} x2={f1(model.P.C[0])} y2={f1(model.P.C[1])} stroke={INK} strokeWidth={lw} strokeLinecap="round" />
          <line x1={f1(model.P.D[0])} y1={f1(model.P.D[1])} x2={f1(model.P.C[0])} y2={f1(model.P.C[1])} stroke={INK} strokeWidth={lw} strokeLinecap="round" strokeDasharray="7 6" />
        </g>
      )}

      {/* the perpendicular: its foot, and the ruler */}
      {isPerp && foot && (
        <g>
          <line x1={f1(model.C[0])} y1={f1(model.C[1])} x2={f1(model.foot * S)} y2="0" stroke={BLUE} strokeWidth={lw} strokeLinecap="round" />
          <path d={`M ${f1(model.foot * S + 11)} 0 L ${f1(model.foot * S + 11)} -11 L ${f1(model.foot * S)} -11`} fill="none" stroke={BLUE} strokeWidth="1.6" />
          <circle cx={f1(model.foot * S)} cy="0" r="3.4" fill={BLUE} />
          <text x={f1(model.foot * S - 12)} y="-7" fontFamily={FONT} fontSize="15" fontWeight="900" fill={BLUE} textAnchor="middle">D</text>
        </g>
      )}
      {isPerp && ruler && <Ruler from={[0, 0]} cm={Math.ceil(model.AB)} />}

      {onZero && ['right', 'left'].map((side) => {
        const p = zeroSpots(prot.c, prot.r, prot.rot)[side];
        return (
          <g key={side} role="button" aria-label={side === 'right' ? 'the 0 on the right' : 'the 0 on the left'} style={{ cursor: 'pointer' }} onClick={() => onZero(side)}>
            <circle cx={f1(p[0])} cy={f1(p[1])} r={f1(prot.r * 0.12)} fill={KEY} fillOpacity="0.12" stroke={KEY} strokeWidth="1.4" strokeDasharray="4 3" />
          </g>
        );
      })}

      {/* the mark, and the arm it draws */}
      {showMark && !drawn && (
        <g pointerEvents="none">
          <line x1={f1(prot.c[0])} y1={f1(prot.c[1])} x2={f1(markEnd[0])} y2={f1(markEnd[1])} stroke={KEY} strokeWidth="1.4" strokeDasharray="5 5" />
          <circle cx={f1(markEnd[0])} cy={f1(markEnd[1])} r={f1(prot.r * 0.035)} fill={KEY} stroke="#ffffff" strokeWidth="1.5" />
        </g>
      )}
      {drawn && g && (
        <g pointerEvents="none">
          {model.kind === 'parallel' ? (
            <line {...lineThrough(prot.c, drawnDir, 900)} stroke={drawn.ok ? GREEN : RED} strokeWidth={lw} strokeLinecap="round" />
          ) : (
            <line x1={f1(prot.c[0])} y1={f1(prot.c[1])} x2={f1(at(prot.c, model.arm, drawnDir)[0])} y2={f1(at(prot.c, model.arm, drawnDir)[1])} stroke={drawn.ok ? GREEN : RED} strokeWidth={lw} strokeLinecap="round" />
          )}
          <path d={sector(prot.c, 30, g.sense === 'acw' ? g.line : drawnDir, g.sense === 'acw' ? drawnDir : g.line)} fill={drawn.ok ? GREEN_T : RED_T} stroke={drawn.ok ? GREEN : RED} strokeWidth="1.6" />
          <text {...labelAt(prot.c, 48, g, drawnDir)} fontFamily={FONT} fontSize="15" fontWeight="900" fill={drawn.ok ? GREEN : RED} textAnchor="middle">{Math.round(drawnAngle(g, drawn.mark))}°</text>
        </g>
      )}

      {/* lengths, given angles, corner names (drawn last, on top) */}
      {fig.arcs.filter((a) => a.label).map((a, i) => {
        const p = at(a.c, a.r + 15, (a.from + a.to) / 2);
        return <text key={`l${i}`} x={f1(p[0])} y={f1(p[1] + 5)} fontFamily={FONT} fontSize="14" fontWeight="900" fill={KEY} textAnchor="middle">{a.label}</text>;
      })}
      {!ruler && fig.lens.map((l, i) => {
        const { p } = lensAt[i];
        return <text key={`n${i}`} x={f1(p[0])} y={f1(p[1] + 5)} fontFamily={FONT} fontSize="13" fontWeight="800" fill={BLUE} textAnchor="middle">{l.text}</text>;
      })}
      {fig.pts.filter((p) => p.name).map((p, i) => {
        const q = at(p.p, 17, p.away);
        return (
          <g key={`p${i}`}>
            <circle cx={f1(p.p[0])} cy={f1(p.p[1])} r="3.2" fill={INK} />
            <text x={f1(q[0])} y={f1(q[1] + 6)} fontFamily={FONT} fontSize="17" fontWeight="900" fill={INK} textAnchor="middle">{p.name}</text>
          </g>
        );
      })}
      {model.kind === 'sketch' && finished && (() => {
        const q = at(model.P.C, 17, dirOf(model.fig.centre, model.P.C));
        return <text x={f1(q[0])} y={f1(q[1] + 6)} fontFamily={FONT} fontSize="17" fontWeight="900" fill={INK} textAnchor="middle">C</text>;
      })()}
      {reveal && model.read && (() => {
        const p = at(model.read.V, model.prot.r * 0.4, (model.read.sense === 'acw' ? model.read.base + model.read.x / 2 : model.read.other + model.read.x / 2));
        return <text x={f1(p[0])} y={f1(p[1] + 6)} fontFamily={FONT} fontSize="18" fontWeight="900" fill={GREEN} textAnchor="middle">{reveal}</text>;
      })()}
    </svg>
  );
}

/** The paper level's picture: a sketch, deliberately NOT to scale (like the Workbook's), so
 *  nothing can be measured off the screen. `model` is a paper model from zeroLineModel. */
export function PaperSketch({ model, lang = 'en' }) {
  const word = lang === 'fr' ? 'croquis — pas à l’échelle' : 'sketch — not to scale';
  const T = (x, y, s, fill = INK, size = 18, anchor = 'middle') => <text x={x} y={y} fontFamily={FONT} fontSize={size} fontWeight="900" fill={fill} textAnchor={anchor}>{s}</text>;
  if (model.shape === 'square') {
    return (
      <svg viewBox="0 0 360 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <rect x="0" y="0" width="360" height="300" rx="14" fill="#ffffff" />
        <path d="M 90 250 L 270 250 L 270 70 L 90 70 Z" fill="none" stroke={MUTED} strokeWidth="3" strokeLinejoin="round" />
        <line x1="90" y1="250" x2="270" y2="70" stroke={KEY} strokeWidth="2.5" strokeDasharray="8 6" />
        <line x1="270" y1="250" x2="90" y2="70" stroke={KEY} strokeWidth="2.5" strokeDasharray="8 6" />
        <path d="M 104 250 L 104 236 L 90 236" fill="none" stroke={MUTED} strokeWidth="2" />
        <path d="M 256 250 L 256 236 L 270 236" fill="none" stroke={MUTED} strokeWidth="2" />
        {T(76, 270, 'A')}{T(284, 270, 'B')}{T(284, 64, 'C')}{T(76, 64, 'D')}
        {T(180, 276, `${model.side} cm`, BLUE, 16)}
        {T(208, 128, '?', KEY, 20)}{T(152, 128, '?', KEY, 20)}
        {T(180, 26, word, MUTED, 13)}
      </svg>
    );
  }
  const q = model.q;
  return (
    <svg viewBox="0 0 360 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="360" height="300" rx="14" fill="#ffffff" />
      <path d={sector([70, 240], 30, 0, 66)} fill={ORANGE_T} stroke={KEY} strokeWidth="1.8" />
      <path d={sector([280, 240], 30, 78, 180)} fill={ORANGE_T} stroke={KEY} strokeWidth="1.8" />
      <path d="M 70 240 L 280 240 L 300 80 L 115 110 Z" fill="none" stroke={MUTED} strokeWidth="3" strokeLinejoin="round" />
      {T(56, 262, 'A')}{T(294, 262, 'B')}{T(314, 76, 'C')}{T(102, 104, 'D')}
      {T(124, 228, `${q.A}°`, KEY, 14)}{T(236, 228, `${q.B}°`, KEY, 14)}
      {T(175, 262, `${q.AB} cm`, BLUE, 14)}
      {T(80, 170, `${q.AD} cm`, BLUE, 14, 'end')}
      {T(300, 168, `${q.BC} cm`, BLUE, 14, 'start')}
      {T(278, 104, '?', '#3d731c', 18)}{T(134, 132, '?', '#3d731c', 18)}
      {T(180, 26, word, MUTED, 13)}
    </svg>
  );
}

function lineThrough(P, d, r) {
  const [x1, y1] = at(P, r, d + 180);
  const [x2, y2] = at(P, r, d);
  return { x1: f1(x1), y1: f1(y1), x2: f1(x2), y2: f1(y2) };
}

function labelAt(c, r, g, d) {
  const mid = g.sense === 'acw' ? g.line + norm(d - g.line) / 2 : d + norm(g.line - d) / 2;
  const p = at(c, r, mid);
  return { x: f1(p[0]), y: f1(p[1] + 5) };
}
