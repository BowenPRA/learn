// src/components/survivor/useSurvivorEngine.js
//
// =====================================================================
// The Swarm Survivor simulation.
//
// Same shape as the Tower Defense engine (useGameEngine.js) and for the same
// reasons. All mutable game state lives in one ref-held object `g` that the loop
// mutates in place, and three clocks are kept apart:
//
//   SIMULATION  a strict fixed step of 1/30 s, so the maths is deterministic
//               whatever the monitor's refresh rate.
//   PAINT       every display frame. SurvivorCanvas registers a painter on
//               `drawRef`; it is handed `alpha` — how far we are between the
//               last two steps — and draws every body interpolated to that
//               instant. Each moving thing therefore keeps the position it had
//               one step ago (`px`, `py`). Thirty simulated frames look like
//               sixty on screen.
//   REACT       the HUD, about ten times a second, and at once for anything a
//               player must not miss. It used to re-render every frame.
// =====================================================================

import { useEffect, useRef } from 'react';
import {
  WORLD, STEP_MS, LIMITS, SURVIVOR_ENEMIES, timeScale, RUN,
  SPAWN_PHASES, SWARM_EVENT, WEAPONS, weaponStats, xpForLevel, MAX_WEAPON_LEVEL,
  DASH, COMBO, PICKUPS, ATTACKS, SCALING, speedScale, blightRadius,
} from './survivorData';
import { sfx } from '../../arcade/sfx';

/** Drops dead entries in place, without allocating a new array every frame. */
function compact(arr, keep) {
  let w = 0;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (keep(item)) arr[w++] = item;
  }
  arr.length = w;
}

const TAU = Math.PI * 2;
const between = ([lo, hi]) => lo + Math.random() * (hi - lo);

// weaponStats builds a fresh object each call, and the loop asked for it for
// every weapon on every step. A weapon's numbers only depend on its id and
// level, so each pair is worked out once.
const statsCache = new Map();
function statsOf(id, level) {
  const key = `${id}|${level}`;
  let s = statsCache.get(key);
  if (!s) { s = weaponStats(id, level); statsCache.set(key, s); }
  return s;
}

const SHARD_COLOR = {
  ANT: '#fca5a5', WASP: '#fde047', BEETLE: '#d97706', QUEEN: '#c084fc', GIANT_ANT: '#ef4444',
};

// ---------------------------------------------------------------------
// Construction
// ---------------------------------------------------------------------

/**
 * A fresh run.
 *
 * `hero` is the chosen HEROES entry, `loadout` the resolved loadoutEffects, and
 * `difficulty` the unit's tier multipliers straight from unitDifficulty.js — the
 * very same object Tower Defense hands its engine.
 */
export function createRun({ hero, loadout, difficulty = {} }) {
  const maxHp = hero.hp + (hero.hpBonus || 0) + loadout.hpBonus;
  const cx = WORLD.width / 2, cy = WORLD.height / 2;
  const g = {
    t: 0,
    state: 'PLAYING',
    outcome: null,

    hero: {
      typeId: hero.typeId,
      x: cx, y: cy, px: cx, py: cy,
      hp: maxHp,
      maxHp,
      baseSpeed: hero.speed * (1 + (hero.speedBonus || 0)) * loadout.speedMul,
      speedMul: 1,
      damageMul: 1,
      hasteMul: 1,
      pickupR: 92 * (1 + (hero.pickupBonus || 0)) * loadout.pickupMul,
      xpMul: 1,
      armor: (hero.armorBonus || 0) + loadout.armor,
      regen: 0,
      revives: loadout.revives,
      // How many times each PERK has been taken, so the level-up roll can stop
      // offering one that is maxed out.
      perks: {},
      level: 1,
      xp: 0,
      xpNext: xpForLevel(1),
      iframe: 0,
      facing: 1,
      hurtFlash: 0,
      walkPhase: 0,
      // The dash: time left in the burst, time until it is ready again, and the
      // direction it committed to (and the last way the hero walked, which is
      // where a standing dash goes).
      dashT: 0, dashCd: 0, dashX: 1, dashY: 0, lastX: 1, lastY: 0,
    },

    // Index 0 is always the hero's own weapon; 1.. are recruited companions,
    // drawn orbiting the hero.
    weapons: [{ id: hero.weapon, level: 1, cd: 0, charge: 0, sweep: -1, sweepFrom: 0, beamTick: 0 }],

    enemies: [],
    bullets: [],
    gems: [],
    pops: [],
    fx: [],
    shards: [],   // bits a body bursts into
    nums: [],     // damage numbers
    slams: [],    // a Broodmother's telegraphed ground-slams

    // The endless boss scheduler. `bossTimer` counts down to the next
    // Broodmother; it starts at the first-boss time and is reset to bossEveryMs
    // each time a boss FALLS, so there is a breather between fights rather than a
    // pile-up. `bossCount` is how many have spawned — it drives both their
    // escalating health and the score a kill is worth.
    boss: null,
    bossTimer: RUN.bossAtMs,
    bossCount: 0,   // Broodmothers SPAWNED — drives their escalating health.
    bossKills: 0,   // Broodmothers FELLED — what the results screen celebrates.
    eliteIdx: 0,
    eliteTimer: RUN.eliteEveryMs,
    phaseIdx: 0,
    spawnTimer: 900,
    swarmTimer: SWARM_EVENT.firstAtMs,

    kills: 0,
    score: 0,
    scoreFrac: 0,
    // The closing arena and the hunters that end the run (see SCALING).
    blightR: null, outside: false, reapers: 0, reaperTimer: 0,
    pendingLevels: 0,
    nextId: 1,

    // The kill chain, and how long since luck last dropped a power-up.
    combo: 0, comboT: 0, bestCombo: 0,
    killsSincePickup: 0,
    gemStreak: 0, gemStreakT: 0,

    cam: { x: cx, y: cy, px: cx, py: cy },
    shake: 0,

    difficulty: {
      hpMul: Number(difficulty.hpMul) > 0 ? Number(difficulty.hpMul) : 1,
      speedMul: Number(difficulty.speedMul) > 0 ? Number(difficulty.speedMul) : 1,
      rewardMul: Number(difficulty.rewardMul) > 0 ? Number(difficulty.rewardMul) : 1,
      scoreMul: Number(difficulty.scoreMul) > 0 ? Number(difficulty.scoreMul) : 1,
    },
  };

  // Head Start: begin a level (or two) up, with the free picks already applied
  // as raw levels on the hero weapon — buying power, not buying choices.
  for (let i = 1; i < loadout.startLevel; i++) {
    g.hero.level += 1;
    g.hero.xpNext = xpForLevel(g.hero.level);
    if (g.weapons[0].level < MAX_WEAPON_LEVEL) g.weapons[0].level += 1;
  }

  return g;
}

// ---------------------------------------------------------------------
// Mutations the UI performs between frames
// ---------------------------------------------------------------------

/**
 * Applies one chosen level-up card.
 *
 * Every level also mends a little. That is the run's only steady healing, and it
 * is deliberately tied to LEVELS rather than to time: levels come from gems,
 * gems come from kills, and kills come from standing where the fight is. So the
 * way to stay alive is to engage — which is the behaviour the whole game wants
 * and the opposite of what a pure damage-avoidance loop would teach.
 */
export function applyUpgrade(g, card) {
  const h = g.hero;
  // The heal tapers with level: at level 1 it is 8%, by level 24 it is 2%. A
  // high-level hero has to earn health from elites and boss kills instead.
  const L = SCALING.levelHeal;
  h.hp = Math.min(h.maxHp, h.hp + Math.round(h.maxHp * Math.max(L.floor, L.base - L.perLevel * h.level)));

  if (card.kind === 'RECRUIT') {
    g.weapons.push({ id: card.weaponId, level: 1, cd: 0, charge: 0, sweep: -1, sweepFrom: 0, beamTick: 0 });
  } else if (card.kind === 'WEAPON') {
    const w = g.weapons.find(x => x.id === card.weaponId);
    if (w && w.level < MAX_WEAPON_LEVEL) w.level += 1;
  } else if (card.kind === 'PERK') {
    h.perks[card.perkId] = (h.perks[card.perkId] || 0) + 1;
    switch (card.perkId) {
      case 'MIGHT':   h.damageMul += 0.15; break;
      case 'SWIFT':   h.speedMul  += 0.10; break;
      case 'VITAL':   h.maxHp += 25; h.hp = Math.min(h.maxHp, h.hp + 25); break;
      case 'GREED':   h.pickupR *= 1.35; break;
      case 'FORTUNE': h.xpMul += 0.20; break;
      case 'ARMOR':   h.armor += 2; break;
      case 'HASTE':   h.hasteMul *= 0.90; break;
      case 'MEND':    h.regen += 1; break;
      default: break;
    }
  }
  // The new power arrives with a ring and its name, so the pick is felt on the
  // field too.
  if (g.fx.length < LIMITS.fx) {
    g.fx.push({ id: g.nextId++, kind: 'nova', x: h.x, y: h.y, r: 150, life: 480, max: 480, color: '#fbbf24' });
  }
  if (card.title && g.pops.length < LIMITS.pops) {
    g.pops.push({ id: g.nextId++, text: String(card.title).toUpperCase(), x: h.x, y: h.y - 70, life: 1100, max: 1100, color: '#fbbf24' });
  }
  sfx('upgrade');
}

/**
 * A plain, immutable read of everything the HUD shows.
 *
 * The simulation lives in a mutable ref for speed, but React screens must not
 * read a ref while rendering. So the loop hands the UI this snapshot instead:
 * ordinary props, ordinary re-render. The canvas (which is not React) reads the
 * ref directly from its painter, where that is safe.
 */
export function hudSnapshot(g) {
  const h = g.hero;
  return {
    hp: h.hp, maxHp: h.maxHp,
    level: h.level, xp: h.xp, xpNext: h.xpNext,
    revives: h.revives,
    t: g.t,
    score: g.score,
    kills: g.kills,
    combo: g.combo,
    dashReady: h.dashCd <= 0,
    // Endless: there is no single "boss spawned" moment. The HUD tracks whether
    // one is on the field right now, how long until the next, and how many have
    // been felled.
    blightR: g.blightR,
    blightWarn: g.blightR == null && g.t >= SCALING.blight.startMs - SCALING.blight.warnMs,
    outside: g.outside,
    reaperInMs: g.reapers ? 0 : Math.max(0, SCALING.reapers.atMs - g.t),
    reapers: g.reapers,
    bossAlive: !!g.boss,
    nextBossInMs: g.boss ? 0 : Math.max(0, g.bossTimer),
    bossCount: g.bossCount,
    boss: g.boss ? { hp: g.boss.hp, maxHp: g.boss.maxHp } : null,
    squad: g.weapons.map(w => ({ id: w.id, level: w.level })),
  };
}

/** Called by the shell once the level-up modal closes. */
export function resumeAfterLevel(g) {
  g.pendingLevels = Math.max(0, g.pendingLevels - 1);
  g.state = g.pendingLevels > 0 ? 'LEVELUP' : 'PLAYING';
}

// ---------------------------------------------------------------------
// The loop
// ---------------------------------------------------------------------

export function useSurvivorEngine({ gRef, render, inputRef, onLevelUp, onRunEnd, pausedRef, drawRef }) {
  const renderRef = useRef(render);
  const levelRef = useRef(onLevelUp);
  const endRef = useRef(onRunEnd);
  useEffect(() => {
    renderRef.current = render;
    levelRef.current = onLevelUp;
    endRef.current = onRunEnd;
  }, [render, onLevelUp, onRunEnd]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const g = gRef.current;
    if (!g) return undefined;
    // Dev only: lets the harness compress the end-game schedule for a test.
    if (import.meta.env.DEV) window.__scaling = SCALING;

    const D = g.difficulty;
    const newId = () => g.nextId++;

    // ---- helpers -------------------------------------------------------

    const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

    function pop(text, x, y, color) {
      if (g.pops.length >= LIMITS.pops) return;
      g.pops.push({ id: newId(), text, x, y, life: 900, max: 900, color });
    }

    function fx(kind, x, y, r, life, color) {
      if (g.fx.length >= LIMITS.fx) return;
      g.fx.push({ id: newId(), kind, x, y, r, life, max: life, color });
    }

    /** A body coming apart. Bigger bodies throw more, and further. */
    function burst(e) {
      const big = e.boss || e.elite;
      const n = big ? 16 : e.slot === 'BEETLE' ? 7 : 4;
      const color = SHARD_COLOR[e.slot] || '#fbbf24';
      for (let i = 0; i < n && g.shards.length < LIMITS.shards; i++) {
        const a = Math.random() * TAU;
        const v = (big ? 260 : 170) * (0.35 + Math.random() * 0.8);
        const life = 300 + Math.random() * 280;
        g.shards.push({
          x: e.x, y: e.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
          size: (big ? 6 : 3.5) + Math.random() * 3, color, life, max: life,
        });
      }
    }

    // ---- spawning ------------------------------------------------------

    function spawnAt(slot, x, y, opts = {}) {
      if (g.enemies.length >= LIMITS.enemies && !opts.force) return null;
      const conf = SURVIVOR_ENEMIES[slot];
      // Rank-and-file enemies toughen as the run goes on; the boss and the elites
      // do NOT. They arrive on a schedule, so their health is authored for the
      // exact minute they walk in — letting the clock multiply it as well would
      // stack two curves and turn the finale into a health-bar siege rather than
      // a fight. Only the unit's difficulty tier scales them.
      const scheduled = opts.boss || opts.elite;
      const scale = (scheduled ? 1 : timeScale(g.t)) * D.hpMul * (opts.hpMul || 1);
      const quick = scheduled ? 1 : speedScale(g.t);
      const hp = Math.round(conf.hp * scale);
      const attack = opts.boss ? ATTACKS.BOSS : (!opts.elite && ATTACKS[slot]) || null;
      const e = {
        id: newId(),
        slot,
        x, y, px: x, py: y,
        hp,
        maxHp: hp,
        speed: conf.speed * D.speedMul * (opts.speedMul || 1) * quick,
        damage: conf.damage,
        dr: conf.dr,
        r: conf.r * (opts.sizeMul || 1),
        weave: conf.weave || 0,
        phase: Math.random() * TAU,
        slowT: 0,
        slowPct: 0,
        flash: 0,
        beamHit: -1,
        boss: !!opts.boss,
        elite: !!opts.elite,
        sizeMul: opts.sizeMul || 1,
        age: 0,
        // Its attack pattern, if it has one (see ATTACKS): 'seek' until it is
        // close and off cooldown, 'wind' while it telegraphs, 'go' while it
        // commits along (ax, ay).
        attack,
        mode: 'seek', modeT: 0, ax: 0, ay: 0,
        atkCd: attack ? (opts.boss ? 3500 : 900 + Math.random() * 2600) : 0,
        summonCd: opts.boss ? ATTACKS.BOSS.summonEveryMs : 0,
      };
      g.enemies.push(e);
      return e;
    }

    /** A point on a ring around the hero, just outside what the camera shows. */
    function ringPoint(radius) {
      const a = Math.random() * TAU;
      return {
        x: clamp(g.hero.x + Math.cos(a) * radius, 30, WORLD.width - 30),
        y: clamp(g.hero.y + Math.sin(a) * radius, 30, WORLD.height - 30),
      };
    }

    function livePhase() {
      let idx = 0;
      for (let i = 0; i < SPAWN_PHASES.length; i++) {
        if (g.t >= SPAWN_PHASES[i].atMs) idx = i;
      }
      return SPAWN_PHASES[idx];
    }

    function runSpawns(dt) {
      const phase = livePhase();
      // Past the last authored phase the pressure keeps rising on its own.
      const lastAt = SPAWN_PHASES[SPAWN_PHASES.length - 1].atMs;
      const extraMin = Math.max(0, (g.t - lastAt) / 60000);
      const LD = SCALING.lateDensity;
      const interval = Math.max(LD.intervalFloor, phase.interval * Math.pow(1 - LD.intervalCutPerMin, extraMin));
      const burst = Math.min(LD.burstCap, Math.round(phase.burst + LD.burstPerMin * extraMin));
      g.spawnTimer -= dt;
      if (g.spawnTimer <= 0) {
        g.spawnTimer += interval;
        for (let i = 0; i < burst; i++) {
          const slot = phase.pool[Math.floor(Math.random() * phase.pool.length)];
          const p = ringPoint(620 + Math.random() * 160);
          spawnAt(slot, p.x, p.y);
        }
      }

      // The closing ring — the one moment running away is not an option.
      g.swarmTimer -= dt;
      if (g.swarmTimer <= 0) {
        g.swarmTimer += SWARM_EVENT.everyMs;
        const base = Math.random() * TAU;
        for (let i = 0; i < SWARM_EVENT.count; i++) {
          const a = base + (i / SWARM_EVENT.count) * TAU;
          spawnAt(
            i % 4 === 3 ? 'WASP' : 'ANT',
            clamp(g.hero.x + Math.cos(a) * SWARM_EVENT.radius, 30, WORLD.width - 30),
            clamp(g.hero.y + Math.sin(a) * SWARM_EVENT.radius, 30, WORLD.height - 30),
            { force: true }
          );
        }
        pop('THE SWARM CLOSES IN', g.hero.x, g.hero.y - 90, '#f43f5e');
        g.shake = Math.max(g.shake, 10);
        sfx('waveStart', { pitch: 0.7 });
      }

      // Mini-bosses on a schedule through the opening climb...
      while (g.eliteIdx < RUN.eliteAtMs.length && g.t >= RUN.eliteAtMs[g.eliteIdx]) {
        g.eliteIdx++;
        const p = ringPoint(640);
        spawnAt('QUEEN', p.x, p.y, { force: true, elite: true });
        pop('ELITE INCOMING', g.hero.x, g.hero.y - 110, '#a855f7');
      }
      // ...and then, once the endless phase is on, an elite on a steady drumbeat,
      // so the heal orbs they drop keep a long run survivable.
      if (g.t >= RUN.bossAtMs) {
        g.eliteTimer -= dt;
        if (g.eliteTimer <= 0) {
          g.eliteTimer += RUN.eliteEveryMs;
          const p = ringPoint(640);
          spawnAt('QUEEN', p.x, p.y, { force: true, elite: true });
          pop('ELITE INCOMING', g.hero.x, g.hero.y - 110, '#a855f7');
        }
      }

      // The Reapers. Unkillable, faster than you, and the end of every run.
      const R = SCALING.reapers;
      if (g.t >= R.atMs) {
        g.reaperTimer -= dt;
        if (g.reapers === 0 || g.reaperTimer <= 0) {
          g.reaperTimer = R.everyMs;
          const n = g.reapers === 0 ? R.count : 1;
          for (let i = 0; i < n; i++) {
            const p = ringPoint(700);
            const e = spawnAt('QUEEN', p.x, p.y, { force: true, elite: true });
            if (!e) continue;
            e.reaper = true; e.elite = false; e.attack = null;
            e.hp = Infinity; e.maxHp = Infinity; e.dr = 0;
            e.speed = g.hero.baseSpeed * R.speedMul; e.damage = R.damage; e.r = R.r;
            g.reapers += 1;
          }
          pop(g.reapers <= R.count ? 'THE REAPERS HAVE COME' : 'ANOTHER REAPER', g.hero.x, g.hero.y - 120, '#c084fc');
          g.shake = 18;
          sfx('boss', { pitch: 0.7 });
        }
      }

      // The Broodmother — and then more of them. The run NEVER ends on a boss;
      // each is a spike in an endless climb. The next arrives bossEveryMs after
      // the last one falls (the timer is reset on the kill), and each is tougher
      // by bossHpGrowth so it keeps pace with a hero who has kept levelling.
      g.bossTimer -= dt;
      if (g.bossTimer <= 0 && !g.boss) {
        const p = ringPoint(600);
        const hpMul = 1 + RUN.bossHpGrowth * g.bossCount;
        g.boss = spawnAt('GIANT_ANT', p.x, p.y, { force: true, boss: true, sizeMul: 1.35, hpMul });
        if (g.boss) g.boss.spawnT = g.t;
        g.bossCount += 1;
        pop(g.bossCount === 1 ? 'THE BROODMOTHER' : 'ANOTHER BROODMOTHER', g.hero.x, g.hero.y - 120, '#ef4444');
        g.shake = 16;
        sfx('boss');
      }
    }

    // ---- damage --------------------------------------------------------

    function hurt(e, rawDamage, opts = {}) {
      if (e.hp <= 0 || e.reaper) return;
      const dmg = opts.armorPiercing
        ? rawDamage
        : Math.max(1, rawDamage - e.dr);
      e.hp -= dmg;
      e.flash = 120;
      // Only the hits worth reading get a number; a dart's chip damage is noise.
      if (dmg >= 22 && g.nums.length < LIMITS.nums) {
        g.nums.push({ text: String(Math.round(dmg)), x: e.x + (Math.random() - 0.5) * 14, y: e.y - e.r, life: 520, max: 520, big: dmg >= 60 });
      }
      if (opts.slowPct) {
        // Strongest chill wins rather than stacking, matching the board's Cryo.
        if (opts.slowPct >= e.slowPct || e.slowT <= 0) {
          e.slowPct = opts.slowPct;
          e.slowT = opts.slowMs || 1200;
        }
      }
      if (e.hp <= 0) kill(e);
      else sfx('hit');
    }

    function dropGem(gem) {
      if (g.gems.length < LIMITS.gems) { g.gems.push(gem); return; }
      // The field is full of gems nobody has collected. The experience used to
      // be thrown away here; it is folded into a gem already on the ground.
      const host = g.gems[(Math.random() * g.gems.length) | 0];
      if (host && !host.heal && !host.power) { host.value += gem.value; host.big = true; }
    }

    function kill(e) {
      const conf = SURVIVOR_ENEMIES[e.slot];
      g.kills += 1;

      // The chain. Each kill inside the window extends it, and the longer it is
      // the more every kill is worth.
      g.combo += 1;
      g.comboT = COMBO.windowMs;
      if (g.combo > g.bestCombo) g.bestCombo = g.combo;
      const chain = 1 + COMBO.maxBonus * Math.min(1, g.combo / COMBO.fullAt);
      g.score += Math.round(conf.score * D.scoreMul * chain);
      const shout = COMBO.milestones[g.combo];
      if (shout) {
        pop(`${shout}  ×${g.combo}`, g.hero.x, g.hero.y - 100, '#fbbf24');
        sfx('powerup');
      }

      const value = Math.max(1, Math.round(conf.xp * D.rewardMul * g.hero.xpMul));
      dropGem({
        id: newId(), x: e.x, y: e.y, px: e.x, py: e.y, value,
        vx: (Math.random() - 0.5) * 40, vy: (Math.random() - 0.5) * 40,
        big: conf.elite || conf.boss,
      });

      fx('burst', e.x, e.y, e.r * 1.2, 320, conf.boss ? '#ef4444' : '#fbbf24');
      burst(e);
      sfx('kill');

      // A power-up, by luck or by pity.
      if (!e.boss && !e.elite) {
        g.killsSincePickup += 1;
        if (Math.random() < PICKUPS.chance || g.killsSincePickup >= PICKUPS.pityKills) {
          g.killsSincePickup = 0;
          // Meat only when it would be welcome.
          const hurtHero = g.hero.hp < g.hero.maxHp * 0.7;
          const kinds = hurtHero ? PICKUPS.kinds : PICKUPS.kinds.filter(k => k !== 'MEAT');
          const power = kinds[(Math.random() * kinds.length) | 0];
          g.gems.push({ id: newId(), x: e.x, y: e.y, px: e.x, py: e.y, value: 0, power, vx: 0, vy: 0, big: true });
        }
      }

      if (e.boss) {
        // A boss dying does NOT end the run — it clears the slot, banks a bonus
        // that grows with each Broodmother felled, starts the breather before the
        // next one, and drops a big heal so the kill is what sustains a long run.
        g.boss = null;
        g.bossKills += 1;
        g.score += Math.round(RUN.bossBonus * g.bossKills * D.scoreMul);
        g.bossTimer = Math.max(RUN.bossEveryFloor, RUN.bossEveryMs - RUN.bossEveryCut * g.bossKills);
        g.shake = 20;
        g.slams.length = 0;
        pop('BROODMOTHER DOWN', e.x, e.y - 40, '#fbbf24');
        pop(`+${Math.round(RUN.bossBonus * g.bossKills * D.scoreMul).toLocaleString()}`, e.x, e.y - 70, '#fde047');
        g.gems.push({ id: newId(), x: e.x, y: e.y, px: e.x, py: e.y, value: 0, heal: RUN.bossHeal, vx: 0, vy: 0, big: true });
        sfx('waveClear');
      } else if (e.elite) {
        // An elite drops a health orb — the only healing in the run that is not
        // bought with a level-up, so killing one is always worth the risk.
        g.gems.push({ id: newId(), x: e.x, y: e.y, px: e.x, py: e.y, value: 0, heal: 30, vx: 0, vy: 0, big: true });
      }
    }

    /**
     * Everything that hurts the hero goes through here, so the one global window
     * of invulnerability, the dash, armour and the revive all apply equally to a
     * touch, a charge and a slam.
     */
    function damageHero(raw, opts = {}) {
      const h = g.hero;
      if (h.iframe > 0) return false;
      const taken = Math.max(1, Math.round(raw) - h.armor);
      h.hp -= taken;
      h.iframe = 650;
      h.hurtFlash = 220;
      g.shake = Math.max(g.shake, opts.heavy ? 12 : 5);
      pop(`-${taken}`, h.x, h.y - 30, '#f87171');
      sfx('hurt');
      if (h.hp <= 0) {
        if (h.revives > 0) {
          h.revives -= 1;
          h.hp = Math.round(h.maxHp * 0.5);
          h.iframe = 2200;
          pop('SECOND WIND', h.x, h.y - 60, '#34d399');
          // The revive clears the field so it is a real reprieve.
          for (const e of g.enemies) if (!e.boss) hurt(e, 99999, { armorPiercing: true });
          fx('nova', h.x, h.y, 700, 600, '#34d399');
          g.shake = 18;
          sfx('heal');
        } else {
          h.hp = 0;
          g.state = 'DEAD';
          g.outcome = 'DEAD';
          sfx('gameOver');
        }
      }
      return true;
    }

    // ---- the spatial grid ----------------------------------------------
    //
    // A coarse uniform grid, rebuilt twice a step (before the bullets fly and
    // after the bodies move). It makes pushing bodies apart O(n) instead of
    // O(n²), and it means a bullet only tests the handful of enemies near it
    // rather than all two hundred — that loop was the simulation's hot spot.
    // Bodies too big for the cell size (elites, bosses) are kept in `bigs` and
    // simply tested every time; there are never more than a few.
    const CELL = 56;
    const grid = new Map();
    const bigs = [];
    // The buckets are emptied and reused, not thrown away: making a few hundred
    // small arrays twice a step kept the garbage collector busy for nothing.
    const used = [];
    function rebuildGrid() {
      for (let i = 0; i < used.length; i++) used[i].length = 0;
      used.length = 0;
      bigs.length = 0;
      for (const e of g.enemies) {
        if (e.hp <= 0) continue;
        if (e.r > 30) { bigs.push(e); continue; }
        const key = ((e.x / CELL) | 0) * 4096 + ((e.y / CELL) | 0);
        let bucket = grid.get(key);
        if (!bucket) { bucket = []; grid.set(key, bucket); }
        if (bucket.length === 0) used.push(bucket);
        bucket.push(e);
      }
    }

    // ---- targeting -----------------------------------------------------

    function nearestEnemy(x, y, range) {
      let best = null;
      let bestD = range * range;
      for (const e of g.enemies) {
        // Corpses stay in the list until the end of the step; don't waste a shot.
        if (e.hp <= 0) continue;
        const dx = e.x - x, dy = e.y - y;
        const d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = e; }
      }
      return best;
    }

    function toughestEnemy(x, y, range) {
      let best = null;
      let bestHp = -1;
      const r2 = range * range;
      for (const e of g.enemies) {
        if (e.hp <= 0) continue;
        const dx = e.x - x, dy = e.y - y;
        if (dx * dx + dy * dy > r2) continue;
        if (e.hp > bestHp) { bestHp = e.hp; best = e; }
      }
      return best;
    }

    /**
     * The enemy with the most company inside a splash radius.
     *
     * Sampled rather than exhaustive: with two hundred enemies an exact answer is
     * forty thousand distance checks a shot. Twenty candidates finds a crowd
     * reliably enough and costs a fortieth of that.
     */
    function densestEnemy(x, y, range, splash) {
      const r2 = range * range;
      const cands = [];
      for (const e of g.enemies) {
        if (e.hp <= 0) continue;
        const dx = e.x - x, dy = e.y - y;
        if (dx * dx + dy * dy <= r2) cands.push(e);
        if (cands.length >= 40) break;
      }
      if (cands.length === 0) return null;
      const sample = cands.length > 20 ? cands.slice(0, 20) : cands;
      const s2 = splash * splash;
      let best = sample[0], bestN = -1;
      for (const c of sample) {
        let n = 0;
        for (const o of cands) {
          const dx = o.x - c.x, dy = o.y - c.y;
          if (dx * dx + dy * dy <= s2) n++;
        }
        if (n > bestN) { bestN = n; best = c; }
      }
      return best;
    }

    // ---- weapons -------------------------------------------------------

    /** Nitro's aura, folded across every companion that carries one. */
    function auraBonus() {
      let fireRate = 0;
      let moveSpeed = 0;
      for (const w of g.weapons) {
        if (w.id !== 'NITRO') continue;
        const s = statsOf('NITRO', w.level);
        fireRate = Math.max(fireRate, s.fireRate);
        moveSpeed = Math.max(moveSpeed, s.moveSpeed);
      }
      return { fireRate, moveSpeed };
    }

    function addBullet(b) {
      if (g.bullets.length >= LIMITS.bullets) return;
      b.px = b.x; b.py = b.y;
      g.bullets.push(b);
    }

    function fireShot(w, s, origin) {
      const target = s.targeting === 'TOUGHEST'
        ? toughestEnemy(origin.x, origin.y, s.range)
        : nearestEnemy(origin.x, origin.y, s.range);
      if (!target) return false;

      const base = Math.atan2(target.y - origin.y, target.x - origin.x);
      const shots = Math.max(1, s.shots || 1);
      // Extra darts fan out rather than stacking on the same line, so multishot
      // is crowd control instead of a damage multiplier on one body.
      const spread = shots > 1 ? 0.20 : 0;
      for (let i = 0; i < shots; i++) {
        const a = base + (i - (shots - 1) / 2) * spread;
        addBullet({
          id: newId(), kind: w.id,
          x: origin.x, y: origin.y,
          vx: Math.cos(a) * s.speed, vy: Math.sin(a) * s.speed,
          damage: Math.round(s.damage * g.hero.damageMul),
          life: (s.range / s.speed) * 1000 + 250,
          r: w.id === 'SNIPER' ? 7 : 6,
          pierce: s.pierce || 0,
          armorPiercing: !!s.armorPiercing,
          hits: null,
        });
      }
      sfx('shoot', w.id === 'SNIPER' ? { pitch: 0.5, volume: 1.3 } : undefined);
      return true;
    }

    function fireMortar(w, s, origin) {
      const target = densestEnemy(origin.x, origin.y, s.range, s.splash) ||
                     nearestEnemy(origin.x, origin.y, s.range);
      if (!target) return false;
      const dx = target.x - origin.x, dy = target.y - origin.y;
      const dist = Math.hypot(dx, dy) || 1;
      const travel = (dist / s.speed) * 1000;
      addBullet({
        id: newId(), kind: 'SPLASH',
        x: origin.x, y: origin.y,
        vx: dx / travel * 1000, vy: dy / travel * 1000,
        damage: Math.round(s.damage * g.hero.damageMul),
        life: travel,
        r: 9,
        splash: s.splash,
        arc: travel,
        arcT: 0,
        // Where it will land, so the painter can mark the spot.
        tx: target.x, ty: target.y,
      });
      return true;
    }

    function fireNova(w, s, origin) {
      const dmg = Math.round(s.damage * g.hero.damageMul);
      const r2 = s.radius * s.radius;
      let hit = 0;
      for (const e of g.enemies) {
        const dx = e.x - origin.x, dy = e.y - origin.y;
        if (dx * dx + dy * dy <= r2) {
          hurt(e, dmg, { slowPct: s.slowPct, slowMs: s.slowMs });
          hit++;
        }
      }
      fx('nova', origin.x, origin.y, s.radius, 420, '#67e8f9');
      if (hit > 0) sfx('freeze');
      return hit > 0;
    }

    function fireChain(w, s, origin) {
      const first = nearestEnemy(origin.x, origin.y, s.range);
      if (!first) return false;
      const dmg = Math.round(s.damage * g.hero.damageMul);
      const seen = new Set();
      let node = first;
      let from = origin;
      for (let i = 0; i <= s.bounces && node; i++) {
        seen.add(node.id);
        hurt(node, dmg);
        if (g.fx.length < LIMITS.fx) {
          g.fx.push({
            id: newId(), kind: 'arc', color: '#fbbf24', life: 180, max: 180,
            x: from.x, y: from.y, x2: node.x, y2: node.y, r: 0, seed: Math.random() * 1000,
          });
        }
        from = node;
        // Next hop: nearest unhit enemy within a short leash of the last one.
        let next = null, bestD = 190 * 190;
        for (const e of g.enemies) {
          if (seen.has(e.id) || e.hp <= 0) continue;
          const dx = e.x - node.x, dy = e.y - node.y;
          const d = dx * dx + dy * dy;
          if (d < bestD) { bestD = d; next = e; }
        }
        node = next;
      }
      sfx('zap');
      return true;
    }

    /** The rainbow lance: charges, then sweeps a full turn cutting everything. */
    function stepBeam(w, s, dt, origin) {
      if (w.sweep >= 0) {
        w.sweep += dt;
        w.beamTick -= dt;
        if (w.beamTick <= 0) {
          w.beamTick += s.tickMs;
          const a = w.sweepFrom + (w.sweep / s.sweepMs) * TAU;
          const ca = Math.cos(a), sa = Math.sin(a);
          const half = s.width / 2;
          const dmg = Math.round(s.damage * g.hero.damageMul);
          for (const e of g.enemies) {
            const dx = e.x - origin.x, dy = e.y - origin.y;
            const along = dx * ca + dy * sa;
            if (along < 0) continue;                    // behind the lance
            const perp = Math.abs(-dx * sa + dy * ca);
            if (perp <= half + e.r) hurt(e, dmg, { armorPiercing: true });
          }
        }
        if (w.sweep >= s.sweepMs) { w.sweep = -1; w.charge = 0; }
        return;
      }
      w.charge += dt / g.hero.hasteMul;
      if (w.charge >= s.chargeMs) {
        w.sweep = 0;
        w.beamTick = 0;
        w.sweepFrom = Math.random() * TAU;
        g.shake = Math.max(g.shake, 6);
        sfx('beam');
      }
    }

    function stepWeapons(dt, aura) {
      const rateMul = g.hero.hasteMul * (1 - Math.min(0.5, aura.fireRate));

      for (let i = 0; i < g.weapons.length; i++) {
        const w = g.weapons[i];
        const conf = WEAPONS[w.id];
        if (!conf || conf.kind === 'AURA') continue;
        const s = statsOf(w.id, w.level);

        // Companions fire from their orbit position; the hero fires from itself.
        const origin = i === 0 ? g.hero : orbitPos(i);

        if (conf.kind === 'BEAM') { stepBeam(w, s, dt, g.hero); continue; }

        w.cd -= dt;
        if (w.cd > 0) continue;

        let fired = false;
        if (conf.kind === 'SHOT')        fired = fireShot(w, s, origin);
        else if (conf.kind === 'MORTAR') fired = fireMortar(w, s, origin);
        else if (conf.kind === 'NOVA')   fired = fireNova(w, s, g.hero);
        else if (conf.kind === 'CHAIN')  fired = fireChain(w, s, origin);

        // A weapon with nothing in range retries shortly rather than burning its
        // whole cooldown, so walking into a crowd is answered immediately.
        w.cd = fired ? s.cooldown * rateMul : 140;
      }
    }

    /** Where companion `i` sits this frame — a slow orbit around the hero. */
    function orbitPos(i) {
      const n = Math.max(1, g.weapons.length - 1);
      const a = (g.t / 2600) * TAU + ((i - 1) / n) * TAU;
      const radius = 64;
      return { x: g.hero.x + Math.cos(a) * radius, y: g.hero.y + Math.sin(a) * radius };
    }

    // ---- bullets -------------------------------------------------------

    /** Tests one bullet against one enemy. Returns true if the bullet is spent. */
    function strike(b, e) {
      if (e.hp <= 0) return false;
      const dx = e.x - b.x, dy = e.y - b.y;
      const rr = e.r + b.r;
      if (dx * dx + dy * dy > rr * rr) return false;
      if (b.hits && b.hits.has(e.id)) return false;
      hurt(e, b.damage, { armorPiercing: b.armorPiercing });
      if (b.pierce > 0) {
        b.pierce -= 1;
        if (!b.hits) b.hits = new Set();
        b.hits.add(e.id);
        return false;
      }
      b.life = -1;
      return true;
    }

    function stepBullets(dt) {
      const sec = dt / 1000;
      for (const b of g.bullets) {
        b.px = b.x; b.py = b.y;
        b.x += b.vx * sec;
        b.y += b.vy * sec;
        b.life -= dt;
        if (b.arc != null) b.arcT += dt;

        if (b.splash) {
          // A mortar shell detonates when its flight time is up, wherever it is.
          if (b.life <= 0) {
            const r2 = b.splash * b.splash;
            for (const e of g.enemies) {
              const dx = e.x - b.x, dy = e.y - b.y;
              if (dx * dx + dy * dy <= r2) hurt(e, b.damage);
            }
            fx('boom', b.x, b.y, b.splash, 300, '#fb7185');
            g.shake = Math.max(g.shake, 3);
            sfx('boom');
          }
          continue;
        }

        // Only the cells the bullet could possibly be touching.
        let spent = false;
        const cx = (b.x / CELL) | 0, cy = (b.y / CELL) | 0;
        for (let ox = -1; ox <= 1 && !spent; ox++) {
          for (let oy = -1; oy <= 1 && !spent; oy++) {
            const bucket = grid.get((cx + ox) * 4096 + (cy + oy));
            if (!bucket) continue;
            for (const e of bucket) { if (strike(b, e)) { spent = true; break; } }
          }
        }
        if (!spent) for (const e of bigs) { if (strike(b, e)) break; }
      }
      compact(g.bullets, b => b.life > 0);
    }

    // ---- enemies -------------------------------------------------------

    /**
     * Runs an enemy's attack pattern and returns the velocity it wants this
     * step, or null to mean "walk at the hero as usual".
     */
    function attackStep(e, dt, dist, ux, uy) {
      const A = e.attack;
      // No pattern — or chilled before it could start one: just walk.
      if (!A || (e.slowT > 0 && e.mode === 'seek')) { if (e.atkCd > 0) e.atkCd -= dt; return null; }

      if (e.boss) {
        // The slam: she stops, a ring grows on the ground, and it lands.
        e.atkCd -= dt;
        if (e.atkCd <= 0 && dist < A.slamDist) {
          e.atkCd = A.slamEveryMs;
          e.mode = 'wind'; e.modeT = A.slamMs * 0.55;
          g.slams.push({ x: e.x, y: e.y, r: A.slamRadius * e.sizeMul, life: A.slamMs, max: A.slamMs, damage: A.slamDamage });
          sfx('boss', { pitch: 1.4, volume: 0.7 });
        }
        // Workers rally to her, exactly as they pour out of her on the TD road.
        e.summonCd -= dt;
        if (e.summonCd <= 0) {
          e.summonCd = A.summonEveryMs;
          for (let i = 0; i < A.summonCount; i++) {
            const a = (i / A.summonCount) * TAU + Math.random();
            spawnAt('ANT', clamp(e.x + Math.cos(a) * 70, 30, WORLD.width - 30), clamp(e.y + Math.sin(a) * 70, 30, WORLD.height - 30), { speedMul: 1.15 });
          }
          fx('burst', e.x, e.y, e.r * 1.6, 360, '#b91c1c');
        }
        if (e.mode === 'wind') {
          e.modeT -= dt;
          if (e.modeT <= 0) e.mode = 'seek';
          return { vx: 0, vy: 0 };
        }
        return null;
      }

      if (e.mode === 'seek') {
        e.atkCd -= dt;
        if (e.atkCd <= 0 && dist < A.triggerDist && dist > 60) {
          e.mode = 'wind'; e.modeT = A.windMs;
          e.ax = ux; e.ay = uy;              // committed: it will not re-aim
        }
        return null;
      }
      if (e.mode === 'wind') {
        e.modeT -= dt;
        if (e.modeT <= 0) { e.mode = 'go'; e.modeT = A.goMs; }
        // Plant its feet and shudder — the warning — without giving up ground.
        return { vx: 0, vy: 0 };
      }
      // 'go' — committed, but with a little steer: a charge that could never
      // bend was simply walked around, and the pattern stopped being a threat.
      // The turn rate is low enough that a real sidestep, or the dash, still
      // beats it.
      e.modeT -= dt;
      if (e.modeT <= 0) { e.mode = 'seek'; e.atkCd = between(A.cooldownMs); }
      const turn = (A.turnRate || 1.6) * (dt / 1000);
      const cross = e.ax * uy - e.ay * ux;
      const dot = e.ax * ux + e.ay * uy;
      if (dot > 0.2) {
        const ang = Math.max(-turn, Math.min(turn, Math.asin(Math.max(-1, Math.min(1, cross)))));
        const c = Math.cos(ang), sn = Math.sin(ang);
        const nx = e.ax * c - e.ay * sn, ny = e.ax * sn + e.ay * c;
        e.ax = nx; e.ay = ny;
      }
      return { vx: e.ax * e.speed * A.speedMul, vy: e.ay * e.speed * A.speedMul };
    }

    function stepEnemies(dt) {
      const sec = dt / 1000;
      const h = g.hero;
      rebuildGrid();

      // Contact is measured two ways: the WORST thing touching you, and how many
      // things are touching you. See the damage step below for why both matter.
      let contactMax = 0;
      let contactCount = 0;
      for (const e of g.enemies) {
        if (e.hp <= 0) continue;
        e.px = e.x; e.py = e.y;
        e.age += dt;
        if (e.flash > 0) e.flash -= dt;
        let mul = 1;
        if (e.slowT > 0) { e.slowT -= dt; mul = 1 - e.slowPct; }

        // The boss loses patience with being kited — timed from ITS OWN spawn, so
        // every recurring Broodmother enrages the same way rather than all of the
        // later ones arriving already enraged.
        let speed = e.speed;
        if (e.boss && e.spawnT != null && g.t - e.spawnT > RUN.enrageAfterMs) speed *= 1.35;

        const dx = h.x - e.x, dy = h.y - e.y;
        const dist = Math.hypot(dx, dy) || 1;
        let ux = dx / dist, uy = dy / dist;

        const move = attackStep(e, dt, dist, ux, uy);
        if (move) {
          e.x += move.vx * mul * sec;
          e.y += move.vy * mul * sec;
        } else {
          if (e.weave) {
            e.phase += sec * 3.4;
            const wob = Math.sin(e.phase) * e.weave;
            const px = -uy, py = ux;
            ux += px * wob; uy += py * wob;
            const n = Math.hypot(ux, uy) || 1;
            ux /= n; uy /= n;
          }
          e.x += ux * speed * mul * sec;
          e.y += uy * speed * mul * sec;
        }

        // Separation against the eight neighbouring cells only. A body mid-charge
        // ploughs through the crowd rather than being nudged off its line.
        if (e.mode !== 'go') {
          const cx = (e.x / CELL) | 0, cy = (e.y / CELL) | 0;
          let checked = 0;
          for (let ox = -1; ox <= 1 && checked < 10; ox++) {
            for (let oy = -1; oy <= 1 && checked < 10; oy++) {
              const bucket = grid.get((cx + ox) * 4096 + (cy + oy));
              if (!bucket) continue;
              for (const o of bucket) {
                if (o === e) continue;
                checked++;
                if (checked > 10) break;
                const ddx = e.x - o.x, ddy = e.y - o.y;
                const min = (e.r + o.r) * 0.78;
                const d2 = ddx * ddx + ddy * ddy;
                if (d2 > 0.01 && d2 < min * min) {
                  const d = Math.sqrt(d2);
                  const push = (min - d) * 0.5;
                  e.x += (ddx / d) * push;
                  e.y += (ddy / d) * push;
                }
              }
            }
          }
        }

        e.x = clamp(e.x, 10, WORLD.width - 10);
        e.y = clamp(e.y, 10, WORLD.height - 10);

        if (dist < e.r + 20) {
          contactCount++;
          // A landed charge hurts more than a walk-in — that is what the wind-up
          // was warning about.
          const hit = e.mode === 'go' ? Math.round(e.damage * 1.5) : e.damage;
          if (hit > contactMax) contactMax = hit;
        }
      }

      compact(g.enemies, e => e.hp > 0);

      // One global window of invulnerability rather than one per enemy. Per-enemy
      // cooldowns are the genre norm, but they make a crowd of twenty do twenty
      // times the damage of one, and a student who gets briefly surrounded is
      // simply deleted with nothing to learn from it.
      //
      // Instead: the hit is the WORST thing touching you, plus a small term for
      // how many. So quality of threat dominates — a Stag Beetle hurts more than
      // a dozen ants — while a crowd is still worse than a single body, which is
      // what keeps the swarm frightening rather than decorative.
      h.iframe -= dt;
      if (contactCount > 0) {
        const crowd = Math.min(6, Math.floor(contactCount / 5));
        damageHero(contactMax + crowd);
      }

      // Slams land when their ring is full.
      for (const s of g.slams) {
        s.life -= dt;
        if (s.life <= 0) {
          const dx = h.x - s.x, dy = h.y - s.y;
          if (dx * dx + dy * dy <= s.r * s.r) damageHero(s.damage, { heavy: true });
          fx('boom', s.x, s.y, s.r, 380, '#ef4444');
          g.shake = Math.max(g.shake, 14);
          sfx('boom', { pitch: 0.6, volume: 1.3 });
        }
      }
      compact(g.slams, s => s.life > 0);
    }

    // ---- gems ----------------------------------------------------------

    function collect(gem) {
      const h = g.hero;
      if (gem.heal) {
        h.hp = Math.min(h.maxHp, h.hp + gem.heal);
        pop(`+${gem.heal}`, h.x, h.y - 40, '#34d399');
        sfx('heal');
        return;
      }
      if (gem.power === 'MAGNET') {
        // Everything on the field comes to you.
        for (const o of g.gems) if (!o.power && !o.heal) o.pulled = true;
        pop(PICKUPS.MAGNET.label, h.x, h.y - 50, PICKUPS.MAGNET.color);
        fx('nova', h.x, h.y, 420, 520, PICKUPS.MAGNET.color);
        sfx('powerup');
        return;
      }
      if (gem.power === 'BOMB') {
        const B = PICKUPS.BOMB;
        const dmg = B.damage + B.perLevel * h.level;
        const r2 = B.radius * B.radius;
        for (const e of g.enemies) {
          const dx = e.x - h.x, dy = e.y - h.y;
          if (dx * dx + dy * dy <= r2) hurt(e, e.boss ? dmg * 0.5 : dmg, { armorPiercing: true });
        }
        pop(B.label, h.x, h.y - 50, B.color);
        fx('boom', h.x, h.y, B.radius, 520, B.color);
        g.shake = 22;
        sfx('boom', { pitch: 0.5, volume: 1.5 });
        return;
      }
      if (gem.power === 'MEAT') {
        const M = PICKUPS.MEAT;
        h.hp = Math.min(h.maxHp, h.hp + M.heal);
        pop(M.label, h.x, h.y - 40, M.color);
        sfx('heal');
        return;
      }
      h.xp += gem.value;
      // A run of gems plays a rising scale — the sound of a good sweep.
      g.gemStreak = g.gemStreakT > 0 ? Math.min(14, g.gemStreak + 1) : 0;
      g.gemStreakT = 420;
      sfx('pickup', { pitch: 1 + g.gemStreak * 0.06 });
    }

    function stepGems(dt) {
      const sec = dt / 1000;
      const h = g.hero;
      const pull = h.pickupR;
      if (g.gemStreakT > 0) g.gemStreakT -= dt;
      for (const gem of g.gems) {
        gem.px = gem.x; gem.py = gem.y;
        const dx = h.x - gem.x, dy = h.y - gem.y;
        const d = Math.hypot(dx, dy) || 1;
        if (gem.pulled) {
          const s = 900;
          gem.x += (dx / d) * s * sec;
          gem.y += (dy / d) * s * sec;
        } else if (d < pull) {
          // Accelerating pull, so a magnet build feels like a vacuum.
          const s = 260 + (1 - d / pull) * 520;
          gem.x += (dx / d) * s * sec;
          gem.y += (dy / d) * s * sec;
        } else {
          gem.x += gem.vx * sec;
          gem.y += gem.vy * sec;
          gem.vx *= 0.92;
          gem.vy *= 0.92;
        }
        if (d < 30) { gem.taken = true; collect(gem); }
      }
      compact(g.gems, gem => !gem.taken);

      let levelled = false;
      while (h.xp >= h.xpNext) {
        h.xp -= h.xpNext;
        h.level += 1;
        h.xpNext = xpForLevel(h.level);
        g.pendingLevels += 1;
        levelled = true;
      }
      if (levelled) sfx('levelUp');
      if (g.pendingLevels > 0 && g.state === 'PLAYING') {
        g.state = 'LEVELUP';
        levelRef.current?.();
      }
    }

    // ---- hero ----------------------------------------------------------

    function stepHero(dt, aura) {
      const sec = dt / 1000;
      const h = g.hero;
      const input = inputRef.current || {};
      const speed = h.baseSpeed * h.speedMul * (1 + aura.moveSpeed);

      h.px = h.x; h.py = h.y;
      g.cam.px = g.cam.x; g.cam.py = g.cam.y;

      let dx = 0, dy = 0;
      const keys = input.keys;
      if (keys && keys.size) {
        if (keys.has('up')) dy -= 1;
        if (keys.has('down')) dy += 1;
        if (keys.has('left')) dx -= 1;
        if (keys.has('right')) dx += 1;
      }
      // A thumb steers with a stick: the direction from where it first touched.
      // A mouse steers by pointing: the hero walks to where the pointer is held.
      if (dx === 0 && dy === 0 && input.stick) {
        dx = input.sx || 0; dy = input.sy || 0;
      } else if (dx === 0 && dy === 0 && input.pointerDown) {
        const px = input.wx - h.x, py = input.wy - h.y;
        const d = Math.hypot(px, py);
        if (d > 14) { dx = px / d; dy = py / d; }
      }

      const mag = Math.hypot(dx, dy);
      if (mag > 0) { dx /= mag; dy /= mag; h.lastX = dx; h.lastY = dy; }

      // The dash. Requested by the shell (a key, a button, a double-tap); it goes
      // the way the hero is moving, or the way it last moved if it is standing.
      if (h.dashCd > 0) h.dashCd -= dt;
      if (input.dash) {
        input.dash = false;
        if (h.dashCd <= 0 && h.dashT <= 0) {
          h.dashT = DASH.ms;
          h.dashCd = DASH.cooldownMs;
          h.dashX = mag > 0 ? dx : h.lastX;
          h.dashY = mag > 0 ? dy : h.lastY;
          h.iframe = Math.max(h.iframe, DASH.iframeMs);
          fx('burst', h.x, h.y, 34, 260, '#e0f2fe');
          sfx('dash');
        }
      }

      if (h.dashT > 0) {
        h.dashT -= dt;
        h.x = clamp(h.x + h.dashX * speed * DASH.speedMul * sec, 24, WORLD.width - 24);
        h.y = clamp(h.y + h.dashY * speed * DASH.speedMul * sec, 24, WORLD.height - 24);
        h.walkPhase += sec * 18;
        // Afterimages, so the burst reads as speed rather than a teleport.
        if (g.fx.length < LIMITS.fx) g.fx.push({ id: newId(), kind: 'ghost', x: h.x, y: h.y, r: 0, life: 200, max: 200, facing: h.facing });
      } else if (mag > 0) {
        h.x = clamp(h.x + dx * speed * sec, 24, WORLD.width - 24);
        h.y = clamp(h.y + dy * speed * sec, 24, WORLD.height - 24);
        h.walkPhase += sec * 9;
      }
      if (mag > 0 && dx !== 0) h.facing = dx > 0 ? 1 : -1;

      if (h.regen > 0 && h.hp < h.maxHp) {
        h.hp = Math.min(h.maxHp, h.hp + h.regen * sec);
      }
      if (h.hurtFlash > 0) h.hurtFlash -= dt;

      // The Blight: the arena closes toward its centre and the air outside the
      // ring eats health — through armour and invulnerability alike, since it is
      // not a hit but a place. So the space to kite in keeps shrinking.
      g.blightR = blightRadius(g.t);
      if (g.blightR != null) {
        const dx = h.x - WORLD.width / 2, dy = h.y - WORLD.height / 2;
        const out = Math.hypot(dx, dy) > g.blightR;
        if (out && !g.outside) { pop('GET INSIDE THE RING', h.x, h.y - 70, '#f43f5e'); sfx('hurt'); }
        g.outside = out;
        if (out) {
          h.hp -= h.maxHp * SCALING.blight.dps * sec;
          h.hurtFlash = 120;
          if (h.hp <= 0) { h.hp = 0; g.state = 'DEAD'; g.outcome = 'DEAD'; sfx('gameOver'); }
        }
      }

      // Camera eases toward the hero so a sharp change of direction does not
      // snap the whole world sideways.
      g.cam.x += (h.x - g.cam.x) * 0.16;
      g.cam.y += (h.y - g.cam.y) * 0.16;
      if (g.shake > 0) g.shake = Math.max(0, g.shake - dt * 0.045);
    }

    // ---- one fixed step ------------------------------------------------

    function step(dt) {
      g.t += dt;
      g.scoreFrac += (RUN.scorePerSecond * D.scoreMul * dt) / 1000;
      if (g.scoreFrac >= 1) {
        const whole = Math.floor(g.scoreFrac);
        g.score += whole;
        g.scoreFrac -= whole;
      }

      if (g.comboT > 0) {
        g.comboT -= dt;
        if (g.comboT <= 0) g.combo = 0;
      }

      const aura = auraBonus();
      stepHero(dt, aura);
      runSpawns(dt);
      rebuildGrid();
      stepWeapons(dt, aura);
      stepBullets(dt);
      stepEnemies(dt);
      stepGems(dt);

      const sec = dt / 1000;
      for (const p of g.pops) { p.life -= dt; p.y -= dt * 0.03; }
      compact(g.pops, p => p.life > 0);
      for (const n of g.nums) { n.life -= dt; n.y -= dt * 0.05; }
      compact(g.nums, n => n.life > 0);
      for (const f of g.fx) f.life -= dt;
      compact(g.fx, f => f.life > 0);
      for (const s of g.shards) {
        s.life -= dt;
        s.x += s.vx * sec; s.y += s.vy * sec;
        s.vx *= 0.9; s.vy *= 0.9;
      }
      compact(g.shards, s => s.life > 0);

      // The only way a run ends is death — there is no victory state any more.
      if (g.state === 'DEAD') endRef.current?.(g.outcome, g.score);
    }

    // ---- rAF -----------------------------------------------------------

    // What React shows. Rendered when it changes: at once for the things a
    // player must not miss, and at most ~10 times a second for the rest.
    let shown = '';
    let urgentShown = '';
    let lastReact = 0;
    let lastPaint = 0;
    const hudKey = () => {
      const h = g.hero;
      return `${Math.ceil(h.hp)}|${h.xp}|${Math.round(g.score / 10)}|${(g.t / 1000) | 0}|${g.combo}|${h.dashCd <= 0}|${g.boss ? Math.ceil(g.boss.hp / 20) : 0}`;
    };
    const urgentKey = () => `${g.state}|${g.hero.level}|${g.hero.revives}|${!!g.boss}|${g.weapons.length}`;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const elapsed = now - last;
      last = now;

      const running = g.state === 'PLAYING' && !pausedRef.current;
      if (running) {
        // A tab that was in the background hands back a huge delta; clamping stops
        // the sim fast-forwarding through a minute of spawns in one frame. It is
        // also what keeps a slow device playable: a frame slower than a tenth of
        // a second is not made up with extra steps (they would make the next
        // frame slower still); the run slows down instead.
        acc += Math.min(elapsed, 100);
        let guard = 0;
        while (acc >= STEP_MS && guard < 3) {
          step(STEP_MS);
          acc -= STEP_MS;
          guard++;
          if (g.state !== 'PLAYING') break;
        }
        if (guard >= 3) acc = 0;
      } else {
        acc = 0;
      }

      // Paint every frame while the run is live. Paused or behind the level-up
      // screen nothing moves, so a few paints a second keep the arena fresh
      // after a resize without redrawing the same picture sixty times a second
      // under a question the student is trying to read.
      if (running || now - lastPaint > 200) {
        lastPaint = now;
        if (!running) g.shake = 0;
        drawRef?.current?.(running ? acc / STEP_MS : 1);
      }

      const urgent = urgentKey();
      const key = hudKey();
      if (urgent !== urgentShown || (key !== shown && now - lastReact > 95)) {
        urgentShown = urgent;
        shown = key;
        lastReact = now;
        renderRef.current();
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // The loop owns the run for its lifetime; a new run remounts the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
