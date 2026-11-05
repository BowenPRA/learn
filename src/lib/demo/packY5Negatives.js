// The demo lesson pack: Year 5 Maths, Unit 5, adding and subtracting with negative
// numbers (Mr. David's class). Original slides and questions written for PRA Learn,
// not taken from any book. The practice part is the step-practice sample set
// (src/stepPractice/samples, 12 items). Built in JS so the figures can be drawn by
// the engine's helpers; a published pack holds the same thing as plain JSON (the
// SVG strings already drawn), which is what `JSON.parse(JSON.stringify(...))` at
// the end makes sure of.
import { numberLine, floors } from '../../stepPractice/samples/figures.js'
import { SAMPLE_SETS } from '../../stepPractice/samples/index.js'

const BLUE = '#116DFF'
const GREEN = '#2F7D14'
const VIOLET = '#7C5CFF'
const CORAL = '#D2452F'

const slides = [
  {
    layout: 'hero',
    eyebrow: 'Year 5 Maths · Unit 5', eyebrowVn: 'Toán Year 5 · Unit 5',
    title: 'Adding and subtracting with negative numbers',
    titleVn: 'Cộng và trừ với số âm',
    subtitle: 'Go back through the lesson. Answer each question to go on.',
    subtitleVn: 'Em xem lại bài học. Trả lời từng câu hỏi để đi tiếp.',
    card: { badge: 'Mr. David', text: 'You will need a pencil and your maths book.', textVn: 'Em chuẩn bị bút chì và vở toán nhé.' },
  },
  {
    layout: 'split', accent: BLUE, icon: 'Thermometer',
    title: 'Numbers below zero', titleVn: 'Số nhỏ hơn 0',
    content: 'A **negative number** is less than zero. We write it with a minus sign: **−3** is three below zero.\n\nOn a number line, negative numbers are on the **left** of 0.',
    contentVn: '**Số âm** là số nhỏ hơn 0. Mình viết số âm với dấu trừ: **−3** là thấp hơn 0 ba đơn vị.\n\nTrên trục số, số âm nằm **bên trái** số 0.',
    inlineSvg: numberLine({ min: -6, max: 6, given: [-3] }),
    check: {
      id: 'c1',
      q: 'Which number is less than zero?', qVn: 'Số nào nhỏ hơn 0?',
      options: [{ val: 'A', text: '3' }, { val: 'B', text: '0' }, { val: 'C', text: '−4' }],
      correct: 'C',
      exp: '−4 has a minus sign. It is 4 below zero, on the left of 0.',
      expVn: '−4 có dấu trừ. Số này thấp hơn 0 bốn đơn vị, nằm bên trái số 0.',
    },
  },
  {
    layout: 'split', accent: GREEN, icon: 'ArrowRight',
    title: 'Adding: move right', titleVn: 'Phép cộng: đi sang phải',
    content: 'To add, start at the first number and **jump right**.\n\n**−4 + 6**: start at −4. Four jumps take you to 0. Two more take you to **2**.',
    contentVn: 'Khi cộng, em bắt đầu từ số thứ nhất và **nhảy sang phải**.\n\n**−4 + 6**: bắt đầu ở −4. Bốn bước đưa em đến 0. Thêm hai bước nữa là đến **2**.',
    inlineSvg: numberLine({ min: -5, max: 4, given: [-4], jumps: [{ from: -4, to: 0 }, { from: 0, to: 2 }] }),
    check: {
      id: 'c2',
      q: 'What is −3 + 5?', qVn: '−3 + 5 bằng bao nhiêu?',
      options: [{ val: 'A', text: '2' }, { val: 'B', text: '−8' }, { val: 'C', text: '8' }],
      correct: 'A',
      exp: 'Start at −3. Three jumps right reach 0, and two more reach 2.',
      expVn: 'Bắt đầu ở −3. Ba bước sang phải đến 0, thêm hai bước nữa đến 2.',
    },
  },
  {
    layout: 'split', accent: CORAL, icon: 'ArrowLeft', side: 'left',
    title: 'Subtracting: move left', titleVn: 'Phép trừ: đi sang trái',
    content: 'To subtract, start at the first number and **jump left**.\n\n**3 − 5**: start at 3. Three jumps take you to 0. Two more take you to **−2**.',
    contentVn: 'Khi trừ, em bắt đầu từ số thứ nhất và **nhảy sang trái**.\n\n**3 − 5**: bắt đầu ở 3. Ba bước đưa em đến 0. Thêm hai bước nữa là đến **−2**.',
    inlineSvg: numberLine({ min: -4, max: 5, given: [3], jumps: [{ from: 3, to: 0 }, { from: 0, to: -2 }] }),
    check: {
      id: 'c3',
      q: 'What is 2 − 6?', qVn: '2 − 6 bằng bao nhiêu?',
      options: [{ val: 'A', text: '4' }, { val: 'B', text: '−4' }, { val: 'C', text: '−8' }],
      correct: 'B',
      exp: 'Start at 2. Two jumps left reach 0, and four more reach −4.',
      expVn: 'Bắt đầu ở 2. Hai bước sang trái đến 0, thêm bốn bước nữa đến −4.',
    },
  },
  {
    layout: 'steps', accent: VIOLET, icon: 'Footprints',
    title: 'Crossing zero: count in two parts', titleVn: 'Đi qua số 0: đếm hai phần',
    content: 'The temperature goes from **−3 °C** to **5 °C**. How much did it rise?',
    contentVn: 'Nhiệt độ tăng từ **−3 °C** lên **5 °C**. Nhiệt độ đã tăng bao nhiêu?',
    steps: [
      { text: 'Count up to 0: from −3 to 0 is **3** degrees.', textVn: 'Đếm lên đến 0: từ −3 đến 0 là **3** độ.' },
      { text: 'Count on from 0: from 0 to 5 is **5** degrees.', textVn: 'Đếm tiếp từ 0: từ 0 đến 5 là **5** độ.' },
      { text: 'Add the two parts: 3 + 5 = **8** degrees.', textVn: 'Cộng hai phần: 3 + 5 = **8** độ.' },
    ],
    check: {
      id: 'c4',
      q: 'The temperature goes from −2 °C to 6 °C. How many degrees did it rise?',
      qVn: 'Nhiệt độ tăng từ −2 °C lên 6 °C. Nhiệt độ đã tăng bao nhiêu độ?',
      options: [{ val: 'A', text: '4 degrees', textVn: '4 độ' }, { val: 'B', text: '8 degrees', textVn: '8 độ' }, { val: 'C', text: '6 degrees', textVn: '6 độ' }],
      correct: 'B',
      exp: 'From −2 to 0 is 2 degrees. From 0 to 6 is 6 more. 2 + 6 = 8.',
      expVn: 'Từ −2 đến 0 là 2 độ. Từ 0 đến 6 là thêm 6 độ. 2 + 6 = 8.',
    },
  },
  {
    layout: 'split', accent: BLUE, icon: 'Building2', ratio: 55,
    title: 'Floors below the ground', titleVn: 'Các tầng dưới mặt đất',
    content: 'In a lift, the ground floor is **0**. The floors under the ground are **−1, −2, −3**.\n\nA lift on floor **2** goes down **5** floors. It passes 0 and stops at floor **−3**.',
    contentVn: 'Trong thang máy, tầng trệt là **0**. Các tầng dưới mặt đất là **−1, −2, −3**.\n\nThang máy ở tầng **2** đi xuống **5** tầng. Thang máy đi qua 0 và dừng ở tầng **−3**.',
    inlineSvg: floors({ min: -4, max: 4, given: [2] }),
    inlineSvgVn: floors({ min: -4, max: 4, given: [2], groundWord: 'mặt đất' }),
    check: {
      id: 'c5',
      q: 'A lift is on floor 1. It goes down 3 floors. Which floor is it on now?',
      qVn: 'Thang máy ở tầng 1. Thang máy đi xuống 3 tầng. Bây giờ thang máy ở tầng nào?',
      options: [{ val: 'A', text: '−2' }, { val: 'B', text: '2' }, { val: 'C', text: '−4' }],
      correct: 'A',
      exp: 'From floor 1, one floor down is 0. Two more floors down is −2.',
      expVn: 'Từ tầng 1, xuống một tầng là 0. Xuống thêm hai tầng là −2.',
    },
  },
  {
    layout: 'compare',
    title: 'Words that tell you which way', titleVn: 'Những từ cho em biết đi về phía nào',
    columns: [
      { heading: 'Add: move up or right', headingVn: 'Cộng: đi lên hoặc sang phải', accent: GREEN, icon: 'TrendingUp',
        content: '**rises**, **goes up**, **gets warmer**, **climbs**', contentVn: '**tăng**, **đi lên**, **ấm hơn**, **leo lên**' },
      { heading: 'Subtract: move down or left', headingVn: 'Trừ: đi xuống hoặc sang trái', accent: CORAL, icon: 'TrendingDown',
        content: '**falls**, **goes down**, **gets colder**, **drops**', contentVn: '**giảm**, **đi xuống**, **lạnh hơn**, **hạ xuống**' },
    ],
    check: {
      id: 'c6',
      q: 'It is 1 °C. The temperature falls 4 degrees. Which number sentence shows this?',
      qVn: 'Nhiệt độ là 1 °C. Nhiệt độ giảm 4 độ. Phép tính nào đúng?',
      options: [{ val: 'A', text: '1 + 4' }, { val: 'B', text: '1 − 4' }, { val: 'C', text: '4 − 1' }],
      correct: 'B',
      exp: '"Falls" means subtract. Start at 1 and take away 4: 1 − 4 = −3.',
      expVn: '"Giảm" là phép trừ. Bắt đầu ở 1 và bớt đi 4: 1 − 4 = −3.',
    },
  },
  {
    layout: 'callout', accent: GREEN, icon: 'Lightbulb',
    eyebrow: 'Remember', eyebrowVn: 'Ghi nhớ',
    title: 'Three things to remember', titleVn: 'Ba điều cần nhớ',
    notes: [
      { tone: 'write', text: '**Adding** moves right (up). **Subtracting** moves left (down).', textVn: '**Cộng** thì đi sang phải (lên). **Trừ** thì đi sang trái (xuống).' },
      { tone: 'write', text: 'When you **cross zero**, count in two parts: to 0, then on from 0.', textVn: 'Khi **đi qua số 0**, em đếm hai phần: đến 0, rồi đếm tiếp từ 0.' },
      { tone: 'info', text: 'Below zero, numbers get **smaller** as you go left: −5 is less than −1.', textVn: 'Dưới 0, càng sang trái số càng **nhỏ**: −5 nhỏ hơn −1.' },
    ],
    reveal: { label: 'Try one', labelVn: 'Thử một câu', prompt: 'What is −1 − 4?', promptVn: '−1 − 4 bằng bao nhiêu?', answer: '**−5**. Start at −1 and jump 4 to the left.', answerVn: '**−5**. Bắt đầu ở −1 và nhảy 4 bước sang trái.' },
  },
  {
    layout: 'hero',
    eyebrow: 'Well done', eyebrowVn: 'Giỏi lắm',
    title: 'Now practise, step by step', titleVn: 'Giờ mình luyện tập từng bước',
    subtitle: 'The practice has 12 problems. Each one shows the steps.',
    subtitleVn: 'Phần luyện tập có 12 bài. Mỗi bài có các bước để em làm theo.',
  },
]

const sample = SAMPLE_SETS.y5maths

export const PACK_Y5_NEGATIVES = JSON.parse(JSON.stringify({
  format: 'pra-learn-pack/1',
  slug: 'y5-math-u5-negatives',
  class_key: 'math:Year 5',
  title: 'Adding and subtracting with negative numbers',
  titleVn: 'Cộng và trừ với số âm',
  teacher: 'Mr. David',
  unit: 'Unit 5',
  langs: ['en', 'vn'],
  request_id: null,
  from: { deck: 'demo (written for PRA Learn)', bank: 'step-practice samples @ 0c18ffb4' },
  parts: [
    { id: 'review', kind: 'review', title: 'Review', titleVn: 'Ôn bài', slides },
    { id: 'practice', kind: 'practice', title: 'Practice', titleVn: 'Luyện tập', set: sample },
  ],
  assets: {},
}))

// A smaller, earlier lesson, so the home page and the class page have history.
export const PACK_Y5_ORDERING = {
  format: 'pra-learn-pack/1',
  slug: 'y5-math-u5-ordering',
  class_key: 'math:Year 5',
  title: 'Ordering temperatures',
  titleVn: 'Sắp xếp nhiệt độ',
  teacher: 'Mr. David',
  unit: 'Unit 5',
  langs: ['en', 'vn'],
  parts: [
    {
      id: 'review', kind: 'review', title: 'Review', titleVn: 'Ôn bài',
      slides: [
        {
          layout: 'statement', accent: BLUE, eyebrow: 'Year 5 Maths', eyebrowVn: 'Toán Year 5',
          title: 'Colder means smaller', titleVn: 'Lạnh hơn là nhỏ hơn',
          text: '−5 °C is colder than −1 °C', textVn: '−5 °C lạnh hơn −1 °C',
          sub: 'The further below zero, the colder it is.', subVn: 'Càng xa dưới 0 thì càng lạnh.',
          check: {
            id: 'o1', q: 'Which is colder?', qVn: 'Nhiệt độ nào lạnh hơn?',
            options: [{ val: 'A', text: '−2 °C' }, { val: 'B', text: '−7 °C' }], correct: 'B',
            exp: '−7 is further below zero than −2.', expVn: '−7 xa dưới 0 hơn −2.',
          },
        },
        {
          layout: 'split', accent: GREEN, title: 'Put them on a number line', titleVn: 'Đặt lên trục số',
          content: 'Smallest on the **left**, biggest on the **right**.', contentVn: 'Số nhỏ nhất ở **bên trái**, số lớn nhất ở **bên phải**.',
          inlineSvg: numberLine({ min: -6, max: 4, given: [-5, -1, 0, 3] }),
          check: {
            id: 'o2', q: 'Which list is in order, coldest first?', qVn: 'Dãy nào đúng thứ tự, lạnh nhất trước?',
            options: [{ val: 'A', text: '−1, −5, 0, 3' }, { val: 'B', text: '−5, −1, 0, 3' }, { val: 'C', text: '0, −1, −5, 3' }], correct: 'B',
            exp: 'On the number line: −5, then −1, then 0, then 3.', expVn: 'Trên trục số: −5, rồi −1, rồi 0, rồi 3.',
          },
        },
        {
          layout: 'callout', accent: VIOLET, title: 'Hội An in winter', titleVn: 'Hội An mùa đông',
          content: 'Hội An is never below zero. In Sa Pa, it can be **−2 °C** in January.', contentVn: 'Hội An không bao giờ dưới 0 độ. Ở Sa Pa, tháng Một có thể **−2 °C**.',
          check: {
            id: 'o3', q: 'Which is warmer: 18 °C in Hội An or −2 °C in Sa Pa?', qVn: 'Nơi nào ấm hơn: Hội An 18 °C hay Sa Pa −2 °C?',
            options: [{ val: 'A', text: 'Hội An' }, { val: 'B', text: 'Sa Pa' }], correct: 'A',
            exp: '18 is above zero; −2 is below zero.', expVn: '18 lớn hơn 0; −2 nhỏ hơn 0.',
          },
        },
      ],
    },
  ],
  assets: {},
}

// A draft the operator has saved but Mr. David has not opened yet.
export const PACK_Y5_WORDS = {
  format: 'pra-learn-pack/1',
  slug: 'y5-math-u5-word-problems',
  class_key: 'math:Year 5',
  title: 'Word problems with negative numbers',
  titleVn: 'Bài toán có lời văn với số âm',
  teacher: 'Mr. David',
  unit: 'Unit 5',
  langs: ['en', 'vn'],
  parts: [
    {
      id: 'review', kind: 'review', title: 'Review', titleVn: 'Ôn bài',
      slides: [
        {
          layout: 'statement', accent: BLUE, title: 'Owing money', titleVn: 'Nợ tiền',
          text: 'If you owe 5,000 đồng, you have −5,000 đồng.', textVn: 'Nếu em nợ 5.000 đồng, em có −5.000 đồng.',
          check: {
            id: 'w1', q: 'You have 2,000 đồng and spend 7,000 đồng. What do you have now?', qVn: 'Em có 2.000 đồng và tiêu 7.000 đồng. Bây giờ em có bao nhiêu?',
            options: [{ val: 'A', text: '5,000 đồng', textVn: '5.000 đồng' }, { val: 'B', text: '−5,000 đồng', textVn: '−5.000 đồng' }], correct: 'B',
            exp: '2,000 − 7,000 = −5,000: you owe 5,000 đồng.', expVn: '2.000 − 7.000 = −5.000: em nợ 5.000 đồng.',
          },
        },
      ],
    },
  ],
  assets: {},
}
