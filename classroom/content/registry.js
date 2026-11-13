import { COURSES } from './courses.js'

// Every lesson lives at
//   content/<course>/<slug>/index.js
// and default-exports { meta, slides, plan? }. Opening a lesson downloads only
// that lesson's code (and the shared kits it imports from other lesson folders),
// never the other decks: the glob is lazy, so each index.js is its own chunk.
// Which lessons students and staff can open is src/data/classroomLessons.js;
// `npm run check:lessons` checks that list against these folders.
// content/banks/ would hold question banks, which have no index.js on purpose so
// that this glob never mistakes one for a lesson.
const modules = import.meta.glob('./*/*/index.js')

const pathOf = (courseId, slug) => `./${courseId}/${slug}/index.js`

// A lesson as the deck player reads it:
// { course, unit, id, title, objective, order, slug, slides, plan, ... }
function shape(path, mod) {
  const data = mod.default || {}
  const meta = data.meta || {}
  // Fall back to the folder name for the course if meta omits it.
  const folderCourse = path.split('/')[1]
  const unitFolder = path.split('/')[2]
  return {
    course: meta.course || folderCourse,
    unit: meta.unit || unitFolder,
    id: meta.id || unitFolder,
    slug: unitFolder, // used in the URL: #/lesson/<course>/<slug>
    title: meta.title || unitFolder,
    subtitle: meta.subtitle || '',
    objective: meta.objective || '',
    order: meta.order ?? 999,
    // `hidden: true` delisted a lesson on the classroom site's own home page. In
    // PRA Learn, src/data/classroomLessons.js decides what is listed.
    hidden: meta.hidden === true,
    // The self-study twin on the old Dashboard, `{ track, unit }`. The classroom
    // page always passes null, so the deck shows no Dashboard link.
    dashboard: meta.dashboard || null,
    // `href` lists something that is not a deck. None of the lessons here has one.
    href: meta.href || null,
    // `french: true` adds FR to the deck's EN/VN switch — set it once every
    // string in the lesson, widgets included, has its `…Fr` twin.
    french: meta.french === true,
    // `vietnamese: false` takes VN off the switch. The Year 7 lessons are
    // English and French from Unit 4 (15 October 2026); older decks keep VN.
    vietnamese: meta.vietnamese !== false,
    // `enFr: true` (with `french: true`) adds EN+FR to the switch: English with
    // the French underneath, for a widget that prints both (Jeopardy). Everything
    // else in the deck reads 'en+fr' as English.
    enFr: meta.enFr === true,
    slides: data.slides || [],
    plan: data.plan || null,
  }
}

/** One course by id (from courses.js), or undefined. */
export function getCourse(courseId) {
  return COURSES.find((c) => c.id === courseId)
}

/** Whether content/<course>/<slug>/index.js exists. */
export function hasLesson(courseId, slug) {
  return Boolean(modules[pathOf(courseId, slug)])
}

const loaded = new Map()

/** One lesson by course id + slug: a promise of the lesson, or of undefined when
 *  there is no such folder. Loaded once per page; a failed download is tried
 *  again on the next call. */
export function loadLesson(courseId, slug) {
  const path = pathOf(courseId, slug)
  if (!modules[path]) return Promise.resolve(undefined)
  if (!loaded.has(path)) {
    const p = modules[path]().then((mod) => shape(path, mod))
    p.catch(() => loaded.delete(path))
    loaded.set(path, p)
  }
  return loaded.get(path)
}
