// Overlay for Mr. David's Year 5 Maths lesson "Below Zero in Words" (classroom
// content/y5-math/U05_L3, branch feat/y5-math-pilot). Read by scripts/deck-to-pack.mjs:
//   node scripts/deck-to-pack.mjs C:/Users/sbowe/code/wt-y5eng/content/y5-math/U05_L3 \
//        --overlay packs/y5-math-u5-below-zero/overlay.mjs --server http://localhost:5197/classroom/
//
// Slide numbers are the deck's (1-25). The deck gained the Pip strip on 5 Nov 2026, so
// every key from 7 on moved up one; those checks keep their old ids (id: 'c7' on slide 8,
// and so on) so results stay attached if the pack was already published. The clarity pass
// of 5-6 Nov then swapped the strip and the key words (strip now slide 7, its check keeps
// 'c6'), turned slide 18's table into a widget (the pack shows table.svg, a still of it
// without the answer box), split the last word problems into three slides (checklist 24,
// exit 25) and gave the exit a new question, so the exit check has a new id, c25.
// The checks use the deck's own questions and
// answers (the reveals, the lift's moves, the plan's answer list); the wrong options are
// the slips the deck and the problem bank name (the minus sign dropped, the gap instead
// of the answer, adding when the word means down). Simple English: one idea a sentence.
//
// Practice: part "practice" is the step engine's 12-item Year 5 set, unchanged; part
// "words" is 9 new items from problem-bank.md's three step types (T1 across zero, T2
// temperatures from a table, T3 the difference between), 3 focus, 3 practice, 3 challenge.
// The bank's table and step method; no item repeats one of the 12 or a slide.
import { SAMPLE_SETS } from '../../src/stepPractice/samples/index.js'
import { numberLine } from '../../src/stepPractice/samples/figures.js'
import { readFileSync } from 'node:fs'

const STORY_STRIP = readFileSync(new URL('./story-strip.svg', import.meta.url), 'utf8')
const TABLE = readFileSync(new URL('./table.svg', import.meta.url), 'utf8')

// ------------------------------------------------------------------ review
const slides = {
  1: {
    patch: {
      subtitle: 'Go back through the lesson. Answer each question to go on.',
      card: { text: 'Mr. David is in the lift on **floor 4**. He goes **down 6 floors** to his car. Which floor is he on now? Make a **guess**. Then go on.' },
    },
  },
  2: { patch: { title: 'In This Lesson You Will…' } },
  3: {
    widget: 'image',
    alt: 'A building with floors 5 to B3, with two columns: the number (5 to −3) and the button (5 to B3). The lift is on floor 2. The words say: Go down 5 floors. 2 − 5 = ?',
    patch: { caption: 'The lift goes down to **G** (floor 0) first. Then it goes on down: 2 − 5 = −3, floor B3.' },
  },
  4: {
    check: {
      q: 'Mr. David is on floor 4. He goes down 6 floors. Which floor is he on now?',
      options: ['2', '*−2', '−10'],
      exp: 'Go down 4 floors to G (floor 0). Then go down 2 more. 4 − 6 = −2. That is two floors under the ground.',
    },
  },
  5: {
    alt: 'Two lift panels. In Dublin the buttons are 0, −1 and −2. In Beijing they are B1, B2 and B3. Orange rings show −2 and B2: the same floor.',
    check: {
      q: 'A lift button says **B3**. Which floor is that?',
      options: ['3', '*−3', '0'],
      exp: 'B means below the ground. B3 is 3 floors under G. So it is floor −3.',
    },
  },
  6: { alt: 'Snow on the ground and on the trees in Sa Pa, Vietnam, in 2011.' },
  // Slide 7 is the "What happens next?" strip. Its widget still would be one panel and three
  // "?", so the slide shows all four panels instead (story-strip.svg, a still of the
  // classroom widget with panel 4 open, laid out 2 x 2; captions at 30 and scale labels at
  // 28, so they stay above 9 px on a phone) and the strip's question is a check.
  7: {
    widget: 'check',
    patch: {
      eyebrow: 'A story',
      icon: 'Thermometer',
      inlineSvg: STORY_STRIP,
      caption: 'Pip is an otter. Pip goes camping on Fansipan. Look at the four pictures.',
    },
    check: { id: 'c6',
      q: 'At midnight it is 2 °C. It falls by 3 °C every 3 hours. What does the thermometer say at 6 a.m.?',
      options: ['−1 °C', '*−4 °C', '4 °C'],
      exp: 'It falls two more times: at 3 a.m. and at 6 a.m. That is 6 °C. Jump down 2 to 0. Then jump down 4 more. 2 − 6 = −4 °C.',
    },
  },
  8: {
    // the vote converts by itself; the overlay only checks the explanation reads well
    check: { id: 'c7', merge: true, q: '−3 °C rises by 8 °C. What is the temperature now?', exp: '**Rises** means it gets warmer. Jump up 3 to 0. Then jump up 5 more. −3 + 8 = 5 °C. B is wrong: −11 °C is colder than −3 °C.' },
  },
  10: {
    patch: {
      content: 'Draw a number line in your book. Put **0** in the middle.\n\n**a** 6 − 15\n**b** −12 + 30\n**c** 40 − 75',
      reveal: { label: 'Check b and c', answer: '**b** 12 to 0, then 18 more: **18**.\n**c** 40 to 0, then 35 more: **−35**.' },
    },
    keepReveal: true,
    check: { id: 'c9',
      q: '**a** What is 6 − 15?',
      options: ['9', '*−9', '−21'],
      exp: 'Jump down 6 to 0. Then jump down 9 more. 6 − 15 = −9.',
    },
  },
  11: {
    check: { id: 'c10',
      q: 'Estimate **−98 + 203**. Which one is best?',
      options: ['*−100 + 200 = 100', '−100 − 200 = −300', '100 + 200 = 300'],
      exp: '−98 is about −100. 203 is about 200. So the answer is about 100. The exact answer is 105.',
    },
  },
  12: { patch: { content: 'Mr. David marked his own homework. He gave himself **4 out of 4**.\n\nWhich answers are **wrong**? Think. Then look.' } },
  14: {
    widget: 'check',
    patch: {
      layout: 'callout',
      eyebrow: 'Up or down?',
      title: 'Add or Subtract?',
      content: 'Read the sentence. Does it go **up** or **down**?\n\nUp means **add (+)**. Down means **subtract (−)**.',
      caption: null,
      reveal: { label: 'One more', prompt: 'Mr. David **owes 5 000 dong less**. Up or down?', answer: '**Up: add.** He owes less: −5 000 goes up towards 0.' },
    },
    keepReveal: true,
    check: { id: 'c13',
      q: 'The diver goes 3 metres **deeper**. Up or down?',
      options: ['Up: add (+)', '*Down: subtract (−)'],
      exp: '**Deeper** means further down in the water. Down means subtract.',
    },
  },
  16: {
    patch: { text: '**−4** and **5**' },
    check: { id: 'c15', merge: true, q: 'What is the **difference between −4 and 5**?', exp: 'From −4 up to 0 is 4. From 0 up to 5 is 5. The gap is 4 + 5 = 9. A is wrong: 5 − 4 = 1 forgets that −4 is below 0.' },
  },
  18: {
    widget: 'check',
    patch: {
      inlineSvg: TABLE,
      content: '**a** Seoul gets **10 °C warmer**. What is the new temperature?\n**b** Sa Pa **falls by 4 °C**. What is the new temperature?\n**c** What is the **difference** between Hội An and Seoul?\n**d** Which place is the **coldest**?',
      reveal: { label: 'Check a, c and d', answer: '**a** −7 + 10 = 3. The new temperature is **3 °C**.\n**c** 7 + 19 = 26. The difference is **26 °C**.\n**d** **Harbin** is the coldest: −21 °C.' },
    },
    keepReveal: true,
    check: { id: 'c17',
      q: '**b** Sa Pa is −2 °C. It **falls by 4 °C**. What is the new temperature?',
      options: ['2 °C', '*−6 °C', '6 °C'],
      exp: '**Falls** means subtract. Jump down 2 to 0. Then jump down 2 more. −2 − 4 = −6 °C.',
    },
  },
  19: { patch: { eyebrow: 'Write the number sentence first' } },
  20: {
    patch: { sub: 'Choose the story that matches. Then write your own story in your book. Use a temperature, a lift or money.' },
    check: { id: 'c19',
      q: 'Which story matches **3 − 8 = −5**?',
      options: [
        '*It is 3 °C. It falls by 8 °C. Now it is −5 °C.',
        'It is 3 °C. It rises by 8 °C. Now it is −5 °C.',
        'It is −3 °C. It falls by 8 °C. Now it is 5 °C.',
      ],
      exp: 'Start at 3. **Falls** means down. So subtract 8. 3 − 8 = −5.',
    },
  },
  24: { patch: { content: '> Look in your book. Do you have the **5 notes** from the lesson?' } },
  25: {
    keepReveal: true,
    patch: {
      card: { text: 'At 9 p.m. it is **4 °C**. At 6 a.m. it is **−5 °C**.' },
      reveal: { label: 'Check b', prompt: '**b** Then it **rises by 8 °C**. What is the temperature now?', answer: '−5 + 8 = **3 °C**.' },
    },
    check: { id: 'c25',
      q: 'At 9 p.m. it is 4 °C. At 6 a.m. it is −5 °C. What is the difference between the two temperatures?',
      options: ['1 °C', '*9 °C', '−9 °C'],
      exp: 'From −5 up to 0 is 5. From 0 up to 4 is 4. The gap is 5 + 4 = 9 °C. A difference is never negative.',
    },
  },
}

// ------------------------------------------------------------------ practice: 9 new items
// The bank's table (T2), made-up numbers, one morning in January.
const TABLE_ROWS = [
  ['Fansipan (top)', '−4 °C'], ['Sa Pa', '1 °C'], ['Hà Nội', '12 °C'], ['Tokyo', '3 °C'],
  ['Toronto', '−9 °C'], ['Helsinki', '−13 °C'], ['Bangkok', '27 °C'],
]
/** The table with the rows this item needs marked as given. */
const table = (...places) => ({
  head: ['Place', 'Temperature'],
  caption: 'One morning in January',
  rows: TABLE_ROWS.map(([p, t]) => [p, places.includes(p) ? `{{${t}}}` : t]),
})
const upDown = () => [{ id: 'up', text: 'Up: add (+)' }, { id: 'down', text: 'Down: subtract (−)' }]

const words = [
  // ---------------- focus
  {
    id: 'wf1', level: 'focus',
    prompt: 'Look at the table. In Tokyo it gets {{8 °C}} **colder**. [[What is the new temperature in Tokyo?]]',
    table: table('Tokyo'),
    steps: [
      {
        title: 'Find Tokyo in the table',
        input: { type: 'number', before: 'Tokyo starts at', after: '°C', answer: '3' },
        hint: 'Find the row that says Tokyo.',
        slips: [{ value: '1', msg: '1 °C is Sa Pa. Find the row that says Tokyo.' }],
      },
      {
        title: 'Does "colder" mean up or down?',
        input: { type: 'choice', options: upDown(), answer: 'down' },
        line: 'Colder: subtract.',
        hint: 'When it gets colder, the temperature goes down.',
        slips: [{ value: 'up', msg: 'Colder means the temperature goes down. Down means subtract.' }],
      },
      {
        title: 'Write the number sentence',
        input: { type: 'choice', options: [{ id: 'a', text: '3 − 8' }, { id: 'b', text: '3 + 8' }, { id: 'c', text: '8 − 3' }], answer: 'a' },
        line: 'Number sentence: 3 − 8',
        hint: 'Start with Tokyo’s temperature. Then take away 8.',
        slips: [
          { value: 'b', step: 2, msg: '3 + 8 adds. Colder means down, so subtract.' },
          { value: 'c', msg: 'Start with the temperature, 3. Then take away the 8 degrees.' },
        ],
      },
      {
        title: 'Jump down to 0 first',
        input: { type: 'number', before: 'From {{3}} down to 0 is', after: 'degrees', answer: '3' },
        hint: 'How far is 3 from 0?',
      },
      {
        title: 'How many degrees are left?',
        input: { type: 'number', before: '{{8}} − <<3>> =', after: 'degrees', answer: '5' },
        hint: 'It goes down 8 degrees in all. 3 are done.',
      },
      {
        title: 'Write the new temperature',
        input: { type: 'number', before: '{{3}} − {{8}} =', after: '°C', answer: '−5' },
        line: 'Tokyo: {{3}} − {{8}} = @ °C',
        hint: 'From 0, go down the degrees that are left.',
        why: 'Zero is a bridge: 3 down to 0, then 5 more. 3 − 8 = −5 °C.',
        slips: [
          { value: '5', msg: 'You went 5 degrees below 0. Below 0 needs a minus sign: −5 °C.' },
          { value: '11', step: 2, msg: '11 adds 3 and 8. Colder means subtract.' },
        ],
      },
    ],
  },
  {
    id: 'wf2', level: 'focus',
    prompt: 'Start at {{13}}. Take away {{20}}. Use zero as a bridge. [[What is 13 − 20?]]',
    inlineSvg: numberLine({ min: -8, max: 14, given: [13] }),
    steps: [
      {
        title: 'Jump down to 0 first',
        input: { type: 'number', before: 'From {{13}} down to 0 is', after: 'jumps', answer: '13' },
        hint: 'How far is 13 from 0?',
      },
      {
        title: 'How many jumps are left?',
        input: { type: 'number', before: '{{20}} − <<13>> =', after: 'jumps', answer: '7' },
        hint: 'You take away 20 in all. 13 jumps are done.',
        slips: [{ value: '33', msg: 'Take away the jumps you have done: 20 − 13.' }],
      },
      {
        title: 'Which side of 0 do you land?',
        input: { type: 'choice', options: [{ id: 'below', text: 'Below 0: a negative number' }, { id: 'above', text: 'Above 0: a positive number' }], answer: 'below' },
        line: 'It lands below 0.',
        hint: 'After 0 you keep going down.',
        slips: [{ value: 'above', msg: 'After 0 you keep jumping down, so you land below 0.' }],
      },
      {
        title: 'Write the answer with its sign',
        input: { type: 'number', before: '{{13}} − {{20}} =', answer: '−7' },
        line: '{{13}} − {{20}} = @',
        hint: 'Below 0 needs a minus sign.',
        why: '13 jumps down to 0, then 7 more: −7.',
        slips: [
          { value: '7', step: 3, msg: 'You land below 0, so it needs a minus sign: −7.' },
          { value: '33', step: 2, msg: '33 adds 13 and 20. Take away moves down.' },
        ],
      },
    ],
  },
  {
    id: 'wf3', level: 'focus',
    prompt: 'Look at {{−10}} and {{10}} on the number line. [[What is the difference between them?]]',
    inlineSvg: numberLine({ min: -11, max: 11, given: [-10, 10] }),
    steps: [
      {
        title: 'Count from −10 up to 0',
        input: { type: 'number', before: 'From {{−10}} to 0 is', after: 'steps', answer: '10' },
        hint: 'Count the steps from −10 to 0.',
        slips: [{ value: '−10', msg: 'Count the steps, not the number. From −10 to 0 is 10 steps.' }],
      },
      {
        title: 'Count from 0 up to 10',
        input: { type: 'number', before: 'From 0 to {{10}} is', after: 'steps', answer: '10' },
        hint: 'Count the steps from 0 to 10.',
      },
      {
        title: 'Add the two parts together',
        input: { type: 'number', before: '<<10>> + <<10>> =', after: 'steps', answer: '20' },
        line: 'The difference between {{−10}} and {{10}} is @.',
        hint: 'The gap is the part below 0 and the part above 0.',
        why: 'A difference is a gap. Count up to 0, then on from 0.',
        slips: [
          { value: '0', step: 1, msg: '10 − 10 = 0 forgets that −10 is below zero. Count up to 0, then on to 10.' },
          { value: '−20', msg: 'A difference is a gap. It is never negative.' },
        ],
      },
    ],
  },
  // ---------------- practice
  {
    id: 'wp1', level: 'practice',
    prompt: 'Look at the table. On Fansipan it gets {{10 °C}} **warmer**. [[What is the new temperature on Fansipan?]]',
    table: table('Fansipan (top)'),
    steps: [
      {
        title: 'Find Fansipan in the table',
        input: { type: 'number', before: 'Fansipan starts at', after: '°C', answer: '−4' },
        hint: 'Find the row that says Fansipan. Keep the minus sign.',
        slips: [{ value: '4', msg: 'Fansipan is below zero: −4 °C. Keep the minus sign.' }],
      },
      {
        key: true,
        title: 'Does "warmer" mean up or down?',
        input: { type: 'choice', options: upDown(), answer: 'up' },
        line: 'Warmer: add.',
        hint: 'When it gets warmer, the temperature goes up.',
        slips: [{ value: 'down', msg: 'Warmer means the temperature goes up. Up means add.' }],
      },
      {
        title: 'Jump up to 0 first',
        input: { type: 'number', before: 'From {{−4}} up to 0 is', after: 'degrees', answer: '4' },
        hint: 'How far is −4 from 0?',
      },
      {
        title: 'How many degrees are left?',
        input: { type: 'number', before: '{{10}} − <<4>> =', after: 'degrees', answer: '6' },
        hint: 'It goes up 10 degrees in all. 4 are done.',
      },
      {
        title: 'Write the new temperature',
        input: { type: 'number', before: '{{−4}} + {{10}} =', after: '°C', answer: '6' },
        line: 'Fansipan: {{−4}} + {{10}} = @ °C',
        hint: 'From 0, go up the degrees that are left.',
        slips: [
          { value: '−14', step: 2, msg: '−14 went down. Warmer means up, so add.' },
          { value: '14', step: 1, msg: '14 starts at 4. Fansipan starts below zero, at −4 °C.' },
          { value: '−6', step: 3, msg: 'After 0 you are above zero, so the answer is not negative: 6 °C.' },
        ],
      },
    ],
  },
  {
    id: 'wp2', level: 'practice',
    prompt: 'Start at {{−15}}. Add {{32}}. Use zero as a bridge. [[What is −15 + 32?]]',
    steps: [
      {
        key: true,
        title: 'Jump up to 0 first',
        input: { type: 'number', before: 'From {{−15}} up to 0 is', after: 'jumps', answer: '15' },
        hint: 'How far is −15 from 0?',
        slips: [{ value: '−15', msg: 'Count the jumps, not the number. From −15 to 0 is 15 jumps.' }],
      },
      {
        title: 'How many jumps are left?',
        input: { type: 'number', before: '{{32}} − <<15>> =', after: 'jumps', answer: '17' },
        hint: 'You add 32 in all. 15 jumps are done.',
      },
      {
        title: 'Write the answer',
        input: { type: 'number', before: '{{−15}} + {{32}} =', answer: '17' },
        line: '{{−15}} + {{32}} = @',
        hint: 'From 0, go up the jumps that are left.',
        slips: [
          { value: '47', step: 1, msg: '47 starts at 15. −15 is below zero, so the first 15 jumps only get you to 0.' },
          { value: '−17', step: 2, msg: 'After 0 you are above zero, so the answer is not negative: 17.' },
          { value: '−47', msg: '−47 went down. Add means go up.' },
        ],
      },
    ],
  },
  {
    id: 'wp3', level: 'practice',
    prompt: 'In the morning it is {{−4 °C}}. In the afternoon it is {{6 °C}}. [[How much warmer is the afternoon?]]',
    inlineSvg: numberLine({ min: -5, max: 7, given: [-4, 6] }),
    steps: [
      {
        key: true,
        title: 'Count from −4 up to 0',
        input: { type: 'number', before: 'From {{−4}} to 0 is', after: 'degrees', answer: '4' },
        hint: 'How far is −4 from 0?',
        slips: [{ value: '−4', msg: 'Count the degrees, not the number. From −4 to 0 is 4 degrees.' }],
      },
      {
        title: 'Count from 0 up to 6',
        input: { type: 'number', before: 'From 0 to {{6}} is', after: 'degrees', answer: '6' },
        hint: 'Count up from 0 to 6.',
      },
      {
        title: 'How much warmer?',
        input: { type: 'number', before: '<<4>> + <<6>> =', after: 'degrees', answer: '10' },
        line: 'From {{−4 °C}} to {{6 °C}} is @ degrees.',
        hint: 'Add the part below 0 and the part above 0.',
        slips: [
          { value: '2', step: 1, msg: '6 − 4 = 2 treats −4 as above zero. It is 4 below, so count up to 0 first.' },
          { value: '−10', msg: 'How much warmer is a gap. It is never negative.' },
        ],
      },
    ],
  },
  // ---------------- challenge
  {
    id: 'wc1', level: 'challenge',
    prompt: 'Look at the table. In Hà Nội the temperature **drops** by {{15 °C}}. [[What is the new temperature in Hà Nội?]]',
    table: table('Hà Nội'),
    steps: [
      {
        title: 'Find Hà Nội in the table',
        input: { type: 'number', before: 'Hà Nội starts at', after: '°C', answer: '12' },
        hint: 'Find the row that says Hà Nội.',
      },
      {
        title: 'Does "drops" mean up or down?',
        input: { type: 'choice', options: upDown(), answer: 'down' },
        line: 'Drops: subtract.',
        hint: 'When a temperature drops, it goes down.',
        slips: [{ value: 'up', msg: 'Drops means the temperature goes down. Down means subtract.' }],
      },
      {
        title: 'Jump down to 0 first',
        input: { type: 'number', before: 'From {{12}} down to 0 is', after: 'degrees', answer: '12' },
        hint: 'How far is 12 from 0?',
      },
      {
        title: 'How many degrees are left?',
        input: { type: 'number', before: '{{15}} − <<12>> =', after: 'degrees', answer: '3' },
        hint: 'It drops 15 degrees in all. 12 are done.',
      },
      {
        title: 'Write the new temperature',
        input: { type: 'number', before: '{{12}} − {{15}} =', after: '°C', answer: '−3' },
        line: 'Hà Nội: {{12}} − {{15}} = @ °C',
        hint: 'From 0, go down the degrees that are left.',
        slips: [
          { value: '27', step: 2, msg: '27 adds. Drops means down, so subtract.' },
          { value: '3', step: 4, msg: 'You went 3 degrees past 0, so it is below zero: −3 °C.' },
          { value: '−27', step: 1, msg: 'Hà Nội starts above zero, at 12 °C, not −12 °C.' },
        ],
      },
    ],
  },
  {
    id: 'wc2', level: 'challenge',
    prompt: 'Start at {{9}}. Take away {{130}}. [[What is 9 − 130?]]',
    steps: [
      {
        title: 'Jump down to 0 first',
        input: { type: 'number', before: 'From {{9}} down to 0 is', after: 'jumps', answer: '9' },
        hint: 'How far is 9 from 0?',
      },
      {
        title: 'How many jumps are left?',
        input: { type: 'number', before: '{{130}} − <<9>> =', after: 'jumps', answer: '121' },
        hint: 'You take away 130 in all. 9 jumps are done.',
      },
      {
        title: 'Write the answer with its sign',
        input: { type: 'number', before: '{{9}} − {{130}} =', answer: '−121' },
        line: '{{9}} − {{130}} = @',
        hint: 'Below 0 needs a minus sign.',
        slips: [
          { value: '121', step: 2, msg: '121 is how far you go past 0. Below 0 needs a minus sign: −121.' },
          { value: '−139', step: 1, msg: '−139 starts the 130 jumps at 0. Start at 9: the first 9 jumps only get you to 0.' },
          { value: '139', msg: '139 adds 9 and 130. Take away moves down.' },
        ],
      },
    ],
  },
  {
    id: 'wc3', level: 'challenge',
    prompt: 'Look at the table. [[What is the difference between the temperatures in Bangkok and Helsinki?]]',
    table: table('Bangkok', 'Helsinki'),
    steps: [
      {
        title: 'Find the two temperatures',
        input: { type: 'choice', options: [{ id: 'a', text: '27 °C and −13 °C' }, { id: 'b', text: '27 °C and 13 °C' }, { id: 'c', text: '27 °C and −9 °C' }], answer: 'a' },
        line: 'Bangkok 27 °C, Helsinki −13 °C.',
        hint: 'Find the rows that say Bangkok and Helsinki.',
        slips: [
          { value: 'b', msg: 'Helsinki is below zero: −13 °C.' },
          { value: 'c', msg: '−9 °C is Toronto. Find Helsinki.' },
        ],
      },
      {
        title: 'Count from −13 up to 0',
        input: { type: 'number', before: 'From {{−13}} to 0 is', after: 'degrees', answer: '13' },
        hint: 'How far is −13 from 0?',
      },
      {
        title: 'Count from 0 up to 27',
        input: { type: 'number', before: 'From 0 to {{27}} is', after: 'degrees', answer: '27' },
        hint: 'Count up from 0 to 27.',
      },
      {
        title: 'Add the two parts together',
        input: { type: 'number', before: '<<13>> + <<27>> =', after: 'degrees', answer: '40' },
        line: 'From {{−13 °C}} to {{27 °C}} is @ degrees.',
        hint: 'Add the part below 0 and the part above 0.',
        slips: [
          { value: '14', step: 2, msg: '27 − 13 = 14 treats −13 as above zero. Count up to 0 first, then on to 27.' },
          { value: '36', step: 1, msg: '36 uses Toronto (−9 °C). Helsinki is −13 °C.' },
          { value: '−40', msg: 'A difference is a gap. It is never negative.' },
        ],
      },
    ],
  },
]

export default {
  slug: 'y5-math-u5-below-zero',
  class_key: 'math:Year 5',
  title: 'Below Zero in Words',
  teacher: 'Mr. David',
  unit: 'Unit 5',
  langs: ['en'],
  from: { bank: 'classroom feat/y5-math-pilot: content/y5-math/U05_L3/problem-bank.md (T1, T2, T3); step-practice samples @ 0c18ffb4' },
  slides,
  practice: [
    { id: 'practice', title: 'Practice: step by step', titleVn: 'Luyện tập: từng bước', set: SAMPLE_SETS.y5maths },
    { id: 'words', title: 'Practice: word problems', titleVn: 'Luyện tập: bài toán có lời văn', set: { title: 'Word problems: step by step', signed: true, items: words } },
  ],
}
