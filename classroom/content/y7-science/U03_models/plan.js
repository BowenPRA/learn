// content/y7-science/U03_models/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes, one period, after 3.2 and before 3.3 — 20 slides. If time is short, finish slides 16–18 at the start of the next science lesson.',
  objective:
    'Students can give the two kinds of model (one that represents, one that uses maths) and a limitation of each; compare sizes in the Solar System with a scale model; ' +
    'and describe how the Solar System formed from a spinning nebula, and why the planets near the Sun are rocky and those far away are giants.',
  materials: [
    'Projector / TV — slides 8 and 13 are full models; they run offline, nothing is downloaded',
    'Optional, slide 14: a lump of play dough or soft bread dough to spin flat on a plate',
    'Student science notebooks; mini whiteboards for the votes and slide 11',
  ],
  vocab: [
    { term: 'Model · le modèle', def: '(1) a way of showing something that is hard to observe directly — 3.2’s definition; (2) using maths to work out something we could never see' },
    { term: 'Limitation · la limite', def: 'something a model cannot do, gets wrong or leaves out; Cambridge asks for these' },
    { term: 'To scale · à l’échelle', def: 'every size and distance shrunk by the SAME amount (the football Sun: about 6.3 billion times)' },
    { term: 'Solar System · le système solaire', def: 'the Sun and everything that orbits it: 8 planets, their moons, dwarf planets, asteroids, comets' },
    { term: 'Orbit, spin, axis, plane · orbite, tourner, axe, plan', def: 'reviewed from 3.2, not copied again' },
    { term: 'Nebula · la nébuleuse', def: 'a cloud of dust and gas in space (3.2)' },
    { term: 'Frost line · la ligne des glaces', def: 'the distance from the young Sun beyond which ice survives (between Mars and Jupiter) — spoken only' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Slide 1: the Sun is a football — how big is the Earth? Everyone writes a guess. Take three and write them on the board.' },
    { time: '5–17 min', phase: 'Size, then the scale model', detail: 'Slide 2: vote, left hand tennis ball, right hand pinhead. Slide 3: B; then press once per object, and the class guesses the DISTANCE before you press. Slide 4: click Jupiter and Earth; Add the Sun; Line up the Earths (count along).' },
    { time: '17–22 min', phase: 'Two kinds of model (3.2)', detail: 'Slide 5: review, not copied. Point at the two panels: the football Sun REPRESENTS; dividing by 6.3 billion is MATHS that worked out what nobody can see.' },
    { time: '22–26 min', phase: 'The Solar System', detail: 'Slide 6: say the four words from 3.2 together; copy SOLAR SYSTEM. Read the 3.3 box aloud and leave the question open — do not answer it.' },
    { time: '26–38 min', phase: 'Review vote, the working model', detail: 'Slide 7: ball or plate, a quick 3.2 review vote. Slide 8: see “Model moves” in the notes — today’s date, a planet card, SIDE view (settles the vote), To scale, Fly to Earth.' },
    { time: '38–44 min', phase: 'Limitations', detail: 'Slide 9: pairs find three things a globe gets wrong (2 min), then show the answers. Slide 10: copy LIMITATION; read the exam tip. Slide 11: one thing right and one limitation of the slide 8 model, on whiteboards.' },
    { time: '44–50 min', phase: 'How it formed', detail: 'Slide 12: the 3.2 review question. Slide 13: Next step, one at a time; on step 3 turn it to Side. Slides 14–18: spin and flatten; Draw This and copy the four steps; rocky or giant; HL Tauri as evidence; two limitations.' },
    { time: '50 min', phase: 'Close', detail: 'Slide 19: checklist and notebook count. Slide 20: exit question on whiteboards — one spinning disc.' },
  ],
  answers: [
    { q: 'Slides 1–3 — the football Sun', a: 'B, a pinhead. With the Sun a 22 cm football (everything ÷ about 6.3 billion): Earth 2 mm (a pinhead) 24 m away; Moon 0.5 mm, 6 cm from the Earth; Jupiter 2.3 cm (a grape) 123 m away; Neptune 8 mm (a pea) 711 m away; the nearest star, Proxima Centauri, a 3.4 cm “walnut” 6 400 km away — about the distance to the centre of the Earth.' },
    { q: 'Slide 4 — sizes', a: 'Jupiter 142 984 km = 11.2 Earths across, about 1 300 Earths inside. Saturn 9.4 across, about 760 inside. The Sun 1 391 400 km = 109 Earths across, about 1.3 million inside. Mercury is 0.38 of the Earth’s width.' },
    { q: 'Slide 6 — the 3.3 question (do not answer yet)', a: 'For you: the Sun’s gravity pulls each planet towards it while the planet moves along at high speed, so it keeps falling round the Sun instead of into it; space is a vacuum, so nothing slows it down. That is 3.3.' },
    { q: 'Slide 7 — review vote', a: 'B, a plate. Slide 8’s Side view shows it: every orbit within a few degrees of the Earth’s (Mercury 7.0°, Venus 3.4°, Mars 1.8°, Jupiter 1.3°, Saturn 2.5°, Uranus 0.8°, Neptune 1.8°). Pluto, a dwarf planet, is tilted 17°.' },
    { q: 'Slide 8 — numbers on the cards', a: 'Speeds (average): Mercury 47 km/s (39 to 59), Venus 35, Earth 30 (about 107 000 km/h), Mars 24, Jupiter 13, Saturn 9.7, Uranus 6.8, Neptune 5.4. Sunlight takes about 3 min to Mercury, 8 min 19 s to Earth, 43 min to Jupiter, 4 h 10 min to Neptune. Moons (known in 2026): Earth 1, Mars 2, Jupiter 115, Saturn 293, Uranus 29, Neptune 16. Mr Bowen (80 kg) weighs 800 N on Earth, 2 000 N on Jupiter — the 3.1 numbers.' },
    { q: 'Slide 9 — a globe’s limitations', a: 'About 40 million times smaller (a 30 cm globe); does not spin or orbit by itself; no clouds, weather, day and night; mountains flat; country colours that are not on the real Earth; held on a stick. Any three.' },
    { q: 'Slide 11 — our model', a: 'Right: real positions for the date shown, real orbit shapes and speeds, real distances (unless Squashed), the flat plane. Limitations: planets drawn far too big unless To scale is chosen; time millions of times too fast; most moons missing; planets do not spin; positions only accurate from 1800 to 2050.' },
    { q: 'Slide 16 — why rocky near, giants far', a: 'Near the young Sun it was too hot for ice, so only rock and metal could clump: small rocky planets. Beyond the frost line ice survived too, so cores grew big enough (about 10 Earths) to pull in hydrogen and helium gas: giants.' },
    { q: 'Slide 18 — formation model limitations', a: 'Squashed distances; 100 million years in about a minute; 5 300 particles not trillions; grains are eased to places chosen in advance, not moved by calculated gravity; planet sizes not to scale; collisions shown as flashes, not real impacts.' },
    { q: 'Slide 20 — exit', a: 'They all formed from one spinning disc of gas and dust, so they all kept its spin: the same direction, in almost one flat plane (3.2).' },
  ],
  notes:
    'NOTEBOOK COUNT (slide 19): 3 written panels — Solar System (6), limitation (10), the four steps (15) — and 1 drawing: the four steps (15). The two kinds of model (5), orbit/spin/axis/plane (6) and the plane (7) are reviews of 3.2 and are not copied again.\n\n' +
    'WHERE IT SITS. After 3.2 Formation of the Solar System, before 3.3 Movement in Space. The review slides (5, 7, 12, 17) say “3.2”. Slide 6 leaves 3.3’s question open on purpose: why don’t the planets fall into the Sun, and why do they keep going round?\n\n' +
    'LANGUAGES: English and French; no Vietnamese. Every model’s buttons and labels follow the EN / FR switch. Diagrams are in English, as always.\n\n' +
    'MODEL MOVES, SLIDE 8 (the Solar System). It opens on today’s date at 1 week per second. (1) Point at the date: these are the real positions today. (2) Ask who is fastest; let them watch Mercury lap Mars. (3) Click Earth: today’s distance and speed (they change — the orbit is an ellipse). (4) Look from: Side — this settles the slide 7 vote; Layers → Pluto shows the one tilted orbit. (5) Zoom: All planets; Distances: Squashed only if they cannot see the outer planets, and say it is not to scale. (6) Planet sizes: To scale — the planets vanish; the dashed rings show where they are. (7) Fly to Earth: the Earth and the Moon, real sizes and real distance (30 Earths apart). Drag to turn, scroll to zoom, Space plays and pauses; the calendar button jumps to any date (try a student’s birthday). Accurate from 1800 to 2050 (JPL’s orbital elements).\n\n' +
    'MODEL MOVES, SLIDE 13 (formation). Next step plays one step and holds. Before each, ask what will happen next. Step 3 is the payoff: turn it to Side to show the flat disc — the 3.2 hypothesis, moving. The frost line appears in step 4; the planets get their names in step 7. It is a teaching model: grains are eased to places chosen in advance, not moved by calculated gravity — slide 18 asks the class to say so.\n\n' +
    'TIME, NOW ITS OWN DECKS. This deck used to carry a Part 2 on time. It is now Coffee, Carbon and Stars (half-life, carbon dating, the model Sun; one period) and How Old Is the Earth? (longer clocks, meteorites, Patterson).\n\n' +
    'NOT IN THE BOOK. A modelling deck built around Unit 3. The frost line is spoken only.\n\n' +
    'PHOTOS. Everything is drawn, so the deck needs no internet. An openly licensed photo that would fit: the ALMA image of HL Tauri (ESO/ALMA, CC BY 4.0) for slide 17 (3.2 already uses it).',
}
