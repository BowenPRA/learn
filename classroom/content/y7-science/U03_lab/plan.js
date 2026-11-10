// content/y7-science/U03_lab/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes — the lesson before the falling lab',
  objective:
    'Students can explain that a falling object accelerates, and why a heavy and a light object fall together; ' +
    'plan a fair test of "do heavy things fall faster?"; measure their reaction time with a falling ruler; ' +
    'and explain why a stopwatch is too slow to time a short fall.',
  materials: [
    'Projector / TV for the lesson deck',
    'Per pair: a 30 cm ruler (slide 10)',
    'Mini whiteboards or scrap paper for the plan (slide 7)',
    'Student science notebooks',
  ],
  vocab: [
    { term: 'Accelerate · accélérer', def: 'to speed up; a force makes an object accelerate' },
    { term: 'Reaction time · le temps de réaction', def: 'the time between seeing something and moving; about 0.2 s' },
    { term: 'Fair test · un test juste', def: 'change one thing only; keep everything else the same' },
    { term: 'Accurate · précis', def: 'close to the true value' },
  ],
  timeline: [
    { time: '0–3 min', phase: 'Starter', detail: 'Slide 1: do heavy things fall faster? Hands up for "yes" — keep the count for the lab.' },
    { time: '3–15 min', phase: 'Speeding up', detail: 'Slide 2: same speed all the way? Slide 3: the multi-flash photo; copy ACCELERATE. Slide 4: 36 km/h faster every second. Slide 5: why heavy and light land together.' },
    { time: '15–20 min', phase: 'Drop Race', detail: 'Slide 6: predict how much longer the Moon takes, then Drop. Slow motion shows the dots spreading out.' },
    { time: '20–28 min', phase: 'Design the lab', detail: 'Slide 7: pairs answer the four questions (3 min). Collect ideas on the board and keep them for the lab.' },
    { time: '28–40 min', phase: 'Ruler catch', detail: 'Slide 8: ask, take two answers. Slide 9: press Drop (a blink), then Slow motion — point at the dots: the ruler gets further each 0.05 s, so where you catch it IS a time. Drop again for a different catch. Slide 10: pairs catch for real, three tries each, and find their time in the table.' },
    { time: '40–47 min', phase: 'The problem', detail: 'Slide 11: why a stopwatch fails. Take ideas, then reveal Mr Bowen’s.' },
    { time: '47–50 min', phase: 'Exit', detail: 'Slide 12: 20 cm → 0.20 s.' },
  ],
  answers: [
    { q: 'Slide 4 — numbers', a: 'Ignoring air: each second a falling object gains 10 m/s = 36 km/h. After 1 s it has fallen 5 m, after 2 s 20 m, after 3 s 45 m (about 15 floors) at 108 km/h.' },
    { q: 'Slide 6 — Drop Race', a: 'From 5 m: Earth 1.0 s (lands at 36 km/h), Moon 2.5 s (14 km/h). Heavy and light land together in each lane.' },
    { q: 'Slide 9 — Ruler Catch', a: 'Dots at 0.05 s (1.25 cm), 0.10 s (5 cm), 0.15 s (11.25 cm), 0.20 s (20 cm): the gaps grow because the ruler accelerates. Each Drop picks a catch between 10 and 24 cm.' },
    { q: 'Slide 10 — ruler catch', a: 'Caught at 5 cm = 0.10 s, 10 cm = 0.14 s, 15 cm = 0.17 s, 20 cm = 0.20 s, 25 cm = 0.22 s, 30 cm = 0.24 s (time = √(2 × distance ÷ 10)). Most students land between 15 and 25 cm.' },
    { q: 'Slide 11 — fall times', a: '1 m: 0.45 s. 2 m: 0.63 s. 5 m (a second-floor window): 1.0 s. 8 m (third floor): 1.3 s. A stopwatch with a 0.2 s reaction time at both ends is hopeless for the short drops.' },
    { q: 'Exit', a: '0.20 s.' },
  ],
  notes:
    'These slides are the end of 3.1 (its slides 36–43) as their own lesson, with the Ruler Catch animation added. 3.1 is unchanged.\n\n' +
    'THE LAB THAT FOLLOWS — "Do heavy things fall faster?" Build it from the class’s answers to slide 7. A plan that works:\n' +
    '• Objects: pairs the same size but different mass — two identical water bottles (one full, one a quarter full, caps taped); a tennis ball and a ball of plasticine the same size; then a golf ball and a ping-pong ball, where the light one DOES lag (air resistance). Nothing glass, metal or sharp.\n' +
    '• Letting go together: lay both objects on a clipboard held flat and pull it away sideways.\n' +
    '• Telling which lands first: (1) listen — put a metal tray or baking sheet on the floor so each landing rings; (2) film side-on in slow motion (at 240 fps one frame is about 0.004 s) with a metre stick behind, and count frames; (3) stopwatches — let them try with five timers and take the mean, so they find out for themselves why it fails.\n' +
    '• Height: desk or chair height (1–2 m) in the classroom; a second-floor balcony or stairwell (about 5 m, 1.0 s) only with an adult releasing, the landing zone coned off, a spotter at the bottom calling "clear", and soft or unbreakable objects only.\n' +
    '• Fair test: same height, same release, three repeats, results table with units in the headings. Their ruler-catch times show why a stopwatch is not accurate enough.',
}
