// content/y7-science/U02_model_states/plan.js
// One-page teacher note, rendered by src/pages/Plan.jsx. This is a model, not a
// full lesson — the plan is how to USE it, not a 50-minute timeline.
export const plan = {
  duration: 'Use it in pieces — 5 to 15 minutes inside 2.2a or 2.2b',
  objective:
    'A single interactive that makes every idea in section 2.2 visible at once: the three states and their particle arrangements; melting and freezing at the melting point; boiling and condensing at the boiling point; evaporation as a slow escape from a liquid that is not boiling; the plateau in temperature while a change of state happens; and the fact that the transition temperatures are a property of the substance — swap water for oxygen, mercury or iron and the whole picture slides along the temperature axis.',
  materials: [
    'Projector / TV — this is a front-of-class demonstration',
    'Best used alongside the 2.2a and 2.2b decks, not instead of them',
    'Optional: students’ notebooks open to their state-change cycle (2.2a) to check the words against the model',
  ],
  vocab: [
    { term: 'Melting / freezing', def: 'shown crossing the melting-point tick — solid ⇄ liquid' },
    { term: 'Evaporation', def: 'the "Evaporating" tag and a few particles leaving the surface of a warm liquid, below the boiling point' },
    { term: 'Boiling / condensing', def: 'shown crossing the boiling-point tick — liquid ⇄ gas, with bubbles throughout' },
    { term: 'Melting point / boiling point', def: 'the two black ticks on the temperature axis; their values change with the substance' },
    { term: 'Water vapour / steam', def: 'the gas name shown for water; the wisps above the beaker' },
  ],
  timeline: [
    { time: 'Set-up', phase: 'What the class is looking at', detail: 'Two views of the SAME substance: the beaker on the left (what you would see) and the particles on the right (why it happens). The bar along the bottom is the temperature — drag the round marker, or press Heat / Cool. The black ticks are the melting point and boiling point; the dashed line is room temperature (20°C).' },
    { time: 'Move 1', phase: 'Start at room temperature', detail: 'Water opens at 20°C — a liquid. Ask what state each other substance is at room temperature BEFORE you switch: oxygen (gas), mercury (liquid), iron (solid). Then switch and check against the axis. The point: "solid / liquid / gas" is not what a thing IS, it is what it is doing at this temperature.' },
    { time: 'Move 2', phase: 'Heat the ice, slowly', detail: 'Press Heat. Watch the marker crawl — then almost STOP at 0°C while the lattice breaks and the particles start to flow (melting). It speeds up, then stops again at 100°C while the whole liquid turns to gas (boiling). Those two pauses are the plateau from the 2.2b heating graph — the temperature holds while the change of state happens.' },
    { time: 'Move 3', phase: 'Find evaporation', detail: 'Drag the marker to somewhere in the middle of the liquid zone — say 60°C for water — and hold. It is NOT boiling, but the "Evaporating" tag appears and a few particles keep escaping from the surface. Drag warmer (still below 100) and more escape. This is the evaporation-vs-boiling difference from 2.2a, now moving.' },
    { time: 'Move 4', phase: 'Cool it back down', detail: 'Press Cool from the gas. Name the changes as they reverse: condensing at the boiling point, then freezing at the melting point. Same ticks, opposite direction — the model labels them freezing and condensing when you cool.' },
    { time: 'Move 5', phase: 'Change the substance', detail: 'Switch to oxygen: its whole solid/liquid zone is far below room temperature, so at 20°C it is already a gas — you have to COOL it hard to see a liquid. Switch to iron: room temperature sits at the far left, and you must heat past 1538°C to melt it. Same model, transition temperatures are a property of the substance.' },
  ],
  answers: [
    { q: 'State of each substance at room temperature (20°C)', a: 'Water — liquid. Mercury — liquid. Oxygen — gas (it boils at −183°C, far below the room). Iron — solid (it melts at 1538°C). Read it straight off where the 20°C dashed line falls on the axis.' },
    { q: 'Melting and boiling points shown', a: 'Water 0 / 100°C. Mercury −39 / 357°C. Oxygen −218 / −183°C (a very narrow liquid range). Iron 1538 / 2862°C.' },
    { q: 'Why does the marker slow down at 0°C and 100°C?', a: 'While a substance changes state, added heat goes into breaking the particles apart, not into raising the temperature — so the temperature holds. This is the flat part of the 2.2b heating graph, shown as the marker almost stopping.' },
    { q: 'Evaporation vs boiling, from the model', a: 'Evaporation: liquid zone, below the boiling point, only a few particles leaving the SURFACE, faster as it warms. Boiling: at the boiling point, particles escaping from ALL THROUGH the liquid at once, with bubbles.' },
    { q: 'Why is oxygen a gas in our room but iron a solid?', a: 'Room temperature (20°C) is above oxygen’s boiling point (−183°C) but far below iron’s melting point (1538°C). The state at any temperature is decided by where that temperature falls relative to the substance’s own melting and boiling points.' },
  ],
  notes:
    'WHAT THIS IS. A front-of-class model, not a lesson — drop it into 2.2a when you want the particle picture to move, and into 2.2b when you want the boiling plateau to be more than a line on a graph. It deliberately shows the two things a still picture cannot: the MOVEMENT between states, and that the transition temperatures belong to the substance. ' +
    'THE TWO VIEWS ARE THE SAME SUBSTANCE. Keep saying it. Left is what your eyes see (ice, water, steam); right is the particles doing it. A child who has drawn the three particle arrangements (2.1b / 2.2a starter) is watching those drawings come alive and turn into each other. ' +
    'DRIVE IT WITH QUESTIONS. Before every move, ask the class to predict — what state, which way will the marker go, will it speed up or slow down. The model is only worth the screen time if they commit to an answer first; otherwise it is a lava lamp. ' +
    'EVAPORATION IS THE ONE TO LABOUR. It is the idea students most often collapse into "boiling". Park the marker in the middle of the liquid zone, well below boiling, and let them watch single particles leave the surface for a while. Then nudge it warmer and count that more leave. No bubbles, any temperature, surface only — the exact contrast from 2.2a. ' +
    'HONESTY ABOUT THE MODEL. It is a teaching cartoon, not a measurement: particle counts, speeds and the width of the transition are chosen to read clearly on a projector, not to scale. The melting and boiling points ARE the real values. Mercury vapour and, especially, hot mercury are genuinely toxic — the model lets you "boil" mercury precisely because you would never do it in a room. ' +
    'It is bilingual (the EN/VN toggle drives the model’s own labels) and it has no sound. No Learner’s Book figures are used; everything is drawn in code.',
}
