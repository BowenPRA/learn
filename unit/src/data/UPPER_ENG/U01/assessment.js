// unit/src/data/UPPER_ENG/U01/assessment.js (from the Dashboard's GED_ENG/ENG_4)
// Lesson 4 check — complete sentences, fragments, run-ons, comma splices and
// the four fixes. Six items sit on a numbered-sentence notice, four stand
// alone. Answer key: A ×3, B ×2, C ×2, D ×3.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p4_bikelane",
      title: "Notice: Bike Lane Consultation",
      meta: "Public notice • Riverton Town Council",
      text: [
        "(1) The town council wants to build a bike lane along River Road. (2) Because the road is busy and narrow. (3) Many residents support the plan, others worry about losing parking spaces.",
        "(4) A public meeting will be held on 4 March at the library; everyone is welcome. (5) The council has printed a map of the route it is available at the front desk. (6) Comments can be sent by email until the end of the month."
      ],
      glossary: {
        "consultation": { def: "A period when the public is asked for its opinion." },
        "residents": { def: "The people who live in a place." },
        "route": { def: "The path something follows from one place to another." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p4_bikelane",
      type: "mcq",
      title: "1. Sentence 2: \"Because the road is busy and narrow.\" What is the problem with this sentence?",
      options: [
        { val: "A", text: "A. It is a run-on" },
        { val: "B", text: "B. It is a comma splice" },
        { val: "C", text: "C. It is a fragment — a dependent clause on its own" },
        { val: "D", text: "D. There is no problem" }
      ],
      correct: "C",
      expEn: "\"Because\" makes the clause dependent, so it cannot stand alone. It has a subject and a verb but not a complete idea.",
    },
    {
      id: "q2",
      passageId: "p4_bikelane",
      type: "mcq",
      title: "2. Which is the best way to combine sentences 1 and 2?",
      options: [
        { val: "A", text: "A. The town council wants to build a bike lane along River Road because the road is busy and narrow." },
        { val: "B", text: "B. The town council wants to build a bike lane along River Road, because. The road is busy and narrow." },
        { val: "C", text: "C. The town council wants to build a bike lane along River Road. Because, the road is busy and narrow." },
        { val: "D", text: "D. The town council wants to build a bike lane along River Road, the road is busy and narrow." }
      ],
      correct: "A",
      expEn: "Attach the dependent clause to the complete sentence. When the \"because\" clause comes second, no comma is needed. D is a comma splice, and B and C leave the fragment.",
    },
    {
      id: "q3",
      passageId: "p4_bikelane",
      type: "mcq",
      title: "3. Sentence 3: \"Many residents support the plan, others worry about losing parking spaces.\" Which version is correct?",
      options: [
        { val: "A", text: "A. Many residents support the plan others worry about losing parking spaces." },
        { val: "B", text: "B. Many residents support the plan, but others worry about losing parking spaces." },
        { val: "C", text: "C. Many residents support the plan, others worrying about losing parking spaces." },
        { val: "D", text: "D. It is correct as written." }
      ],
      correct: "B",
      expEn: "As written it is a comma splice: two complete sentences with only a comma. A comma + but fixes it and shows the contrast. A is a run-on.",
    },
    {
      id: "q4",
      passageId: "p4_bikelane",
      type: "mcq",
      title: "4. Sentence 4 uses a semicolon: \"A public meeting will be held on 4 March at the library; everyone is welcome.\" Why is this correct?",
      options: [
        { val: "A", text: "A. A semicolon can join two complete, closely related sentences" },
        { val: "B", text: "B. A semicolon replaces \"and\" inside a list" },
        { val: "C", text: "C. \"Everyone\" is singular, so it needs a semicolon" },
        { val: "D", text: "D. A semicolon must always come before a date" }
      ],
      correct: "A",
      expEn: "Both halves are complete sentences about the same meeting, so a semicolon is one of the four correct joins. It works like a full stop that keeps the ideas together.",
    },
    {
      id: "q5",
      passageId: "p4_bikelane",
      type: "mcq",
      title: "5. Sentence 5: \"The council has printed a map of the route it is available at the front desk.\" What kind of error is this?",
      options: [
        { val: "A", text: "A. A fragment" },
        { val: "B", text: "B. A comma splice" },
        { val: "C", text: "C. No error" },
        { val: "D", text: "D. A run-on" }
      ],
      correct: "D",
      expEn: "\"The council has printed a map of the route\" and \"it is available at the front desk\" are two complete sentences with nothing between them — a run-on.",
    },
    {
      id: "q6",
      passageId: "p4_bikelane",
      type: "mcq",
      title: "6. Which is the best correction of sentence 5?",
      options: [
        { val: "A", text: "A. The council has printed a map of the route, it is available at the front desk." },
        { val: "B", text: "B. The council has printed a map of the route, which is available at the front desk." },
        { val: "C", text: "C. The council has printed a map of the route. Which is available at the front desk." },
        { val: "D", text: "D. The council has printed a map of the route it is available, at the front desk." }
      ],
      correct: "B",
      expEn: "\"Which is available …\" is a dependent clause attached to the sentence — one correct sentence. A swaps the run-on for a comma splice, C creates a fragment, and D only moves a comma.",
    },
    {
      id: "q7",
      type: "mcq",
      title: "7. Which one is a complete sentence?",
      options: [
        { val: "A", text: "A. Waiting for the bus in the rain." },
        { val: "B", text: "B. Although the bus was late." },
        { val: "C", text: "C. When the bus finally came." },
        { val: "D", text: "D. The bus was late." }
      ],
      correct: "D",
      expEn: "D has a subject (the bus), a real verb (was) and a complete idea. A has no subject or real verb, and B and C start with subordinators, so they cannot stand alone.",
    },
    {
      id: "q8",
      type: "mcq",
      title: "8. \"The shop was closed, ______ we went home.\" Which word makes the sentence correct?",
      options: [
        { val: "A", text: "A. so" },
        { val: "B", text: "B. then" },
        { val: "C", text: "C. however" },
        { val: "D", text: "D. also" }
      ],
      correct: "A",
      expEn: "\"So\" is a FANBOYS conjunction, so comma + so joins two complete sentences correctly. \"Then\", \"however\" and \"also\" are not conjunctions — with only a comma they leave a splice.",
    },
    {
      id: "q9",
      type: "mcq",
      title: "9. Which sentence contains a comma splice?",
      options: [
        { val: "A", text: "A. I called, but nobody answered." },
        { val: "B", text: "B. I called; nobody answered." },
        { val: "C", text: "C. I called, nobody answered." },
        { val: "D", text: "D. Although I called, nobody answered." }
      ],
      correct: "C",
      expEn: "C joins two complete sentences with only a comma. A uses comma + but, B uses a semicolon, and D uses the subordinator \"although\" — all three are correct.",
    },
    {
      id: "q10",
      type: "mcq",
      title: "10. Which sentence is INCORRECT?",
      options: [
        { val: "A", text: "A. She studied hard; she passed." },
        { val: "B", text: "B. She studied hard, and she passed." },
        { val: "C", text: "C. Because she studied hard, she passed." },
        { val: "D", text: "D. She studied hard, therefore she passed." }
      ],
      correct: "D",
      expEn: "\"Therefore\" is not a FANBOYS conjunction, so a comma + therefore between two complete sentences is a comma splice. It would need a semicolon: \"She studied hard; therefore, she passed.\"",
    }
  ]
};
