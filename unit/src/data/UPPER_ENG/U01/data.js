// Upper Secondary English Unit 1: Complete Sentences. Brought over from the Dashboard's
// GED English Grammar Foundations 4 (GED_ENG/ENG_4, Sentence Boundaries) on 14 November
// 2026: the lesson, key words, grammar edits, Find & Fix passages and quiz, with the GED
// framing taken out. English only, like the whole track (unit/main.jsx). The one idea:
// "a comma cannot hold two sentences together".
//
// `writing` is the unit's timed writing task (unit/app/writing/WritingTask.jsx): the
// kind of writing, the time (30 minutes at the least), the length, the grammar the
// marker looks hard for, and one prompt. A prompt keeps its id once used.
import { assessment } from './assessment.js';
import { notes } from './notes.js';

export const U01_DATA = {
  meta: {
    id: "U01",
    title: "Complete Sentences",
    desc: "Know what a complete sentence needs, spot fragments, run-ons and comma splices, and fix each one: a full stop, a semicolon, a comma + conjunction, or a subordinator.",
    track: "UPPER_ENG",
    icon: "Scissors",
    audio: false
  },
  realWords: [
    {
      word: "Fragment",
      def: "A group of words that is punctuated like a sentence but is not complete.",
      sent: "\"Because the bus was late\" is a fragment, not a sentence.",
      isReal: true
    },
    {
      word: "Clause",
      def: "A group of words that has a subject and a verb.",
      sent: "Every clause has a subject and a verb.",
      isReal: true
    },
    {
      word: "Independent",
      def: "Describing a clause that can stand alone as a full sentence.",
      sent: "An independent clause makes sense on its own.",
      isReal: true
    },
    {
      word: "Dependent",
      def: "Describing a clause that cannot stand alone because it starts with a word like because or although.",
      sent: "A dependent clause needs an independent clause to lean on.",
      isReal: true
    },
    {
      word: "Run-on",
      def: "Two complete sentences pushed together with nothing between them.",
      sent: "\"It rained we stayed home\" is a run-on.",
      isReal: true
    },
    {
      word: "Splice",
      def: "The error of joining two complete sentences with only a comma.",
      sent: "A comma splice needs a full stop, a semicolon or a conjunction to fix it.",
      isReal: true
    },
    {
      word: "Conjunction",
      def: "A joining word such as and, but, so or because.",
      sent: "The conjunction so shows a result.",
      isReal: true
    },
    {
      word: "Subordinator",
      def: "A word such as because, although or when that makes a clause dependent.",
      sent: "Adding the subordinator although turns a sentence into a dependent clause.",
      isReal: true
    },
    {
      word: "Semicolon",
      def: "The mark ; that can join two closely related complete sentences.",
      sent: "A semicolon joins two complete ideas without a conjunction.",
      isReal: true
    },
    {
      word: "Boundary",
      def: "The place where one sentence ends and the next begins.",
      sent: "A full stop marks the boundary between two sentences.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "What a Sentence Needs",
      text: "A complete sentence has a subject, a verb and a complete idea. A group of words that is missing one of these is a {fragment}. Every {clause} has a subject and a verb, but only an {independent} clause can stand alone. A {dependent} clause starts with a word like because or although and needs another clause to finish the idea.",
    },
    {
      id: "passage_2",
      title: "Two Sentences, One Space",
      text: "When two complete sentences run together with nothing between them, the result is a {run-on}. When only a comma sits between them, the error is called a comma {splice}. Both errors happen at the {boundary} between two ideas, and both are fixed in the same four ways.",
    },
    {
      id: "passage_3",
      title: "Four Ways to Fix It",
      text: "You can fix a run-on with a full stop, so the two ideas become two sentences. You can use a {semicolon} when the ideas are closely linked. You can add a comma and a {conjunction} such as and, but or so. Or you can add a {subordinator} such as because, although or when, which makes one clause depend on the other.",
    }
  ],
  grammarEdit: [
    {
      id: "ge1",
      title: "The Night Shift",
      passage: "Dao works the night shift at the [[b1]] sleeps during the day. Her neighbours are noisy in the [[b2]] wears earplugs. [[b3]] she wakes up at six, she eats a quick meal and takes the bus. The ward is quiet at [[b4]] nurses still check every patient. She likes the [[b5]] the hours are hard.",
      blanks: [
        {
          id: "b1",
          options: ["hospital, so she", "hospital, she", "hospital she"],
          correct: "hospital, so she",
          expEn: "\"Dao works the night shift\" and \"she sleeps during the day\" are two complete sentences. A comma alone is a splice and nothing at all is a run-on; a comma + so joins them correctly.",
        },
        {
          id: "b2",
          options: ["afternoon. She", "afternoon, she", "afternoon she"],
          correct: "afternoon. She",
          expEn: "Two complete ideas need a real boundary. A full stop and a capital letter is the simplest fix; a comma alone is a splice.",
        },
        {
          id: "b3",
          options: ["When", "Although", "So"],
          correct: "When",
          expEn: "The subordinator must match the meaning: she eats at the time she wakes up, so \"When\". \"Although\" shows contrast, and \"So\" would leave a comma splice.",
        },
        {
          id: "b4",
          options: ["midnight, but the", "midnight, the", "midnight the"],
          correct: "midnight, but the",
          expEn: "Quiet ward, but the nurses still check: a contrast between two complete ideas takes a comma + but. A comma alone is a splice.",
        },
        {
          id: "b5",
          options: ["work although", "work because", "work so"],
          correct: "work although",
          expEn: "She likes the work even though the hours are hard: a contrast, so \"although\". \"Because\" would say the hard hours are the reason she likes it, and \"so\" makes no sense.",
        }
      ]
    },
    {
      id: "ge2",
      title: "The Morning Market",
      passage: "The market near our house opens at dawn. [[b1]] the freshest fish is gone by eight, my mother goes early. The vendors know her [[b2]] give her a good price. [[b3]] She likes the noise and the colours. At the far end of the market, an old man [[b4]] tea from a small cart. My mother always stops there for a [[b5]] she walks home.",
      blanks: [
        {
          id: "b1",
          options: ["Because", "Because of", "So"],
          correct: "Because",
          expEn: "\"Because\" + a clause (the freshest fish is gone) makes a dependent clause that leans on \"my mother goes early\". \"Because of\" needs a noun, not a clause, and \"So\" would leave two complete sentences with only a comma.",
        },
        {
          id: "b2",
          options: ["well and", "well, they", "well they"],
          correct: "well and",
          expEn: "One subject (the vendors) with two verbs (know, give) needs only \"and\". Adding a new subject with a comma makes a splice; with nothing, a run-on.",
        },
        {
          id: "b3",
          options: ["My mother enjoys the market.", "Although my mother enjoys the market.", "My mother enjoying the market."],
          correct: "My mother enjoys the market.",
          expEn: "Only the first has a subject, a real verb and a complete idea. \"Although …\" is a dependent clause left alone, and \"enjoying\" is not a full verb — both are fragments.",
        },
        {
          id: "b4",
          options: ["sells", "selling", "who sells"],
          correct: "sells",
          expEn: "The sentence needs a real verb for \"an old man\". \"Selling\" alone and \"who sells\" both leave the sentence without a main verb — a missing-verb fragment.",
        },
        {
          id: "b5",
          options: ["cup before", "cup. Before", "cup. When"],
          correct: "cup before",
          expEn: "\"Before she walks home\" is a dependent clause, so it must stay attached to the sentence. Cut off by a full stop, it becomes a fragment.",
        }
      ]
    },
    {
      id: "ge3",
      title: "The Job Application",
      passage: "Minh wanted the job at the [[b1]] filled in the form the same day. The form asked for two [[b2]] wrote down his old manager and his teacher. [[b3]] the interview went well, he did not get the job. The company hired someone with a forklift [[b4]] decided to get one too. He starts the course next [[b5]] cousin will drive him there.",
      blanks: [
        {
          id: "b1",
          options: ["warehouse, so he", "warehouse, he", "warehouse he"],
          correct: "warehouse, so he",
          expEn: "Wanting the job is the reason he filled in the form: two complete ideas joined by a comma + so. A comma alone is a splice.",
        },
        {
          id: "b2",
          options: ["references; he", "references, he", "references he"],
          correct: "references; he",
          expEn: "Two closely linked complete sentences can be joined by a semicolon. A comma alone is a splice; nothing at all is a run-on.",
        },
        {
          id: "b3",
          options: ["Although", "Because", "So"],
          correct: "Although",
          expEn: "A good interview but no job is a contrast, so \"Although\". \"Because\" gives the wrong reason, and \"So\" leaves a comma splice.",
        },
        {
          id: "b4",
          options: ["licence. Minh", "licence, Minh", "licence Minh"],
          correct: "licence. Minh",
          expEn: "The company's choice and Minh's decision are two complete sentences. A full stop is a clean boundary; a comma alone is a splice.",
        },
        {
          id: "b5",
          options: ["month, and his", "month, his", "month his"],
          correct: "month, and his",
          expEn: "\"He starts the course\" and \"his cousin will drive him\" are both complete, so they need a comma + and. A comma alone is a splice.",
        }
      ]
    },
    {
      id: "ge4",
      title: "Rules at the Pool",
      passage: "[[b1]] Children under eight must stay with an adult. The deep end is closed on [[b2]] lifeguard cleans the filters. [[b3]] Towels are available at the desk. Food is not allowed near the [[b4]] may eat on the grass. The pool closes at nine in summer. [[b5]]",
      blanks: [
        {
          id: "b1",
          options: ["The pool is open every day.", "Although the pool is open every day.", "The pool open every day."],
          correct: "The pool is open every day.",
          expEn: "A notice still needs complete sentences. \"Although …\" is a dependent clause on its own, and \"The pool open\" has no real verb.",
        },
        {
          id: "b2",
          options: ["Mondays because the", "Mondays, the", "Mondays the"],
          correct: "Mondays because the",
          expEn: "Cleaning the filters is the reason the deep end is closed: \"because\" joins the two ideas. A comma alone is a splice; nothing is a run-on.",
        },
        {
          id: "b3",
          options: ["Please shower before you swim.", "Before you swim.", "Showering before you swim."],
          correct: "Please shower before you swim.",
          expEn: "\"Please shower\" is a complete instruction with a verb. \"Before you swim\" is a dependent clause alone, and \"Showering\" is not a full verb.",
        },
        {
          id: "b4",
          options: ["water, but you", "water, you", "water you"],
          correct: "water, but you",
          expEn: "Not near the water, but on the grass: a contrast between two complete ideas needs a comma + but.",
        },
        {
          id: "b5",
          options: ["It closes at seven in winter.", "Closing at seven in winter.", "Which closes at seven in winter."],
          correct: "It closes at seven in winter.",
          expEn: "Only \"It closes …\" has a subject and a full verb. \"Closing …\" and \"Which closes …\" cannot stand alone — both are fragments.",
        }
      ]
    }
  ],
  proofread: [
    {
      id: "pf1",
      title: "The Late Delivery",
      passage: "Our shop ordered fifty boxes of paper last Monday, the delivery was supposed to arrive on Wednesday. It did not come. When I called the supplier on Thursday. A woman said that the driver had the wrong address. She promised a new delivery on Friday, she also gave us a small discount. The boxes finally arrived at noon on Friday my manager was relieved. The paper is now on the shelves, and the customers is happy again.",
      errors: [
        {
          id: "e1",
          wrong: "Monday, the delivery",
          right: "Monday, but the delivery",
          accept: ["Monday. The delivery", "Monday; the delivery", "Monday, and the delivery"],
          kind: "Comma splice",
          expEn: "Two complete sentences are joined by only a comma. Add a conjunction (but / and), a semicolon, or a full stop.",
        },
        {
          id: "e2",
          wrong: "Thursday. A woman",
          right: "Thursday, a woman",
          accept: [],
          kind: "Fragment",
          expEn: "\"When I called the supplier on Thursday\" is a dependent clause and cannot stand alone. Join it to the next sentence with a comma.",
        },
        {
          id: "e3",
          wrong: "Friday, she also",
          right: "Friday, and she also",
          accept: ["Friday. She also", "Friday; she also"],
          kind: "Comma splice",
          expEn: "\"She promised …\" and \"she also gave …\" are both complete sentences. A comma alone cannot hold them together; add \"and\" or use a full stop.",
        },
        {
          id: "e4",
          wrong: "Friday my manager",
          right: "Friday, and my manager",
          accept: ["Friday. My manager", "Friday; my manager", "Friday, so my manager"],
          kind: "Run-on",
          expEn: "Two complete sentences run together with nothing between them. Put a boundary there: a full stop, a semicolon, or a comma + and / so.",
        },
        {
          id: "e5",
          wrong: "customers is happy",
          right: "customers are happy",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The customers\" is plural, so the verb is \"are\", not \"is\".",
        }
      ]
    },
    {
      id: "pf2",
      title: "Learning to Drive",
      passage: "My sister started driving lessons in June. Because she wants to drive to her new job. Her instructor is patient, he never shouts when she stalls the car. At first she was nervous about the roundabout near the station, now she goes around it without thinking. Last week she practised parking for an hour her instructor said she was ready for the test. The test are on the twentieth. If she passes, she will buy a small used car, her uncle has already found one for her.",
      errors: [
        {
          id: "e1",
          wrong: "June. Because",
          right: "June because",
          accept: ["June, because"],
          kind: "Fragment",
          expEn: "\"Because she wants to drive to her new job\" is a dependent clause left on its own. Attach it to the sentence before it.",
        },
        {
          id: "e2",
          wrong: "patient, he never",
          right: "patient; he never",
          accept: ["patient. He never", "patient, and he never", "patient, so he never"],
          kind: "Comma splice",
          expEn: "\"Her instructor is patient\" and \"he never shouts\" are two complete sentences. A comma alone is a splice; use a semicolon, a full stop, or a comma + and.",
        },
        {
          id: "e3",
          wrong: "station, now she",
          right: "station, but now she",
          accept: ["station. Now she", "station; now she"],
          kind: "Comma splice",
          expEn: "Nervous at first, confident now — two complete ideas in contrast. They need a comma + but, or a full stop.",
        },
        {
          id: "e4",
          wrong: "hour her instructor",
          right: "hour, and her instructor",
          accept: ["hour. Her instructor", "hour; her instructor"],
          kind: "Run-on",
          expEn: "Two complete sentences with nothing between them. Add a full stop, a semicolon, or a comma + and.",
        },
        {
          id: "e5",
          wrong: "test are on",
          right: "test is on",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The test\" is one thing, so the verb is \"is\".",
        },
        {
          id: "e6",
          wrong: "car, her uncle",
          right: "car; her uncle",
          accept: ["car. Her uncle", "car, and her uncle"],
          kind: "Comma splice",
          expEn: "\"She will buy a small used car\" and \"her uncle has already found one\" are both complete. A comma alone cannot join them.",
        }
      ]
    },
    {
      id: "pf3",
      title: "The Community Kitchen",
      passage: "Every Sunday a group of volunteers cooks lunch at the community centre. The kitchen is small, the team still manages to feed eighty people. The cooks preparing rice, vegetables and hot soup. The food is simple but good. Although the centre gives them a little money for ingredients. Most of the vegetables come from a local farm the farmer delivers them on Saturday evening. After lunch, everyone helps to wash up, then the hall is ready for the evening class. The volunteers have ran this kitchen for six years.",
      errors: [
        {
          id: "e1",
          wrong: "small, the team",
          right: "small, but the team",
          accept: ["small. The team", "small; the team"],
          kind: "Comma splice",
          expEn: "A small kitchen but eighty people fed: two complete ideas in contrast need a comma + but, not a comma alone.",
        },
        {
          id: "e2",
          wrong: "cooks preparing",
          right: "cooks prepare",
          accept: ["cooks are preparing"],
          kind: "Missing-verb fragment",
          expEn: "\"Preparing\" on its own is not a full verb, so the sentence has a subject but no real verb. Use \"prepare\" (or \"are preparing\").",
        },
        {
          id: "e3",
          wrong: "ingredients. Most",
          right: "ingredients, most",
          accept: [],
          kind: "Fragment",
          expEn: "\"Although the centre gives them a little money for ingredients\" cannot stand alone. Join it to the next sentence with a comma.",
        },
        {
          id: "e4",
          wrong: "farm the farmer",
          right: "farm, and the farmer",
          accept: ["farm. The farmer", "farm; the farmer"],
          kind: "Run-on",
          expEn: "Two complete sentences run together. Add a full stop, a semicolon, or a comma + and.",
        },
        {
          id: "e5",
          wrong: "up, then the hall",
          right: "up, and then the hall",
          accept: ["up. Then the hall", "up; then the hall"],
          kind: "Comma splice",
          expEn: "\"Then\" is not a conjunction, so a comma + then still leaves a splice. Add \"and\" or use a full stop.",
        },
        {
          id: "e6",
          wrong: "have ran",
          right: "have run",
          accept: [],
          kind: "Past participle",
          expEn: "After have or has, use the participle: have run, not have ran.",
        }
      ]
    },
    {
      id: "pf4",
      title: "A Letter to the Landlord",
      passage: "Dear Mr Tran, I am writing about the heating in flat 3B. The radiator in the bedroom has not worked since October, the one in the kitchen makes a loud noise at night. I reported the problem twice. Which is why I am writing again. Your office promised a repair last month nobody has come. My daughter have a cold, so the flat needs to be warm. Please send someone this week. If the heating is not fixed by Friday. I will contact the housing office. Thank you for your attention, I look forward to your reply.",
      errors: [
        {
          id: "e1",
          wrong: "October, the one",
          right: "October, and the one",
          accept: ["October. The one", "October; the one"],
          kind: "Comma splice",
          expEn: "Two complete sentences about two radiators are joined by only a comma. Add \"and\", a semicolon, or a full stop.",
        },
        {
          id: "e2",
          wrong: "twice. Which",
          right: "twice, which",
          accept: [],
          kind: "Fragment",
          expEn: "\"Which is why I am writing again\" cannot stand alone — a clause starting with \"which\" must be attached to the sentence before it.",
        },
        {
          id: "e3",
          wrong: "month nobody",
          right: "month, but nobody",
          accept: ["month. Nobody", "month; nobody"],
          kind: "Run-on",
          expEn: "A promise and a broken promise: two complete sentences pushed together. Put a boundary there — a comma + but, or a full stop.",
        },
        {
          id: "e4",
          wrong: "daughter have a",
          right: "daughter has a",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"My daughter\" is one person, so the verb is \"has\".",
        },
        {
          id: "e5",
          wrong: "Friday. I will",
          right: "Friday, I will",
          accept: [],
          kind: "Fragment",
          expEn: "\"If the heating is not fixed by Friday\" is a dependent clause and needs the sentence after it. Join them with a comma.",
        },
        {
          id: "e6",
          wrong: "attention, I look",
          right: "attention. I look",
          accept: ["attention; I look", "attention, and I look"],
          kind: "Comma splice",
          expEn: "\"Thank you for your attention\" and \"I look forward to your reply\" are two complete sentences. A comma alone is a splice.",
        }
      ]
    }
  ],
  // "Fix it your way" (engine Rewrite, unit/app/tasks/RewriteTask.jsx): the student types
  // a new version of a faulty sentence. The checker (unit/app/tasks/rewrite.js) judges only the
  // join between the two ideas `a` and `b`; `checkRewriteItems` runs every `model` and `also`
  // through it (tests/rewrite.test.mjs). Fresh sentences: none repeats an example in the lesson.
  // `weak` words are correct but say less ("and" for a result): accepted, with a note.
  rewrite: [
    {
      id: "rw1", label: "Comma splice",
      given: "My phone battery died, I could not call you.",
      a: "My phone battery died", b: "I could not call you",
      fanboys: ["so"], weak: ["and"], subs: [{ w: "because", dep: "a" }, { w: "since", dep: "a" }],
      model: "My phone battery died, so I could not call you.",
      also: "I could not call you because my phone battery died.",
    },
    {
      id: "rw2", label: "Fragment",
      given: "We stayed inside. Because the storm was getting worse.",
      a: "We stayed inside", b: "the storm was getting worse",
      subs: [{ w: "because", dep: "b" }, { w: "since", dep: "b" }], allow: ["sub"],
      holdHint: "That is a correct sentence, but it drops \"because\". Keep \"because\" and join the idea to the sentence before it.",
      model: "We stayed inside because the storm was getting worse.",
      also: "Because the storm was getting worse, we stayed inside.",
    },
    {
      id: "rw3", label: "Run-on",
      given: "The test was hard most students passed.",
      a: "The test was hard", b: "most students passed",
      fanboys: ["but", "yet"], subs: [{ w: "although", dep: "a" }, { w: "though", dep: "a" }, { w: "even though", dep: "a" }],
      model: "The test was hard, but most students passed.",
      also: "Although the test was hard, most students passed.",
    },
    {
      id: "rw4", kind: "exact", label: "Missing verb",
      given: "My cousin working at the airport.",
      right: "My cousin works at the airport.",
      accept: ["My cousin is working at the airport.", "My cousin worked at the airport.", "My cousin was working at the airport.", "My cousin has worked at the airport.", "My cousin will work at the airport."],
      hint: "Put is or was in front of \"working\", or change \"working\" to works or worked.",
      note: "\"Working\" on its own is not a full verb. The sentence needs works, is working, or worked.",
    },
    {
      id: "rw5", label: "Comma splice",
      given: "The library opens at nine, it closes at five.",
      a: "The library opens at nine", b: "it closes at five",
      fanboys: ["and", "but"],
      accept: ["The library opens at nine and closes at five."],
      model: "The library opens at nine, and it closes at five.",
      also: "The library opens at nine; it closes at five.",
    },
    {
      id: "rw6", label: "Fragment",
      given: "My brother cannot swim. Although he lives by the sea.",
      a: "My brother cannot swim", b: "he lives by the sea",
      subs: [{ w: "although", dep: "b" }, { w: "though", dep: "b" }, { w: "even though", dep: "b" }], allow: ["sub"],
      holdHint: "That is a correct sentence, but it drops \"although\". Keep \"although\" and join the idea to the sentence before it.",
      model: "My brother cannot swim although he lives by the sea.",
      also: "Although he lives by the sea, my brother cannot swim.",
    },
    {
      id: "rw7", label: "Run-on",
      given: "I was late for class the traffic was terrible.",
      a: "I was late for class", b: "the traffic was terrible",
      fanboys: ["for"], weak: ["and"], subs: [{ w: "because", dep: "b" }, { w: "since", dep: "b" }],
      model: "I was late for class because the traffic was terrible.",
      also: "Because the traffic was terrible, I was late for class.",
    },
    {
      id: "rw8", kind: "exact", label: "Missing verb",
      given: "The students waiting outside the library.",
      right: "The students wait outside the library.",
      accept: ["The students are waiting outside the library.", "The students waited outside the library.", "The students were waiting outside the library."],
      hint: "Put are or were in front of \"waiting\", or change \"waiting\" to wait or waited.",
      note: "\"Waiting\" on its own is not a full verb. The sentence needs wait, are waiting, or waited.",
    },
    {
      id: "rw9", label: "Comma splice",
      given: "She finished her homework, she watched a film.",
      a: "She finished her homework", b: "she watched a film",
      fanboys: ["and"], subs: [{ w: "after", dep: "a" }, { w: "once", dep: "a" }, { w: "when", dep: "a" }, { w: "as soon as", dep: "a" }, { w: "before", dep: "b" }],
      model: "After she finished her homework, she watched a film.",
      also: "She finished her homework, and she watched a film.",
    },
    {
      id: "rw10", label: "Fragment",
      given: "The meeting will start. When everyone arrives.",
      a: "The meeting will start", b: "everyone arrives",
      subs: [{ w: "when", dep: "b" }, { w: "once", dep: "b" }, { w: "as soon as", dep: "b" }, { w: "after", dep: "b" }], allow: ["sub"],
      holdHint: "That is a correct sentence, but it drops \"when\". Keep it and join the idea to the sentence before it.",
      model: "The meeting will start when everyone arrives.",
      also: "When everyone arrives, the meeting will start.",
    },
    {
      id: "rw11", kind: "exact", label: "Missing verb",
      given: "A small shop on the corner of our street.",
      right: "There is a small shop on the corner of our street.",
      accept: ["A small shop is on the corner of our street.", "There was a small shop on the corner of our street.", "A small shop was on the corner of our street.", "A small shop stands on the corner of our street."],
      hint: "This needs a verb. Start with \"There is\", or put \"is\" after \"shop\".",
      note: "A sentence needs a real verb. \"A small shop on the corner\" says where it is, but there is no verb.",
    },
  ],
  shortQA: [
    {
      id: "q1",
      question: "Explain what is wrong with this sentence and write it correctly: \"The train was crowded, I stood for the whole journey.\"",
      suggestedWords: [["complete", "independent"], ["comma"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that it is a comma splice: two complete sentences (\"The train was crowded\" / \"I stood for the whole journey\") are joined by only a comma.",
        "1 mark for a correct rewrite using any of the four fixes, e.g. \"The train was crowded, so I stood for the whole journey.\" / \"The train was crowded; I stood …\" / \"The train was crowded. I stood …\" / \"Because the train was crowded, I stood …\""
      ],
      modelAnswer: "This is a comma splice. \"The train was crowded\" and \"I stood for the whole journey\" are both complete sentences, and a comma alone cannot join them. A correct version is: \"The train was crowded, so I stood for the whole journey.\" A full stop, a semicolon, or \"Because the train was crowded, …\" would also work."
    },
    {
      id: "q2",
      question: "Rewrite these two sentences as ONE correct sentence that shows the connection between them: \"Nam did not study for the test. He passed with a high score.\"",
      suggestedWords: [["contrast", "connect"], ["clause"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for a joining word that shows the contrast between not studying and passing (although / even though / but / yet / however with a semicolon).",
        "1 mark for the result being one correct sentence — no comma splice and no fragment — e.g. \"Although Nam did not study for the test, he passed with a high score.\" or \"Nam did not study for the test, but he passed with a high score.\""
      ],
      modelAnswer: "Although Nam did not study for the test, he passed with a high score. The word \"although\" shows the contrast, and the dependent clause is joined to the complete sentence with a comma. \"Nam did not study for the test, but he passed with a high score\" is also correct."
    },
    {
      id: "q3",
      question: "Explain why \"Because the shop was closed on Sunday.\" is not a complete sentence, and write a complete version.",
      suggestedWords: [["clause", "idea"], ["stand alone"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that \"because\" makes the clause dependent, so it does not give a complete idea and cannot stand alone (it is a fragment).",
        "1 mark for a complete version, either by adding an independent clause (\"Because the shop was closed on Sunday, we bought bread on Monday.\") or by removing \"because\" (\"The shop was closed on Sunday.\")."
      ],
      modelAnswer: "It is a fragment. The word \"because\" makes the clause dependent: it has a subject and a verb, but it does not give a complete idea, so the reader is left waiting for the rest. A complete version is: \"Because the shop was closed on Sunday, we bought our bread on Monday.\" Removing \"because\" also works: \"The shop was closed on Sunday.\""
    }
  ],
  writing: {
    type: "narrative",
    minutes: 30,
    minWords: 150,
    paragraphs: 3,
    focus: {
      label: "Complete sentences",
      look: "fragments, run-on sentences and comma splices"
    },
    // One prompt (Bowen, 20 November 2026). Until then Unit 1 offered three, and many
    // students wrote more than one: "Someone who helped me" (u1w2) and "My first time"
    // (u1w3) stay in their saved essays, and each student is shown only their best piece
    // (src/lib/essays.js shownEssays).
    prompt: {
      id: "u1w1",
      title: "A day that went wrong",
      task: "Write a true story about a day when something went wrong. Tell what happened, how you felt, and how the day ended.",
      guidelines: [
        "Paragraph 1: where and when it happened, and who was there.",
        "Paragraph 2: what went wrong, in the order it happened.",
        "Paragraph 3: how it ended and what you learned.",
        "Use the past tense. End every sentence with a full stop: never join two sentences with a comma."
      ],
    }
  },
  assessment,
  notes
};
