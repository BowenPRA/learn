// src/components/arcade/ArcadeBanner.jsx
//
// The Arcade's tile on Home. It is not a course — there are no units, no XP,
// nothing to finish — so it is deliberately drawn nothing like the course
// cards: a full-width dark marquee that stays dark in light mode, with the
// student's gold purse on it. Pure presentation; Home works out the numbers.
import { Gamepad2, Coins, Sparkles, Shield, Skull, ChevronRight } from 'lucide-react';
import { ARCADE_GRID_STYLE } from './arcadeStyle';

/**
 * @param {object} props
 * @param {number|null} props.balance   gold to spend, or null while progress loads
 * @param {boolean} props.freePlay      whether every game is free right now
 * @param {number} props.playCost       gold per play
 * @param {() => void} props.onOpen
 */
export default function ArcadeBanner({ balance, freePlay, playCost, onOpen }) {
  const hasWallet = balance != null;
  return (
    <button
      onClick={onOpen}
      className="group relative w-full text-left overflow-hidden rounded-[2.25rem] border-2 border-indigo-400/30 border-b-[8px] border-b-indigo-950 bg-[#0b0f24] text-white shadow-xl transition-all duration-200 hover:border-indigo-300/50 active:translate-y-[8px] active:border-b-2 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationFillMode: 'both' }}
    >
      {/* cabinet glass: glows, dot grid, marquee stripe */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-indigo-500/40 blur-3xl" />
        <div className="absolute -bottom-28 right-10 w-80 h-80 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12]" style={ARCADE_GRID_STYLE} />
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400" />
      </div>

      <div className="relative p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-5 min-w-0 flex-1">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 border-b-[4px] border-indigo-950 flex items-center justify-center flex-shrink-0 shadow-[0_0_32px_rgba(129,140,248,0.45)] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
            <Gamepad2 className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" strokeWidth={2.5} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-300">Play zone</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">Arcade</h2>
            <p className="text-slate-400 font-bold text-sm tracking-wide">
              Spend the gold you earn by studying.
            </p>
            <div className="flex flex-wrap gap-2 mt-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1CB0F6]/15 border border-[#1CB0F6]/40 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-200">
                <Shield className="w-3.5 h-3.5" strokeWidth={3} /> Tower Defense
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EA2B2B]/15 border border-[#EA2B2B]/40 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-rose-200">
                <Skull className="w-3.5 h-3.5" strokeWidth={3} /> Swarm Survivor
              </span>
            </div>
          </div>
        </div>

        {/* The purse. Its space is held while progress loads so nothing jumps. */}
        <div className={`flex items-center gap-3 sm:gap-4 flex-shrink-0 ${hasWallet ? '' : 'invisible'}`}>
          <div className="flex items-center gap-2.5 rounded-2xl bg-black/40 border border-amber-300/30 px-4 py-2.5 shadow-inner">
            <Coins className="w-6 h-6 text-[#FFC800]" fill="currentColor" strokeWidth={1.5} />
            <div className="leading-none">
              <p className="text-xl sm:text-2xl font-black tabular-nums">{(balance ?? 0).toLocaleString()}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-200/80 mt-0.5">
                {freePlay
                  ? <span className="inline-flex items-center gap-1 text-emerald-300"><Sparkles className="w-3 h-3" /> Free play on</span>
                  : `${playCost} a play`}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/10 items-center justify-center text-white/70 border border-white/15 group-hover:bg-fuchsia-500 group-hover:text-white group-hover:border-fuchsia-400 transition-all">
            <ChevronRight className="w-6 h-6" strokeWidth={3} />
          </div>
        </div>
      </div>
    </button>
  );
}
