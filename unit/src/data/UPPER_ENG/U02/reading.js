// unit/src/data/UPPER_ENG/U02/reading.js
// Unit 2 reading (Bowen, 21 November 2026: yes to a reading passage from Unit 2 on, the
// first of the plan's reading strand). One short non-fiction passage, written for PRA
// Learn, with six questions: two on what it says, two on its words, two on how it is
// built. It runs on the quiz screen (unit/app/engines.js, Reading) and is untimed.
//
// The passage is full of the unit's own grammar used correctly: the present simple with
// -s for one bee, "there is / there are", and "be" where nothing happens.
// Multiple-choice key: r1 B, r2 C, r3 A, r4 D, r5 B.
export const reading = {
  timeLimit: 0,
  passages: [
    {
      id: "u2r_bees",
      title: "How Bees Make Honey",
      meta: "Non-fiction • written for PRA Learn",
      text: [
        "(1) A honeybee hive is a busy place. In a strong hive in summer, there are tens of thousands of bees, but there is only one queen. The queen lays the eggs, sometimes more than a thousand in a day. Most of the other bees are workers. They are all female, and they do almost every job in the hive.",
        "(2) A worker bee does different jobs at different ages. A young worker cleans the hive and feeds the larvae, the baby bees. Later, she builds wax cells and guards the door. In the last weeks of her life, she flies out to collect food. In summer, a worker usually lives for about six weeks.",
        "(3) Flowers make a sweet liquid called nectar. A worker bee drinks the nectar and carries it home in a special stomach. On one trip, she visits up to a hundred flowers. Back at the hive, she passes the nectar to a younger bee.",
        "(4) Nectar is mostly water, so it is not honey yet. The young bees put it into wax cells. Then they fan it with their wings, and the moving air dries it slowly. When the honey is thick enough, the bees close each cell with a thin cap of wax. The honey stays there until the bees need it in winter.",
        "(5) All this work makes very little honey. In her whole life, one worker bee makes only about a twelfth of a teaspoon. A jar of honey on a kitchen table is the work of thousands of bees and millions of flowers."
      ],
      glossary: {
        "hive": { def: "The home of a group of bees." },
        "larvae": { def: "Very young insects, before they have their adult shape." },
        "wax": { def: "A soft material that bees make from their bodies to build their cells." },
        "cells": { def: "The small six-sided rooms that bees build out of wax." }
      }
    }
  ],
  questions: [
    {
      id: "r1",
      passageId: "u2r_bees",
      type: "mcq",
      title: "1. What does the queen do?",
      options: [
        { val: "A", text: "A. She collects nectar from flowers." },
        { val: "B", text: "B. She lays the eggs." },
        { val: "C", text: "C. She guards the door of the hive." },
        { val: "D", text: "D. She builds the wax cells." }
      ],
      correct: "B",
      expEn: "Paragraph 1: \"The queen lays the eggs.\" The other jobs belong to the workers (paragraph 2).",
    },
    {
      id: "r2",
      passageId: "u2r_bees",
      type: "mcq",
      title: "2. When does a worker bee fly out to collect food?",
      options: [
        { val: "A", text: "A. When she is very young" },
        { val: "B", text: "B. Only in winter" },
        { val: "C", text: "C. In the last weeks of her life" },
        { val: "D", text: "D. Every day of her life" }
      ],
      correct: "C",
      expEn: "Paragraph 2: \"In the last weeks of her life, she flies out to collect food.\" When she is young, she cleans the hive and feeds the larvae.",
    },
    {
      id: "r3",
      passageId: "u2r_bees",
      type: "mcq",
      title: "3. Paragraph 3 says \"a sweet liquid called nectar\". What is nectar?",
      options: [
        { val: "A", text: "A. A sweet liquid that flowers make" },
        { val: "B", text: "B. A kind of wax" },
        { val: "C", text: "C. Honey that is ready to eat" },
        { val: "D", text: "D. The food the queen eats" }
      ],
      correct: "A",
      expEn: "The writer tells you what the word means in the same sentence: \"Flowers make a sweet liquid called nectar.\" Paragraph 4 adds that nectar is not honey yet.",
    },
    {
      id: "r4",
      passageId: "u2r_bees",
      type: "mcq",
      title: "4. Paragraph 4: \"When the honey is thick enough …\". What does \"thick\" mean here?",
      options: [
        { val: "A", text: "A. Very sweet" },
        { val: "B", text: "B. Hard, like wax" },
        { val: "C", text: "C. Hot" },
        { val: "D", text: "D. Not watery: it moves slowly" }
      ],
      correct: "D",
      expEn: "Nectar is \"mostly water\", and the bees dry it. When enough water has gone, the honey is thick: it moves slowly, like honey from a jar.",
    },
    {
      id: "r5",
      passageId: "u2r_bees",
      type: "mcq",
      title: "5. Which sentence gives the main idea of paragraph 2?",
      options: [
        { val: "A", text: "A. In summer, a worker usually lives for about six weeks." },
        { val: "B", text: "B. A worker bee does different jobs at different ages." },
        { val: "C", text: "C. Later, she builds wax cells and guards the door." },
        { val: "D", text: "D. A young worker cleans the hive and feeds the larvae." }
      ],
      correct: "B",
      expEn: "The first sentence says what the whole paragraph is about. Every sentence after it gives one of the jobs, in order of age. A sentence that says the main idea like this is called a topic sentence.",
    },
    {
      // How the passage is built: the steps from flower to jar, in order.
      id: "r6",
      passageId: "u2r_bees",
      type: "order",
      title: "6. Put the steps in the order the passage gives them.",
      options: [],
      bank: [
        { id: "b1", val: "cap", text: "The bees close the cell with wax." },
        { id: "b2", val: "drink", text: "A worker drinks nectar from flowers." },
        { id: "b3", val: "fan", text: "Young bees fan the nectar with their wings." },
        { id: "b4", val: "pass", text: "The worker passes the nectar to a younger bee." }
      ],
      targets: [{ id: "steps", title: "First to last" }],
      correctSets: { steps: ["drink", "pass", "fan", "cap"] },
      expEn: "Paragraph 3: the worker drinks the nectar, then passes it to a younger bee. Paragraph 4: the young bees fan it dry, then close the cell. Words like \"back at the hive\", \"then\" and \"when\" show the order.",
    }
  ]
};
