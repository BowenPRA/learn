// Sentence frames and plan questions for timed writing, by the kind of writing a prompt
// asks for (`type` in a unit's `writing`). Frames take the sentence-building load off a
// writer so the minutes go on ideas. `___` is the gap the student fills.
// A unit may add its own frames with `writing.frames` ({ stage, text }).
//
// From the Dashboard's GED frame bank (src/utils/essayFrames.js), widened from the one
// two-source argument essay to the kinds of writing the Upper Secondary units set.

const S = (id, label, hint) => ({ id, label, hint })
const F = (stage, text) => ({ stage, text })
const Q = (id, label, placeholder) => ({ id, label, placeholder })

export const KINDS = {
  narrative: {
    label: 'Story',
    stages: [
      S('start', 'Beginning', 'Who, where, when. Make the reader want to know more.'),
      S('middle', 'What happened', 'Tell the events in order. Use past tense.'),
      S('detail', 'Details', 'What you saw, heard and felt.'),
      S('end', 'Ending', 'How it ended, and what you learned.'),
    ],
    frames: [
      F('start', 'It was a ___ day in ___ when ___.'),
      F('start', 'I will never forget the day ___.'),
      F('middle', 'At first, ___. Then ___.'),
      F('middle', 'Suddenly, ___.'),
      F('middle', 'After that, ___, so ___.'),
      F('detail', 'I could hear ___ and smell ___.'),
      F('detail', 'I felt ___ because ___.'),
      F('end', 'In the end, ___.'),
      F('end', 'That day taught me that ___.'),
    ],
    plan: [
      Q('start', 'Where and when does it begin? Who is there?', 'the beach, last summer, my family'),
      Q('middle', 'What happens, in order? (three events)', 'we arrive · my brother loses his shoe · the search'),
      Q('detail', 'One thing you saw, heard or felt', 'the cold water, everyone shouting'),
      Q('end', 'How does it end? What did you learn?', 'my father finds it; small things can ruin a day'),
    ],
  },
  descriptive: {
    label: 'Description',
    stages: [
      S('start', 'Introduce it', 'What and where it is, and your feeling about it.'),
      S('senses', 'The senses', 'Sight, sound, smell, touch.'),
      S('end', 'Why it matters', 'Why it is special to you.'),
    ],
    frames: [
      F('start', '___ is a ___ place near ___.'),
      F('senses', 'When you walk in, the first thing you notice is ___.'),
      F('senses', 'The air smells of ___, and you can hear ___.'),
      F('senses', 'On one side there is ___; on the other, ___.'),
      F('end', '___ is special to me because ___.'),
    ],
    plan: [
      Q('start', 'What is it, and where?', 'a small cafe by the river'),
      Q('senses', 'What do you see, hear, smell?', 'boats, quiet music, coffee'),
      Q('end', 'Why is it special to you?', 'it is where I feel calm'),
    ],
  },
  explanatory: {
    label: 'Explanation',
    stages: [
      S('start', 'Introduction', 'Say what you will explain and why it matters.'),
      S('steps', 'Steps or reasons', 'One step or reason in each paragraph.'),
      S('end', 'Conclusion', 'Sum up in new words.'),
    ],
    frames: [
      F('start', 'There are ___ main reasons why ___.'),
      F('start', 'This essay explains how to ___.'),
      F('steps', 'First, ___. This is important because ___.'),
      F('steps', 'Next, ___. For example, ___.'),
      F('steps', 'Another reason is that ___.'),
      F('steps', 'Finally, ___.'),
      F('end', 'In short, ___.'),
    ],
    plan: [
      Q('start', 'What are you explaining?', 'how to make a simple sandwich'),
      Q('steps', 'Your steps or reasons, in order', 'bread · filling · sauce'),
      Q('end', 'Your last sentence', 'with these steps anyone can make it'),
    ],
  },
  argument: {
    label: 'Argument',
    stages: [
      S('start', 'Your position', 'Say what you think, and the main reason.'),
      S('reasons', 'Reasons and evidence', 'One reason a paragraph, with an example.'),
      S('other', 'The other side', 'What others say, and your answer.'),
      S('end', 'Conclusion', 'Your position again, in new words.'),
    ],
    frames: [
      F('start', 'I believe that ___ because ___.'),
      F('start', 'Some people think ___, but I disagree.'),
      F('reasons', 'The main reason is that ___. For example, ___.'),
      F('reasons', 'This shows that ___.'),
      F('other', 'It is true that ___. However, ___.'),
      F('other', 'Even if ___, it does not change the fact that ___.'),
      F('end', 'For these reasons, ___.'),
    ],
    plan: [
      Q('start', 'What do you think, in one line?', 'phones should stay in bags during class'),
      Q('reasons', 'Two reasons, each with an example', 'focus: grades went up · fewer fights over messages'),
      Q('other', 'What would someone who disagrees say? Your answer.', 'emergencies: the office phone is there'),
      Q('end', 'Your last sentence', 'class time is for learning'),
    ],
  },
}

// One paragraph: a topic sentence, details, a closing sentence (the short practice write).
// The detail frames are the joins a unit teaches (comma + so / but, because first), so a
// writer practises them in their own sentences. Each prompt gives its own plan examples
// (`plan` on the prompt), since one example cannot fit every topic.
KINDS.paragraph = {
  label: 'Paragraph',
  stages: [
    S('start', 'Topic sentence', 'One sentence that says the main idea.'),
    S('detail', 'Details', 'Two or three details. Each one is a complete sentence.'),
    S('end', 'Closing sentence', 'Finish the idea.'),
  ],
  frames: [
    F('start', '___ is important to me because ___.'),
    F('start', 'I remember ___ well.'),
    F('detail', 'First, ___.'),
    F('detail', '___, so ___.'),
    F('detail', '___, but ___.'),
    F('detail', 'Because ___, ___.'),
    F('detail', 'For example, ___.'),
    F('end', 'That is why ___.'),
  ],
  plan: [
    Q('start', 'What is the main idea, in one sentence?', 'the park near my home is my favourite place'),
    Q('detail', 'Two or three details', 'quiet in the morning · I run there with my dad · the old trees'),
    Q('end', 'How will you finish the idea?', 'it is where I feel calm'),
  ],
}

KINDS.letter = {
  ...KINDS.explanatory, label: 'Letter',
  frames: [
    F('start', 'Dear ___,'),
    F('start', 'I am writing to ___.'),
    ...KINDS.explanatory.frames.filter((f) => f.stage === 'steps'),
    F('end', 'Thank you for ___. I look forward to ___.'),
    F('end', 'Yours sincerely,'),
  ],
}
KINDS.summary = { ...KINDS.explanatory, label: 'Summary' }

export const kindOf = (type) => KINDS[type] || KINDS.explanatory

/** The kind's stages, each with its frames (and any the unit adds). */
export function framesByStage(type, extra = []) {
  const k = kindOf(type)
  const all = [...k.frames, ...(Array.isArray(extra) ? extra : [])]
  return k.stages.map((s) => ({ ...s, frames: all.filter((f) => f.stage === s.id) })).filter((s) => s.frames.length)
}

/** The plan questions for a kind of writing. */
export const planFields = (type) => kindOf(type).plan
