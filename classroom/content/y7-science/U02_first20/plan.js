// content/y7-science/U02_first20/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can give the name, symbol, atomic number and state (at room temperature) of the first 20 elements, ' +
    'and say where each one is found and one reason we care about it.',
  materials: [
    'Projector / TV for the lesson deck',
    'Student science notebooks (a ruler for the table)',
    'Learner’s Book page 54 (the table of the first 20) for reference',
    'Mini whiteboards or scrap paper for Symbol Snap',
  ],
  vocab: [
    { term: 'Atomic number', def: 'the number of an element in the Periodic Table; every element has its own (hydrogen 1, calcium 20)' },
    { term: 'State', def: 'solid, liquid or gas, at room temperature' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Slide 1: one minute, write every element you can name. Count who has the most. Many will have gold, iron and oxygen; only some of theirs are in the first 20.' },
    { time: '4–8 min', phase: 'Atomic number', detail: 'Slide 2: what does the number mean? Take guesses, no answer. Slide 3: copy ATOMIC NUMBER and STATE; rule the 4-column table with 20 rows (Number · Symbol · Name · State).' },
    { time: '8–10 min', phase: 'The map', detail: 'Slide 4: tap a few elements; point out the order runs left to right, row by row, like reading English.' },
    { time: '10–40 min', phase: 'The 20 elements', detail: 'Slides 5–26 (20 elements + two checks). About 75 seconds each: the class says the name aloud twice, copies the row from the orange note, then you read the three lines. Check after 10 (slide 15) and after 18 (slide 24). Speed up through the period 3 metals if behind.' },
    { time: '40–43 min', phase: 'Pattern', detail: 'Slide 27: how many liquids? (none) Count the gases (8). Point out the gases cluster top-right of the table.' },
    { time: '43–48 min', phase: 'Symbol Snap', detail: 'Slide 28: names to symbols, then switch to Show symbols for the last few cards.' },
    { time: '48–50 min', phase: 'Checklist and exit', detail: 'Slide 29: 2 key words + a 20-row table. Slide 30: exit question.' },
  ],
  answers: [
    { q: 'Slide 2 — what does the number mean?', a: 'Its place in the Periodic Table: its atomic number. (Strictly, the number of protons in each atom. That is Stage 8/9; do not raise it unless asked.)' },
    { q: 'Check after 10', a: '6 carbon C; 8 oxygen O; 2 helium He.' },
    { q: 'Check after 18', a: 'Sand: silicon Si. Swimming pools: chlorine Cl. Cans: aluminium Al.' },
    { q: 'Solid, liquid or gas?', a: 'No liquids. 8 gases: H, He, N, O, F, Ne, Cl, Ar. The other 12 are solids. (Bromine and mercury are the only liquid elements, and neither is in the first 20.)' },
    { q: 'Exit question', a: '11 sodium Na; 17 chlorine Cl; 20 calcium Ca.' },
  ],
  notes:
    'Each element slide’s orange note is one row of the notebook table, so the table fills as the deck goes; nothing else on those slides is copied. ' +
    'Fact checks for questions: air is about 78% nitrogen, 21% oxygen, 1% argon. Oxygen is the most common element in the Earth’s crust and in the human body (by mass); aluminium is the most common metal in the crust. ' +
    'Fluorine and chlorine photos show the gases in sealed glass; both are poisonous. Potassium and sodium are stored under oil because they react with water and air. ' +
    'Beryllium dust is toxic; if a student asks, it is safe as solid metal. ' +
    'Calcium: students will say "it is not a metal, it is in milk". It is a metal; milk contains calcium compounds, not the metal. Same for sodium in salt and chlorine in salt.',
}
