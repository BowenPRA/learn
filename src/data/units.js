// PRA Learn units, the way Mr. Bowen's Dashboard does them (Bowen, 10 November 2026):
// a unit is a list of tasks chosen for that unit, each worth its own XP. The XP on
// offer may add up to more than 100; a unit's XP stops at 100. Nothing is locked.
// A unit is finished at 100 XP, or at 80 XP with its quiz done (when it has one).
//
// A task comes from one of these places (`kind`):
//   notes   the self-study lesson deck with check questions (the unit's notes.js)
//   words   the unit's key words: review cards, then a vocab quiz
//   engine  an interactive task (`engine` = its name in unit/app/engines.js)
//   steps   step-by-step problems in the style of the Workbook, all new
//           (unit/content/<TRACK>/<UNIT>/<set>.js)
//   quiz    the end-of-unit quiz
//
// A task's `id` is what its progress is saved under (learn_unit_progress.part): lower-case
// letters, digits and underscores. Never change one once students have used it.
// Its name, picture and colour come from its kind unless it gives its own (`title`,
// `icon`, `tone`): see unit/app/taskLook.js. `note` is the few words under its name on
// its tile ("8 angles"); most kinds count their own. The page groups tasks under the
// steps Learn, Practice and Quiz by kind; `step` puts a task under another one. A unit opens at /unit/#/<TRACK>/<UNIT>.

export const UNIT_XP = 100
/** A unit is finished at this much XP with the quiz done (the Dashboard's rule). */
export const UNIT_DONE_XP = 80

// What a kind is called when the task has no title of its own.
const KIND_TITLES = {
  notes: ['Lesson', 'Bài học', 'Leçon'],
  words: ['Key words', 'Từ vựng', 'Mots clés'],
  engine: ['Practice', 'Luyện tập', 'Entraînement'],
  steps: ['Workbook', 'Bài tập', 'Cahier'],
  quiz: ['Quiz', 'Kiểm tra', 'Quiz'],
}

/** A task's name in a language (`en`, `vn`, `fr`); its own title first, then its kind's. */
export function taskTitle(task, lang = 'en') {
  const [en, vn, fr] = KIND_TITLES[task.kind] || [task.id, task.id, task.id]
  if (lang === 'fr') return task.titleFr || task.title || fr
  if (lang === 'vn') return task.titleVn || task.title || vn
  return task.title || en
}

// The units, in teaching order (oldest first).
//   track, unit  the unit's folder (unit/src/data/<track>/<unit>/data.js)
//   classKey     the PRA Learn class it belongs to; a student sees their year group's units
//   classroom    the classroom deck it was taught from (src/data/classroomLessons.js), if any
//   hidden       true while a unit is being built: not listed on any page, opens by its address
//   tasks        the unit's tasks, in the order to do them
export const UNITS = [
  {
    track: 'Y7_SCI', unit: 'U03_4', classKey: 'science:Year 7', label: '3.4', teacher: 'Mr. Bowen',
    title: 'Tides', titleFr: 'Les marées',
    subtitle: 'Why the sea goes up and down twice a day, then our river: read the pole, graph a day, test two predictions.',
    classroom: { course: 'y7-science', slug: 'U03_4' },
    tasks: [
      { id: 'lesson', kind: 'notes', xp: 20 },
      { id: 'words', kind: 'words', xp: 10 },
      { id: 'practice', kind: 'engine', engine: 'TideLab', xp: 30, title: 'Tide Lab', titleFr: 'Labo des marées', icon: 'Waves', tone: 'navy', note: 'Our river', noteFr: 'Notre rivière' },
      { id: 'workbook', kind: 'steps', set: 'workbook', xp: 20 },
      { id: 'quiz', kind: 'quiz', xp: 20 },
    ],
  },
  {
    track: 'Y7_MATH', unit: 'U05_3', classKey: 'math:Year 7', label: '5.3', teacher: 'Mr. Bowen',
    title: 'Drawing Lines and Quadrilaterals', titleFr: 'Tracer des droites et des quadrilatères',
    subtitle: 'Measure and draw angles with a protractor, then draw a quadrilateral from a sketch and check it.',
    subtitleFr: 'Mesure et trace des angles au rapporteur, puis trace un quadrilatère d’après un croquis et vérifie-le.',
    classroom: { course: 'y7-math', slug: 'U05_3' },
    tasks: [
      { id: 'lesson', kind: 'notes', xp: 25 },
      { id: 'protractor', kind: 'engine', engine: 'Protractor', xp: 30, title: 'Protractor', titleFr: 'Rapporteur', icon: 'DraftingCompass', tone: 'sky', note: '8 angles', noteFr: '8 angles' },
      { id: 'workbook', kind: 'steps', set: 'workbook', xp: 25, note: '7 problems', noteFr: '7 problèmes' },
      { id: 'quads', kind: 'engine', engine: 'QuadCheck', xp: 20, title: 'Quadrilaterals', titleFr: 'Quadrilatères', icon: 'Diamond', tone: 'violet', note: '6 questions', noteFr: '6 questions' },
    ],
  },
  {
    // No lesson yet (the 5.2 classroom deck is not built), so it is not listed anywhere
    // (`hidden`). It opens by its address, /unit/#/Y7_SCI/U05_2.
    track: 'Y7_SCI', unit: 'U05_2', classKey: 'science:Year 7', label: '5.2', teacher: 'Mr. Bowen', hidden: true,
    title: 'Comparing Metals and Non-metals', titleFr: 'Comparer les métaux et les non-métaux',
    subtitle: 'Tell a metal from a non-metal by its properties.',
    subtitleFr: 'Distingue un métal d’un non-métal par ses propriétés.',
    tasks: [
      { id: 'words', kind: 'words', xp: 20 },
      { id: 'sort', kind: 'steps', set: 'sort', xp: 20, title: 'Metal or non-metal?', titleFr: 'Métal ou non-métal ?', icon: 'Shapes', tone: 'teal' },
      { id: 'test', kind: 'steps', set: 'test', xp: 15, title: 'Test it', titleFr: 'Teste-le', icon: 'Lightbulb', tone: 'rose' },
      { id: 'mystery', kind: 'steps', set: 'mystery', xp: 25, title: 'Mystery substances', titleFr: 'Substances mystère', icon: 'FlaskConical', tone: 'violet' },
      { id: 'quiz', kind: 'quiz', xp: 20 },
    ],
  },
]

export const unitKey = (u) => `${u.track}/${u.unit}`
export const findUnit = (track, unit) => UNITS.find((u) => u.track === track && u.unit === unit) || null
export const findTask = (u, id) => (u?.tasks || []).find((t) => t.id === id) || null

/** A task's XP from its record: the best score (0..1) times the task's XP. */
export function taskXP(task, record) {
  const best = Math.max(0, Math.min(1, Number(record?.best) || 0))
  return Math.round(best * task.xp)
}

/** True once a task has been finished at least once. */
export const taskDone = (record) => (record?.runs || 0) > 0

/**
 * A unit's XP from its records ({ [taskId]: record }):
 *   xp     the XP held, at most 100
 *   offer  the XP its tasks offer together (can be more than 100)
 *   done   100 XP, or 80 with the quiz finished (80 alone when the unit has no quiz)
 */
export function unitXP(unit, records = {}) {
  const tasks = unit?.tasks || []
  const raw = tasks.reduce((s, t) => s + taskXP(t, records?.[t.id]), 0)
  const xp = Math.min(raw, UNIT_XP)
  const quiz = tasks.find((t) => t.kind === 'quiz')
  const done = xp >= UNIT_XP || (xp >= UNIT_DONE_XP && (!quiz || taskDone(records?.[quiz.id])))
  return { xp, offer: tasks.reduce((s, t) => s + t.xp, 0), done }
}

/**
 * What to do next in a unit, and why (the Dashboard's rule, without locks):
 *   a task left half done; then the first task never opened, in order; then the task
 *   with the most XP still to win. Null when every task holds its full XP.
 * `why` is 'continue', 'start' (nothing done in the unit yet), 'next' or 'more'.
 */
export function nextTaskOf(unit, records = {}) {
  const tasks = unit?.tasks || []
  const left = (t) => t.xp - taskXP(t, records?.[t.id])
  const todo = tasks.filter((t) => left(t) > 0)
  if (!todo.length) return null
  const half = todo.find((t) => records?.[t.id] && !taskDone(records[t.id]))
  if (half) return { task: half, why: 'continue' }
  const fresh = todo.find((t) => !records?.[t.id])
  if (fresh) return { task: fresh, why: tasks.some((t) => records?.[t.id]) ? 'next' : 'start' }
  return { task: [...todo].sort((a, b) => left(b) - left(a))[0], why: 'more' }
}

/** Where a unit opens: its own page. The address's ?demo travels with it. */
export const unitHref = (u, search = '', task = '') =>
  `${import.meta.env?.BASE_URL || '/'}unit/${search}#/${u.track}/${u.unit}${task ? `/${task}` : ''}`
