// Sample set: Year 5 English, verbs and the past tense — find the verb, change
// its tense, write the sentence. Original sentences written for PRA. The
// English being learned stays English in every language; only the
// instructions have Vietnamese twins.

export default [
  {
    id: 'e1', level: 'focus',
    prompt: 'Change the sentence to the past: [[The children play football after class.]]',
    promptVn: 'Chuyển câu sau sang thì quá khứ: [[The children play football after class.]]',
    steps: [
      {
        title: 'Tap the verb', titleVn: 'Bấm vào động từ',
        input: { type: 'tap', sentence: 'The children play football after class.', answer: ['play'] },
        line: 'The verb is @.', lineVn: 'Động từ là @.',
        hint: 'The verb is the action word. What do the children do?', hintVn: 'Động từ là từ chỉ hành động. Các bạn nhỏ làm gì?',
        slips: [{ value: ['football'], msg: 'Football is a thing, a noun. The verb is what the children do with it.', msgVn: 'Football là một danh từ. Động từ là việc các bạn làm với quả bóng.' }],
      },
      {
        title: 'Write the verb in the past', titleVn: 'Viết động từ ở thì quá khứ',
        input: { type: 'text', before: 'play →', answer: 'played' },
        hint: 'Play is a regular verb: add -ed.', hintVn: 'Play là động từ có quy tắc: thêm -ed.',
        slips: [{ value: 'plaied', msg: 'Play ends in a vowel and y, so keep the y: played.', msgVn: 'Play kết thúc bằng nguyên âm và y, nên giữ nguyên y: played.' }],
      },
      {
        title: 'Write the sentence in the past', titleVn: 'Viết cả câu ở thì quá khứ',
        input: { type: 'gap', text: 'The children ___ football after class.', answers: [['played']] },
        hint: 'Only the verb changes.', hintVn: 'Chỉ động từ thay đổi.',
      },
    ],
  },
  {
    id: 'e2', level: 'focus',
    prompt: 'Find the verbs and change them to the past: [[We swim in the river and eat lunch on the bank.]]',
    promptVn: 'Tìm các động từ và chuyển sang thì quá khứ: [[We swim in the river and eat lunch on the bank.]]',
    steps: [
      {
        title: 'Tap the two verbs', titleVn: 'Bấm vào hai động từ',
        input: { type: 'tap', sentence: 'We swim in the river and eat lunch on the bank.', answer: ['swim', 'eat'] },
        line: 'The verbs are @.', lineVn: 'Các động từ là @.',
        hint: 'Look for two things we do.', hintVn: 'Tìm hai việc chúng ta làm.',
        slips: [{ value: ['swim'], msg: 'Swim is one. There is a second action after “and”.', msgVn: 'Swim là một động từ. Còn một hành động nữa sau “and”.' }],
      },
      {
        title: 'Choose the past of swim', titleVn: 'Chọn thì quá khứ của swim',
        input: { type: 'choice', options: [{ id: 'a', text: 'swam' }, { id: 'b', text: 'swimmed' }, { id: 'c', text: 'swum' }], answer: 'a' },
        line: 'swim → @', hint: 'Swim is irregular: it does not take -ed.', hintVn: 'Swim là động từ bất quy tắc: không thêm -ed.',
        slips: [{ value: 'b', msg: 'Swim is irregular, so -ed does not work. Its past is swam.', msgVn: 'Swim là động từ bất quy tắc, nên không thêm -ed. Quá khứ của nó là swam.' }],
      },
      {
        title: 'Write the sentence in the past', titleVn: 'Viết cả câu ở thì quá khứ',
        input: { type: 'gap', text: 'We ___ in the river and ___ lunch on the bank.', answers: [['swam'], ['ate']], bank: ['swam', 'ate', 'eated', 'swimmed'] },
        hint: 'Both verbs are irregular. The past of eat is ate.', hintVn: 'Cả hai động từ đều bất quy tắc. Quá khứ của eat là ate.',
        slips: [{ value: ['swam', 'eated'], msg: 'Eat is irregular too. Its past is ate.', msgVn: 'Eat cũng là động từ bất quy tắc. Quá khứ của nó là ate.' }],
      },
    ],
  },
  {
    id: 'e3', level: 'practice',
    prompt: 'Change the sentence to the past: [[My brother carries the shopping home.]]',
    promptVn: 'Chuyển câu sau sang thì quá khứ: [[My brother carries the shopping home.]]',
    steps: [
      {
        title: 'Tap the verb', titleVn: 'Bấm vào động từ',
        input: { type: 'tap', sentence: 'My brother carries the shopping home.', answer: ['carries'] },
        line: 'The verb is @.', lineVn: 'Động từ là @.',
        hint: 'What does my brother do?', hintVn: 'Anh trai làm gì?',
      },
      {
        key: true,
        title: 'Write carry in the past', titleVn: 'Viết carry ở thì quá khứ',
        input: { type: 'text', before: 'carry →', answer: 'carried' },
        hint: 'A consonant and y: change y to i and add -ed.', hintVn: 'Phụ âm và y: đổi y thành i rồi thêm -ed.',
        slips: [{ value: 'carryed', msg: 'After a consonant, y changes to i before -ed: carried.', msgVn: 'Sau phụ âm, y đổi thành i trước khi thêm -ed: carried.' }],
      },
      {
        title: 'Write the sentence in the past', titleVn: 'Viết cả câu ở thì quá khứ',
        input: { type: 'gap', text: 'My brother ___ the shopping home.', answers: [['carried']] },
        hint: 'The past is the same for he, she and they: no -s.', hintVn: 'Thì quá khứ giống nhau với he, she và they: không thêm -s.',
        slips: [{ value: ['carrieds'], step: 2, msg: 'The past has no -s ending: carried.', msgVn: 'Thì quá khứ không thêm -s: carried.' }],
      },
    ],
  },
  {
    id: 'e4', level: 'practice',
    prompt: 'Put the words in order to make a sentence in the past.', promptVn: 'Sắp xếp các từ thành một câu ở thì quá khứ.',
    steps: [
      {
        title: 'Which word is the verb?', titleVn: 'Từ nào là động từ?',
        input: { type: 'choice', options: [{ id: 'v', text: 'visited' }, { id: 'y', text: 'yesterday' }, { id: 'g', text: 'grandma' }], answer: 'v' },
        hint: 'The verb is the action, and it is already in the past.', hintVn: 'Động từ là hành động, và đã ở thì quá khứ.',
      },
      {
        title: 'Put the words in order', titleVn: 'Sắp xếp các từ theo thứ tự',
        input: { type: 'order', items: [{ id: 'we', text: 'We' }, { id: 'vis', text: 'visited' }, { id: 'gm', text: 'Grandma' }, { id: 'yd', text: 'yesterday.' }] },
        line: 'We visited Grandma yesterday.',
        hint: 'Who did it, what they did, who to, when.', hintVn: 'Ai làm, làm gì, với ai, khi nào.',
        slips: [{ value: ['vis', 'we', 'gm', 'yd'], step: 1, msg: 'An English sentence starts with who did it: We.', msgVn: 'Câu tiếng Anh bắt đầu bằng người làm: We.' }],
      },
    ],
  },
  {
    id: 'e5', level: 'challenge',
    prompt: 'Write the past of the verb: [[Every morning, Mr. David catches the bus.]]',
    promptVn: 'Viết thì quá khứ của động từ: [[Every morning, Mr. David catches the bus.]]',
    steps: [
      {
        title: 'Tap the verb', titleVn: 'Bấm vào động từ',
        input: { type: 'tap', sentence: 'Every morning, Mr. David catches the bus.', answer: ['catches'] },
        line: 'Verb: @.', lineVn: 'Động từ: @.',
        hint: 'What does Mr. David do?', hintVn: 'Thầy David làm gì?',
      },
      {
        title: 'Regular or irregular?', titleVn: 'Có quy tắc hay bất quy tắc?',
        input: { type: 'choice', options: [{ id: 'irr', text: 'Irregular: catch → caught', textVn: 'Bất quy tắc: catch → caught' }, { id: 'reg', text: 'Regular: catch → catched', textVn: 'Có quy tắc: catch → catched' }], answer: 'irr' },
        hint: 'Say it aloud: “Yesterday he catched…” sounds wrong.', hintVn: 'Em đọc to: “Yesterday he catched…” nghe sai.',
      },
      {
        title: 'The verb in the past', titleVn: 'Động từ ở thì quá khứ',
        input: { type: 'text', before: 'Yesterday, Mr. David', after: 'the bus.', answer: 'caught' },
        hint: 'catch, caught: like teach, taught.', hintVn: 'catch, caught: giống teach, taught.',
        slips: [
          { value: 'catched', step: 2, msg: 'Catch is irregular, so it does not take -ed.', msgVn: 'Catch là động từ bất quy tắc, nên không thêm -ed.' },
          { value: 'catches', step: 1, msg: 'That is still the present. Change the verb to the past.', msgVn: 'Như vậy vẫn là thì hiện tại. Em đổi động từ sang quá khứ.' },
        ],
      },
    ],
  },
  {
    id: 'e6', level: 'challenge',
    prompt: 'Write the sentence in the past: [[The baby cries and the dog runs away.]]',
    promptVn: 'Viết câu sau ở thì quá khứ: [[The baby cries and the dog runs away.]]',
    steps: [
      {
        title: 'Tap the two verbs', titleVn: 'Bấm vào hai động từ',
        input: { type: 'tap', sentence: 'The baby cries and the dog runs away.', answer: ['cries', 'runs'] },
        line: 'Verb: @.', lineVn: 'Động từ: @.',
        hint: 'What does the baby do? What does the dog do?', hintVn: 'Em bé làm gì? Con chó làm gì?',
      },
      {
        title: 'Change cry to the past', titleVn: 'Đổi cry sang thì quá khứ',
        input: { type: 'text', before: 'cry →', answer: 'cried' },
        hint: 'A consonant and y: y becomes i, then -ed.', hintVn: 'Phụ âm và y: y thành i, rồi thêm -ed.',
      },
      {
        title: 'Change run to the past', titleVn: 'Đổi run sang thì quá khứ',
        input: { type: 'text', before: 'run →', answer: 'ran' },
        hint: 'Run is irregular.', hintVn: 'Run là động từ bất quy tắc.',
      },
      {
        title: 'Write the sentence in the past', titleVn: 'Viết cả câu ở thì quá khứ',
        input: { type: 'gap', text: 'The baby ___ and the dog ___ away.', answers: [['cried'], ['ran']] },
        hint: 'Use the two past verbs.', hintVn: 'Dùng hai động từ ở thì quá khứ.',
        slips: [
          { value: ['cryed', 'ran'], step: 2, msg: 'Cry has a consonant before y, so y becomes i: cried.', msgVn: 'Cry có phụ âm trước y, nên y thành i: cried.' },
          { value: ['cried', 'runned'], step: 3, msg: 'Run is irregular: its past is ran.', msgVn: 'Run là động từ bất quy tắc: quá khứ là ran.' },
        ],
      },
    ],
  },
];
