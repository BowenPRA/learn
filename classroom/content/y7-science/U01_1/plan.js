// content/y7-science/U01_1/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective: 'Students can define a cell and an organelle, describe the scale of a cell, name the shared and plant-only organelles and their jobs, and explain what a microscope does and what a model’s limitations are.',
  materials: [
    'Projector / TV for the lesson deck',
    'Empty soda cans (one per pair)',
    'Rulers',
    'Student science notebooks',
    'Learner’s Book (Unit 1.1, pages 8–12)',
  ],
  vocab: [
    { term: 'Cell', def: 'the smallest basic unit of all living organisms' },
    { term: 'Organelle', def: 'a tiny structure inside a cell that does one specific job' },
    { term: 'Cell membrane / Cytoplasm / Nucleus / Mitochondria', def: 'the four organelles every cell has' },
    { term: 'Cell wall / Cellulose / Chloroplast / Chlorophyll / Sap vacuole', def: 'the plant-only extras' },
    { term: 'Microscope', def: 'a tool that uses lenses to bend light and magnify a tiny image' },
    { term: 'Limitations', def: 'the weaknesses of a model — how it differs from the real object' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Title slide. Students write one full sentence describing how small a cell is, using a measurement or a comparison.' },
    { time: '5–10 min', phase: 'The question', detail: 'Pairs, cans out. Slide 2 gives the question ONLY — one average cell magnified to soda-can size, how big is Mr Bowen (178 cm)? No numbers yet. Take guesses around the room and write a few on the board before moving on.' },
    { time: '10–16 min', phase: 'Working it out', detail: 'Slide 3 has the numbers and a step-through calculator: 0.02 mm and 120 mm → scale factor 6000 → 178 cm × 6000 = 10.68 km → vs Everest 8.85 km. Press one step at a time; let them do each step on paper first. Slide 4 is the Everest payoff photo; slide 5 the scale strip.' },
    { time: '16–24 min', phase: 'Define + etymology', detail: 'Copy the definition of "cell". Then the reveal — hint first: "what is a prison cell?" They already own the word. Latin cella = a small room. Slide 7 pairs a real prison cell with Hooke\'s own 1665 cork drawing. Then the leaf micrograph (p. 9 Question 1: what are the green circles?).' },
    { time: '24–32 min', phase: 'Organelles', detail: 'Analogy (classroom furniture / body organs). Copy "organelle". Explore the interactive cell — tap each part, the selected one is highlighted and everything else greys out. Draw This: the p. 9 plant-cell diagram, all seven labels. Then the four shared organelles (picture gallery).' },
    { time: '32–40 min', phase: 'Plant extras + compare', detail: 'Two green galleries: what holds a plant up (wall, cellulose, vacuole + real onion cells), then how it feeds itself (chloroplast, chlorophyll + real pondweed). Side-by-side diagrams, then the same two cells as real photographs. Bonus: the ER — not examined, but worth showing.' },
    { time: '40–47 min', phase: 'Microscopy', detail: 'Draw This: the labelled microscope from p. 10. Copy the definition of "microscope"; walk the light path. Then the real electron microscope — ask how it can see something light slides past, and reveal.' },
    { time: '47–50 min', phase: 'Models + recap + HW', detail: 'Mr Seth model-building link and "limitations". Summary checklist — students should leave with 13 definitions and 2 labelled drawings. Set homework (read pp. 8–12; copy + answer the 2 questions on p. 9 in full sentences).' },
  ],
  answers: [
    { q: 'Scale factor (can ÷ cell):', a: '120 mm ÷ 0.02 mm = 6000×' },
    { q: 'Mr Bowen magnified 6000×:', a: '178 cm × 6000 = 10,680 m = 10.68 km (taller than Everest, 8.85 km)' },
    { q: 'Origin of "cell":', a: 'Latin "cella" — a small room / monk’s cell (Robert Hooke, looking at cork)' },
    { q: 'p. 9 Q1 — the little green circles:', a: 'chloroplasts; green because they contain chlorophyll; the plant makes its food inside them using sunlight' },
    { q: 'p. 9 Q2 — wall vs membrane (any four):', a: 'wall is thick / stiff / made of cellulose / plants only / holds shape; membrane is thin / flexible / in every cell / controls what enters and leaves' },
    { q: 'Shared organelles:', a: 'cell membrane, cytoplasm, nucleus, mitochondria' },
    { q: 'Plant-only organelles:', a: 'cell wall (cellulose), chloroplast (chlorophyll), sap vacuole' },
  ],
  notes:
    'The soda-can task is the hook — the question slide comes BEFORE any numbers on purpose. Take wild guesses first; the gap between their guess and 10.68 km is the lesson. Resist giving the scale factor; make pairs derive 6000× from the numbers. ' +
    'Push for full English sentences throughout (starter and homework). Emphasise that plant cells have everything animal cells have, PLUS the extras. ' +
    'Two slides are marked Draw This (the p. 9 cell diagram and the p. 10 microscope) — budget real drawing time for those. ' +
    'Anything students must copy appears in an orange "Write This Down" panel; everything else is discussion. ' +
    'Image sources and licences are recorded in content/y7-science/U01_1/images/CREDITS.json — the lb-* figures are scans from the Learner’s Book and are for classroom use only.',
}
