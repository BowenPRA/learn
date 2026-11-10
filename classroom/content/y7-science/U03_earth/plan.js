// content/y7-science/U03_earth/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: 'About 40 minutes — 13 slides, the lesson after Coffee, Carbon and Stars. Ten minutes are left for the Learner’s Book or a review; the Earth’s-year model (slide 11) can stretch to fill them.',
  objective:
    'Students can say why a clock for billions of years needs a long half-life; date a fossil from the volcanic ash around it; explain how zircon crystals and meteorites give the age of the Earth, and why the oldest rock is not enough; ' +
    'and explain why scientists trust the Sun’s age: meteorites, a model Sun and the Sun’s vibrations agree.',
  materials: [
    'Projector / TV — slide 11 is a full model; it runs offline, nothing is downloaded',
    'Student science notebooks; mini whiteboards for slides 1, 7 and 13',
  ],
  vocab: [
    { term: 'Half-life · la demi-vie', def: 'review from Coffee, Carbon and Stars' },
    { term: 'Radioactive dating · la datation radioactive', def: 'carbon dating’s idea with longer clocks: potassium-40 (1.25 billion years), uranium-238 (4.5 billion years)' },
    { term: 'Volcanic ash · la cendre volcanique', def: 'a layer that can be dated, above and below a fossil' },
    { term: 'Zircon · le zircon', def: 'a tiny, very tough crystal that takes in uranium but no lead when it forms' },
    { term: 'Meteorite · la météorite', def: 'a rock from space that lands on Earth; the oldest are leftovers from when the planets formed' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Slide 1: whiteboards — what would a 4-billion-year clock need? Recall last lesson: carbon-14 runs out after about 50 000 years. Reveal.' },
    { time: '5–12 min', phase: 'Longer clocks', detail: 'Slide 2: three clocks, three jobs. Slide 3: back to the dinosaur from last lesson’s vote — ask how old it is before the reveal.' },
    { time: '12–28 min', phase: 'The age of the Earth', detail: 'Slide 4: why not the oldest rock? Slide 5: zircon — the clock starts at zero. Slide 6: meteorites as leftovers (step 7 of the formation model in Models: Space). Slide 7: half gone = one half-life. Slide 8: Patterson, read as a story. Slide 9: copy THE AGE OF THE EARTH.' },
    { time: '28–32 min', phase: 'The age of the Sun', detail: 'Slide 10: three methods — the model Sun is the one they matched last lesson. Copy the write panel.' },
    { time: '32–40 min', phase: 'One year, and close', detail: 'Slide 11: Next event; the class guesses each date first. Slide 12: checklist and notebook count. Slide 13: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slide 1 — a 4-billion-year clock', a: 'A much longer half-life: uranium-238 (4.5 billion years) or potassium-40 (1.25 billion years).' },
    { q: 'Slide 3 — the dinosaur between the ash', a: 'Between 66 and 68 million years old: younger than the ash below it, older than the ash above it.' },
    { q: 'Slide 4 — oldest rock', a: 'Plate tectonics, volcanoes and erosion recycle the surface. Oldest rocks: Acasta Gneiss, Canada, about 4.03 billion years. Oldest crystal: a zircon from the Jack Hills, Western Australia, 4.4 billion years (4.404).' },
    { q: 'Slide 7 — meteorites', a: 'About one half-life, about 4.5 billion years. Exactly: 4 567 million years for the oldest grains (CAIs); 49% of their uranium-238 is left.' },
    { q: 'Slide 8 — Patterson', a: 'Result in 1953, published 1956: 4.55 ± 0.07 billion years, from meteorite lead (including the Canyon Diablo meteorite). US leaded petrol for cars banned from 1996; the last country (Algeria) used up its stocks in July 2021.' },
    { q: 'Slide 10 — three methods', a: 'Meteorites 4.567 billion years; standard solar models 4.57–4.6; helioseismology (the Sun’s vibrations) 4.57 ± 0.11 (Bonanno et al. 2002).' },
    { q: 'Slide 11 — one year (Earth age 4.54 billion years = 365 days)', a: 'Moon 4 January; oldest crystal 12 January; oldest rocks 11 February; first life (3.5 billion years) 25 March; oxygen in the air 22 June; first animals 15 November; first land plants 24 November; first dinosaurs 13 December; dinosaurs die out 26 December; first humans 31 December 11:25 p.m.; Ötzi 11:59:23 p.m.; the Great Pyramid 11:59:28 p.m.; an 80-year life: the last 0.6 seconds.' },
    { q: 'Slide 13 — exit', a: 'The Earth is about 4.5 billion years old; after about 50 000 years too little carbon-14 is left to measure. A clock with a much longer half-life is needed: uranium-238.' },
  ],
  notes:
    'NOTEBOOK COUNT (slide 12): 2 written panels — the age of the Earth (9) and three methods, one answer (10). No drawings.\n\n' +
    'WHERE IT SITS. The second half of the old Models: Space and Time Part 2, split off when Coffee, Carbon and Stars became a one-period deck. It picks up where that deck ended: carbon dating’s limit (slide 19 there) and the model Sun (slide 21 there). Slide 6 points back to the formation model in Models: Space.\n\n' +
    'LANGUAGES: English and French; no Vietnamese. The Earth’s-year model follows the EN / FR switch. Diagrams are in English, as always.\n\n' +
    'NOT IN THE BOOK. Radioactive dating goes beyond Stage 7. Keep the maths to halving: no formulas, no logarithms.\n\n' +
    'PHOTOS. Everything is drawn, so the deck needs no internet. Openly licensed photos that would fit: a cut slice of the Allende meteorite for slide 6; a Jack Hills zircon for slide 5.',
}
