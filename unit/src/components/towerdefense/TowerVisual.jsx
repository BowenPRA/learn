// src/components/towerdefense/TowerVisual.jsx
import { memo } from 'react';

// ==========================================
// TOWER SVGS WITH PASSIVE MODIFIERS
// ==========================================
const DartHedgehog = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="dart-hedgehog">
      {hasPassive && (
        <g id="mega-spikes">
          <polygon points="100,10 130,50 70,50" fill="#4e342e" />
          <polygon points="40,30 75,75 45,85" fill="#4e342e" />
          <polygon points="160,30 155,85 125,75" fill="#4e342e" />
          <polygon points="20,80 65,110 30,130" fill="#4e342e" />
          <polygon points="180,80 170,130 135,110" fill="#4e342e" />
        </g>
      )}
      <circle cx="100" cy="100" r="65" fill="#8b6351"/>
      <rect x="50" y="55" width="100" height="90" rx="35" fill="#a47d6c"/>
      <rect x="65" y="90" width="70" height="50" rx="25" fill="#edd4c5"/>
      <circle cx="100" cy="100" r="8" fill="#3e2723"/>
      <circle cx="75" cy="80" r="7" fill="#3e2723"/>
      <circle cx="125" cy="80" r="7" fill="#3e2723"/>
      <circle cx="73" cy="78" r="2.5" fill="#ffffff"/>
      <circle cx="123" cy="78" r="2.5" fill="#ffffff"/>
      <path d="M45,60 Q100,75 155,60 L145,40 Q100,60 55,40 Z" fill="#ff3b3b"/>
      <circle cx="100" cy="51" r="5" fill="#ffffff"/>
      <circle cx="100" cy="51" r="2" fill="#ff3b3b"/>
    </g>
  </svg>
);

const SniperOwl = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="sniper-owl">
      <polygon points="50,60 40,25 75,55" fill="#6d4c41"/>
      <polygon points="150,60 160,25 125,55" fill="#6d4c41"/>
      <rect x="45" y="50" width="110" height="95" rx="40" fill="#8d6e63"/>
      <circle cx="75" cy="90" r="28" fill="#d7ccc8"/>
      <circle cx="125" cy="90" r="28" fill="#d7ccc8"/>
      <circle cx="75" cy="90" r="14" fill="#ffca28"/>
      {hasPassive ? (
        <g id="crosshair-eye">
          <circle cx="125" cy="90" r="18" fill="#111" stroke="#ff3b3b" strokeWidth="4"/>
          <line x1="95" y1="90" x2="155" y2="90" stroke="#ff3b3b" strokeWidth="4"/>
          <line x1="125" y1="60" x2="125" y2="120" stroke="#ff3b3b" strokeWidth="4"/>
          <circle cx="125" cy="90" r="4" fill="#ff3b3b" />
        </g>
      ) : (
        <>
          <circle cx="125" cy="90" r="14" fill="#ffca28"/>
          <circle cx="125" cy="90" r="8" fill="#3e2723"/>
          <circle cx="123" cy="87" r="3" fill="#ffffff"/>
        </>
      )}
      <circle cx="75" cy="90" r="8" fill="#3e2723"/>
      <circle cx="73" cy="87" r="3" fill="#ffffff"/>
      <polygon points="90,100 110,100 100,120" fill="#f57f17"/>
      {!hasPassive && (
        <>
          <circle cx="125" cy="90" r="32" fill="none" stroke="#ff3b3b" strokeWidth="4"/>
          <line x1="125" y1="45" x2="125" y2="135" stroke="#ff3b3b" strokeWidth="2.5"/>
          <line x1="80" y1="90" x2="170" y2="90" stroke="#ff3b3b" strokeWidth="2.5"/>
        </>
      )}
    </g>
  </svg>
);

const SplashHippo = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="splash-hippo">
      <rect x="60" y="140" width="20" height="25" rx="6" fill="#8a83a4"/>
      <rect x="120" y="140" width="20" height="25" rx="6" fill="#8a83a4"/>
      <rect x="50" y="60" width="100" height="85" rx="40" fill="#8a83a4"/>
      <circle cx="60" cy="55" r="14" fill="#8a83a4"/>
      <circle cx="140" cy="55" r="14" fill="#8a83a4"/>
      <rect x="30" y="90" width="140" height="75" rx="37.5" fill="#9c94b3"/>
      <ellipse cx="65" cy="115" rx="9" ry="14" fill="#524a66"/>
      <ellipse cx="135" cy="115" rx="9" ry="14" fill="#524a66"/>
      <rect x="75" y="155" width="14" height="16" rx="4" fill="#ffffff"/>
      <rect x="111" y="155" width="14" height="16" rx="4" fill="#ffffff"/>
      {hasPassive && (
        <g id="fire-breath">
          <path d="M100,165 Q125,200 100,215 Q75,200 100,165" fill="#ff5722"/>
          <path d="M100,170 Q115,195 100,205 Q85,195 100,170" fill="#ff9800"/>
          <path d="M100,175 Q108,190 100,200 Q92,190 100,175" fill="#ffeb3b"/>
        </g>
      )}
      <circle cx="75" cy="75" r="9" fill="#ffffff"/>
      <circle cx="125" cy="75" r="9" fill="#ffffff"/>
      <circle cx="75" cy="75" r="4" fill="#2c3e50"/>
      <circle cx="125" cy="75" r="4" fill="#2c3e50"/>
      <path d="M50,145 Q100,170 150,145" fill="none" stroke="#8a83a4" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

const FrostFox = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="frost-fox">
      {hasPassive && (
        <g id="ice-crown">
           <polygon points="100,-10 115,30 85,30" fill="#e0f7fa" stroke="#00bcd4" strokeWidth="2"/>
           <polygon points="65,10 80,45 50,40" fill="#e0f7fa" stroke="#00bcd4" strokeWidth="2"/>
           <polygon points="135,10 150,40 120,45" fill="#e0f7fa" stroke="#00bcd4" strokeWidth="2"/>
        </g>
      )}
      <polygon points="55,65 40,20 85,55" fill="#0288d1"/>
      <polygon points="145,65 160,20 115,55" fill="#0288d1"/>
      <polygon points="58,60 48,32 75,55" fill="#b3e5fc"/>
      <polygon points="142,60 152,32 125,55" fill="#b3e5fc"/>
      <path d="M45,60 Q100,40 155,60 L145,120 Q100,160 55,120 Z" fill="#29b6f6"/>
      <path d="M48,95 Q100,75 152,95 L140,125 Q100,155 60,125 Z" fill="#e1f5fe"/>
      <circle cx="100" cy="135" r="7" fill="#01579b"/>
      <circle cx="75" cy="95" r="7" fill="#01579b"/>
      <circle cx="125" cy="95" r="7" fill="#01579b"/>
      <path d="M92,60 L108,76 M108,60 L92,76 M100,53 L100,83 M85,68 L115,68" stroke="#e1f5fe" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

const ChainEel = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="chain-eel">
      <polygon points="50,75 25,95 50,115" fill="#ffa000"/>
      <polygon points="150,75 175,95 150,115" fill="#ffa000"/>
      {hasPassive && (
        <g id="lightning-aura" stroke="#ffff00" strokeWidth="4" fill="none" strokeLinejoin="round">
          <polyline points="10,50 30,20 50,40 70,10" />
          <polyline points="190,50 170,20 150,40 130,10" />
          <polyline points="10,150 30,180 50,160 70,190" />
          <polyline points="190,150 170,180 150,160 130,190" />
        </g>
      )}
      <rect x="50" y="50" width="100" height="95" rx="35" fill="#ffca28"/>
      <circle cx="70" cy="85" r="10" fill="#3e2723"/>
      <circle cx="130" cy="85" r="10" fill="#3e2723"/>
      <circle cx="67" cy="82" r="3" fill="#ffffff"/>
      <circle cx="127" cy="82" r="3" fill="#ffffff"/>
      <circle cx="60" cy="110" r="8" fill="#ff6f00"/>
      <circle cx="140" cy="110" r="8" fill="#ff6f00"/>
      <path d="M85,120 Q100,135 115,120" fill="none" stroke="#3e2723" strokeWidth="4" strokeLinecap="round"/>
      <polygon points="105,45 90,65 102,65 95,85 115,60 102,60" fill="#ffffff"/>
    </g>
  </svg>
);

const NitroAlien = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <g id="nitro-alien">
      {hasPassive && (
        <g id="tentacles">
          <path d="M65,70 Q20,90 25,140" stroke="#1de9b6" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M60,80 Q10,110 15,160" stroke="#00bfa5" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M135,70 Q180,90 175,140" stroke="#1de9b6" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M140,80 Q190,110 185,160" stroke="#00bfa5" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )}
      <line x1="85" y1="55" x2="65" y2="25" stroke="#7e57c2" strokeWidth="6" strokeLinecap="round"/>
      <line x1="115" y1="55" x2="135" y2="25" stroke="#7e57c2" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="65" cy="25" r="9" fill="#1de9b6"/>
      <circle cx="135" cy="25" r="9" fill="#1de9b6"/>
      <rect x="50" y="55" width="100" height="85" rx="35" fill="#b39ddb"/>
      <circle cx="70" cy="95" r="12" fill="#311b92"/>
      <circle cx="130" cy="95" r="12" fill="#311b92"/>
      <circle cx="100" cy="75" r="15" fill="#311b92"/>
      <circle cx="70" cy="93" r="4" fill="#ffffff"/>
      <circle cx="130" cy="93" r="4" fill="#ffffff"/>
      <circle cx="100" cy="72" r="5" fill="#ffffff"/>
      <rect x="92" y="115" width="16" height="5" rx="2.5" fill="#311b92"/>
    </g>
  </svg>
);

// A clear left-facing horse head: long muzzle, pointed ear, flowing rainbow mane
// down the neck and a spiral horn from the brow.
const UnicornBlook = ({ className, hasPassive }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      <linearGradient id="uni-horn" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="30%" stopColor="#f59e0b" />
        <stop offset="55%" stopColor="#facc15" />
        <stop offset="78%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="uni-mane" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="45%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
    <g id="unicorn-blook">
      {/* Mane down the back of the neck */}
      <path d="M112,58 Q150,70 150,120 Q152,162 126,180 Q150,150 137,120 Q150,95 118,80 Q132,69 112,58 Z" fill="url(#uni-mane)" />
      <path d="M118,72 Q142,97 131,129 Q140,151 121,168 Q131,140 120,120 Q129,98 107,85 Z" fill="#c084fc" opacity="0.65" />

      {/* Head + neck silhouette, muzzle to the left */}
      <path d="M34,118 C29,107 34,97 45,95 L59,91 C65,68 79,56 97,55 C106,55 112,60 114,68 C138,76 150,104 149,150 L120,176 C109,177 99,174 93,167 C69,163 59,149 54,137 L47,131 C39,127 35,124 34,118 Z"
            fill="#fdf2ff" stroke="#efd6ff" strokeWidth="3" />

      {/* Muzzle shading */}
      <path d="M34,118 C29,107 34,97 45,95 L60,92 C58,104 55,116 52,126 L47,131 C39,127 35,124 34,118 Z" fill="#fbe8ff" />

      {/* Ear */}
      <polygon points="112,62 122,30 136,60" fill="#fdf2ff" stroke="#efd6ff" strokeWidth="3" />
      <polygon points="117,56 123,40 130,56" fill="#f0abfc" />

      {/* Forelock tuft at the brow */}
      <path d="M95,56 Q108,47 119,58 Q110,66 99,64 Z" fill="url(#uni-mane)" />

      {/* Spiral horn */}
      <polygon points="93,54 80,2 106,52" fill="url(#uni-horn)" stroke="#fff" strokeWidth="1.5" />
      <path d="M92,44 L100,42 M90,34 L98,32 M88,24 L95,22 M86,14 L92,13" stroke="#fff" strokeWidth="1.6" opacity="0.85" />

      {/* Eye */}
      <ellipse cx="83" cy="90" rx="6.5" ry="9" fill="#3b1d4e" />
      <circle cx="81" cy="86" r="2.4" fill="#fff" />

      {/* Nostril + mouth on the muzzle */}
      <ellipse cx="45" cy="110" rx="4" ry="5.5" fill="#d8a7e8" />
      <path d="M36,122 Q44,128 52,124" stroke="#d8a7e8" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {hasPassive && (
        <g id="twin-sparkle">
          <path d="M150,38 l3,7 l7,3 l-7,3 l-3,7 l-3,-7 l-7,-3 l7,-3 z" fill="#facc15" />
          <path d="M40,58 l2.5,6 l6,2.5 l-6,2.5 l-2.5,6 l-2.5,-6 l-6,-2.5 l6,-2.5 z" fill="#38bdf8" />
        </g>
      )}
    </g>
  </svg>
);

const VISUALS = {
  DART:    { Blook: DartHedgehog },
  SNIPER:  { Blook: SniperOwl },
  SPLASH:  { Blook: SplashHippo },
  FROST:   { Blook: FrostFox },
  CHAIN:   { Blook: ChainEel },
  NITRO:   { Blook: NitroAlien },
  UNICORN: { Blook: UnicornBlook }
};

const SIZES = {
  sm: { wrap: 'w-8 h-8' },
  md: { wrap: 'w-12 h-12' },
  lg: { wrap: 'w-16 h-16' },
  xl: { wrap: 'w-20 h-20' }
};

// ==========================================
// CSS Animations
// ==========================================
// Injected ONCE into document.head, not once per component. This used to render
// a <style> element inside every TowerVisual, so a board with twenty towers
// carried twenty identical copies of the same keyframes — each one re-created on
// every frame, and each one forcing the engine to re-parse them.
const TD_KEYFRAMES = `
  @keyframes td-fast-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes td-leg-l { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
  @keyframes td-leg-r { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-10deg); } }
  @keyframes td-wing-flap { 0%, 100% { transform: scaleX(0.8) rotate(-20deg); } 50% { transform: scaleX(0.3) rotate(-5deg); } }
  .td-leg-l { animation: td-leg-l 0.25s ease-in-out infinite; transform-origin: center; }
  .td-leg-r { animation: td-leg-r 0.25s ease-in-out infinite; transform-origin: center; }
  .td-wing-l { animation: td-wing-flap 0.08s ease-in-out infinite; transform-origin: 25px 45px; }
  .td-wing-r { animation: td-wing-flap 0.08s ease-in-out infinite reverse; transform-origin: 75px 45px; }
`;

const STYLE_ID = 'td-visual-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = TD_KEYFRAMES;
  document.head.appendChild(el);
}

function TowerVisualBase({ typeId, size = 'md', selected = false, hovered = false, dimmed = false, upgrades = {} }) {
  const conf = VISUALS[typeId];
  if (!conf) return null;
  const { Blook } = conf;
  const s = SIZES[size] || SIZES.md;
  
  // Minor Visual Modifiers based on upgrades
  const hasRate = !!upgrades.rate;
  const hasDamage = !!upgrades.damage;
  const hasRange = !!upgrades.range;
  const hasTargeting = !!upgrades.targeting;
  const hasPassive = !!upgrades.passive;

  const baseScale = hasRange ? 1.25 : 1; 
  const finalScale = selected ? baseScale + 0.1 : hovered ? baseScale + 0.05 : baseScale;
  const transformY = selected ? '-4px' : hovered ? '-2px' : '0px';

  return (
    <div 
      className={`relative ${s.wrap} flex items-center justify-center transition-all duration-300 ${dimmed ? 'opacity-50 grayscale' : ''}`}
      style={{ transform: `scale(${finalScale}) translateY(${transformY})` }}
    >
      {/* TARGETING AURA: Faint white glow */}
      {hasTargeting && (
        <div className="absolute inset-[-10%] rounded-full bg-white/20 blur-md z-0 pointer-events-none" />
      )}

      {/* Ground shadow block */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-2.5 rounded-full blur-[3px] bg-black/40 z-0" />
      
      {/* Container tracking rate of fire speed changes */}
      <div 
        className={`relative w-full h-full z-10 
          ${selected ? 'drop-shadow-xl' : 'drop-shadow-md'}
          ${hasRate ? 'animate-[td-fast-bob_0.6s_ease-in-out_infinite]' : ''}
        `}
        style={hasDamage ? { filter: 'saturate(1.8) contrast(1.2)' } : {}}
      >
        <Blook className="w-full h-full" hasPassive={hasPassive} />
      </div>

    </div>
  );
}

// Memoised: a tower's artwork only changes when it is selected, hovered or
// upgraded, but the board re-renders every frame to move the creeps. Without
// this, every tower's whole SVG tree was reconciled thirty times a second.
// `upgrades` is compared by content because the engine replaces the object.
const sameUpgrades = (a = {}, b = {}) =>
  a === b || (!!a.rate === !!b.rate && !!a.damage === !!b.damage && !!a.range === !!b.range &&
              !!a.targeting === !!b.targeting && !!a.passive === !!b.passive);

const TowerVisual = memo(TowerVisualBase, (p, n) =>
  p.typeId === n.typeId && p.size === n.size && p.selected === n.selected &&
  p.hovered === n.hovered && p.dimmed === n.dimmed && sameUpgrades(p.upgrades, n.upgrades)
);

export default TowerVisual;

// ==========================================
// INSECT SVG COMPONENTS FOR ENEMIES
// ==========================================
// Memoised on `type` alone: the artwork is identical for every creep of a kind,
// and only the wrapper's transform changes as it walks. This is the single
// biggest reconciliation saving on the board — two hundred creeps each carrying
// a twenty-node SVG were being diffed in full on every frame.
export const InsectVisual = memo(({ type }) => {
  switch (type) {
    case 'ANT':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l"><path d="M48,52 L18,34" stroke="#4a0e0e" strokeWidth="3.5" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M52,52 L82,34" stroke="#4a0e0e" strokeWidth="3.5" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l"><path d="M48,55 L15,55" stroke="#4a0e0e" strokeWidth="3.5" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M52,55 L85,55" stroke="#4a0e0e" strokeWidth="3.5" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l"><path d="M48,58 L18,76" stroke="#4a0e0e" strokeWidth="3.5" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M52,58 L82,76" stroke="#4a0e0e" strokeWidth="3.5" fill="none" strokeLinecap="round"/></g>
          <path d="M45,16 Q38,6 31,4 M55,16 Q62,6 69,4" stroke="#4a0e0e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <ellipse cx="50" cy="78" rx="15" ry="18" fill="#9f1239" />
          <ellipse cx="47" cy="74" rx="6" ry="9" fill="#e11d48" opacity="0.5" />
          <circle cx="50" cy="53" r="10" fill="#e11d48" />
          <circle cx="50" cy="26" r="12" fill="#f43f5e" />
          <path d="M44,34 Q40,40 35,38 M56,34 Q60,40 65,38" stroke="#4a0e0e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <circle cx="45" cy="24" r="3" fill="#1f0508" /><circle cx="55" cy="24" r="3" fill="#1f0508" />
          <circle cx="44" cy="23" r="1" fill="#fff" /><circle cx="54" cy="23" r="1" fill="#fff" />
        </svg>
      );
    case 'WASP':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <ellipse className="td-wing-l" cx="26" cy="42" rx="20" ry="11" fill="#e0f2fe" opacity="0.72" stroke="#bae6fd" strokeWidth="1" />
          <ellipse className="td-wing-r" cx="74" cy="42" rx="20" ry="11" fill="#e0f2fe" opacity="0.72" stroke="#bae6fd" strokeWidth="1" />
          <path d="M45,14 L38,4 M55,14 L62,4" stroke="#1c1917" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <circle cx="50" cy="22" r="11" fill="#f59e0b" />
          <circle cx="45" cy="21" r="3" fill="#1c1917" /><circle cx="55" cy="21" r="3" fill="#1c1917" />
          <circle cx="44" cy="20" r="1" fill="#fff" /><circle cx="54" cy="20" r="1" fill="#fff" />
          <circle cx="50" cy="42" r="12" fill="#1c1917" />
          <ellipse cx="50" cy="72" rx="15" ry="22" fill="#facc15" />
          <path d="M36,64 Q50,70 64,64 M35,74 Q50,80 65,74 M38,84 Q50,89 62,84" stroke="#1c1917" strokeWidth="5" fill="none" />
          <polygon points="47,93 53,93 50,104" fill="#1c1917" />
        </svg>
      );
    case 'BEETLE':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l" style={{animationDuration: '0.6s'}}><path d="M40,52 L14,38" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '0.6s'}}><path d="M60,52 L86,38" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '0.6s'}}><path d="M38,62 L10,62" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '0.6s'}}><path d="M62,62 L90,62" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '0.6s'}}><path d="M40,74 L14,84" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '0.6s'}}><path d="M60,74 L86,84" stroke="#3e2723" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <path d="M42,22 C34,8 22,10 26,2 M58,22 C66,8 78,10 74,2" stroke="#3e2723" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <circle cx="50" cy="24" r="12" fill="#4e342e" />
          <circle cx="45" cy="23" r="2.5" fill="#fbbf24" /><circle cx="55" cy="23" r="2.5" fill="#fbbf24" />
          <ellipse cx="50" cy="62" rx="26" ry="34" fill="#6d4c41" stroke="#3e2723" strokeWidth="2" />
          <line x1="50" y1="30" x2="50" y2="94" stroke="#3e2723" strokeWidth="3" />
          <ellipse cx="40" cy="50" rx="7" ry="15" fill="#a1887f" opacity="0.55" />
        </svg>
      );
    case 'QUEEN':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M46,52 L10,34" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M54,52 L90,34" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M46,58 L8,58" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M54,58 L92,58" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-l" style={{animationDuration: '0.8s'}}><path d="M46,64 L12,80" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <g className="td-leg-r" style={{animationDuration: '0.8s'}}><path d="M54,64 L88,80" stroke="#4a148c" strokeWidth="5" fill="none" strokeLinecap="round" /></g>
          <ellipse className="td-wing-l" cx="22" cy="60" rx="15" ry="26" fill="#e9d5ff" opacity="0.45" />
          <ellipse className="td-wing-r" cx="78" cy="60" rx="15" ry="26" fill="#e9d5ff" opacity="0.45" />
          <ellipse cx="50" cy="72" rx="26" ry="24" fill="#7e22ce" />
          <ellipse cx="50" cy="72" rx="15" ry="15" fill="#a855f7" opacity="0.45" />
          <circle cx="50" cy="44" r="14" fill="#6b21a8" />
          <circle cx="50" cy="24" r="12" fill="#581c87" />
          <path d="M38,16 L40,4 L46,12 L50,2 L54,12 L60,4 L62,16 Z" fill="#facc15" stroke="#a16207" strokeWidth="1" />
          <circle cx="50" cy="9" r="2" fill="#f43f5e" />
          <circle cx="45" cy="24" r="3.5" fill="#86efac" /><circle cx="55" cy="24" r="3.5" fill="#86efac" />
          <circle cx="45" cy="24" r="1.5" fill="#052e16" /><circle cx="55" cy="24" r="1.5" fill="#052e16" />
        </svg>
      );
    case 'GIANT_ANT':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(220,38,38,0.7)]">
          <g className="td-leg-l" style={{animationDuration: '1s'}}><path d="M46,50 L6,28" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '1s'}}><path d="M54,50 L94,28" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '1s'}}><path d="M46,58 L5,55" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '1s'}}><path d="M54,58 L95,55" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l" style={{animationDuration: '1s'}}><path d="M46,66 L8,84" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r" style={{animationDuration: '1s'}}><path d="M54,66 L92,84" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/></g>
          <path d="M40,26 C28,16 18,20 12,10 M60,26 C72,16 82,20 88,10" stroke="#450a0a" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <ellipse cx="50" cy="76" rx="27" ry="30" fill="#7f1d1d" />
          <circle cx="42" cy="72" r="5" fill="#fca5a5" opacity="0.5" />
          <circle cx="58" cy="80" r="6" fill="#fca5a5" opacity="0.5" />
          <circle cx="52" cy="66" r="4" fill="#fca5a5" opacity="0.5" />
          <circle cx="50" cy="42" r="16" fill="#991b1b" />
          <circle cx="50" cy="20" r="15" fill="#b91c1c" />
          <circle cx="43" cy="18" r="4.5" fill="#fde047" /><circle cx="57" cy="18" r="4.5" fill="#fde047" />
          <circle cx="43" cy="18" r="2" fill="#7f1d1d" /><circle cx="57" cy="18" r="2" fill="#7f1d1d" />
        </svg>
      );

    // ===================== FROSTKIN (ICE arenas) — crystalline, faceted =========
    case 'ICE_FLEA': // swarm — a floating shard of ice
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l"><path d="M46,64 L26,82" stroke="#0369a1" strokeWidth="3" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M54,64 L74,82" stroke="#0369a1" strokeWidth="3" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-l"><path d="M45,58 L27,60" stroke="#0369a1" strokeWidth="3" fill="none" strokeLinecap="round"/></g>
          <g className="td-leg-r"><path d="M55,58 L73,60" stroke="#0369a1" strokeWidth="3" fill="none" strokeLinecap="round"/></g>
          <polygon points="50,18 74,50 50,86 26,50" fill="#7dd3fc" stroke="#e0f7ff" strokeWidth="2" />
          <polygon points="50,18 74,50 50,50" fill="#e0f2fe" />
          <polygon points="50,50 50,86 26,50" fill="#38bdf8" />
          <circle cx="44" cy="46" r="3" fill="#0c4a6e" /><circle cx="56" cy="46" r="3" fill="#0c4a6e" />
          <circle cx="44" cy="45" r="1" fill="#e0f7ff" /><circle cx="56" cy="45" r="1" fill="#e0f7ff" />
        </svg>
      );
    case 'ICE_MOTH': // flyer — angular crystal wings
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-wing-l"><polygon points="48,42 12,28 4,48 20,54 8,66 42,58" fill="#bae6fd" opacity="0.85" stroke="#e0f7ff" strokeWidth="1"/></g>
          <g className="td-wing-r"><polygon points="52,42 88,28 96,48 80,54 92,66 58,58" fill="#bae6fd" opacity="0.85" stroke="#e0f7ff" strokeWidth="1"/></g>
          <path d="M44,20 L36,8 M56,20 L64,8" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <circle cx="50" cy="26" r="9" fill="#f1f5f9" />
          <ellipse cx="50" cy="58" rx="9" ry="22" fill="#cbd5e1" />
          <path d="M50,40 L50,78 M42,52 L58,52 M44,64 L56,64" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="46" cy="25" r="2.5" fill="#1e293b" /><circle cx="54" cy="25" r="2.5" fill="#1e293b" />
        </svg>
      );
    case 'ICE_GOLEM': // tank — a blocky ice construct
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g className="td-leg-l" style={{animationDuration:'0.7s'}}><polygon points="26,42 10,56 20,66 34,52" fill="#38bdf8" stroke="#0284c7" strokeWidth="2"/></g>
          <g className="td-leg-r" style={{animationDuration:'0.7s'}}><polygon points="74,42 90,56 80,66 66,52" fill="#38bdf8" stroke="#0284c7" strokeWidth="2"/></g>
          <rect x="34" y="82" width="12" height="16" rx="2" fill="#0ea5e9"/>
          <rect x="54" y="82" width="12" height="16" rx="2" fill="#0ea5e9"/>
          <polygon points="28,34 38,18 46,36" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.5"/>
          <polygon points="72,34 62,18 54,36" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.5"/>
          <polygon points="30,34 70,34 74,84 26,84" fill="#38bdf8" stroke="#0284c7" strokeWidth="3"/>
          <polygon points="30,34 50,34 50,84 26,84" fill="#7dd3fc" opacity="0.5"/>
          <rect x="36" y="48" width="8" height="10" rx="2" fill="#0c4a6e"/>
          <rect x="56" y="48" width="8" height="10" rx="2" fill="#0c4a6e"/>
          <rect x="38" y="50" width="4" height="6" fill="#67e8f9"/>
          <rect x="58" y="50" width="4" height="6" fill="#67e8f9"/>
          <path d="M40,70 L60,70" stroke="#0c4a6e" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );
    case 'ICE_MATRON': // boss — a crystal sorceress
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">
          <polygon points="50,2 56,20 44,20" fill="#e0f7ff" stroke="#38bdf8" strokeWidth="1.5"/>
          <polygon points="34,8 42,22 28,22" fill="#e0f7ff" stroke="#38bdf8" strokeWidth="1.5"/>
          <polygon points="66,8 58,22 72,22" fill="#e0f7ff" stroke="#38bdf8" strokeWidth="1.5"/>
          <path d="M26,58 Q50,28 74,58 L66,94 Q50,100 34,94 Z" fill="#7dd3fc" stroke="#38bdf8" strokeWidth="1.5"/>
          <path d="M34,62 Q50,40 66,62 L60,88 Q50,94 40,88 Z" fill="#e0f7ff" opacity="0.7"/>
          <path d="M50,34 L50,90 M40,60 L60,60" stroke="#bae6fd" strokeWidth="1.5"/>
          <circle cx="50" cy="34" r="14" fill="#eef8ff" />
          <circle cx="44" cy="33" r="3.5" fill="#0369a1" /><circle cx="56" cy="33" r="3.5" fill="#0369a1" />
          <circle cx="44" cy="32" r="1.3" fill="#e0f7ff" /><circle cx="56" cy="32" r="1.3" fill="#e0f7ff" />
          <path d="M45,42 Q50,45 55,42" stroke="#0369a1" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M22,50 l1.5,3.5 l3.5,1.5 l-3.5,1.5 l-1.5,3.5 l-1.5,-3.5 l-3.5,-1.5 l3.5,-1.5 z" fill="#e0f7ff"/>
          <path d="M78,54 l1.5,3.5 l3.5,1.5 l-3.5,1.5 l-1.5,3.5 l-1.5,-3.5 l-3.5,-1.5 l3.5,-1.5 z" fill="#e0f7ff"/>
        </svg>
      );
    case 'ICE_TITAN': // spawner — a walking glacier
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(14,165,233,0.7)]">
          <polygon points="16,44 30,6 42,44" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2"/>
          <polygon points="58,44 70,4 84,44" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2"/>
          <polygon points="40,40 50,0 62,40" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2"/>
          <polygon points="20,46 80,46 72,96 28,96" fill="#0ea5e9" stroke="#0369a1" strokeWidth="3"/>
          <polygon points="20,46 50,46 50,96 28,96" fill="#38bdf8" opacity="0.55"/>
          <polygon points="50,58 60,72 50,86 40,72" fill="#0c4a6e"/>
          <polygon points="50,63 56,72 50,81 44,72" fill="#67e8f9"/>
          <rect x="36" y="52" width="8" height="6" rx="1.5" fill="#0c4a6e"/>
          <rect x="56" y="52" width="8" height="6" rx="1.5" fill="#0c4a6e"/>
          <rect x="38" y="53" width="4" height="4" fill="#67e8f9"/>
          <rect x="58" y="53" width="4" height="4" fill="#67e8f9"/>
        </svg>
      );

    // ===================== NIGHTFALL (NIGHT arenas) — bone + toxic glow ========
    case 'NIGHT_SHADE': // swarm — a hooded wisp
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">
          <path d="M28,44 Q28,14 50,14 Q72,14 72,44 L72,80 Q66,74 60,82 Q54,74 48,82 Q42,74 36,82 L28,74 Z" fill="#312e81" opacity="0.95"/>
          <path d="M34,42 Q34,20 50,20 Q66,20 66,42 L66,60 Q50,66 34,60 Z" fill="#1e1b4b"/>
          <ellipse cx="43" cy="42" rx="4" ry="5" fill="#4ade80"/>
          <ellipse cx="57" cy="42" rx="4" ry="5" fill="#4ade80"/>
          <circle cx="43" cy="42" r="1.5" fill="#052e16"/><circle cx="57" cy="42" r="1.5" fill="#052e16"/>
        </svg>
      );
    case 'NIGHT_BAT': // flyer — a leather-winged bat
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <path className="td-wing-l" d="M46,44 Q16,22 4,40 Q18,40 12,52 Q26,46 46,56 Z" fill="#4c1d95" stroke="#2e1065" strokeWidth="1.5"/>
          <path className="td-wing-r" d="M54,44 Q84,22 96,40 Q82,40 88,52 Q74,46 54,56 Z" fill="#4c1d95" stroke="#2e1065" strokeWidth="1.5"/>
          <polygon points="40,34 42,20 50,36" fill="#5b21b6"/>
          <polygon points="60,34 58,20 50,36" fill="#5b21b6"/>
          <ellipse cx="50" cy="52" rx="15" ry="18" fill="#6d28d9"/>
          <circle cx="44" cy="46" r="4" fill="#a3e635"/><circle cx="56" cy="46" r="4" fill="#a3e635"/>
          <circle cx="44" cy="46" r="1.5" fill="#1a2e05"/><circle cx="56" cy="46" r="1.5" fill="#1a2e05"/>
          <polygon points="45,60 48,60 46.5,66" fill="#f8fafc"/>
          <polygon points="52,60 55,60 53.5,66" fill="#f8fafc"/>
        </svg>
      );
    case 'NIGHT_KNIGHT': // tank — a skeletal armored knight
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <rect x="34" y="84" width="10" height="14" rx="2" fill="#1e293b"/>
          <rect x="56" y="84" width="10" height="14" rx="2" fill="#1e293b"/>
          <polygon points="34,24 26,10 40,20" fill="#334155"/>
          <polygon points="66,24 74,10 60,20" fill="#334155"/>
          <path d="M36,14 Q50,6 64,14 L64,34 Q50,40 36,34 Z" fill="#475569" stroke="#0f172a" strokeWidth="2"/>
          <rect x="40" y="22" width="20" height="12" rx="2" fill="#0f172a"/>
          <circle cx="46" cy="28" r="2.5" fill="#4ade80"/><circle cx="54" cy="28" r="2.5" fill="#4ade80"/>
          <path d="M32,40 L68,40 L64,82 L36,82 Z" fill="#475569" stroke="#0f172a" strokeWidth="2.5"/>
          <path d="M50,40 L50,82 M40,54 L60,54" stroke="#1e293b" strokeWidth="2.5"/>
          <path d="M16,44 L28,44 L28,66 Q22,74 16,66 Z" fill="#334155" stroke="#0f172a" strokeWidth="2"/>
          <path d="M22,50 L22,62 M18,54 L26,54" stroke="#64748b" strokeWidth="2"/>
        </svg>
      );
    case 'NIGHT_NECRO': // boss — a hooded skull sorcerer
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
          <path d="M26,50 Q26,20 50,16 Q74,20 74,50 L70,94 Q50,100 30,94 Z" fill="#4c1d95" stroke="#2e1065" strokeWidth="2"/>
          <path d="M50,20 L50,94" stroke="#3b0764" strokeWidth="2"/>
          <path d="M34,46 Q34,24 50,22 Q66,24 66,46 L62,58 Q50,64 38,58 Z" fill="#12102e"/>
          <ellipse cx="50" cy="42" rx="11" ry="12" fill="#ede9fe"/>
          <ellipse cx="44" cy="40" rx="3.5" ry="4.5" fill="#4ade80"/>
          <ellipse cx="56" cy="40" rx="3.5" ry="4.5" fill="#4ade80"/>
          <circle cx="44" cy="40" r="1.3" fill="#052e16"/><circle cx="56" cy="40" r="1.3" fill="#052e16"/>
          <polygon points="50,46 48,52 52,52" fill="#312e81"/>
          <path d="M45,55 L55,55 M47,55 L47,50 M50,56 L50,50 M53,55 L53,50" stroke="#312e81" strokeWidth="1.2"/>
          <line x1="80" y1="12" x2="76" y2="94" stroke="#3b2a1a" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="81" cy="12" r="7" fill="#4ade80" opacity="0.85"/>
          <circle cx="81" cy="12" r="3" fill="#f0fdf4"/>
        </svg>
      );
    case 'NIGHT_COLOSSUS': // spawner — a horned bone golem
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(74,222,128,0.55)]">
          <rect x="24" y="82" width="16" height="16" rx="2" fill="#3b2f5e"/>
          <rect x="60" y="82" width="16" height="16" rx="2" fill="#3b2f5e"/>
          <polygon points="26,38 14,10 38,30" fill="#e5e7eb"/>
          <polygon points="74,38 86,10 62,30" fill="#e5e7eb"/>
          <rect x="24" y="34" width="52" height="54" rx="10" fill="#4c1d95" stroke="#2e1065" strokeWidth="3"/>
          <path d="M32,50 L68,50 M30,64 L70,64 M34,78 L66,78" stroke="#312e81" strokeWidth="2"/>
          <ellipse cx="50" cy="44" rx="20" ry="19" fill="#ede9fe"/>
          <ellipse cx="42" cy="42" rx="6" ry="7" fill="#1e1b4b"/>
          <ellipse cx="58" cy="42" rx="6" ry="7" fill="#1e1b4b"/>
          <circle cx="42" cy="42" r="3" fill="#4ade80"/><circle cx="58" cy="42" r="3" fill="#4ade80"/>
          <polygon points="50,48 46,56 54,56" fill="#c4b5fd"/>
          <path d="M40,60 L60,60 M44,60 L44,54 M50,61 L50,54 M56,60 L56,54" stroke="#4c1d95" strokeWidth="2"/>
        </svg>
      );

    default:
      return null;
  }
});
InsectVisual.displayName = 'InsectVisual';

// ==========================================
// OVERSIZED DONUT HEALTH TRACKER
// ==========================================
export const DonutBase = ({ healthPct, isHit }) => (
  <div className={`relative transition-all duration-100 ${isHit ? 'scale-125 drop-shadow-[0_0_20px_rgba(234,43,43,1)]' : 'scale-[1.75] drop-shadow-xl'}`}>
    <svg viewBox="0 0 100 100" className="w-10 h-10">
      <circle cx="50" cy="50" r="40" fill="#fca5a5" />
      <circle cx="50" cy="50" r="35" fill="#fbcfe8" />
      <circle cx="50" cy="50" r="12" fill="#58A700" /> 
      
      <line x1="30" y1="30" x2="35" y2="25" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="30" x2="65" y2="35" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="70" x2="35" y2="65" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="70" x2="75" y2="75" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

      {healthPct < 0.2 && (
        <circle cx="85" cy="25" r="24" fill="#58A700" />
      )}
    </svg>
  </div>
);