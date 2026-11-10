// src/components/towerdefense/useGameEngine.js
//
// =====================================================================
// The Tower Defense simulation.
//
// Three clocks, deliberately separate:
//
//   SIMULATION  a strict fixed step of 1/30 s. Every balance number in gameData
//               and wavePresets was tuned against this step, so it does not
//               change. Fast-forward runs MORE steps per frame rather than
//               bigger ones — a 3x step used to make one spawn-per-step groups
//               come out a quarter thinner, so the fast button made the game
//               easier as well as faster.
//   PAINT       every display frame. The board's canvas (GameBoard) registers a
//               painter on `drawRef`; it is handed `alpha`, how far we are
//               between the last two simulation steps, and draws every moving
//               thing interpolated to that instant. That is what makes thirty
//               simulated frames look like sixty on screen.
//   REACT       only when something React actually shows has changed — credits,
//               lives, the wave, the score. It used to be asked to reconcile the
//               whole screen (HUD, menus, board) thirty times a second.
//
// All mutable state lives on one ref-held object `g`, mutated in place.
// =====================================================================
import { useEffect, useRef } from 'react';
import { TOWERS, ENEMIES, distSq, getStatsMap, enemySkin } from './gameData';
import { sfx } from '../../arcade/sfx';

const TILE_SPEED = 2.0;

export const STEP_MS = 1000 / 30;

// Cosmetic caps. Past these, new effects are dropped; gameplay never depends on
// an effect having been created.
const MAX_FLOATERS = 60;
const MAX_PARTICLES = 70;
const MAX_SHARDS = 160;

const PROJ_COLOR = {
  DART:   '#0ea5e9',
  SNIPER: '#10b981',
  SPLASH: '#f43f5e',
  FROST:  '#06b6d4',
  CHAIN:  '#fbbf24'
};

// What a body bursts into. Keyed by role slot so every tribe shares it.
const SHARD_COLOR = {
  ANT: '#fca5a5', WASP: '#fde047', BEETLE: '#b45309', QUEEN: '#c084fc', GIANT_ANT: '#ef4444',
};

/**
 * The targeting priorities a player can set on a tower, in menu order.
 * SMART is only offered once the tower's own targeting upgrade is bought, and
 * stands for whatever that upgrade does (Shatter, Cluster Bomb, …).
 */
export const TARGET_MODES = [
  { id: 'FIRST',  label: 'First',  hint: 'Furthest along the road' },
  { id: 'LAST',   label: 'Last',   hint: 'Newest arrival' },
  { id: 'STRONG', label: 'Strong', hint: 'Most health' },
  { id: 'LOWEST', label: 'Weak',   hint: 'Least health — finish them off' },
  { id: 'CLOSE',  label: 'Close',  hint: 'Nearest to the tower' },
];

/** Drops dead entries without allocating a new array every frame. */
function compact(arr, keep) {
  let w = 0;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (keep(item)) arr[w++] = item;
  }
  arr.length = w;
}

/** The mode a tower's targeting UPGRADE switches it to. */
function smartModeFor(typeId) {
  if (typeId === 'SNIPER') return 'ARMOR';
  if (typeId === 'SPLASH') return 'DENSEST';
  if (typeId === 'CHAIN')  return 'DENSEST';
  if (typeId === 'FROST')  return 'FRESH';
  return null;
}

/** What a tower is aiming at right now: the player's pick, else its default. */
export function towerTargetingMode(tower) {
  const conf = TOWERS[tower.typeId];
  const smart = tower.upgrades?.targeting ? smartModeFor(tower.typeId) : null;
  if (tower.targetMode === 'SMART') return smart || conf.defaultTargeting || 'FIRST';
  if (tower.targetMode) return tower.targetMode;
  return smart || conf.defaultTargeting || 'FIRST';
}

export function useGameEngine({
  gRef, render, softRender, layout, engineConfig,
  onTriggerChallenge, onAutoStartWave, challengeActiveRef, autoPlayRef, drawRef
}) {
  // The loop must survive re-renders, so every callback is read through a
  // latest-value ref rather than being a dependency of the effect.
  const renderRef = useRef(render);
  // Optional: called instead of `render` when only a number changed (credits,
  // score), so the caller can update its number displays without re-rendering
  // the whole screen.
  const softRef = useRef(softRender);
  const challengeRef = useRef(onTriggerChallenge);
  const autoStartRef = useRef(onAutoStartWave);
  useEffect(() => {
    renderRef.current = render;
    softRef.current = softRender;
    challengeRef.current = onTriggerChallenge;
    autoStartRef.current = onAutoStartWave;
  }, [render, softRender, onTriggerChallenge, onAutoStartWave]);

  useEffect(() => {
    let raf;
    let last = performance.now();
    let acc = 0;

    const g = gRef.current;
    const newId = () => g.nextId++;
    const onTriggerChallenge = () => challengeRef.current();
    let frameNo = 0;

    // Per-unit difficulty, supplied by the unit's arcadeConfig. A missing or
    // partial object must behave exactly like the pre-scaling game, so every
    // multiplier falls back to 1.
    const D = engineConfig.difficulty || {};
    const HP_MUL     = Number(D.hpMul)     > 0 ? Number(D.hpMul)     : 1;
    const SPEED_MUL  = Number(D.speedMul)  > 0 ? Number(D.speedMul)  : 1;
    const REWARD_MUL = Number(D.rewardMul) > 0 ? Number(D.rewardMul) : 1;
    const SCORE_MUL  = Number(D.scoreMul)  > 0 ? Number(D.scoreMul)  : 1;

    // The enemy tribe painted over the role slots for this arena (see gameData's
    // ENEMY_SKINS). Stats always come from ENEMIES[slot]; the tribe only changes
    // the name, artwork and on-board size, so every theme is exactly as hard.
    const TRIBE = engineConfig.tribeId || 'INSECT';

    // ---- cosmetic emitters -------------------------------------------------

    function ring(row, col, radius, color, life) {
      if (g.particles.length >= MAX_PARTICLES) return;
      g.particles.push({ id: newId(), row, col, radius, color, life, maxLife: life });
    }

    function floater(text, row, col, kind, life) {
      if (g.floaters.length >= MAX_FLOATERS) return;
      g.floaters.push({ id: newId(), text, row, col, kind, life, maxLife: life });
    }

    /** A body coming apart: a handful of bits thrown outward, then gravity. */
    function burst(c) {
      const big = c.typeKey === 'QUEEN' || c.typeKey === 'GIANT_ANT';
      const n = big ? 14 : c.typeKey === 'BEETLE' ? 7 : 4;
      const color = SHARD_COLOR[c.typeKey] || '#fbbf24';
      for (let i = 0; i < n && g.shards.length < MAX_SHARDS; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = (big ? 3.2 : 2.2) * (0.4 + Math.random() * 0.8);
        const life = 320 + Math.random() * 260;
        g.shards.push({
          row: c.row, col: c.col,
          vr: Math.sin(a) * v - 0.8, vc: Math.cos(a) * v,
          size: (big ? 4 : 2.5) + Math.random() * 2.5,
          color, life, maxLife: life,
        });
      }
    }

    function banner(text, sub, tone, life = 2200) {
      g.banner = { text, sub, tone, life, maxLife: life };
    }

    // ---- movement ----------------------------------------------------------

    function distAlong(c) {
      if (c.waypointIdx >= layout.path.length - 1) return Infinity;
      const [pr, pc] = layout.path[c.waypointIdx];
      const [tr, tc] = layout.path[c.waypointIdx + 1];
      const total = Math.hypot(tr - pr, tc - pc);
      const rem = Math.hypot(tr - c.row, tc - c.col);
      return c.waypointIdx + (1 - rem / total);
    }

    function moveCreep(c, dt) {
      let slowMul = 1;
      if (c.freezeTimer > 0) { slowMul = 1 - c.slowPercent; c.freezeTimer -= dt; }
      let dist = c.speed * slowMul * (dt / 1000) * TILE_SPEED;

      while (dist > 0 && c.waypointIdx < layout.path.length - 1) {
        const [tr, tc] = layout.path[c.waypointIdx + 1];
        const dr = tr - c.row, dc = tc - c.col;
        c.angle = Math.atan2(dr, dc) * (180 / Math.PI);

        const d = Math.hypot(dr, dc);
        if (d <= dist) {
          c.row = tr; c.col = tc; c.waypointIdx++; dist -= d;
        } else {
          c.row += (dr / d) * dist; c.col += (dc / d) * dist; dist = 0;
        }
      }
      if (c.waypointIdx >= layout.path.length - 1) c.reachedEnd = true;
    }

    // ---- targeting ---------------------------------------------------------

    // Reused across every tower, every step: the in-range candidate list used
    // to be a fresh `filter` allocation per tower per frame.
    const pool = [];

    // Density is only needed by two upgraded towers, is identical for all of
    // them within a step, and used to be an O(creeps²) scan per tower. It is
    // computed lazily at most once per step over a coarse grid instead.
    const DENSITY_CELL = 1.8;
    let densityFrame = -1;
    const densityGrid = new Map();
    function densityAt(c) {
      if (densityFrame !== frameNo) {
        densityFrame = frameNo;
        densityGrid.clear();
        for (const x of g.creeps) {
          if (x.hp <= 0) continue;
          const key = `${Math.floor(x.row / DENSITY_CELL)}_${Math.floor(x.col / DENSITY_CELL)}`;
          densityGrid.set(key, (densityGrid.get(key) || 0) + 1);
        }
      }
      return densityGrid.get(`${Math.floor(c.row / DENSITY_CELL)}_${Math.floor(c.col / DENSITY_CELL)}`) || 0;
    }

    function findTarget(tower, mode, stats) {
      const rangeSq = stats.range * stats.range;
      pool.length = 0;
      for (const c of g.creeps) {
        if (c.hp > 0 && !c.reachedEnd && distSq(c.row, c.col, tower.row, tower.col) <= rangeSq) {
          pool.push(c);
        }
      }
      if (pool.length === 0) return null;

      let best = pool[0];
      switch (mode) {
        case 'STRONG':
          for (const c of pool) if (c.hp > best.hp) best = c;
          return best;
        case 'LOWEST':
          for (const c of pool) if (c.hp < best.hp) best = c;
          return best;
        case 'ARMOR':
          for (const c of pool) if ((c.damageReduction || 0) > (best.damageReduction || 0)) best = c;
          return best;
        case 'CLOSE': {
          let bestD = Infinity;
          for (const c of pool) {
            const d = distSq(c.row, c.col, tower.row, tower.col);
            if (d < bestD) { bestD = d; best = c; }
          }
          return best;
        }
        case 'LAST': {
          let bestD = Infinity;
          for (const c of pool) {
            const d = distAlong(c);
            if (d < bestD) { bestD = d; best = c; }
          }
          return best;
        }
        case 'FRESH': {
          // Prefer un-slowed creeps; among those, the one furthest along.
          let bestFresh = null, bestFreshD = -Infinity, bestD = -Infinity;
          for (const c of pool) {
            const d = distAlong(c);
            if (c.freezeTimer <= 0 && d > bestFreshD) { bestFreshD = d; bestFresh = c; }
            if (d > bestD) { bestD = d; best = c; }
          }
          return bestFresh || best;
        }
        case 'DENSEST': {
          let bestN = -1;
          for (const c of pool) {
            const n = densityAt(c);
            if (n > bestN) { bestN = n; best = c; }
          }
          return best;
        }
        default: {
          let bestD = -Infinity;
          for (const c of pool) {
            const d = distAlong(c);
            if (d > bestD) { bestD = d; best = c; }
          }
          return best;
        }
      }
    }

    // ---- damage ------------------------------------------------------------

    /**
     * `src` is the tower that dealt it (or null for burns and bolts), credited
     * with the damage and the kill so the upgrade panel can show what each
     * tower has actually done — the honest answer to "is this one worth it?".
     */
    function damageCreep(c, dmg, ignoreArmor = false, flatArmorPen = 0, src = null) {
      if (c.hp <= 0) return;
      const shred = c.activeArmorShred || 0;
      const currentArmor = Math.max(0, (c.damageReduction || 0) - shred);
      const reduction = ignoreArmor ? 0 : Math.max(0, currentArmor - flatArmorPen);
      const actualDmg = Math.max(1, dmg - reduction);
      const d = Math.round(actualDmg);

      c.hp -= d;
      c.flash = 90;
      if (src) src.dealt = (src.dealt || 0) + Math.min(d, c.hp + d);

      // Chip damage from a fast tower is noise; only hits that matter get a number.
      if (d >= 15) floater(`${d}`, c.row - 0.25, c.col, 'dmg', 480);

      if (c.hp <= 0) {
        const conf = ENEMIES[c.typeKey];
        let reward = Math.round(conf.reward * REWARD_MUL);
        if (g.wave >= 51) reward = Math.floor(reward / 4);
        g.credits += reward;
        g.score += Math.round(conf.reward * 10 * SCORE_MUL);
        g.kills = (g.kills || 0) + 1;
        if (src) src.kills = (src.kills || 0) + 1;

        burst(c);
        ring(c.row, c.col, 0.6, 'rgba(255,200,0,0.55)', 400);
        if (reward > 0) floater(`+${reward}`, c.row, c.col - 0.4, 'gold', 700);
        sfx('kill');
        if (c.typeKey === 'GIANT_ANT' || c.typeKey === 'QUEEN') g.shake = Math.max(g.shake || 0, 7);
      }
    }

    // One creep object, with the active tribe's skin (visual + radius) baked in.
    // Shared by the wave spawner and the Broodmother's add-spawns so every body
    // on the board — including summoned ones — wears the arena's tribe.
    function makeCreep(typeKey, opts = {}) {
      const conf = ENEMIES[typeKey];
      const skin = enemySkin(typeKey, TRIBE);
      const hp = Math.max(1, Math.round(conf.hp * HP_MUL));
      return {
        id: newId(), typeKey,
        visual: skin.visual, radius: skin.radius,
        row: opts.row, col: opts.col,
        // Where it stood one step ago — the painter draws between the two.
        pr: opts.row, pc: opts.col,
        hp, maxHp: hp,
        speed: conf.speed * SPEED_MUL * (opts.speedMul || 1),
        waypointIdx: opts.waypointIdx || 0, angle: opts.angle || 0,
        freezeTimer: 0, slowPercent: 0, burning: 0, burnTick: 0,
        damageReduction: conf.damageReduction || 0,
        burnStacks: [], spawnTimer: opts.spawnTimer || 0,
        age: 0, flash: 0, phase: Math.random() * 6.28,
      };
    }

    function spawnCreep(typeKey) {
      const [sr, sc] = layout.path[0];
      const [nr, nc] = layout.path.length > 1 ? layout.path[1] : [sr, sc];
      const initAngle = Math.atan2(nr - sr, nc - sc) * (180 / Math.PI);

      g.creeps.push(makeCreep(typeKey, {
        row: sr, col: sc, angle: initAngle,
        spawnTimer: typeKey === 'GIANT_ANT' ? 2000 : 0
      }));
    }

    // ---- towers ------------------------------------------------------------

    function shot(tower, kind, target, extra) {
      g.projectiles.push({
        id: newId(), kind,
        row: tower.row, col: tower.col, pr: tower.row, pc: tower.col,
        targetRow: target.row, targetCol: target.col,
        life: 9999, maxLife: 9999, ...extra,
      });
    }

    function fireTower(tower, logicDt, statsMap) {
      const conf = TOWERS[tower.typeId];
      if (conf.type === 'BUFF') return;
      // The unicorn never auto-fires — it is aimed by hand (or by Auto-Prism),
      // handled in the charge block of the main step, not here.
      if (conf.type === 'UNICORN') return;
      const id = tower.id;
      g.fireCooldowns[id] = (g.fireCooldowns[id] || 0) - logicDt;
      if (g.fireCooldowns[id] > 0) return;

      const stats = statsMap.get(tower.id);
      if (!stats) return;
      const target = findTarget(tower, towerTargetingMode(tower), stats);
      if (!target) return;

      g.fireCooldowns[id] = stats.cooldown;
      // The board gives the tower a little recoil when it sees its id here.
      g.fired.push(id);
      const damage = stats.damage || 0;
      const color = PROJ_COLOR[tower.typeId];

      if (tower.typeId === 'DART') {
        damageCreep(target, damage, false, 0, tower);
        if (stats.pierce) {
          const second = g.creeps.find(c =>
            c !== target && c.hp > 0 && distSq(c.row, c.col, target.row, target.col) < 2.56);
          if (second) damageCreep(second, damage, false, 0, tower);
        }
        shot(tower, 'DART_PROJ', target, { passive: stats.pierce, speed: 18 });
        sfx('shoot');

      } else if (tower.typeId === 'CHAIN') {
        const hit = [target];
        let lastHit = target;
        // Nearest un-hit creep per bounce, found in one scan.
        for (let i = 0; i < stats.bounces; i++) {
          let next = null;
          let bestD = 6.25; // 2.5² — the chain's reach
          for (const c of g.creeps) {
            if (c.hp <= 0 || hit.includes(c)) continue;
            const d = distSq(c.row, c.col, lastHit.row, lastHit.col);
            if (d < bestD) { bestD = d; next = c; }
          }
          if (!next) break;
          hit.push(next); lastHit = next;
        }
        g.projectiles.push({
          id: newId(), kind: 'CHAIN', row: tower.row, col: tower.col,
          // The bolt is drawn tower → first → second → …, which is how it jumps.
          lines: hit.map(c => ({ row: c.row, col: c.col })), seed: Math.random() * 1000,
          life: 220, maxLife: 220
        });
        hit.forEach(c => damageCreep(c, damage, false, 0, tower));
        sfx('zap');

      } else if (tower.typeId === 'SPLASH') {
        shot(tower, 'SPLASH', target, {
          color, damage, splashRadius: stats.splashRadius, napalm: stats.napalm, speed: 7,
          src: tower, dist0: Math.hypot(target.row - tower.row, target.col - tower.col) || 1,
        });
        sfx('shoot', { pitch: 0.6 });

      } else if (tower.typeId === 'SNIPER') {
        let finalDamage = damage;

        if (stats.armorPiercing) {
          finalDamage = Math.round(damage + (target.damageReduction || 0));
          const angle = Math.atan2(target.row - tower.row, target.col - tower.col);
          const lanceLength = 4.0;

          const ux = Math.cos(angle);
          const uy = Math.sin(angle);
          const distToT = Math.hypot(target.col - tower.col, target.row - tower.row);

          for (const c of g.creeps) {
            if (c === target || c.hp <= 0) continue;
            const vx = c.col - tower.col;
            const vy = c.row - tower.row;
            const proj = vx * ux + vy * uy;
            if (proj > distToT && proj <= distToT + lanceLength) {
              const perp = Math.abs(vx * uy - vy * ux);
              if (perp < 0.8) damageCreep(c, finalDamage, true, 0, tower);
            }
          }

          g.projectiles.push({
            id: newId(), kind: 'LANCE',
            row: tower.row, col: tower.col, angle, length: distToT + lanceLength,
            life: 250, maxLife: 250
          });
        }

        damageCreep(target, finalDamage, true, 0, tower);
        shot(tower, 'SNIPER_PROJ', target, { passive: stats.armorPiercing, speed: 30 });
        sfx('shoot', { pitch: 0.45, volume: 1.4 });

      } else if (tower.typeId === 'FROST') {
        target.freezeTimer = stats.slowDuration;
        target.slowPercent = stats.slowPercent;
        damageCreep(target, damage, false, 0, tower);
        if (stats.frostBurst) {
          for (const c of g.creeps) {
            if (c === target || c.hp <= 0) continue;
            if (distSq(c.row, c.col, target.row, target.col) < 2.56) {
              c.freezeTimer = Math.max(c.freezeTimer, stats.slowDuration * 0.6);
              c.slowPercent = stats.slowPercent;
            }
          }
          ring(target.row, target.col, 1.6, 'rgba(103,232,249,0.45)', 300);
        }
        shot(tower, 'BULLET', target, { color, speed: 14 });
        sfx('freeze');

      } else {
        damageCreep(target, damage, false, 0, tower);
        if (stats.pierce) {
          const second = g.creeps.find(c =>
            c !== target && c.hp > 0 && distSq(c.row, c.col, target.row, target.col) < 2.56);
          if (second) damageCreep(second, damage, false, 0, tower);
        }
        shot(tower, 'BULLET', target, { color, speed: 16 });
        sfx('shoot');
      }
    }

    // ---- Unicorn: the aimed rainbow lance ----
    // A single beam from the horn, through the aim point, out to the far edge of
    // the board. Everything within `beamWidth` of that infinite line takes full,
    // armour-ignoring damage. Twin Rainbow adds a second beam at 90° and chills.
    function emitBeam(uni, stats, angle) {
      const ux = Math.cos(angle), uy = Math.sin(angle);
      const width = stats.beamWidth;
      const dmg = stats.damage || 0;
      for (const c of g.creeps) {
        if (c.hp <= 0) continue;
        const vx = c.col - uni.col, vy = c.row - uni.row;
        const along = vx * ux + vy * uy;         // distance along the beam
        if (along < -0.6) continue;               // strictly behind the horn
        const perp = Math.abs(vx * uy - vy * ux); // distance off the line
        if (perp <= width) {
          damageCreep(c, dmg, true, 0, uni);
          if (stats.twin) {                       // Twin Rainbow also chills
            c.freezeTimer = Math.max(c.freezeTimer, 1400);
            c.slowPercent = Math.max(c.slowPercent, 0.5);
          }
        }
      }
      const length = Math.hypot(layout.rows, layout.cols) + 2;
      g.projectiles.push({
        id: newId(), kind: 'RAINBOW_BEAM',
        row: uni.row, col: uni.col, angle, length, width,
        life: 430, maxLife: 430
      });
    }

    function fireUnicornBeam(uni, stats, aimRow, aimCol) {
      const angle = Math.atan2(aimRow - uni.row, aimCol - uni.col);
      emitBeam(uni, stats, angle);
      if (stats.twin) emitBeam(uni, stats, angle + Math.PI / 2);
      ring(uni.row, uni.col, 1.4, 'rgba(236,72,153,0.5)', 420);
      g.unicornCharge = 0;
      g.shake = Math.max(g.shake || 0, 6);
      g.fired.push(uni.id);
      sfx('beam');
    }

    // ---- one fixed step ----------------------------------------------------

    function step(dt) {
      frameNo++;
      g.time = (g.time || 0) + dt;

      // Each group in the queue spawns on its own timer, so a wave's enemy types
      // arrive interleaved rather than one type after another.
      if (g.waveInProgress && g.spawnQueue.length > 0) {
        // Backwards so exhausted groups can be spliced out safely.
        for (let i = g.spawnQueue.length - 1; i >= 0; i--) {
          const group = g.spawnQueue[i];

          // `interval` forces a spawn on the group's first step; the (i * 200)
          // staggers groups so four enemies never stack on one pixel; `delay`
          // lets wavePresets hold a group back.
          if (group.timer === undefined) {
            group.timer = group.interval - (i * 200) - (group.delay || 0);
          }

          group.timer += dt;

          if (group.timer >= group.interval) {
            spawnCreep(group.type);
            group.count--;
            group.timer = 0;
            if (group.count <= 0) g.spawnQueue.splice(i, 1);
          }
        }
      }

      for (const c of g.creeps) {
        if (c.hp <= 0) continue;
        c.pr = c.row; c.pc = c.col;
        c.age += dt;
        if (c.flash > 0) c.flash -= dt;
        moveCreep(c, dt);

        if (c.typeKey === 'GIANT_ANT') {
          c.spawnTimer = (c.spawnTimer || 0) - dt;
          if (c.spawnTimer <= 0 && !c.reachedEnd) {
            c.spawnTimer = 2000;
            for (let i = 0; i < 6; i++) {
              const rOff = (Math.random() - 0.5) * 0.5;
              const cOff = (Math.random() - 0.5) * 0.5;
              g.creeps.push(makeCreep('ANT', {
                row: c.row + rOff, col: c.col + cOff,
                waypointIdx: c.waypointIdx, angle: c.angle, speedMul: 1.15
              }));
            }
            ring(c.row, c.col, 1.2, 'rgba(185,28,28,0.6)', 300);
          }
        }

        if (c.burnStacks && c.burnStacks.length > 0) {
          let activeStacks = 0;
          for (let i = c.burnStacks.length - 1; i >= 0; i--) {
            const b = c.burnStacks[i];
            b.life -= dt; b.tick -= dt;
            if (b.tick <= 0) { damageCreep(c, 8); b.tick = 400; }
            if (b.life > 0) activeStacks++;
            else c.burnStacks.splice(i, 1);
          }
          c.activeArmorShred = activeStacks;
        } else {
          c.activeArmorShred = 0;
        }

        if (c.burning > 0) {
          c.burning -= dt; c.burnTick -= dt;
          if (c.burnTick <= 0) { damageCreep(c, 8); c.burnTick = 400; }
        }
      }

      let leaked = 0;
      for (const c of g.creeps) if (c.reachedEnd && c.hp > 0) { g.lives -= 1; c.hp = -1; leaked++; }
      if (leaked > 0) {
        const [er, ec] = layout.path[layout.path.length - 1];
        floater(`-${leaked} ❤`, er - 0.6, ec - 0.3, 'bad', 900);
        g.leaks = (g.leaks || 0) + leaked;
        g.leaksThisWave = (g.leaksThisWave || 0) + leaked;
        g.shake = Math.max(g.shake || 0, 9);
        g.hurt = 500;                       // the board's red edge-flash
        sfx('leak');
      }
      compact(g.creeps, (c) => c.hp > 0 && !c.reachedEnd);

      // A Reward Blast: 500 damage to everything on the road, through armour.
      if (g.boltFire) {
        g.boltFire = false;
        for (const c of g.creeps) if (c.hp > 0) damageCreep(c, 500, true);
        ring(layout.rows / 2, layout.cols / 2, Math.max(layout.rows, layout.cols), 'rgba(99,102,241,0.6)', 450);
        floater('⚡ BLAST', layout.rows / 2, layout.cols / 2, 'bolt', 900);
        g.shake = Math.max(g.shake || 0, 8);
        sfx('boom', { pitch: 0.7, volume: 1.4 });
        sfx('zap');
      }

      // Adjacency and Nitro auras make each tower's stats depend on every other
      // tower, so they are resolved once (and cached until the board changes).
      const statsMap = getStatsMap(g.towers, g.towersVersion || 0);
      for (const t of g.towers) fireTower(t, dt, statsMap);

      // Unicorn charge + fire. It builds charge every step it exists; when full
      // it fires on the player's aim request, or by itself with Auto-Prism.
      const uni = g.towers.find(t => t.typeId === 'UNICORN');
      if (uni) {
        const uStats = statsMap.get(uni.id);
        if (uStats) {
          const full = uStats.chargeTime || 1;
          const wasReady = g.unicornCharge >= full;
          if (g.unicornCharge < full) g.unicornCharge = Math.min(full, g.unicornCharge + dt);
          const ready = g.unicornCharge >= full;
          if (ready && !wasReady) sfx('powerup');
          if (ready && g.unicornFire) {
            fireUnicornBeam(uni, uStats, g.unicornFire.row, g.unicornFire.col);
            g.unicornFire = null;
          } else if (ready && uStats.autoAim) {
            // Aim down the densest cluster of live creeps.
            let target = null, bestN = 0;
            for (const c of g.creeps) {
              if (c.hp <= 0) continue;
              const n = densityAt(c);
              if (n > bestN) { bestN = n; target = c; }
            }
            if (target) fireUnicornBeam(uni, uStats, target.row, target.col);
          }
        }
      } else if (g.unicornCharge || g.unicornFire) {
        // Unicorn sold — clear its state so a rebuild starts from empty.
        g.unicornCharge = 0;
        g.unicornFire = null;
      }

      for (const p of g.projectiles) {
        p.life -= dt;
        if (p.kind === 'BULLET' || p.kind === 'SPLASH' || p.kind === 'DART_PROJ' || p.kind === 'SNIPER_PROJ') {
          p.pr = p.row; p.pc = p.col;
          const dr = p.targetRow - p.row;
          const dc = p.targetCol - p.col;
          const d = Math.hypot(dr, dc);
          const stepLen = (p.speed || 12) * (dt / 1000);

          if (d <= stepLen) {
            if (p.kind === 'SPLASH') {
              const splashSq = p.splashRadius * p.splashRadius;
              for (const c of g.creeps) {
                if (distSq(c.row, c.col, p.targetRow, p.targetCol) <= splashSq) {
                  damageCreep(c, p.damage, false, 0, p.src || null);
                  if (p.napalm) {
                    if (!c.burnStacks) c.burnStacks = [];
                    c.burnStacks.push({ life: 4000, tick: 400 });
                  }
                }
              }
              ring(p.targetRow, p.targetCol, p.splashRadius, 'rgba(234,43,43,0.6)', 320);
              if (p.napalm) g.burnZones.push({ id: newId(), row: p.targetRow, col: p.targetCol, radius: p.splashRadius * 0.7, life: 4000, maxLife: 4000 });
              g.shake = Math.max(g.shake || 0, 2.5);
              sfx('boom');
            }
            p.life = 0;
          } else {
            p.row += (dr / d) * stepLen; p.col += (dc / d) * stepLen;
          }
        }
      }
      compact(g.projectiles, (p) => p.life > 0);
      compact(g.floaters, (f) => (f.life -= dt) > 0);
      compact(g.particles, (p) => (p.life -= dt) > 0);
      compact(g.burnZones, (z) => (z.life -= dt) > 0);

      const sec = dt / 1000;
      for (const s of g.shards) {
        s.life -= dt;
        s.row += s.vr * sec; s.col += s.vc * sec;
        s.vr += 6 * sec;                    // gravity, in tiles/s²
      }
      compact(g.shards, (s) => s.life > 0);

      if (g.banner && (g.banner.life -= dt) <= 0) g.banner = null;
      if (g.hurt > 0) g.hurt -= dt;
      if (g.shake > 0) g.shake = Math.max(0, g.shake - dt * 0.03);

      if (g.waveInProgress && g.spawnQueue.length === 0 && g.creeps.length === 0) {
        g.waveInProgress = false;
        g.credits += Math.round(50 * REWARD_MUL);
        floater(`+${Math.round(50 * REWARD_MUL)}`, layout.rows * 0.2 + 1.3, layout.cols / 2, 'gold', 1300);
        g.score += Math.round(100 * SCORE_MUL);

        // A wave with nothing through the gate is a PERFECT, and perfects in a
        // row build a streak worth more each time — a reason to over-defend that
        // plain survival never gave.
        if (!g.leaksThisWave) {
          g.perfectStreak = (g.perfectStreak || 0) + 1;
          const bonus = Math.round(40 * Math.min(5, g.perfectStreak) * SCORE_MUL);
          g.score += bonus;
          banner(g.perfectStreak > 1 ? `Perfect ×${g.perfectStreak}` : 'Perfect wave', `+${bonus} score`, 'good', 1600);
        } else {
          g.perfectStreak = 0;
          banner(`Wave ${g.wave} cleared`, null, 'plain', 1300);
        }
        sfx('waveClear');

        if (!engineConfig.generateInfiniteWave && g.wave >= engineConfig.waves.length) {
          g.gameState = 'WON';
        } else {
          g.autoPlayDelay = 1500;
        }
      }

      if (!g.waveInProgress && g.gameState === 'PLAYING' && autoPlayRef.current) {
        g.autoPlayDelay -= dt;
        if (g.autoPlayDelay <= 0) {
          g.autoPlayDelay = 9999;
          autoStartRef.current?.();
        }
      }

      if (g.lives <= 0 && g.gameState === 'PLAYING') {
        g.lives = 0; g.gameState = 'LOST';
        sfx('gameOver');
      }

      if (g.waveInProgress && g.wave >= 5) {
        g.challengeTimer -= dt;
        if (g.wave === 5 && !g.wave5ChallengeSpawned) {
          if (g.challengeTimer <= 0 && !challengeActiveRef.current) {
            onTriggerChallenge();
            g.wave5ChallengeSpawned = true;
            g.challengeTimer = 90000 + Math.random() * 30000;
          }
        } else if (g.wave > 5) {
          if (g.challengeTimer <= 0 && !challengeActiveRef.current) {
            onTriggerChallenge();
            g.challengeTimer = 90000 + Math.random() * 30000;
          }
        }
      }
    }

    // ---- what React shows --------------------------------------------------
    //
    // A string of everything on the HUD and the side panels. React is only asked
    // to render when it changes, and at most ~11 times a second unless the
    // change is one a player must see at once (a life, the wave, the end).
    let shownKey = '';
    let urgentKey = '';
    let lastReact = 0;
    let lastPaint = 0;
    let shownLives = g.lives;
    function hudKey() {
      const uni = g.towers.length && g.unicornCharge ? Math.floor(g.unicornCharge / 250) : 0;
      return `${g.credits}|${g.score}|${g.bolts}|${uni}|${g.spawnQueue.length > 0}|${g.lives}`;
    }
    function hudUrgentKey() {
      return `${g.wave}|${g.waveInProgress}|${g.gameState}|${g.paused}|${g.speed}`;
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);

      const elapsed = now - last;
      last = now;

      const running = g.gameState === 'PLAYING' && !g.paused;
      if (running) {
        // A backgrounded tab hands back a huge delta; clamping stops the game
        // fast-forwarding through a wave the player never saw. The clamp is
        // also what keeps a slow device playable: a frame that took longer than
        // a tenth of a second is not made up with extra steps, because those
        // make the next frame slower still. The game slows down instead.
        acc += Math.min(elapsed, 100) * (g.speed || 1);
        let guard = 0;
        while (acc >= STEP_MS && guard < 12) {
          step(STEP_MS);
          acc -= STEP_MS;
          guard++;
          if (g.gameState !== 'PLAYING') break;
        }
        // A machine that cannot keep up slows the game down rather than letting
        // the backlog snowball into a freeze.
        if (guard >= 12) acc = 0;
      } else {
        acc = 0;
      }

      // Paint every frame while the battle runs. Stopped (paused, won, lost),
      // nothing on the board moves, so a few paints a second is enough to keep
      // it fresh after a resize without redrawing the same picture sixty times.
      if (running || now - lastPaint > 200) {
        lastPaint = now;
        drawRef?.current?.(running ? acc / STEP_MS : 1);
      }

      const urgent = hudUrgentKey();
      const key = hudKey();
      if (urgent !== urgentKey) {
        urgentKey = urgent;
        shownKey = key;
        lastReact = now;
        renderRef.current();
      } else if (key !== shownKey && (now - lastReact > 120 || g.lives !== shownLives)) {
        // A life lost shows at once; coins and score a few times a second.
        shownLives = g.lives;
        shownKey = key;
        lastReact = now;
        (softRef.current || renderRef.current)();
      }
    }

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // render/onTriggerChallenge are deliberately absent — they are read through
    // refs above so that an unmemoised caller cannot restart the loop.
  }, [gRef, layout, engineConfig, challengeActiveRef, autoPlayRef, drawRef]);
}
