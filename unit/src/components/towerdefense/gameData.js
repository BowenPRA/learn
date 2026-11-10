// src/components/towerdefense/gameData.js

// =====================================================================
// Shared definitions for the Tower Defense game.
// Everything lives here so levels stay simple and share the same units.
// =====================================================================

// ---------- Enemies ----------
// The five entries below are ROLE SLOTS, not literally insects: SWARM, FLYER,
// TANK, BOSS and SPAWNER. Every wave, every difficulty multiplier and the
// spawner's add-behaviour key off these five keys, so their *stats* are the one
// balance surface the whole game is tuned against. A map theme then paints a
// TRIBE over the slots (see ENEMY_SKINS) — a different name and a different
// drawing per role — while the stats stay identical, so no theme is secretly
// harder than another. The keys stay ANT/WASP/… for the insect tribe so nothing
// that references them by name had to change.
//
// Balance pass (Y7 feedback: "too hard"): the heavy units shed some HP and armor
// so a light defence can still chew through a Beetle/Queen before it walks the
// board. Swarm/flyer HP is left alone — they die in one hit already.
export const ENEMIES = {
  ANT: {
    name: "Worker Ant",
    color: "bg-red-200",
    border: "border-red-400",
    hp: 30,
    speed: 1.1,
    reward: 1,
    radius: 12,
    damageReduction: 0
  },
  WASP: {
    name: "Wasp",
    color: "bg-yellow-300",
    border: "border-yellow-500",
    hp: 64,
    speed: 1.7,
    reward: 3,
    radius: 14,
    damageReduction: 0
  },
  BEETLE: {
    name: "Stag Beetle",
    color: "bg-amber-800",
    border: "border-amber-950",
    hp: 340,
    speed: 0.6,
    reward: 5,
    radius: 20,
    damageReduction: 14
  },
  QUEEN: {
    name: "Queen Brood",
    color: "bg-purple-600",
    border: "border-purple-800",
    hp: 2100,
    speed: 0.45,
    reward: 10,
    radius: 28,
    damageReduction: 24
  },
  GIANT_ANT: {
    name: "Broodmother",
    color: "bg-red-900",
    border: "border-red-950",
    hp: 4200,
    speed: 0.75,
    reward: 15,
    radius: 34,
    damageReduction: 30
  }
};

// ---------- Enemy tribes (per map theme) ----------
// A skin overrides only the *appearance* of a role slot — its name, the artwork
// key InsectVisual draws, and its on-board radius (purely cosmetic; combat uses
// centre points, never the radius). Stats come from ENEMIES[slot], so a Frost
// Golem and a Stag Beetle are exactly as tough as each other. `visual` values
// map to cases in TowerVisual's InsectVisual.
export const ENEMY_SKINS = {
  INSECT: {
    ANT:       { name: 'Worker Ant',  visual: 'ANT',        radius: 12 },
    WASP:      { name: 'Wasp',        visual: 'WASP',       radius: 14 },
    BEETLE:    { name: 'Stag Beetle', visual: 'BEETLE',     radius: 20 },
    QUEEN:     { name: 'Queen Brood', visual: 'QUEEN',      radius: 28 },
    GIANT_ANT: { name: 'Broodmother', visual: 'GIANT_ANT',  radius: 34 },
  },
  // ICE arenas — the Frostkin. Brittle-looking but the same threat as insects.
  FROST: {
    ANT:       { name: 'Snowflea',    visual: 'ICE_FLEA',   radius: 12 },
    WASP:      { name: 'Frost Moth',  visual: 'ICE_MOTH',   radius: 15 },
    BEETLE:    { name: 'Ice Golem',   visual: 'ICE_GOLEM',  radius: 21 },
    QUEEN:     { name: 'Frost Matron',visual: 'ICE_MATRON', radius: 28 },
    GIANT_ANT: { name: 'Glacier Titan',visual: 'ICE_TITAN', radius: 34 },
  },
  // NIGHT arenas — the Nightfall, an undead host.
  NIGHT: {
    ANT:       { name: 'Shade',       visual: 'NIGHT_SHADE',  radius: 12 },
    WASP:      { name: 'Vampire Bat', visual: 'NIGHT_BAT',    radius: 15 },
    BEETLE:    { name: 'Bone Knight', visual: 'NIGHT_KNIGHT', radius: 21 },
    QUEEN:     { name: 'Necromancer', visual: 'NIGHT_NECRO',  radius: 28 },
    GIANT_ANT: { name: 'Bone Colossus',visual: 'NIGHT_COLOSSUS', radius: 34 },
  },
};

// Which tribe defends which map theme. Anything not listed falls back to insects.
export const THEME_TRIBE = {
  STANDARD: 'INSECT',
  DESERT:   'INSECT',
  ICE:      'FROST',
  NIGHT:    'NIGHT',
};

/** The name + artwork + radius for a role slot under a given tribe. */
export function enemySkin(typeKey, tribeId = 'INSECT') {
  const tribe = ENEMY_SKINS[tribeId] || ENEMY_SKINS.INSECT;
  return tribe[typeKey] || ENEMY_SKINS.INSECT[typeKey] || { name: typeKey, visual: typeKey, radius: 16 };
}

// Preview icons per tribe, in slot order — used by the HUD's incoming-wave strip.
export const TRIBE_PREVIEW_EMOJI = {
  INSECT: { ANT: '🐜', WASP: '🐝', BEETLE: '🪲', QUEEN: '👑', GIANT_ANT: '🕷️' },
  FROST:  { ANT: '❄️', WASP: '🦋', BEETLE: '🗿', QUEEN: '⛄', GIANT_ANT: '🏔️' },
  NIGHT:  { ANT: '👻', WASP: '🦇', BEETLE: '💀', QUEEN: '🧙', GIANT_ANT: '🧟' },
};

// ---------- Towers ----------
export const TOWERS = {
  DART: {
    id: 'DART',
    name: "Sentry",
    emoji: "🎯",
    cost: 20,
    type: 'SINGLE',
    desc: "Cheap, rapid-fire defender. Deals +2 damage for each adjacent tower.",
    gradient: "from-sky-400 to-sky-600",
    accent: "bg-sky-500",
    ring: "ring-sky-400",
    defaultTargeting: 'FIRST',
    base: { range: 3.2, damage: 10, cooldown: 800 },
    upgrades: {
      rate:    { cost: 30, label: "Rapid Fire", desc: "Fires twice as fast" },
      damage:  { cost: 45, label: "Sharp Tips", desc: "+200% damage" },
      range:   { cost: 25, label: "Eagle Eye",  desc: "+1 range" },
      passive: { cost: 75, label: "Pierce",     desc: "Each shot also hits a 2nd nearby enemy" }
    }
  },

  SNIPER: {
    id: 'SNIPER',
    name: "Marksman",
    emoji: "🔭",
    cost: 50,
    type: 'SINGLE',
    desc: "Long range, heavy damage, ignores armor, slow fire.",
    gradient: "from-emerald-400 to-emerald-600",
    accent: "bg-emerald-500",
    ring: "ring-emerald-400",
    defaultTargeting: 'STRONG',
    base: { range: 6, damage: 65, cooldown: 3400 },
    upgrades: {
      rate:      { cost: 120, label: "Quick Reload",   desc: "Fires 35% faster" },
      damage:    { cost: 110, label: "Heavy Caliber",  desc: "+100% damage" },
      range:     { cost: 60,  label: "Extended Scope", desc: "+2 range" },
      targeting: { cost: 70,  label: "Shatter",        desc: "Targets enemies with highest armor" },
      passive:   { cost: 180, label: "Piercing Lance", desc: "Adds enemy reduction to damage. Shots penetrate hitting all enemies in a short line." }
    }
  },

  SPLASH: {
    id: 'SPLASH',
    name: "Mortar",
    emoji: "💣",
    cost: 90,
    type: 'SPLASH',
    desc: "Lobs explosives for area damage",
    gradient: "from-rose-400 to-rose-600",
    accent: "bg-rose-500",
    ring: "ring-rose-400",
    defaultTargeting: 'FIRST',
    base: { range: 3.5, damage: 20, splashRadius: 1.5, cooldown: 1600 },
    upgrades: {
      rate:      { cost: 90,  label: "Auto Loader",  desc: "Fires 35% faster" },
      damage:    { cost: 120, label: "Heavy Shells", desc: "+90% damage" },
      range:     { cost: 60,  label: "Long Lob",     desc: "+1 range" },
      targeting: { cost: 80,  label: "Cluster Bomb", desc: "Targets densest enemy group" },
      passive:   { cost: 150, label: "Napalm",       desc: "Applies a stacking burn. Each stack reduces armor by 1." }
    }
  },

  FROST: {
    id: 'FROST',
    name: "Cryo",
    emoji: "❄️",
    cost: 60,
    type: 'FROST',
    desc: "Slows enemies with chilling shots",
    gradient: "from-cyan-300 to-cyan-500",
    accent: "bg-cyan-400",
    ring: "ring-cyan-400",
    defaultTargeting: 'FIRST',
    base: { range: 2.5, damage: 6, slowPercent: 0.5, slowDuration: 1500, cooldown: 1500 },
    upgrades: {
      rate:      { cost: 70,  label: "Frostpulse",    desc: "Fires 35% faster" },
      damage:    { cost: 60,  label: "Permafrost",    desc: "Slow lasts 60% longer" },
      range:     { cost: 50,  label: "Frigid Air",    desc: "+1 range" },
      targeting: { cost: 60,  label: "Fresh Targets", desc: "Prioritizes non-frozen enemies" },
      passive:   { cost: 150, label: "Frost Burst",   desc: "Splash-slows nearby enemies" }
    }
  },

  CHAIN: {
    id: 'CHAIN',
    name: "Tesla",
    emoji: "⚡",
    cost: 130,
    type: 'CHAIN',
    desc: "Lightning chains between enemies",
    gradient: "from-amber-300 to-amber-500",
    accent: "bg-amber-400",
    ring: "ring-amber-400",
    defaultTargeting: 'FIRST',
    base: { range: 3, damage: 20, bounces: 2, cooldown: 1200 }, 
    upgrades: {
      rate:      { cost: 150, label: "Static Build",   desc: "Fires 35% faster" },
      damage:    { cost: 140, label: "High Voltage",   desc: "+100% damage" },
      range:     { cost: 80,  label: "Conductor",      desc: "+1 range" },
      targeting: { cost: 100, label: "Cluster Strike", desc: "Targets densest cluster" },
      passive:   { cost: 180, label: "Overload",       desc: "+3 chain bounces" }
    }
  },

  NITRO: {
    id: 'NITRO',
    name: "Nitro",
    emoji: "⚙️",
    cost: 250,
    type: 'BUFF',
    desc: "Boosts speed. Buffs do not stack (strongest applies).",
    gradient: "from-yellow-300 to-yellow-500",
    accent: "bg-yellow-400",
    ring: "ring-yellow-400",
    base: { auraRange: 2.0, buff: 0.8 }, 
    upgrades: {
      rate:    { cost: 220, label: "Pure Octane", desc: "Aura makes towers 35% faster" },
      range:   { cost: 150, label: "Eagle Eye Aura",  desc: "Buffed towers gain +1.5 range" },
      passive: { cost: 350, label: "Overcharge",  desc: "Buffed towers also gain +30% damage" }
    }
  },

  // ---- The Unicorn: a singleton super-weapon you aim by hand. ----
  // It does not auto-fire. It charges while you play, and when the horn glows you
  // pick a point on the map and unleash a piercing rainbow lance from the horn
  // through that point, clean across the board — ignoring armour and hitting
  // every enemy on the line. One per board (see `singleton`); the engine tracks
  // its charge in g.unicornCharge and the firing lives in useGameEngine.
  UNICORN: {
    id: 'UNICORN',
    name: "Prisma",
    emoji: "🦄",
    cost: 200,
    type: 'UNICORN',
    singleton: true,
    desc: "Charges as you play. When the horn glows, aim a piercing rainbow lance across the whole board — pierces armor, hits every enemy on the line.",
    gradient: "from-fuchsia-400 to-violet-500",
    accent: "bg-fuchsia-500",
    ring: "ring-fuchsia-400",
    // range is nominal (the lance spans the whole map); the range ring is hidden
    // for the unicorn since "everywhere on a line" isn't a circle.
    base: { range: 99, chargeTime: 11000, damage: 220, beamWidth: 0.75 },
    upgrades: {
      rate:      { cost: 120, label: "Aurora Core",     desc: "Charges 35% faster" },
      damage:    { cost: 150, label: "Prismatic Blast", desc: "+150% beam damage" },
      range:     { cost: 110, label: "Wide Spectrum",   desc: "Beam is twice as wide" },
      targeting: { cost: 130, label: "Auto-Prism",      desc: "Fires itself at the biggest crowd the moment it charges" },
      passive:   { cost: 200, label: "Twin Rainbow",    desc: "Fires a second crossing lance and chills every enemy it touches" }
    }
  }
};

export const TOWER_ORDER = ['DART', 'SNIPER', 'FROST', 'SPLASH', 'CHAIN', 'NITRO', 'UNICORN'];

// ---------- Stat helpers ----------

/**
 * Squared distance between two grid points.
 *
 * The hot loops only ever COMPARE distances, and `Math.hypot` is markedly slower
 * than the arithmetic it wraps (it guards against intermediate overflow, which a
 * 15x10 grid cannot produce). Compare against a squared radius instead of taking
 * a root per candidate.
 */
export function distSq(ar, ac, br, bc) {
  const dr = ar - br;
  const dc = ac - bc;
  return dr * dr + dc * dc;
}

// Dynamic calculation now fully accepts allTowers to bake the Adjacency and Buff modifiers directly into the UI
export function getEffectiveStats(tower, allTowers = []) {
  const tConf = TOWERS[tower.typeId];
  if (!tConf) return null;
  const u = tower.upgrades || {};
  const stats = { ...tConf.base };

  switch (tower.typeId) {
    case 'DART':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.5;
      if (u.damage) stats.damage   = Math.round(stats.damage * 3);
      if (u.range)  stats.range    = stats.range + 1;
      stats.pierce = !!u.passive;
      break;

    case 'SNIPER':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.65;
      if (u.damage) stats.damage   = Math.round(stats.damage * 2);
      if (u.range)  stats.range    = stats.range + 2;
      stats.armorPiercing = !!u.passive;
      break;

    case 'SPLASH':
      if (u.rate)   stats.cooldown = stats.cooldown * 0.65;
      if (u.damage) stats.damage   = Math.round(stats.damage * 1.9);
      if (u.range)  stats.range    = stats.range + 1;
      stats.napalm = !!u.passive;
      break;

    case 'FROST':
      if (u.rate)   stats.cooldown     = stats.cooldown * 0.65;
      if (u.damage) stats.slowDuration = Math.round(stats.slowDuration * 1.6);
      if (u.range)  stats.range        = stats.range + 1;
      stats.frostBurst = !!u.passive;
      break;

    case 'CHAIN':
      if (u.rate)    stats.cooldown = stats.cooldown * 0.65;
      if (u.damage)  stats.damage   = Math.round(stats.damage * 2);
      if (u.range)   stats.range    = stats.range + 1;
      if (u.passive) stats.bounces  = stats.bounces + 3;
      break;

    case 'NITRO':
      if (u.rate)  stats.buff      = Math.max(0.4, stats.buff - 0.15);
      stats.overcharge = !!u.passive;
      stats.rangeBoost = !!u.range;
      break;

    case 'UNICORN':
      if (u.rate)   stats.chargeTime = Math.round(stats.chargeTime * 0.65);
      if (u.damage) stats.damage     = Math.round(stats.damage * 2.5);
      if (u.range)  stats.beamWidth  = stats.beamWidth * 2;
      stats.autoAim = !!u.targeting;
      stats.twin    = !!u.passive;
      break;

    default:
      break;
  }

  // Apply Adjacency & Nitro Buffs automatically if the board state is provided.
  // The unicorn is a manual super-weapon, deliberately untouched by auras so its
  // beam damage reads exactly as the panel shows it.
  if (allTowers.length > 0 && tower.typeId !== 'NITRO' && tower.typeId !== 'UNICORN') {
    
    // Adjacency for DART
    if (tower.typeId === 'DART') {
      let adj = 0;
      allTowers.forEach(t => {
        if (t.id !== tower.id && Math.hypot(t.row - tower.row, t.col - tower.col) <= 1.5) adj++;
      });
      stats.damage += adj * 2; // Increased to +2
    }

    // Nitro Buffs
    const { rateMul, damageMul, rangeAdd } = getNitroBuff(tower, allTowers);
    if (stats.cooldown) stats.cooldown = stats.cooldown * rateMul;
    if (stats.damage)   stats.damage   = Math.round(stats.damage * damageMul);
    if (stats.range)    stats.range   += rangeAdd;
  }

  return stats;
}

// Highest-value buff a non-Nitro tower receives from Nitro towers in range. Does NOT stack.
export function getNitroBuff(tower, allTowers) {
  if (tower.typeId === 'NITRO') return { rateMul: 1, damageMul: 1, rangeAdd: 0 };
  
  let bestRateMul = 1;
  let bestDamageMul = 1;
  let bestRangeAdd = 0;

  for (const other of allTowers) {
    if (other.typeId !== 'NITRO') continue;
    const tConf = TOWERS['NITRO'];
    const s = tConf.base; 
    const u = other.upgrades || {};
    
    const dist = Math.sqrt(
      Math.pow(other.row - tower.row, 2) + Math.pow(other.col - tower.col, 2)
    );
    
    // Check if within Nitro Aura Range
    if (dist <= s.auraRange) {
      let buff = s.buff;
      if (u.rate) buff = Math.max(0.4, buff - 0.15);
      
      if (buff < bestRateMul) bestRateMul = buff; 
      if (u.passive && bestDamageMul < 1.3) bestDamageMul = 1.3;
      if (u.range && bestRangeAdd < 1.5) bestRangeAdd = 1.5;
    }
  }
  
  return { rateMul: bestRateMul, damageMul: bestDamageMul, rangeAdd: bestRangeAdd };
}

/**
 * Effective stats for every tower on the board, computed in one pass.
 *
 * `getEffectiveStats` is O(towers) on its own because of the adjacency and Nitro
 * scans, so calling it per tower per frame made the firing loop O(towers²) every
 * frame. The result only changes when a tower is built, sold or upgraded, so the
 * caller stamps `g.towersVersion` on those events and this returns the cached map
 * until it changes.
 */
const statsCache = { version: -1, towers: null, map: null };

export function getStatsMap(towers, version) {
  if (statsCache.version === version && statsCache.towers === towers && statsCache.map) {
    return statsCache.map;
  }
  const map = new Map();
  for (const t of towers) map.set(t.id, getEffectiveStats(t, towers));
  statsCache.version = version;
  statsCache.towers = towers;
  statsCache.map = map;
  return map;
}

export function getTotalSpent(tower) {
  const tConf = TOWERS[tower.typeId];
  if (!tConf) return 0;
  let total = tConf.cost;
  for (const key of Object.keys(tower.upgrades || {})) {
    if (tower.upgrades[key] && tConf.upgrades[key]) {
      total += tConf.upgrades[key].cost;
    }
  }
  return total;
}

export function getSellValue(tower) {
  return Math.floor(getTotalSpent(tower) * 0.6);
}