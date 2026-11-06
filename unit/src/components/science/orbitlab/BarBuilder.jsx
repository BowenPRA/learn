import { useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { T } from './orbitLabText';

/* ------------------------------------------------------------------ *
 * Orbit Lab, the `graph` picture: squared paper with big squares of `per`
 * km/s and small lines of 1 km/s (millimetres on graph paper), a bar for
 * each row. Drag a bar's top, or tap a bar and use ▲ ▼. There is no number
 * on a bar while it is drawn: reading the scale is the point. After a Check
 * a wrong bar turns red and its right height shows as a dashed outline.
 * ------------------------------------------------------------------ */
const W = 560;
const X0 = 70;
const X1 = 548;
const YT = 16;
// The chart is shorter on a slide (`compact`), where it shares a side column.
const LAYOUT = { full: { H: 318, Y0: 236 }, compact: { H: 280, Y0: 198 } };
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const INK = '#2b2b2b';
const MUTED = '#5b6770';
const TEAL = '#0087a8';
const KEY = '#c25e12';
const f1 = (n) => Math.round(n * 10) / 10;

export default function BarBuilder({ m, lang = 'en', heights = {}, sel = null, onSel, onBar, marks = null, locked = false, reveal = false, compact = false, extra = null }) {
  const { H, Y0 } = compact ? LAYOUT.compact : LAYOUT.full;
  const svgRef = useRef(null);
  const drag = useRef(null);
  const n = m.rows.length;
  const slot = (X1 - X0) / n;
  const bw = Math.min(56, slot * 0.58);
  const py = (Y0 - YT) / m.max;
  const yOf = (v) => Y0 - v * py;
  const t = T[lang] || T.en;
  const small = n >= 7;

  const valueAt = (e) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return Math.max(0, Math.min(m.max, Math.round((Y0 - p.y) / py)));
  };
  const down = (r) => (e) => {
    if (locked || r.given) return;
    e.preventDefault();
    onSel?.(r.id);
    drag.current = r.id;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const v = valueAt(e);
    if (v != null) onBar?.(r.id, v);
  };
  const move = (e) => {
    if (!drag.current) return;
    const v = valueAt(e);
    if (v != null) onBar?.(drag.current, v);
  };
  const up = () => { drag.current = null; };

  const lines = [];
  for (let v = 0; v <= m.max; v++) {
    const big = v % m.per === 0;
    if (!big && m.per === 1) continue;
    lines.push(<line key={`g${v}`} x1={X0} y1={f1(yOf(v))} x2={X1} y2={f1(yOf(v))} stroke={big ? '#cfd8dc' : '#eef2f5'} strokeWidth={big ? 1.4 : 0.9} />);
    if (big) lines.push(<text key={`l${v}`} x={X0 - 8} y={f1(yOf(v) + 4.5)} fontFamily={FONT} fontSize="13" fill={MUTED} textAnchor="end">{v}</text>);
  }
  const selRow = m.rows.find((r) => r.id === sel);

  return (
    <div className="w-full">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <rect x="0" y="0" width={W} height={H} rx="14" fill="#ffffff" />
        <rect x="0.75" y="0.75" width={W - 1.5} height={H - 1.5} rx="13" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
        {lines}
        <text x="18" y={f1((Y0 + YT) / 2)} fontFamily={FONT} fontSize="13" fontWeight="bold" fill={INK} textAnchor="middle" transform={`rotate(-90 18 ${f1((Y0 + YT) / 2)})`}>{tr(lang, 'speed of orbit in km/s', null, 'vitesse en orbite en km/s')}</text>
        {m.rows.map((r, i) => {
          const cx = X0 + slot * (i + 0.5);
          const right = reveal || r.given;
          const h = right ? r.v : (heights[r.id] || 0);
          const mark = marks?.[r.id];
          const tone = r.given ? { fill: '#e2f2f6', stroke: TEAL }
            : reveal || mark === true ? { fill: '#d7ffb8', stroke: '#58a700' }
              : mark === false ? { fill: '#ffdfe0', stroke: '#ea2b2b' }
                : { fill: '#fdf1e3', stroke: KEY };
          const isSel = !locked && sel === r.id;
          return (
            <g key={r.id}>
              {isSel && <rect x={f1(cx - slot / 2 + 2)} y={YT - 6} width={f1(slot - 4)} height={Y0 - YT + 6} rx="8" fill="#fef3c7" fillOpacity="0.55" />}
              {h > 0 && <rect x={f1(cx - bw / 2)} y={f1(yOf(h))} width={f1(bw)} height={f1(h * py)} fill={tone.fill} stroke={tone.stroke} strokeWidth={isSel ? 3.5 : 2.5} />}
              {mark === false && !reveal && (
                <rect x={f1(cx - bw / 2 - 4)} y={f1(yOf(r.v))} width={f1(bw + 8)} height={f1(r.v * py)} fill="none" stroke="#3e7500" strokeWidth="2.5" strokeDasharray="6 5" />
              )}
              {!r.given && !locked && h === 0 && <text x={f1(cx)} y={Y0 - 8} fontFamily={FONT} fontSize="18" fill="#cbd5e1" textAnchor="middle">▲</text>}
              <text x={f1(cx)} y={Y0 + 22} fontFamily={FONT} fontSize={small ? 13 : 15} fontWeight="bold" fill={INK} textAnchor="middle">{tr(lang, r.en, null, r.fr)}</text>
              <text x={f1(cx)} y={Y0 + 42} fontFamily={FONT} fontSize={small ? 14 : 16} fontWeight="bold" fill={KEY} textAnchor="middle">{r.v}</text>
              {r.given && <text x={f1(cx)} y={Y0 + 60} fontFamily={FONT} fontSize="11" fill={MUTED} textAnchor="middle">{t.given}</text>}
              {!r.given && !locked && (
                <rect x={f1(cx - slot / 2)} y={YT - 8} width={f1(slot)} height={Y0 - YT + 12} fill="transparent" style={{ touchAction: 'none', cursor: 'ns-resize' }}
                  onPointerDown={down(r)} role="slider" aria-label={tr(lang, r.en, null, r.fr)} aria-valuenow={heights[r.id] || 0} aria-valuemin={0} aria-valuemax={m.max} />
              )}
            </g>
          );
        })}
        <line x1={X0} y1={YT - 6} x2={X0} y2={Y0} stroke={INK} strokeWidth="2.5" />
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={INK} strokeWidth="2.5" />
        <text x={X0 - 8} y={Y0 + 42} fontFamily={FONT} fontSize="12" fontWeight="bold" fill={KEY} textAnchor="end">km/s</text>
      </svg>
      {!locked && selRow && (
        <div className={`mt-2 flex items-center gap-2 ${extra ? 'justify-between' : 'justify-center'}`}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{t.bar} {tr(lang, selRow.en, null, selRow.fr)}</span>
            <button type="button" aria-label="down" onClick={() => onBar?.(selRow.id, (heights[selRow.id] || 0) - 1)}
              className="w-11 h-11 rounded-xl border-2 border-b-4 border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-600 flex items-center justify-center active:translate-y-[2px]">
              <ChevronDown className="w-6 h-6 text-slate-700 dark:text-slate-200" strokeWidth={3} />
            </button>
            <button type="button" aria-label="up" onClick={() => onBar?.(selRow.id, (heights[selRow.id] || 0) + 1)}
              className="w-11 h-11 rounded-xl border-2 border-b-4 border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-600 flex items-center justify-center active:translate-y-[2px]">
              <ChevronUp className="w-6 h-6 text-slate-700 dark:text-slate-200" strokeWidth={3} />
            </button>
          </div>
          {extra}
        </div>
      )}
    </div>
  );
}
