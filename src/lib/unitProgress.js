// A student's progress in PRA Learn's units (src/data/units.js), part by part.
//
//   record = { best, last, runs, bonus, saved, updatedAt }
//     best   the best score so far, 0..1 (a part's XP is best x its XP)
//     last   the latest score, 0..1
//     runs   finished runs (0 while the first is still going)
//     bonus  true once the part's bonus is earned (it is never taken back)
//     saved  the task's own resume blob (where it stopped, answers so far)
//
// Demo mode keeps it in this browser. The live site keeps it in learn_unit_progress
// through learn_unit_save (supabase/learn-units.sql, which must be run before units
// go live; until then the live calls fail with a clear message).
import { DEMO } from './api.js'
import { supabase } from './supabase.js'
import { UNITS, unitKey } from '../data/units.js'

const DEMO_KEY = 'learn-demo-units'
const readDemo = () => { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || '{}') } catch { return {} } }
const writeDemo = (all) => { try { localStorage.setItem(DEMO_KEY, JSON.stringify(all)) } catch { /* private window: memory only */ } }

const clamp01 = (n) => Math.max(0, Math.min(1, Number(n) || 0))

/** The next record after a save, given the last one. */
export function nextRecord(prev = {}, { score, finished = false, bonus = false, saved } = {}) {
  const s = score == null ? null : clamp01(score)
  return {
    best: s == null ? prev.best || 0 : Math.max(prev.best || 0, s),
    last: s == null ? prev.last ?? null : s,
    runs: (prev.runs || 0) + (finished ? 1 : 0),
    bonus: !!(prev.bonus || bonus),
    saved: saved === undefined ? prev.saved ?? null : saved,
    updatedAt: new Date().toISOString(),
  }
}

const notReady = (e) => Object.assign(new Error('Units are not set up on the live site yet (supabase/learn-units.sql).'), { cause: e, code: 'units' })

/** Every unit's records for the signed-in student: { 'Y7_SCI/U03_4': { lesson: record, … } }. */
export async function loadAllUnits() {
  if (DEMO) return readDemo()
  const { data, error } = await supabase.from('learn_unit_progress').select('unit_key, part, best, last, runs, bonus, saved, updated_at')
  if (error) throw notReady(error)
  const all = {}
  for (const r of data || []) {
    ;(all[r.unit_key] ||= {})[r.part] = { best: Number(r.best) || 0, last: r.last == null ? null : Number(r.last), runs: r.runs, bonus: r.bonus, saved: r.saved, updatedAt: r.updated_at }
  }
  return all
}

/** One unit's records. */
export async function loadUnit(key) {
  return (await loadAllUnits())[key] || {}
}

/** Save one part: `{ score (0..1), finished, bonus, saved }`. Returns the new record. */
export async function saveUnitPart(key, part, patch) {
  if (DEMO) {
    const all = readDemo()
    const unit = (all[key] ||= {})
    unit[part] = nextRecord(unit[part], patch)
    writeDemo(all)
    return unit[part]
  }
  const { data, error } = await supabase.rpc('learn_unit_save', {
    p_unit: key, p_part: part, p_class: UNITS.find((u) => unitKey(u) === key)?.classKey || null,
    p_score: patch.score == null ? null : clamp01(patch.score),
    p_finished: !!patch.finished, p_bonus: !!patch.bonus,
    p_saved: patch.saved === undefined ? null : patch.saved,
  })
  if (error) throw notReady(error)
  return data
}
