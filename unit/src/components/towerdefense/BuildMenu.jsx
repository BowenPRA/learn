// src/components/towerdefense/BuildMenu.jsx
import { memo, useEffect, useState } from 'react';
import { Coins, Zap, Crosshair, Clock, Maximize2, Info, HelpCircle } from 'lucide-react';
import { TOWERS, TOWER_ORDER } from './gameData';
import TowerVisual from './TowerVisual'; 

const TOWER_THEME = {
  DART:   { bg: 'bg-[#62b530]', border: 'border-[#4e9226]', text: 'text-white' },
  SNIPER: { bg: 'bg-[#14bdd2]', border: 'border-[#1098a8]', text: 'text-white' },
  SPLASH: { bg: 'bg-[#c21487]', border: 'border-[#9b106c]', text: 'text-white' },
  FROST:  { bg: 'bg-[#8dbcf0]', border: 'border-[#7196c0]', text: 'text-slate-900' },
  CHAIN:  { bg: 'bg-[#f3c40f]', border: 'border-[#c39d0c]', text: 'text-amber-950' },
  NITRO:  { bg: 'bg-[#8842d0]', border: 'border-[#6d35a6]', text: 'text-white' },
  UNICORN:{ bg: 'bg-[#d946ef]', border: 'border-[#a21caf]', text: 'text-white' }
};

/**
 * The "Quiz" button: answer a question now to earn a bolt. It rests for a while
 * after each question, and its own timer (not the game's) wakes it up again.
 */
function QuizButton({ readyAt, onQuiz }) {
  const [now, setNow] = useState(() => performance.now());
  useEffect(() => {
    const wait = readyAt - performance.now();
    if (wait <= 0) return undefined;
    const t = setTimeout(() => setNow(performance.now()), wait + 30);
    return () => clearTimeout(t);
  }, [readyAt]);
  const ready = now >= readyAt;
  return (
    <button
      onClick={onQuiz}
      disabled={!ready}
      title="Answer a question to win a bolt"
      className={`h-16 md:h-12 aspect-square md:aspect-auto md:w-full rounded-2xl flex flex-col items-center justify-center transition-all
        ${ready
          ? 'bg-[#FFC800] border-b-[6px] border-[#b38c00] active:border-b-0 active:translate-y-[6px] text-amber-950 hover:brightness-110'
          : 'bg-slate-700 border-b-[6px] border-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
    >
      <HelpCircle className="w-5 h-5" strokeWidth={3} />
      <span className="font-black mt-0.5 text-[10px] uppercase tracking-widest">{ready ? 'Quiz' : 'Wait'}</span>
    </button>
  );
}

// `affordable` is the ids the player can pay for, joined: "DART,SNIPER". It is
// a string so the menu re-renders when what can be bought changes, and not for
// every coin.
function BuildMenu({ allowedTowers, affordable = '', activeBuilder, onSelect, bolts, onUseBolt, hasUnicorn = false, canQuiz = false, quizReadyAt = 0, onQuiz }) {
  const ids = TOWER_ORDER.filter(id => allowedTowers.includes(id));
  const [hoveredTower, setHoveredTower] = useState(null);
  const canPay = affordable.split(',');

  const renderTooltip = (t) => {
    if (!t) return null;
    return (
      <>
        <div className="text-white font-black text-lg flex items-center justify-between mb-1">
          <span>{t.name}</span>
          <span className="text-slate-400 text-[10px] uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">
            {t.type === 'BUFF' ? 'Support' : t.type === 'SPLASH' ? 'AoE' : t.type === 'UNICORN' ? 'Ultimate' : t.type}
          </span>
        </div>
        <div className="text-slate-400 text-[11px] font-bold mb-3 leading-snug">{t.desc}</div>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase tracking-widest">
          {t.type !== 'BUFF' && t.base.damage && (
            <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Crosshair className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-300">DMG</span>
              <span className="text-white ml-auto">{t.base.damage}</span>
            </div>
          )}
          {t.base.cooldown && (
            <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-300">SPD</span>
              <span className="text-white ml-auto">{(t.base.cooldown/1000).toFixed(1)}s</span>
            </div>
          )}
          {t.type === 'UNICORN' ? (
            <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Maximize2 className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-slate-300">RNG</span>
              <span className="text-white ml-auto">MAP</span>
            </div>
          ) : (t.base.range || t.base.auraRange) ? (
            <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Maximize2 className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-slate-300">RNG</span>
              <span className="text-white ml-auto">{t.base.range || t.base.auraRange}</span>
            </div>
          ) : null}
          <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">TGT</span>
              <span className="text-white ml-auto truncate max-w-[40px] text-right">{t.defaultTargeting || 'ALL'}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <aside className="relative order-3 md:order-none w-full md:w-28 h-auto md:h-full md:min-h-0 bg-slate-800 md:border-l-4 border-t-4 md:border-t-0 border-slate-950 flex flex-row md:flex-col p-2 sm:p-3 md:px-4 md:py-3 gap-2 sm:gap-3 flex-shrink-0 z-50 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] md:shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]">
      
      {/* Mobile Hover Tooltip */}
      {hoveredTower && (
        <div className="md:hidden absolute bottom-[calc(100%+8px)] left-2 right-2 bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 shadow-2xl flex flex-col z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
          {renderTooltip(TOWERS[hoveredTower])}
        </div>
      )}

      {/* Desktop Hover Tooltip */}
      {hoveredTower && (
        <div className="hidden md:flex absolute top-0 right-[calc(100%+16px)] w-64 bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 shadow-2xl flex-col z-[100] pointer-events-none animate-in fade-in slide-in-from-right-2 duration-200">
          {renderTooltip(TOWERS[hoveredTower])}
        </div>
      )}

      {/* Scrollable list of towers */}
      <div className="flex-1 min-w-0 md:min-h-0 overflow-x-auto md:overflow-x-visible md:overflow-y-auto flex flex-row md:flex-col gap-2 items-center md:items-stretch custom-scrollbar h-[72px] md:h-auto pb-1 md:pb-0 md:px-1.5 md:-mx-1.5 md:py-1 relative">
        
        {ids.map((id, idx) => {
          const t = TOWERS[id];
          if (!t) return null;
          const theme = TOWER_THEME[id];
          // A singleton (the unicorn) can only be built once.
          const soldOut = !!t.singleton && id === 'UNICORN' && hasUnicorn;
          const canAfford = canPay.includes(id) && !soldOut;
          const isSelected = activeBuilder?.typeId === id;
          const hotkey = idx + 1;

          let cls;
          if (isSelected) {
            cls = `${theme.bg} ${theme.text} translate-y-1 border-b-0 ring-4 ring-offset-2 ring-offset-slate-800 ring-white`;
          } else if (canAfford) {
            cls = `${theme.bg} border-b-[6px] ${theme.border} ${theme.text} hover:brightness-110 active:border-b-0 active:translate-y-[6px]`;
          } else {
            cls = 'bg-slate-700 border-b-[6px] border-slate-900 text-slate-500 opacity-50 cursor-not-allowed';
          }

          return (
            <button
              key={id}
              onClick={() => canAfford && onSelect({ typeId: id })}
              onMouseEnter={() => setHoveredTower(id)}
              onMouseLeave={() => setHoveredTower(null)}
              disabled={!canAfford}
              className={`group relative h-16 aspect-square md:aspect-auto md:h-auto md:w-full md:flex-1 md:min-h-[54px] md:max-h-20 rounded-2xl transition-all flex flex-col items-center justify-center gap-1 md:gap-0 p-2 md:py-1 shrink-0 md:shrink ${cls}`}
            >
              {/* Hotkey hint (desktop) — matches the 1–7 keyboard shortcut */}
              {hotkey <= 7 && (
                <span className="hidden md:flex absolute top-1 left-1 w-4 h-4 items-center justify-center rounded-md bg-black/25 text-white/80 text-[9px] font-black tabular-nums leading-none pointer-events-none">
                  {hotkey}
                </span>
              )}
              {t.singleton && (
                <span className="absolute top-1 right-1 text-[7px] font-black uppercase tracking-wide bg-black/30 text-white/90 px-1 py-0.5 rounded pointer-events-none leading-none">
                  {soldOut ? '✓' : '1×'}
                </span>
              )}
              <TowerVisual typeId={id} size="sm" dimmed={!canAfford} />

              <div className={`flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-lg mt-0.5 text-[10px] font-black tabular-nums bg-black/20 ${!canAfford && 'text-slate-400'}`}>
                {soldOut ? (
                  <span className="uppercase tracking-wide">Built</span>
                ) : (
                  <>
                    <Coins className="w-2.5 h-2.5" strokeWidth={3} />
                    {t.cost}
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Reward Blasts */}
      <div className="flex flex-row md:flex-col items-center justify-center md:border-t-2 border-slate-700 md:pt-2 gap-2 w-auto md:w-full shrink-0 border-l-2 md:border-l-0 pl-3 md:pl-0">
        <div className="hidden md:block [@media(max-height:560px)]:!hidden text-[9px] font-black uppercase text-slate-400 text-center leading-tight">Reward<br/>Blasts</div>
        <button
          onClick={onUseBolt}
          disabled={bolts === 0}
          title="Ignore Armor! Massive damage to all!"
          className={`h-16 aspect-square md:aspect-auto md:h-14 md:w-full rounded-2xl flex flex-col items-center justify-center transition-all 
            ${bolts > 0 
              ? 'bg-indigo-500 border-b-[6px] border-indigo-700 active:border-b-0 active:translate-y-[6px] text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] hover:brightness-110' 
              : 'bg-slate-700 border-b-[6px] border-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
        >
          <Zap className={`w-5 h-5 ${bolts > 0 ? 'fill-current animate-pulse' : ''}`} strokeWidth={2.5} />
          <span className="font-black text-sm tabular-nums leading-none mt-0.5">{bolts}</span>
        </button>
        {canQuiz && <QuizButton readyAt={quizReadyAt} onQuiz={onQuiz} />}
      </div>

    </aside>
  );
}

// Memoised: it only needs to re-render when the credits, the bolts or the
// chosen tower change, not for every point of score.
export default memo(BuildMenu);