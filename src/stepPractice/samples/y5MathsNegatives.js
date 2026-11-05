// Sample set: Year 5 Maths, adding and subtracting with negative numbers.
// Original problems (temperatures, floors below ground, a diver, a freezer),
// written for the pilot class; not taken from any book.
import { numberLine, floors } from './figures.js';

const focus = [
  {
    id: 'f1', level: 'focus',
    prompt: 'At 6 am the temperature was {{−3 °C}}. At noon it was {{5 °C}}. [[How many degrees did it rise?]]',
    promptVn: 'Lúc 6 giờ sáng nhiệt độ là {{−3 °C}}. Đến trưa là {{5 °C}}. [[Nhiệt độ đã tăng bao nhiêu độ?]]',
    inlineSvg: numberLine({ min: -5, max: 6, given: [-3, 5] }),
    steps: [
      {
        title: 'Count up from −3 to 0', titleVn: 'Đếm từ −3 lên 0',
        input: { type: 'number', before: 'From {{−3}} to 0 is', beforeVn: 'Từ {{−3}} lên 0 là', after: 'degrees', afterVn: 'độ', answer: '3' },
        hint: 'Count the jumps on the number line from −3 to 0.', hintVn: 'Đếm số bước nhảy trên trục số từ −3 đến 0.',
        slips: [{ value: '−3', msg: 'Count the jumps, not the number: from −3 to 0 is 3 jumps.', msgVn: 'Em đếm số bước nhảy, không phải con số: từ −3 đến 0 là 3 bước.' }],
      },
      {
        title: 'Count up from 0 to 5', titleVn: 'Đếm từ 0 lên 5',
        input: { type: 'number', before: 'From 0 to {{5}} is', beforeVn: 'Từ 0 lên {{5}} là', after: 'degrees', afterVn: 'độ', answer: '5' },
        hint: 'From 0, count the jumps up to 5.', hintVn: 'Từ 0, đếm số bước nhảy lên đến 5.',
      },
      {
        title: 'Add the two parts', titleVn: 'Cộng hai phần lại',
        input: { type: 'number', before: '<<3>> + <<5>> =', after: 'degrees', afterVn: 'độ', answer: '8' },
        line: 'From {{−3}} to {{5}} is @ degrees.', lineVn: 'Từ {{−3}} lên {{5}} là @ độ.',
        hint: 'The rise is the part below zero and the part above zero together.', hintVn: 'Mức tăng gồm phần dưới 0 và phần trên 0 cộng lại.',
        why: 'Going past zero, count in two parts: up to 0, then on from 0.', whyVn: 'Khi đi qua số 0, mình đếm hai phần: lên đến 0, rồi đếm tiếp từ 0.',
        slips: [{ value: '2', step: 1, msg: '5 − 3 = 2 treats −3 as if it were above zero. It is 3 below, so count both parts.', msgVn: '5 − 3 = 2 là coi −3 như ở trên 0. −3 ở dưới 0 ba độ, nên em đếm cả hai phần.' }],
      },
    ],
  },
  {
    id: 'f2', level: 'focus',
    prompt: 'A lift is on floor {{2}}. It goes down {{5}} floors. [[Which floor is it on now?]]',
    promptVn: 'Thang máy đang ở tầng {{2}}. Thang máy đi xuống {{5}} tầng. [[Bây giờ thang máy ở tầng nào?]]',
    inlineSvg: floors({ min: -4, max: 4, given: [2], groundWord: 'ground' }),
    inlineSvgVn: floors({ min: -4, max: 4, given: [2], groundWord: 'mặt đất' }),
    steps: [
      {
        title: 'Go down to the ground floor', titleVn: 'Đi xuống tầng trệt',
        input: { type: 'number', before: 'Floor {{2}} down to 0 is', beforeVn: 'Từ tầng {{2}} xuống 0 là', after: 'floors', afterVn: 'tầng', answer: '2' },
        hint: 'Count the floors from 2 down to 0.', hintVn: 'Đếm số tầng từ 2 xuống 0.',
      },
      {
        title: 'How many more floors down?', titleVn: 'Còn phải xuống thêm mấy tầng?',
        input: { type: 'number', before: '{{5}} − <<2>> =', after: 'floors', afterVn: 'tầng', answer: '3' },
        hint: 'It goes down 5 floors in all, and 2 are done.', hintVn: 'Tổng cộng đi xuống 5 tầng, đã xuống 2 tầng rồi.',
      },
      {
        title: 'Go 3 floors below the ground', titleVn: 'Xuống 3 tầng dưới mặt đất',
        input: { type: 'number', before: '0 − <<3>> =', answer: '−3' },
        line: '{{2}} − {{5}} = @', hint: 'Below the ground floor the floor numbers are negative.', hintVn: 'Dưới tầng trệt, số tầng là số âm.',
        slips: [{ value: '3', msg: 'Floor 3 is above the ground. Going down past 0 gives a negative number.', msgVn: 'Tầng 3 ở trên mặt đất. Đi xuống qua 0 thì được số âm.' }],
      },
    ],
  },
  {
    id: 'f3', level: 'focus',
    prompt: 'Start at {{−4}} on the number line. Add {{6}}. [[Where do you land?]]',
    promptVn: 'Bắt đầu ở {{−4}} trên trục số. Cộng thêm {{6}}. [[Em dừng ở số nào?]]',
    inlineSvg: numberLine({ min: -6, max: 5, given: [-4] }),
    steps: [
      {
        title: 'Which way do you move?', titleVn: 'Em di chuyển về phía nào?',
        input: { type: 'choice', options: [{ id: 'r', text: 'Right, to bigger numbers', textVn: 'Sang phải, đến số lớn hơn' }, { id: 'l', text: 'Left, to smaller numbers', textVn: 'Sang trái, đến số nhỏ hơn' }], answer: 'r' },
        line: 'Adding: move right.', lineVn: 'Phép cộng: đi sang phải.',
        hint: 'Adding makes a number bigger.', hintVn: 'Cộng thêm thì số lớn hơn.',
        slips: [{ value: 'l', msg: 'Moving left is subtracting. Adding moves right.', msgVn: 'Đi sang trái là phép trừ. Phép cộng đi sang phải.' }],
      },
      {
        title: 'Jump up to 0', titleVn: 'Nhảy lên đến 0',
        input: { type: 'number', before: 'From {{−4}} to 0 is', beforeVn: 'Từ {{−4}} đến 0 là', after: 'jumps', afterVn: 'bước', answer: '4' },
        hint: 'Count the jumps from −4 to 0.', hintVn: 'Đếm số bước từ −4 đến 0.',
      },
      {
        title: 'How many jumps are left?', titleVn: 'Còn lại mấy bước?',
        input: { type: 'number', before: '{{6}} − <<4>> =', after: 'jumps', afterVn: 'bước', answer: '2' },
        hint: 'You add 6 jumps in all.', hintVn: 'Tổng cộng em nhảy 6 bước.',
      },
      {
        title: 'Where do you land?', titleVn: 'Em dừng ở số nào?',
        input: { type: 'number', before: '{{−4}} + {{6}} =', answer: '2' },
        hint: 'From 0, take the jumps that are left.', hintVn: 'Từ 0, nhảy tiếp số bước còn lại.',
        why: '−4 + 6: 4 jumps get you to 0, and 2 more get you to 2.', whyVn: '−4 + 6: 4 bước đến 0, thêm 2 bước nữa đến 2.',
        slips: [
          { value: '−10', step: 1, msg: 'That moved left. Adding 6 moves right.', msgVn: 'Như vậy là đi sang trái. Cộng 6 thì đi sang phải.' },
          { value: '10', step: 2, msg: 'That started at 4, not −4. −4 is below zero.', msgVn: 'Như vậy là bắt đầu từ 4, không phải −4. −4 ở dưới 0.' },
          { value: '−2', step: 3, msg: 'You stopped 2 short of 0 on the other side. After 0, keep going right.', msgVn: 'Em dừng sai phía của số 0. Qua 0 rồi, em đi tiếp sang phải.' },
        ],
      },
    ],
  },
  {
    id: 'f4', level: 'focus',
    prompt: 'Put these temperatures in order, [[coldest first]]: {{3 °C}}, {{−5 °C}}, {{0 °C}}, {{−1 °C}}, {{7 °C}}.',
    promptVn: 'Xếp các nhiệt độ sau theo thứ tự, [[lạnh nhất trước]]: {{3 °C}}, {{−5 °C}}, {{0 °C}}, {{−1 °C}}, {{7 °C}}.',
    steps: [
      {
        title: 'Which is the coldest?', titleVn: 'Nhiệt độ nào lạnh nhất?',
        input: { type: 'choice', options: [{ id: 'a', text: '−1 °C' }, { id: 'b', text: '−5 °C' }, { id: 'c', text: '0 °C' }], answer: 'b' },
        hint: 'The coldest is the furthest below zero.', hintVn: 'Lạnh nhất là nhiệt độ xa số 0 nhất về phía dưới.',
        slips: [{ value: 'a', msg: '−1 °C is only 1 degree below zero. −5 °C is further below.', msgVn: '−1 °C chỉ dưới 0 một độ. −5 °C còn thấp hơn nữa.' }],
      },
      {
        title: 'Put them in order, coldest first', titleVn: 'Xếp theo thứ tự, lạnh nhất trước',
        input: { type: 'order', items: [{ id: 'm5', text: '−5 °C' }, { id: 'm1', text: '−1 °C' }, { id: 'z', text: '0 °C' }, { id: 'p3', text: '3 °C' }, { id: 'p7', text: '7 °C' }] },
        hint: 'Picture a number line: the left end is coldest.', hintVn: 'Em hình dung trục số: đầu bên trái là lạnh nhất.',
        why: 'On a number line, numbers get bigger to the right: −5, −1, 0, 3, 7.', whyVn: 'Trên trục số, số lớn dần về bên phải: −5, −1, 0, 3, 7.',
        slips: [{ value: ['m1', 'm5', 'z', 'p3', 'p7'], step: 1, msg: 'Further below zero is colder, so −5 °C comes before −1 °C.', msgVn: 'Càng xa dưới 0 càng lạnh, nên −5 °C đứng trước −1 °C.' }],
      },
    ],
  },
];

export default focus;
