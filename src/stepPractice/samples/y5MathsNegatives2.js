// Sample set: Year 5 Maths, negative numbers — the Practice and Challenge items.
import { numberLine, floors } from './figures.js';

export const practice = [
  {
    id: 'p1', level: 'practice',
    prompt: 'In Sa Pa it was {{4 °C}} at 6 pm. By midnight the temperature had fallen {{9}} degrees. [[What was the temperature at midnight?]]',
    promptVn: 'Ở Sa Pa lúc 6 giờ tối trời {{4 °C}}. Đến nửa đêm nhiệt độ giảm {{9}} độ. [[Lúc nửa đêm nhiệt độ là bao nhiêu?]]',
    inlineSvg: numberLine({ min: -7, max: 5, given: [4] }),
    steps: [
      {
        title: 'Fall from 4 to 0', titleVn: 'Giảm từ 4 xuống 0',
        input: { type: 'number', before: 'From {{4}} to 0 is', beforeVn: 'Từ {{4}} xuống 0 là', after: 'degrees', afterVn: 'độ', answer: '4' },
        hint: 'Count down from 4 to 0.', hintVn: 'Đếm lùi từ 4 về 0.',
      },
      {
        key: true,
        title: 'How much further does it fall?', titleVn: 'Còn giảm thêm bao nhiêu độ?',
        input: { type: 'number', before: '{{9}} − <<4>> =', after: 'degrees', afterVn: 'độ', answer: '5' },
        hint: 'It falls 9 degrees in all. 4 of them take it to 0.', hintVn: 'Tổng cộng giảm 9 độ. 4 độ đầu đưa về 0.',
        slips: [{ value: '13', step: 1, msg: 'That added 9 and 4. Part of the 9 degrees is used getting down to 0.', msgVn: 'Như vậy là cộng 9 với 4. Một phần của 9 độ đã dùng để xuống đến 0.' }],
      },
      {
        title: 'The temperature at midnight', titleVn: 'Nhiệt độ lúc nửa đêm',
        input: { type: 'number', before: '{{4}} − {{9}} =', after: '°C', answer: '−5' },
        hint: 'From 0, fall the degrees that are left.', hintVn: 'Từ 0, giảm tiếp số độ còn lại.',
        why: '4 − 9: 4 degrees down to 0, then 5 more, so −5 °C.', whyVn: '4 − 9: giảm 4 độ về 0, rồi giảm thêm 5 độ, nên là −5 °C.',
        slips: [
          { value: '5', step: 2, msg: '5 °C is above zero. It fell past 0, so the answer is below zero.', msgVn: '5 °C ở trên 0. Nhiệt độ đã giảm qua 0, nên đáp án ở dưới 0.' },
          { value: '−13', step: 1, msg: 'That starts at −4. At 6 pm it was 4 °C, above zero.', msgVn: 'Như vậy là bắt đầu từ −4. Lúc 6 giờ tối là 4 °C, trên 0.' },
        ],
      },
    ],
  },
  {
    id: 'p2', level: 'practice',
    prompt: 'Ms. Kiu parks her car on floor {{−2}}, two floors under the ground. She takes the lift up to floor {{6}}. [[How many floors does she go up?]]',
    promptVn: 'Cô Kiu đỗ xe ở tầng {{−2}}, dưới mặt đất hai tầng. Cô đi thang máy lên tầng {{6}}. [[Cô đi lên bao nhiêu tầng?]]',
    inlineSvg: floors({ min: -3, max: 6, given: [-2, 6], groundWord: 'ground' }),
    inlineSvgVn: floors({ min: -3, max: 6, given: [-2, 6], groundWord: 'mặt đất' }),
    steps: [
      {
        key: true,
        title: 'Floors up to the ground', titleVn: 'Số tầng lên đến mặt đất',
        input: { type: 'number', before: 'From {{−2}} to 0 is', beforeVn: 'Từ {{−2}} lên 0 là', after: 'floors', afterVn: 'tầng', answer: '2' },
        hint: 'Count up from floor −2 to floor 0.', hintVn: 'Đếm từ tầng −2 lên tầng 0.',
      },
      {
        title: 'Floors from the ground to 6', titleVn: 'Số tầng từ mặt đất lên tầng 6',
        input: { type: 'number', before: 'From 0 to {{6}} is', beforeVn: 'Từ 0 lên {{6}} là', after: 'floors', afterVn: 'tầng', answer: '6' },
        hint: 'Count up from 0 to 6.', hintVn: 'Đếm từ 0 lên 6.',
      },
      {
        title: 'Add the two parts', titleVn: 'Cộng hai phần lại',
        input: { type: 'number', before: '<<2>> + <<6>> =', after: 'floors', afterVn: 'tầng', answer: '8' },
        line: 'From {{−2}} to {{6}} is @ floors.', lineVn: 'Từ tầng {{−2}} lên tầng {{6}} là @ tầng.',
        hint: 'Add the floors under the ground and the floors above it.', hintVn: 'Cộng số tầng dưới mặt đất với số tầng trên mặt đất.',
        slips: [{ value: '4', step: 1, msg: '6 − 2 = 4 treats floor −2 like floor 2. Count up to the ground first.', msgVn: '6 − 2 = 4 là coi tầng −2 như tầng 2. Em đếm lên mặt đất trước.' }],
      },
    ],
  },
  {
    id: 'p3', level: 'practice',
    prompt: 'Work out {{3}} − {{8}}.', promptVn: 'Tính {{3}} − {{8}}.',
    inlineSvg: numberLine({ min: -6, max: 4, given: [3] }),
    steps: [
      {
        key: true,
        title: 'Will the answer be below zero?', titleVn: 'Đáp án có nhỏ hơn 0 không?',
        input: { type: 'choice', options: [{ id: 'y', text: 'Yes: 8 is more than 3', textVn: 'Có: 8 lớn hơn 3' }, { id: 'n', text: 'No: subtracting never goes below 0', textVn: 'Không: phép trừ không bao giờ nhỏ hơn 0' }], answer: 'y' },
        line: '8 is more than 3, so the answer is below zero.', lineVn: '8 lớn hơn 3, nên đáp án nhỏ hơn 0.',
        hint: 'Taking away more than you have goes past zero.', hintVn: 'Bớt đi nhiều hơn số mình có thì sẽ đi qua số 0.',
      },
      {
        title: 'Split 8 into 3 and the rest', titleVn: 'Tách 8 thành 3 và phần còn lại',
        input: { type: 'number', before: '{{8}} = 3 +', answer: '5' },
        hint: 'Taking 3 gets you to 0. How much of the 8 is left?', hintVn: 'Bớt 3 thì về 0. Trong 8 còn lại bao nhiêu?',
      },
      {
        title: 'Take the rest away from 0', titleVn: 'Lấy 0 trừ phần còn lại',
        input: { type: 'number', before: '{{3}} − {{8}} =', answer: '−5' },
        hint: '3 − 3 = 0, then take away 5 more.', hintVn: '3 − 3 = 0, rồi trừ tiếp 5.',
        slips: [
          { value: '5', step: 1, msg: '8 − 3 = 5. This is 3 − 8: you go past 0, so the answer is negative.', msgVn: '8 − 3 = 5. Đây là 3 − 8: đi qua 0, nên đáp án là số âm.' },
          { value: '11', step: 1, msg: 'That is 3 + 8. Subtracting moves left on the number line.', msgVn: 'Đó là 3 + 8. Phép trừ đi sang trái trên trục số.' },
        ],
      },
    ],
  },
  {
    id: 'p4', level: 'practice',
    prompt: 'The table shows the temperature in three cities one night in January. [[How much warmer was Hà Nội than Moscow?]]',
    promptVn: 'Bảng cho biết nhiệt độ ở ba thành phố vào một đêm tháng Một. [[Hà Nội ấm hơn Moscow bao nhiêu độ?]]',
    table: { head: ['City', 'Temperature'], headVn: ['Thành phố', 'Nhiệt độ'], rows: [['Hà Nội', '{{9 °C}}'], ['London', '{{2 °C}}'], ['Moscow', '{{−6 °C}}']] },
    steps: [
      {
        key: true,
        title: 'Which two temperatures do you need?', titleVn: 'Em cần hai nhiệt độ nào?',
        input: { type: 'choice', options: [{ id: 'a', text: '9 °C and −6 °C', textVn: '9 °C và −6 °C' }, { id: 'b', text: '9 °C and 2 °C', textVn: '9 °C và 2 °C' }, { id: 'c', text: '2 °C and −6 °C', textVn: '2 °C và −6 °C' }], answer: 'a' },
        hint: 'Find Hà Nội and Moscow in the table.', hintVn: 'Tìm Hà Nội và Moscow trong bảng.',
      },
      {
        title: 'From −6 up to 0', titleVn: 'Từ −6 lên 0',
        input: { type: 'number', before: 'From {{−6}} to 0 is', beforeVn: 'Từ {{−6}} lên 0 là', after: 'degrees', afterVn: 'độ', answer: '6' },
        hint: '−6 is 6 degrees below zero.', hintVn: '−6 là dưới 0 sáu độ.',
      },
      {
        title: 'From 0 up to 9', titleVn: 'Từ 0 lên 9',
        input: { type: 'number', before: 'From 0 to {{9}} is', beforeVn: 'Từ 0 lên {{9}} là', after: 'degrees', afterVn: 'độ', answer: '9' },
        hint: 'Count up from 0 to 9.', hintVn: 'Đếm từ 0 lên 9.',
      },
      {
        title: 'How much warmer?', titleVn: 'Ấm hơn bao nhiêu độ?',
        input: { type: 'number', before: '<<6>> + <<9>> =', after: 'degrees', afterVn: 'độ', answer: '15' },
        line: 'From {{−6}} to {{9}} is @ degrees.', lineVn: 'Từ {{−6}} lên {{9}} là @ độ.',
        hint: 'Add the part below zero and the part above zero.', hintVn: 'Cộng phần dưới 0 với phần trên 0.',
        slips: [
          { value: '3', step: 2, msg: '9 − 6 = 3 counts −6 as 6 above zero. It is 6 below, so count up to 0 first.', msgVn: '9 − 6 = 3 là coi −6 như trên 0 sáu độ. −6 ở dưới 0, nên em đếm lên 0 trước.' },
          { value: '7', step: 1, msg: '9 − 2 = 7 uses London. The question is about Moscow.', msgVn: '9 − 2 = 7 là dùng London. Câu hỏi hỏi về Moscow.' },
        ],
      },
    ],
  },
];

export const challenge = [
  {
    id: 'c1', level: 'challenge',
    prompt: 'A diver is {{12 m}} under the water, at {{−12 m}}. She swims up {{5 m}}. [[Where is she now?]]',
    promptVn: 'Một thợ lặn đang ở dưới nước {{12 m}}, tức là ở {{−12 m}}. Cô ấy bơi lên {{5 m}}. [[Bây giờ cô ấy ở đâu?]]',
    steps: [
      {
        title: 'Which way does she move?', titleVn: 'Cô ấy di chuyển về phía nào?',
        input: { type: 'choice', options: [{ id: 'up', text: 'Up, towards 0', textVn: 'Lên, về phía 0' }, { id: 'down', text: 'Down, deeper', textVn: 'Xuống, sâu hơn' }], answer: 'up' },
        line: 'Up towards the surface: add.', lineVn: 'Bơi lên mặt nước: phép cộng.',
        hint: 'The surface is 0. Swimming up brings her closer to it.', hintVn: 'Mặt nước là 0. Bơi lên thì gần mặt nước hơn.',
      },
      {
        title: 'Write the calculation', titleVn: 'Viết phép tính',
        input: { type: 'choice', options: [{ id: 'a', text: '$-12 + 5$' }, { id: 'b', text: '$-12 - 5$' }, { id: 'c', text: '$12 - 5$' }], answer: 'a' },
        hint: 'Start where she is, then move up 5.', hintVn: 'Bắt đầu ở chỗ cô ấy đang ở, rồi đi lên 5.',
      },
      {
        title: 'Work it out', titleVn: 'Tính ra kết quả',
        input: { type: 'number', before: '{{−12}} + {{5}} =', after: 'm', answer: '−7' },
        hint: 'Count 5 up from −12. You are still below zero.', hintVn: 'Đếm lên 5 từ −12. Vẫn còn ở dưới 0.',
        slips: [
          { value: '−17', step: 1, msg: 'She swims up, towards the surface, so she is less deep, not deeper.', msgVn: 'Cô ấy bơi lên, về phía mặt nước, nên nông hơn chứ không sâu hơn.' },
          { value: '7', step: 2, msg: '7 m would be above the water. She started at −12 and only swam up 5.', msgVn: '7 m là ở trên mặt nước. Cô ấy bắt đầu ở −12 và chỉ bơi lên 5 m.' },
        ],
      },
    ],
  },
  {
    id: 'c2', level: 'challenge',
    prompt: 'The coldest night in a town last year was {{−8 °C}}. The hottest day was {{31 °C}}. [[What is the difference between them?]]',
    promptVn: 'Năm ngoái, đêm lạnh nhất ở một thị trấn là {{−8 °C}}. Ngày nóng nhất là {{31 °C}}. [[Hai nhiệt độ chênh nhau bao nhiêu độ?]]',
    steps: [
      {
        title: 'From −8 up to 0', titleVn: 'Từ −8 lên 0',
        input: { type: 'number', before: 'From {{−8}} to 0 is', beforeVn: 'Từ {{−8}} lên 0 là', after: 'degrees', afterVn: 'độ', answer: '8' },
        hint: '−8 is 8 degrees below zero.', hintVn: '−8 là dưới 0 tám độ.',
      },
      {
        title: 'From 0 up to 31', titleVn: 'Từ 0 lên 31',
        input: { type: 'number', before: 'From 0 to {{31}} is', beforeVn: 'Từ 0 lên {{31}} là', after: 'degrees', afterVn: 'độ', answer: '31' },
        hint: 'Count up from 0 to 31.', hintVn: 'Đếm từ 0 lên 31.',
      },
      {
        title: 'The difference', titleVn: 'Độ chênh lệch',
        input: { type: 'number', before: '<<8>> + <<31>> =', after: 'degrees', afterVn: 'độ', answer: '39' },
        line: 'From {{−8}} to {{31}} is @ degrees.', lineVn: 'Từ {{−8}} lên {{31}} là @ độ.',
        hint: 'Add the part below zero and the part above zero.', hintVn: 'Cộng phần dưới 0 với phần trên 0.',
        slips: [{ value: '23', step: 1, msg: '31 − 8 = 23 treats −8 as 8 above zero. Count up from −8 to 0 first.', msgVn: '31 − 8 = 23 là coi −8 như trên 0. Em đếm từ −8 lên 0 trước.' }],
      },
    ],
  },
  {
    id: 'c3', level: 'challenge',
    prompt: 'Find the missing number: {{−4}} − [[?]] = {{−9}}', promptVn: 'Tìm số còn thiếu: {{−4}} − [[?]] = {{−9}}',
    inlineSvg: numberLine({ min: -10, max: 1, given: [-4, -9] }),
    steps: [
      {
        title: 'Which way from −4 to −9?', titleVn: 'Từ −4 đến −9 đi về phía nào?',
        input: { type: 'choice', options: [{ id: 'l', text: 'Left: −9 is smaller', textVn: 'Sang trái: −9 nhỏ hơn' }, { id: 'r', text: 'Right: 9 is bigger', textVn: 'Sang phải: 9 lớn hơn' }], answer: 'l' },
        line: '−9 is to the left of −4: we take away.', lineVn: '−9 ở bên trái −4: mình trừ đi.',
        hint: 'Find −4 and −9 on the number line.', hintVn: 'Tìm −4 và −9 trên trục số.',
      },
      {
        title: 'Count the jumps', titleVn: 'Đếm số bước nhảy',
        input: { type: 'number', before: 'From {{−4}} to {{−9}} is', beforeVn: 'Từ {{−4}} đến {{−9}} là', after: 'jumps', afterVn: 'bước', answer: '5' },
        hint: 'Count −5, −6, −7, −8, −9.', hintVn: 'Đếm −5, −6, −7, −8, −9.',
      },
      {
        title: 'The missing number', titleVn: 'Số còn thiếu',
        input: { type: 'number', before: '{{−4}} −', after: '= {{−9}}', answer: '5' },
        hint: 'Taking away moves left. How many places did you move?', hintVn: 'Phép trừ đi sang trái. Em đã đi mấy bước?',
        slips: [
          { value: '−5', step: 1, msg: 'The minus sign already moves you left. The number you take away is 5.', msgVn: 'Dấu trừ đã cho mình đi sang trái rồi. Số bị trừ đi là 5.' },
          { value: '13', step: 2, msg: '4 + 9 = 13 counts from 4, not from −4. From −4 to −9 is only a few jumps.', msgVn: '4 + 9 = 13 là đếm từ 4, không phải từ −4. Từ −4 đến −9 chỉ vài bước.' },
        ],
      },
    ],
  },
  {
    id: 'c4', level: 'challenge',
    prompt: 'Mr. David’s freezer is at {{−18 °C}}. His fridge is {{22}} degrees warmer. [[What temperature is the fridge?]]',
    promptVn: 'Ngăn đá nhà thầy David là {{−18 °C}}. Ngăn mát ấm hơn {{22}} độ. [[Ngăn mát bao nhiêu độ?]]',
    steps: [
      {
        title: 'Warm up from −18 to 0', titleVn: 'Tăng từ −18 lên 0',
        input: { type: 'number', before: 'From {{−18}} to 0 is', beforeVn: 'Từ {{−18}} lên 0 là', after: 'degrees', afterVn: 'độ', answer: '18' },
        hint: '−18 is 18 degrees below zero.', hintVn: '−18 là dưới 0 mười tám độ.',
      },
      {
        title: 'Degrees left after 0', titleVn: 'Số độ còn lại sau 0',
        input: { type: 'number', before: '{{22}} − <<18>> =', after: 'degrees', afterVn: 'độ', answer: '4' },
        hint: '22 degrees warmer in all; 18 of them get to 0.', hintVn: 'Tổng cộng ấm hơn 22 độ; 18 độ đầu là lên đến 0.',
      },
      {
        title: 'The fridge temperature', titleVn: 'Nhiệt độ ngăn mát',
        input: { type: 'number', before: '{{−18}} + {{22}} =', after: '°C', answer: '4' },
        hint: 'From 0, warm up the degrees that are left.', hintVn: 'Từ 0, tăng thêm số độ còn lại.',
        slips: [
          { value: '−4', step: 2, msg: '22 degrees warmer takes it past 0, so the fridge is above zero.', msgVn: 'Ấm hơn 22 độ là đã qua 0, nên ngăn mát trên 0.' },
          { value: '40', step: 1, msg: '18 + 22 = 40 treats −18 as 18 above zero. It takes 18 degrees just to reach 0.', msgVn: '18 + 22 = 40 là coi −18 như trên 0. Phải tăng 18 độ mới lên đến 0.' },
        ],
      },
    ],
  },
];
