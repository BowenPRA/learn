// Sample set: Year 5 Science, fair tests and reading a results table.
// Original investigations (parachutes, dissolving sugar, plants, bouncing balls,
// melting ice), written for PRA; not taken from any book.

const opt = (id, text, textVn) => ({ id, text, textVn });

export default [
  {
    id: 's1', level: 'focus',
    prompt: 'Mr. David dropped paper parachutes of different sizes from the same height. He timed each fall. [[What happens to the time as the parachute gets bigger?]]',
    promptVn: 'Thầy David thả những chiếc dù giấy có kích thước khác nhau từ cùng một độ cao và bấm giờ mỗi lần rơi. [[Khi dù lớn hơn thì thời gian rơi thay đổi thế nào?]]',
    table: { head: ['Parachute width (cm)', 'Time to fall (s)'], headVn: ['Chiều rộng dù (cm)', 'Thời gian rơi (giây)'], rows: [['{{10}}', '{{1.2}}'], ['{{20}}', '{{1.9}}'], ['{{30}}', '{{2.6}}'], ['{{40}}', '{{3.4}}']] },
    steps: [
      {
        title: 'Read the time for 20 cm', titleVn: 'Đọc thời gian của dù 20 cm',
        input: { type: 'number', before: '20 cm:', after: 's', answer: '1.9' },
        hint: 'Find 20 in the first column, then read across.', hintVn: 'Tìm số 20 ở cột đầu tiên rồi đọc sang ngang.',
        slips: [{ value: '2.6', msg: '2.6 s is the 30 cm parachute. Read across from 20.', msgVn: '2.6 giây là của dù 30 cm. Em đọc sang ngang từ số 20.' }],
      },
      {
        title: 'Read the time for 40 cm', titleVn: 'Đọc thời gian của dù 40 cm',
        input: { type: 'number', before: '40 cm:', after: 's', answer: '3.4' },
        hint: 'Find 40 in the first column.', hintVn: 'Tìm số 40 ở cột đầu tiên.',
      },
      {
        title: 'Describe the pattern', titleVn: 'Mô tả quy luật',
        input: { type: 'choice', options: [
          opt('a', 'The bigger the parachute, the longer it takes to fall.', 'Dù càng lớn thì rơi càng lâu.'),
          opt('b', 'The bigger the parachute, the faster it falls.', 'Dù càng lớn thì rơi càng nhanh.'),
          opt('c', 'There is no pattern.', 'Không có quy luật nào.'),
        ], answer: 'a' },
        line: 'Pattern: the bigger the parachute, the longer the fall.', lineVn: 'Quy luật: dù càng lớn thì rơi càng lâu.',
        hint: 'Compare 1.9 s and 3.4 s. Which took longer?', hintVn: 'So sánh 1.9 giây và 3.4 giây. Lần nào lâu hơn?',
        why: 'Each time the width goes up, the time goes up too.', whyVn: 'Mỗi lần chiều rộng tăng thì thời gian cũng tăng.',
        slips: [{ value: 'b', step: 2, msg: 'A longer time means a slower fall. 3.4 s is longer than 1.9 s.', msgVn: 'Thời gian dài hơn nghĩa là rơi chậm hơn. 3.4 giây lâu hơn 1.9 giây.' }],
      },
    ],
  },
  {
    id: 's2', level: 'focus',
    prompt: 'Ms. Kiu wants to find out if the temperature of water changes how fast sugar dissolves. [[What must she keep the same?]]',
    promptVn: 'Cô Kiu muốn tìm hiểu nhiệt độ của nước có làm đường tan nhanh hơn hay chậm hơn không. [[Cô phải giữ nguyên những gì?]]',
    steps: [
      {
        title: 'What does she change?', titleVn: 'Cô thay đổi gì?',
        input: { type: 'choice', options: [opt('t', 'The temperature of the water', 'Nhiệt độ của nước'), opt('s', 'The amount of sugar', 'Lượng đường'), opt('c', 'The size of the cup', 'Kích thước cái cốc')], answer: 't' },
        line: 'Change: the temperature of the water.', lineVn: 'Thay đổi: nhiệt độ của nước.',
        hint: 'Look at the question she wants to answer.', hintVn: 'Em xem câu hỏi cô muốn trả lời.',
      },
      {
        title: 'What does she measure?', titleVn: 'Cô đo gì?',
        input: { type: 'choice', options: [opt('time', 'The time for the sugar to dissolve', 'Thời gian để đường tan hết'), opt('temp', 'The temperature of the room', 'Nhiệt độ của phòng'), opt('mass', 'The mass of the cup', 'Khối lượng cái cốc')], answer: 'time' },
        line: 'Measure: the time for the sugar to dissolve.', lineVn: 'Đo: thời gian để đường tan hết.',
        hint: 'She wants to know how fast the sugar dissolves.', hintVn: 'Cô muốn biết đường tan nhanh hay chậm.',
      },
      {
        title: 'What must stay the same?', titleVn: 'Những gì phải giữ nguyên?',
        input: { type: 'multi', options: [opt('sugar', 'The amount of sugar', 'Lượng đường'), opt('water', 'The amount of water', 'Lượng nước'), opt('kind', 'The kind of sugar', 'Loại đường'), opt('temp', 'The temperature of the water', 'Nhiệt độ của nước')], answer: ['sugar', 'water', 'kind'] },
        line: 'Keep the same: the amount of sugar, the amount of water, the kind of sugar.', lineVn: 'Giữ nguyên: lượng đường, lượng nước, loại đường.',
        hint: 'Everything except the one thing she changes.', hintVn: 'Mọi thứ, trừ một thứ cô thay đổi.',
        why: 'In a fair test only one thing changes, so you know what caused the result.', whyVn: 'Trong một thí nghiệm công bằng chỉ thay đổi một thứ, nên mình biết điều gì gây ra kết quả.',
        slips: [{ value: ['sugar', 'water', 'kind', 'temp'], step: 1, msg: 'The temperature is the thing she changes, so it cannot stay the same.', msgVn: 'Nhiệt độ là thứ cô thay đổi, nên không thể giữ nguyên.' }],
      },
    ],
  },
  {
    id: 's3', level: 'focus',
    prompt: 'Ms. Kiu writes the steps of her test. [[Put them in order.]]', promptVn: 'Cô Kiu viết các bước làm thí nghiệm. [[Em hãy xếp chúng theo thứ tự.]]',
    steps: [
      {
        title: 'What does she do first?', titleVn: 'Cô làm gì đầu tiên?',
        input: { type: 'choice', options: [opt('pour', 'Pour 100 ml of water into a cup', 'Rót 100 ml nước vào cốc'), opt('stir', 'Stir until the sugar disappears', 'Khuấy đến khi đường tan hết'), opt('write', 'Write the time in the table', 'Ghi thời gian vào bảng')], answer: 'pour' },
        hint: 'What does she need before she can add the sugar?', hintVn: 'Cô cần gì trước khi cho đường vào?',
      },
      {
        title: 'Put all the steps in order', titleVn: 'Xếp tất cả các bước theo thứ tự',
        input: { type: 'order', items: [
          { id: 'pour', text: 'Pour 100 ml of water into a cup.', textVn: 'Rót 100 ml nước vào cốc.' },
          { id: 'temp', text: 'Measure the temperature of the water.', textVn: 'Đo nhiệt độ của nước.' },
          { id: 'add', text: 'Add one spoon of sugar and start the timer.', textVn: 'Cho một thìa đường vào và bấm giờ.' },
          { id: 'stir', text: 'Stir until the sugar disappears, then stop the timer.', textVn: 'Khuấy đến khi đường tan hết rồi dừng đồng hồ.' },
          { id: 'write', text: 'Write the time in the table.', textVn: 'Ghi thời gian vào bảng.' },
        ] },
        line: 'Pour, measure the temperature, add sugar and start the timer, stir and stop, write it down.', lineVn: 'Rót nước, đo nhiệt độ, cho đường và bấm giờ, khuấy rồi dừng, ghi lại.',
        hint: 'The timer starts when the sugar goes in and stops when it has gone.', hintVn: 'Bấm giờ khi cho đường vào và dừng khi đường tan hết.',
        slips: [{ value: ['pour', 'add', 'temp', 'stir', 'write'], msg: 'Measure the temperature before the timer starts. Once the sugar is in, the clock is running.', msgVn: 'Đo nhiệt độ trước khi bấm giờ. Khi đường đã vào cốc thì đồng hồ đang chạy rồi.' }],
      },
    ],
  },
  {
    id: 's4', level: 'practice',
    prompt: 'Five bean plants were given different amounts of water each day for two weeks. [[Which amount of water gave the tallest plant, and what happened with more?]]',
    promptVn: 'Năm cây đậu được tưới lượng nước khác nhau mỗi ngày trong hai tuần. [[Lượng nước nào cho cây cao nhất, và tưới nhiều hơn thì sao?]]',
    table: { head: ['Water each day (ml)', 'Height after 2 weeks (cm)'], headVn: ['Nước mỗi ngày (ml)', 'Chiều cao sau 2 tuần (cm)'], rows: [['{{0}}', '{{2}}'], ['{{20}}', '{{7}}'], ['{{40}}', '{{11}}'], ['{{60}}', '{{9}}'], ['{{80}}', '{{4}}']] },
    steps: [
      {
        title: 'Find the tallest height', titleVn: 'Tìm chiều cao lớn nhất',
        input: { type: 'number', before: 'Tallest:', beforeVn: 'Cao nhất:', after: 'cm', answer: '11' },
        hint: 'Look down the height column for the biggest number.', hintVn: 'Nhìn xuống cột chiều cao, tìm số lớn nhất.',
      },
      {
        key: true,
        title: 'Which amount of water was that?', titleVn: 'Đó là lượng nước nào?',
        input: { type: 'choice', options: [opt('40', '40 ml'), opt('60', '60 ml'), opt('80', '80 ml')], answer: '40' },
        hint: 'Read across from the tallest height to the water column.', hintVn: 'Từ chiều cao lớn nhất, đọc sang cột lượng nước.',
        slips: [{ value: '80', step: 1, msg: '80 ml is the most water, not the tallest plant. Find the tallest height first.', msgVn: '80 ml là nhiều nước nhất, không phải cây cao nhất. Em tìm chiều cao lớn nhất trước.' }],
      },
      {
        title: 'What happened with more water?', titleVn: 'Tưới nhiều nước hơn thì sao?',
        input: { type: 'choice', options: [
          opt('less', 'The plants grew less than at 40 ml.', 'Cây mọc thấp hơn so với 40 ml.'),
          opt('more', 'The plants kept growing taller.', 'Cây tiếp tục cao hơn.'),
          opt('same', 'The plants grew the same.', 'Cây cao như nhau.'),
        ], answer: 'less' },
        line: '40 ml gave the tallest plant (11 cm). With more water the plants grew less.', lineVn: '40 ml cho cây cao nhất (11 cm). Tưới nhiều hơn thì cây mọc thấp hơn.',
        hint: 'Compare 60 ml and 80 ml with 40 ml.', hintVn: 'So sánh 60 ml và 80 ml với 40 ml.',
        slips: [{ value: 'more', step: 1, msg: 'At 60 ml the plant was 9 cm and at 80 ml 4 cm: shorter than 11 cm.', msgVn: 'Ở 60 ml cây cao 9 cm, ở 80 ml cao 4 cm: thấp hơn 11 cm.' }],
      },
    ],
  },
  {
    id: 's5', level: 'practice',
    prompt: 'Two children test which ball bounces higher. Ball A is dropped from {{1 m}} onto the floor. Ball B is dropped from {{2 m}} onto a carpet. [[Is this a fair test?]]',
    promptVn: 'Hai bạn nhỏ thử xem quả bóng nào nảy cao hơn. Bóng A được thả từ độ cao {{1 m}} xuống sàn. Bóng B được thả từ {{2 m}} xuống thảm. [[Đây có phải là thí nghiệm công bằng không?]]',
    steps: [
      {
        title: 'What else is different?', titleVn: 'Còn gì khác nhau nữa?',
        input: { type: 'multi', options: [opt('height', 'The drop height', 'Độ cao thả'), opt('surface', 'What they land on', 'Chỗ bóng rơi xuống'), opt('bounce', 'How high they bounce', 'Bóng nảy cao bao nhiêu')], answer: ['height', 'surface'] },
        line: 'Different: the ball, the drop height and what it lands on.', lineVn: 'Khác nhau: quả bóng, độ cao thả và chỗ bóng rơi xuống.',
        hint: 'Read how each ball is dropped. How high the ball bounces is what they measure.', hintVn: 'Đọc cách thả từng quả bóng. Độ nảy là thứ hai bạn đo.',
        slips: [{ value: ['height', 'surface', 'bounce'], msg: 'How high they bounce is the result they measure, not something they set up.', msgVn: 'Độ nảy là kết quả hai bạn đo, không phải thứ hai bạn sắp đặt.' }],
      },
      {
        key: true,
        title: 'Is it a fair test?', titleVn: 'Có công bằng không?',
        input: { type: 'choice', options: [opt('no', 'No', 'Không'), opt('yes', 'Yes', 'Có')], answer: 'no' },
        line: 'Not fair: three things change, not one.', lineVn: 'Không công bằng: có ba thứ thay đổi chứ không phải một.',
        hint: 'In a fair test only the ball should change.', hintVn: 'Trong thí nghiệm công bằng chỉ quả bóng được thay đổi.',
        slips: [{ value: 'yes', step: 1, msg: 'Only the ball should change. Here the height and the floor change too.', msgVn: 'Chỉ quả bóng được thay đổi. Ở đây độ cao và mặt sàn cũng thay đổi.' }],
      },
      {
        title: 'How can they make it fair?', titleVn: 'Làm sao cho công bằng?',
        input: { type: 'choice', options: [
          opt('same', 'Drop both balls from the same height onto the same floor.', 'Thả cả hai quả bóng từ cùng độ cao xuống cùng một mặt sàn.'),
          opt('twin', 'Use two balls that are the same.', 'Dùng hai quả bóng giống nhau.'),
          opt('once', 'Drop each ball only once.', 'Mỗi quả bóng chỉ thả một lần.'),
        ], answer: 'same' },
        hint: 'Keep everything the same except the ball.', hintVn: 'Giữ mọi thứ giống nhau, trừ quả bóng.',
        slips: [{ value: 'twin', msg: 'The ball is the thing they are testing, so the two balls must be different.', msgVn: 'Quả bóng là thứ hai bạn đang thử, nên hai quả phải khác nhau.' }],
      },
    ],
  },
  {
    id: 's6', level: 'practice',
    prompt: 'Ms. Kiu timed an ice cube melting in the same place three times. Her results were {{12 min}}, {{13 min}} and {{25 min}}. [[Which result looks wrong, and what should she do?]]',
    promptVn: 'Cô Kiu bấm giờ một viên đá tan ở cùng một chỗ ba lần. Kết quả là {{12 phút}}, {{13 phút}} và {{25 phút}}. [[Kết quả nào có vẻ sai, và cô nên làm gì?]]',
    steps: [
      {
        title: 'Which two results are close?', titleVn: 'Hai kết quả nào gần nhau?',
        input: { type: 'multi', options: [opt('12', '12 min', '12 phút'), opt('13', '13 min', '13 phút'), opt('25', '25 min', '25 phút')], answer: ['12', '13'] },
        hint: 'Which two are only 1 minute apart?', hintVn: 'Hai kết quả nào chỉ cách nhau 1 phút?',
      },
      {
        key: true,
        title: 'Which result looks wrong?', titleVn: 'Kết quả nào có vẻ sai?',
        input: { type: 'choice', options: [opt('12', '12 min', '12 phút'), opt('13', '13 min', '13 phút'), opt('25', '25 min', '25 phút')], answer: '25' },
        line: '25 min is far from the other two results.', lineVn: '25 phút cách xa hai kết quả còn lại.',
        hint: 'The odd one out is far from the others.', hintVn: 'Kết quả khác thường thì cách xa các kết quả khác.',
        slips: [{ value: '12', step: 1, msg: '12 and 13 are close together. Look for the one far away from them.', msgVn: '12 và 13 gần nhau. Em tìm kết quả cách xa chúng.' }],
      },
      {
        title: 'What should she do?', titleVn: 'Cô nên làm gì?',
        input: { type: 'choice', options: [
          opt('repeat', 'Do the test again to check it.', 'Làm lại thí nghiệm để kiểm tra.'),
          opt('keep', 'Use it anyway.', 'Vẫn dùng kết quả đó.'),
          opt('bigger', 'Use a bigger ice cube next time.', 'Lần sau dùng viên đá lớn hơn.'),
        ], answer: 'repeat' },
        hint: 'Something may have gone wrong that time.', hintVn: 'Có thể lần đó đã có gì sai.',
        why: 'A result far from the others may be a mistake, so test again before you use it.', whyVn: 'Kết quả cách xa các kết quả khác có thể là do sai sót, nên cần làm lại trước khi dùng.',
        slips: [{ value: 'bigger', msg: 'Changing the ice cube would make the tests different. Keep everything the same and repeat.', msgVn: 'Đổi viên đá thì các lần thử sẽ khác nhau. Giữ mọi thứ như cũ và làm lại.' }],
      },
    ],
  },
  {
    id: 's7', level: 'challenge',
    prompt: 'The table shows how long sugar took to dissolve in water at different temperatures. [[Predict the time at 50 °C.]]',
    promptVn: 'Bảng cho biết đường tan trong bao lâu ở các nhiệt độ nước khác nhau. [[Em hãy dự đoán thời gian ở 50 °C.]]',
    table: { head: ['Water temperature (°C)', 'Time to dissolve (s)'], headVn: ['Nhiệt độ nước (°C)', 'Thời gian tan (giây)'], rows: [['{{20}}', '{{90}}'], ['{{40}}', '{{60}}'], ['{{60}}', '{{35}}'], ['{{80}}', '{{20}}']] },
    steps: [
      {
        title: 'Which rows is 50 °C between?', titleVn: '50 °C nằm giữa hai hàng nào?',
        input: { type: 'choice', options: [opt('a', '40 °C and 60 °C', '40 °C và 60 °C'), opt('b', '20 °C and 40 °C', '20 °C và 40 °C'), opt('c', '60 °C and 80 °C', '60 °C và 80 °C')], answer: 'a' },
        hint: '50 is between which two temperatures in the table?', hintVn: '50 nằm giữa hai nhiệt độ nào trong bảng?',
      },
      {
        title: 'So the time is between…', titleVn: 'Vậy thời gian nằm trong khoảng…',
        input: { type: 'choice', options: [opt('a', '35 s and 60 s', '35 giây và 60 giây'), opt('b', '60 s and 90 s', '60 giây và 90 giây'), opt('c', '20 s and 35 s', '20 giây và 35 giây')], answer: 'a' },
        hint: 'Read the times for 40 °C and 60 °C.', hintVn: 'Đọc thời gian ở 40 °C và 60 °C.',
      },
      {
        title: 'Predict the time at 50 °C', titleVn: 'Dự đoán thời gian ở 50 °C',
        input: { type: 'number', before: '50 °C:', after: 's', answer: '48', tol: 7 },
        line: 'At 50 °C it should take about @ s (between 35 s and 60 s).', lineVn: 'Ở 50 °C đường sẽ tan trong khoảng @ giây (giữa 35 và 60 giây).',
        hint: 'Choose a time about halfway between 35 s and 60 s.', hintVn: 'Chọn thời gian ở khoảng giữa 35 giây và 60 giây.',
        slips: [
          { value: '70', step: 2, msg: '70 s is slower than at 40 °C. Warmer water dissolves sugar faster, so the time is less than 60 s.', msgVn: '70 giây còn chậm hơn ở 40 °C. Nước ấm hơn làm đường tan nhanh hơn, nên thời gian ít hơn 60 giây.' },
          { value: '20', step: 1, msg: '20 s is the time at 80 °C. Find the rows either side of 50 °C.', msgVn: '20 giây là thời gian ở 80 °C. Em tìm hai hàng ở hai bên 50 °C.' },
        ],
      },
    ],
  },
  {
    id: 's8', level: 'challenge',
    prompt: 'Mr. David wants to test whether salt water freezes more slowly than tap water. [[Which things must he keep the same?]]',
    promptVn: 'Thầy David muốn thử xem nước muối có đông đá chậm hơn nước máy không. [[Thầy phải giữ nguyên những gì?]]',
    steps: [
      {
        title: 'What does he change?', titleVn: 'Thầy thay đổi gì?',
        input: { type: 'choice', options: [opt('water', 'The kind of water', 'Loại nước'), opt('freezer', 'The freezer', 'Tủ đông'), opt('cup', 'The size of the cup', 'Kích thước cốc')], answer: 'water' },
        line: 'Change: salt water or tap water.', lineVn: 'Thay đổi: nước muối hoặc nước máy.',
        hint: 'What is he comparing?', hintVn: 'Thầy đang so sánh cái gì?',
      },
      {
        title: 'What does he measure?', titleVn: 'Thầy đo gì?',
        input: { type: 'choice', options: [opt('time', 'The time until the water is frozen', 'Thời gian đến khi nước đông đá'), opt('salt', 'How much salt there is', 'Lượng muối'), opt('size', 'The size of the cup', 'Kích thước cốc')], answer: 'time' },
        line: 'Measure: the time until it freezes.', lineVn: 'Đo: thời gian đến khi nước đông đá.',
        hint: '“Freezes more slowly” is about time.', hintVn: '“Đông đá chậm hơn” là nói về thời gian.',
      },
      {
        title: 'Tick everything he keeps the same', titleVn: 'Chọn tất cả những gì giữ nguyên',
        input: { type: 'multi', options: [opt('amount', 'The amount of water', 'Lượng nước'), opt('freezer', 'The freezer', 'Tủ đông'), opt('cup', 'The size of the cup', 'Kích thước cốc'), opt('water', 'The kind of water', 'Loại nước')], answer: ['amount', 'freezer', 'cup'] },
        line: 'Keep the same: the amount of water, the freezer, the size of the cup.', lineVn: 'Giữ nguyên: lượng nước, tủ đông, kích thước cốc.',
        hint: 'Everything except the kind of water.', hintVn: 'Mọi thứ, trừ loại nước.',
        slips: [
          { value: ['amount', 'freezer', 'cup', 'water'], step: 1, msg: 'The kind of water is what he changes. It cannot stay the same.', msgVn: 'Loại nước là thứ thầy thay đổi. Không thể giữ nguyên.' },
          { value: ['amount', 'freezer'], step: 1, msg: 'A bigger cup could freeze at a different speed. Only the kind of water should change.', msgVn: 'Cốc to hơn có thể đông đá nhanh chậm khác. Chỉ loại nước được thay đổi.' },
        ],
      },
    ],
  },
];
