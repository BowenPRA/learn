// content/y7-science/U00_1/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
// Covers homeroom + the science period. The Stage 6 diagnostic runs in the
// maths period at 10:45 and is taught off the paper, not off this deck.
export const plan = {
  duration: 'Homeroom 15 min + Science 50 min',
  objective:
    'Students know each other and their teacher by name, understand the class expectations well enough to explain them at home, ' +
    'and leave with a correctly set up binder and a named Learner\'s Book.',
  materials: [
    'Projector / TV for the lesson deck',
    'Three small slips of paper per student, cut and on the desks before 8:30',
    'A bin, box or bag to collect the folded slips',
    'One printed expectation letter per student (plus a few spares)',
    'One binder + one folder per student; three plastic sleeves per student',
    'A roll of masking tape and a marker pen for the Learner\'s Book covers',
    'Class set of Cambridge Learner\'s Books',
    'Spare pencils',
  ],
  vocab: [
    { term: 'Homeroom', def: 'the 15 minutes at 8:30 where the day is set up — attendance, planner, notices' },
    { term: 'Planner', def: 'the student-family book that carries deadlines home and feedback back' },
    { term: 'Expectations', def: 'what we have agreed to do, written down, so nobody has to guess' },
    { term: 'Full sentence', def: 'a subject and a verb — "My favourite drink is coffee", not "coffee"' },
  ],
  timeline: [
    { time: '8:30–8:45', phase: 'Homeroom · write the slips', detail: 'Slips are already on the desks. Title slide, then the three sentence stems — one slip each, no names, fold and into the bin. Circulate: the ones who write a single word are the ones to catch now, before the next slide makes the point for you.' },
    { time: '8:45–8:52', phase: 'Science · 3 things about Mr Bowen', detail: 'Same three stems, my answers. Take a guess from the room on each one before pressing its button. The 10-million-dollars answer is a joke — deliver it flat and move on.' },
    { time: '8:52–9:05', phase: 'Science · the bin game', detail: 'Sentence-not-a-word slide first; it is the rule for the year and it lands better right after they have heard three good sentences. Then rounds: read twice, count three-two-one, everybody points, writer stands and repeats it aloud. Keep the pace fast — as many slips as the time allows, not all of them.' },
    { time: '9:05–9:10', phase: 'Science · the week', detail: 'Timetable slide: the four teal rows are mine. Have the class read the four times back at you. Then the four homeroom habits.' },
    { time: '9:10–9:22', phase: 'Science · the expectation letter', detail: 'Seven slides, one letter section each, students following on their own printed copy. Stop on any word a hand goes up for. The two that matter most are Literacy (why the computers stay shut) and Supplies (required from tomorrow).' },
    { time: '9:22–9:35', phase: 'Science · binder setup', detail: 'Everybody stands. Four jobs, one at a time, whole room finishing each step before the next: name on binder and folder, three sleeves (Math, Science, English), letter at the very front, taped name on the Learner\'s Book. Finish with the hold-it-up checklist and actually check all six from the front of the room.' },
  ],
  answers: [
    { q: 'Mr Bowen, slip 1', a: 'I broke my arm roller skating. Twice.' },
    { q: 'Mr Bowen, slip 2', a: 'Coffee.' },
    { q: 'Mr Bowen, slip 3', a: 'I would quit teaching, retire, and never be seen again.' },
    { q: 'The four times to know', a: '8:00 arrival · 8:30 homeroom · 8:45 Science · 10:45 Mathematics.' },
    { q: 'Where does the phone go?', a: 'Reception, on arrival. Collected at the end of the day.' },
    { q: 'What goes at the very front of the binder?', a: 'The expectation letter, before the three sleeves.' },
  ],
  notes:
    'The barrier in this class is English, not arithmetic — so day one establishes the sentence rule before any content arrives. ' +
    'The bin game is the vehicle: a one-word slip is unguessable, which makes "answer in full sentences" the students\' problem rather than the teacher\'s rule. ' +
    'Anonymity is the whole game: if names appear on slips, or students show each other, the round is dead. Say it twice before they write. ' +
    'Have a plan for a slip that is unkind or identifies someone — read it, do not attribute it, move on, and follow up privately at lunch. ' +
    'Binder setup always overruns. If it does, cut bin-game rounds, not the checklist — the checklist is the only thing that catches an unnamed folder. ' +
    'The Stage 6 diagnostic is at 10:45 in the maths period and has no slides: papers face down, 40 minutes, silence, and students may put a hand up to have a word READ to them but never explained. ' +
    'Mark it tonight — it sets the pace for the whole of Quarter 1. ' +
    'No photos in this deck — both figures are authored SVG in diagrams.js, so there is nothing to license.',
}
