import { CheckCircle2 } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { FORCE_CHIPS, FORCE_CHIP_IDS } from '../../../utils/orbitLabData';
import { T } from './orbitLabText';

/* ------------------------------------------------------------------ *
 * Orbit Lab, the `coast` picture: where the thing is (space, or a road on
 * Earth) and an arrow for its movement, so "against its movement" has
 * something to point at. Then the four force chips; Nothing is exclusive.
 * ------------------------------------------------------------------ */
const W = 560;
const H = 250;
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const INK = '#2b2b2b';
const STARS = [[40, 30], [96, 70], [150, 24], [210, 200], [64, 180], [470, 40], [520, 150], [410, 210], [330, 30], [500, 220], [120, 128], [380, 98]];

function Move({ x1, y, x2, color, label }) {
  const dir = Math.sign(x2 - x1);
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - dir * 16} y2={y} stroke={color} strokeWidth="6" strokeLinecap="round" />
      <path d={`M ${x2} ${y} L ${x2 - dir * 20} ${y - 11} L ${x2 - dir * 20} ${y + 11} Z`} fill={color} />
      <text x={(x1 + x2) / 2} y={y - 16} fontFamily={FONT} fontSize="17" fontWeight="bold" fill={color} textAnchor="middle">{label}</text>
    </g>
  );
}

function Space({ children }) {
  return (
    <g>
      <rect x="0" y="0" width={W} height={H} rx="14" fill="#0b1526" />
      {STARS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="#e2e8f0" />)}
      {children}
    </g>
  );
}

function Picture({ icon, lang }) {
  const mv = (T[lang] || T.en).movement;
  if (icon === 'probe') {
    return (
      <Space>
        <rect x="150" y="104" width="62" height="10" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
        <rect x="296" y="104" width="62" height="10" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
        <rect x="212" y="86" width="84" height="46" rx="6" fill="#d4a017" stroke="#fde68a" strokeWidth="2" />
        <path d="M 230 86 Q 254 50 278 86 Z" fill="#e5e7eb" stroke="#94a3b8" strokeWidth="2" />
        <Move x1={380} y={110} x2={530} color="#fde68a" label={mv} />
      </Space>
    );
  }
  if (icon === 'moon') {
    return (
      <Space>
        <defs><clipPath id="ol-coast-clip"><rect x="0" y="0" width={W} height={H} rx="14" /></clipPath></defs>
        <g clipPath="url(#ol-coast-clip)">
          <circle cx="280" cy="190" r="120" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="8 7" />
        </g>
        <circle cx="280" cy="190" r="42" fill="#4f8fbf" stroke="#bfdbfe" strokeWidth="2" />
        <text x="280" y="196" fontFamily={FONT} fontSize="15" fontWeight="bold" fill="#ffffff" textAnchor="middle">{tr(lang, 'Earth', null, 'Terre')}</text>
        <circle cx="280" cy="70" r="16" fill="#c9c9c9" stroke="#f1f5f9" strokeWidth="2" />
        <Move x1={256} y={70} x2={130} color="#fde68a" label={mv} />
      </Space>
    );
  }
  if (icon === 'bike') {
    return (
      <g>
        <rect x="0" y="0" width={W} height={H} rx="14" fill="#e0f2fe" />
        <rect x="0" y="196" width={W} height="54" fill="#94a3b8" />
        <line x1="20" y1="224" x2={W - 20} y2="224" stroke="#f8fafc" strokeWidth="4" strokeDasharray="26 22" />
        <g fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="200" cy="160" r="34" />
          <circle cx="320" cy="160" r="34" />
          <path d="M 200 160 L 240 110 L 300 110 L 320 160 M 240 110 L 262 160 L 200 160 M 262 160 L 300 110 M 300 110 L 292 88 L 312 84 M 240 110 L 234 96 M 222 94 L 248 94" />
        </g>
        <Move x1={370} y={100} x2={520} color={INK} label={mv} />
      </g>
    );
  }
  return (
    <g>
      <rect x="0" y="0" width={W} height={H} rx="14" fill="#e0f2fe" />
      <rect x="0" y="200" width={W} height="50" fill="#475569" />
      <line x1="20" y1="226" x2={W - 20} y2="226" stroke="#f8fafc" strokeWidth="4" strokeDasharray="30 20" />
      <ellipse cx="250" cy="160" rx="150" ry="24" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <path d="M 112 156 L 92 104 L 128 104 L 162 150 Z" fill="#cbd5e1" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M 200 166 L 300 166 L 254 182 L 186 182 Z" fill="#94a3b8" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="226" y="156" width="56" height="7" fill="#c25e12" />
      <circle cx="370" cy="152" r="5" fill="#93c5fd" />
      <line x1="240" y1="182" x2="240" y2="192" stroke={INK} strokeWidth="3" />
      <line x1="370" y1="182" x2="370" y2="192" stroke={INK} strokeWidth="3" />
      <circle cx="240" cy="194" r="7" fill={INK} />
      <circle cx="370" cy="194" r="7" fill={INK} />
      <Move x1={410} y={110} x2={540} color={INK} label={mv} />
    </g>
  );
}

export function CoastPicture({ icon, lang = 'en' }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" aria-hidden="true">
      <Picture icon={icon} lang={lang} />
    </svg>
  );
}

/** The four chips. `answer` (after the stage): the right ones, ticked. */
export function ForceChips({ picked = [], onToggle, lang = 'en', locked = false, answer = null }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {FORCE_CHIP_IDS.map((id) => {
        const on = (answer || picked).includes(id);
        const tone = answer
          ? (on ? 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500] dark:bg-lime-900/30 dark:text-lime-200' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400')
          : on ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/40 text-slate-900 dark:text-amber-100'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-amber-400';
        return (
          <button key={id} type="button" disabled={locked} onClick={() => onToggle?.(id)} aria-pressed={on}
            className={`rounded-xl border-2 border-b-[4px] px-3 py-2.5 font-black text-sm sm:text-base leading-snug flex items-center gap-2 transition-all ${tone}`}>
            {on && <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} />}
            <span>{tr(lang, FORCE_CHIPS[id].en, null, FORCE_CHIPS[id].fr)}</span>
          </button>
        );
      })}
    </div>
  );
}
