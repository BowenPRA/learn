// Year 7 Science · 3.4 Tides · Workbook-style practice, played by the step engine
// (src/stepPractice, the Dashboard's STEP_PRACTICE; docs/step-practice.md).
//
// Fresh problems in the style of the Workbook's 3.4 exercises: what causes the
// tides, hours to the next high and low tide, the Sun and Moon in a line, a boat
// that cannot come in at low tide, reading a depth board, planning the readings,
// where the bulges are and the time of the next tide. Tidal range, the average
// depth, effects of tides and "about 50 minutes later each day" come from the
// lesson (U03_4) and the River Tide Lab. New places and numbers; no book wording,
// numbers, tables or pictures. Mr Bowen only, never students' names.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 set from Unit 4: every string the
// student reads has an …Fr twin and no …Vn twin. French keeps the decimal point
// (as the lesson deck does), so a typed "2,6" is only a nudge. No gap or tap
// steps: their sentences have no French twin. The words "spring tide" and "neap
// tide" are left out, as in the lesson (plan.js): "the biggest tides" instead.
//
// Levels: focus f1–f4 (every step), practice p1–p5 (the key steps), challenge
// c1–c3 (the answer first; a slip opens the step it comes from).
// Check: checkStepPractice(workbook, { fr: true }) from src/stepPractice/check.js.

const opt = (id, text, textFr) => ({ id, text, textFr });

// The Moon at four places round the Earth, the Sun far away on the right.
// A = between the Earth and the Sun (new moon), C = the far side (full moon).
const ORBIT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 300" role="img" aria-label="The Earth in the middle, the Moon at four places A, B, C and D around it, and the Sun on the right">
<circle cx="640" cy="150" r="118" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
<text x="551" y="156" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="17" font-weight="800" fill="#92400e">Sun</text>
<circle cx="250" cy="150" r="104" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6"/>
<circle cx="250" cy="150" r="38" fill="#1a5fa8"/>
<text x="250" y="155" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="14" font-weight="800" fill="#ffffff">Earth</text>
<circle cx="354" cy="150" r="14" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<circle cx="250" cy="46" r="14" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<circle cx="146" cy="150" r="14" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<circle cx="250" cy="254" r="14" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<text x="376" y="157" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">A</text>
<text x="250" y="24" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">B</text>
<text x="124" y="157" text-anchor="end" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">C</text>
<text x="250" y="292" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">D</text>
<text x="14" y="290" font-family="ui-sans-serif, sans-serif" font-size="13" fill="#64748b">not to scale</text>
</svg>`;

const ORBIT_FR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 300" role="img" aria-label="La Terre au milieu, la Lune à quatre endroits A, B, C et D autour d’elle, et le Soleil à droite">
<circle cx="640" cy="150" r="118" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
<text x="551" y="156" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="17" font-weight="800" fill="#92400e">Soleil</text>
<circle cx="250" cy="150" r="104" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6"/>
<circle cx="250" cy="150" r="38" fill="#1a5fa8"/>
<text x="250" y="155" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="14" font-weight="800" fill="#ffffff">Terre</text>
<circle cx="354" cy="150" r="14" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<circle cx="250" cy="46" r="14" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<circle cx="146" cy="150" r="14" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<circle cx="250" cy="254" r="14" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<text x="376" y="157" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">A</text>
<text x="250" y="24" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">B</text>
<text x="124" y="157" text-anchor="end" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">C</text>
<text x="250" y="292" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">D</text>
<text x="14" y="290" font-family="ui-sans-serif, sans-serif" font-size="13" fill="#64748b">pas à l’échelle</text>
</svg>`;

// A depth board on a harbour wall: numbers on the metres only, 5 spaces in each
// metre (0.2 m each). The sea reaches 2.6 m, three spaces above 2 m. Units only,
// so one picture serves both languages.
const BOARD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 400" role="img" aria-label="A depth board on a harbour wall, marked in metres, with the sea part of the way up it">
<rect x="0" y="0" width="360" height="400" fill="#e7e5e4"/>
<rect x="140" y="36" width="100" height="364" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="360" x2="176" y2="360" stroke="#1e293b" stroke-width="3"/>
<line x1="140" y1="260" x2="176" y2="260" stroke="#1e293b" stroke-width="3"/>
<line x1="140" y1="160" x2="176" y2="160" stroke="#1e293b" stroke-width="3"/>
<line x1="140" y1="60" x2="176" y2="60" stroke="#1e293b" stroke-width="3"/>
<line x1="140" y1="340" x2="160" y2="340" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="320" x2="160" y2="320" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="300" x2="160" y2="300" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="280" x2="160" y2="280" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="240" x2="160" y2="240" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="220" x2="160" y2="220" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="200" x2="160" y2="200" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="180" x2="160" y2="180" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="140" x2="160" y2="140" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="120" x2="160" y2="120" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="100" x2="160" y2="100" stroke="#1e293b" stroke-width="2"/>
<line x1="140" y1="80" x2="160" y2="80" stroke="#1e293b" stroke-width="2"/>
<text x="182" y="367" font-family="ui-sans-serif, sans-serif" font-size="19" font-weight="800" fill="#1e293b">1 m</text>
<text x="182" y="267" font-family="ui-sans-serif, sans-serif" font-size="19" font-weight="800" fill="#1e293b">2 m</text>
<text x="182" y="167" font-family="ui-sans-serif, sans-serif" font-size="19" font-weight="800" fill="#1e293b">3 m</text>
<text x="182" y="67" font-family="ui-sans-serif, sans-serif" font-size="19" font-weight="800" fill="#1e293b">4 m</text>
<rect x="0" y="200" width="360" height="200" fill="#38bdf8" fill-opacity="0.45"/>
<line x1="0" y1="200" x2="360" y2="200" stroke="#0369a1" stroke-width="3"/>
</svg>`;

// The Earth from above the North Pole, the Moon on the left. P faces the Moon,
// Q is at right angles to it, R is on the far side.
const EARTH_MOON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 280" role="img" aria-label="The Earth seen from above the North Pole, with places P, Q and R on its edge, and the Moon on the left">
<circle cx="70" cy="140" r="24" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<text x="70" y="192" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="16" font-weight="800" fill="#1e293b">Moon</text>
<circle cx="370" cy="140" r="86" fill="#bfdbfe" stroke="#1a5fa8" stroke-width="3"/>
<text x="370" y="146" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="16" font-weight="800" fill="#1a5fa8">Earth</text>
<circle cx="284" cy="140" r="7" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
<circle cx="370" cy="54" r="7" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
<circle cx="456" cy="140" r="7" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
<text x="270" y="134" text-anchor="end" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">P</text>
<text x="370" y="38" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">Q</text>
<text x="470" y="147" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">R</text>
<text x="14" y="270" font-family="ui-sans-serif, sans-serif" font-size="13" fill="#64748b">not to scale</text>
</svg>`;

const EARTH_MOON_FR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 280" role="img" aria-label="La Terre vue du dessus du pôle Nord, avec les endroits P, Q et R sur son bord, et la Lune à gauche">
<circle cx="70" cy="140" r="24" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
<text x="70" y="192" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="16" font-weight="800" fill="#1e293b">Lune</text>
<circle cx="370" cy="140" r="86" fill="#bfdbfe" stroke="#1a5fa8" stroke-width="3"/>
<text x="370" y="146" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="16" font-weight="800" fill="#1a5fa8">Terre</text>
<circle cx="284" cy="140" r="7" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
<circle cx="370" cy="54" r="7" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
<circle cx="456" cy="140" r="7" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
<text x="270" y="134" text-anchor="end" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">P</text>
<text x="370" y="38" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">Q</text>
<text x="470" y="147" font-family="ui-sans-serif, sans-serif" font-size="20" font-weight="800" fill="#1e293b">R</text>
<text x="14" y="270" font-family="ui-sans-serif, sans-serif" font-size="13" fill="#64748b">pas à l’échelle</text>
</svg>`;

// ════════════════════════════════════════════════════════════════════════════
// FOCUS — every step
// ════════════════════════════════════════════════════════════════════════════

const focus = [
  {
    id: 'f1', level: 'focus',
    prompt: 'The sea at Mr Bowen’s harbour goes up and down {{twice a day}}. [[What makes the tides?]]',
    promptFr: 'La mer du port de M. Bowen monte et descend {{deux fois par jour}}. [[Qu’est-ce qui fait les marées ?]]',
    steps: [
      {
        title: 'Which two pull on the oceans?', titleFr: 'Quelles sont les deux choses qui tirent les océans ?',
        input: { type: 'multi', options: [opt('moon', 'The Moon', 'La Lune'), opt('sun', 'The Sun', 'Le Soleil'), opt('wind', 'The wind', 'Le vent'), opt('jupiter', 'Jupiter', 'Jupiter')], answer: ['moon', 'sun'] },
        line: 'The Moon and the Sun pull on the oceans.', lineFr: 'La Lune et le Soleil tirent les océans.',
        hint: 'Think of gravity. Which two are big and close enough to pull the sea?', hintFr: 'Pense à la gravité. Lesquels sont assez grands et assez proches pour tirer la mer ?',
        slips: [
          { value: ['moon'], key: 'moon-only', msg: 'The Moon pulls the most, but the Sun pulls on the oceans too.', msgFr: 'La Lune tire le plus, mais le Soleil tire aussi les océans.' },
          { value: ['moon', 'sun', 'wind'], key: 'wind', msg: 'The wind makes waves, not tides. Tides come from gravity.', msgFr: 'Le vent fait des vagues, pas des marées. Les marées viennent de la gravité.' },
        ],
      },
      {
        title: 'Which one makes bigger tides?', titleFr: 'Lequel fait les plus grandes marées ?',
        input: { type: 'choice', options: [opt('moon', 'The Moon', 'La Lune'), opt('sun', 'The Sun', 'Le Soleil')], answer: 'moon' },
        line: 'The Moon makes bigger tides than the Sun.', lineFr: 'La Lune fait de plus grandes marées que le Soleil.',
        hint: 'Tides come from the stretch of the Earth. Which one is much closer?', hintFr: 'Les marées viennent de l’étirement de la Terre. Lequel est beaucoup plus proche ?',
        why: 'The Sun is about 390 times further away, so it stretches the Earth less. Its tides are about half the size.', whyFr: 'Le Soleil est environ 390 fois plus loin, donc il étire moins la Terre. Ses marées sont environ deux fois plus petites.',
        slips: [{ value: 'sun', key: 'sun-bigger', msg: 'The Sun pulls harder, but it is very far away, so it stretches the Earth less.', msgFr: 'Le Soleil tire plus fort, mais il est très loin, donc il étire moins la Terre.' }],
      },
      {
        title: 'Name the Moon’s pull on the oceans', titleFr: 'Nomme l’attraction de la Lune sur les océans',
        sub: 'Type the key word in English.', subFr: 'Tape le mot clé en anglais.',
        input: { type: 'text', answer: 'tidal force', accept: ['tidal', 'tidal forces', 'a tidal force', 'the tidal force', 'force de marée', 'la force de marée', 'une force de marée'] },
        line: 'The pull of the Moon’s gravity on the oceans is the @.', lineFr: 'L’attraction de la gravité de la Lune sur les océans est la force de marée (@).',
        hint: 'It is a key word from the lesson: two words, and the first one is like “tide”.', hintFr: 'C’est un mot clé de la leçon : deux mots en anglais, et le premier ressemble à « tide ».',
        slips: [
          { value: 'gravity', key: 'gravity', msg: 'Yes, it comes from gravity. But its pull on the oceans has its own key word, with “tidal” in it.', msgFr: 'Oui, elle vient de la gravité. Mais son attraction sur les océans a son propre mot clé, avec « tidal » dedans.' },
          { value: 'tide', key: 'tide', msg: 'A tide is the change in depth. The pull that makes it has another name.', msgFr: 'Une marée (tide), c’est le changement de profondeur. La force qui la fait a un autre nom.' },
          { value: 'marée', key: 'maree', msg: 'A tide (marée) is the change in depth. The pull that makes it has another name.', msgFr: 'La marée (tide), c’est le changement de profondeur. La force qui la fait a un autre nom.' },
          { value: 'tidal range', key: 'range', msg: 'Tidal range is the difference in depth between high tide and low tide. Here you need the pull.', msgFr: 'Le marnage (tidal range), c’est la différence de profondeur entre la marée haute et la marée basse. Ici, il faut la force.' },
        ],
      },
    ],
  },
  {
    id: 'f2', level: 'focus',
    prompt: 'At a fishing harbour, it is high tide at {{04:00}}. [[When is the next low tide, and the next high tide?]]',
    promptFr: 'Dans un port de pêche, c’est la marée haute à {{4 h}}. [[Quand sont la prochaine marée basse et la prochaine marée haute ?]]',
    steps: [
      {
        title: 'How long from high tide to low tide?', titleFr: 'Combien de temps de la marée haute à la marée basse ?',
        input: { type: 'number', after: 'hours', afterFr: 'heures', answer: '6' },
        line: 'High tide to low tide: about @ hours.', lineFr: 'De la marée haute à la marée basse : environ @ heures.',
        hint: 'Two high tides a day means 12 hours from high to high. Low tide is halfway between.', hintFr: 'Deux marées hautes par jour : 12 heures d’une marée haute à l’autre. La marée basse est au milieu.',
        slips: [
          { value: '12', key: 'high-to-high', msg: '12 hours is from one high tide to the next. Low tide is halfway: half of 12.', msgFr: '12 heures, c’est d’une marée haute à la suivante. La marée basse est au milieu : la moitié de 12.' },
          { value: '24', key: 'one-a-day', msg: 'There are two high tides and two low tides every day, so it is much less than 24 hours.', msgFr: 'Il y a deux marées hautes et deux marées basses chaque jour, donc c’est beaucoup moins que 24 heures.' },
        ],
      },
      {
        title: 'When is the next low tide?', titleFr: 'Quand est la prochaine marée basse ?',
        input: { type: 'choice', options: [opt('t10', '10:00', '10 h'), opt('t16', '16:00', '16 h'), opt('t07', '07:00', '7 h')], answer: 't10' },
        line: 'Next low tide: 04:00 + 6 hours = @.', lineFr: 'Prochaine marée basse : 4 h + 6 heures = @.',
        hint: 'Add <<6>> hours to 04:00.', hintFr: 'Ajoute <<6>> heures à 4 h.',
        slips: [
          { value: 't16', step: 1, key: 'added-12', msg: '16:00 is 12 hours after 04:00. That is high tide again.', msgFr: '16 h, c’est 12 heures après 4 h : c’est de nouveau la marée haute.' },
          { value: 't07', key: 'added-3', msg: '07:00 is only 3 hours later. The water is still going down.', msgFr: '7 h, c’est seulement 3 heures plus tard : l’eau descend encore.' },
        ],
      },
      {
        title: 'When is the next high tide?', titleFr: 'Quand est la prochaine marée haute ?',
        input: { type: 'choice', options: [opt('t16', '16:00', '16 h'), opt('t22', '22:00', '22 h'), opt('t04', '04:00 tomorrow', '4 h demain')], answer: 't16' },
        line: 'Next high tide: 04:00 + 12 hours = @.', lineFr: 'Prochaine marée haute : 4 h + 12 heures = @.',
        hint: 'High tides are 12 hours apart.', hintFr: 'Les marées hautes sont à 12 heures d’écart.',
        why: 'Every day: two high tides and two low tides, about 6 hours apart.', whyFr: 'Chaque jour : deux marées hautes et deux marées basses, à environ 6 heures d’écart.',
        slips: [
          { value: 't04', key: 'one-high-a-day', msg: '04:00 tomorrow is 24 hours later. There are two high tides every day.', msgFr: '4 h demain, c’est 24 heures plus tard. Il y a deux marées hautes chaque jour.' },
          { value: 't22', key: 'added-18', msg: '22:00 is 18 hours later. That is the second low tide.', msgFr: '22 h, c’est 18 heures plus tard : c’est la deuxième marée basse.' },
        ],
      },
    ],
  },
  {
    id: 'f3', level: 'focus',
    prompt: 'Mr Bowen measured the depth of the sea at an island harbour every {{3 hours}}. [[What is the tidal range?]]',
    promptFr: 'M. Bowen a mesuré la profondeur de la mer dans le port d’une île toutes les {{3 heures}}. [[Quel est le marnage ?]]',
    table: {
      head: ['Time', 'Depth (m)'], headFr: ['Heure', 'Profondeur (m)'],
      rows: [['{{02:00}}', '{{1.5}}'], ['{{05:00}}', '{{3.2}}'], ['{{08:00}}', '{{5.1}}'], ['{{11:00}}', '{{3.3}}'], ['{{14:00}}', '{{1.3}}'], ['{{17:00}}', '{{3.0}}'], ['{{20:00}}', '{{4.9}}']],
    },
    steps: [
      {
        title: 'Find the depth at high tide', titleFr: 'Trouve la profondeur à marée haute',
        input: { type: 'number', before: 'High tide:', beforeFr: 'Marée haute :', after: 'm', answer: '5.1' },
        hint: 'High tide is the deepest water. Find the biggest number in the depth column.', hintFr: 'La marée haute, c’est l’eau la plus profonde. Trouve le plus grand nombre dans la colonne des profondeurs.',
        slips: [{ value: '4.9', key: 'last-row', msg: '4.9 m is at 20:00. Look down the whole column for the biggest depth.', msgFr: '4.9 m, c’est à 20 h. Regarde toute la colonne pour trouver la plus grande profondeur.' }],
      },
      {
        title: 'Find the depth at low tide', titleFr: 'Trouve la profondeur à marée basse',
        input: { type: 'number', before: 'Low tide:', beforeFr: 'Marée basse :', after: 'm', answer: '1.3' },
        hint: 'Low tide is the shallowest water. Find the smallest number.', hintFr: 'La marée basse, c’est l’eau la moins profonde. Trouve le plus petit nombre.',
        slips: [{ value: '1.5', key: 'first-row', msg: '1.5 m is at 02:00. Look down the whole column for the smallest depth.', msgFr: '1.5 m, c’est à 2 h. Regarde toute la colonne pour trouver la plus petite profondeur.' }],
      },
      {
        title: 'Take low tide away from high tide', titleFr: 'Soustrais la marée basse de la marée haute',
        input: { type: 'number', before: '<<5.1>> − <<1.3>> =', after: 'm', answer: '3.8' },
        line: 'Tidal range: 5.1 m − 1.3 m = @ m.', lineFr: 'Marnage : 5.1 m − 1.3 m = @ m.',
        hint: 'The tidal range is the difference in depth between high tide and low tide.', hintFr: 'Le marnage est la différence de profondeur entre la marée haute et la marée basse.',
        why: 'The sea goes up and down 3.8 m between low tide and high tide.', whyFr: 'La mer monte et descend de 3.8 m entre la marée basse et la marée haute.',
        slips: [{ value: '6.4', key: 'added', msg: 'You added. The tidal range is a difference: take the low tide depth away.', msgFr: 'Tu as additionné. Le marnage est une différence : soustrais la profondeur à marée basse.' }],
      },
    ],
  },
  {
    id: 'f4', level: 'focus',
    prompt: 'The picture shows the Moon at four places, **A** to **D**, as it goes round the Earth. [[Where is the Moon when the tides are biggest?]]',
    promptFr: 'Le dessin montre la Lune à quatre endroits, de **A** à **D**, pendant qu’elle tourne autour de la Terre. [[Où est la Lune quand les marées sont les plus grandes ?]]',
    inlineSvg: ORBIT, inlineSvgFr: ORBIT_FR,
    steps: [
      {
        title: 'Which Moons are in line with the Sun?', titleFr: 'Quelles Lunes sont alignées avec le Soleil ?',
        input: { type: 'multi', options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }, { id: 'c', text: 'C' }, { id: 'd', text: 'D' }], answer: ['a', 'c'] },
        line: 'In a line with the Sun and the Earth: @.', lineFr: 'Alignées avec le Soleil et la Terre : @.',
        hint: 'Draw a line in your head from the Sun, through the Earth, and out the other side.', hintFr: 'Imagine une ligne qui part du Soleil, traverse la Terre et ressort de l’autre côté.',
        slips: [
          { value: ['a'], key: 'near-only', msg: 'A is in the line. C is in the line too, on the far side of the Earth.', msgFr: 'A est sur la ligne. C aussi, de l’autre côté de la Terre.' },
          { value: ['b', 'd'], key: 'right-angles', msg: 'B and D are at right angles to the line from the Sun to the Earth.', msgFr: 'B et D sont à angle droit avec la ligne entre le Soleil et la Terre.' },
        ],
      },
      {
        title: 'When do the biggest tides come?', titleFr: 'Quand arrivent les plus grandes marées ?',
        input: { type: 'multi', options: [opt('full', 'At full moon', 'À la pleine lune'), opt('new', 'At new moon', 'À la nouvelle lune'), opt('half', 'At half moon', 'À la demi-lune')], answer: ['full', 'new'] },
        line: 'The biggest tides: at full moon and at new moon.', lineFr: 'Les plus grandes marées : à la pleine lune et à la nouvelle lune.',
        hint: 'The Sun, the Moon and the Earth are in a line twice a month. What does the Moon look like then?', hintFr: 'Le Soleil, la Lune et la Terre sont alignés deux fois par mois. À quoi ressemble la Lune à ces moments-là ?',
        slips: [
          { value: ['full'], key: 'full-only', msg: 'Full moon is one. At new moon the Sun, the Moon and the Earth are in a line too.', msgFr: 'La pleine lune en est une. À la nouvelle lune, le Soleil, la Lune et la Terre sont aussi alignés.' },
          { value: ['new'], key: 'new-only', msg: 'New moon is one. At full moon the Sun, the Earth and the Moon are in a line too.', msgFr: 'La nouvelle lune en est une. À la pleine lune, le Soleil, la Terre et la Lune sont aussi alignés.' },
          { value: ['half'], key: 'half', msg: 'At half moon the Sun and the Moon pull at right angles: the smallest tides.', msgFr: 'À la demi-lune, le Soleil et la Lune tirent à angle droit : les plus petites marées.' },
        ],
      },
      {
        title: 'Why are these tides the biggest?', titleFr: 'Pourquoi ces marées sont-elles les plus grandes ?',
        input: { type: 'choice', options: [
          opt('add', 'The pulls of the Sun and the Moon add together.', 'Les attractions du Soleil et de la Lune s’ajoutent.'),
          opt('bigger', 'The Moon is bigger then.', 'La Lune est plus grosse à ce moment-là.'),
          opt('warm', 'The sea is warmer then.', 'La mer est plus chaude à ce moment-là.'),
        ], answer: 'add' },
        line: 'In a line, the Sun and the Moon pull together: the biggest tides.', lineFr: 'Alignés, le Soleil et la Lune tirent ensemble : les plus grandes marées.',
        hint: 'Two pulls in the same line work together.', hintFr: 'Deux attractions sur la même ligne travaillent ensemble.',
        slips: [{ value: 'bigger', key: 'moon-size', msg: 'The Moon is always the same size. It only looks different because the Sun lights it from different sides.', msgFr: 'La Lune a toujours la même taille. Elle a l’air différente parce que le Soleil l’éclaire de différents côtés.' }],
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════════
// PRACTICE — the key steps (key: true, and always the last)
// ════════════════════════════════════════════════════════════════════════════

const practice = [
  {
    id: 'p1', level: 'practice',
    prompt: 'The Moon’s gravity pulls on the Earth and its oceans. [[Why does Mr Bowen’s harbour have two high tides a day?]]',
    promptFr: 'La gravité de la Lune tire sur la Terre et ses océans. [[Pourquoi le port de M. Bowen a-t-il deux marées hautes par jour ?]]',
    steps: [
      {
        title: 'Which side does the Moon pull most?', titleFr: 'De quel côté la Lune tire-t-elle le plus ?',
        input: { type: 'choice', options: [opt('near', 'The side near the Moon', 'Le côté proche de la Lune'), opt('far', 'The side far from the Moon', 'Le côté éloigné de la Lune'), opt('same', 'Both sides the same', 'Les deux côtés pareil')], answer: 'near' },
        line: 'The Moon pulls the near side most.', lineFr: 'La Lune tire le plus sur le côté proche.',
        hint: 'Gravity is stronger when things are closer.', hintFr: 'La gravité est plus forte quand les objets sont plus proches.',
        slips: [
          { value: 'same', key: 'same-pull', msg: 'Gravity gets weaker further away, so the near side is pulled more.', msgFr: 'La gravité diminue avec la distance, donc le côté proche est plus tiré.' },
          { value: 'far', key: 'far-pull', msg: 'The far side is further from the Moon, so it is pulled least.', msgFr: 'Le côté éloigné est plus loin de la Lune, donc il est le moins tiré.' },
        ],
      },
      {
        key: true,
        title: 'Where does the water make bulges?', titleFr: 'Où l’eau fait-elle des bosses ?',
        input: { type: 'multi', options: [opt('near', 'On the side near the Moon', 'Du côté proche de la Lune'), opt('far', 'On the side far from the Moon', 'Du côté éloigné de la Lune'), opt('right', 'On the two sides at right angles to the Moon', 'Sur les deux côtés à angle droit avec la Lune')], answer: ['near', 'far'] },
        line: 'Two bulges: one on the near side, one on the far side.', lineFr: 'Deux bosses : une du côté proche, une du côté éloigné.',
        hint: 'The Earth is stretched along the line to the Moon. A stretch has two ends.', hintFr: 'La Terre est étirée le long de la ligne vers la Lune. Un étirement a deux bouts.',
        slips: [
          { value: ['near'], step: 1, key: 'one-bulge', msg: 'The far side is pulled least, so it is left behind. The water makes a bulge there too.', msgFr: 'Le côté éloigné est le moins tiré, donc il reste en arrière. L’eau fait une bosse là aussi.' },
          { value: ['right'], key: 'right-angles', msg: 'At right angles to the Moon the water is low: that is where low tide is.', msgFr: 'À angle droit avec la Lune, l’eau est basse : c’est là qu’est la marée basse.' },
        ],
      },
      {
        title: 'Put the reasons in order', titleFr: 'Remets les raisons dans l’ordre',
        input: { type: 'order', items: [
          { id: 'pull', text: 'The Moon’s gravity pulls on the Earth.', textFr: 'La gravité de la Lune tire sur la Terre.' },
          { id: 'stretch', text: 'The near side moves most. The far side is left behind.', textFr: 'Le côté proche bouge le plus. Le côté éloigné reste en arrière.' },
          { id: 'bulges', text: 'The water makes two bulges.', textFr: 'L’eau fait deux bosses.' },
          { id: 'spin', text: 'The Earth spins through both bulges every day.', textFr: 'La Terre tourne à travers les deux bosses chaque jour.' },
          { id: 'two', text: 'So the harbour has two high tides a day.', textFr: 'Donc le port a deux marées hautes par jour.' },
        ] },
        line: 'The Moon pulls, the Earth is stretched into two bulges, and the Earth spins through both: two high tides a day.', lineFr: 'La Lune tire, la Terre est étirée en deux bosses, et la Terre tourne à travers les deux : deux marées hautes par jour.',
        hint: 'Start with the Moon. End with the harbour.', hintFr: 'Commence par la Lune. Termine par le port.',
        slips: [
          { value: ['pull', 'spin', 'stretch', 'bulges', 'two'], step: 2, key: 'spin-first', msg: 'The Earth can only spin through the bulges once they are there. Make the bulges first.', msgFr: 'La Terre ne peut tourner à travers les bosses qu’une fois qu’elles sont là. Fais d’abord les bosses.' },
          { value: ['pull', 'bulges', 'stretch', 'spin', 'two'], step: 2, key: 'bulges-first', msg: 'The bulges come from the stretch: first the near side moves most, then the water makes two bulges.', msgFr: 'Les bosses viennent de l’étirement : d’abord le côté proche bouge le plus, ensuite l’eau fait deux bosses.' },
        ],
      },
    ],
  },
  {
    id: 'p2', level: 'practice',
    prompt: 'Mr Bowen takes his boat out of the harbour at high tide, at {{07:00}}. The boat **cannot** get into the harbour at {{low tide}}. [[At which times can he not come back?]]',
    promptFr: 'M. Bowen sort du port en bateau à marée haute, à {{7 h}}. Le bateau **ne peut pas** entrer dans le port à {{marée basse}}. [[À quelles heures ne peut-il pas revenir ?]]',
    steps: [
      {
        title: 'How long from high tide to low tide?', titleFr: 'Combien de temps de la marée haute à la marée basse ?',
        input: { type: 'number', after: 'hours', afterFr: 'heures', answer: '6' },
        line: 'High tide to low tide: about @ hours.', lineFr: 'De la marée haute à la marée basse : environ @ heures.',
        hint: 'There are 12 hours from high tide to high tide. Low tide is halfway.', hintFr: 'Il y a 12 heures d’une marée haute à l’autre. La marée basse est au milieu.',
        slips: [{ value: '12', key: 'high-to-high', msg: '12 hours is from one high tide to the next. Low tide is halfway.', msgFr: '12 heures, c’est d’une marée haute à la suivante. La marée basse est au milieu.' }],
      },
      {
        key: true,
        title: 'When is the first low tide?', titleFr: 'Quand est la première marée basse ?',
        input: { type: 'choice', options: [opt('t13', '13:00', '13 h'), opt('t19', '19:00', '19 h'), opt('t10', '10:00', '10 h')], answer: 't13' },
        line: 'First low tide: 07:00 + 6 hours = @.', lineFr: 'Première marée basse : 7 h + 6 heures = @.',
        hint: 'Add <<6>> hours to 07:00.', hintFr: 'Ajoute <<6>> heures à 7 h.',
        slips: [
          { value: 't19', step: 1, key: 'added-12', msg: '19:00 is 12 hours after 07:00: high tide again. Low tide comes 6 hours after high tide.', msgFr: '19 h, c’est 12 heures après 7 h : de nouveau la marée haute. La marée basse arrive 6 heures après la marée haute.' },
          { value: 't10', step: 1, key: 'added-3', msg: '10:00 is only 3 hours later. The water is still going down.', msgFr: '10 h, c’est seulement 3 heures plus tard. L’eau descend encore.' },
        ],
      },
      {
        title: 'Tick every time he cannot come back', titleFr: 'Coche toutes les heures où il ne peut pas revenir',
        input: { type: 'multi', options: [opt('t13', '13:00 today', '13 h aujourd’hui'), opt('t19', '19:00 today', '19 h aujourd’hui'), opt('t01', '01:00 tomorrow', '1 h demain'), opt('t07', '07:00 tomorrow', '7 h demain')], answer: ['t13', 't01'] },
        line: 'He cannot come back at low tide: @.', lineFr: 'Il ne peut pas revenir à marée basse : @.',
        hint: 'Low tide comes twice a day, 12 hours apart.', hintFr: 'La marée basse arrive deux fois par jour, à 12 heures d’écart.',
        why: 'At 19:00 and at 07:00 tomorrow it is high tide again, so he can come back then.', whyFr: 'À 19 h et à 7 h demain, c’est de nouveau la marée haute : il peut revenir.',
        slips: [
          { value: ['t13'], step: 2, key: 'one-low', msg: 'There are two low tides a day. 12 hours after 13:00 is another low tide.', msgFr: 'Il y a deux marées basses par jour. 12 heures après 13 h, c’est encore la marée basse.' },
          { value: ['t19', 't07'], step: 1, key: 'high-tides', msg: '19:00 and 07:00 are high tides. Those are the times he can come back.', msgFr: '19 h et 7 h sont des marées hautes. Ce sont les heures où il peut revenir.' },
        ],
      },
    ],
  },
  {
    id: 'p3', level: 'practice',
    prompt: 'Mr Bowen reads the depth board on the harbour wall. Only the metres have numbers. [[How deep is the water?]]',
    promptFr: 'M. Bowen lit l’échelle de marée sur le mur du port. Seuls les mètres ont des nombres. [[Quelle est la profondeur de l’eau ?]]',
    inlineSvg: BOARD,
    steps: [
      {
        title: 'How many spaces in one metre?', titleFr: 'Combien d’espaces dans un mètre ?',
        input: { type: 'number', after: 'spaces', afterFr: 'espaces', answer: '5' },
        line: 'From 2 m to 3 m there are @ spaces.', lineFr: 'De 2 m à 3 m, il y a @ espaces.',
        hint: 'Count the gaps between the marks, not the marks.', hintFr: 'Compte les espaces entre les traits, pas les traits.',
        slips: [{ value: '4', key: 'marks-not-spaces', msg: 'There are 4 small marks, but 5 spaces between 2 m and 3 m. Count the gaps.', msgFr: 'Il y a 4 petits traits, mais 5 espaces entre 2 m et 3 m. Compte les espaces.' }],
      },
      {
        key: true,
        title: 'What is one space worth?', titleFr: 'Combien vaut un espace ?',
        input: { type: 'number', before: '1 m ÷ <<5>> =', after: 'm', answer: '0.2' },
        hint: 'Share 1 metre between the spaces.', hintFr: 'Partage 1 mètre entre les espaces.',
        slips: [
          { value: '0.1', key: 'tenths', msg: 'That would be 10 spaces in a metre. There are 5, so each one is 1 ÷ 5 = 0.2 m.', msgFr: 'Ce serait 10 espaces dans un mètre. Il y en a 5, donc chacun vaut 1 ÷ 5 = 0.2 m.' },
          { value: '0.25', step: 1, key: 'four-marks', msg: '1 ÷ 4 = 0.25 counts the marks. There are 5 spaces, so each one is 0.2 m.', msgFr: '1 ÷ 4 = 0.25, c’est compter les traits. Il y a 5 espaces, donc chacun vaut 0.2 m.' },
        ],
      },
      {
        title: 'Read the depth of the water', titleFr: 'Lis la profondeur de l’eau',
        input: { type: 'number', before: 'Depth:', beforeFr: 'Profondeur :', after: 'm', answer: '2.6' },
        line: 'The water is @ m deep: 3 spaces of 0.2 m above 2 m.', lineFr: 'L’eau a une profondeur de @ m : 3 espaces de 0.2 m au-dessus de 2 m.',
        hint: 'Start at 2 m and count the spaces up to the water. Each space is <<0.2>> m.', hintFr: 'Pars de 2 m et compte les espaces jusqu’à l’eau. Chaque espace vaut <<0.2>> m.',
        slips: [{ value: '2.3', step: 2, key: 'counted-tenths', msg: 'You counted each space as 0.1 m. Each space is 0.2 m, so 3 spaces is 0.6 m.', msgFr: 'Tu as compté 0.1 m par espace. Chaque espace vaut 0.2 m, donc 3 espaces font 0.6 m.' }],
      },
    ],
  },
  {
    id: 'p4', level: 'practice',
    prompt: 'Mr Bowen wants to see how the depth changes from one high tide to the {{next high tide}}. [[How often should he measure the depth?]]',
    promptFr: 'M. Bowen veut voir comment la profondeur change d’une marée haute à la {{marée haute suivante}}. [[À quelle fréquence doit-il mesurer la profondeur ?]]',
    steps: [
      {
        title: 'How long from high tide to high tide?', titleFr: 'Combien de temps d’une marée haute à la suivante ?',
        input: { type: 'number', after: 'hours', afterFr: 'heures', answer: '12' },
        line: 'One high tide to the next: about @ hours.', lineFr: 'D’une marée haute à la suivante : environ @ heures.',
        hint: 'There are two high tides every day.', hintFr: 'Il y a deux marées hautes chaque jour.',
        slips: [
          { value: '24', key: 'one-a-day', msg: 'There are two high tides a day, so they are 12 hours apart.', msgFr: 'Il y a deux marées hautes par jour, donc elles sont à 12 heures d’écart.' },
          { value: '6', key: 'high-to-low', msg: '6 hours is from high tide to low tide.', msgFr: '6 heures, c’est de la marée haute à la marée basse.' },
        ],
      },
      {
        key: true,
        title: 'Which plan is best?', titleFr: 'Quel plan est le meilleur ?',
        input: { type: 'choice', options: [opt('h12', 'Every 12 hours', 'Toutes les 12 heures'), opt('h1', 'Every hour', 'Toutes les heures'), opt('m1', 'Every minute', 'Toutes les minutes')], answer: 'h1' },
        line: 'Plan: measure the depth every hour.', lineFr: 'Plan : mesurer la profondeur toutes les heures.',
        hint: 'He needs enough readings to see the water go down and come back up, but not too many.', hintFr: 'Il faut assez de mesures pour voir l’eau descendre et remonter, mais pas trop.',
        why: 'Every hour gives enough dots to draw the shape of the tide.', whyFr: 'Toutes les heures, on a assez de points pour tracer la forme de la marée.',
        slips: [
          { value: 'h12', step: 1, key: 'same-depth', msg: 'Every 12 hours he would always measure at high tide: the same depth every time. He would miss low tide.', msgFr: 'Toutes les 12 heures, il mesurerait toujours à marée haute : la même profondeur à chaque fois. Il raterait la marée basse.' },
          { value: 'm1', key: 'too-many', msg: 'Every minute is 720 readings! The depth changes slowly, so every hour is enough.', msgFr: 'Toutes les minutes, cela fait 720 mesures ! La profondeur change lentement, donc toutes les heures suffit.' },
        ],
      },
      {
        title: 'Count his readings, first and last', titleFr: 'Compte ses mesures, la première et la dernière',
        sub: 'He measures at 0 hours, 1 hour, 2 hours … up to 12 hours.', subFr: 'Il mesure à 0 heure, 1 heure, 2 heures … jusqu’à 12 heures.',
        input: { type: 'number', after: 'readings', afterFr: 'mesures', answer: '13' },
        line: 'From 0 to 12 hours, every hour: @ readings.', lineFr: 'De 0 à 12 heures, toutes les heures : @ mesures.',
        hint: 'Count the reading at 0 hours too.', hintFr: 'Compte aussi la mesure à 0 heure.',
        slips: [
          { value: '12', key: 'first-reading', msg: 'You missed one. Count the reading at 0 hours as well: 0, 1, 2 … 12 is 13 readings.', msgFr: 'Il en manque une. Compte aussi la mesure à 0 heure : 0, 1, 2 … 12, cela fait 13 mesures.' },
          { value: '720', step: 2, key: 'every-minute', msg: '720 readings is every minute. Every hour is enough.', msgFr: '720 mesures, c’est toutes les minutes. Toutes les heures suffit.' },
          { value: '2', step: 2, key: 'every-12', msg: 'Every 12 hours gives only 2 readings, both at high tide. Measure every hour.', msgFr: 'Toutes les 12 heures, il n’a que 2 mesures, toutes les deux à marée haute. Mesure toutes les heures.' },
        ],
      },
    ],
  },
  {
    id: 'p5', level: 'practice',
    prompt: 'Mr Bowen spends a day at the coast and writes down what he sees. [[Which things are effects of tides?]]',
    promptFr: 'M. Bowen passe une journée au bord de la mer et note ce qu’il voit. [[Lesquelles de ces choses sont des effets des marées ?]]',
    steps: [
      {
        title: 'Boats sit on the mud: which tide?', titleFr: 'Des bateaux sont posés sur la vase : quelle marée ?',
        input: { type: 'choice', options: [opt('high', 'High tide', 'Marée haute'), opt('low', 'Low tide', 'Marée basse')], answer: 'low' },
        line: 'Boats sit on the mud at low tide.', lineFr: 'Les bateaux sont posés sur la vase à marée basse.',
        hint: 'When is the water shallowest?', hintFr: 'Quand l’eau est-elle la moins profonde ?',
        slips: [{ value: 'high', key: 'high-mud', msg: 'At high tide the water is deepest, so the boats float.', msgFr: 'À marée haute, l’eau est la plus profonde, donc les bateaux flottent.' }],
      },
      {
        key: true,
        title: 'When is a coastal flood most likely?', titleFr: 'Quand une inondation sur la côte est-elle la plus probable ?',
        input: { type: 'choice', options: [opt('hw', 'High tide and a strong wind', 'Marée haute et vent fort'), opt('lc', 'Low tide and no wind', 'Marée basse et pas de vent'), opt('lw', 'Low tide and a strong wind', 'Marée basse et vent fort')], answer: 'hw' },
        line: 'Floods: a high tide and a strong wind push the sea onto the land.', lineFr: 'Inondations : une marée haute et un vent fort poussent la mer sur la terre.',
        hint: 'A flood needs the most water, pushed towards the land.', hintFr: 'Une inondation demande le plus d’eau possible, poussée vers la terre.',
        slips: [
          { value: 'lw', key: 'low-wind', msg: 'At low tide the sea is far out. A strong wind at high tide is what floods the coast.', msgFr: 'À marée basse, la mer est loin. C’est un vent fort à marée haute qui inonde la côte.' },
          { value: 'lc', key: 'low-calm', msg: 'At low tide with no wind the sea is far out and calm. A flood needs high tide and a strong wind.', msgFr: 'À marée basse et sans vent, la mer est loin et calme. Une inondation demande une marée haute et un vent fort.' },
        ],
      },
      {
        title: 'Tick the effects of tides', titleFr: 'Coche les effets des marées',
        input: { type: 'multi', options: [
          opt('mud', 'Boats sit on the mud at low tide.', 'Des bateaux sont posés sur la vase à marée basse.'),
          opt('birds', 'Birds eat shellfish on the beach at low tide.', 'Des oiseaux mangent des coquillages sur la plage à marée basse.'),
          opt('power', 'Moving sea water turns turbines to make electricity.', 'L’eau de mer qui bouge fait tourner des turbines pour produire de l’électricité.'),
          opt('waves', 'Big waves crash on the rocks on a windy day.', 'De grosses vagues frappent les rochers un jour de vent.'),
          opt('salt', 'The sea water tastes salty.', 'L’eau de mer est salée.'),
        ], answer: ['mud', 'birds', 'power'] },
        line: 'Effects of tides: boats on the mud, food for birds, electricity.', lineFr: 'Effets des marées : bateaux sur la vase, nourriture pour les oiseaux, électricité.',
        hint: 'A tide is the slow change in depth over hours. Which things happen because of it?', hintFr: 'Une marée, c’est le lent changement de profondeur pendant des heures. Qu’est-ce qui arrive à cause d’elle ?',
        slips: [
          { value: ['mud', 'birds', 'power', 'waves'], key: 'waves', msg: 'Waves are made by the wind. A tide is the slow rise and fall of the sea over hours.', msgFr: 'Les vagues sont faites par le vent. Une marée, c’est la mer qui monte et descend lentement pendant des heures.' },
          { value: ['mud', 'birds'], key: 'power', msg: 'Tides can make electricity too: moving tide water turns turbines. France has a tidal power station.', msgFr: 'Les marées peuvent aussi produire de l’électricité : l’eau de la marée fait tourner des turbines. La France a une usine marémotrice.' },
          { value: ['mud', 'birds', 'power', 'salt'], key: 'salt', msg: 'The sea is salty at every tide. The tide does not make it salty.', msgFr: 'La mer est salée à chaque marée. Ce n’est pas la marée qui la rend salée.' },
        ],
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════════
// CHALLENGE — the answer first; a slip opens the step it comes from
// ════════════════════════════════════════════════════════════════════════════

const challenge = [
  {
    id: 'c1', level: 'challenge',
    prompt: 'At a fishing harbour, the average depth of the water is {{3.8 m}}. The tidal range is {{3.6 m}}. [[How deep is the water at low tide?]]',
    promptFr: 'Dans un port de pêche, la profondeur moyenne de l’eau est de {{3.8 m}}. Le marnage est de {{3.6 m}}. [[Quelle est la profondeur de l’eau à marée basse ?]]',
    steps: [
      {
        title: 'Halve the tidal range', titleFr: 'Divise le marnage par deux',
        input: { type: 'number', before: '{{3.6}} ÷ 2 =', after: 'm', answer: '1.8' },
        hint: 'The water goes the same distance above the average as below it.', hintFr: 'L’eau monte au-dessus de la moyenne autant qu’elle descend en dessous.',
        why: 'At low tide the water is 1.8 m below the average. At high tide it is 1.8 m above.', whyFr: 'À marée basse, l’eau est 1.8 m sous la moyenne. À marée haute, elle est 1.8 m au-dessus.',
        slips: [{ value: '7.2', key: 'doubled', msg: 'Halve it: 3.6 ÷ 2, not 3.6 × 2.', msgFr: 'Divise par deux : 3.6 ÷ 2, pas 3.6 × 2.' }],
      },
      {
        title: 'Take it away from the average', titleFr: 'Soustrais-le de la moyenne',
        input: { type: 'number', before: '{{3.8}} − <<1.8>> =', after: 'm', answer: '2.0' },
        line: 'Low tide: 3.8 m − 1.8 m = @ m.', lineFr: 'Marée basse : 3.8 m − 1.8 m = @ m.',
        hint: 'Low tide is below the average, by half the tidal range.', hintFr: 'La marée basse est sous la moyenne, de la moitié du marnage.',
        why: 'Check: high tide is 3.8 + 1.8 = 5.6 m, and 5.6 − 2.0 = 3.6 m, the tidal range.', whyFr: 'Vérifie : la marée haute est à 3.8 + 1.8 = 5.6 m, et 5.6 − 2.0 = 3.6 m, le marnage.',
        slips: [
          { value: '0.2', step: 1, key: 'whole-range', msg: '3.8 − 3.6 takes away the whole range. Low tide is only half the range below the average.', msgFr: '3.8 − 3.6 enlève tout le marnage. La marée basse n’est qu’à la moitié du marnage sous la moyenne.' },
          { value: '5.6', step: 2, key: 'high-tide', msg: '5.6 m is the depth at high tide. Low tide is below the average: take away.', msgFr: '5.6 m, c’est la profondeur à marée haute. La marée basse est sous la moyenne : soustrais.' },
          { value: '7.4', step: 1, key: 'added-range', msg: '3.8 + 3.6 adds the whole range. Low tide is half the range below the average.', msgFr: '3.8 + 3.6 ajoute tout le marnage. La marée basse est à la moitié du marnage sous la moyenne.' },
        ],
      },
    ],
  },
  {
    id: 'c2', level: 'challenge',
    prompt: 'The picture shows the Earth from above the North Pole. Mr Bowen’s harbour is at **Q**. The time at Q is {{09:30}}. [[About when is the next high tide at Q?]]',
    promptFr: 'Le dessin montre la Terre vue du dessus du pôle Nord. Le port de M. Bowen est en **Q**. Il est {{9 h 30}} en Q. [[Vers quelle heure est la prochaine marée haute en Q ?]]',
    inlineSvg: EARTH_MOON, inlineSvgFr: EARTH_MOON_FR,
    steps: [
      {
        title: 'Where are the two bulges now?', titleFr: 'Où sont les deux bosses maintenant ?',
        input: { type: 'multi', options: [{ id: 'p', text: 'P' }, { id: 'q', text: 'Q' }, { id: 'r', text: 'R' }], answer: ['p', 'r'] },
        line: 'Bulges at @: high tide there.', lineFr: 'Bosses en @ : marée haute à ces endroits.',
        hint: 'The Earth is stretched along the line to the Moon.', hintFr: 'La Terre est étirée le long de la ligne vers la Lune.',
        slips: [
          { value: ['p'], key: 'one-bulge', msg: 'P faces the Moon, but the far side, R, has a bulge too.', msgFr: 'P est face à la Lune, mais le côté éloigné, R, a aussi une bosse.' },
          { value: ['q'], key: 'q-bulge', msg: 'Q is at right angles to the Moon: the water is low there.', msgFr: 'Q est à angle droit avec la Lune : l’eau y est basse.' },
        ],
      },
      {
        title: 'Is it high or low tide at Q?', titleFr: 'Marée haute ou marée basse en Q ?',
        input: { type: 'choice', options: [opt('high', 'High tide', 'Marée haute'), opt('low', 'Low tide', 'Marée basse')], answer: 'low' },
        line: 'At Q it is low tide now.', lineFr: 'En Q, c’est la marée basse maintenant.',
        hint: 'Q is halfway between the two bulges.', hintFr: 'Q est à mi-chemin entre les deux bosses.',
        slips: [{ value: 'high', step: 1, key: 'q-high', msg: 'Q is not in a bulge. It is at right angles to the Moon, so the water is low.', msgFr: 'Q n’est pas dans une bosse. Il est à angle droit avec la Lune, donc l’eau est basse.' }],
      },
      {
        title: 'How many hours to the next high tide?', titleFr: 'Combien d’heures jusqu’à la prochaine marée haute ?',
        input: { type: 'number', after: 'hours', afterFr: 'heures', answer: '6' },
        line: 'Low tide to high tide: about @ hours.', lineFr: 'De la marée basse à la marée haute : environ @ heures.',
        hint: 'From low tide to high tide is half of 12 hours.', hintFr: 'De la marée basse à la marée haute, c’est la moitié de 12 heures.',
        slips: [
          { value: '12', step: 2, key: 'from-high', msg: '12 hours is from one high tide to the next. Q has low tide now, so high tide is only 6 hours away.', msgFr: '12 heures, c’est d’une marée haute à la suivante. En Q, c’est la marée basse maintenant, donc la marée haute est dans 6 heures seulement.' },
          { value: '3', key: 'halfway', msg: '3 hours is only halfway from low tide to high tide.', msgFr: '3 heures, c’est seulement la moitié du chemin entre la marée basse et la marée haute.' },
        ],
      },
      {
        title: 'When is the next high tide at Q?', titleFr: 'Quand est la prochaine marée haute en Q ?',
        input: { type: 'choice', options: [opt('t1530', '15:30', '15 h 30'), opt('t2130', '21:30', '21 h 30'), opt('t1230', '12:30', '12 h 30'), opt('t0930', '09:30 tomorrow', '9 h 30 demain')], answer: 't1530' },
        line: 'Next high tide at Q: 09:30 + 6 hours = about @.', lineFr: 'Prochaine marée haute en Q : 9 h 30 + 6 heures = vers @.',
        hint: 'Add the hours to 09:30.', hintFr: 'Ajoute les heures à 9 h 30.',
        slips: [
          { value: 't2130', step: 2, key: 'thought-high', msg: '21:30 is 12 hours later. That is right only if Q has high tide now, but Q has low tide now.', msgFr: '21 h 30, c’est 12 heures plus tard. Ce serait juste si Q avait la marée haute maintenant, mais Q a la marée basse.' },
          { value: 't1230', step: 3, key: 'three-hours', msg: '12:30 is only 3 hours later. From low tide to high tide is 6 hours.', msgFr: '12 h 30, c’est seulement 3 heures plus tard. De la marée basse à la marée haute, il y a 6 heures.' },
          { value: 't0930', step: 3, key: 'one-a-day', msg: '09:30 tomorrow is 24 hours later. There are two high tides every day.', msgFr: '9 h 30 demain, c’est 24 heures plus tard. Il y a deux marées hautes chaque jour.' },
        ],
      },
    ],
  },
  {
    id: 'c3', level: 'challenge',
    prompt: 'The road to Noirmoutier island, in France, goes under the sea at every high tide. Today the morning high tide is at {{10:00}}. [[About when is the morning high tide 3 days later?]]',
    promptFr: 'La route vers l’île de Noirmoutier, en France (le passage du Gois), passe sous la mer à chaque marée haute. Aujourd’hui, la marée haute du matin est à {{10 h}}. [[Vers quelle heure est la marée haute du matin 3 jours plus tard ?]]',
    steps: [
      {
        title: 'How much later is high tide each day?', titleFr: 'Combien de temps plus tard chaque jour ?',
        input: { type: 'choice', options: [opt('m50', 'About 50 minutes later', 'Environ 50 minutes plus tard'), opt('same', 'At the same time', 'À la même heure'), opt('h12', '12 hours later', '12 heures plus tard')], answer: 'm50' },
        line: 'High tide comes about 50 minutes later each day.', lineFr: 'La marée haute arrive environ 50 minutes plus tard chaque jour.',
        hint: 'The Moon moves on a little every day, so the Earth must turn a little more.', hintFr: 'La Lune avance un peu chaque jour, donc la Terre doit tourner un peu plus.',
        slips: [
          { value: 'same', key: 'same-time', msg: 'The Moon moves on a little every day, so the harbour needs about 50 more minutes to face it again.', msgFr: 'La Lune avance un peu chaque jour, donc il faut environ 50 minutes de plus pour être de nouveau face à elle.' },
          { value: 'h12', key: 'twelve', msg: 'High tides are 12 hours apart on the same day. From one day to the next, high tide is about 50 minutes later.', msgFr: 'Les marées hautes sont à 12 heures d’écart le même jour. D’un jour à l’autre, la marée haute arrive environ 50 minutes plus tard.' },
        ],
      },
      {
        title: 'How many minutes later after 3 days?', titleFr: 'Combien de minutes plus tard après 3 jours ?',
        input: { type: 'number', before: '3 × <<50>> =', after: 'minutes', afterFr: 'minutes', answer: '150' },
        hint: 'Three days, 50 minutes each day.', hintFr: 'Trois jours, 50 minutes chaque jour.',
        slips: [{ value: '53', key: 'plus-not-times', msg: 'Multiply: 3 × 50, not 3 + 50.', msgFr: 'Multiplie : 3 × 50, pas 3 + 50.' }],
      },
      {
        title: 'Change 150 minutes into hours and minutes', titleFr: 'Change 150 minutes en heures et minutes',
        input: { type: 'choice', options: [{ id: 'a', text: '2 h 30 min' }, { id: 'b', text: '1 h 50 min' }, { id: 'c', text: '1 h 30 min' }], answer: 'a' },
        line: '150 minutes = @.', lineFr: '150 minutes = @.',
        hint: 'One hour is 60 minutes. How many 60s fit in 150?', hintFr: 'Une heure, c’est 60 minutes. Combien de fois 60 dans 150 ?',
        slips: [
          { value: 'b', key: 'hour-100', msg: 'An hour is 60 minutes, not 100. 150 = 60 + 60 + 30.', msgFr: 'Une heure, c’est 60 minutes, pas 100. 150 = 60 + 60 + 30.' },
          { value: 'c', key: 'ninety', msg: '1 h 30 min is only 90 minutes. 150 = 60 + 60 + 30.', msgFr: '1 h 30 min, c’est seulement 90 minutes. 150 = 60 + 60 + 30.' },
        ],
      },
      {
        title: 'About when is the morning high tide?', titleFr: 'Vers quelle heure est la marée haute du matin ?',
        input: { type: 'choice', options: [opt('t1230', '12:30', '12 h 30'), opt('t1150', '11:50', '11 h 50'), opt('t1050', '10:50', '10 h 50'), opt('t1000', '10:00', '10 h')], answer: 't1230' },
        line: 'In 3 days: 10:00 + 2 h 30 min = about @.', lineFr: 'Dans 3 jours : 10 h + 2 h 30 min = vers @.',
        hint: 'Add the extra time to 10:00.', hintFr: 'Ajoute le temps en plus à 10 h.',
        why: 'Every day the Moon moves on, so high tide is later and later: about 50 minutes a day.', whyFr: 'Chaque jour, la Lune avance, donc la marée haute arrive de plus en plus tard : environ 50 minutes par jour.',
        slips: [
          { value: 't1000', step: 1, key: 'no-change', msg: 'High tide is not at the same time every day. It comes about 50 minutes later each day.', msgFr: 'La marée haute n’est pas à la même heure chaque jour. Elle arrive environ 50 minutes plus tard chaque jour.' },
          { value: 't1050', step: 2, key: 'one-day', msg: '10:50 is only one day later. In 3 days it is 3 × 50 minutes later.', msgFr: '10 h 50, c’est seulement un jour plus tard. En 3 jours, c’est 3 × 50 minutes plus tard.' },
          { value: 't1150', step: 3, key: 'added-1h50', msg: '11:50 adds 1 h 50 min. But 150 minutes is 2 h 30 min, because an hour is 60 minutes.', msgFr: '11 h 50, c’est ajouter 1 h 50 min. Mais 150 minutes font 2 h 30 min, car une heure, c’est 60 minutes.' },
        ],
      },
    ],
  },
];

export const workbook = {
  title: 'Tides: step by step',
  titleFr: 'Les marées : pas à pas',
  items: [...focus, ...practice, ...challenge],
};
