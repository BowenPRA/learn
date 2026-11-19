// content/games/G06_guess-the-teacher/rules.js
// The game as the TV keeps it. Plain functions on one object, so a reload of
// the TV mid-game picks up where it was (the object is saved in this browser).
//
//   lobby  → intro → round → reveal → board → intro … → final
//
// The TV's own clock is the only clock that scores: a guess is worth what is
// left on the TV's timer when the guess arrives.
import { TEACHERS, PLAYABLE } from './teachers.js'
import { judge } from './match.js'
import { AVATARS, COLORS, LOCK_MS, ROUND_MS, cleanName, pointsFor } from './protocol.js'

const SAVE_KEY = 'learn:teacher-game:game'
// A guess that set off just before the buzzer still counts, for 100 points.
const GRACE_MS = 600

export const fresh = () => ({
  v: 1,
  phase: 'lobby',
  phaseAt: Date.now(),
  order: [], // indexes into TEACHERS, shuffled at the start of a game
  r: 0, // the round being played, an index into `order`
  players: [], // { pid, name, avatar, color, score, time, joinedAt }, in the order they joined
  removed: [], // pids the TV took out: they cannot come back under that pid
  seq: 0, // teams ever joined, for the next colour
  round: null,
  prev: {}, // pid → { score, rank } when the round started, for the leaderboard's slide
})

export function loadGame() {
  try {
    const g = JSON.parse(localStorage.getItem(SAVE_KEY))
    if (g && g.v === 1 && Array.isArray(g.players)) return g
  } catch { /* nothing saved, or storage blocked */ }
  return fresh()
}

export function saveGame(g) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(g)) } catch { /* storage blocked */ }
}

/** Every playable set, in a new random order. */
export function shuffled() {
  const a = [...PLAYABLE]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const elapsedOf = (round, now) => (round ? round.elapsed + (round.runFrom ? now - round.runFrom : 0) : 0)
export const leftOf = (round, now) => (round ? round.dur - elapsedOf(round, now) : 0)
/** The last round counts double, in a game of three rounds or more. */
export const isDouble = (g) => g.order.length >= 3 && g.r === g.order.length - 1
export const teacherOf = (g) => (g.round ? TEACHERS[g.round.t] : null)

/** The teams best first: points, then the less time taken over right answers, then who joined first. */
export function ranked(players) {
  return [...players]
    .sort((a, b) => b.score - a.score || a.time - b.time || a.joinedAt - b.joinedAt)
    .map((p, i) => ({ ...p, rank: i + 1 }))
}

const snapshot = (players) => Object.fromEntries(ranked(players).map((p) => [p.pid, { score: p.score, rank: p.rank }]))

const newRound = (t, now) => ({ t, dur: ROUND_MS, elapsed: 0, runFrom: now, results: {}, locks: {}, others: {} })

function startGame(g, order, now) {
  if (!order.length) return g
  const players = g.players.map((p) => ({ ...p, score: 0, time: 0 }))
  return { ...g, phase: 'intro', phaseAt: now, order, r: 0, round: null, players, prev: snapshot(players) }
}

/**
 * What a guess earns, before it is applied: { ok, pts, ms, other } or
 * { ignore: true } (wrong round, too late, already right, or the phone is
 * still frozen from a wrong guess).
 */
export function check(g, pid, no, text, now) {
  const round = g.round
  if (g.phase !== 'round' || !round || no !== g.r + 1) return { ignore: true }
  if (!g.players.some((p) => p.pid === pid) || round.results[pid]) return { ignore: true }
  if ((round.locks[pid] || 0) > now + 250) return { ignore: true }
  const left = leftOf(round, now)
  if (left < -GRACE_MS) return { ignore: true }
  const { ok, other } = judge(text, round.t, TEACHERS)
  const ms = Math.min(round.dur, Math.max(0, elapsedOf(round, now)))
  return { ok, other, ms, pts: ok ? pointsFor(Math.max(0, left), isDouble(g)) : 0 }
}

export function reduce(g, a) {
  const now = a.now ?? Date.now()
  const round = g.round
  switch (a.type) {
    case 'hello': {
      if (g.removed.includes(a.pid)) return g
      const name = cleanName(a.name)
      if (!a.pid || !name) return g
      const avatar = AVATARS.includes(a.avatar) ? a.avatar : AVATARS[0]
      const known = g.players.find((p) => p.pid === a.pid)
      if (known) {
        if (known.name === name && known.avatar === avatar) return g
        return { ...g, players: g.players.map((p) => (p.pid === a.pid ? { ...p, name, avatar } : p)) }
      }
      const player = { pid: String(a.pid).slice(0, 40), name, avatar, color: COLORS[g.seq % COLORS.length], score: 0, time: 0, joinedAt: now }
      return { ...g, seq: g.seq + 1, players: [...g.players, player] }
    }
    case 'remove':
      return { ...g, players: g.players.filter((p) => p.pid !== a.pid), removed: [...g.removed, a.pid].slice(-200) }
    case 'start':
      return startGame(g, a.order, now)
    case 'go':
      if (g.phase !== 'intro') return g
      return { ...g, phase: 'round', phaseAt: now, round: newRound(g.order[g.r], now), prev: snapshot(g.players) }
    case 'pause':
      if (g.phase !== 'round' || !round?.runFrom) return g
      return { ...g, round: { ...round, elapsed: elapsedOf(round, now), runFrom: null } }
    case 'resume':
      if (g.phase !== 'round' || !round || round.runFrom) return g
      return { ...g, round: { ...round, runFrom: now } }
    case 'more':
      if (g.phase !== 'round' || !round) return g
      return { ...g, round: { ...round, dur: round.dur + 10000 } }
    case 'guessed': {
      if (g.phase !== 'round' || !round || round.results[a.pid]) return g
      if (!a.ok) {
        const others = a.other == null ? round.others : { ...round.others, [a.pid]: a.other }
        return { ...g, round: { ...round, locks: { ...round.locks, [a.pid]: now + LOCK_MS }, others } }
      }
      const players = g.players.map((p) => (p.pid === a.pid ? { ...p, score: p.score + a.pts, time: p.time + a.ms } : p))
      return { ...g, players, round: { ...round, results: { ...round.results, [a.pid]: { pts: a.pts, ms: a.ms } } } }
    }
    case 'end':
      if (g.phase !== 'round' || !round) return g
      return { ...g, phase: 'reveal', phaseAt: now, round: { ...round, elapsed: Math.min(round.dur, elapsedOf(round, now)), runFrom: null } }
    case 'next':
      if (g.phase === 'reveal') return { ...g, phase: 'board', phaseAt: now }
      if (g.phase === 'board') {
        if (g.r + 1 < g.order.length) return { ...g, phase: 'intro', phaseAt: now, r: g.r + 1 }
        return { ...g, phase: 'final', phaseAt: now }
      }
      return g
    case 'lobby': // same teams, back to the start screen, points cleared
      return { ...g, phase: 'lobby', phaseAt: now, round: null, r: 0, order: [], players: g.players.map((p) => ({ ...p, score: 0, time: 0 })) }
    case 'newTeams':
      return { ...fresh(), removed: g.removed, phaseAt: now }
    default:
      return g
  }
}

/**
 * The game as every phone may see it. The teacher's name only once the round
 * is over. `g` is a team's points this round: a number when they got it, null
 * when they have not (yet).
 */
export function publicState(g, now) {
  const round = g.round
  const t = teacherOf(g)
  const inRound = g.phase === 'round' || g.phase === 'reveal' || g.phase === 'board'
  return {
    phase: g.phase,
    ago: Math.max(0, now - g.phaseAt),
    no: g.r + 1,
    count: g.order.length,
    double: isDouble(g),
    emojis: inRound && t ? t.emojis : [],
    dur: round?.dur || 0,
    elapsed: inRound ? elapsedOf(round, now) : 0,
    paused: g.phase === 'round' && !round?.runFrom,
    answer: (g.phase === 'reveal' || g.phase === 'board') && t ? t.name : '',
    got: round && inRound ? Object.keys(round.results).length : 0,
    players: ranked(g.players).map((p) => ({
      p: p.pid, n: p.name, a: p.avatar, c: p.color, s: p.score, k: p.rank,
      g: inRound && round?.results[p.pid] ? round.results[p.pid].pts : null,
    })),
  }
}
