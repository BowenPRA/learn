// content/y7-science/U02_5/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can explain what an atom and an element are; describe how atoms join together in neon, ' +
    'gold, oxygen and sulfur; find periods, groups, metals and non-metals in the first 20 elements of ' +
    'the Periodic Table; and write element symbols with the capital-letter rule.',
  materials: [
    'Projector / TV for the lesson deck',
    'Learner’s Book (Unit 2.5, pages 51–56)',
    'Student science notebooks; yellow and blue pencils are nice for the table but optional',
    'Mini whiteboards or scrap paper for Symbol Snap',
  ],
  vocab: [
    { term: 'Atom', def: 'a tiny piece of matter; everything is made of atoms. "Atom" means "cannot be divided"' },
    { term: 'Nanotube', def: 'a very, very small tube made of carbon atoms. "Nano" means "very, very small"' },
    { term: 'Element', def: 'a substance made of only one kind of atom' },
    { term: 'The Periodic Table', def: 'a way of arranging all the elements' },
    { term: 'Period', def: 'a row in the Periodic Table (in everyday English, a lesson — say so)' },
    { term: 'Group', def: 'a column in the Periodic Table (in everyday English, people together — say so)' },
    { term: 'Metals', def: 'elements like iron, copper and aluminium; yellow boxes in the book’s table' },
    { term: 'Symbol', def: 'a short way to write the name of an element; first letter a capital, second letter small' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Slide 1, the book’s Getting Started: draw the particles in a solid; what must you do to make it melt? (Heat it.) Two hands up.' },
    { time: '4–10 min', phase: 'Can you cut forever?', detail: 'Slide 2: vote yes or no, no discussion of the answer. Slide 3: Democritus said no; copy ATOM. Slide 4: guess how many halvings from 1 cm to one atom. Write several guesses on the board.' },
    { time: '10–13 min', phase: 'The halving counter', detail: 'Slide 5: press Cut in half while the class counts aloud. Pause at sand (3), hair (7), cell (9, the 0.02 mm cell from 1.1), virus (17). It lands on one gold atom at 25. Compare with the board.' },
    { time: '13–20 min', phase: 'Atoms are real; elements', detail: 'Slide 6: real gold atoms and a nanotube; copy NANOTUBE. Slide 7: carbon, gold, silver (graphite and diamond are both carbon). Slide 8: silver zoom; copy ELEMENT. Slide 9: 94 kinds of atom, so 94 natural elements (+24 made = 118).' },
    { time: '20–26 min', phase: 'Draw This: atoms joining', detail: 'Slide 10: draw all four panels with labels, about 4 minutes. Slide 11 (neon, oxygen, sulfur photos) while the last ones finish.' },
    { time: '26–33 min', phase: 'The Periodic Table', detail: 'Slide 12: copy THE PERIODIC TABLE; is one on our wall? Slide 13: press Next row, then Next column. Slide 14: table, period and group have everyday meanings; make the class say both. Slide 15: fingers on the book table; copy PERIOD and GROUP.' },
    { time: '33–38 min', phase: 'Mass order and metals', detail: 'Slide 16: press Next atom; the class reads each element name aloud (pronunciation practice). Slide 17: metals, then non-metals. Slide 18: which photo is not a metal? Slide 19: copy METALS, then reveal bromine.' },
    { time: '38–42 min', phase: 'Symbols', detail: 'Slide 20: why is sodium Na? Take guesses, no answer. Slide 21: the three ways; copy SYMBOL with the capital rule. Slide 22: Co or CO?' },
    { time: '42–46 min', phase: 'Symbol Snap', detail: 'Slide 23: a name appears, everyone writes the symbol, then Show. Aim for 10–12 cards; use Show symbols instead for the last few. This is the book’s Activity, played from the front.' },
    { time: '46–50 min', phase: 'Questions and exit', detail: 'Slides 24–27: Questions 1–8, two per slide; start in class, finish for homework. The table on 25 and 27 can be tapped to check answers (tap Mg for Q7, He for Q8). Slide 28: checklist, 8 key words + 1 drawing. Slide 29: exit question.' },
  ],
  answers: [
    { q: 'Slide 5 — halving', a: '10 mm halved 25 times = 0.0000003 mm, about one gold atom (0.00000029 mm). On the way: 3 = 1.25 mm (sand), 7 = 0.078 mm (hair), 9 = 0.02 mm (a cell), 13 = 0.0012 mm (bacterium), 17 = 0.000076 mm (virus).' },
    { q: 'Slide 18 — metal or non-metal', a: 'Bromine is the non-metal (a red-brown liquid). Aluminium, zinc, lead, copper and iron are metals.' },
    { q: 'Slide 22 — Co or CO', a: 'Co is one element, cobalt (a metal). CO is two elements joined, carbon and oxygen (carbon monoxide; no need to name it).' },
    { q: 'Q1', a: 'Tiny pieces of matter; everything is made of atoms. ("Atom" means "cannot be divided".)' },
    { q: 'Q2', a: '94.' },
    { q: 'Q3', a: 'Mg magnesium, Be beryllium, Li lithium, N nitrogen.' },
    { q: 'Q4', a: 'Aluminium Al, boron B, fluorine F, potassium K.' },
    { q: 'Q5', a: 'Hydrogen.' },
    { q: 'Q6', a: 'Calcium.' },
    { q: 'Q7', a: 'Any two of: sodium, aluminium, silicon, phosphorus, sulfur, chlorine, argon.' },
    { q: 'Q8', a: 'Ne and Ar.' },
    { q: 'Exit question', a: 'C, Ca, Cl. All three start with C, so the small second letter is what tells them apart.' },
  ],
  notes:
    'The notebook count is the book’s own Key words box: atom, element, group, metals, nanotube, period, symbol, The Periodic Table (8), plus the joining drawing (1). ' +
    'Mass order: the book says atoms get heavier across each period, and slide 16 follows it. Strictly, argon atoms are slightly heavier than potassium atoms, because the table is really ordered by atomic number. That comes later; do not raise it unless a student spots it. ' +
    'In the book’s table hydrogen floats above the middle and is in no group, and the widget draws it the same way, so Q8 has only Ne and Ar. ' +
    'Book Activity (p.56): students make their own name and symbol card game. Symbol Snap models one; card-making can go home if there is no time. ' +
    'Symbol Snap: a clicker’s Right arrow shows the answer, then moves on. Leave the game with the deck’s Back or Continue buttons.',
}
