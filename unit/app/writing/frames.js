// Sentence frames and plan questions for timed writing, by the kind of writing a prompt
// asks for (`type` in a unit's `writing`). Frames take the sentence-building load off a
// second-language writer so the minutes go on ideas. `___` is the gap the student fills.
// A unit may add its own frames with `writing.frames` ({ stage, text, textVn }).
//
// From the Dashboard's GED frame bank (src/utils/essayFrames.js), widened from the one
// two-source argument essay to the kinds of writing the Upper Secondary units set.

const S = (id, label, labelVn, hint, hintVn) => ({ id, label, labelVn, hint, hintVn })
const F = (stage, text, textVn) => ({ stage, text, textVn })
const Q = (id, label, labelVn, placeholder) => ({ id, label, labelVn, placeholder })

export const KINDS = {
  narrative: {
    label: 'Story', labelVn: 'Kể chuyện',
    stages: [
      S('start', 'Beginning', 'Mở đầu', 'Who, where, when. Make the reader want to know more.', 'Ai, ở đâu, khi nào. Làm người đọc muốn biết thêm.'),
      S('middle', 'What happened', 'Diễn biến', 'Tell the events in order. Use past tense.', 'Kể các sự việc theo thứ tự. Dùng thì quá khứ.'),
      S('detail', 'Details', 'Chi tiết', 'What you saw, heard and felt.', 'Điều bạn thấy, nghe và cảm thấy.'),
      S('end', 'Ending', 'Kết thúc', 'How it ended, and what you learned.', 'Kết thúc ra sao, và bạn học được gì.'),
    ],
    frames: [
      F('start', 'It was a ___ day in ___ when ___.', 'Đó là một ngày ___ ở ___ khi ___.'),
      F('start', 'I will never forget the day ___.', 'Tôi sẽ không bao giờ quên ngày ___.'),
      F('middle', 'At first, ___. Then ___.', 'Lúc đầu, ___. Sau đó ___.'),
      F('middle', 'Suddenly, ___.', 'Đột nhiên, ___.'),
      F('middle', 'After that, ___, so ___.', 'Sau đó, ___, nên ___.'),
      F('detail', 'I could hear ___ and smell ___.', 'Tôi có thể nghe ___ và ngửi thấy ___.'),
      F('detail', 'I felt ___ because ___.', 'Tôi cảm thấy ___ vì ___.'),
      F('end', 'In the end, ___.', 'Cuối cùng, ___.'),
      F('end', 'That day taught me that ___.', 'Ngày hôm đó dạy tôi rằng ___.'),
    ],
    plan: [
      Q('start', 'Where and when does it begin? Who is there?', 'Bắt đầu ở đâu, khi nào? Có ai?', 'Hoi An beach, last summer, my family'),
      Q('middle', 'What happens, in order? (three events)', 'Điều gì xảy ra, theo thứ tự? (ba sự việc)', 'we arrive · my brother loses his shoe · the search'),
      Q('detail', 'One thing you saw, heard or felt', 'Một điều bạn thấy, nghe hoặc cảm thấy', 'the cold water, everyone shouting'),
      Q('end', 'How does it end? What did you learn?', 'Kết thúc ra sao? Bạn học được gì?', 'my father finds it; small things can ruin a day'),
    ],
  },
  descriptive: {
    label: 'Description', labelVn: 'Miêu tả',
    stages: [
      S('start', 'Introduce it', 'Giới thiệu', 'What and where it is, and your feeling about it.', 'Nó là gì, ở đâu, và cảm nghĩ của bạn.'),
      S('senses', 'The senses', 'Các giác quan', 'Sight, sound, smell, touch.', 'Nhìn, nghe, ngửi, chạm.'),
      S('end', 'Why it matters', 'Vì sao quan trọng', 'Why it is special to you.', 'Vì sao nó đặc biệt với bạn.'),
    ],
    frames: [
      F('start', '___ is a ___ place near ___.', '___ là một nơi ___ gần ___.'),
      F('senses', 'When you walk in, the first thing you notice is ___.', 'Khi bước vào, điều đầu tiên bạn nhận thấy là ___.'),
      F('senses', 'The air smells of ___, and you can hear ___.', 'Không khí có mùi ___, và bạn có thể nghe ___.'),
      F('senses', 'On one side there is ___; on the other, ___.', 'Một bên có ___; bên kia, ___.'),
      F('end', '___ is special to me because ___.', '___ đặc biệt với tôi vì ___.'),
    ],
    plan: [
      Q('start', 'What is it, and where?', 'Nó là gì, ở đâu?', 'a small cafe by the river'),
      Q('senses', 'What do you see, hear, smell?', 'Bạn thấy, nghe, ngửi gì?', 'boats, quiet music, coffee'),
      Q('end', 'Why is it special to you?', 'Vì sao nó đặc biệt với bạn?', 'it is where I feel calm'),
    ],
  },
  explanatory: {
    label: 'Explanation', labelVn: 'Giải thích',
    stages: [
      S('start', 'Introduction', 'Mở bài', 'Say what you will explain and why it matters.', 'Nói bạn sẽ giải thích gì và vì sao quan trọng.'),
      S('steps', 'Steps or reasons', 'Các bước hoặc lý do', 'One step or reason in each paragraph.', 'Mỗi đoạn một bước hoặc một lý do.'),
      S('end', 'Conclusion', 'Kết bài', 'Sum up in new words.', 'Tóm lại bằng lời mới.'),
    ],
    frames: [
      F('start', 'There are ___ main reasons why ___.', 'Có ___ lý do chính vì sao ___.'),
      F('start', 'This essay explains how to ___.', 'Bài viết này giải thích cách ___.'),
      F('steps', 'First, ___. This is important because ___.', 'Đầu tiên, ___. Điều này quan trọng vì ___.'),
      F('steps', 'Next, ___. For example, ___.', 'Tiếp theo, ___. Ví dụ, ___.'),
      F('steps', 'Another reason is that ___.', 'Một lý do khác là ___.'),
      F('steps', 'Finally, ___.', 'Cuối cùng, ___.'),
      F('end', 'In short, ___.', 'Tóm lại, ___.'),
    ],
    plan: [
      Q('start', 'What are you explaining?', 'Bạn đang giải thích điều gì?', 'how to make banh mi'),
      Q('steps', 'Your steps or reasons, in order', 'Các bước hoặc lý do, theo thứ tự', 'bread · filling · sauce'),
      Q('end', 'Your last sentence', 'Câu cuối của bạn', 'with these steps anyone can make it'),
    ],
  },
  argument: {
    label: 'Argument', labelVn: 'Nghị luận',
    stages: [
      S('start', 'Your position', 'Quan điểm', 'Say what you think, and the main reason.', 'Nói bạn nghĩ gì, và lý do chính.'),
      S('reasons', 'Reasons and evidence', 'Lý do và dẫn chứng', 'One reason a paragraph, with an example.', 'Mỗi đoạn một lý do, có ví dụ.'),
      S('other', 'The other side', 'Phía bên kia', 'What others say, and your answer.', 'Người khác nói gì, và câu trả lời của bạn.'),
      S('end', 'Conclusion', 'Kết luận', 'Your position again, in new words.', 'Nhắc lại quan điểm bằng lời mới.'),
    ],
    frames: [
      F('start', 'I believe that ___ because ___.', 'Tôi tin rằng ___ vì ___.'),
      F('start', 'Some people think ___, but I disagree.', 'Một số người nghĩ ___, nhưng tôi không đồng ý.'),
      F('reasons', 'The main reason is that ___. For example, ___.', 'Lý do chính là ___. Ví dụ, ___.'),
      F('reasons', 'This shows that ___.', 'Điều này cho thấy ___.'),
      F('other', 'It is true that ___. However, ___.', 'Đúng là ___. Tuy nhiên, ___.'),
      F('other', 'Even if ___, it does not change the fact that ___.', 'Ngay cả khi ___, điều đó không thay đổi sự thật rằng ___.'),
      F('end', 'For these reasons, ___.', 'Vì những lý do này, ___.'),
    ],
    plan: [
      Q('start', 'What do you think, in one line?', 'Bạn nghĩ gì, trong một dòng?', 'phones should stay in bags during class'),
      Q('reasons', 'Two reasons, each with an example', 'Hai lý do, mỗi lý do một ví dụ', 'focus: grades went up · fewer fights over messages'),
      Q('other', 'What would someone who disagrees say? Your answer.', 'Người không đồng ý sẽ nói gì? Câu trả lời của bạn.', 'emergencies: the office phone is there'),
      Q('end', 'Your last sentence', 'Câu cuối của bạn', 'class time is for learning'),
    ],
  },
}

KINDS.letter = {
  ...KINDS.explanatory, label: 'Letter', labelVn: 'Thư',
  frames: [
    F('start', 'Dear ___,', 'Kính gửi ___,'),
    F('start', 'I am writing to ___.', 'Tôi viết thư này để ___.'),
    ...KINDS.explanatory.frames.filter((f) => f.stage === 'steps'),
    F('end', 'Thank you for ___. I look forward to ___.', 'Cảm ơn ___. Tôi mong ___.'),
    F('end', 'Yours sincerely,', 'Trân trọng,'),
  ],
}
KINDS.summary = { ...KINDS.explanatory, label: 'Summary', labelVn: 'Tóm tắt' }

export const kindOf = (type) => KINDS[type] || KINDS.explanatory

/** The kind's stages, each with its frames (and any the unit adds). */
export function framesByStage(type, extra = []) {
  const k = kindOf(type)
  const all = [...k.frames, ...(Array.isArray(extra) ? extra : [])]
  return k.stages.map((s) => ({ ...s, frames: all.filter((f) => f.stage === s.id) })).filter((s) => s.frames.length)
}

/** The plan questions for a kind of writing. */
export const planFields = (type) => kindOf(type).plan
