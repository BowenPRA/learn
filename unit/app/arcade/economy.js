// The arcade's gold, by the Dashboard's rules:
//   - a student EARNS gold by studying: every XP held in a unit is one gold coin, so
//     gold earned is a pure read of unit progress and is never stored;
//   - a student SPENDS gold by playing: each game costs PLAY_COST (src/lib/arcade.js
//     keeps the running total spent);
//   - gold to spend = earned − spent, never below zero;
//   - FREE PLAY is the reward for mastery: the arcade stops charging while the student
//     has finished every unit, or holds FREE_PLAY_RATIO of all the XP on offer.
import { DEMO } from '../../../src/lib/api.js'
import { UNITS, UNIT_XP, unitKey, unitXP } from '../../../src/data/units.js'
import { splitClass } from '../../../src/data/subjects.js'

/** One XP earns one gold. A finished unit (100 XP) buys four plays. */
export const GOLD_PER_XP = 1
/** What one game costs. */
export const PLAY_COST = 25
/** The share of all XP on offer that opens free play. */
export const FREE_PLAY_RATIO = 0.8

const norm = (s) => String(s || '').trim().replace(/\s+/g, ' ').toLowerCase()

/** The units that count for someone: a student's year group's; staff and the demo, all. Never a hidden one. */
export function unitsFor(me) {
  const shown = UNITS.filter((u) => !u.hidden)
  return !DEMO && me?.kind === 'student' ? shown.filter((u) => norm(splitClass(u.classKey)[1]) === norm(me.year_group)) : shown
}

/** Gold earned: the XP held across the units. `progress` = loadAllUnits()'s result. */
export const goldEarned = (units, progress = {}) =>
  units.reduce((sum, u) => sum + unitXP(u, progress[unitKey(u)] || {}).xp, 0) * GOLD_PER_XP

/** Gold to spend right now. */
export const goldBalance = (units, progress, spent = 0) => Math.max(0, goldEarned(units, progress) - spent)

/** Free play: every unit finished, or FREE_PLAY_RATIO of all the XP. Never with no units. */
export function freePlayState(units, progress = {}) {
  const total = units.length
  let done = 0
  let xp = 0
  for (const u of units) {
    const sum = unitXP(u, progress[unitKey(u)] || {})
    xp += sum.xp
    if (sum.done) done += 1
  }
  const maxXp = total * UNIT_XP
  const needXp = Math.ceil(maxXp * FREE_PLAY_RATIO)
  const allDone = total > 0 && done === total
  const ratioMet = total > 0 && xp >= needXp
  return { unlocked: allDone || ratioMet, via: allDone ? 'units' : ratioMet ? 'xp' : null, done, total, xp, maxXp, needXp }
}
