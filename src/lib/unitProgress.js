// A student's progress in PRA Learn's units (src/data/units.js), task by task.
//
//   record = { best, last, runs, saved, updatedAt }
//     best   the best score so far, 0..1 (a task's XP is best x its XP)
//     last   the latest score, 0..1
//     runs   finished runs (0 while the first is still going)
//     saved  the task's own resume blob (where it stopped, answers so far)
//
// A record is kept under the task's id (the table's `part` column). The table also has
// a `bonus` column from the first version of units; nothing reads it now.
//
// Demo mode keeps it in this browser. The live site keeps it in learn_unit_progress
// through learn_unit_save (supabase/learn-units.sql; until its 10 November 2026 version is
// run, a task id that is not one of the first five names fails to save, with a clear message).
import { DEMO } from './api.js'
import { supabase } from './supabase.js'
import { UNITS, unitKey } from '../data/units.js'

const DEMO_KEY = 'learn-demo-units'
const readDemo = () => { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || '{}') } catch { return {} } }
const writeDemo = (all) => { try { localStorage.setItem(DEMO_KEY, JSON.stringify(all)) } catch { /* private window: memory only */ } }

const clamp01 = (n) => Math.max(0, Math.min(1, Number(n) || 0))

/** The next record after a save, given the last one. */
export function nextRecord(prev = {}, { score, finished = false, saved } = {}) {
  const s = score == null ? null : clamp01(score)
  return {
    best: s == null ? prev.best || 0 : Math.max(prev.best || 0, s),
    last: s == null ? prev.last ?? null : s,
    runs: (prev.runs || 0) + (finished ? 1 : 0),
    saved: saved === undefined ? prev.saved ?? null : saved,
    updatedAt: new Date().toISOString(),
  }
}

const notReady = (e) => Object.assign(new Error('Your XP could not be saved: units are not fully set up on the live site yet.'), { cause: e, code: 'units' })

/** Every unit's records for the signed-in student: { 'Y7_SCI/U03_4': { lesson: record, … } }, by task id. */
export async function loadAllUnits() {
  if (DEMO) return readDemo()
  const { data, error } = await supabase.from('learn_unit_progress').select('unit_key, part, best, last, runs, saved, updated_at')
  if (error) throw notReady(error)
  const all = {}
  for (const r of data || []) {
    ;(all[r.unit_key] ||= {})[r.part] = { best: Number(r.best) || 0, last: r.last == null ? null : Number(r.last), runs: r.runs, saved: r.saved, updatedAt: r.updated_at }
  }
  return all
}

/** One unit's records. */
export async function loadUnit(key) {
  return (await loadAllUnits())[key] || {}
}

/** Save one task: `{ score (0..1), finished, saved }`. Returns the new record. */
export async function saveUnitTask(key, part, patch) {
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
    p_finished: !!patch.finished, p_bonus: false,
    p_saved: patch.saved === undefined ? null : patch.saved,
  })
  if (error) throw notReady(error)
  return data
}

/**
 * A class's unit progress, for staff: { [studentId]: { [unitKey]: { [taskId]: record } } }.
 * The live rows are the ones the staff_read rule lets this login see. In demo mode it is
 * made up from the students handed in, the same every time.
 */
export async function loadClassUnits(classKey, students = []) {
  const out = {}
  if (DEMO) {
    const units = UNITS.filter((u) => u.classKey === classKey)
    students.forEach((s, i) => {
      for (const u of units) {
        u.tasks.forEach((t, k) => {
          if ((i + k) % 4 === 3 || k > (i % (u.tasks.length + 1))) return
          const best = [1, 0.8, 0.6, 1][(i + k) % 4]
          ;((out[s.id] ||= {})[unitKey(u)] ||= {})[t.id] = { best, last: best, runs: (i + k) % 3 ? 1 : 0, saved: null }
        })
      }
    })
    return out
  }
  const { data, error } = await supabase.from('learn_unit_progress').select('student_id, unit_key, part, best, last, runs').eq('class_key', classKey)
  if (error) throw notReady(error)
  for (const r of data || []) ((out[r.student_id] ||= {})[r.unit_key] ||= {})[r.part] = { best: Number(r.best) || 0, last: r.last == null ? null : Number(r.last), runs: r.runs }
  return out
}
