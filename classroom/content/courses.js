// The courses whose lessons live in PRA Learn (content/<id>/), in display order.
// Only Year 7 Maths and Science moved from BowenPRA/classroom (10 Nov 2026).
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
  // Games the teacher runs on the projector. Staff only: a game holds its own
  // answers, so it is listed in CLASSROOM_GAMES (src/data/classroomLessons.js), not
  // with the lessons, and classroom/main.jsx turns students away from it. Moved from
  // BowenPRA/classroom on 13 Nov 2026 (Jeopardy only; the other games stayed there).
  {
    id: 'games',
    title: 'Classroom Games',
    subtitle: 'Play-to-learn · Kindergarten to Year 7',
    color: '#f59e0b',
    icon: 'Gamepad2',
    bilingual: true,
  },
]
