/* ------------------------------------------------------------------ *
 * Tide Lab: the bamboo pole in the river, drawn from a round. Marked every
 * 10 cm, numbered every 20 cm (the lab's pole, POLE_READ in the deck). With
 * waves, the water touches the pole at the top of a wave, and two dashed lines
 * mark the top and the bottom of the waves: the reading is the middle.
 * ------------------------------------------------------------------ */
const INK = '#2b2b2b';
const SEA = '#cfe6f5';
const SEA_EDGE = '#5b9bd5';
const MUD = '#d9c7a3';
const BAMBOO = '#dcb862';
const NODE = '#a07d2e';
const MUTED = '#5b6770';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const W = 400;
const H = 440;
const X = 236; // the pole's middle
const PW = 30; // its width
const BED = 400; // the river bed (the pole's lo mark)
const K = 2.5; // px per cm

export default function Pole({ pole, title }) {
  const { level, waves, lo, hi } = pole;
  const y = (v) => BED - (v - lo) * K;
  const marks = [];
  for (let v = lo; v <= hi; v += 10) marks.push(v);
  const surface = (() => {
    if (!waves) return null;
    const pts = [];
    for (let x = 30; x <= W - 30; x += 6) pts.push(`${x},${(y(level) - waves * K * Math.cos((2 * Math.PI * (x - X)) / 120)).toFixed(1)}`);
    return pts;
  })();
  const waterTop = waves ? y(level + waves) : y(level);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" role="img" aria-label={title}>
      <rect x="0" y="0" width={W} height={H} rx="14" fill="#ffffff" />
      {/* the river */}
      {surface
        ? <path d={`M 30 ${BED} L ${surface.join(' L ')} L ${W - 30} ${BED} Z`} fill={SEA} />
        : <rect x="30" y={y(level)} width={W - 60} height={BED - y(level)} fill={SEA} />}
      <rect x="30" y={BED} width={W - 60} height={H - BED - 10} rx="6" fill={MUD} />
      {/* the pole */}
      <rect x={X - PW / 2} y={y(hi) - 18} width={PW} height={H - 14 - (y(hi) - 18)} rx="10" fill={BAMBOO} stroke={INK} strokeWidth="2.5" />
      {[0.33, 0.7].map((f) => {
        const yy = y(hi) + f * (BED - y(hi)) + 5;
        return <line key={f} x1={X - PW / 2} y1={yy} x2={X + PW / 2} y2={yy} stroke={NODE} strokeWidth="3" />;
      })}
      <rect x={X - PW / 2} y={waterTop} width={PW} height={BED - waterTop} fill={SEA} opacity="0.55" />
      {marks.map((v) => {
        const long = v % 20 === 0;
        return <line key={v} x1={X - PW / 2} y1={y(v)} x2={long ? X + PW / 2 : X} y2={y(v)} stroke={INK} strokeWidth={long ? 3 : 2.5} />;
      })}
      {marks.filter((v) => v % 20 === 0).map((v) => (
        <text key={v} x={X - PW / 2 - 10} y={y(v) + 7} fontFamily={FONT} fontSize="21" fontWeight="700" fill={INK} textAnchor="end">{v}</text>
      ))}
      <text x={X - PW / 2 - 10} y={y(hi) - 26} fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="end">cm</text>
      {/* the surface */}
      {surface
        ? (
          <g>
            <polyline points={surface.join(' ')} fill="none" stroke={SEA_EDGE} strokeWidth="4" />
            {[level + waves, level - waves].map((v) => (
              <line key={v} x1="30" y1={y(v)} x2={W - 30} y2={y(v)} stroke={MUTED} strokeWidth="2.5" strokeDasharray="9 7" />
            ))}
          </g>
        )
        : <line x1="30" y1={y(level)} x2={W - 30} y2={y(level)} stroke={SEA_EDGE} strokeWidth="4" />}
    </svg>
  );
}
