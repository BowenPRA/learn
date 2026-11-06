// The list of courses shown on the home page, in display order.
// A course appears here even before it has any lessons (shows "coming soon").
// `id` must match the folder name under content/<id>/ and each lesson's meta.course.
// `units` names the textbook units: the course page lists lessons newest first
// under a heading per unit, and a unit missing here is headed by its number.
// `teacher` (optional) names the class teacher for a PRA teacher's course
// ('Mr. David'): the deck's blank screen says "Eyes on Mr. David" and the plan's
// header names him. Leave it out on Mr Bowen's courses; the decks then say
// Mr Bowen, as before. The registry passes every course field through.
export const COURSES = [
  {
    id: 'y7-math',
    title: 'Year 7 Mathematics',
    subtitle: 'Cambridge Lower Secondary',
    color: '#1cb0f6',
    icon: 'Calculator',
    bilingual: true, // lessons offer an EN/VN toggle
    units: {
      1: 'Integers',
      2: 'Expressions, formulae and equations',
      3: 'Place value and rounding',
      4: 'Decimals',
      5: 'Angles and constructions',
    },
  },
  {
    id: 'y7-science',
    title: 'Year 7 Science',
    subtitle: 'Cambridge Lower Secondary',
    color: '#14b8a6',
    icon: 'FlaskConical',
    bilingual: true,
    units: {
      1: 'Cells',
      2: 'Materials and their structure',
      3: 'Forces and energy',
    },
  },
  {
    id: 'y5-math',
    title: 'Year 5 Mathematics',
    subtitle: 'Cambridge Primary · Mr. David',
    teacher: 'Mr. David',
    color: '#22a06b',
    icon: 'Calculator',
    bilingual: false, // English only: no language switch
    // Cambridge Primary Mathematics 5 (2nd edition) units, as in Mr. David's
    // planning folders. Lessons are listed under the unit they belong to.
    units: {
      5: 'Addition and subtraction',
    },
  },
  {
    id: 'games',
    title: 'Classroom Games',
    subtitle: 'Play-to-learn · Kindergarten to Year 7',
    color: '#f59e0b',
    icon: 'Gamepad2',
    bilingual: true, // the game's own interface toggles EN/VN
  },
  {
    id: 'freshman-math',
    title: 'Freshman Mathematics',
    subtitle: 'High School',
    color: '#8b5cf6',
    icon: 'Sigma',
    bilingual: false,
  },
  {
    id: 'coord-science',
    title: 'Coordinated Science',
    subtitle: 'Cambridge IGCSE',
    color: '#4338ca',
    icon: 'Zap',
    bilingual: false, // English-only one-on-one lessons — EN/VN toggle hidden
  },
]
