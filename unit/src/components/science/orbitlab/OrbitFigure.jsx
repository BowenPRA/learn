import { ARROWS, STAGE_W, STAGE_H, arrowVec } from '../../../utils/orbitLab';
import { ORBITERS, PULL_SCENES } from '../../../utils/orbitLabData';
import { tr } from '../../../utils/lang';

/* ------------------------------------------------------------------ *
 * Orbit Lab, the `pull` picture: the orbit, the body in the middle, the
 * thing going round with arrows on its orbit for the way it moves, and the
 * eight arrows round it to tap. The pull is drawn red, the no-pull path blue
 * and dashed (the book's p. 92 colours). Flat line art on a white plate, so
 * it reads the same in light and dark mode.
 * ------------------------------------------------------------------ */
const INK = '#2b2b2b';
const RULE = '#94a3b8';
const RED = '#c8102e';
const BLUE = '#1a5fa8';
const SUN_FILL = '#fde58a';
const SUN_RIM = '#c99a06';
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const OBJ_R = 15;
const ARROW_L = 70;
const HIT_R = 24;
const f1 = (n) => Math.round(n * 10) / 10;

function Arrow({ from, k, len, color, width, dashed = false, head = 18 }) {
  const u = arrowVec(k);
  const x1 = from.x + u.x * (OBJ_R + 3);
  const y1 = from.y + u.y * (OBJ_R + 3);
  const x2 = from.x + u.x * len;
  const y2 = from.y + u.y * len;
  const hx = x2 - u.x * head;
  const hy = y2 - u.y * head;
  const px = -u.y * head * 0.55;
  const py = u.x * head * 0.55;
  return (
    <g pointerEvents="none">
      <line x1={f1(x1)} y1={f1(y1)} x2={f1(hx)} y2={f1(hy)} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? '12 8' : undefined} />
      <path d={`M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z`} fill={color} />
    </g>
  );
}

/** Small arrowheads on the orbit, pointing the way it goes round. */
function Ticks({ g, dir, at }) {
  const sign = dir === 'cw' ? -1 : 1;
  const pts = [];
  const rx = g.rx ?? g.r;
  const ry = g.ry ?? g.r;
  for (const off of [100, 200, 300]) {
    const t = ((at + sign * off) * Math.PI) / 180;
    const x = g.centre.x + rx * Math.cos(t);
    const y = g.centre.y - ry * Math.sin(t);
    // the direction of travel along the ellipse, on screen
    let dx = -rx * Math.sin(t) * sign;
    let dy = -ry * Math.cos(t) * sign;
    const n = Math.hypot(dx, dy);
    dx /= n; dy /= n;
    const s = 10;
    pts.push(`M ${f1(x + dx * s)} ${f1(y + dy * s)} L ${f1(x - dx * s * 0.6 - dy * s * 0.7)} ${f1(y - dy * s * 0.6 + dx * s * 0.7)} L ${f1(x - dx * s * 0.6 + dy * s * 0.7)} ${f1(y - dy * s * 0.6 - dx * s * 0.7)} Z`);
  }
  return <path d={pts.join(' ')} fill={RULE} />;
}

function Body({ m, g, lang }) {
  const sc = PULL_SCENES[m.scene];
  const label = tr(lang, sc.centre.en, null, sc.centre.fr);
  if (m.scene === 'moon') {
    return (
      <g>
        <circle cx={g.centre.x} cy={g.centre.y} r="30" fill="#4f8fbf" stroke={INK} strokeWidth="2.5" />
        <text x={g.centre.x} y={g.centre.y + 5} fontFamily={FONT} fontSize="15" fontWeight="bold" fill="#ffffff" textAnchor="middle">{label}</text>
      </g>
    );
  }
  if (m.scene === 'string') {
    return (
      <g>
        <circle cx={g.centre.x} cy={g.centre.y} r="16" fill="#f1c9a5" stroke={INK} strokeWidth="2.5" />
        <text x={g.centre.x} y={g.centre.y + 38} fontFamily={FONT} fontSize="15" fontWeight="bold" fill={INK} textAnchor="middle">{tr(lang, 'Mr Bowen’s hand', null, 'la main de M. Bowen')}</text>
      </g>
    );
  }
  const sun = m.scene === 'comet' ? g.attractor : g.centre;
  return (
    <g>
      <circle cx={sun.x} cy={sun.y} r="30" fill={SUN_FILL} stroke={SUN_RIM} strokeWidth="3" />
      <text x={sun.x} y={sun.y + 5} fontFamily={FONT} fontSize="15" fontWeight="bold" fill={INK} textAnchor="middle">{label}</text>
    </g>
  );
}

export default function OrbitFigure({ m, lang = 'en', arrows = {}, released = false, tappable = false, onArrow, reveal = false, className = '' }) {
  const g = m.g;
  const o = ORBITERS[m.orbiter];
  const showString = m.scene === 'string' && !released;
  const pull = reveal ? m.to : arrows.pull;
  const path = reveal && m.ask.includes('path') ? m.fwd : arrows.path;
  return (
    <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} className={`w-full h-full select-none ${className}`} preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width={STAGE_W} height={STAGE_H} rx="14" fill="#ffffff" />
      <rect x="0.75" y="0.75" width={STAGE_W - 1.5} height={STAGE_H - 1.5} rx="13" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
      {g.shape === 'comet'
        ? <ellipse cx={g.centre.x} cy={g.centre.y} rx={g.rx} ry={g.ry} fill="none" stroke={RULE} strokeWidth="2.5" strokeDasharray="9 8" />
        : <circle cx={g.centre.x} cy={g.centre.y} r={g.r} fill="none" stroke={RULE} strokeWidth="2.5" strokeDasharray="9 8" />}
      {g.shape === 'comet' && <circle cx={g.centre.x} cy={g.centre.y} r="4" fill={RULE} />}
      {g.shape === 'neptune' && <circle cx={g.centre.x} cy={g.centre.y} r={g.rOuter} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 8" />}
      <Ticks g={g} dir={m.dir} at={m.at} />
      <Body m={m} g={g} lang={lang} />
      {g.shape === 'neptune' && (
        <g>
          <circle cx={g.attractor.x} cy={g.attractor.y} r="17" fill="#4a6fd1" stroke={INK} strokeWidth="2.5" />
          <text x={g.attractor.x} y={g.attractor.y - 26} fontFamily={FONT} fontSize="15" fontWeight="bold" fill={INK} textAnchor="middle">Neptune</text>
        </g>
      )}
      {showString && <line x1={g.centre.x} y1={g.centre.y} x2={g.obj.x} y2={g.obj.y} stroke={INK} strokeWidth="2.5" />}

      {/* the eight arrows to tap */}
      {tappable && ARROWS.map((k) => {
        const u = arrowVec(k);
        return (
          <g key={`t${k}`} role="button" aria-label={`arrow ${k * 45}°`} onClick={() => onArrow?.(k)} style={{ cursor: 'pointer' }}>
            <circle cx={f1(g.obj.x + u.x * ARROW_L)} cy={f1(g.obj.y + u.y * ARROW_L)} r={HIT_R} fill="#f8fafc" fillOpacity="0.9" stroke="#cbd5e1" strokeWidth="2" />
            <Arrow from={g.obj} k={k} len={ARROW_L + 10} color="#94a3b8" width={3} head={14} />
          </g>
        );
      })}
      {path != null && <Arrow from={g.obj} k={path} len={reveal ? 150 : ARROW_L + 30} color={BLUE} width={6} dashed head={20} />}
      {pull != null && <Arrow from={g.obj} k={pull} len={ARROW_L + 12} color={RED} width={7} head={20} />}

      <circle cx={g.obj.x} cy={g.obj.y} r={OBJ_R} fill={o.fill} stroke={INK} strokeWidth="2.5" />
      <text x="42" y="34" fontFamily={FONT} fontSize="17" fontWeight="bold" fill={INK}>{tr(lang, o.label.en, null, o.label.fr)}</text>
      <circle cx="26" cy="28" r="9" fill={o.fill} stroke={INK} strokeWidth="2" />
    </svg>
  );
}
