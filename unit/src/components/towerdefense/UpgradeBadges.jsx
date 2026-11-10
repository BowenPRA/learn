import { Gauge, Swords, Maximize2, Target, Sparkles } from 'lucide-react';

const ICONS = {
  rate:      { Icon: Gauge,      bg: 'bg-sky-500'    },
  damage:    { Icon: Swords,     bg: 'bg-rose-500'   },
  range:     { Icon: Maximize2,  bg: 'bg-violet-500' },
  targeting: { Icon: Target,     bg: 'bg-orange-500' },
  passive:   { Icon: Sparkles,   bg: 'bg-amber-400'  }
};

const ORDER = ['rate', 'damage', 'range', 'targeting', 'passive'];

export default function UpgradeBadges({ upgrades }) {
  const owned = ORDER.filter(k => upgrades?.[k]);
  if (owned.length === 0) return null;

  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex -space-x-1 pointer-events-none z-10">
      {owned.map((key, i) => {
        const { Icon, bg } = ICONS[key];
        return (
          <div
            key={key}
            className={`w-4 h-4 rounded-full ${bg} border-2 border-white shadow-md flex items-center justify-center`}
            style={{ zIndex: 10 + i }}
          >
            <Icon className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
          </div>
        );
      })}
    </div>
  );
}