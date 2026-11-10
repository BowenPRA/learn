// content/y7-science/U03_3/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes, one period (Wednesday 21 October 2026) — 23 slides, timed at 47 minutes with 3 to spare',
  objective:
    'Students can explain that the Sun’s gravity keeps the planets in orbit and always pulls towards the Sun, ' +
    'and that without it a planet would go off in a straight line; draw a bar graph of the planets’ orbit speeds ' +
    'and say that speed decreases as the distance from the Sun increases, because the Sun’s pull is weaker; ' +
    'describe air resistance and a vacuum, and explain why objects moving in space do not slow down.',
  materials: [
    'Projector / TV for the lesson deck (no internet needed: every picture is saved in the deck)',
    'Learner’s Book, Unit 3.3, pages 91–96',
    'For the demo (slides 5–6): a SOFT ball on about 1 m of strong string — a tennis ball knotted into an old sock works well, or a foam ball or rubber bung. See the safety note below.',
    'Rulers and pencils for the bar graph (slide 10); squared paper if you have it, otherwise the notebook',
    'Mini whiteboards (slides 11, 12 and 21)',
    'Their exercise books, closed, for the air-resistance test (slide 14)',
    'Student science notebooks',
  ],
  vocab: [
    { term: 'Orbit · l’orbite (f) / être en orbite', def: 'the path of an object going round another one; also the verb, "the Moon orbits the Earth" (a 3.2 key word)' },
    { term: 'Circular · circulaire', def: 'in the shape of a circle. The planets’ orbits are almost circular' },
    { term: 'Speed · la vitesse', def: 'how fast something moves. Here in km/s, kilometres per second, and km/h, kilometres per hour' },
    { term: 'Air resistance · la résistance de l’air', def: 'a force from the air that slows a moving object down; it acts opposite to the movement and is bigger at higher speed' },
    { term: 'Vacuum · le vide', def: 'a space with no particles. Space is (almost) a vacuum, so there is no air resistance' },
    { term: 'Gravity · la gravité', def: 'from 3.1: the force that pulls objects towards each other. The Sun’s gravity pulls every planet towards the Sun' },
    { term: 'Observation · une observation', def: 'what you see, measure and record (Think like a scientist)' },
    { term: 'Prediction · une prédiction', def: 'what you think will happen' },
    { term: 'Conclusion · une conclusion', def: 'what you decide from the results' },
    { term: 'Contradict · contredire', def: 'to go against (a 3.2 key word). Uranus’s path contradicted the prediction (the extension, below)' },
  ],
  timeline: [
    { time: '0–3 min', phase: 'Starter', detail: 'Slide 1, the book’s Getting Started: the planets in order and the object that orbits the Earth (they met the order in 3.2 yesterday). Slide 2: check against the photos; say the orange words together ("My Very Easy Method…"). The Moon orbits the Earth.' },
    { time: '3–5 min', phase: 'The Sun', detail: 'Slide 3, a recall of 3.2: the biggest mass, gravity 270 N/kg. Never look at the Sun. Question 3 in pairs for 30 seconds, then reveal Jupiter.' },
    { time: '5–10 min', phase: 'Let go of the string', detail: 'Slide 4: why don’t the planets fly away? Take two ideas, no answer. Slide 5: swing the ball; hand = Sun, string = gravity, ball = planet. Slide 6: everyone votes at once (left hand A, right hand B), THEN let go — twice. Slide 7: Play for a few seconds, then Gravity off: each planet goes straight on, like the ball. Do not ask about speeds yet; if someone says "Mercury is fastest", say "good — we will check it with numbers".' },
    { time: '10–17 min', phase: 'Draw This, Questions 1–2', detail: 'Slide 8: draw the Sun, the orbit, one planet, the two arrows and the dashed no-gravity line (about 4 minutes), then copy the panel (2 minutes). Slide 9: Questions 1 and 2 aloud, hands up — 1 minute.' },
    { time: '17–28 min', phase: 'Planet speeds: the bar graph', detail: 'Slide 10: the book’s Activity. Show them the scale first: up the side, 1 cm = 5 km/s, so Mercury’s bar is 9.6 cm; bars 1 cm wide, not touching. Say "km/s, kilometres PER second" (3.1’s per = for every). Ten minutes of drawing; walk round and check the first two bars. Anyone not finished keeps going while you show slide 11.' },
    { time: '28–30 min', phase: 'The pattern', detail: 'Slide 11: they check their bars, then write the missing word of the sentence on whiteboards (decreases) and tell a partner why.' },
    { time: '30–33 min', phase: 'Speed', detail: 'Slide 12: copy SPEED — the panel gives the word and the reason. Whiteboards: 48 km every second, how far in an hour? (48 × 3600 ≈ 170 000 km — the book’s figure.)' },
    { time: '33–34 min', phase: 'Why a bar graph?', detail: 'Slide 13: Activity Questions 2 and 4, aloud, one answer each, then reveal. One minute.' },
    { time: '34–37 min', phase: 'Air resistance', detail: 'Slide 14: everyone waves a CLOSED exercise book, slow then fast, flat side then edge first — then reveal. Remind them of the flat paper in 3.1. Slide 15: the plane’s wing; copy AIR RESISTANCE.' },
    { time: '37–42 min', phase: 'Vacuum: nothing to slow you down', detail: 'Slide 16: is there air resistance in space? (30 seconds.) Slide 17: Juno; copy VACUUM (this is Question 4). Slide 18: Voyager 1, still going since 1977; Question 5 aloud, then reveal. Slide 19: Question 6 with fingers, 1 to 4, all at once.' },
    { time: '42–45 min', phase: 'How Neptune was found', detail: 'Slide 20: tell the story left to right (1 minute). Slide 21: read the three words together, then Questions 1–3 on whiteboards: one word each.' },
    { time: '45–47 min', phase: 'Close', detail: 'Slide 22: checklist; 4 written panels, 1 drawing, 1 bar graph. Slide 23: exit question (the book’s Question 7).' },
    { time: '47–50 min', phase: 'Spare', detail: 'Three minutes in hand. The bar graph is where they go. If the graph is done early: the extension below, or Mr Bowen’s weight on the Sun (80 × 270 = 21 600 N).' },
  ],
  answers: [
    { q: 'Getting Started', a: '1 Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. 2 The Moon.' },
    { q: 'Q3 (slide 3)', a: 'Jupiter. After the Sun it has the most mass in the Solar System (about 318 times the Earth’s), so the strongest gravity: 25 N/kg in 3.1’s table.' },
    { q: 'Slide 6 — the vote', a: 'B. When he lets go, nothing pulls the ball towards the centre any more, so it goes straight on in the direction it was moving at that moment — along the edge of the circle (the tangent), not outwards along the string. A is the common wrong idea that something "throws it outwards".' },
    { q: 'Slide 7 — the widget', a: 'Gravity off: each planet leaves along a straight line from the dot where it let go, the way it was going, at the same speed — nothing slows it down. (The speeds are real: Mercury 48 km/s, Mars 24 km/s; in one Earth year Mercury goes round about 4 times. Use this only after the graph, if at all.)' },
    { q: 'Q1', a: 'Towards the Sun (towards the centre of the orbit).' },
    { q: 'Q2', a: 'The Sun’s gravity.' },
    { q: 'Slide 10 — the scale', a: '1 cm = 5 km/s, so each bar is the speed ÷ 5 in cm: Mercury 9.6, Venus 7.0, Earth 6.0, Mars 4.8, Jupiter 2.6, Saturn 2.0, Uranus 1.4, Neptune 1.0 cm. Eight bars 1 cm wide with 0.5 cm gaps need about 12 cm across.' },
    { q: 'Activity Q1', a: '… decreases. (As the distance from the Sun increases, the speed of orbit of the planets decreases.) The panel on slide 12 confirms it.' },
    { q: 'Activity Q2', a: 'A graph shows the pattern (trend) at a glance and makes the planets easy to compare; in a table you must read every number.' },
    { q: 'Activity Q3', a: 'The Sun’s gravity gets weaker as the distance from the Sun increases. Close to the Sun the pull is strongest, and the planets move fastest.' },
    { q: 'Activity Q4', a: 'The planets are separate categories, not continuous data like time or temperature: there are no in-between values to join with a line.' },
    { q: 'Slide 12 — whiteboards', a: '48 km/s × 3600 s = 172 800 km in an hour, the book’s "170 000 km/h". (The Earth: 30 × 3600 = 108 000 km/h, the book’s "about 100 000".)' },
    { q: 'Slide 14 — feel the air', a: 'A push against the movement of the book (air resistance). Bigger when it moves faster, and bigger flat side first than edge first — the flat side pushes against more air. The same reason the flat paper fell slowly in 3.1.' },
    { q: 'Q4', a: 'Vacuum.' },
    { q: 'Q5', a: 'On Earth there is air. Air resistance acts against the movement, and the faster an object moves the bigger it is: at 64 000 km/h it would be enormous and would slow Voyager 1 down (and heat it up). In space there is a vacuum, so there is nothing to slow it.' },
    { q: 'Q6', a: 'Gravity only. Space is a vacuum, so there is no air resistance; nothing is rubbing on the Earth, so there is no friction.' },
    { q: 'Think like a scientist Q1–3', a: '1 predictions (Bouvard’s calculations said where Uranus would be). 2 observations (what was seen and recorded). 3 a conclusion (what scientists decided from the results). The book offers four words each time; the deck keeps the three that matter.' },
    { q: 'Extension — Think like a scientist Q4', a: 'Not on a slide. For early finishers, from the book (p.96): "Uranus moving further away from the Sun ______ the original prediction about its orbit." CONTRADICTED. "Scientists found Neptune using careful ______." MEASUREMENTS — accept OBSERVATIONS too: the prediction came from measurements of Uranus, and Neptune was then found by looking.' },
    { q: 'Exit (Q7)', a: 'In January. Closer to the Sun, its gravity pulls harder and the Earth moves faster: about 30.3 km/s in early January, 29.3 km/s in early July.' },
  ],
  notes:
    'NOTEBOOK COUNT (slide 22): 4 written panels — circular and the Sun’s pull (slide 8), speed (12), air resistance (15), vacuum (17) — plus 1 drawing (the orbit, slide 8) and 1 bar graph (slide 10). Fewer copied panels than 3.1, on purpose.\n\n' +
    'SAFETY FOR THE DEMO (slides 5–6). Soft ball only, on strong string with the knot checked. Stand at the front with at least 3 metres of clear space in the direction the ball will fly, and nobody within 2 metres of you. Swing it in a flat circle above head height, slowly — two turns a second is plenty. Let go when the ball is moving towards an empty wall or a pile of bags, never towards students, windows or the projector. Practise once before the class arrives. Let go twice, from different points, so they see it always goes straight on. If the room is too small, or you have marbles and paper plates: each pair rolls a marble round inside a paper plate with a quarter of the rim cut away — it leaves the gap in a straight line. That takes 2 minutes more; take them from the spare 3.\n\n' +
    'THE WIDGET (slide 7). The four planets closest to the Sun, with their orbits to scale and their real times round the Sun, so the dots’ speeds are in the right proportion. Press Play for a few seconds, then Gravity off: each planet leaves along a straight line from the dot where it let go, while its orbit stays drawn. Reset puts them back. The speed pattern is for the bar graph to find, so do not ask "which is fastest?" here.\n\n' +
    'NO FILM. NASA’s Juno approach movie of Jupiter’s four big moons (YouTube XpsQimYhNkA; a public-domain GIF on Commons) shows real orbits where the closer moon is faster. It was tried at the size the projector shows it and left out: the moons are dots about 8–10 pixels wide, the furthest one is so faint it disappears, and seen edge-on they swing side to side with no labels, so the pattern needs a lot of explaining. There is also no minute for it in this period. Show it another day if you like: Io (closest) goes round in 42 hours, Callisto in 17 days.\n\n' +
    'THE PHOTOS. The Sun, Earth, Venus, Jupiter and Uranus are the same pictures as in 3.2. Neptune is not: 3.2 showed its paler true colour, and here it is the familiar deep blue so it stands apart from Uranus in the row. If someone notices, that is the reason.\n\n' +
    'THE NUMBERS. Book values throughout. The Sun’s mass is about 333 000 Earths; its surface gravity 274 N/kg (book: 270). Orbit speeds in km/s (NASA): Mercury 47.4, Venus 35.0, Earth 29.8, Mars 24.1, Jupiter 13.1, Saturn 9.7, Uranus 6.8, Neptune 5.4 — the book rounds them. Neptune is 30 times further from the Sun than the Earth and has 17 times its mass.\n\n' +
    'JUNO AND VOYAGER. Juno reached about 266 000 km/h as it arrived at Jupiter on 4 July 2016, then the fastest object people had made; if a student asks, the record now belongs to the Parker Solar Probe, about 690 000 km/h close to the Sun (December 2024). Voyager 1 was launched on 5 September 1977. NASA says it will be one light-day from Earth — about 25.9 billion km, so a radio signal takes 24 hours each way — on 18 November 2026, the first spacecraft ever to get that far. Its speed is about 61 000 km/h (17 km/s); the book says 64 000.\n\n' +
    'THE NEPTUNE STORY (slide 20). William Herschel found Uranus in 1781. In 1821 the French astronomer Alexis Bouvard published tables of where Uranus would be; it kept drifting off them. In 1846 Urbain Le Verrier, also French, calculated where an unseen planet pulling on Uranus must be; Johann Galle at the Berlin Observatory looked there on 23 September 1846 and found Neptune within about 1° of the prediction. (John Couch Adams in England made a similar prediction.) Worth saying in French as well: two French scientists.\n\n' +
    'ENGLISH POINTS. "Orbit" is a noun and a verb. "Per" means "for every" (3.1): km/s, km/h. Observation, prediction and conclusion are nearly the same words in French, so the French speakers have a head start — but the English spelling of "prediction" has no accent. On slide 21 the verbs (calculated, seen) are not in bold on purpose: the class has to match the meaning, not the word.\n\n' +
    'LANGUAGES: English and French only, like every Year 7 deck from Unit 4. The diagrams are in English.',
}
