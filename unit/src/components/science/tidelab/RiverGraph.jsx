import { useRef } from 'react';
import { tr } from '../../../utils/lang';
import { SLOTS } from '../../../utils/tideLabData';

/* ------------------------------------------------------------------ *
 * Tide Lab: the lab's line graph (TideGraph in the classroom deck). One day:
 * the four times along the bottom. Several days: a band per day, four dots
 * left to right, joined within a day and never across a night, a gap at the
 * weekend. The scale starts at 0 cm, like the pole: a line every 10 cm, a
 * number every 20.
 *   mode 'show'  the readings, dots joined
 *   mode 'plot'  one day: tap a time's column to put its cross (snaps to 5 cm)
 *   mode 'pick'  tap one dot on each boxed day
 * ------------------------------------------------------------------ */
const INK = '#2b2b2b';
const KEY = '#c25e12';
const BLUE = '#1a5fa8';
const MUTED = '#5b6770';
const GREEN = '#3e7500';
const RED = '#c8102e';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const FRAC = [0.16, 0.39, 0.61, 0.84];
const Y_BOT = 320;

/** The Moon as the calendar shows it: new (dark), half, full. */
export function MoonIcon({ x, y, r, phase }) {
  if (phase === 'full') return <circle cx={x} cy={y} r={r} fill="#eef0e4" stroke={INK} strokeWidth="2" />;
  if (phase === 'new') return <circle cx={x} cy={y} r={r} fill="#4b5563" stroke={INK} strokeWidth="2" />;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#4b5563" />
      <path d={`M ${x} ${y - r} A ${r} ${r} 0 0 1 ${x} ${y + r} Z`} fill="#eef0e4" />
      <circle cx={x} cy={y} r={r} fill="none" stroke={INK} strokeWidth="2" />
    </g>
  );
}

export default function RiverGraph({
  days, top, lang, mode = 'show', gapAfter = null, weekLabels = null, showMoons = false,
  crosses = [], selected = null, onPlace, plotMarks = null,
  picks = {}, pickable = [], onPick, pickMarks = null,
}) {
  const svgRef = useRef(null);
  const pick = (en, fr) => tr(lang, en, null, fr);
  const one = days.length === 1;
  // a fortnight keeps a row above the graph for the Moon on the calendar
  const Y_TOP = weekLabels ? 84 : 50;
  const band = one ? 520 : days.length > 5 ? 64 : 100;
  const gap = gapAfter != null ? 24 : 0;
  const x0 = 80;
  const width = x0 + band * days.length + gap + 20;
  const height = weekLabels ? 404 : 372;
  const bandX = (d) => x0 + d * band + (gapAfter != null && d > gapAfter ? gap : 0);
  const slotX = (d, s) => bandX(d) + FRAC[s] * band;
  const y = (v) => Y_BOT - (v / top) * (Y_BOT - Y_TOP);
  const grid = [];
  for (let v = 0; v <= top; v += 10) grid.push(v);

  const place = (e, s) => {
    const svg = svgRef.current;
    if (!svg || !onPlace) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    const v = Math.round((((Y_BOT - p.y) / (Y_BOT - Y_TOP)) * top) / 5) * 5;
    onPlace(s, Math.min(top, Math.max(0, v)));
  };
  const markColor = (ok) => (ok == null ? null : ok ? GREEN : RED);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[19rem] select-none" style={{ fontFamily: FONT, touchAction: 'manipulation' }}>
      <rect x="0" y="0" width={width} height={height} rx="14" fill="#ffffff" />
      {/* the scale */}
      {grid.map((v) => (
        <g key={v}>
          <line x1={x0} y1={y(v)} x2={width - 20} y2={y(v)} stroke={v === 0 ? INK : v % 20 === 0 ? '#dfe5ea' : '#f0f3f6'} strokeWidth={v === 0 ? 2.5 : 1.5} />
          {v % 20 === 0 && <text x={x0 - 10} y={y(v) + 6} fontSize="17" fill={MUTED} textAnchor="end">{v}</text>}
        </g>
      ))}
      <line x1={x0} y1={Y_BOT} x2={x0} y2={Y_TOP - 8} stroke={INK} strokeWidth="2.5" />
      <text x="14" y="30" fontSize="17" fontWeight="700" fill={MUTED}>{pick('water level (cm)', 'niveau de l’eau (cm)')}</text>

      {days.map((d, di) => {
        const boxed = mode === 'pick' && pickable.includes(di);
        const mk = pickMarks?.find((p) => p.d === di);
        return (
          <g key={di}>
            {!one && <line x1={bandX(di)} y1={Y_BOT} x2={bandX(di)} y2={Y_TOP - 8} stroke="#eef1f4" strokeWidth="1.5" />}
            {boxed && (
              <rect x={bandX(di) + 3} y={Y_TOP - 14} width={band - 6} height={Y_BOT - Y_TOP + 20} rx="10" fill="#fff8e6"
                stroke={markColor(mk?.ok) || '#f59e0b'} strokeWidth="3" />
            )}
            {showMoons && d.moon && <MoonIcon x={bandX(di) + band / 2} y={Y_TOP - 34} r={17} phase={d.moon} />}
            {one
              ? SLOTS.map((s, si) => (
                <text key={si} x={slotX(0, si)} y={Y_BOT + 30} fontSize="19" fontWeight="800" fill={selected === si ? KEY : INK} textAnchor="middle">{pick(s.en, s.fr)}</text>
              ))
              : <text x={bandX(di) + band / 2} y={Y_BOT + 28} fontSize={days.length > 5 ? 15 : 18} fontWeight="800" fill={INK} textAnchor="middle">{pick(d.label.en, d.label.fr)}</text>}
            {/* the readings, joined within the day */}
            {mode !== 'plot' && d.readings.slice(1).map((v, k) => (
              <line key={k} x1={slotX(di, k)} y1={y(d.readings[k])} x2={slotX(di, k + 1)} y2={y(v)} stroke={BLUE} strokeWidth={one ? 4 : 3} strokeLinecap="round" />
            ))}
            {mode !== 'plot' && d.readings.map((v, s) => {
              const chosen = picks[di] === s;
              return (
                <g key={s}>
                  {chosen && <circle cx={slotX(di, s)} cy={y(v)} r={one ? 14 : 11} fill="none" stroke={markColor(mk?.ok) || KEY} strokeWidth="3.5" />}
                  <circle cx={slotX(di, s)} cy={y(v)} r={one ? 7.5 : 6} fill={KEY} stroke="#ffffff" strokeWidth="2" />
                  {boxed && (
                    <circle cx={slotX(di, s)} cy={y(v)} r="16" fill="transparent" className="cursor-pointer"
                      role="button" aria-label={`${pick(d.label.en, d.label.fr)} ${pick(SLOTS[s].en, SLOTS[s].fr)}`}
                      onClick={() => onPick?.(di, s)} />
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {weekLabels && weekLabels.map((w, i) => {
        const from = i === 0 ? 0 : (gapAfter ?? 4) + 1;
        const to = i === 0 ? (gapAfter ?? 4) : days.length - 1;
        return (
          <text key={i} x={(bandX(from) + bandX(to) + band) / 2} y={Y_BOT + 62} fontSize="18" fontWeight="900" fill={MUTED} textAnchor="middle">{w}</text>
        );
      })}

      {/* plotting: a column per time; the crosses */}
      {mode === 'plot' && SLOTS.map((s, si) => {
        const v = crosses[si];
        const mk = plotMarks?.find((p) => p.i === si);
        const c = markColor(mk?.ok) || INK;
        const cx = slotX(0, si);
        return (
          <g key={si}>
            <rect x={cx - band / 8} y={Y_TOP - 10} width={band / 4} height={Y_BOT - Y_TOP + 16} rx="8"
              fill={selected === si ? 'rgba(245,158,11,0.16)' : 'transparent'} stroke={selected === si ? '#f59e0b' : 'none'} strokeWidth="2"
              className="cursor-crosshair" onClick={(e) => place(e, si)} />
            {v != null && (
              <path d={`M ${cx - 11} ${y(v) - 11} L ${cx + 11} ${y(v) + 11} M ${cx + 11} ${y(v) - 11} L ${cx - 11} ${y(v) + 11}`}
                stroke={c} strokeWidth="4.5" strokeLinecap="round" pointerEvents="none" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
