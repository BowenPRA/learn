// content/y7-science/U01_2/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective: 'Students can name the four parts of an animal cell and what each does, name the three parts a plant cell has that an animal cell has not, explain why an animal cell has no fixed shape, decide from a photograph whether cells are plant or animal and give a reason, and put the steps of preparing a stained slide in the right order.',
  materials: [
    'Projector / TV for the lesson deck',
    'Student science notebooks',
    'Learner’s Book (Unit 1.2, pages 13–16)',
    'For the activity: 15 card ovals per group (5 red, 10 green), 1 grey circle, string or wool, wide tape, glue, a large sheet of paper',
    'Only if the lab kit has arrived: microscopes, slides, cover slips, cotton buds, methylene blue, dropper pipettes, safety glasses',
  ],
  vocab: [
    { term: 'Stain', def: 'a coloured dye added to a specimen to make its parts easier to see' },
    { term: 'Cell membrane / Cytoplasm / Mitochondria / Nucleus', def: 'the four parts an animal cell has — the same four every cell has' },
    { term: 'Cell wall / Chloroplast / Sap vacuole', def: 'the three parts a plant cell has and an animal cell has not' },
    { term: 'Similar', def: 'alike in some ways and different in others — NOT "the same"' },
    { term: 'Organelle vs substance', def: 'an organelle is a structure you can point to; a substance is the material an organelle is made of (cellulose, chlorophyll)' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Title slide. Two minutes: list the parts of a plant cell beginning with "c". Take the lists round the room.' },
    { time: '5–9 min', phase: 'The C words', detail: 'The book asks for five; the class will find six. The slide gives the split straight out — four ORGANELLES (cell wall, cell membrane, cytoplasm, chloroplast) and two SUBSTANCES (cellulose, chlorophyll). That distinction is the point, not the count.' },
    { time: '9–14 min', phase: 'The hook — ask first', detail: 'Slide 3 gives the question ONLY: how many cells is Mr Bowen? Pairs, one number each, guesses on the board. Slide 4 gives the answer — about 100 trillion — and then asks the two questions that make the number mean something: how big is a trillion, and how long would it take you to count to one? (Answers below; let them argue first.) Slide 5 is the Milky Way payoff; slide 6 is the p.13 artwork.' },
    { time: '14–21 min', phase: 'Parts of an animal cell', detail: 'Copy the four parts. Reveal-check what each one does (recall from 1.1). Then Draw This: the p.14 figure, all four labels. Budget real drawing time here.' },
    { time: '21–28 min', phase: 'The difference', detail: 'Spot the Difference — unlabelled plant and animal cells side by side, two minutes, written down not called out. Then the answer gallery (wall, chloroplasts, sap vacuole) and why no wall means no fixed shape. Bonus: the nerve cell.' },
    { time: '28–33 min', phase: 'English + the photographs', detail: '"Similar" is not "the same" — copy the three comparing sentence patterns, then make someone finish the sentence out loud. Then the Plant or Animal widget: four worked examples first (named, evidence read together), then four numbered photographs the class votes on. Photograph 3 (Rhoeo — purple, not one chloroplast) is the trap; let them get it wrong, because the next slide is built on it.' },
    { time: '33–41 min', phase: 'The practical', detail: 'Equipment and safety, then the key word "stain" on its own slide — copy the definition, then the English aside (a stain on your shirt is an accident; in a lab you stain something on purpose). Steps 1–4 make the slide; steps 5–7 set the microscope up, with the "look from the side" reveal; steps 8–10 find the cells. Then the real cheek-cell photograph. The deck says plainly that the lab happens when the microscope arrives, so today is about learning the method and the order. If the microscope IS here, run it for real from this point and let the rest of the deck wait for next lesson.' },
    { time: '41–46 min', phase: 'Group activity', detail: 'Build a plant cell from card and tape in threes, get it checked, then remove pieces to make it an animal cell. The reveal is p.15 Question 2.' },
    { time: '46–50 min', phase: 'The rule + recap + HW', detail: 'The one clue that always works: the cell wall, not the colour green. Summary checklist — 7 written items and 1 labelled drawing. Set homework (read pp. 13–16; copy and answer p.15 Q1 and Q2 in full sentences, "because" three times).' },
  ],
  answers: [
    { q: 'Getting started — the "c" words:', a: 'Organelles: cell wall, cell membrane, cytoplasm, chloroplast. Substances: cellulose, chlorophyll. Six words, but only four are organelles — which is why the book says five is arguable, and worth arguing about.' },
    { q: 'Cells in one person:', a: 'About 100 trillion — 100 000 000 000 000' },
    { q: 'How big is a trillion?', a: 'A million millions. Written out: 1 000 000 000 000. A trillion millimetres is a billion metres — about 2600 return trips to the Moon.' },
    { q: 'How long to count to a TRILLION, one per second?', a: '1 000 000 000 000 ÷ 60 ÷ 60 ÷ 24 ÷ 365 = about 31 700 years. You would have had to start before the last ice age ended.' },
    { q: 'And to count all 100 trillion of your cells?', a: 'About 3 170 000 years — a hundred times longer again.' },
    { q: 'An animal cell has:', a: 'cell membrane, cytoplasm, mitochondria, nucleus' },
    { q: 'A plant cell has these as well:', a: 'cell wall (made of cellulose), chloroplasts (containing chlorophyll), sap vacuole' },
    { q: 'Plant or Animal — the four worked examples:', a: 'Moss leaf = plant (straight walls + chloroplasts). Cheek cells = animal (soft, no straight edges). Onion = plant (straight walls, but NO chloroplasts — it grows underground). Human blood = animal (round, separate, no wall).' },
    { q: 'Plant or Animal — the four they vote on:', a: '1 pondweed leaf tip = PLANT (boxy walls, packed with chloroplasts). 2 skeletal muscle = ANIMAL (long soft fibres, dark nuclei, no walls). 3 Rhoeo epidermis = PLANT — the trap: purple, no chloroplasts at all, but every cell has straight-sided walls. 4 blood = ANIMAL (the big cell with the purple middle is a white blood cell).' },
    { q: 'p.15 Q2 — turning a plant-cell model into an animal one:', a: 'Remove the cell wall, the chloroplasts and the sap vacuole. Everything else stays.' },
    { q: 'The most reliable feature:', a: 'The cell wall — a straight, stiff edge with cells packed like bricks. "No green" does NOT mean animal.' },
    { q: 'Why look from the side (step 3):', a: 'With your eye at the eyepiece you cannot judge the gap; looking from the side is the only way to avoid driving the lens through the slide.' },
  ],
  notes:
    'The question slides come BEFORE the numbers on purpose — slide 3 (how many cells?) and slide 9 (spot the difference) both stop dead with no answer on them. Take guesses, write a few on the board, and resist filling the silence. ' +
    'The starter is worth the four minutes: the book asks for five "c" words and the class will find six, and sorting organelles from substances is the kind of precision that costs marks later. ' +
    'The Plant or Animal widget runs in two halves. The first four are named worked examples — read the evidence out loud with them and make them say WHY, not just what. Only then do the four numbered ones, which give nothing away. Photograph 3 is deliberately a trap: students who have decided "green = plant" will call the Rhoeo an animal cell. Let that happen before you fix it — the slide after the widget is built on it. ' +
    'Push for full English sentences throughout: the starter asks for one, and the homework needs "because" three times. The comparing sentence patterns on the "Similar Is Not the Same" slide are the ones to drill. ' +
    'One slide is marked Draw This (the p.14 animal cell) — budget real drawing time. ' +
    'The practical is written as a method to learn, not a lab to run: the deck tells the class the lab happens when the microscope arrives. If it has arrived, run it from the equipment slide onward and let the rest wait for next lesson. ' +
    'Anything students must copy appears in an orange "Write This Down" panel or an orange bumper; everything else is discussion. ' +
    'Image sources and licences are recorded in content/y7-science/U01_2/images/CREDITS.json — the lb-* figures are scans from the Learner’s Book and are for classroom use only.',
}
