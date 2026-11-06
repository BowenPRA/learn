// Mr. Bowen's classroom decks, shown in PRA Learn exactly as he teaches them (Bowen,
// 6 November 2026: "the full, high quality classroom experience", not a review pack).
//
// Each lesson here is a copy of its folder in BowenPRA/classroom, made by
// `npm run sync:classroom` (scripts/sync-classroom.mjs), and opens on PRA Learn's
// classroom page: /classroom/#/lesson/<course>/<slug> (classroom/index.html).
// This list is both what the sync copies and what the home pages show.
//
//   course    the classroom course folder (content/<course>/)
//   slug      the lesson folder (content/<course>/<slug>/)
//   classKey  the PRA Learn class it belongs to ('science:Year 7')
//   unit      the label the classroom shows before the title
//   title     English title (titleVn for the Vietnamese page, when there is one)
export const CLASSROOM_LESSONS = [
  { course: 'y7-science', slug: 'U03_4', classKey: 'science:Year 7', unit: '3.4', title: 'Tides', teacher: 'Mr. Bowen' },
  { course: 'y7-science', slug: 'U03_tidelab', classKey: 'science:Year 7', unit: '3.4 Lab', title: 'The River Tide Lab', teacher: 'Mr. Bowen' },
]

/** Where a classroom lesson opens: its own page, outside PRA Learn's hash routes.
 *  The address's ?demo travels with it, so the demo stays the demo. */
export const classroomHref = (lesson, search = '') =>
  `${import.meta.env?.BASE_URL || '/'}classroom/${search}#/lesson/${lesson.course}/${lesson.slug}`
