import { useId, useRef } from 'react';
import { VENN_GEOMETRY, regionKeys, regionAt, vennLayout } from '../../utils/sets';

/**
 * A two- or three-set Venn diagram drawn the way an IGCSE paper draws it — a
 * rectangle for ℰ, a circle per set, italic letters — that can SHADE any
 * combination of regions and be TAPPED region by region. Shared by the Venn
 * task (src/tasks/VennTask.jsx), the `venn` notes activity and the unit's
 * set-notation widget, so the picture a student learns on is the picture they
 * are tested on.
 *
 * Shading uses one clip per circle the region is inside and one mask cutting
 * out every circle it is outside, so a crescent or the outside band shades
 * exactly, with no approximated paths. Taps are resolved by point-in-circle
 * tests on the tapped point (utils/sets.js `regionAt`), not by hit-testing the
 * shapes, so overlapping outlines never swallow a tap.
 *
 * Props
 *   sets       ['A', 'B'] or ['A', 'B', 'C']
 *   labels     { A: 'F' } — the letter printed for a set (defaults to the letter)
 *   counts     { '10': 12, … } numbers printed in the regions
 *   elements   { '10': [3, 9], … } elements printed in the regions
 *   shaded     region keys to shade
 *   tone       'pick' (the student's shading) | 'good' | 'bad' | 'show'
 *   onRegion   (key) => void — makes the regions tappable
 *   overlay    (key, { left, top }) => ReactNode — HTML over each region's
 *              label point (the fill-in boxes); `left`/`top` are percentages
 *   elementTone (x) => 'good' | 'bad' | null — colours one element
 *   hideCounts hide the printed counts (the fill stage writes its own)
 */

const INK = '#1e293b';
const MATH = "'Cambria Math', 'Times New Roman', Georgia, serif";
const SANS = "Inter, 'Segoe UI', system-ui, sans-serif";

const TONES = {
  pick: { fill: '#1cb0f6', opacity: 0.32 },
  good: { fill: '#58cc02', opacity: 0.34 },
  bad: { fill: '#ff4b4b', opacity: 0.3 },
  show: { fill: '#f59e0b', opacity: 0.34 },
};

export default function VennFigure({
  sets = ['A', 'B'], labels = {}, counts = null, elements = null, shaded = [], tone = 'pick',
  onRegion, overlay, elementTone, hideCounts = false, className = '', style,
}) {
  const n = sets.length;
  const g = VENN_GEOMETRY[n];
  const layout = vennLayout(n);
  const uid = `venn${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const svgRef = useRef(null);
  const t = TONES[tone] || TONES.pick;
  const { rect } = g;

  const tap = (e) => {
    if (!onRegion || !svgRef.current) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = pt.matrixTransform(ctm.inverse());
    const key = regionAt(n, p.x, p.y);
    if (key) onRegion(key);
  };

  const shadeRegion = (key) => {
    const inside = [...key].map((c, i) => (c === '1' ? i : -1)).filter((i) => i >= 0);
    let node = (
      <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill={t.fill} fillOpacity={t.opacity} mask={`url(#${uid}-m${key})`} />
    );
    for (const i of inside) node = <g clipPath={`url(#${uid}-c${i})`}>{node}</g>;
    return <g key={key}>{node}</g>;
  };

  return (
    <div className={`relative w-full select-none ${className}`} style={style}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${g.w} ${g.h}`}
        className={`w-full h-auto block ${onRegion ? 'cursor-pointer' : ''}`}
        onClick={tap}
        role="img"
        aria-label={`Venn diagram of ${sets.map((s) => labels[s] || s).join(', ')}`}
      >
        <defs>
          {g.circles.map((c, i) => (
            <clipPath key={i} id={`${uid}-c${i}`}><circle cx={c.cx} cy={c.cy} r={c.r} /></clipPath>
          ))}
          {regionKeys(n).map((key) => (
            <mask key={key} id={`${uid}-m${key}`} maskUnits="userSpaceOnUse" x="0" y="0" width={g.w} height={g.h}>
              <rect x="0" y="0" width={g.w} height={g.h} fill="#fff" />
              {g.circles.map((c, i) => (key[i] === '0' ? <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#000" /> : null))}
            </mask>
          ))}
        </defs>

        <rect x="0" y="0" width={g.w} height={g.h} rx="14" fill="#ffffff" />
        {shaded.map(shadeRegion)}

        <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill="none" stroke={INK} strokeWidth="2.5" />
        {g.circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke={INK} strokeWidth="2.5" />
        ))}

        <text x={g.eAt.x} y={g.eAt.y} fontFamily={MATH} fontSize="30" fontStyle="italic" fill={INK} textAnchor="middle">ℰ</text>
        {sets.map((s, i) => (
          <text key={s} x={g.labelAt[i].x} y={g.labelAt[i].y} fontFamily={MATH} fontSize="28" fontStyle="italic" fill={INK} textAnchor="middle">
            {labels[s] || s}
          </text>
        ))}

        {counts && !hideCounts && regionKeys(n).map((key) => (
          counts[key] == null ? null : (
            <text key={key} x={layout[key].anchor.x} y={layout[key].anchor.y + 9} fontFamily={SANS} fontSize="26" fontWeight="bold" fill={INK} textAnchor="middle">
              {counts[key]}
            </text>
          )
        ))}

        {elements && regionKeys(n).map((key) => (elements[key] || []).map((x, j) => {
          const slot = layout[key].slots[j] || layout[key].anchor;
          const et = elementTone?.(x);
          const fill = et === 'bad' ? '#dc2626' : et === 'good' ? '#3e7500' : INK;
          return (
            <g key={`${key}-${x}`}>
              {et === 'bad' && <circle cx={slot.x} cy={slot.y - 6} r="13" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />}
              <text x={slot.x} y={slot.y} fontFamily={SANS} fontSize="18" fontWeight="bold" fill={fill} textAnchor="middle">{x}</text>
            </g>
          );
        }))}
      </svg>

      {overlay && regionKeys(n).map((key) => {
        const a = layout[key].anchor;
        const node = overlay(key, { left: (a.x / g.w) * 100, top: (a.y / g.h) * 100 });
        if (!node) return null;
        return (
          <div key={key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(a.x / g.w) * 100}%`, top: `${(a.y / g.h) * 100}%` }}>
            {node}
          </div>
        );
      })}
    </div>
  );
}
