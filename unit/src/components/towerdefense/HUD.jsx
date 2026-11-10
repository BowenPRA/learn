// src/components/towerdefense/HUD.jsx
import { memo, useEffect, useRef } from 'react';
import { Coins, Heart, Play, Pause, X, Shield, ShieldCheck, FastForward, Volume2, VolumeX, ChevronsRight } from 'lucide-react';

function formatScore(num) {
  if (num >= 10000) return Number((num / 1000).toFixed(1)) + 'k';
  return num;
}

const ICON_BTN = 'w-10 h-10 rounded-2xl flex items-center justify-center border-b-4 active:border-b-0 active:translate-y-[4px] transition-all';

/** Pause, mute, speed and exit — one cluster, shown top-right at every width. */
const Controls = memo(function Controls({ speed, paused, muted, onSetSpeed, onTogglePause, onToggleMute, onQuit, compact }) {
  return (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
      <button
        onClick={onToggleMute}
        title={muted ? 'Sound off (M)' : 'Sound on (M)'}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
        className={`${ICON_BTN} ${compact ? 'hidden sm:flex' : ''} bg-slate-700 hover:bg-slate-600 border-slate-950 ${muted ? 'text-slate-500' : 'text-slate-200'}`}
      >
        {muted ? <VolumeX className="w-5 h-5" strokeWidth={2.5} /> : <Volume2 className="w-5 h-5" strokeWidth={2.5} />}
      </button>

      <button
        onClick={onTogglePause}
        title={paused ? 'Resume (P)' : 'Pause (P)'}
        aria-label={paused ? 'Resume' : 'Pause'}
        className={`${ICON_BTN} ${paused ? 'bg-[#FFC800] hover:bg-[#e6b400] border-[#b38c00] text-amber-950' : 'bg-slate-700 hover:bg-slate-600 border-slate-950 text-slate-200'}`}
      >
        {paused ? <Play className="w-5 h-5 fill-current" strokeWidth={2.5} /> : <Pause className="w-5 h-5 fill-current" strokeWidth={2.5} />}
      </button>

      <div className="flex items-center bg-slate-900 border-b-4 border-slate-950 rounded-2xl p-1 h-10">
        <FastForward className={`w-4 h-4 text-slate-500 mx-1.5 ${compact ? 'hidden sm:block' : ''}`} strokeWidth={3} />
        {[1, 2, 3].map(s => (
          <button
            key={s} onClick={() => onSetSpeed(s)}
            aria-label={`Speed ${s} times`} aria-pressed={speed === s}
            className={`${compact ? 'px-2' : 'px-3'} h-7 text-xs font-black rounded-xl transition-all uppercase ${speed === s ? 'bg-[#1CB0F6] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            {s}×
          </button>
        ))}
      </div>

      <button
        onClick={onQuit} title="Exit" aria-label="Exit"
        className={`${ICON_BTN} bg-rose-500 hover:bg-rose-600 border-rose-700 text-white`}
      >
        <X className="w-5 h-5" strokeWidth={3} />
      </button>
    </div>
  );
});

/** The wave pill: the count, the Next / Rush button, Auto and what is coming. */
const WaveControls = memo(function WaveControls({
  wave, totalWaves, streak, idle, earlyBonus, gameState, waveInProgress, autoPlay, nextWavePreview, onStartWave, onToggleAutoPlay,
}) {
  return (
      <div className="flex items-center justify-center w-full md:w-auto lg:absolute lg:left-1/2 lg:-translate-x-1/2 gap-2 bg-slate-900 p-1.5 rounded-[1.25rem] border-b-4 border-slate-950 shadow-inner">
        <div className="px-3 text-xs font-black text-slate-400 uppercase tracking-widest tabular-nums border-r-2 border-slate-700 flex items-center gap-2">
          <span>Wave {wave}{wave <= totalWaves ? `/${totalWaves}` : ''}</span>
          {streak > 1 && (
            <span className="px-1.5 py-0.5 rounded-md bg-[#58A700]/20 text-[#7bd42f] text-[10px]" title="Perfect waves in a row — each is worth more score">
              ★×{streak}
            </span>
          )}
        </div>

        {idle ? (
          <button
            onClick={onStartWave}
            className="flex flex-1 md:flex-none items-center justify-center gap-1.5 h-8 px-4 rounded-xl bg-[#58A700] hover:bg-[#46a802] text-white font-black uppercase tracking-widest text-xs transition-all shadow-sm ring-2 ring-[#89e219]/60"
          >
            <Play className="w-4 h-4 fill-white" strokeWidth={3} /> Next
          </button>
        ) : earlyBonus > 0 && gameState === 'PLAYING' ? (
          // The road is still busy, but everything has spawned: the next wave can
          // be piled on top for a bounty. Greed against safety — the oldest
          // decision in the genre, and the game had no version of it.
          <button
            onClick={onStartWave}
            title="Send the next wave now, on top of this one, for bonus credits"
            className="flex flex-1 md:flex-none items-center justify-center gap-1.5 h-8 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-black uppercase tracking-widest text-[11px] transition-all shadow-sm"
          >
            <ChevronsRight className="w-4 h-4" strokeWidth={3} /> Rush +{earlyBonus}
          </button>
        ) : (
          <div className="flex flex-1 md:flex-none items-center justify-center gap-1.5 h-8 px-4 rounded-xl bg-slate-800 text-slate-500 font-black uppercase tracking-widest text-xs border border-slate-700">
            {waveInProgress ? <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> : <ShieldCheck className="w-4 h-4" />}
            {waveInProgress ? 'Live' : 'Clear'}
          </div>
        )}

        <button
          onClick={onToggleAutoPlay}
          aria-pressed={!!autoPlay}
          className={`flex items-center justify-center h-8 px-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border ${autoPlay ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50 hover:bg-indigo-500/30' : 'bg-slate-800 text-slate-500 border-transparent hover:bg-slate-700'}`}
          title="Auto-start next wave"
        >
          Auto
        </button>

        {/* Incoming-wave preview: know what's coming before you commit. */}
        {nextWavePreview && nextWavePreview.length > 0 && (
          <div className="hidden sm:flex md:hidden lg:flex items-center gap-2 pl-2.5 ml-0.5 border-l-2 border-slate-700" title="Enemies in the next wave">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-none">Next</span>
            <div className="flex items-center gap-1.5">
              {nextWavePreview.map(e => (
                <span key={e.type} className="flex items-center gap-0.5 text-xs font-black text-slate-200 tabular-nums">
                  <span className="text-sm leading-none" aria-hidden>{e.emoji}</span>{e.count}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
  );
});

function HUD({
  credits, lives, wave, totalWaves, score, bestScore, speed,
  gameState, waveInProgress, autoPlay, tierLabel, nextWavePreview,
  paused = false, muted = false, streak = 0,
  // Credits on offer for calling the next wave while this one is still on the
  // road; 0 when it cannot be called yet.
  earlyBonus = 0,
  onStartWave, onToggleAutoPlay, onSetSpeed, onQuit, onTogglePause, onToggleMute
}) {
  const controls = { speed, paused, muted, onSetSpeed, onTogglePause, onToggleMute, onQuit };
  const idle = !waveInProgress && gameState === 'PLAYING';

  return (
    <header className="relative z-30 bg-slate-800 border-b-4 border-slate-950 flex flex-col md:flex-row items-center px-4 sm:px-6 justify-between flex-shrink-0 shadow-sm py-3 md:py-0 md:h-16 gap-3 md:gap-0">

      <div className="flex w-full md:w-auto items-center justify-between">
        {/* Left: Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 mr-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#1CB0F6] border-b-4 border-[#1899D6]">
              <Shield className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            {tierLabel && (
              <div className="px-3 h-10 flex items-center rounded-2xl bg-slate-900 border-b-[3px] border-slate-950 text-[10px] font-black uppercase tracking-widest text-slate-300 shadow-inner">
                {tierLabel}
              </div>
            )}
          </div>

          <StatPill kind="coins" value={credits} />
          <StatPill kind="lives" value={lives} />

          <div className="hidden lg:flex flex-col ml-2 justify-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Score</div>
            <div className="text-white font-black leading-none text-xl tabular-nums">{formatScore(score)}</div>
          </div>

          {bestScore > 0 && (
            <div className="hidden xl:flex flex-col ml-3 justify-center items-center px-3 py-1 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-xl border-b-2 border-amber-600 shadow-md transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="text-[9px] font-black text-amber-900 uppercase tracking-widest leading-none">Best</div>
              <div className="text-amber-950 font-black leading-none text-lg tabular-nums drop-shadow-sm">{formatScore(bestScore)}</div>
            </div>
          )}
        </div>

        <div className="flex md:hidden"><Controls {...controls} compact /></div>
      </div>

      {/* CENTER: Wave Controls (stacks under the main header on mobile) */}
      <WaveControls
        wave={wave} totalWaves={totalWaves} streak={streak} idle={idle} earlyBonus={earlyBonus}
        gameState={gameState} waveInProgress={waveInProgress} autoPlay={autoPlay}
        nextWavePreview={nextWavePreview} onStartWave={onStartWave} onToggleAutoPlay={onToggleAutoPlay}
      />

      <div className="hidden md:flex"><Controls {...controls} /></div>
    </header>
  );
}

export default memo(HUD);

const COINS_ICON = <Coins className="w-5 h-5 text-[#FFC800]" />;
const HEART_ICON = <Heart className="w-5 h-5 text-[#EA2B2B]" />;

/** Credits or lives. The number gives a small bump when it changes. */
function StatPill({ kind, value }) {
  const numRef = useRef(null);
  const last = useRef(value);
  useEffect(() => {
    if (last.current === value) return;
    const down = value < last.current;
    last.current = value;
    // A life lost is the one change that must be seen at once.
    if (kind === 'lives' && down) {
      numRef.current?.animate?.(
        [{ transform: 'scale(1)', color: '#fff' }, { transform: 'scale(1.5)', color: '#fb7185' }, { transform: 'scale(1)', color: '#fff' }],
        { duration: 380, easing: 'ease-out' }
      );
    }
  }, [kind, value]);
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 rounded-2xl bg-slate-900 border-b-[3px] border-slate-950 font-black shadow-inner h-10 text-base sm:text-lg">
      {kind === 'coins' ? COINS_ICON : HEART_ICON}
      <span ref={numRef} className="tabular-nums text-white leading-none mt-0.5">{value}</span>
    </div>
  );
}
