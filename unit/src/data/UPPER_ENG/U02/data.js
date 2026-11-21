// Upper Secondary English Unit 2: The Verb in Every Sentence (Bowen, 21 November 2026:
// "lets start on unit 2 following the plan we have so far", plan approved first). From
// docs/UPPER-ENGLISH-PLAN.md, Stage 1 item 2: "be" (and leaving it out), the present and
// past simple, the -s of he / she / it, and "there is / there are" (not "have").
// English only, like the whole track, with neutral examples.
//
// Built like Unit 1, with what the plan adds from Unit 2 on:
// - About a quarter of the practice comes from Unit 1 (sentence boundaries), so nothing is
//   learned once and dropped. Each such item says so in a comment.
// - "Fix it your way" takes verb mistakes as well as joins (`kind: 'exact'` items).
// - A reading passage (reading.js), its own task.
//
// `writing` is the unit's timed writing task: one prompt, whose id never changes once used.
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { reading } from './reading.js';

export const U02_DATA = {
  meta: {
    id: "U02",
    title: "The Verb in Every Sentence",
    desc: "Find the verb, use \"be\" where English needs it, put the -s on he / she / it verbs, use the past simple for the past, and write \"there is / there are\" instead of \"have\".",
    track: "UPPER_ENG",
    icon: "Zap",
    audio: false
  },
  realWords: [
    {
      word: "Verb",
      def: "A word for an action (run, eat) or a state (be, have).",
      sent: "Every sentence needs a verb.",
      isReal: true
    },
    {
      word: "Subject",
      def: "Who or what a sentence is about. It usually comes before the verb.",
      sent: "In \"The bakery opens at six\", the subject is \"the bakery\".",
      isReal: true
    },
    {
      word: "Tense",
      def: "The form of a verb that shows when something happens.",
      sent: "\"Walks\" and \"walked\" are two tenses of the same verb.",
      isReal: true
    },
    {
      word: "Present simple",
      def: "The tense for habits and facts: I walk, she walks.",
      sent: "We use the present simple for things that happen every day.",
      isReal: true
    },
    {
      word: "Past simple",
      def: "The tense for finished actions: I walked, she went.",
      sent: "\"Yesterday\" tells you to use the past simple.",
      isReal: true
    },
    {
      word: "Base form",
      def: "The plain form of a verb, with no ending: go, eat, be.",
      sent: "After \"didn't\", use the base form of the verb.",
      isReal: true
    },
    {
      word: "Regular",
      def: "Describing a verb that makes its past with -ed.",
      sent: "\"Walk\" is regular: walk, walked.",
      isReal: true
    },
    {
      word: "Irregular",
      def: "Describing a verb that makes its past in its own way.",
      sent: "\"Go\" is irregular: its past is \"went\".",
      isReal: true
    },
    {
      word: "Agreement",
      def: "The verb matching its subject: she walks, they walk.",
      sent: "\"He walk\" is an agreement mistake.",
      isReal: true
    },
    {
      word: "Helping verb",
      def: "A verb such as do, does, did, is or are that works with another verb.",
      sent: "In \"She does not drive\", \"does\" is the helping verb.",
      isReal: true
    }
  ],
  grammarEdit: [
    {
      id: "ge1",
      title: "The Bakery on the Corner",
      passage: "There [[b1]] a small bakery on the corner of my street. The baker [[b2]] work at four o'clock every morning. Her bread [[b3]] warm when the shop opens. Her two sons [[b4]] the cakes in the afternoon. The bakery is busy on [[b5]] queue goes out of the door.",
      blanks: [
        {
          id: "b1",
          options: ["is", "are", "has"],
          correct: "is",
          expEn: "One bakery, so \"there is\". \"Has\" cannot say that something is in a place.",
        },
        {
          id: "b2",
          options: ["starts", "start", "starting"],
          correct: "starts",
          expEn: "The baker = she, and this happens every morning, so the present verb takes -s: starts. \"Starting\" alone is not a full verb.",
        },
        {
          id: "b3",
          options: ["is always", "always", "are always"],
          correct: "is always",
          expEn: "\"Warm\" describes the bread, and nothing happens, so the sentence needs \"be\". The bread = it, so \"is\". Without it there is no verb.",
        },
        {
          id: "b4",
          options: ["make", "makes", "making"],
          correct: "make",
          expEn: "Her two sons = they, so no -s: make. \"Making\" alone is not a full verb.",
        },
        {
          // From Unit 1.
          id: "b5",
          options: ["Saturdays, and the", "Saturdays, the", "Saturdays the"],
          correct: "Saturdays, and the",
          expEn: "\"The bakery is busy\" and \"the queue goes out of the door\" are two complete sentences. A comma alone is a splice and nothing at all is a run-on; a comma + and joins them.",
        }
      ]
    },
    {
      id: "ge2",
      title: "A Day at the Coast",
      passage: "Last Saturday my cousin and I [[b1]] the early bus to the coast. [[b2]] We [[b3]] a towel, so we sat on our jackets on the sand. [[b4]] the water was cold, we swam for an hour. In the evening we [[b5]] tired but happy.",
      blanks: [
        {
          id: "b1",
          options: ["took", "take", "taked"],
          correct: "took",
          expEn: "\"Last Saturday\" is finished, so the verb is past. \"Take\" is irregular: its past is \"took\". \"Taked\" is not a word.",
        },
        {
          // From Unit 1 (a fragment), with a missing "be" in the third choice.
          id: "b2",
          options: ["The bus was almost empty.", "Because the bus was almost empty.", "The bus almost empty."],
          correct: "The bus was almost empty.",
          expEn: "Only the first is a complete sentence. \"Because …\" is a dependent clause on its own (a fragment), and \"The bus almost empty\" has no verb: it needs \"was\".",
        },
        {
          id: "b3",
          options: ["didn't bring", "didn't brought", "don't brought"],
          correct: "didn't bring",
          expEn: "After \"didn't\", use the base verb: bring. \"Didn't\" already shows the past.",
        },
        {
          // From Unit 1.
          id: "b4",
          options: ["Although", "Because", "So"],
          correct: "Although",
          expEn: "Cold water, but they swam: a contrast, so \"Although\". \"Because\" gives the wrong reason, and \"So\" would leave a comma splice.",
        },
        {
          id: "b5",
          options: ["were", "was", "are"],
          correct: "were",
          expEn: "\"We\" takes \"were\" in the past. \"Are\" is the present, but the story is about last Saturday.",
        }
      ]
    },
    {
      id: "ge3",
      title: "Welcome to the Building",
      passage: "Welcome to the building! There [[b1]] two lifts, but the one on the left is often broken. [[b2]] a laundry room in the basement. The caretaker [[b3]] on the ground floor; he [[b4]] work on Sundays. Please put your rubbish out on Monday [[b5]] lorry comes early on Tuesday.",
      blanks: [
        {
          id: "b1",
          options: ["are", "is", "have"],
          correct: "are",
          expEn: "Two lifts is more than one, so \"there are\". \"Have\" cannot say that something is in a place.",
        },
        {
          id: "b2",
          options: ["There is", "It has", "Have"],
          correct: "There is",
          expEn: "To say that something is in a place, start with \"There is\" (one room). \"Have\" and \"It has\" do not say that.",
        },
        {
          id: "b3",
          options: ["lives", "live", "living"],
          correct: "lives",
          expEn: "The caretaker = he, so the present verb takes -s: lives.",
        },
        {
          id: "b4",
          options: ["doesn't", "don't", "isn't"],
          correct: "doesn't",
          expEn: "He takes \"doesn't\", and \"work\" stays in its base form: he doesn't work. \"Isn't work\" puts be in front of an action.",
        },
        {
          // From Unit 1.
          id: "b5",
          options: ["night because the", "night, the", "night the"],
          correct: "night because the",
          expEn: "The early lorry is the reason, so \"because\" joins the two ideas. A comma alone is a splice; nothing at all is a run-on.",
        }
      ]
    },
    {
      id: "ge4",
      title: "My Sister's Week",
      passage: "My sister [[b1]] nursing at a college in the city. She [[b2]] a car, so she cycles to her classes. Every evening she [[b3]] for three hours. She is tired at the [[b4]] still enjoys it. Last month she [[b5]] her first big exam.",
      blanks: [
        {
          id: "b1",
          options: ["studies", "study", "studys"],
          correct: "studies",
          expEn: "My sister = she, so -s. \"Study\" ends in a consonant + y, so y becomes ies: studies.",
        },
        {
          id: "b2",
          options: ["doesn't have", "don't have", "doesn't has"],
          correct: "doesn't have",
          expEn: "She takes \"doesn't\", and the verb after it is the base form: have. One -s is enough, and it is already in \"doesn't\".",
        },
        {
          id: "b3",
          options: ["reads", "read", "reading"],
          correct: "reads",
          expEn: "\"Every evening\" is a habit, and she = he / she / it, so reads.",
        },
        {
          // From Unit 1.
          id: "b4",
          options: ["weekend, but she", "weekend, she", "weekend she"],
          correct: "weekend, but she",
          expEn: "Tired, but she enjoys it: two complete ideas in contrast need a comma + but. A comma alone is a splice; nothing at all is a run-on.",
        },
        {
          id: "b5",
          options: ["passed", "passes", "pass"],
          correct: "passed",
          expEn: "\"Last month\" is finished, so the past: pass + ed.",
        }
      ]
    }
  ],
  // Find & Fix: 25 mistakes, 5 of them from Unit 1. One miss across the task still earns
  // full marks (proofreadScore).
  proofread: [
    {
      id: "pf1",
      title: "The Night Bus",
      passage: "My aunt drive a night bus in the city. Her shift start at ten in the evening and ends at six in the morning. The bus usually quiet after midnight. Last week a man left his phone on the back seat, my aunt found it at the end of the line. She call the number on the screen. The man come to the bus station the next morning to collect it.",
      errors: [
        {
          id: "e1",
          wrong: "aunt drive a",
          right: "aunt drives a",
          accept: [],
          kind: "Missing -s",
          expEn: "My aunt = she, and this is her job every night, so the present verb takes -s: drives.",
        },
        {
          id: "e2",
          wrong: "shift start at",
          right: "shift starts at",
          accept: [],
          kind: "Missing -s",
          expEn: "Her shift = it, so starts. Look at \"ends\" later in the same sentence: it has its -s.",
        },
        {
          id: "e3",
          wrong: "bus usually quiet",
          right: "bus is usually quiet",
          accept: [],
          kind: "Missing be",
          expEn: "\"Quiet\" describes the bus, and nothing happens, so the sentence needs \"be\": the bus is usually quiet.",
        },
        {
          // From Unit 1.
          id: "e4",
          wrong: "seat, my aunt",
          right: "seat, and my aunt",
          accept: ["seat. My aunt", "seat; my aunt"],
          kind: "Comma splice",
          expEn: "Two complete sentences with only a comma between them. Add \"and\" after the comma, or use a full stop.",
        },
        {
          id: "e5",
          wrong: "She call the",
          right: "She called the",
          accept: [],
          kind: "Past simple",
          expEn: "This happened last week, so the verb is past: call + ed.",
        },
        {
          id: "e6",
          wrong: "man come to",
          right: "man came to",
          accept: [],
          kind: "Irregular past",
          expEn: "The story is in the past. \"Come\" is irregular: its past is \"came\".",
        }
      ]
    },
    {
      id: "pf2",
      title: "My Grandmother's Village",
      passage: "My grandmother lives in a small village in the hills. In the village have a small clinic. There is three wells, but only one has clean water. The people very friendly. Every morning the farmers walks to their fields before sunrise. My grandmother doesn't has a phone, so I write her letters. Although the village is far away. I visit her every summer.",
      errors: [
        {
          id: "e1",
          wrong: "village have a",
          right: "village there is a",
          accept: ["village, there is a"],
          kind: "\"have\" for there is",
          expEn: "To say that something is in a place, use \"there is\" (one clinic), not \"have\".",
        },
        {
          id: "e2",
          wrong: "There is three",
          right: "There are three",
          accept: [],
          kind: "There is / there are",
          expEn: "Three wells is more than one, so \"there are\".",
        },
        {
          id: "e3",
          wrong: "people very friendly",
          right: "people are very friendly",
          accept: [],
          kind: "Missing be",
          expEn: "\"Friendly\" describes the people, and nothing happens, so the sentence needs \"be\". The people = they, so \"are\".",
        },
        {
          id: "e4",
          wrong: "farmers walks to",
          right: "farmers walk to",
          accept: [],
          kind: "Extra -s",
          expEn: "The farmers = they, so the verb takes no -s: walk.",
        },
        {
          id: "e5",
          wrong: "doesn't has a",
          right: "doesn't have a",
          accept: ["does not have a"],
          kind: "Doesn't + base verb",
          expEn: "After \"doesn't\", use the base verb: have. The -s is already in \"doesn't\".",
        },
        {
          // From Unit 1.
          id: "e6",
          wrong: "away. I visit",
          right: "away, I visit",
          accept: [],
          kind: "Fragment",
          expEn: "\"Although the village is far away\" cannot stand alone. Join it to the next sentence with a comma.",
        }
      ]
    },
    {
      id: "pf3",
      title: "The Food Festival",
      passage: "Every year our town has a food festival in the main square. Last year it rain on the first day, the organisers moved the stalls into the sports hall. There was so many people that the hall felt small. My brother sell noodles at the festival. He doesn't makes much money, but he enjoy talking to people. The festival was a big success. Because it was popular, so the town will hold it again in May.",
      errors: [
        {
          id: "e1",
          wrong: "it rain on",
          right: "it rained on",
          accept: [],
          kind: "Past simple",
          expEn: "\"Last year\" is finished, so the verb is past: rain + ed.",
        },
        {
          // From Unit 1.
          id: "e2",
          wrong: "day, the organisers",
          right: "day, so the organisers",
          accept: ["day. The organisers", "day; the organisers", "day, and the organisers"],
          kind: "Comma splice",
          expEn: "The rain is the reason they moved, so a comma + so joins the two complete sentences. A comma alone is a splice.",
        },
        {
          id: "e3",
          wrong: "There was so many",
          right: "There were so many",
          accept: [],
          kind: "There was / there were",
          expEn: "Many people is more than one, so the past is \"there were\".",
        },
        {
          id: "e4",
          wrong: "brother sell noodles",
          right: "brother sells noodles",
          accept: [],
          kind: "Missing -s",
          expEn: "My brother = he, and he does it every year, so sells.",
        },
        {
          id: "e5",
          wrong: "doesn't makes much",
          right: "doesn't make much",
          accept: ["does not make much"],
          kind: "Doesn't + base verb",
          expEn: "After \"doesn't\", use the base verb: make. One -s is enough.",
        },
        {
          id: "e6",
          wrong: "he enjoy talking",
          right: "he enjoys talking",
          accept: [],
          kind: "Missing -s",
          expEn: "He takes -s in the present: enjoys.",
        },
        {
          // From Unit 1: two joining words.
          id: "e7",
          wrong: "Because it was popular, so",
          right: "Because it was popular,",
          accept: ["It was popular, so"],
          kind: "Two joining words",
          expEn: "\"Because\" and \"so\" both join the two ideas. Keep one of them: \"Because it was popular, the town …\" or \"It was popular, so the town …\".",
        }
      ]
    },
    {
      id: "pf4",
      title: "A Message to the Manager",
      passage: "Dear Ms Grant, I am writing about the coffee machine on the second floor. It broken again. Last Monday I put in two coins, but the machine don't give me a coffee. There is no sign with a phone number, so nobody know who to call. My colleagues is very unhappy. Could someone look at it this week? It make our mornings very long. Thank you for your help, I hope you can fix it soon.",
      errors: [
        {
          id: "e1",
          wrong: "It broken again",
          right: "It is broken again",
          accept: ["It's broken again"],
          kind: "Missing be",
          expEn: "\"Broken\" describes the machine, and nothing happens, so the sentence needs \"be\": it is broken.",
        },
        {
          id: "e2",
          wrong: "machine don't give",
          right: "machine didn't give",
          accept: ["machine did not give"],
          kind: "Past simple",
          expEn: "This happened last Monday, so the past: didn't + give.",
        },
        {
          id: "e3",
          wrong: "nobody know who",
          right: "nobody knows who",
          accept: [],
          kind: "Missing -s",
          expEn: "\"Nobody\" works like he / she / it, so the present verb takes -s: knows.",
        },
        {
          id: "e4",
          wrong: "colleagues is very",
          right: "colleagues are very",
          accept: [],
          kind: "Agreement",
          expEn: "My colleagues = they, so \"are\", not \"is\".",
        },
        {
          id: "e5",
          wrong: "It make our",
          right: "It makes our",
          accept: [],
          kind: "Missing -s",
          expEn: "It takes -s in the present: makes.",
        },
        {
          // From Unit 1.
          id: "e6",
          wrong: "help, I hope",
          right: "help. I hope",
          accept: ["help; I hope", "help, and I hope"],
          kind: "Comma splice",
          expEn: "\"Thank you for your help\" and \"I hope you can fix it soon\" are two complete sentences. A comma alone cannot join them.",
        }
      ]
    }
  ],
  // "Fix it your way" (engine Rewrite, unit/app/tasks/RewriteTask.jsx): the student types a
  // new version of a faulty sentence. Nine verb sentences (`kind: 'exact'`: the right
  // sentence, or any listed in `accept`; a contraction counts as its long form) and three
  // from Unit 1 (joins, judged by unit/app/tasks/rewrite.js). `checkRewriteItems` runs every
  // answer through the checker (tests/rewrite.test.mjs). None repeats a lesson example.
  rewrite: [
    {
      id: "rv1", kind: "exact", label: "Missing be",
      ask: "Fix the verb. Keep the rest of the sentence.",
      given: "My neighbours very noisy at night.",
      right: "My neighbours are very noisy at night.",
      accept: ["My neighbours were very noisy at night."],
      hint: "Nothing happens in this sentence, so it needs be. My neighbours = they: are, or were for the past.",
      note: "\"Noisy\" describes the neighbours. With no action, English still needs a verb: are.",
    },
    {
      id: "rv2", kind: "exact", label: "Missing -s",
      ask: "Fix the verb. Keep the rest of the sentence.",
      given: "The museum open at ten on Sundays.",
      right: "The museum opens at ten on Sundays.",
      accept: ["The museum is open at ten on Sundays.", "The museum opened at ten on Sundays.", "The museum will open at ten on Sundays."],
      hint: "The museum = it. Add -s to the verb.",
      note: "\"The museum\" = it, so the present verb takes -s: opens.",
    },
    {
      id: "rv3", kind: "exact", label: "Past simple",
      ask: "Fix the verb. Keep the rest of the sentence.",
      given: "Last night we watch a film at home.",
      right: "Last night we watched a film at home.",
      accept: ["Last night, we watched a film at home.", "Last night we were watching a film at home.", "Last night, we were watching a film at home."],
      hint: "\"Last night\" is in the past. Put the verb in the past: add -ed.",
      note: "A finished time (last night) needs the past: watch → watched.",
    },
    {
      // From Unit 1.
      id: "rv4", label: "Comma splice",
      given: "The supermarket was closed, we bought bread at the corner shop.",
      a: "The supermarket was closed", b: "we bought bread at the corner shop",
      fanboys: ["so"], weak: ["and"], subs: [{ w: "because", dep: "a" }, { w: "since", dep: "a" }],
      model: "The supermarket was closed, so we bought bread at the corner shop.",
      also: "Because the supermarket was closed, we bought bread at the corner shop.",
    },
    {
      id: "rv5", kind: "exact", label: "There is / there are",
      ask: "Fix the verb. Keep the rest of the sentence.",
      given: "In our street have two shops and a bakery.",
      right: "In our street there are two shops and a bakery.",
      accept: [
        "In our street, there are two shops and a bakery.",
        "There are two shops and a bakery in our street.",
        "In our street there were two shops and a bakery.",
        "In our street, there were two shops and a bakery.",
        "There were two shops and a bakery in our street.",
        "Our street has two shops and a bakery.",
      ],
      hint: "Two shops and a bakery is more than one thing, so use \"there are\". Not \"have\".",
      note: "\"Have\" cannot say that something is in a place. Two shops and a bakery is more than one, so \"there are\".",
    },
    {
      id: "rv6", kind: "exact", label: "Doesn't",
      ask: "Fix the verb. Keep the rest of the sentence.",
      given: "My brother don't like spicy food.",
      right: "My brother doesn't like spicy food.",
      accept: ["My brother didn't like spicy food.", "My brother dislikes spicy food."],
      hint: "My brother = he: \"doesn't\" and then the base verb, with no -s.",
      note: "he / she / it: doesn't + the base verb. My brother doesn't like.",
    },
    {
      id: "rv7", kind: "exact", label: "Irregular past",
      ask: "Fix the verb. Keep the rest of the sentence.",
      given: "Two years ago my family go to the mountains.",
      right: "Two years ago my family went to the mountains.",
      accept: ["Two years ago, my family went to the mountains.", "Two years ago my family travelled to the mountains.", "Two years ago my family traveled to the mountains."],
      hint: "\"Ago\" means the past. \"Go\" is irregular: its past is not \"goed\".",
      note: "go → went. \"Ago\" always takes the past.",
    },
    {
      // From Unit 1.
      id: "rv8", label: "Fragment",
      given: "My sister stayed at home. Because she had a cold.",
      a: "My sister stayed at home", b: "she had a cold",
      subs: [{ w: "because", dep: "b" }, { w: "since", dep: "b" }], allow: ["sub"],
      holdHint: "That is a correct sentence, but it drops \"because\". Keep \"because\" and join the idea to the sentence before it.",
      model: "My sister stayed at home because she had a cold.",
      also: "Because she had a cold, my sister stayed at home.",
    },
    {
      id: "rv9", kind: "exact", label: "Doesn't + base verb",
      ask: "Fix the verb. Keep the rest of the sentence.",
      given: "The bus doesn't stops here at night.",
      right: "The bus doesn't stop here at night.",
      accept: ["The bus didn't stop here at night."],
      hint: "After \"doesn't\", use the base verb, with no -s.",
      note: "The -s is already in \"does\". One -s is enough: doesn't stop.",
    },
    {
      id: "rv10", kind: "exact", label: "Didn't + base verb",
      ask: "Fix the verb. Keep the rest of the sentence.",
      given: "We didn't saw the sign.",
      right: "We didn't see the sign.",
      accept: [],
      hint: "After \"didn't\", use the base verb: see, go, have.",
      note: "\"Didn't\" already says past, so the verb after it is the base form: see.",
    },
    {
      id: "rv11", kind: "exact", label: "Question",
      ask: "Fix the question. Keep the same words, and add or change only what you need.",
      given: "Where your sister works?",
      right: "Where does your sister work?",
      accept: ["Where did your sister work?", "Where is your sister working?", "Where was your sister working?"],
      hint: "A question about he / she / it needs \"does\" before the subject, and then the base verb.",
      note: "Where + does + your sister + work? The -s moves to \"does\".",
    },
    {
      // From Unit 1: two joining words ("Although … but").
      id: "rv12", label: "Two joining words",
      given: "Although the tickets were expensive, but the concert was full.",
      a: "the tickets were expensive", b: "the concert was full",
      fanboys: ["but", "yet"], subs: [{ w: "although", dep: "a" }, { w: "though", dep: "a" }, { w: "even though", dep: "a" }],
      model: "Although the tickets were expensive, the concert was full.",
      also: "The tickets were expensive, but the concert was full.",
    },
  ],
  writing: {
    type: "descriptive",
    minutes: 30,
    minWords: 150,
    paragraphs: 3,
    focus: {
      label: "The verb in every sentence",
      look: "a missing \"be\" (\"She very tired\"), a missing -s on he / she / it verbs, the wrong past form, and \"have\" where \"there is / there are\" is needed (\"In my town have a market\")"
    },
    // One prompt (Bowen, 20 November 2026). Its id never changes once used.
    prompt: {
      id: "u2w1",
      title: "A place I know well",
      task: "Describe a place you know well: a market, a shop, a park, a street or a room. Say what is there, what people do there, and tell about one time you went there.",
      guidelines: [
        "Paragraph 1: where the place is and what is there. Use \"there is\" and \"there are\".",
        "Paragraph 2: a normal day there. Who works or spends time there, and what do they do? Use he / she + -s.",
        "Paragraph 3: one time you went there and what happened. Use the past tense.",
        "Check every sentence for a verb. If nothing happens, use am, is, are, was or were."
      ],
    }
  },
  assessment,
  reading,
  notes
};
