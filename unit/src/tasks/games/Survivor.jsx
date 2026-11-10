// src/tasks/games/Survivor.jsx
//
// =====================================================================
// SWARM SURVIVOR — the arcade's second cabinet.
//
// Tower Defense's sibling, not its replacement. Same unit, same XP gold, same
// per-unit leaderboard, same artwork, same difficulty tier — a different verb.
// There you place towers and watch a road; here you ARE a tower, on foot, and
// the road is gone.
//
// The shell owns everything the simulation should not: which hero was picked and
// what the gold bought, the rasterised sprite atlas, the level-up draft and its
// question, and reporting the run's best score back to the unit exactly the way
// TowerDefense.jsx does (persist locally, submit the BEST run on exit, let
// saveScore fold it into the unit's GAMES record in one atomic update).
// =====================================================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { THEME_TRIBE } from '../../components/towerdefense/gameData';
import ExitConfirmModal from '../../components/towerdefense/ExitConfirmModal';
import SpriteForge from '../../components/survivor/spriteForge';
import SurvivorCanvas from '../../components/survivor/SurvivorCanvas';
import {
  createRun, applyUpgrade, resumeAfterLevel, useSurvivorEngine, hudSnapshot,
} from '../../components/survivor/useSurvivorEngine';
import {
  HEROES, loadoutEffects, rollUpgrades, RUN,
} from '../../components/survivor/survivorData';
import { makeChallengeBank } from '../../components/survivor/survivorChallenges';
import {
  LoadoutScreen, SurvivorHUD, SquadBar, LevelUpModal, RunEndModal, ForgeSplash,
} from '../../components/survivor/SurvivorUI';
import { fmtTime } from '../../components/survivor/format';
import { sfx, isMuted, toggleMuted, unlockAudio } from '../../arcade/sfx';

const KEY_MAP = {
  KeyW: 'up', ArrowUp: 'up',
  KeyS: 'down', ArrowDown: 'down',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
};

export default function Survivor({
  gameConfig = { themeId: 'STANDARD', tierLabel: 'Recruit', difficulty: {} },
  pool = [],
  startingCredits = 150,
  unitId = 'default',
  // Which unit's arithmetic generator the level-up questions use. Defaults to
  // `unitId`; the standalone Arcade passes a different id so the level owns the
  // leaderboard while questions follow the student's study (see Survivor's
  // twin, TowerDefense.jsx, and arcade/questionSource.js).
  mathUnitId = unitId,
  onQuit = () => {},
  onComplete = () => {},
  // Fired once, when the loadout deploys — the Arcade charges its gold here, so
  // backing out of the loadout screen costs nothing.
  onStart,
  // Overrides the loadout's line about where the purse came from (the Arcade
  // hands out a flat budget, not banked unit XP).
  purseNote,
  // Fired each time a run ends, with that run's score, so the Arcade can bank
  // it at once rather than only on Exit.
  onRunEnd,
  // What "Play Again" costs here, if anything: { cost, canAfford, onCharge }.
  replay = null,
}) {
  const themeId = gameConfig.themeId || 'STANDARD';
  const tribeId = THEME_TRIBE[themeId] || 'INSECT';

  const [sprites, setSprites] = useState(null);
  const [deployed, setDeployed] = useState(null);
  const [runId, setRunId] = useState(0);

  // The run's high score for this unit, mirroring TD's `td_best_` key so the two
  // games keep separate personal bests even though they share the leaderboard.
  const [bestScore, setBestScore] = useState(() => {
    try { return Number(localStorage.getItem(`surv_best_${unitId}`)) || 0; } catch { return 0; }
  });
  const bestRef = useRef(bestScore);
  useEffect(() => { bestRef.current = bestScore; }, [bestScore]);
  // The best run of THIS sitting. The localStorage best belongs to the device,
  // not the student — on a shared classroom tablet it may be someone else's, so
  // it is shown as the score to beat but never submitted to the leaderboard.
  const sessionBestRef = useRef(0);

  // Forging starts the moment the student walks in, so by the time they have
  // chosen a hero and spent their gold the atlas is already warm.
  const handleSprites = useCallback((atlas) => setSprites(atlas), []);

  // Whether the run that just ended beat this device's best — decided before
  // the best is updated, and strictly, so a tie is not announced as a record.
  const [newBest, setNewBest] = useState(false);

  const bankBest = useCallback((score) => {
    sessionBestRef.current = Math.max(sessionBestRef.current, score);
    setNewBest(score > bestRef.current && score > 0);
    onRunEnd?.(score);
    if (score > bestRef.current) {
      bestRef.current = score;
      try { localStorage.setItem(`surv_best_${unitId}`, String(score)); } catch { /* private mode */ }
      setBestScore(score);
    }
  }, [unitId, onRunEnd]);

  const finish = useCallback((score) => {
    sessionBestRef.current = Math.max(sessionBestRef.current, score);
    // Submit the best run of the session, not whatever was on screen at exit —
    // the same rule Tower Defense follows, so "Play Again" can never cost a
    // student their high score.
    onComplete(Math.max(score, sessionBestRef.current));
    onQuit();
  }, [onComplete, onQuit]);

  // In the Arcade a replay is another play, and costs what a play costs.
  const retry = useCallback(() => {
    if (replay) {
      if (!replay.canAfford) { sfx('deny'); return; }
      replay.onCharge?.();
    }
    setNewBest(false);
    setRunId(n => n + 1);
  }, [replay]);

  if (!deployed) {
    return (
      <>
        {!sprites && <SpriteForge tribeId={tribeId} onReady={handleSprites} />}
        <LoadoutScreen
          gold={startingCredits}
          tierLabel={gameConfig.tierLabel || 'Recruit'}
          mapName={gameConfig.mapName || 'The Open Field'}
          briefing={gameConfig.briefing}
          purseNote={purseNote}
          onDeploy={(d) => { unlockAudio(); onStart?.(); setDeployed(d); }}
          onBack={onQuit}
        />
      </>
    );
  }

  if (!sprites) {
    return (
      <>
        <SpriteForge tribeId={tribeId} onReady={handleSprites} />
        <ForgeSplash />
      </>
    );
  }

  return (
    <SurvivorRun
      key={runId}
      deployed={deployed}
      sprites={sprites}
      themeId={themeId}
      gameConfig={gameConfig}
      pool={pool}
      mathUnitId={mathUnitId}
      bestScore={bestScore}
      newBest={newBest}
      replay={replay}
      onBank={bankBest}
      onRetry={retry}
      onFinish={finish}
    />
  );
}

// =====================================================================
// One run. Remounted (via `key`) for a retry, so the engine loop and every
// closure inside it start genuinely fresh rather than being reset by hand.
// =====================================================================

function SurvivorRun({
  deployed, sprites, themeId, gameConfig, pool, mathUnitId, bestScore, newBest, replay, onBank, onRetry, onFinish,
}) {
  const hero = useMemo(
    () => HEROES.find(h => h.typeId === deployed.heroId) || HEROES[0],
    [deployed.heroId]
  );

  // Built exactly once, on the first render of this run. Held in state purely so
  // it can be constructed lazily without reading a ref mid-render; the ref is
  // what the loop and the canvas actually reach through, every frame.
  const [run] = useState(() => createRun({
    hero,
    loadout: loadoutEffects(deployed.counts),
    difficulty: gameConfig.difficulty || {},
  }));
  const gRef = useRef(run);
  // Dev only: lets the preview harness's test bot read the simulation.
  useEffect(() => {
    if (import.meta.env.DEV) window.__survivor = gRef;
  }, []);

  // The engine's per-frame commit. It publishes a snapshot rather than a bare
  // tick, so every React screen below reads plain values and the mutable run
  // object stays where only the loop and the canvas touch it.
  const [hud, setHud] = useState(() => hudSnapshot(run));
  const render = useCallback(() => setHud(hudSnapshot(run)), [run]);

  const inputRef = useRef({ keys: new Set(), pointerDown: false, wx: 0, wy: 0, stick: false, sx: 0, sy: 0, dash: false });
  const pausedRef = useRef(false);
  // The canvas registers its painter here; the engine calls it every frame.
  const drawRef = useRef(null);

  const [showHint, setShowHint] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [muted, setMutedState] = useState(() => isMuted());
  const toggleMute = useCallback(() => setMutedState(toggleMuted()), []);
  const togglePause = useCallback(() => setUserPaused(p => !p), []);
  // Leaving the tab pauses the run, so the student comes back to "Paused" and
  // not to a fight that restarts the instant the page is visible again.
  useEffect(() => {
    const onVis = () => { if (document.hidden) setUserPaused(true); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  const dash = useCallback(() => { inputRef.current.dash = true; setShowHint(false); }, []);

  const [draft, setDraft] = useState(null);     // { cards, challenge, level }
  // The results card is built from a SNAPSHOT taken when the run ends, not from
  // the live simulation — the loop has stopped by then, and reading a mutable
  // ref while rendering a static screen is asking for a stale number.
  const [ended, setEnded] = useState(null);
  const [showExit, setShowExit] = useState(false);
  const askQuit = useCallback(() => setShowExit(true), []);

  // The unit's own question bank — its vocabulary and its arithmetic generator.
  const nextChallenge = useMemo(() => makeChallengeBank(pool, mathUnitId), [pool, mathUnitId]);

  // ---- engine callbacks ------------------------------------------------

  const openDraft = useCallback(() => {
    const cards = rollUpgrades(gRef.current);
    if (cards.length === 0) {
      // Nothing left to offer (everything maxed) — take every pending level
      // silently. Resuming just one would leave the state at LEVELUP with no
      // modal open, and the engine only opens a draft from PLAYING: a frozen run.
      gRef.current.pendingLevels = 0;
      gRef.current.state = 'PLAYING';
      return;
    }
    setDraft({
      level: gRef.current.hero.level,
      cards,
      challenge: nextChallenge ? nextChallenge() : null,
    });
  }, [nextChallenge]);

  const handleRunEnd = useCallback((outcome, score) => {
    const run = gRef.current;
    setEnded(prev => prev || {
      outcome, score,
      kills: run.kills,
      combo: run.bestCombo,
      level: run.hero.level,
      time: fmtTime(run.t),
      bosses: run.bossKills,
    });
    onBank(score);
  }, [onBank]);

  useSurvivorEngine({
    gRef, render, inputRef,
    onLevelUp: openDraft,
    onRunEnd: handleRunEnd,
    pausedRef, drawRef,
  });

  // ---- input -----------------------------------------------------------

  useEffect(() => {
    const down = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.code === 'Escape') { setShowExit(true); return; }
      if (e.code === 'KeyM') { toggleMute(); return; }
      if (e.code === 'KeyP') { togglePause(); return; }
      if (e.code === 'Space' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        e.preventDefault();
        if (!e.repeat) dash();
        return;
      }
      const dir = KEY_MAP[e.code];
      if (dir) {
        e.preventDefault();
        inputRef.current.keys.add(dir);
        setShowHint(false);   // they know how to move; stop telling them
      }
    };
    const up = (e) => {
      const dir = KEY_MAP[e.code];
      if (dir) inputRef.current.keys.delete(dir);
    };
    // A tab switch mid-sprint would otherwise leave a key stuck down.
    const blur = () => inputRef.current.keys.clear();

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
    };
  }, [dash, toggleMute, togglePause]);

  // A second tap soon after the first is a dash — the touch equivalent of Space,
  // for a thumb that is already on the glass steering.
  const lastTapRef = useRef(0);
  const handlePointer = useCallback((patch) => {
    Object.assign(inputRef.current, patch);
    if (patch.pointerDown) {
      // The control hint has done its job the moment they touch the arena.
      setShowHint(false);
      const now = performance.now();
      if (now - lastTapRef.current < 280) dash();
      lastTapRef.current = now;
    }
  }, [dash]);

  // ...and it times out on its own for anyone reading rather than playing.
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Steering must stop while a modal is up, or the hero sprints into the swarm
  // behind the level-up screen.
  useEffect(() => {
    if (draft || ended || showExit) {
      inputRef.current.keys.clear();
      inputRef.current.pointerDown = false;
      inputRef.current.stick = false;
    }
    pausedRef.current = !!showExit || userPaused;
  }, [draft, ended, showExit, userPaused]);

  // ---- the draft -------------------------------------------------------

  const pickCard = useCallback((card, earned) => {
    const run = gRef.current;
    applyUpgrade(run, card);
    if (earned) run.score += Math.round(RUN.challengeScore * run.difficulty.scoreMul);
    resumeAfterLevel(run);
    setDraft(null);
    // Two levels can land in the same frame; the next screen opens straight away
    // rather than being swallowed.
    if (run.state === 'LEVELUP') setTimeout(openDraft, 0);
  }, [openDraft]);

  // ---- render ----------------------------------------------------------

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 text-white font-sans overflow-hidden touch-manipulation select-none">
      <SurvivorHUD
        hud={hud} muted={muted} paused={userPaused}
        onToggleMute={toggleMute} onTogglePause={togglePause}
        onQuit={askQuit}
      />

      <SurvivorCanvas
        gRef={gRef}
        drawRef={drawRef}
        sprites={sprites}
        themeId={themeId}
        onPointer={handlePointer}
      />

      <SquadBar squad={hud.squad} />

      {/* The dash, for thumbs. Keyboards have Space; a tablet has this. */}
      {!draft && !ended && (
        <button
          onPointerDown={(e) => { e.preventDefault(); dash(); }}
          aria-label="Dash"
          className={`absolute right-4 bottom-24 sm:right-6 sm:bottom-28 z-20 w-20 h-20 rounded-full flex flex-col items-center justify-center font-black uppercase tracking-widest text-[10px] border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all select-none touch-none
            ${hud.dashReady ? 'bg-sky-400 border-sky-600 text-sky-950 shadow-[0_0_24px_rgba(56,189,248,0.55)]' : 'bg-slate-700 border-slate-900 text-slate-400'}`}
        >
          <span className="text-2xl leading-none mb-0.5">💨</span>
          Dash
        </button>
      )}

      {userPaused && !draft && !ended && !showExit && (
        <button
          onClick={() => setUserPaused(false)}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-slate-950/60 text-white"
        >
          <span className="text-4xl font-black uppercase tracking-widest drop-shadow">Paused</span>
          <span className="text-xs font-black uppercase tracking-widest text-slate-300">Tap or press P to resume</span>
        </button>
      )}

      {/* One-time control hint, gone the moment the student starts moving. */}
      {showHint && !draft && !ended && (
        <div className="pointer-events-none absolute inset-x-0 top-[16%] flex justify-center px-6">
          <div className="bg-slate-950/80 rounded-2xl px-6 py-4 text-center border-b-4 border-black/60">
            <div className="font-black uppercase tracking-widest text-xs text-slate-400 mb-1">Move</div>
            <div className="font-black text-lg">Drag anywhere to walk · or use WASD</div>
            <div className="font-bold text-sm text-slate-300 mt-1">Dash with Space or the Dash button. Nothing can hurt you in a dash.</div>
            <div className="font-bold text-sm text-slate-400 mt-1">Your weapons fire by themselves. Stay alive.</div>
          </div>
        </div>
      )}

      {draft && !ended && (
        <LevelUpModal
          key={`lv${draft.level}`}
          level={draft.level}
          cards={draft.cards}
          challenge={draft.challenge}
          onPick={pickCard}
        />
      )}

      <ExitConfirmModal
        open={showExit}
        message="Your squad and your level-ups will be lost. Your best score is still kept."
        onCancel={() => setShowExit(false)}
        onConfirm={() => onFinish(gRef.current.score)}
      />

      {ended && (
        <RunEndModal
          score={ended.score}
          best={bestScore}
          newBest={newBest}
          replay={replay}
          combo={ended.combo}
          kills={ended.kills}
          time={ended.time}
          level={ended.level}
          bosses={ended.bosses}
          onRetry={onRetry}
          onExit={() => onFinish(ended.score)}
        />
      )}
    </div>
  );
}
