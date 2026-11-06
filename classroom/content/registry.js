import { COURSES } from './courses.js'

// Auto-discover every lesson. Each lesson lives at
//   content/<course>/<unit>/index.js
// and default-exports { meta, slides, plan? }. Adding a new folder with an
// index.js is all it takes for a lesson to appear — no list to maintain.
// content/banks/ holds question banks, which have no index.js on purpose so
// that this glob never mistakes one for a lesson.
const modules = import.meta.glob('./*/*/index.js', { eager: true })

// lessons: [{ course, unit, id, title, objective, order, slug, slides, plan }]
const lessons = Object.entries(modules).map(([path, mod]) => {
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
    // `hidden: true` delists a lesson: it disappears from the home page and
    // its course page, but stays reachable at its direct URL. Use it to retire
    // a lesson without deleting it — see content/y7-science/U00_1.
    hidden: meta.hidden === true,
    // The self-study twin on the Dashboard, `{ track, unit }` — see
    // src/lib/dashboardLink.js. Null for a lesson with no unit built yet.
    dashboard: meta.dashboard || null,
    // `href` lists something that is not a deck — an app with its own route,
    // like Guess Who (#/guess-who). Its row opens that route; it has no slides.
    href: meta.href || null,
    // `french: true` adds FR to the deck's EN/VN switch — set it once every
    // string in the lesson, widgets included, has its `…Fr` twin.
    french: meta.french === true,
    // `vietnamese: false` takes VN off the switch. The Year 7 lessons are
    // English and French from Unit 4 (15 October 2026); older decks keep VN.
    vietnamese: meta.vietnamese !== false,
    slides: data.slides || [],
    plan: data.plan || null,
  }
})

const byOrder = (a, b) => a.order - b.order || a.slug.localeCompare(b.slug)

/** Courses joined with their lessons, in display order. Every field of a
 *  courses.js entry passes through as it is (`teacher`, `units`, …); only
 *  lesson meta is picked field by field above. */
export function getCatalog() {
  return COURSES.map((course) => ({
    ...course,
    lessons: lessons
      .filter((l) => l.course === course.id && !l.hidden)
      .sort(byOrder),
  }))
}

/** One course by id, or undefined. */
export function getCourse(courseId) {
  return getCatalog().find((c) => c.id === courseId)
}

/** One lesson by course id + slug, or undefined. */
export function getLesson(courseId, slug) {
  return lessons.find((l) => l.course === courseId && l.slug === slug)
}
