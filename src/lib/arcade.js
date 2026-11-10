// The arcade's saved state: the gold a student has spent, their best score on each
// level and game, and the leaderboard. Gold earned is never stored: it is the XP held
// in the units (unit/app/arcade/economy.js).
//
// Demo mode keeps it in this browser, with a made-up board. The live site keeps it in
// learn_arcade_wallet and learn_arcade_scores through the functions in
// supabase/learn-arcade.sql; until that file is run, the calls fail with a clear message.
import { DEMO } from './api.js'
import { supabase } from './supabase.js'

export const GAMES = ['td', 'survivor']

const DEMO_KEY = 'learn-demo-arcade'
const readDemo = () => { try { return { spent: 0, scores: {}, ...JSON.parse(localStorage.getItem(DEMO_KEY) || '{}') } } catch { return { spent: 0, scores: {} } } }
const writeDemo = (state) => { try { localStorage.setItem(DEMO_KEY, JSON.stringify(state)) } catch { /* private window: memory only */ } }
const notReady = (e) => Object.assign(new Error('The arcade is not set up on the live site yet.'), { cause: e, code: 'arcade' })

/** `{ spent, scores: { [level]: { td, survivor } } }` for the signed-in student. */
export async function loadArcade() {
  if (DEMO) return readDemo()
  const [wallet, scores] = await Promise.all([
    supabase.from('learn_arcade_wallet').select('spent'),
    supabase.from('learn_arcade_scores').select('level, game, best'),
  ])
  if (wallet.error || scores.error) throw notReady(wallet.error || scores.error)
  const out = { spent: Number(wallet.data?.[0]?.spent) || 0, scores: {} }
  for (const r of scores.data || []) (out.scores[r.level] ||= {})[r.game] = r.best
  return out
}

/** Pay for one play. Returns the gold spent so far. */
export async function spendGold(cost) {
  if (DEMO) {
    const state = readDemo()
    state.spent += cost
    writeDemo(state)
    return state.spent
  }
  const { data, error } = await supabase.rpc('learn_arcade_spend', { p_cost: cost })
  if (error) throw notReady(error)
  return data
}

/** Bank a finished run's score. Returns the best so far on that level and game. */
export async function saveArcadeScore(level, game, score) {
  const value = Math.max(0, Math.floor(Number(score) || 0))
  if (DEMO) {
    const state = readDemo()
    const row = (state.scores[level] ||= {})
    row[game] = Math.max(row[game] || 0, value)
    writeDemo(state)
    return row[game]
  }
  const { data, error } = await supabase.rpc('learn_arcade_score', { p_level: level, p_game: game, p_score: value })
  if (error) throw notReady(error)
  return data
}

// The demo's board: made-up learners, never real names.
const DEMO_BOARD = { td: [['Learner C', 5200], ['Learner F', 3900], ['Learner B', 2600]], survivor: [['Learner H', 41000], ['Learner C', 28500], ['Learner K', 12000]] }

/** The top scores of a level and game: `[{ id, name, score }]`, best first. */
export async function arcadeBoard(level, game) {
  if (DEMO) {
    const mine = readDemo().scores[level]?.[game] || 0
    const rows = DEMO_BOARD[game].map(([name, score], i) => ({ id: `demo-${i}`, name, score }))
    if (mine > 0) rows.push({ id: 'me', name: 'Learner A', score: mine })
    return rows.sort((a, b) => b.score - a.score).slice(0, 10)
  }
  const { data, error } = await supabase.rpc('learn_arcade_board', { p_level: level, p_game: game })
  if (error) throw notReady(error)
  return data || []
}
