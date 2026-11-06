// PRA Learn units: Mr. Bowen's Dashboard idea, streamlined (Bowen, 6 November 2026).
//
// Every unit has the same five parts and is worth 100 XP, with up to 20 bonus XP on
// top for doing parts very well. A unit counts as finished at 80 XP with the quiz done.
//
//   lesson    the interactive lesson with its check questions (the Dashboard's Notes deck)
//   words     review cards, then a vocab quiz, untimed or timed
//   practice  the unit's main interactive task (Tide Lab, Bus Stop…)
//   workbook  step-by-step problems in the style of the Workbook (fresh problems)
//   quiz      the end-of-unit quiz
//
// The lesson, the main task and the quiz are copied unchanged from BowenPRA/Dashboard
// by `npm run sync:dashboard` (scripts/sync-dashboard.mjs) into unit/src and
// unit/content; the words and workbook parts are PRA Learn's own (unit/app,
// unit/content/<TRACK>/<UNIT>/workbook.js). A unit opens at /unit/#/<TRACK>/<UNIT>.

/** The five parts, in order: the XP each is worth and the bonus it can add. */
export const UNIT_PARTS = [
  { id: 'lesson', xp: 20, bonus: 0, title: 'Lesson', titleVn: 'Bài học', titleFr: 'Leçon' },
  { id: 'words', xp: 10, bonus: 5, title: 'Words', titleVn: 'Từ vựng', titleFr: 'Mots' },
  { id: 'practice', xp: 30, bonus: 5, title: 'Practice', titleVn: 'Luyện tập', titleFr: 'Entraînement' },
  { id: 'workbook', xp: 20, bonus: 5, title: 'Workbook', titleVn: 'Bài tập', titleFr: 'Cahier' },
  { id: 'quiz', xp: 20, bonus: 5, title: 'Quiz', titleVn: 'Kiểm tra', titleFr: 'Quiz' },
]
export const UNIT_XP = 100
export const UNIT_BONUS = UNIT_PARTS.reduce((s, p) => s + p.bonus, 0)
/** A unit is finished at this much XP with the quiz done (the Dashboard's rule). */
export const UNIT_DONE_XP = 80

// The units, in teaching order (oldest first).
//   track, unit  the Dashboard's track and unit folder (src/data/<track>/<unit>/data.js)
//   engine       the main interactive task's component in the Dashboard (src/tasks/<engine>.jsx)
//   classKey     the PRA Learn class it belongs to; a student sees their year group's units
//   classroom    the classroom deck it was taught from (src/data/classroomLessons.js), if any
export const UNITS = [
  {
    track: 'Y7_SCI', unit: 'U03_4', classKey: 'science:Year 7', label: '3.4', teacher: 'Mr. Bowen',
    title: 'Tides', titleFr: 'Les marées',
    subtitle: 'Why the sea goes up and down twice a day, then our river: read the pole, graph a day, test two predictions.',
    engine: 'TideLab',
    classroom: { course: 'y7-science', slug: 'U03_4' },
  },
]

export const unitKey = (u) => `${u.track}/${u.unit}`
export const findUnit = (track, unit) => UNITS.find((u) => u.track === track && u.unit === unit) || null

/**
 * A part's XP from its record: the best score (0..1) times the part's XP, plus the
 * bonus once earned. `record` = { best, bonus } as unitProgress saves it.
 */
export function partXP(part, record) {
  const best = Math.max(0, Math.min(1, Number(record?.best) || 0))
  return { xp: Math.round(best * part.xp), bonus: record?.bonus ? part.bonus : 0 }
}

/** A unit's XP from its records ({ [partId]: record }): core (max 100), bonus, done. */
export function unitXP(records = {}) {
  let xp = 0
  let bonus = 0
  for (const p of UNIT_PARTS) {
    const r = partXP(p, records[p.id])
    xp += r.xp
    bonus += r.bonus
  }
  const done = xp >= UNIT_DONE_XP && !!records.quiz?.runs
  return { xp: Math.min(xp, UNIT_XP), bonus, total: Math.min(xp, UNIT_XP) + bonus, done }
}

/** The first part not yet finished (no run), in order, or null when every part has one. */
export const nextPartOf = (records = {}) => UNIT_PARTS.find((p) => !records[p.id]?.runs) || null

/** Where a unit opens: its own page. The address's ?demo travels with it. */
export const unitHref = (u, search = '', part = '') =>
  `${import.meta.env?.BASE_URL || '/'}unit/${search}#/${u.track}/${u.unit}${part ? `/${part}` : ''}`
