// content/games/G06_guess-the-teacher/rules.js
// The game as the TV keeps it. Plain functions on one object, so a reload of
// the TV mid-game picks up where it was (the object is saved in this browser).
//
//   lobby → intro → round → reveal → intro … → reveal → board → final
//
// The teachers are copied into the game when it starts (`sets`, from the list
// the host edits, list.js), so editing the list never changes a game already
// running.
//
// Each team locks in one guess a round. The TV judges it at once and keeps
// the verdict to itself: nobody, the team included, learns right or wrong
// until the reveal, when the points land on the leaderboard. A right guess is
// worth what was left on the TV's clock when it was locked in.
import { judge } from './match.js'
import { AVATARS, COLORS, ROUND_MS, cleanName, pointsFor } from './protocol.js'
import { isRude } from './words.js'

const SAVE_KEY = 'learn:teacher-game:game'
// A guess that set off just before the buzzer still counts, for 300 points.
const GRACE_MS = 600

export const fresh = () => ({
  v: 2,
  phase: 'lobby',
  phaseAt: Date.now(),
  sets: [], // { emojis, name, also, photo, pic }: this game's teachers, in the order they are played (pic: staff.js)
  r: 0, // the round being played, an index into `sets`
  players: [], // { pid, name, avatar, color, score, time, joinedAt }, in the order they joined
  removed: [], // pids the TV took out: they cannot come back under that pid
  seq: 0, // teams ever joined, for the next colour
  round: null,
  prev: {}, // pid → { score, rank } when the round started, for the leaderboard's slide
})

export function loadGame() {
  try {
    const g = JSON.parse(localStorage.getItem(SAVE_KEY))
    if (g && g.v === 2 && Array.isArray(g.players) && Array.isArray(g.sets)) return g
  } catch { /* nothing saved, or storage blocked */ }
  return fresh()
}

export function saveGame(g) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(g)) } catch { /* storage blocked */ }
}

export const elapsedOf = (round, now) => (round ? round.elapsed + (round.runFrom ? now - round.runFrom : 0) : 0)
export const leftOf = (round, now) => (round ? round.dur - elapsedOf(round, now) : 0)
/** The last round counts double, in a game of three rounds or more. */
export const isDouble = (g) => g.sets.length >= 3 && g.r === g.sets.length - 1
export const teacherOf = (g) => (g.round ? g.sets[g.round.t] || null : null)
export const isLast = (g) => g.r + 1 >= g.sets.length

/** The teams best first: points, then the less time taken over right answers, then who joined first. */
export function ranked(players) {
  return [...players]
    .sort((a, b) => b.score - a.score || a.time - b.time || a.joinedAt - b.joinedAt)
    .map((p, i) => ({ ...p, rank: i + 1 }))
}

const snapshot = (players) => Object.fromEntries(ranked(players).map((p) => [p.pid, { score: p.score, rank: p.rank }]))

// `guesses`: pid → { ok, pts, ms, other }, one a team, locked in.
// `allInAt`: when every team had locked in (the clock stops, the hidden cards flip, then the answer).
const newRound = (t, now, ms) => ({ t, dur: ms, elapsed: 0, runFrom: now, guesses: {}, allInAt: null })

/** This game's round length (set in Edit teachers, copied in at Start). */
export const roundMsOf = (g) => g.roundMs || ROUND_MS

/** The right guesses of a round, as [pid, guess] pairs, fastest first. */
export const rightOf = (round) => Object.entries(round?.guesses || {}).filter(([, x]) => x.ok).sort((a, b) => a[1].ms - b[1].ms)
/** How many teams have locked in a guess. */
export const lockedOf = (round) => Object.keys(round?.guesses || {}).length

function startGame(g, sets, now, roundMs) {
  if (!sets?.length) return g
  const players = g.players.map((p) => ({ ...p, score: 0, time: 0 }))
  return { ...g, phase: 'intro', phaseAt: now, gid: now, sets, roundMs: roundMs || ROUND_MS, r: 0, round: null, players, prev: snapshot(players) }
}

// After a teacher: the next one, or, after the last, the leaderboard.
const afterRound = (g, now) => (isLast(g)
  ? { ...g, phase: 'board', phaseAt: now }
  : { ...g, phase: 'intro', phaseAt: now, r: g.r + 1, round: null })

/**
 * What a locked-in guess will earn: { ok, pts, ms, other }, or { ignore: true }
 * (wrong round, too late, or this team has locked in already).
 */
export function check(g, pid, no, text, now) {
  const round = g.round
  if (g.phase !== 'round' || !round || no !== g.r + 1) return { ignore: true }
  if (!g.players.some((p) => p.pid === pid) || round.guesses[pid]) return { ignore: true }
  const left = leftOf(round, now)
  if (left < -GRACE_MS) return { ignore: true }
  const { ok, other } = judge(text, round.t, g.sets)
  const ms = Math.min(round.dur, Math.max(0, elapsedOf(round, now)))
  return { ok, other, ms, pts: ok ? pointsFor(Math.max(0, left), isDouble(g), roundMsOf(g)) : 0 }
}

export function reduce(g, a) {
  const now = a.now ?? Date.now()
  const round = g.round
  switch (a.type) {
    case 'hello': {
      if (g.removed.includes(a.pid)) return g
      const name = cleanName(a.name)
      // A rude name never reaches the TV (words.js); widgets.jsx tells the phone.
      if (!a.pid || !name || isRude(name)) return g
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
      return startGame(g, a.sets, now, a.roundMs)
    case 'go':
      if (g.phase !== 'intro') return g
      return { ...g, phase: 'round', phaseAt: now, round: newRound(g.r, now, roundMsOf(g)), prev: snapshot(g.players) }
    case 'pause':
      if (g.phase !== 'round' || !round?.runFrom) return g
      return { ...g, round: { ...round, elapsed: elapsedOf(round, now), runFrom: null } }
    case 'resume':
      if (g.phase !== 'round' || !round || round.runFrom || round.allInAt) return g
      return { ...g, round: { ...round, runFrom: now } }
    case 'more':
      if (g.phase !== 'round' || !round || round.allInAt) return g
      return { ...g, round: { ...round, dur: round.dur + 10000 } }
    case 'locked': {
      if (g.phase !== 'round' || !round || round.guesses[a.pid]) return g
      const guess = { ok: Boolean(a.ok), pts: a.ok ? a.pts : 0, ms: a.ms, other: a.other ?? null }
      return { ...g, round: { ...round, guesses: { ...round.guesses, [a.pid]: guess } } }
    }
    case 'allIn': // every team has locked in: stop the clock; the TV flips the rest, then ends the round
      if (g.phase !== 'round' || !round || round.allInAt) return g
      return { ...g, round: { ...round, elapsed: Math.min(round.dur, elapsedOf(round, now)), runFrom: null, allInAt: now } }
    case 'end': { // the reveal: the right guesses' points land now
      if (g.phase !== 'round' || !round) return g
      const players = g.players.map((p) => {
        const x = round.guesses[p.pid]
        return x?.ok ? { ...p, score: p.score + x.pts, time: p.time + x.ms } : p
      })
      return { ...g, players, phase: 'reveal', phaseAt: now, round: { ...round, elapsed: Math.min(round.dur, elapsedOf(round, now)), runFrom: null } }
    }
    case 'next':
      if (g.phase === 'reveal') return afterRound(g, now)
      if (g.phase === 'board') return { ...g, phase: 'final', phaseAt: now }
      return g
    case 'skip': // this teacher does not count (no points have landed yet)
      if (g.phase !== 'intro' && g.phase !== 'round') return g
      return afterRound({ ...g, round: null }, now)
    case 'lobby': // same teams, back to the start screen, points cleared
      return { ...g, phase: 'lobby', phaseAt: now, round: null, r: 0, sets: [], players: g.players.map((p) => ({ ...p, score: 0, time: 0 })) }
    case 'newTeams':
      return { ...fresh(), removed: g.removed, phaseAt: now }
    default:
      return g
  }
}

/**
 * The game as every phone may see it. The teacher's name, and who was right,
 * only once the round is over. Per team: `l` whether they have locked in a
 * guess this round; `g` their points this round, at the reveal: a number when
 * they were right, null when not.
 */
export function publicState(g, now) {
  const round = g.round
  const t = teacherOf(g)
  const inRound = g.phase === 'round' || g.phase === 'reveal' || g.phase === 'board'
  return {
    phase: g.phase,
    gid: g.gid || 0, // which game: a phone's locked-in guess belongs to one
    ago: Math.max(0, now - g.phaseAt),
    no: g.r + 1,
    count: g.sets.length,
    double: isDouble(g),
    emojis: inRound && t ? t.emojis : [],
    dur: round?.dur || 0,
    elapsed: inRound ? elapsedOf(round, now) : 0,
    paused: g.phase === 'round' && !round?.runFrom && !round?.allInAt,
    base: roundMsOf(g), // the round length the points and the emoji times are set by
    allInAgo: g.phase === 'round' && round?.allInAt ? Math.max(0, now - round.allInAt) : null,
    answer: (g.phase === 'reveal' || g.phase === 'board') && t ? t.name : '',
    // The teacher's portrait from pra.edu.vn (staff.js), with the name and no sooner.
    pic: (g.phase === 'reveal' || g.phase === 'board') && t?.pic ? { src: t.pic.portrait, tone: t.pic.tone } : null,
    locked: inRound ? lockedOf(round) : 0,
    players: ranked(g.players).map((p) => ({
      p: p.pid, n: p.name, a: p.avatar, c: p.color, s: p.score, k: p.rank,
      l: Boolean(inRound && round?.guesses[p.pid]),
      g: (g.phase === 'reveal' || g.phase === 'board') && round?.guesses[p.pid]?.ok ? round.guesses[p.pid].pts : null,
    })),
  }
}
