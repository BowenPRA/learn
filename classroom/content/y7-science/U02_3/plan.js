// content/y7-science/U02_3/plan.js
// Teacher plan for 2.3 Explaining changes of state.

export const plan = {
  duration: '50 min',
  objective:
    'Explain why each change of state happens using particle theory: heat energy ' +
    'is transferred to/from particles, changing how much they move, and either ' +
    'overcoming or being overcome by the attractive forces between them.',
  materials: [
    'Projector + deck',
    "Learner's Book (pages 41–43)",
    'Notebooks + rulers (for diagram)',
  ],
  vocab: [
    { term: 'heat energy', defn: 'the energy that makes particles move' },
    { term: 'transferred', defn: 'moved from one place to another' },
    { term: 'attractive force', defn: 'the force that holds particles together' },
    { term: 'expand', defn: 'get bigger' },
  ],
  timeline: [
    { t: '0–5', activity: 'Starter: write the five changes of state from memory (slide 1). Hands up to check.' },
    { t: '5–7', activity: 'Bridge: you know WHAT happens, today we explain WHY (slide 2).' },
    { t: '7–12', activity: 'Key words: four terms on slide 3. Students copy the write note.' },
    { t: '12–15', activity: 'Expansion: discuss the bridge photo (slide 4). Why do engineers leave gaps?' },
    { t: '15–25', activity: 'Draw This: students copy the heating-to-melting diagram with rulers (slide 5). Walk through the melting explanation (slide 6); students copy the write note.' },
    { t: '25–30', activity: 'Boiling diagram (slide 7) and condensing/freezing (slide 8). Teacher-led, no copy-down.' },
    { t: '30–42', activity: 'Particle Explainer activity (slide 9). Students work individually or in pairs, stepping through each scenario.' },
    { t: '42–47', activity: 'Book questions 1–3 (slide 10). Written answers. Reveal and mark.' },
    { t: '47–50', activity: 'Checklist (slide 11) and exit question about the bridge (slide 12). Collect answers on the way out.' },
  ],
  answers: {
    'Book Q1': 'Heat energy is transferred to the particles. They vibrate more and take up more space, so the solid gets bigger (expands).',
    'Book Q2': 'In solids and liquids the particles are already touching. There is no space between them to squash into, so they cannot be compressed.',
    'Book Q3': 'In liquids the particles can slide past each other. In gases the particles are far apart and move freely. Both can flow because the particles are not locked in a fixed pattern.',
    'Exit Q': 'In summer more heat energy is transferred to the metal. The particles vibrate more and take up more space, so the bridge expands and gets longer.',
  },
  notes:
    'The diagram copy-down takes time; circulate and check that grids look roughly regular. ' +
    'The widget drills all five scenarios so do not over-explain boiling and condensing from the front.',
}
