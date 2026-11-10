// content/y7-science/U00_2/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '~80 minutes total — a ~15 minute briefing, 3 × 20 minute rotations (60 minutes), and a 5 minute debrief. Fits a double period; split the briefing into its own short session if you only have a single period.',
  objective:
    'Students predict a measurement before taking it, then take repeated measurements at three stations (a room perimeter, a folded paper stack, and timed ramp trials), and notice that repeating a measurement — and averaging it — changes how much they can trust the result.',
  materials: [
    'Projector / TV for the lesson deck — the rotation-timer widget is the whole lesson clock',
    'A long tape measure or metre stick, shared between whichever group is at Station 1',
    'A3 paper — at least one full sheet per group, ideally two or three, since folding destroys the sheet',
    'The ramp built by the Teens class, with a 1 metre track marked on it',
    'One plastic ball and one wooden ball, sized to roll down the ramp',
    'A stopwatch or phone timer for Station 3 (not the projector timer — that one is busy running the rotation)',
    'Notebooks or paper for every student to record predictions and data',
    'A calculator per group (or a phone) — for the Station 1 extension, checking hand-done decimal addition',
  ],
  vocab: [
    { term: 'Accuracy', def: 'how close a measurement is to the true value — not covered as a slide definition in this lab, but useful for you to draw on verbally during the debrief' },
    { term: 'Precision', def: 'how close repeated measurements are to each other, whether or not they are close to the true value' },
  ],
  timeline: [
    { time: '0–3 min', phase: 'Hero + how today works', detail: 'Slides 1–2. State the shape once, clearly: 3 groups, 3 stations, 20 minutes each, first 2 minutes of every station is prediction only.' },
    { time: '3–8 min', phase: 'Make the groups', detail: 'Slide 3. Type the roster into the widget live — it is faster than it looks, and the class enjoys watching the shuffle. The groups save automatically for the rotation slide.' },
    { time: '8–14 min', phase: 'Brief all three stations', detail: 'Slides 4–6, about 2 minutes each. Read the prediction question at each station out loud and pause — do not let anyone start guessing numbers yet, that happens physically at the station. State the "then measure / then fold / then race" instruction clearly since it is the only place the full method is written down.' },
    { time: '14–74 min', phase: 'The three rotations', detail: 'Slide 7. Send groups to their Round 1 stations, then press Start. Each station card stages itself with the clock: PREDICT for the first 2 minutes (question only, no task shown), MEASURE for the next 13 (task instructions appear), then EXTEND for the last 5 (a bonus challenge appears, for whichever groups finish early — see Answers below for what each one asks). Press Next Rotation when the timer hits zero.' },
    { time: '74–80 min', phase: 'Debrief', detail: 'Slide 8. Ask whether predictions matched the data, and specifically whether all 10 ramp times for one ball were identical. Someone will say no — that is precision, and it is the whole point of running 10 trials instead of 1.' },
  ],
  answers: [
    { q: 'Station 1 — the perimeter', a: 'Depends on the room; measure it yourself beforehand so you can settle disagreements between groups. Two groups measuring the same wall and disagreeing by a centimetre or two is normal and is itself worth pointing out at the debrief.' },
    { q: 'Station 1 extension — decimal addition by hand, checked by calculator', a: 'There is no fixed answer; the point is the method. If a group\'s hand total and calculator total disagree, the usual cause is a decimal-point misalignment when stacking the wall lengths to add them — worth checking for directly if a group is stuck.' },
    { q: 'Station 2 — how many folds', a: 'Most groups manage 6–8 folds by hand before the stack is too thick and small to fold again — famously fewer than people predict, because the thickness doubles every time (2, 4, 8, 16 layers…) while the foldable area shrinks just as fast.' },
    { q: 'Station 2 extension — folds until as tall as Mr Bowen (180 cm)', a: 'Typical paper is about 0.1 mm thick, doubling with every fold: 2^n × 0.1 mm. At 14 folds that is only ≈ 164 cm; at 15 folds ≈ 328 cm — so 15 folds is the mathematical answer, crossing 180 cm between the two. The point of the question is the gap between that answer and Station 2\'s real result: no group gets anywhere near 15 real folds, because the paper runs out of foldable area long before the arithmetic runs out of doublings.' },
    { q: 'Station 3 — which ball wins', a: 'Depends on the two actual balls, and that is fine to leave open. If both are solid and roll without slipping, mass alone does not decide the winner — how the mass is distributed does: a ball with more mass toward its surface (a higher moment of inertia relative to its mass) accelerates more slowly than one with mass concentrated near the centre. Do not pre-announce a winner; let the 10-trial average settle it.' },
    { q: 'Station 3 extension — the average and the gap', a: 'Average each ball\'s 10 times, then subtract. This is the number their prediction ("by how much") was actually guessing at — worth pointing back to their Station 3 prediction slide when they get here.' },
  ],
  notes:
    'THE PROJECTOR NEVER LEAVES SLIDE 7 once the rotations start. Everything the class needs while rotating — which group is where, the countdown, PREDICT vs MEASURE — is on that one widget, because the room only has one shared screen and groups are scattered across three stations. ' +
    'THE PREDICTION IS THE POINT, not a warm-up to rush through. If a group starts measuring in the first 2 minutes, send them back — the gap between the guess and the data is what the whole lab is teaching, same as any other "ask before you tell" slide in this course, just spread across a room instead of a single question. ' +
    'GROUPS ARE SAVED IN THE BROWSER, not in React state — Deck.jsx remounts each slide\'s widget on navigation, so the roster widget and the rotation widget talk to each other through localStorage. This also means the timer survives you flipping back to a station slide mid-round to remind a group of the task, and survives a reload. Press Reset Lab on the rotation slide before running this with a different class. ' +
    'IF A CLASS IS ODD-SIZED, groups will not be perfectly equal — the shuffle deals names round-robin into 3 groups, so at most they differ by one student. That is deliberate; do not manually rebalance. ' +
    'THE EXTENSION QUESTIONS ARE FOR EARLY FINISHERS, not everyone — they appear on the widget automatically in each round\'s last 5 minutes and are never previewed on the station-briefing slides, so do not read them out in the briefing. A group still measuring at minute 15 should just keep measuring; do not stop them to point at the extension. ' +
    'THE RAMP EXTENSION (average the 10 times, then subtract) is this deck\'s own addition, completing the "by how much" half of that station\'s prediction question — the other two extensions came from you directly.',
}
