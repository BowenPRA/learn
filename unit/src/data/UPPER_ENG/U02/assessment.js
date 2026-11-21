// unit/src/data/UPPER_ENG/U02/assessment.js
// Unit 2 quiz — the verb in every sentence: be, the -s of he / she / it, the past simple,
// does / didn't + the base verb, and there is / there are. Six items sit on a numbered
// notice, four stand alone. Seven are multiple choice, two are typed (q7, q8) and one is a
// sort (q9). Two come from Unit 1 (q5, q10), as a quarter of each unit's practice does.
// No item reuses a sentence from the lesson.
// Multiple-choice key: q1 C, q2 A, q3 B, q4 D, q5 C, q6 B, q10 B.
export const assessment = {
  timeLimit: 1200,
  passages: [
    {
      id: "p2_garden",
      title: "Notice: The Community Garden",
      meta: "Public notice • Hillside Community Garden",
      text: [
        "(1) The community garden open every day from seven in the morning until dark. (2) There is twenty small plots, and each family can rent one for a year. (3) The water tap near the gate broken at the moment.",
        "(4) Last spring, volunteers planted fruit trees along the fence. (5) The gardener doesn't work on Mondays, please leave a message in the box by the gate. (6) Last year the garden win a prize for the best new garden in the city."
      ],
      glossary: {
        "plots": { def: "Small pieces of land for growing vegetables or flowers." },
        "rent": { def: "To pay money to use something that belongs to someone else." },
        "volunteers": { def: "People who work without being paid." }
      }
    }
  ],
  questions: [
    {
      id: "q1",
      passageId: "p2_garden",
      type: "mcq",
      title: "1. Which is the correct version of sentence 1?",
      options: [
        { val: "A", text: "A. The community garden are open every day from seven in the morning until dark." },
        { val: "B", text: "B. The community garden opening every day from seven in the morning until dark." },
        { val: "C", text: "C. The community garden opens every day from seven in the morning until dark." },
        { val: "D", text: "D. The community garden openes every day from seven in the morning until dark." }
      ],
      correct: "C",
      expEn: "The garden is one thing (it), so the present verb takes -s: opens. A uses \"are\" with one thing, B has no real verb, and D is a spelling mistake (+ es is only after s, sh, ch, x and o).",
    },
    {
      id: "q2",
      passageId: "p2_garden",
      type: "mcq",
      title: "2. Sentence 2: \"There is twenty small plots.\" What should \"is\" be?",
      options: [
        { val: "A", text: "A. are" },
        { val: "B", text: "B. has" },
        { val: "C", text: "C. have" },
        { val: "D", text: "D. It is correct as written." }
      ],
      correct: "A",
      expEn: "Twenty plots is more than one, so \"there are\". \"Has\" and \"have\" cannot say that something is in a place.",
    },
    {
      id: "q3",
      passageId: "p2_garden",
      type: "mcq",
      title: "3. Sentence 3: \"The water tap near the gate broken at the moment.\" What is missing?",
      options: [
        { val: "A", text: "A. A comma after \"gate\"" },
        { val: "B", text: "B. A verb: \"is\" before \"broken\"" },
        { val: "C", text: "C. An -s on \"broken\"" },
        { val: "D", text: "D. Nothing. It is correct." }
      ],
      correct: "B",
      expEn: "\"Broken\" describes the tap, and nothing happens, so the sentence needs \"be\": the tap is broken.",
    },
    {
      id: "q4",
      passageId: "p2_garden",
      type: "mcq",
      title: "4. Sentence 4: why is \"planted\" correct?",
      options: [
        { val: "A", text: "A. \"Volunteers\" is plural, so the verb takes -ed." },
        { val: "B", text: "B. \"Planted\" is a describing word, not a verb." },
        { val: "C", text: "C. It is not correct: it should be \"plant\"." },
        { val: "D", text: "D. It happened last spring, so the verb is in the past." }
      ],
      correct: "D",
      expEn: "\"Last spring\" is finished, so the verb is past simple: plant + ed. The -ed has nothing to do with plural: one volunteer planted, ten volunteers planted.",
    },
    {
      // From Unit 1.
      id: "q5",
      passageId: "p2_garden",
      type: "mcq",
      title: "5. Sentence 5: \"The gardener doesn't work on Mondays, please leave a message in the box by the gate.\" What is wrong with it?",
      options: [
        { val: "A", text: "A. It is a fragment." },
        { val: "B", text: "B. \"doesn't work\" should be \"doesn't works\"." },
        { val: "C", text: "C. It is a comma splice." },
        { val: "D", text: "D. Nothing. It is correct." }
      ],
      correct: "C",
      expEn: "\"The gardener doesn't work on Mondays\" and \"please leave a message …\" are two complete sentences with only a comma between them. Use a full stop: \"… on Mondays. Please leave …\". \"Doesn't work\" is right: after doesn't, the base verb.",
    },
    {
      id: "q6",
      passageId: "p2_garden",
      type: "mcq",
      title: "6. Which is the best correction of sentence 6?",
      options: [
        { val: "A", text: "A. Last year the garden wins a prize for the best new garden in the city." },
        { val: "B", text: "B. Last year the garden won a prize for the best new garden in the city." },
        { val: "C", text: "C. Last year the garden winned a prize for the best new garden in the city." },
        { val: "D", text: "D. Last year the garden was win a prize for the best new garden in the city." }
      ],
      correct: "B",
      expEn: "\"Last year\" needs the past. \"Win\" is irregular: its past is \"won\". \"Winned\" is not a word, and \"was win\" puts be in front of an action.",
    },
    {
      // Typed: the student has to make the past form, not pick it.
      id: "q7",
      type: "fill_blank",
      title: "7. Type the verb \"wash\" in the right form.",
      textParts: ["Yesterday my aunt ", " her car in the street."],
      blanks: { "1": { correct: "washed", accept: ["was washing"] } },
      expEn: "\"Yesterday\" is in the past, so wash + ed: washed. \"Was washing\" is also right.",
    },
    {
      // Typed: two words, chosen by how many there are and when.
      id: "q8",
      type: "fill_blank",
      title: "8. Type two words to complete the sentence.",
      textParts: ["Look outside! ", " two dogs in our garden."],
      blanks: { "1": { correct: "There are", accept: ["there are"] } },
      expEn: "Two dogs is more than one, and \"Look outside!\" means now, so \"There are\". Not \"have\": \"have\" cannot say that something is in a place.",
    },
    {
      // Sorted, not chosen: four sentences, four different verb mistakes.
      id: "q9",
      type: "dnd",
      title: "9. Sort each sentence by its mistake.",
      bank: [
        { id: "b1", val: "be", text: "The library very quiet today." },
        { id: "b2", val: "s", text: "The library close at six." },
        { id: "b3", val: "past", text: "Last week the library buy new books." },
        { id: "b4", val: "have", text: "Near the library have a park." }
      ],
      targets: [
        { id: "t_be", title: "No \"be\"" },
        { id: "t_s", title: "Missing -s" },
        { id: "t_past", title: "Should be past" },
        { id: "t_have", title: "\"have\" for there is" }
      ],
      correctSets: { t_be: ["be"], t_s: ["s"], t_past: ["past"], t_have: ["have"] },
      expEn: "\"The library is very quiet\": no action, so be. \"The library closes\": it + -s. \"Last week … bought\": a finished time needs the past. \"There is a park near the library\": there is, not have.",
    },
    {
      // From Unit 1: two joining words, and a comma splice.
      id: "q10",
      type: "mcq",
      title: "10. Which sentence is correct?",
      options: [
        { val: "A", text: "A. Although she was tired, but she finished the race." },
        { val: "B", text: "B. Although she was tired, she finished the race." },
        { val: "C", text: "C. She was tired, she finished the race." },
        { val: "D", text: "D. Because she was tired, so she finished the race." }
      ],
      correct: "B",
      expEn: "B joins the two ideas with one word, \"although\". A and D use two joining words where English takes one (although … but, because … so), and C is a comma splice.",
    }
  ]
};
