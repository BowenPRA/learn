// unit/src/data/UPPER_ENG/U03/assessment.js
// Unit 3 quiz — nouns and articles: plurals, things you cannot count, a / an, a then the,
// and no article for things in general. Six items sit on a numbered notice, four stand
// alone. Seven are multiple choice, two are typed (q7, q8) and one is a sort (q9). Two
// come from earlier units (q5 Unit 1, q6 Unit 2). No item reuses a sentence from the lesson.
// Multiple-choice key: q1 B, q2 C, q3 A, q4 D, q5 B, q6 C, q10 B.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p3_bikes",
      title: "Notice: Weekend Bike Hire",
      meta: "Public notice • Riverside Bike Hire",
      text: [
        "(1) You can hire a bike every Saturday and Sunday from eight in the morning. (2) Each person can keep a bike for two hour. (3) Please bring a money for the deposit.",
        "(4) Childrens must wear a helmet. (5) Leave your bike at a front gate when you finish, a member of staff will check it. (6) The bike shop sell water and snacks."
      ],
      glossary: {
        "hire": { def: "To pay to use something for a short time." },
        "deposit": { def: "Money you pay first and get back when you return something." },
        "staff": { def: "The people who work for a business." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p3_bikes",
      type: "mcq",
      title: "1. Which is the correct version of sentence 2?",
      options: [
        { val: "A", text: "A. Each person can keep a bike for two hour's." },
        { val: "B", text: "B. Each person can keep a bike for two hours." },
        { val: "C", text: "C. Each person can keep a bike for two houres." },
        { val: "D", text: "D. Each person can keep a bike for a two hour." }
      ],
      correct: "B",
      expEn: "Two is more than one, so \"hour\" takes -s: two hours. An apostrophe ('s) does not make a plural.",
    },
    {
      id: "q2",
      passageId: "p3_bikes",
      type: "mcq",
      title: "2. Sentence 3: \"Please bring a money for the deposit.\" What is wrong?",
      options: [
        { val: "A", text: "A. \"money\" needs -s: a moneys" },
        { val: "B", text: "B. \"a\" should be \"an\"" },
        { val: "C", text: "C. \"money\" cannot be counted, so it takes no \"a\"" },
        { val: "D", text: "D. Nothing. It is correct." }
      ],
      correct: "C",
      expEn: "Money cannot be counted (you count coins or dollars, not \"monies\"), so it takes no a / an: \"Please bring money\" or \"some money\".",
    },
    {
      id: "q3",
      passageId: "p3_bikes",
      type: "mcq",
      title: "3. Which is the correct version of sentence 4?",
      options: [
        { val: "A", text: "A. Children must wear a helmet." },
        { val: "B", text: "B. Childs must wear a helmet." },
        { val: "C", text: "C. Childrens must wear an helmet." },
        { val: "D", text: "D. The childrens must wear a helmet." }
      ],
      correct: "A",
      expEn: "\"Child\" is irregular: one child, two children. \"Children\" is already plural, so no -s. The h in \"helmet\" is sounded, so \"a helmet\".",
    },
    {
      id: "q4",
      passageId: "p3_bikes",
      type: "mcq",
      title: "4. Sentence 5 says \"at a front gate\". Which word should replace \"a\"?",
      options: [
        { val: "A", text: "A. an" },
        { val: "B", text: "B. Nothing: \"at front gate\"" },
        { val: "C", text: "C. It is correct as written." },
        { val: "D", text: "D. the" }
      ],
      correct: "D",
      expEn: "The bike hire has one front gate, and the reader knows which one, so \"the front gate\".",
    },
    {
      // From Unit 1.
      id: "q5",
      passageId: "p3_bikes",
      type: "mcq",
      title: "5. Sentence 5: \"… when you finish, a member of staff will check it.\" What kind of mistake is this?",
      options: [
        { val: "A", text: "A. A fragment" },
        { val: "B", text: "B. A comma splice" },
        { val: "C", text: "C. A missing plural" },
        { val: "D", text: "D. No mistake" }
      ],
      correct: "B",
      expEn: "\"Leave your bike at the front gate when you finish\" and \"a member of staff will check it\" are two complete sentences with only a comma between them. Use a full stop, or \"and\".",
    },
    {
      // From Unit 2.
      id: "q6",
      passageId: "p3_bikes",
      type: "mcq",
      title: "6. Sentence 6: \"The bike shop sell water and snacks.\" What should \"sell\" be?",
      options: [
        { val: "A", text: "A. selling" },
        { val: "B", text: "B. is sell" },
        { val: "C", text: "C. sells" },
        { val: "D", text: "D. It is correct as written." }
      ],
      correct: "C",
      expEn: "The bike shop = it, so the present verb takes -s: sells.",
    },
    {
      // Typed: an irregular plural, made, not picked.
      id: "q7",
      type: "fill_blank",
      title: "7. Type the plural of \"tooth\".",
      textParts: ["The dentist checked all my ", " and found no problems."],
      blanks: { "1": { correct: "teeth", accept: [] } },
      expEn: "\"Tooth\" is irregular: one tooth, two teeth.",
    },
    {
      // Typed: a or an, by the sound.
      id: "q8",
      type: "fill_blank",
      title: "8. Type \"a\" or \"an\".",
      textParts: ["My cousin wants to be ", " engineer."],
      blanks: { "1": { correct: "an", accept: [] } },
      expEn: "\"Engineer\" starts with a vowel sound, so \"an\". A job needs a / an in front: an engineer, a nurse.",
    },
    {
      // Sorted, not chosen: four nouns you can count, four you cannot.
      id: "q9",
      type: "dnd",
      title: "9. Sort the nouns. Can you count them?",
      bank: [
        { id: "b1", val: "c_chair", text: "chair" },
        { id: "b2", val: "u_information", text: "information" },
        { id: "b3", val: "c_apple", text: "apple" },
        { id: "b4", val: "u_furniture", text: "furniture" },
        { id: "b5", val: "c_coin", text: "coin" },
        { id: "b6", val: "u_advice", text: "advice" },
        { id: "b7", val: "c_suitcase", text: "suitcase" },
        { id: "b8", val: "u_homework", text: "homework" }
      ],
      targets: [
        { id: "t_count", title: "Can count" },
        { id: "t_not", title: "Cannot count" }
      ],
      correctSets: {
        t_count: ["c_chair", "c_apple", "c_coin", "c_suitcase"],
        t_not: ["u_information", "u_furniture", "u_advice", "u_homework"]
      },
      expEn: "You can say a chair, two apples, three coins, a suitcase. You cannot say an information, two furnitures, an advice or homeworks: use some information, some furniture, a piece of advice, some homework.",
    },
    {
      id: "q10",
      type: "mcq",
      title: "10. Which sentence is about cats in general?",
      options: [
        { val: "A", text: "A. The cats are sleeping on my bed." },
        { val: "B", text: "B. Cats sleep for about fifteen hours a day." },
        { val: "C", text: "C. A cat is sleeping on my bed." },
        { val: "D", text: "D. The cat sleeps on my bed." }
      ],
      correct: "B",
      expEn: "B is about all cats, so it uses the plural with no article. A and D are about particular cats the reader knows (the), and C is about one cat the reader does not know yet (a).",
    }
  ]
};
