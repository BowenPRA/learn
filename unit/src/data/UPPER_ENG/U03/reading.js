// unit/src/data/UPPER_ENG/U03/reading.js
// Unit 3 reading: one short non-fiction passage, written for PRA Learn, with six questions:
// two on what it says, two on its words, two on how it is built. It runs on the quiz screen
// (unit/app/engines.js, Reading) and is untimed.
//
// The passage uses the unit's nouns correctly throughout: things you cannot count (water,
// air, rain), plurals (drops, clouds, rivers), "the" for the one the reader knows (the sun,
// the sea) and no article for things in general.
// Multiple-choice key: r1 C, r2 A, r3 D, r4 B, r5 C.
export const reading = {
  timeLimit: 0,
  passages: [
    {
      id: "u3r_rain",
      title: "Where Rain Comes From",
      meta: "Non-fiction • written for PRA Learn",
      text: [
        "(1) Every drop of rain has been on a long journey. The water in a raindrop was probably in the sea only a few days ago. To get into the sky, it had to change its form twice.",
        "(2) The journey starts with the sun. The sun warms the water in seas, lakes and rivers. Some of this water turns into a gas called water vapour. We cannot see water vapour, but it is in the air all around us.",
        "(3) Warm air rises, and it carries the water vapour up into the sky. High above the ground, the air is much colder. The cold turns the vapour back into tiny drops of water. Millions of these drops together make a cloud.",
        "(4) Inside a cloud, the tiny drops bump into each other and join. They grow bigger and heavier. When they are too heavy to float, they fall to the ground as rain. If the air is very cold, they fall as snow.",
        "(5) Rain fills streams and rivers, and the rivers carry the water back to the sea. Then the sun warms it again, and the journey starts again. Scientists call this the water cycle. The water we drink today is very old: the same water has gone round this cycle for millions of years."
      ],
      glossary: {
        "journey": { def: "A trip from one place to another." },
        "vapour": { def: "A gas made when a liquid is heated." },
        "cycle": { def: "Something that happens again and again, in the same order." }
      }
    }
  ],
  questions: [
    {
      id: "r1",
      passageId: "u3r_rain",
      type: "mcq",
      title: "1. What turns water in the sea into water vapour?",
      options: [
        { val: "A", text: "A. Cold air" },
        { val: "B", text: "B. The wind" },
        { val: "C", text: "C. The sun warming it" },
        { val: "D", text: "D. The rivers" }
      ],
      correct: "C",
      expEn: "Paragraph 2: \"The sun warms the water … Some of this water turns into a gas called water vapour.\"",
    },
    {
      id: "r2",
      passageId: "u3r_rain",
      type: "mcq",
      title: "2. Why do the drops fall out of a cloud?",
      options: [
        { val: "A", text: "A. They join, and become too heavy to float." },
        { val: "B", text: "B. The sun pushes them down." },
        { val: "C", text: "C. The air around them gets warm." },
        { val: "D", text: "D. The cloud breaks." }
      ],
      correct: "A",
      expEn: "Paragraph 4: the drops \"bump into each other and join\". When they are \"too heavy to float\", they fall.",
    },
    {
      id: "r3",
      passageId: "u3r_rain",
      type: "mcq",
      title: "3. What is water vapour?",
      options: [
        { val: "A", text: "A. A very small cloud" },
        { val: "B", text: "B. Very cold water" },
        { val: "C", text: "C. Snow" },
        { val: "D", text: "D. Water as a gas" }
      ],
      correct: "D",
      expEn: "The writer explains the word in the same sentence: water \"turns into a gas called water vapour\".",
    },
    {
      id: "r4",
      passageId: "u3r_rain",
      type: "mcq",
      title: "4. Paragraph 4: \"When they are too heavy to float …\". What does \"float\" mean here?",
      options: [
        { val: "A", text: "A. To fall quickly" },
        { val: "B", text: "B. To stay up in the air without falling" },
        { val: "C", text: "C. To swim" },
        { val: "D", text: "D. To freeze" }
      ],
      correct: "B",
      expEn: "Small drops stay up in the cloud. When they are too heavy to do that, they fall. So \"float\" means to stay up without falling.",
    },
    {
      id: "r5",
      passageId: "u3r_rain",
      type: "mcq",
      title: "5. What is paragraph 3 mainly about?",
      options: [
        { val: "A", text: "A. Why the sea is salty" },
        { val: "B", text: "B. How rain falls as snow" },
        { val: "C", text: "C. How clouds are made" },
        { val: "D", text: "D. How old our water is" }
      ],
      correct: "C",
      expEn: "Paragraph 3 follows the vapour up into the cold air, where it turns into tiny drops, and ends: \"Millions of these drops together make a cloud.\"",
    },
    {
      // How the passage is built: the journey, in order.
      id: "r6",
      passageId: "u3r_rain",
      type: "order",
      title: "6. Put the steps of the journey in order.",
      options: [],
      bank: [
        { id: "b1", val: "fall", text: "The drops fall as rain." },
        { id: "b2", val: "warm", text: "The sun warms the sea." },
        { id: "b3", val: "cool", text: "The vapour cools into tiny drops." },
        { id: "b4", val: "rise", text: "Warm air carries the vapour up." }
      ],
      targets: [{ id: "steps", title: "First to last" }],
      correctSets: { steps: ["warm", "rise", "cool", "fall"] },
      expEn: "Paragraph 2: the sun warms the sea. Paragraph 3: warm air carries the vapour up, and the cold turns it into drops. Paragraph 4: the drops grow and fall as rain. Each paragraph is one step of the journey.",
    }
  ]
};
