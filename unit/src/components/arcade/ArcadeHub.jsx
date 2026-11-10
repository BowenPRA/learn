// src/components/arcade/ArcadeHub.jsx
//
// The Arcade's screens, drawn from props. views/Arcade.jsx owns the data
// (progress, gold, leaderboard fetches) and the live games; this file only
// renders — which is what lets the dev harness (preview-arcadehub.html) mount
// every screen with hand-made numbers, since the real hub sits behind auth.
import {
  X, Shield, Skull, Trophy, Lock, Loader2, Users, Award, ChevronLeft, ChevronRight,
  Crown, Medal, Heart, Ban, Coins, Swords, Timer, Sparkles, LogOut, GraduationCap,
  Star, Play, Zap, Gamepad2,
} from 'lucide-react';
import { MAP_THEMES } from '../towerdefense/themeData';
import { ARCADE_KEY, SURVIVOR_KEY, ARCADE_BOARDS } from '../../utils/progressSchema';
import { ARCADE_GRID_STYLE } from './arcadeStyle';

/** Tower Defense blue and Survivor red — the two cabinets' liveries. */
const CABINETS = {
  TD: { accent: '#1CB0F6', edge: '#1899D6' },
  SURVIVOR: { accent: '#EA2B2B', edge: '#A81C1C' },
};

/** Dark text on a light map tile (the ICE theme is pale blue), white otherwise. */
function inkFor(hex = '#000000') {
  const n = parseInt(hex.replace('#', ''), 16);
  if (Number.isNaN(n)) return '#fff';
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? '#0f172a' : '#fff';
}

const Label = ({ children, className = '' }) => (
  <p className={`text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ${className}`}>{children}</p>
);

const Chip = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-xl bg-black/30 border border-white/10 px-3 py-1.5 text-xs font-black text-white/90 ${className}`}>
    {children}
  </span>
);

/** The full-screen cabinet: a flat dark page with a dot grid, and a toast slot. */
export function ArcadeShell({ toast, children }) {
  return (
    <div className="pra-ui fixed inset-0 z-[100] flex flex-col bg-[#0b1022] overflow-hidden text-white">
      {toast && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in px-4 w-full max-w-lg">
          <div className="bg-rose-500 text-white px-6 py-4 rounded-2xl font-black tracking-wide uppercase text-sm border-b-4 border-rose-700 flex items-center justify-center text-center">
            <Lock className="w-5 h-5 mr-3 shrink-0" /> {toast}
          </div>
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.10]" style={ARCADE_GRID_STYLE} />
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#FFC800]" />
      </div>
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:px-8 sm:py-8">{children}</div>
      </div>
    </div>
  );
}

export function ArcadeLoading() {
  return (
    <div className="pra-ui fixed inset-0 flex flex-col items-center justify-center bg-[#0b1022]">
      <Loader2 className="w-10 h-10 animate-spin text-[#FFC800] mb-6" strokeWidth={3} />
      <p className="text-xs text-slate-400 font-black tracking-widest uppercase">Loading Arcade</p>
    </div>
  );
}

const IconButton = ({ onClick, label, children, danger = false }) => (
  <button
    onClick={onClick}
    aria-label={label}
    title={label}
    className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-slate-800/90 rounded-2xl border-b-4 border-slate-950 transition-all hover:bg-slate-700 active:border-b-0 active:translate-y-1 shrink-0 ${danger ? 'text-slate-300 hover:text-rose-400' : 'text-white'}`}
  >
    {children}
  </button>
);

function GoldChip({ balance, big = false }) {
  return (
    <div className={`flex items-center gap-2 bg-black/40 rounded-2xl border-2 border-amber-300/30 ${big ? 'px-5 py-3' : 'px-3 py-2'}`}>
      <Coins className={`${big ? 'w-6 h-6' : 'w-5 h-5'} text-[#FFC800]`} fill="currentColor" strokeWidth={1.5} />
      <span className={`font-black tabular-nums ${big ? 'text-2xl' : 'text-lg'}`}>{balance.toLocaleString()}</span>
      <span className="uppercase tracking-widest text-[10px] text-amber-200/70 pt-0.5">gold</span>
    </div>
  );
}

/**
 * The hub: purse, free-play progress, level select, the two cabinets, and the
 * way to the leaderboard.
 *
 * `levels` is [{ id, level, cfg }] with cfg from arcadeConfig; `bestOf(levelId,
 * boardKey)` is the student's own best on that board; `economy` carries the
 * constants so the copy never drifts from economy.js.
 */
export function ArcadeHub({
  balance, earned, free, economy,
  levels, selectedId, onSelect, bestOf,
  onPlay, onLeaderboard, onBack, onLogout,
}) {
  const { PLAY_COST, GOLD_PER_XP, FREE_PLAY_RATIO } = economy;
  const selected = levels.find((l) => l.id === selectedId) || levels[0];
  const level = selected.cfg;
  const canAfford = balance >= PLAY_COST;
  const spent = Math.max(0, earned - balance);
  const xpPct = free.maxXp ? free.xp / free.maxXp : 0;
  const unitPct = free.total ? free.done / free.total : 0;

  return (
    <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">

      {/* header */}
      <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <IconButton onClick={onBack} label="Back to PRA Learn">
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </IconButton>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-300">Play zone</p>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
              Arcade
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:block"><GoldChip balance={balance} big /></div>
          <div className="sm:hidden"><GoldChip balance={balance} /></div>
          {onLogout && (
            <IconButton onClick={onLogout} label="Logout" danger>
              <LogOut className="w-5 h-5" strokeWidth={2.5} />
            </IconButton>
          )}
        </div>
      </div>

      {/* level select */}
      <div className="flex items-end justify-between gap-3 mb-3">
        <Label>Choose a level</Label>
        <p className="text-[11px] font-bold text-slate-500">Harder levels score higher</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-4">
        {levels.map((l) => {
          const sel = l.id === selectedId;
          const tone = MAP_THEMES[l.cfg.themeId]?.bg || '#334155';
          const best = Math.max(bestOf(l.id, ARCADE_KEY), bestOf(l.id, SURVIVOR_KEY));
          return (
            <button
              key={l.id}
              onClick={() => onSelect(l.id)}
              aria-pressed={sel}
              className={`relative text-left rounded-2xl p-2.5 sm:p-3 border-b-4 transition-all active:border-b-0 active:translate-y-1
                ${sel
                  ? 'bg-[#FFC800] border-[#D1A300] text-amber-950'
                  : 'bg-slate-800 border-slate-950 text-white hover:bg-slate-700'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm border border-black/10"
                  style={{ backgroundColor: tone, color: inkFor(tone) }}
                >
                  {l.level}
                </span>
                {l.cfg.modifierIcon && <span className="text-base leading-none" title={l.cfg.modifierLabel}>{l.cfg.modifierIcon}</span>}
              </div>
              <p className="font-black text-xs sm:text-sm leading-tight truncate">{l.cfg.mapName}</p>
              <p className={`text-[10px] font-black uppercase tracking-widest truncate ${sel ? 'text-amber-900/80' : 'text-slate-400'}`}>{l.cfg.tierLabel}</p>
              {best > 0 && (
                <p className={`mt-1.5 text-[10px] font-black tabular-nums flex items-center gap-1 ${sel ? 'text-amber-900' : 'text-amber-300'}`}>
                  <Star className="w-3 h-3" fill="currentColor" /> {best.toLocaleString()}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* the selected level's briefing */}
      <div className="rounded-2xl bg-slate-900 border-2 border-white/10 px-4 py-3.5 sm:px-5 sm:py-4 mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
        <div className="min-w-0 flex-1">
          <p className="font-black text-lg sm:text-xl tracking-tight leading-tight">
            <span className="text-slate-400">Level {selected.level} ·</span> {level.mapName}
          </p>
          {level.briefing && <p className="text-slate-300 text-sm font-medium leading-snug mt-1">{level.briefing}</p>}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Chip><Swords className="w-4 h-4" strokeWidth={2.5} /> {level.tierLabel}</Chip>
          {level.modifierLabel && (
            <Chip className="!bg-[#FFC800] !text-amber-950 !border-[#D1A300] uppercase tracking-wide">
              <span className="leading-none text-base">{level.modifierIcon}</span> {level.modifierLabel}
            </Chip>
          )}
          <Chip><Heart className="w-4 h-4 text-rose-400" fill="currentColor" /> {level.lives}</Chip>
          <Chip>
            <Ban className="w-4 h-4 text-white/70" strokeWidth={2.5} />
            {level.bannedTowers.length > 0 ? `${level.bannedTowers.length} banned` : 'No bans'}
          </Chip>
        </div>
      </div>

      {/* cabinets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-6">
        <GameCabinet
          kicker="Cabinet 01"
          title="Tower Defense"
          Icon={Shield}
          {...CABINETS.TD}
          blurb="Build a defence and hold the line, wave after wave. Answer Bolt questions mid-fight for a boost."
          stats={[
            <><Zap className="w-4 h-4" strokeWidth={2.5} /> Bolt questions</>,
            <><Heart className="w-4 h-4 text-rose-400" fill="currentColor" /> {level.lives} lives</>,
          ]}
          best={bestOf(selected.id, ARCADE_KEY)}
          free={free.unlocked}
          cost={PLAY_COST}
          canAfford={canAfford}
          onPlay={() => onPlay('TD')}
        />
        <GameCabinet
          kicker="Cabinet 02"
          title="Swarm Survivor"
          Icon={Skull}
          {...CABINETS.SURVIVOR}
          blurb="You are the tower now — walk, dodge, and let your weapons fire. Every level-up question lets you choose what you become."
          stats={[
            <><Timer className="w-4 h-4" strokeWidth={2.5} /> 4 min to the boss</>,
            <><Sparkles className="w-4 h-4" strokeWidth={2.5} /> Level-up choices</>,
          ]}
          best={bestOf(selected.id, SURVIVOR_KEY)}
          free={free.unlocked}
          cost={PLAY_COST}
          canAfford={canAfford}
          onPlay={() => onPlay('SURVIVOR')}
        />
      </div>

      {/* purse + free play */}
      <div className="grid gap-4 lg:grid-cols-12 mb-6">
        <section className="lg:col-span-5 relative overflow-hidden rounded-3xl border-2 border-amber-300/25 bg-slate-900 p-5 sm:p-6">
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#FFC800] rounded-2xl flex items-center justify-center border-b-4 border-[#D1A300] shrink-0">
                <Coins className="w-6 h-6 text-amber-950" fill="currentColor" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <Label>Your purse</Label>
                <p className="text-4xl font-black tabular-nums leading-none mt-1">
                  {balance.toLocaleString()}
                  <span className="text-base font-black text-amber-200/80 ml-2">gold</span>
                </p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-black/30 border border-white/10 px-3 py-2">
                <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Earned</dt>
                <dd className="font-black tabular-nums text-lg leading-tight flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#FFC800]" fill="currentColor" /> {earned.toLocaleString()}
                </dd>
              </div>
              <div className="rounded-xl bg-black/30 border border-white/10 px-3 py-2">
                <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Spent</dt>
                <dd className="font-black tabular-nums text-lg leading-tight flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4 text-fuchsia-300" strokeWidth={2.5} /> {spent.toLocaleString()}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm font-bold text-slate-300 leading-snug">
              Every <span className="text-[#FFC800]">1 XP</span> you earn in a course is <span className="text-[#FFC800]">{GOLD_PER_XP} gold</span>.
              A play costs <span className="text-[#FFC800]">{PLAY_COST}</span>.
            </p>
          </div>
        </section>

        <section className={`lg:col-span-7 rounded-3xl border-2 p-5 sm:p-6 ${free.unlocked ? 'bg-emerald-500/10 border-emerald-400/40' : 'bg-slate-900 border-white/10'}`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-b-4 shrink-0 ${free.unlocked ? 'bg-emerald-500 border-emerald-700' : 'bg-slate-700 border-slate-900'}`}>
              {free.unlocked
                ? <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
                : <GraduationCap className="w-6 h-6 text-slate-300" strokeWidth={2.5} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="font-black text-lg sm:text-xl tracking-tight">Free play</h2>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${free.unlocked ? 'bg-emerald-400 text-emerald-950' : 'bg-white/10 text-slate-300 border border-white/10'}`}>
                  {free.unlocked ? 'On' : 'Locked'}
                </span>
              </div>
              <p className="text-slate-300 font-bold text-sm leading-snug mt-1">
                {free.unlocked
                  ? (free.via === 'units'
                    ? 'Every unit finished — every game is free. Play as much as you like.'
                    : `You hold ${Math.round(xpPct * 100)}% of all your XP, so every game is free. Stay above ${Math.round(FREE_PLAY_RATIO * 100)}% as new units arrive.`)
                  : `Finish every unit, or reach ${Math.round(FREE_PLAY_RATIO * 100)}% of all the XP on offer — whichever comes first — and every game is free.`}
              </p>
              {free.total > 0 && (
                <div className="mt-4 grid sm:grid-cols-2 gap-x-5 gap-y-3">
                  {[
                    { label: 'Your XP', value: `${free.xp.toLocaleString()} / ${free.maxXp.toLocaleString()}`, pct: xpPct, goal: FREE_PLAY_RATIO, note: free.xp >= free.needXp ? 'Goal reached' : `${(free.needXp - free.xp).toLocaleString()} XP to go` },
                    { label: 'Units finished', value: `${free.done} / ${free.total}`, pct: unitPct, goal: 1, note: free.done === free.total ? 'Goal reached' : `${free.total - free.done} to go` },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        <span>{bar.label}</span>
                        <span className="tabular-nums text-slate-200">{bar.value}</span>
                      </div>
                      <div className="relative h-4 bg-black/40 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-400 transition-all duration-500 motion-reduce:transition-none"
                          style={{ width: `${Math.round(bar.pct * 100)}%` }}
                        />
                        {/* The finish line, where it is not simply the end of the bar. */}
                        {bar.goal < 1 && <div className="absolute top-0 bottom-0 w-0.5 bg-white/70" style={{ left: `${bar.goal * 100}%` }} />}
                      </div>
                      <p className="mt-1 text-[11px] font-bold text-slate-400">{bar.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* leaderboard entry */}
      <button
        onClick={onLeaderboard}
        className="w-full group bg-[#FFC800] p-4 sm:p-5 rounded-3xl border-b-[6px] border-[#D1A300] active:border-b-2 active:translate-y-[4px] transition-all duration-100 flex items-center justify-between"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-white/25 rounded-2xl flex items-center justify-center border-b-4 border-black/10 shrink-0">
            <Trophy className="w-6 h-6 text-amber-950" strokeWidth={2.5} />
          </div>
          <div className="text-left min-w-0">
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">Leaderboard</h2>
            <p className="text-amber-900/80 font-bold text-xs sm:text-sm truncate">Top runs on Level {selected.level} · {level.mapName}</p>
          </div>
        </div>
        <ChevronRight className="w-7 h-7 text-amber-950 group-hover:translate-x-1 transition-transform shrink-0" strokeWidth={3} />
      </button>
    </div>
  );
}

/** One arcade cabinet: a marquee, a screen with the pitch, and the coin slot. */
function GameCabinet({ kicker, title, Icon, accent, edge, blurb, stats = [], best = 0, free, cost, canAfford, onPlay }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden border-b-[6px] bg-slate-900 flex flex-col"
      style={{ borderColor: edge }}
    >
      {/* marquee */}
      <div className="relative px-5 sm:px-6 py-4 flex items-center gap-3" style={{ background: accent }}>
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={ARCADE_GRID_STYLE} aria-hidden="true" />
        <div className="relative w-11 h-11 bg-white/20 rounded-xl border-b-4 border-black/10 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
        <div className="relative min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">{kicker}</p>
          <h2 className="text-2xl font-black text-white tracking-tight leading-none">{title}</h2>
        </div>
        {best > 0 && (
          <div className="relative text-right shrink-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Your best</p>
            <p className="text-xl font-black tabular-nums text-white leading-none flex items-center justify-end gap-1">
              <Star className="w-4 h-4" fill="currentColor" /> {best.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* screen */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col gap-4">
        <div className="relative rounded-2xl bg-black/40 border border-white/10 p-4 overflow-hidden">
          <p className="relative text-white/90 font-semibold text-sm leading-snug">{blurb}</p>
          {stats.length > 0 && (
            <div className="relative flex flex-wrap gap-2 mt-3">
              {stats.map((s, i) => <Chip key={i}>{s}</Chip>)}
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center gap-3">
          <button
            onClick={onPlay}
            className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-base text-white border-b-[6px] hover:brightness-110 active:border-b-2 active:translate-y-[4px] transition-all duration-100 flex items-center justify-center gap-2"
            style={{ backgroundColor: accent, borderColor: edge }}
          >
            <Play className="w-5 h-5" fill="currentColor" strokeWidth={2.5} /> Play
          </button>
          {free ? (
            <span className="h-14 flex items-center gap-1.5 bg-emerald-500 text-white font-black uppercase tracking-widest text-xs px-4 rounded-2xl border-b-[6px] border-emerald-700">
              <Sparkles className="w-4 h-4" /> Free
            </span>
          ) : (
            <span className={`h-14 flex flex-col items-center justify-center leading-none px-4 rounded-2xl border ${canAfford ? 'bg-black/30 border-amber-300/30 text-white' : 'bg-black/40 border-white/10 text-white/50'}`}>
              <span className="flex items-center gap-1.5 font-black text-sm tabular-nums">
                <Coins className="w-4 h-4 text-[#FFC800]" fill="currentColor" strokeWidth={1.5} /> {cost}
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest mt-1 opacity-70">{canAfford ? 'per play' : 'not enough'}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/** The per-level leaderboard, one board per cabinet. */
export function ArcadeLeaderboard({
  levelNo, mapName, boards = ARCADE_BOARDS, boardId, onBoard, onBack,
  loading, error, pending, rows = [],
}) {
  const rankBadge = (i) => {
    switch (i) {
      case 0: return <Crown className="w-6 h-6 text-amber-950" />;
      case 1: return <Medal className="w-6 h-6 text-slate-800" />;
      case 2: return <Medal className="w-6 h-6 text-amber-100" />;
      default: return <span className="font-black text-xl">#{i + 1}</span>;
    }
  };
  const rowTone = (i) => (
    i === 0 ? 'bg-[#FFC800] border-[#D1A300]'
      : i === 1 ? 'bg-slate-300 border-slate-400'
        : i === 2 ? 'bg-amber-700 border-amber-900'
          : 'bg-slate-700 border-slate-900'
  );
  const ink = (i) => (i === 0 ? 'text-amber-950' : i === 1 ? 'text-slate-900' : 'text-white');

  return (
    <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 flex flex-col h-full py-2">
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-3">
        <IconButton onClick={onBack} label="Back to the arcade">
          <ChevronLeft className="w-7 h-7" />
        </IconButton>
        <div className="text-center min-w-0">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight flex items-center justify-center">
            <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFC800] mr-2 sm:mr-3 shrink-0" /> Leaderboard
          </h2>
          <p className="text-slate-400 font-bold tracking-widest uppercase mt-1.5 text-[10px] sm:text-xs truncate">Top 5 • Level {levelNo} · {mapName}</p>
        </div>
        <div className="w-12 sm:w-14 shrink-0" />
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 mb-6">
        {boards.map((b) => (
          <button
            key={b.id}
            onClick={() => onBoard(b.id)}
            className={`px-4 sm:px-7 py-3 rounded-2xl font-black uppercase tracking-widest text-[11px] sm:text-sm border-b-4 transition-all active:border-b-0 active:translate-y-1
              ${b.id === boardId ? 'bg-[#FFC800] text-amber-950 border-[#D1A300]' : 'bg-slate-800 text-slate-400 border-slate-950 hover:bg-slate-700 hover:text-white'}`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-slate-900 border-2 border-white/10 rounded-3xl p-4 sm:p-6 overflow-y-auto">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center min-h-[360px]">
            <Loader2 className="w-12 h-12 animate-spin text-[#FFC800] mb-4" />
            <span className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Syncing…</span>
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center text-center min-h-[360px]">
            <X className="w-16 h-16 text-rose-500 mb-4" />
            <h3 className="text-2xl font-black mb-2">Network Error</h3>
            <p className="text-slate-400 font-medium">{error}</p>
          </div>
        ) : pending ? (
          <div className="h-full flex flex-col items-center justify-center text-center min-h-[360px] px-6">
            <Lock className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-2xl font-black mb-2">Board Not Online Yet</h3>
            <p className="text-slate-400 font-medium max-w-sm">Scores are being recorded — this board switches on once your teacher finishes setting it up.</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center min-h-[360px]">
            <Users className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-2xl font-black mb-2">No Runs Recorded</h3>
            <p className="text-slate-400 font-medium">Be the first to post a score on this level!</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {rows.map((entry, i) => (
              <div key={entry.id || i} className={`flex items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border-b-4 ${rowTone(i)}`}>
                <div className="flex items-center min-w-0">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mr-3 sm:mr-5 shrink-0 ${i === 0 ? 'bg-white/40 text-amber-950' : i === 1 ? 'bg-white/50 text-slate-800' : i === 2 ? 'bg-white/20 text-amber-100' : 'bg-slate-800 text-slate-400'}`}>
                    {rankBadge(i)}
                  </div>
                  <span className={`block text-lg sm:text-2xl font-black tracking-wide truncate ${ink(i)}`}>{entry.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className={`block text-[10px] font-black uppercase tracking-widest mb-0.5 ${i === 0 ? 'text-amber-900' : i === 1 ? 'text-slate-600' : i === 2 ? 'text-amber-200' : 'text-slate-400'}`}>Score</span>
                  <span className={`text-2xl sm:text-4xl font-black tabular-nums ${ink(i)}`}>{entry.score.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
