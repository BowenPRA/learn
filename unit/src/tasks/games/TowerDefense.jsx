import { useState, useEffect, useRef, useMemo, useCallback, useSyncExternalStore } from 'react';
import { TOWERS, TOWER_ORDER, ENEMIES, getSellValue, getEffectiveStats, THEME_TRIBE, TRIBE_PREVIEW_EMOJI } from '../../components/towerdefense/gameData';
import { MAP_LAYOUTS, WAVE_PRESETS, buildWaveSet } from '../../components/towerdefense/wavePresets';
import GameBoard from '../../components/towerdefense/GameBoard';
import BuildMenu from '../../components/towerdefense/BuildMenu';
import UpgradePanel from '../../components/towerdefense/UpgradePanel';
import VocabChallenge from '../../components/towerdefense/VocabChallenge';
import HUD from '../../components/towerdefense/HUD';
import ExitConfirmModal from '../../components/towerdefense/ExitConfirmModal';
import { useGameEngine } from '../../components/towerdefense/useGameEngine';
import { mathChallengeFor } from '../../components/towerdefense/mathChallenges';
import { canType, matchTyped } from '../../components/survivor/survivorChallenges';
import SpriteForge from '../../components/survivor/spriteForge';
import { sfx, isMuted, toggleMuted, unlockAudio } from '../../arcade/sfx';

const CHALLENGE_DURATION = 15;
// How long after one question the "Quiz" button can ask for another.
const QUIZ_COOLDOWN_MS = 20000;
const ALL_TOWER_IDS = ['DART', 'SNIPER', 'SPLASH', 'FROST', 'CHAIN', 'NITRO', 'UNICORN'];

// How often a unit that has BOTH bolts fires the maths one. Slightly maths-heavy
// because it is a maths course; vocab still shows up often enough to reinforce.
const MATH_CHALLENGE_RATIO = 0.6;

// Loose equality for typed/clicked answers: same case, spaces collapsed, and any
// flavour of minus normalised to '-', so "−3" / "-3" / " -3 " all match.
function normalizeAnswer(s) {
  return String(s ?? '').trim().toLowerCase().replace(/[−–—]/g, '-').replace(/\s+/g, '');
}

// Four plausible options around a numeric answer, including its sign-flip (the
// classic integer mistake). Returns null for a non-numeric answer.
function buildNumericChoices(answer) {
  const n = Number(answer);
  if (!Number.isFinite(n)) return null;
  const opts = new Set([n]);
  for (const c of [n + 1, n - 1, n + 2, n - 2, -n, n + 3, n - 3, n + 5]) {
    if (opts.size >= 4) break;
    opts.add(c);
  }
  let k = 4;
  while (opts.size < 4) opts.add(n + k++);
  return [...opts].map(String);
}

// For the "incoming wave" HUD preview — a friendly face per role slot, shown in a
// fixed order so the readout stays stable from wave to wave. The face follows the
// arena's tribe (insects / frostkin / nightfall).
const ENEMY_PREVIEW_ORDER = ['ANT', 'WASP', 'BEETLE', 'QUEEN', 'GIANT_ANT'];

/** Collapse a wave's spawn groups into one count per role slot, for the preview. */
function summarizeWave(wave, emojiMap) {
  if (!Array.isArray(wave)) return null;
  const totals = {};
  for (const grp of wave) totals[grp.type] = (totals[grp.type] || 0) + grp.count;
  const out = ENEMY_PREVIEW_ORDER
    .filter(t => totals[t])
    .map(t => ({ type: t, count: totals[t], emoji: (emojiMap && emojiMap[t]) || '👾' }));
  return out.length ? out : null;
}

function buildPathSet(path) {
  const s = new Set();
  for (let i = 0; i < path.length - 1; i++) {
    const [r1, c1] = path[i];
    const [r2, c2] = path[i + 1];
    const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
    const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) s.add(`${r}_${c}`);
    }
  }
  return s;
}

function generateDecorations(layout, pathSet) {
  const out = [];
  let id = 1;
  for (let r = 0; r < layout.rows; r++) {
    for (let c = 0; c < layout.cols; c++) {
      if (pathSet.has(`${r}_${c}`)) continue;
      if (Math.random() < 0.16) {
        out.push({ id: id++, row: r, col: c, variant: Math.floor(Math.random() * 5) });
      }
    }
  }
  return out;
}

/**
 * A callback whose identity never changes but which always runs the latest
 * version. The memoised panels (HUD, board, menus) take these, so a re-render
 * for the score does not hand them new props and re-render them all.
 */
function useStable(fn) {
  const ref = useRef(fn);
  useEffect(() => { ref.current = fn; });
  return useCallback((...args) => ref.current(...args), []);
}

// ---------------------------------------------------------------------
// The live panels.
//
// Credits and score change several times a second in a busy wave. They used to
// re-render this whole screen each time. Now the engine "ticks" a small store
// for those, and only these three wrappers listen: each reads the numbers it
// shows straight from the run (`g`) and hands them to its memoised panel. The
// screen itself re-renders only when the player does something or the wave,
// the lives or the result change.
// ---------------------------------------------------------------------

function makeTickStore() {
  let n = 0;
  const subs = new Set();
  return {
    bump() { n = (n + 1) % 1e9; subs.forEach(f => f()); },
    subscribe(f) { subs.add(f); return () => subs.delete(f); },
    get: () => n,
  };
}

function LiveHUD({ g, store, bestScore, earlyBonus, ...rest }) {
  useSyncExternalStore(store.subscribe, store.get);
  const canRush = g.waveInProgress && g.spawnQueue.length === 0 && g.gameState === 'PLAYING';
  return (
    <HUD
      credits={g.credits} lives={g.lives} wave={g.wave} score={g.score}
      bestScore={Math.max(bestScore, g.score)} speed={g.speed} gameState={g.gameState}
      waveInProgress={g.waveInProgress} streak={g.perfectStreak}
      earlyBonus={canRush ? earlyBonus : 0}
      {...rest}
    />
  );
}

function LiveBuildMenu({ g, store, allowedTowers, ...rest }) {
  useSyncExternalStore(store.subscribe, store.get);
  const affordable = allowedTowers.filter(id => TOWERS[id] && g.credits >= TOWERS[id].cost).join(',');
  return (
    <BuildMenu
      allowedTowers={allowedTowers} affordable={affordable} bolts={g.bolts}
      hasUnicorn={g.towers.some(t => t.typeId === 'UNICORN')}
      {...rest}
    />
  );
}

function LiveUpgradePanel({ g, store, selectedTowerId, ...rest }) {
  useSyncExternalStore(store.subscribe, store.get);
  const tower = g.towers.find(t => t.id === selectedTowerId) || null;
  const uni = g.towers.find(t => t.typeId === 'UNICORN') || null;
  const full = uni ? (getEffectiveStats(uni, g.towers)?.chargeTime || 1) : 1;
  const pct = uni ? Math.min(1, g.unicornCharge / full) : 0;
  return (
    <UpgradePanel
      tower={tower} towers={g.towers} credits={g.credits} towersVersion={g.towersVersion}
      unicornChargePct={pct} unicornReady={!!uni && pct >= 1}
      {...rest}
    />
  );
}

/** The final score, counted up — a run's result should arrive, not just appear. */
function CountUp({ value, ms = 900 }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return shown.toLocaleString();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TowerDefense({
  gameConfig = { mapId: 'WAVE', lives: 20, bannedTowers: [] },
  pool = [],
  startingCredits = 150,
  unitId = 'default',
  // Which unit's arithmetic generator the Maths Bolt uses. It defaults to
  // `unitId` so a unit's own arcade is unchanged, but the standalone Arcade
  // passes a DIFFERENT id here — the level (unitId) owns the leaderboard while
  // the questions follow what the student is studying (see arcade/questionSource).
  mathUnitId = unitId,
  themeId = 'STANDARD',
  onQuit = () => window.history.back(),
  onComplete = () => {},
  // Fired every time a run ends (win or lose) with that run's score, so the
  // Arcade can bank it at once — a student who plays again and then closes the
  // tab must not lose the run they just finished.
  onRunEnd,
  // What "Play Again" costs here, if anything: { cost, canAfford, onCharge }.
  // The Arcade charges gold per play; a unit's own game passes nothing (free).
  replay = null,
}) {
  const layout = MAP_LAYOUTS[gameConfig.mapId] || MAP_LAYOUTS.WAVE;
  const lives = gameConfig.lives || 20;

  // Calculate specific limits dynamically based on the Hub rules
  const allowedTowers = useMemo(() => {
    const banned = gameConfig.bannedTowers || [];
    return ALL_TOWER_IDS.filter(t => !banned.includes(t));
  }, [gameConfig.bannedTowers]);

  // The order the BuildMenu shows towers in — also the 1–6 hotkey order, so the
  // number badge on each button matches the key that builds it.
  const buildableOrder = useMemo(
    () => TOWER_ORDER.filter(id => allowedTowers.includes(id)),
    [allowedTowers]
  );

  // The 50 authored waves for this level, reshaped by the unit's composition
  // modifier (Swarm/Siege/…). With no modifier this is the shared SET_1 itself,
  // so every level and track that doesn't opt in is byte-for-byte unchanged.
  const waves = useMemo(() => buildWaveSet(gameConfig.waveMod), [gameConfig.waveMod]);
  const totalWaves = waves.length;

  const pathSet = useMemo(() => buildPathSet(layout.path), [layout.path]);

  // Straight from the unit's Vocab task (unit.realWords). We carry the example
  // sentence and the Vietnamese gloss (and the French, on Year 7) too, so the
  // challenge can reinforce the term after answering rather than just testing
  // it. Words with no definition
  // are dropped so a half-authored entry can't produce a blank prompt.
  const vocab = useMemo(() => {
    const words = (pool || [])
      .filter(w => w?.word && (w.def || w.vnDef))
      .map(w => ({ word: w.word, def: w.def || w.vnDef || '', sent: w.sent || '', vn: w.vn || '', fr: w.fr || '' }));
    return words.length > 0 ? words : null;
  }, [pool]);

  // The unit's arithmetic question generator (maths tracks only); null elsewhere,
  // leaving those units on vocab-only challenges exactly as before.
  const mathGen = useMemo(() => mathChallengeFor(mathUnitId), [mathUnitId]);

  const activeThemeId = useMemo(() => {
    const requestedTheme = gameConfig.themeId || themeId;
    if (requestedTheme === 'RANDOM') {
      const themes = ['STANDARD', 'NIGHT', 'ICE', 'DESERT'];
      return themes[Math.floor(Math.random() * themes.length)];
    }
    return requestedTheme;
  }, [gameConfig.themeId, themeId]);

  // The enemy tribe that defends this arena, derived from the theme. Drives both
  // the engine's spawns (skins) and the HUD's incoming-wave icons.
  const tribeId = useMemo(() => THEME_TRIBE[activeThemeId] || 'INSECT', [activeThemeId]);
  const previewEmoji = TRIBE_PREVIEW_EMOJI[tribeId] || TRIBE_PREVIEW_EMOJI.INSECT;

  const basicEnemyType = useMemo(() => {
    return waves?.[0]?.[0]?.type || Object.keys(ENEMIES)[0];
  }, [waves]);

  // The difficulty object is per unit (see unitDifficulty.js). It is part of the
  // engine config rather than a prop because the engine reads it once when the
  // loop starts — changing it mid-run would desync scores from the waves.
  const engineConfig = useMemo(() => ({
    waves,
    generateInfiniteWave: WAVE_PRESETS.INFINITE_GENERATOR,
    difficulty: gameConfig.difficulty,
    tribeId
  }), [waves, gameConfig.difficulty, tribeId]);

  const gRef = useRef(null);
  
  // Re-initialize state safely if unmounted/remounted
  if (gRef.current === null) {
    gRef.current = {
      credits: startingCredits, lives, maxLives: lives, wave: 0, score: 0, bolts: 0,
      speed: 1, gameState: 'PLAYING',
      towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      // Cosmetics the painter draws and the engine ages: death bits, the ids of
      // towers that fired this frame (for their recoil), the banner, the shake.
      shards: [], fired: [], banner: null, shake: 0, hurt: 0, time: 0,
      // The run's tally, for the results screen and the perfect-wave streak.
      kills: 0, leaks: 0, leaksThisWave: 0, perfectStreak: 0, towersBuilt: 0, paused: false,
      decorations: generateDecorations(layout, pathSet),
      waveInProgress: false, spawnQueue: [], spawnTimer: 0,
      fireCooldowns: {}, nextId: 1, challengeTimer: Infinity, wave5ChallengeSpawned: false,
      usedVocab: {}, // Changed from [] to {} to track usage per mode
      autoPlayDelay: 0,
      // Unicorn super-weapon: charge (ms) accrues in the engine; unicornFire is a
      // one-shot {row,col} the player queues by aiming, consumed on the next frame.
      unicornCharge: 0, unicornFire: null,
      // A Reward Blast the player has asked for; the engine sets it off on its
      // next step so its kills score and burst like any other.
      boltFire: false,
      // Stamped on every build/sell/upgrade so the effective-stats cache and the
      // memoised tower layer know the board actually changed.
      towersVersion: 0
    };
  }
  const g = gRef.current;
  // Dev only: lets a test bot read the simulation (Survivor does the same).
  useEffect(() => {
    if (import.meta.env.DEV) window.__td = gRef;
  }, []);

  // Stable across renders: the engine keeps this for the lifetime of its loop.
  const [, setTick] = useState(0);
  const [store] = useState(makeTickStore);
  // A full render also ticks the store, so the live panels never lag behind it.
  const render = useCallback(() => { setTick(t => (t + 1) % 1e9); store.bump(); }, [store]);

  const [selectedTowerId, setSelectedTowerId] = useState(null);
  const [hoveredTowerId] = useState(null);
  const [activeBuilder, setActiveBuilder] = useState(null);
  const [hoverCell, setHoverCell] = useState({ row: -1, col: -1, valid: false });
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  // True while the player is aiming the unicorn's rainbow lance: the next board
  // tap fires it. Read through a ref by the memoised board handlers.
  const [aiming, setAiming] = useState(false);
  const aimingRef = useRef(false);
  useEffect(() => { aimingRef.current = aiming; }, [aiming]);

  const autoPlayRef = useRef(false);
  // Read once, lazily — an effect that setState'd on mount showed 0 for a frame
  // and re-rendered the whole board to correct itself.
  const [bestScore, setBestScore] = useState(() => {
    try { return Number(localStorage.getItem(`td_best_${unitId}`)) || 0; } catch { return 0; }
  });

  const [challenge, setChallenge] = useState(null);
  const [challengeInput, setChallengeInput] = useState('');
  const [challengeTimeLeft, setChallengeTimeLeft] = useState(0);
  const [challengeShakeKey, setChallengeShakeKey] = useState(0);
  const challengeActiveRef = useRef(false);
  // Latches once a challenge is answered so the reward/penalty is paid exactly
  // once; cleared when the next challenge opens.
  const challengeResolvedRef = useRef(false);

  const boardWrapperRef = useRef(null);
  const [boardScale, setBoardScale] = useState(1);

  // The board's canvas registers its painter here; the engine calls it once per
  // display frame. The sprite atlas is forged once from the real enemy artwork.
  const drawRef = useRef(null);
  const [sprites, setSprites] = useState(null);
  const handleSprites = useCallback((atlas) => setSprites(atlas), []);

  const [userPaused, setUserPaused] = useState(false);
  // When the "Quiz" button may next ask a question (a performance.now() time).
  const [quizReadyAt, setQuizReadyAt] = useState(0);
  // A hidden tab stops the battle (the browser stops the frames), so it must
  // stop the question's countdown too, or the timer runs out unseen.
  const [tabHidden, setTabHidden] = useState(() => typeof document !== 'undefined' && document.hidden);
  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  const [muted, setMutedState] = useState(() => isMuted());
  const handleToggleMute = useCallback(() => setMutedState(toggleMuted()), []);
  const handleTogglePause = useCallback(() => { unlockAudio(); setUserPaused(p => !p); }, []);

  useGameEngine({
    gRef, render, softRender: store.bump, layout, engineConfig,
    onTriggerChallenge: buildChallengeTrigger,
    onAutoStartWave: handleStartWave,
    challengeActiveRef, autoPlayRef, drawRef
  });

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        const bw = layout.cols * 48; 
        const bh = layout.rows * 48;
        const scale = Math.min((width - 16) / bw, (height - 16) / bh);
        setBoardScale(Math.max(0.5, Math.min(scale, 2.5)));
      }
    });
    if (boardWrapperRef.current) obs.observe(boardWrapperRef.current);
    return () => obs.disconnect();
  }, [layout]);

  // The mid-game challenge fires as either a Vocab Bolt (from the unit's words)
  // or, on the maths tracks, a Maths Bolt (arithmetic matched to the unit —
  // mathChallenges.js). Units with both draw maths a bit more often, since it is
  // a maths course; units with only one always get that one.
  function buildChallengeTrigger() {
    const hasVocab = vocab && vocab.length > 0;
    const hasMath = !!mathGen;
    if (!hasVocab && !hasMath) return;
    const useMath = hasMath && (!hasVocab || Math.random() < MATH_CHALLENGE_RATIO);
    if (useMath) triggerMathChallenge();
    else triggerVocabChallenge();
  }

  function triggerMathChallenge() {
    const q = mathGen();
    let mode, choices = null;
    if (q.choices) {                       // fixed options (e.g. Yes/No)
      mode = 'CHOICE';
      choices = shuffle(q.choices);
    } else {
      mode = Math.random() < 0.5 ? 'TYPE' : 'CHOICE';
      if (mode === 'CHOICE') {
        const nc = buildNumericChoices(q.answer);
        choices = nc ? shuffle(nc) : null;
        if (!choices) mode = 'TYPE';        // non-numeric answer → type it
      }
    }
    challengeActiveRef.current = true;
    challengeResolvedRef.current = false;
    setQuizReadyAt(performance.now() + QUIZ_COOLDOWN_MS);
    setChallenge({ kind: 'MATH', mode, prompt: q.prompt, answer: String(q.answer), choices });
    setChallengeInput('');
    setChallengeTimeLeft(CHALLENGE_DURATION);
  }

  function triggerVocabChallenge() {
    // 1. Compile a list of all available specific questions (Word + Mode)
    let available = [];
    vocab.forEach(v => {
      const usage = g.usedVocab[v.word] || { TYPE: false, CHOICE: false };
      if (!usage.TYPE && canType(v.word)) available.push({ item: v, mode: 'TYPE' });
      if (!usage.CHOICE) available.push({ item: v, mode: 'CHOICE' });
    });

    // 2. Endless looping - if all specific questions are used, reset the tracker to ensure endless play
    if (available.length === 0) {
      g.usedVocab = {};
      vocab.forEach(v => {
        if (canType(v.word)) available.push({ item: v, mode: 'TYPE' });
        available.push({ item: v, mode: 'CHOICE' });
      });
    }

    // 3. Pick one specific challenge at random
    const { item, mode } = available[Math.floor(Math.random() * available.length)];

    // 4. Mark exactly that mode as used for that word so it gets removed from the bank
    if (!g.usedVocab[item.word]) g.usedVocab[item.word] = { TYPE: false, CHOICE: false };
    g.usedVocab[item.word][mode] = true;

    // 5. Generate distractors if CHOICE
    let choices = null;
    if (mode === 'CHOICE') {
      const others = vocab.filter(x => x.word.toLowerCase() !== item.word.toLowerCase());
      const distractors = shuffle(others).slice(0, 3).map(x => x.word);
      choices = shuffle([item.word, ...distractors]);
    }

    challengeActiveRef.current = true;
    challengeResolvedRef.current = false;
    setQuizReadyAt(performance.now() + QUIZ_COOLDOWN_MS);
    // `others`: the unit's other words, so a typed answer that is really one of
    // them is not waved through as a typo of this one.
    const others = vocab.filter(x => x !== item).map(x => x.word);
    setChallenge({ kind: 'VOCAB', mode, word: item.word, answer: item.word, def: item.def, sent: item.sent, vn: item.vn, fr: item.fr, choices, others });
    setChallengeInput('');
    setChallengeTimeLeft(CHALLENGE_DURATION);
  }

  function closeChallenge() {
    challengeActiveRef.current = false;
    setChallenge(null);
    setChallengeInput('');
  }

  // Every answer ends by revealing the term (word + sentence + gloss) so it is
  // learned, not just tested. The modal stays up on a `result` for a beat before
  // an effect closes it; the reward/penalty is applied once. The ref guard makes
  // a double call (e.g. the timer firing as the player clicks, or StrictMode's
  // double-invoke) a no-op so the bolt/penalty can't be paid twice.
  function resolveChallenge(correct, penalty) {
    if (!challenge || challengeResolvedRef.current) return;
    challengeResolvedRef.current = true;
    if (correct) awardChallengeWin();
    else if (penalty) punishChallengeFail();
    setChallenge(cur => (cur ? { ...cur, result: { correct } } : cur));
  }

  function awardChallengeWin() {
    g.bolts += 1;
    g.score += 50;
    g.floaters.push({ id: g.nextId++, text: '⚡ +1 BOLT', row: 1, col: layout.cols / 2, kind: 'bolt', life: 1500, maxLife: 1500 });
    g.banner = { text: 'Correct!', sub: '+1 bolt · +50 score', tone: 'good', life: 1500, maxLife: 1500 };
    sfx('correct');
  }

  function punishChallengeFail() {
    const count = Math.max(1, Math.floor(g.wave / 2));
    g.spawnQueue.unshift({ type: basicEnemyType, count, interval: 350 });
    g.spawnTimer = 9999;
    g.floaters.push({ id: g.nextId++, text: `+${count} 👾`, row: 1, col: layout.cols / 2, kind: 'bad', life: 1600, maxLife: 1600 });
    sfx('wrong');
  }

  // Countdown for the vocab challenge. The expiry runs inside the timer callback
  // rather than in the effect body, so running out of time is handled as the
  // event it is instead of a state change made during render commit.
  useEffect(() => {
    if (!challenge || challenge.result || challengeTimeLeft <= 0 || showExitConfirm || tabHidden) return;
    const t = setTimeout(() => {
      if (challengeTimeLeft <= 1) {
        // Running out reveals the word too; only CHOICE carries the spawn penalty
        // (typing is left forgiving, as it was before the reveal existed).
        resolveChallenge(false, challenge.mode === 'CHOICE');
      } else {
        setChallengeTimeLeft(s => s - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge, challengeTimeLeft, showExitConfirm, tabHidden]);

  // Hold the reveal for a beat, then close. Keyed on the result so it arms once.
  useEffect(() => {
    if (!challenge?.result) return;
    const t = setTimeout(closeChallenge, 1600);
    return () => clearTimeout(t);
  }, [challenge?.result]);

  // Keyboard controls (desktop QoL). Space/Enter starts the next wave, 1–6 pick a
  // tower to build, Esc cancels. Suppressed while the vocab challenge input has
  // focus so typing an answer never fires a hotkey.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (challengeActiveRef.current) return;
      if (g.gameState !== 'PLAYING') return;
      if (e.code === 'KeyM') { handleToggleMute(); return; }
      // The exit dialog is up: Space/Enter belong to its buttons, not to the wave.
      if (showExitConfirmRef.current) return;
      if (e.code === 'KeyP') { handleTogglePause(); return; }
      if (g.paused) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleStartWave();
        return;
      }
      if (e.code === 'Escape') {
        setActiveBuilder(null);
        setSelectedTowerId(null);
        setAiming(false);
        setHoverCell({ row: -1, col: -1, valid: false });
        return;
      }
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= buildableOrder.length) {
        const typeId = buildableOrder[n - 1];
        const conf = TOWERS[typeId];
        const soldOut = conf?.singleton && g.towers.some(t => t.typeId === typeId);
        if (conf && !soldOut && g.credits >= conf.cost) {
          setActiveBuilder(prev => (prev?.typeId === typeId ? null : { typeId }));
          setSelectedTowerId(null);
          setAiming(false);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildableOrder, g]);

  // A wave can be RUSHED — sent on top of the one still on the road — once that
  // one has finished spawning. It pays the clear bonus the player is giving up
  // by not waiting, and a little more for the nerve.
  const earlyBonus = Math.round(65 * (Number(gameConfig.difficulty?.rewardMul) > 0 ? Number(gameConfig.difficulty.rewardMul) : 1));

  function handleStartWave() {
    if (g.gameState !== 'PLAYING' || g.paused) return;
    const rushing = g.waveInProgress;
    if (rushing && g.spawnQueue.length > 0) return;
    unlockAudio();
    let data;
    if (g.wave < engineConfig.waves.length) {
      data = engineConfig.waves[g.wave];
    } else if (engineConfig.generateInfiniteWave) {
      data = engineConfig.generateInfiniteWave(g.wave);
    } else return; 

    // Appended, not assigned: a challenge penalty that landed between waves is
    // already queued, and overwriting it would show the "+N" and then drop it.
    g.spawnQueue = [...g.spawnQueue, ...data.map(w => ({ ...w }))];
    g.spawnTimer = 9999;
    g.wave += 1;
    g.waveInProgress = true;
    if (g.wave === 5 && !g.wave5ChallengeSpawned) g.challengeTimer = 8000;

    if (rushing) {
      g.credits += earlyBonus;
      g.score += Math.round(earlyBonus * 2);
      g.floaters.push({ id: g.nextId++, text: `RUSH +${earlyBonus}`, row: 1, col: layout.cols / 2, kind: 'bolt', life: 1400, maxLife: 1400 });
    } else {
      g.leaksThisWave = 0;
    }

    // Name the wave as it starts, and say so loudly when it carries a boss.
    const hasBoss = data.some(w => w.type === 'GIANT_ANT' || w.type === 'QUEEN');
    g.banner = hasBoss
      ? { text: `Wave ${g.wave} — Boss`, sub: 'Something big is coming', tone: 'boss', life: 2400, maxLife: 2400 }
      : { text: `Wave ${g.wave}`, sub: null, tone: 'plain', life: 1200, maxLife: 1200 };
    sfx(hasBoss ? 'boss' : 'waveStart');
    render();
  }

  // The board's handlers are memoised because GameBoard's layers are memoised:
  // a handler recreated on every render is a new prop identity, which defeats
  // every memo it is passed to and forced the whole tower layer — twenty-odd
  // full SVG trees — to reconcile on every frame. They read mutable state
  // through refs so they can stay stable without going stale.
  const activeBuilderRef = useRef(null);
  const hoverCellRef = useRef(hoverCell);
  useEffect(() => { activeBuilderRef.current = activeBuilder; }, [activeBuilder]);
  useEffect(() => { hoverCellRef.current = hoverCell; }, [hoverCell]);

  const handleCellClick = useCallback((r, c, isPath) => {
    // Aiming the unicorn: the tap picks the target line and queues the shot for
    // the engine (which fires it on the next frame). Path cells are fair game —
    // the lance sweeps right over the road.
    if (aimingRef.current) {
      g.unicornFire = { row: r, col: c };
      setAiming(false);
      setHoverCell({ row: -1, col: -1, valid: false });
      render();
      return;
    }
    const builder = activeBuilderRef.current;
    if (builder) {
      // A tap that cannot build says so: a buzz and a red flash on the square.
      if (isPath || g.towers.some(t => t.row === r && t.col === c)) {
        sfx('deny');
        g.particles.push({ id: g.nextId++, row: r, col: c, radius: 0.55, color: 'rgba(234,43,43,0.55)', life: 260, maxLife: 260 });
        setHoverCell({ row: r, col: c, valid: false });
        return;
      }
      const conf = TOWERS[builder.typeId];
      // Singleton towers (the unicorn) — only ever one on the board.
      if (conf.singleton && g.towers.some(t => t.typeId === builder.typeId)) {
        setActiveBuilder(null);
        setHoverCell({ row: -1, col: -1, valid: false });
        return;
      }
      if (g.credits < conf.cost) { sfx('deny'); return; }
      g.credits -= conf.cost;
      g.towers.push({ id: g.nextId++, typeId: builder.typeId, row: r, col: c, upgrades: {}, kills: 0, dealt: 0 });
      g.towersVersion++;
      g.towersBuilt += 1;
      g.particles.push({ id: g.nextId++, row: r, col: c, radius: 0.9, color: 'rgba(255,255,255,0.5)', life: 320, maxLife: 320 });
      g.floaters.push({ id: g.nextId++, text: `-${conf.cost}`, row: r - 0.3, col: c, kind: 'gold', life: 700, maxLife: 700 });
      unlockAudio();
      sfx('place');
      setActiveBuilder(null);
      setHoverCell({ row: -1, col: -1, valid: false });
      render();
    } else setSelectedTowerId(null);
  }, [g, render]);

  const handleCellHover = useCallback((r, c, isPath) => {
    // While aiming, track the pointer so the rainbow aim line follows it.
    if (aimingRef.current) {
      const hc = hoverCellRef.current;
      if (hc.row === r && hc.col === c) return;
      setHoverCell({ row: r, col: c, valid: true });
      return;
    }
    const builder = activeBuilderRef.current;
    const hc = hoverCellRef.current;
    if (!builder) {
      if (hc.row !== -1) setHoverCell({ row: -1, col: -1, valid: false });
      return;
    }
    if (hc.row === r && hc.col === c) return;

    const valid = !isPath && !g.towers.some(t => t.row === r && t.col === c);
    setHoverCell({ row: r, col: c, valid });
  }, [g]);

  const handleTowerClick = useCallback((id) => {
    if (activeBuilderRef.current) { setActiveBuilder(null); return; }
    // A tower tap while aiming cancels the aim rather than selecting.
    if (aimingRef.current) { setAiming(false); return; }
    // Tapping the unicorn is how you fire it: if it's charged, that tap arms aim
    // mode and the next square-tap draws the beam. While it's still charging, the
    // tap selects it as normal so its upgrades stay reachable.
    const t = g.towers.find(x => x.id === id);
    if (t && t.typeId === 'UNICORN') {
      const st = getEffectiveStats(t, g.towers);
      if (g.unicornCharge >= (st?.chargeTime || Infinity)) {
        setSelectedTowerId(null);
        setHoverCell({ row: -1, col: -1, valid: false });
        setAiming(true);
        return;
      }
    }
    setSelectedTowerId(id);
  }, [g]);

  const handleCellLeave = useCallback(
    () => setHoverCell({ row: -1, col: -1, valid: false }), []
  );

  function handleUpgrade(key) {
    const t = g.towers.find(x => x.id === selectedTowerId);
    if (!t) return;
    const conf = TOWERS[t.typeId];
    const upg = conf.upgrades[key];
    if (!upg || t.upgrades[key] || g.credits < upg.cost) return;
    g.credits -= upg.cost;
    t.upgrades = { ...t.upgrades, [key]: true };
    g.towersVersion++;
    g.particles.push({ id: g.nextId++, row: t.row, col: t.col, radius: 1.1, color: 'rgba(255,200,0,0.5)', life: 420, maxLife: 420 });
    g.floaters.push({ id: g.nextId++, text: `${upg.label}!`, row: t.row - 0.4, col: t.col, kind: 'bolt', life: 1000, maxLife: 1000 });
    sfx('upgrade');
    render();
  }

  /** Free and instant: who this tower shoots first. See TARGET_MODES. */
  function handleSetTargetMode(mode) {
    const t = g.towers.find(x => x.id === selectedTowerId);
    if (!t) return;
    t.targetMode = mode;
    // Stamped so the memoised upgrade panel sees the change.
    g.towersVersion++;
    sfx('click');
    render();
  }

  function handleSell() {
    const t = g.towers.find(x => x.id === selectedTowerId);
    if (!t) return;
    const refund = getSellValue(t);
    g.floaters.push({ id: g.nextId++, text: `+${refund}`, row: t.row - 0.3, col: t.col, kind: 'gold', life: 800, maxLife: 800 });
    g.credits += refund;
    g.towers = g.towers.filter(x => x.id !== selectedTowerId);
    g.towersVersion++;
    delete g.fireCooldowns[t.id];
    setSelectedTowerId(null);
    sfx('sell');
    render();
  }

  // A Reward Blast hits everything on the road. The engine sets it off (see
  // useGameEngine), so its kills pay, score and burst like a tower's.
  function handleUseBolt() {
    if (g.bolts <= 0 || g.gameState !== 'PLAYING') return;
    g.bolts -= 1;
    g.boltFire = true;
    unlockAudio();
    render();
  }

  // The "Quiz" button: ask for a question now, to earn a bolt.
  function handleQuiz() {
    if (challengeActiveRef.current || g.gameState !== 'PLAYING' || g.paused) return;
    if (performance.now() < quizReadyAt) { sfx('deny'); return; }
    unlockAudio();
    buildChallengeTrigger();
  }

  function handleChallengeSubmit(e) {
    e.preventDefault();
    if (!challenge || challenge.mode !== 'TYPE' || challenge.result) return;
    if (!challengeInput.trim()) return;
    // A number is right or wrong; a word may carry a spelling slip, and the
    // reveal that follows shows how it is spelled.
    const right = challenge.kind === 'MATH'
      ? normalizeAnswer(challengeInput) === normalizeAnswer(challenge.answer)
      : !!matchTyped(challengeInput, challenge.answer, challenge.others);
    if (right) resolveChallenge(true, false);
    else { setChallengeShakeKey(k => k + 1); setChallengeInput(''); }
  }

  function handleChallengeChoice(choice) {
    if (!challenge || challenge.mode !== 'CHOICE' || challenge.result) return;
    const correct = normalizeAnswer(choice) === normalizeAnswer(challenge.answer);
    resolveChallenge(correct, !correct);
  }

  function handleChallengeDismiss() {
    if (challenge?.result) return;
    resolveChallenge(false, true);
  }

  // A run also ends by winning or losing, not only by exiting. The score is
  // handed up straight away (onRunEnd) rather than waiting for Exit.
  useEffect(() => {
    if (g.gameState === 'PLAYING') return;
    // Whether this run beat the best on this device is decided BEFORE the best
    // is updated — and strictly, so a tie is not announced as a record.
    setNewBest(g.score > bestRef.current && g.score > 0);
    persistBest();
    onRunEnd?.(g.score);
  }, [g.gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleReset() {
    // In the Arcade a replay is another play, and costs what a play costs.
    if (replay) {
      if (!replay.canAfford) { sfx('deny'); return; }
      replay.onCharge?.();
    }
    persistBest();
    setUserPaused(false);
    setNewBest(false);
    Object.assign(g, {
      shards: [], fired: [], banner: null, shake: 0, hurt: 0, time: 0,
      kills: 0, leaks: 0, leaksThisWave: 0, perfectStreak: 0, towersBuilt: 0,
      credits: startingCredits, lives, maxLives: lives, wave: 0, score: 0, bolts: 0,
      gameState: 'PLAYING', towers: [], creeps: [], projectiles: [], floaters: [], particles: [], burnZones: [],
      waveInProgress: false, spawnQueue: [], spawnTimer: 0, fireCooldowns: {}, challengeTimer: Infinity, wave5ChallengeSpawned: false,
      usedVocab: {}, // Reset the tracker dictionary entirely
      autoPlayDelay: 0,
      unicornCharge: 0, unicornFire: null, boltFire: false,
      towersVersion: g.towersVersion + 1
    });
    challengeActiveRef.current = false;
    challengeResolvedRef.current = false;
    setSelectedTowerId(null);
    setActiveBuilder(null);
    setAiming(false);
    setChallenge(null);
    setChallengeInput('');
    setQuizReadyAt(0);
    render();
  }

  function persistBest() {
    sessionBestRef.current = Math.max(sessionBestRef.current, g.score);
    if (g.score > bestRef.current) {
      bestRef.current = g.score;
      try { localStorage.setItem(`td_best_${unitId}`, String(g.score)); } catch { /* private mode */ }
      setBestScore(g.score);
    }
  }

  function confirmExit() {
    setShowExitConfirm(false);
    persistBest();
    // Submit the BEST run, not whatever score is on screen at exit. Without this,
    // a great run followed by "Play Again" and a weaker run would report the weak
    // score to the leaderboard — persistBest has already folded the best into
    // bestRef, and recordAttempt keeps the server-side max, so this is the honest
    // high score for the unit.
    onComplete(Math.max(g.score, sessionBestRef.current));
    onQuit();
  }

  // The best score is tracked in a ref during play and only written to
  // localStorage when the run ends. Writing on every increase meant a synchronous
  // disk write several times a second for the whole of a wave.
  const bestRef = useRef(bestScore);
  useEffect(() => { bestRef.current = bestScore; }, [bestScore]);
  // The best run of THIS sitting. `td_best_` in localStorage belongs to the
  // device, not the student — on a shared classroom tablet it may be someone
  // else's — so it is the score to beat on the HUD but is never submitted.
  const sessionBestRef = useRef(0);

  // The exit dialog and the pause button both stop the battle; the engine loop
  // checks `g.paused`. The ref lets the key handler tell the two apart.
  const showExitConfirmRef = useRef(false);
  useEffect(() => {
    showExitConfirmRef.current = showExitConfirm;
    g.paused = showExitConfirm || userPaused;
  }, [g, showExitConfirm, userPaused]);
  const [newBest, setNewBest] = useState(false);

  // Unicorn charge for the side panel. The board's ring is painted from `g`
  // every frame; this only refreshes when the engine asks React to render.
  const unicornTower = g.towers.find(t => t.typeId === 'UNICORN') || null;

  // What the "Next" button will unleash — shown so the player can buy the right
  // counter before committing. Only while a wave isn't already running.
  const previewWave = (!g.waveInProgress && g.gameState === 'PLAYING' && g.wave < waves.length) ? g.wave : -1;
  const nextWavePreview = useMemo(
    () => (previewWave >= 0 ? summarizeWave(waves[previewWave], previewEmoji) : null),
    [previewWave, waves, previewEmoji]
  );

  // Everything below is handed to memoised panels, so it must keep its identity
  // from one render to the next.
  const onStartWave = useStable(handleStartWave);
  const onToggleAutoPlay = useStable(() => { autoPlayRef.current = !autoPlayRef.current; sfx('click'); render(); });
  const onSetSpeed = useStable((s) => { g.speed = s; sfx('click'); render(); });
  const onAskQuit = useStable(() => setShowExitConfirm(true));
  const onUpgrade = useStable(handleUpgrade);
  const onSell = useStable(handleSell);
  const onClosePanel = useStable(() => setSelectedTowerId(null));
  const onSetTargetMode = useStable(handleSetTargetMode);
  const onUseBolt = useStable(handleUseBolt);
  const onQuiz = useStable(handleQuiz);
  const onSelectBuilder = useStable((b) => {
    unlockAudio();
    sfx('click');
    setSelectedTowerId(null);
    setActiveBuilder(prev => (prev?.typeId === b.typeId ? null : b));
  });
  const canQuiz = !!(vocab || mathGen);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900 text-white font-sans overflow-hidden touch-manipulation select-none">
      {!sprites && <SpriteForge tribeId={tribeId} towers={false} onReady={handleSprites} />}
      <LiveHUD
        g={g} store={store}
        totalWaves={totalWaves}
        bestScore={bestScore}
        autoPlay={autoPlayRef.current}
        tierLabel={gameConfig.tierLabel}
        nextWavePreview={nextWavePreview}
        paused={userPaused} muted={muted}
        earlyBonus={earlyBonus}
        onTogglePause={handleTogglePause} onToggleMute={handleToggleMute}
        onStartWave={onStartWave}
        onToggleAutoPlay={onToggleAutoPlay}
        onSetSpeed={onSetSpeed}
        onQuit={onAskQuit}
      />

      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative bg-slate-900">
        {/* On a phone the board sits at the top, so it does not jump when the
            upgrade panel opens under it. */}
        <main ref={boardWrapperRef} className="flex-1 order-1 flex items-start md:items-center justify-center overflow-hidden pt-2 md:pt-0">
          <div className="origin-top md:origin-center" style={{ transform: `scale(${boardScale})` }}>
             <GameBoard
               layout={layout} gRef={gRef} drawRef={drawRef} sprites={sprites} boardScale={boardScale}
               towers={g.towers}
               decorations={g.decorations} run={g} store={store}
               towersVersion={g.towersVersion}
               selectedTowerId={selectedTowerId} hoveredTowerId={hoveredTowerId}
               activeBuilder={activeBuilder} hoverCell={hoverCell}
               onCellClick={handleCellClick} onCellHover={handleCellHover}
               onCellLeave={handleCellLeave}
               onTowerClick={handleTowerClick} themeId={activeThemeId}
               unicorn={unicornTower} aiming={aiming}
             />
          </div>

          {userPaused && g.gameState === 'PLAYING' && !showExitConfirm && (
            <button
              onClick={handleTogglePause}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-slate-950/60 text-white"
            >
              <span className="text-4xl font-black uppercase tracking-widest drop-shadow">Paused</span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-300">Tap or press P to resume</span>
            </button>
          )}

          {/* Aiming banner — the whole board is a target while this is up. */}
          {aiming && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-2xl border-b-4 border-fuchsia-800 animate-pulse">
              <span className="text-base">🦄</span>
              Tap a target to fire · <span className="opacity-80">Esc to cancel</span>
            </div>
          )}
        </main>

        <div className="order-2 flex h-auto md:h-full z-20">
          <LiveUpgradePanel
            g={g} store={store} selectedTowerId={selectedTowerId}
            onUpgrade={onUpgrade} onSell={onSell} onClose={onClosePanel}
            onSetTargetMode={onSetTargetMode}
          />
        </div>

        <div className="order-3 flex h-auto md:h-full z-20">
          <LiveBuildMenu
            g={g} store={store} allowedTowers={allowedTowers}
            activeBuilder={activeBuilder} onUseBolt={onUseBolt}
            onSelect={onSelectBuilder}
            canQuiz={canQuiz} quizReadyAt={quizReadyAt} onQuiz={onQuiz}
          />
        </div>
      </div>

      <VocabChallenge
        challenge={challenge} 
        input={challengeInput} 
        onInputChange={setChallengeInput}
        onSubmit={handleChallengeSubmit} 
        onChoice={handleChallengeChoice}
        onDismiss={handleChallengeDismiss}
        timeLeft={challengeTimeLeft} 
        maxTime={CHALLENGE_DURATION} 
        shakeKey={challengeShakeKey}
      />

      <ExitConfirmModal open={showExitConfirm} onCancel={() => setShowExitConfirm(false)} onConfirm={confirmExit} />

      {g.gameState !== 'PLAYING' && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/90 p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] border-b-8 border-slate-200 p-8 text-center max-w-md w-full shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="text-6xl mb-4">{g.gameState === 'WON' ? '🏆' : '💀'}</div>
            <div className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
              {g.gameState === 'WON' ? 'Victory' : 'Defeat'}
            </div>
            <div className="text-base font-bold text-slate-500 mb-6">
              {g.gameState === 'WON' ? 'You defended every wave!' : `You held until wave ${g.wave}. Too many enemies got through.`}
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[['Wave', g.wave], ['Kills', g.kills], ['Leaks', g.leaks], ['Towers', g.towersBuilt]].map(([label, value]) => (
                <div key={label} className="bg-slate-100 rounded-2xl py-3">
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</div>
                  <div className="text-xl font-black text-slate-700 tabular-nums">{value}</div>
                </div>
              ))}
            </div>
            <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl py-4 mb-6 shadow-inner">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Final Score</div>
              <div className="text-4xl font-black text-[#1CB0F6] tabular-nums"><CountUp value={g.score} /></div>
              {newBest
                ? <div className="text-sm font-black text-[#e6a800] mt-1 animate-bounce">★ New Best! ★</div>
                : bestScore > 0 && <div className="text-xs font-bold text-slate-400 mt-1">Best {bestScore.toLocaleString()}</div>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                disabled={!!replay && !replay.canAfford}
                className="flex-1 px-5 py-4 rounded-2xl bg-[#58A700] border-b-[4px] border-[#46a802] active:border-b-0 active:translate-y-[4px] text-white font-black transition-all uppercase tracking-widest text-sm disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-500 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:border-b-[4px]"
              >
                Play Again
                {replay && replay.cost > 0 && (
                  <span className="block text-[10px] tracking-widest mt-0.5 opacity-90">
                    {replay.canAfford ? `${replay.cost} gold` : `Need ${replay.cost} gold`}
                  </span>
                )}
              </button>
              <button onClick={confirmExit} className="flex-1 px-5 py-4 rounded-2xl bg-slate-200 border-b-[4px] border-slate-300 active:border-b-0 active:translate-y-[4px] text-slate-600 font-black transition-all uppercase tracking-widest text-sm">
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}