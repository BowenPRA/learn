// Mr. Bowen's classroom decks, shown in PRA Learn exactly as he teaches them (Bowen,
// 6 November 2026: "the full, high quality classroom experience", not a review pack).
//
// Each lesson is a folder in classroom/content/<course>/<slug>/ (moved from
// BowenPRA/classroom on 10 Nov 2026 and edited here since; classroom/README.md), and
// opens on PRA Learn's classroom page: /classroom/#/lesson/<course>/<slug>. This list
// is what students and staff can open and what the home pages show. Keep it in
// teaching order (oldest first); the pages show the newest first.
// `npm run check:lessons` (part of npm test) fails when it and the folders disagree.
//
//   course    the course folder (classroom/content/<course>/)
//   slug      the lesson folder (classroom/content/<course>/<slug>/)
//   classKey  the PRA Learn class it belongs to ('science:Year 7'); a student sees
//             the lessons of their year group
//   unit      the label the deck shows before the title ('3.4', '3.4 Lab')
//   title, subtitle  as in the deck's meta (the check fails when they drift);
//             titleVn / subtitleVn for the Vietnamese page, when there are any
//   teacher   who teaches it, shown on the card
export const CLASSROOM_LESSONS = [
  {
    course: 'y7-math', slug: 'U01_1', classKey: 'math:Year 7', unit: '1.1', teacher: 'Mr. Bowen',
    title: 'Adding & Subtracting Integers',
  },
  {
    course: 'y7-math', slug: 'U01_2', classKey: 'math:Year 7', unit: '1.2', teacher: 'Mr. Bowen',
    title: 'Multiplying & Dividing Integers',
  },
  {
    course: 'y7-math', slug: 'U01_3', classKey: 'math:Year 7', unit: '1.3', teacher: 'Mr. Bowen',
    title: 'Lowest Common Multiples',
  },
  {
    course: 'y7-math', slug: 'U01_4', classKey: 'math:Year 7', unit: '1.4', teacher: 'Mr. Bowen',
    title: 'Highest Common Factors',
  },
  {
    course: 'y7-math', slug: 'U01_5', classKey: 'math:Year 7', unit: '1.5', teacher: 'Mr. Bowen',
    title: 'Tests for Divisibility',
  },
  {
    course: 'y7-math', slug: 'U01_6', classKey: 'math:Year 7', unit: '1.6', teacher: 'Mr. Bowen',
    title: 'Square Roots & Cube Roots',
  },
  {
    course: 'y7-math', slug: 'U02_1', classKey: 'math:Year 7', unit: '2.1', teacher: 'Mr. Bowen',
    title: 'Constructing Expressions',
  },
  {
    course: 'y7-math', slug: 'U02_2', classKey: 'math:Year 7', unit: '2.2', teacher: 'Mr. Bowen',
    title: 'Using Expressions and Formulae',
  },
  {
    course: 'y7-math', slug: 'T01_formula-machine', classKey: 'math:Year 7', unit: 'T1', teacher: 'Mr. Bowen',
    title: 'Task: The Formula Machine',
  },
  {
    course: 'y7-math', slug: 'T02_girl-math', classKey: 'math:Year 7', unit: 'T2', teacher: 'Mr. Bowen',
    title: 'Girl Math',
  },
  {
    course: 'y7-math', slug: 'U02_3', classKey: 'math:Year 7', unit: '2.3', teacher: 'Mr. Bowen',
    title: 'Collecting Like Terms',
  },
  {
    course: 'y7-math', slug: 'U02_4', classKey: 'math:Year 7', unit: '2.4', teacher: 'Mr. Bowen',
    title: 'Expanding Brackets',
  },
  {
    course: 'y7-math', slug: 'U02_5', classKey: 'math:Year 7', unit: '2.5', teacher: 'Mr. Bowen',
    title: 'Constructing & Solving Equations',
  },
  {
    course: 'y7-math', slug: 'U02_6', classKey: 'math:Year 7', unit: '2.6', teacher: 'Mr. Bowen',
    title: 'Inequalities',
  },
  {
    course: 'y7-math', slug: 'U03_1_2', classKey: 'math:Year 7', unit: '3.1–3.2', teacher: 'Mr. Bowen',
    title: 'Place Value and Rounding',
    subtitle: 'Powers of 10, and how exact an answer has to be',
  },
  {
    course: 'y7-math', slug: 'T03_poster-showcase', classKey: 'math:Year 7', unit: 'T3', teacher: 'Mr. Bowen',
    title: 'Task: The Maths Poster',
    subtitle: 'End-of-Quarter showcase · Thursday 8 October, 3:30–4:15',
  },
  {
    course: 'y7-math', slug: 'U04_1_4', classKey: 'math:Year 7', unit: '4.1–4.4', teacher: 'Mr. Bowen',
    title: 'Decimals',
    subtitle: 'Compare, add, subtract, multiply and divide — and where the point goes',
  },
  {
    course: 'y7-math', slug: 'U04_5', classKey: 'math:Year 7', unit: '4.5', teacher: 'Mr. Bowen',
    title: 'Making Calculations Easier',
    subtitle: 'Same answer, less work',
  },
  {
    course: 'y7-math', slug: 'U04_review', classKey: 'math:Year 7', unit: '4 Review', teacher: 'Mr. Bowen',
    title: 'Bigger Numbers, Real Problems',
    subtitle: 'Unit 4 consolidation — × and ÷ by 2-digit numbers, money, the mean',
  },
  {
    course: 'y7-math', slug: 'U05_1', classKey: 'math:Year 7', unit: '5.1', teacher: 'Mr. Bowen',
    title: 'A Sum of 360°',
    subtitle: 'Angles on a line, round a point and in a quadrilateral',
  },
  {
    course: 'y7-math', slug: 'U05_2', classKey: 'math:Year 7', unit: '5.2', teacher: 'Mr. Bowen',
    title: 'Intersecting Lines',
    subtitle: 'X, F and Z: vertically opposite, corresponding and alternate angles',
  },
  {
    course: 'y7-math', slug: 'U05_3', classKey: 'math:Year 7', unit: '5.3', teacher: 'Mr. Bowen',
    title: 'Drawing Lines and Quadrilaterals',
    subtitle: 'A protractor, a ruler and a set square: right angles, parallel lines and four-sided shapes, drawn and checked',
  },
  {
    course: 'y7-math', slug: 'U06_1', classKey: 'math:Year 7', unit: '6.1', teacher: 'Mr. Bowen',
    title: 'Conducting an Investigation',
    subtitle: 'Words, counts and measures: ask a good question, collect the class’s answers, and test a prediction',
  },
  {
    course: 'y7-math', slug: 'U06_2', classKey: 'math:Year 7', unit: '6.2', teacher: 'Mr. Bowen',
    title: 'Taking a Sample',
    subtitle: 'Ask some, learn about everyone: a fair sample, chosen at random, and big enough to trust',
  },
  {
    course: 'y7-science', slug: 'U00_1', classKey: 'science:Year 7', unit: 'Day 1', teacher: 'Mr. Bowen', hidden: true,
    title: 'Day One: Welcome to Year 7',
    subtitle: 'Homeroom · Science — Tue 4 Aug 2026',
  },
  {
    course: 'y7-science', slug: 'U01_1', classKey: 'science:Year 7', unit: '1.1', teacher: 'Mr. Bowen',
    title: 'Cells: The Building Blocks of Life',
  },
  {
    course: 'y7-science', slug: 'U01_2', classKey: 'science:Year 7', unit: '1.2', teacher: 'Mr. Bowen',
    title: 'Animal Cells: What You Are Made Of',
  },
  {
    course: 'y7-science', slug: 'U01_3', classKey: 'science:Year 7', unit: '1.3', teacher: 'Mr. Bowen',
    title: 'Specialised Cells: Built for the Job',
  },
  {
    course: 'y7-science', slug: 'U01_4', classKey: 'science:Year 7', unit: '1.4', teacher: 'Mr. Bowen',
    title: 'Cells, Tissues and Organs',
  },
  {
    course: 'y7-science', slug: 'U00_2', classKey: 'science:Year 7', unit: 'Lab 1', teacher: 'Mr. Bowen',
    title: 'Accuracy and Precision',
    subtitle: 'Scientific Enquiry — 3 stations, 20 minutes each',
  },
  {
    course: 'y7-science', slug: 'U00_3', classKey: 'science:Year 7', unit: 'P1', teacher: 'Mr. Bowen',
    title: 'Hanging Window Planters',
    subtitle: 'A tiny recycled-cup garden for the classroom window',
  },
  {
    course: 'y7-science', slug: 'U02_1a', classKey: 'science:Year 7', unit: '2.1a', teacher: 'Mr. Bowen',
    title: 'Solids, Liquids and Gases',
  },
  {
    course: 'y7-science', slug: 'U02_1b', classKey: 'science:Year 7', unit: '2.1b', teacher: 'Mr. Bowen',
    title: 'Particle Theory',
  },
  {
    course: 'y7-science', slug: 'U02_2a', classKey: 'science:Year 7', unit: '2.2a', teacher: 'Mr. Bowen',
    title: 'Changes of State',
  },
  {
    course: 'y7-science', slug: 'U02_2b', classKey: 'science:Year 7', unit: '2.2b', teacher: 'Mr. Bowen',
    title: 'Measuring, and Heating Water',
  },
  {
    course: 'y7-science', slug: 'U02_model_states', classKey: 'science:Year 7', unit: 'Model', teacher: 'Mr. Bowen',
    title: 'Heating & Cooling: A Particle Model',
  },
  {
    course: 'y7-science', slug: 'U02_3', classKey: 'science:Year 7', unit: '2.3', teacher: 'Mr. Bowen',
    title: 'Explaining Changes of State',
  },
  {
    course: 'y7-science', slug: 'U02_4', classKey: 'science:Year 7', unit: '2.4', teacher: 'Mr. Bowen',
    title: 'The Water Cycle',
  },
  {
    course: 'y7-science', slug: 'U02_5', classKey: 'science:Year 7', unit: '2.5', teacher: 'Mr. Bowen',
    title: 'Atoms, Elements and the Periodic Table',
  },
  {
    course: 'y7-science', slug: 'U02_first20', classKey: 'science:Year 7', unit: '2.5+', teacher: 'Mr. Bowen',
    title: 'The First 20 Elements',
  },
  {
    course: 'y7-science', slug: 'U02_6', classKey: 'science:Year 7', unit: '2.6', teacher: 'Mr. Bowen',
    title: 'Compounds and Formulae',
  },
  {
    course: 'y7-science', slug: 'U02_7', classKey: 'science:Year 7', unit: '2.7', teacher: 'Mr. Bowen',
    title: 'Compounds and Mixtures',
  },
  {
    course: 'y7-science', slug: 'U02_8', classKey: 'science:Year 7', unit: '2.8', teacher: 'Mr. Bowen',
    title: 'Acids and Bases',
  },
  {
    course: 'y7-science', slug: 'U03_1', classKey: 'science:Year 7', unit: '3.1', teacher: 'Mr. Bowen',
    title: 'Gravity, Weight and Mass',
    subtitle: 'Do heavy things fall faster? Galileo, the Moon, and the newton',
  },
  {
    course: 'y7-science', slug: 'U03_lab', classKey: 'science:Year 7', unit: '3.1 Lab', teacher: 'Mr. Bowen',
    title: 'Designing a Lab',
    subtitle: 'Do heavy things fall faster? How do you time a fall?',
  },
  {
    course: 'y7-science', slug: 'U03_2', classKey: 'science:Year 7', unit: '3.2', teacher: 'Mr. Bowen',
    title: 'Formation of the Solar System',
    subtitle: 'Nobody was there — so how do we know? A cloud of dust, gravity, and one spinning disc',
  },
  {
    course: 'y7-science', slug: 'U03_models', classKey: 'science:Year 7', unit: 'Models', teacher: 'Mr. Bowen',
    title: 'Models: Space',
    subtitle: 'The Solar System to scale, and how it formed',
  },
  {
    course: 'y7-science', slug: 'U03_coffee', classKey: 'science:Year 7', unit: 'Models', teacher: 'Mr. Bowen',
    title: 'Coffee, Carbon and Stars',
    subtitle: 'Half-life, carbon dating and the Sun’s age: different speeds, the same maths',
  },
  {
    course: 'y7-science', slug: 'U03_earth', classKey: 'science:Year 7', unit: 'Models', teacher: 'Mr. Bowen',
    title: 'How Old Is the Earth?',
    subtitle: 'Longer clocks: crystals, meteorites, and three methods that agree',
  },
  {
    course: 'y7-science', slug: 'U03_3', classKey: 'science:Year 7', unit: '3.3', teacher: 'Mr. Bowen',
    title: 'Movement in Space',
    subtitle: 'Let go of the string: what keeps the planets going round, and why nothing slows them down',
  },
  {
    course: 'y7-science', slug: 'U03_4', classKey: 'science:Year 7', unit: '3.4', teacher: 'Mr. Bowen',
    title: 'Tides',
    subtitle: 'The Moon pulls, the Earth spins, the Sun helps: why the sea goes up and down twice a day',
  },
  {
    course: 'y7-science', slug: 'U03_5', classKey: 'science:Year 7', unit: '3.5', teacher: 'Mr. Bowen',
    title: 'Energy',
    subtitle: 'How much, what kind, how long: joules, the five stores and three transfers, and which stores last',
  },
  {
    course: 'y7-science', slug: 'U03_6', classKey: 'science:Year 7', unit: '3.6', teacher: 'Mr. Bowen',
    title: 'Changes in Energy',
    subtitle: 'Change it, draw it, follow it: events and processes, energy-change diagrams, and where the heat goes',
  },
  {
    course: 'y7-science', slug: 'U03_7', classKey: 'science:Year 7', unit: '3.7', teacher: 'Mr. Bowen',
    title: 'Where Does Energy Go?',
    subtitle: 'Sort it, count it, chase it: useful and wasted energy, the two lamps, and energy that spreads out for good',
  },
  {
    course: 'y7-science', slug: 'U03_tidelab', classKey: 'science:Year 7', unit: '3.4 Lab', teacher: 'Mr. Bowen',
    title: 'The River Tide Lab',
    subtitle: 'Two weeks of our river: read the pole, fill in the table, graph the tide',
  },
  {
    course: 'y7-science', slug: 'U04_1', classKey: 'science:Year 7', unit: '4.1', teacher: 'Mr. Bowen',
    title: 'Characteristics of Living Organisms',
    subtitle: 'Is it alive? Spot it, name them, test it: organisms, the seven characteristics (MRS GREN) in a polar bear and a plant, and why a car is not alive',
  },
  {
    course: 'y7-science', slug: 'U04_3', classKey: 'science:Year 7', unit: '4.3', teacher: 'Mr. Bowen',
    title: 'What Is a Species?',
    subtitle: 'Compare, name, test: two elephants, species and variation, and why a lion and a tiger are two species (fertile offspring)',
  },
]

/** Where a classroom lesson opens: its own page, outside PRA Learn's hash routes.
 *  The address's ?demo travels with it, so the demo stays the demo. */
export const classroomHref = (lesson, search = '') =>
  `${import.meta.env?.BASE_URL || '/'}classroom/${search}#/lesson/${lesson.course}/${lesson.slug}`

/** The teacher's plan for a classroom lesson (staff only), on the same page. Keeps ?demo. */
export const classroomPlanHref = (lesson, search = '') =>
  `${import.meta.env?.BASE_URL || '/'}classroom/${search}#/plan/${lesson.course}/${lesson.slug}`

// ---------------------------------------------------------------------------
// How the pages list the lessons: by class (subject), then by book unit, newest
// unit first and newest lesson first inside it, as the classroom's course page did
// (BowenPRA/classroom src/lib/listing.js unitGroups).

// The book's unit names by course and unit number, [English, Vietnamese], from the
// classroom's content/courses.js. A unit not named here is headed by its number only.
export const CLASSROOM_UNIT_NAMES = {
  'y7-math': {
    1: ['Integers', 'Số nguyên'],
    2: ['Expressions, formulae and equations', 'Biểu thức, công thức và phương trình'],
    3: ['Place value and rounding', 'Giá trị theo vị trí và làm tròn số'],
    4: ['Decimals', 'Số thập phân'],
    5: ['Angles and constructions', 'Góc và dựng hình'],
  },
  'y7-science': {
    1: ['Cells', 'Tế bào'],
    2: ['Materials and their structure', 'Vật liệu và cấu tạo của chúng'],
    3: ['Forces and energy', 'Lực và năng lượng'],
  },
}

const lessonKey = (l) => `${l.course}/${l.slug}`
// Each lesson's place in teaching order (its index in the list above).
const ORDER = new Map(CLASSROOM_LESSONS.map((l, i) => [lessonKey(l), i]))

// Each lesson's unit: the leading number of its label ('3.4 Lab' -> 3, '4.1–4.4' -> 4,
// '4 Review' -> 4). A label without one ('T1', 'Models', 'Lab 1', 'P1') belongs to the
// unit of the lesson before it in its course; one before any numbered lesson, to the
// first numbered unit after it. Worked out over the whole list, hidden lessons too, so
// hiding a lesson never moves another.
const UNIT_OF = (() => {
  const out = new Map()
  const last = {}
  const waiting = {}
  for (const l of CLASSROOM_LESSONS) {
    const m = /^(\d+)/.exec(String(l.unit || '').trim())
    if (m) {
      last[l.course] = Number(m[1])
      for (const k of waiting[l.course] || []) out.set(k, last[l.course])
      waiting[l.course] = []
    }
    if (last[l.course] != null) out.set(lessonKey(l), last[l.course])
    else (waiting[l.course] ||= []).push(lessonKey(l))
  }
  return out
})()

/** A lesson's book unit number, or null when its course has no numbered labels. */
export const classroomUnitOf = (lesson) => UNIT_OF.get(lessonKey(lesson)) ?? null

/** Whether a lesson is listed on the pages. `hidden: true` keeps it off every list;
 *  its address still opens it. */
export const isListedLesson = (lesson) => !lesson?.hidden

// Classes in subject order (English, Maths, Science, Technology), then by year group.
const SUBJECT_ORDER = ['english', 'math', 'science', 'technology']
const subjectRank = (key) => {
  const i = SUBJECT_ORDER.indexOf(String(key).split(':')[0])
  return i < 0 ? SUBJECT_ORDER.length : i
}
const yearRank = (key) => {
  const m = /(\d+)/.exec(String(key).split(':')[1] || '')
  return m ? Number(m[1]) : 99
}

/**
 * Lessons grouped for a page: one group per class, in subject order, each with its
 * lessons newest first and its book units newest first:
 *   [{ classKey, course, lessons, units: [{ unit, name: [en, vn] | null, lessons }] }]
 * Takes any of the list's lessons in any order; hidden ones are left out.
 */
export function classroomGroups(lessons) {
  const byClass = new Map()
  for (const l of lessons) {
    if (!isListedLesson(l)) continue
    if (!byClass.has(l.classKey)) byClass.set(l.classKey, [])
    byClass.get(l.classKey).push(l)
  }
  const newestFirst = (a, b) => (ORDER.get(lessonKey(b)) ?? -1) - (ORDER.get(lessonKey(a)) ?? -1)
  return [...byClass.entries()]
    .sort(([a], [b]) => subjectRank(a) - subjectRank(b) || yearRank(a) - yearRank(b) || a.localeCompare(b))
    .map(([classKey, list]) => {
      const sorted = [...list].sort(newestFirst)
      const units = []
      for (const l of sorted) {
        const unit = classroomUnitOf(l)
        let group = units.find((u) => u.unit === unit)
        if (!group) {
          group = { unit, name: (unit != null && CLASSROOM_UNIT_NAMES[l.course]?.[unit]) || null, lessons: [] }
          units.push(group)
        }
        group.lessons.push(l)
      }
      return { classKey, course: sorted[0].course, lessons: sorted, units }
    })
}
