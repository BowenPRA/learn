// Upper Secondary English Unit 3: Nouns and Articles (Bowen, 21 November 2026: "lets start
// on unit 3. list the plan and content", then "Yes, build it"). From
// docs/UPPER-ENGLISH-PLAN.md, Stage 1 item 3: plurals, things you can and cannot count
// (information, advice), a / an / the and no article. English only, neutral examples.
//
// Built like Unit 2:
// - About a quarter of the practice comes from Units 1 and 2 (boundaries, verbs). Each such
//   item says so in a comment.
// - "Fix it your way" takes noun mistakes (`kind: 'exact'` items) as well as joins.
// - A reading passage (reading.js), its own task.
//
// `writing` is the unit's timed writing task: one prompt, whose id never changes once used.
import { assessment } from './assessment.js';
import { notes } from './notes.js';
import { reading } from './reading.js';

const NOUN = "Fix the noun. Keep the rest of the sentence.";
const VERB = "Fix the verb. Keep the rest of the sentence.";

export const U03_DATA = {
  meta: {
    id: "U03",
    title: "Nouns and Articles",
    desc: "Make plurals, tell the things you can count from the things you cannot, and choose a, an, the or no article at all.",
    track: "UPPER_ENG",
    icon: "Boxes",
    audio: false
  },
  realWords: [
    {
      word: "Noun",
      def: "A word for a person, place, thing or idea.",
      sent: "\"Rice\", \"chair\" and \"city\" are all nouns.",
      isReal: true
    },
    {
      word: "Singular",
      def: "Describing one person or thing.",
      sent: "\"Child\" is singular; \"children\" is not.",
      isReal: true
    },
    {
      word: "Plural",
      def: "Describing more than one person or thing.",
      sent: "\"Feet\" is the plural of \"foot\".",
      isReal: true
    },
    {
      word: "Countable",
      def: "Describing a noun you can count: one chair, two chairs.",
      sent: "\"Apple\" is countable, so we can say \"three apples\".",
      isReal: true
    },
    {
      word: "Uncountable",
      def: "Describing a noun you cannot count. It takes no a / an and no -s.",
      sent: "\"Advice\" is uncountable, so we never say \"an advice\".",
      isReal: true
    },
    {
      word: "Article",
      def: "One of the words a, an and the, which come before a noun.",
      sent: "English has three articles: a, an and the.",
      isReal: true
    },
    {
      word: "Definite",
      def: "Describing \"the\": the article for something the reader knows.",
      sent: "\"The\" is the definite article.",
      isReal: true
    },
    {
      word: "Indefinite",
      def: "Describing \"a\" and \"an\": the articles for something the reader does not know yet.",
      sent: "\"A\" and \"an\" are indefinite articles.",
      isReal: true
    },
    {
      word: "Vowel sound",
      def: "A sound like a, e, i, o or u at the start of a word.",
      sent: "\"Hour\" begins with a vowel sound, so we say \"an hour\".",
      isReal: true
    },
    {
      word: "General",
      def: "About all things of one kind, not one in particular.",
      sent: "\"Cats like fish\" is a general statement about all cats.",
      isReal: true
    }
  ],
  grammarEdit: [
    {
      id: "ge1",
      title: "Moving House",
      passage: "Last month we moved to [[b1]] new flat near the station. [[b2]] flat is on the fourth floor, and it has a big kitchen. We still need [[b3]] for the living room. My mother bought two [[b4]] for the kitchen wall, and every evening my father [[b5]] a few more boxes.",
      blanks: [
        {
          id: "b1",
          options: ["a", "an", "some"],
          correct: "a",
          expEn: "The first time, the reader does not know which flat, and \"new\" starts with a consonant sound: a new flat. \"Some\" cannot go with one flat.",
        },
        {
          id: "b2",
          options: ["The", "A", "An"],
          correct: "The",
          expEn: "Now the reader knows which flat (the one we moved to), so \"The\".",
        },
        {
          id: "b3",
          options: ["some furniture", "some furnitures", "a furniture"],
          correct: "some furniture",
          expEn: "Furniture cannot be counted, so it takes no -s and no \"a\": some furniture.",
        },
        {
          id: "b4",
          options: ["shelves", "shelfs", "shelf"],
          correct: "shelves",
          expEn: "Two is more than one, and \"shelf\" ends in f, so f becomes ves: shelves.",
        },
        {
          // From Unit 2.
          id: "b5",
          options: ["unpacks", "unpack", "unpacking"],
          correct: "unpacks",
          expEn: "My father = he, and this happens every evening, so the present verb takes -s: unpacks.",
        }
      ]
    },
    {
      id: "ge2",
      title: "The Night Market",
      passage: "Every Friday there [[b1]] a night market near the river. [[b2]] come to buy food, clothes and cheap phones. The food is good, and [[b3]] is fresh. Last week I bought [[b4]] umbrella for my mother. [[b5]] it was raining, the market was full.",
      blanks: [
        {
          // From Unit 2.
          id: "b1",
          options: ["is", "are", "has"],
          correct: "is",
          expEn: "One market, so \"there is\". \"Has\" cannot say that something is in a place.",
        },
        {
          id: "b2",
          options: ["Hundreds of people", "Hundreds of peoples", "Hundred of people"],
          correct: "Hundreds of people",
          expEn: "\"People\" is already the plural of \"person\", so it takes no -s. \"Hundreds of\" needs its -s.",
        },
        {
          id: "b3",
          options: ["the fruit", "the fruits", "fruits"],
          correct: "the fruit",
          expEn: "The verb is \"is\", so the noun is one thing or something you cannot count: the fruit. \"The fruits is\" and \"fruits is\" do not match.",
        },
        {
          id: "b4",
          options: ["an", "a", "some"],
          correct: "an",
          expEn: "\"Umbrella\" starts with a vowel sound, so \"an\": an umbrella.",
        },
        {
          // From Unit 1.
          id: "b5",
          options: ["Although", "Because", "So"],
          correct: "Although",
          expEn: "Rain, but the market was full: a contrast, so \"Although\". \"So\" would leave a comma splice.",
        }
      ]
    },
    {
      id: "ge3",
      title: "Advice for a First Job",
      passage: "My aunt gave me [[b1]] before my first job. Arrive early, and always bring [[b2]] and a notebook. On the first day, your manager will give you [[b3]]. Do not check your phone every five [[b4]] looks rude. Most new workers [[b5]] nervous at first, and that is normal.",
      blanks: [
        {
          id: "b1",
          options: ["some good advice", "a good advice", "some good advices"],
          correct: "some good advice",
          expEn: "Advice cannot be counted: no \"a\" and no -s. Say \"some advice\" or \"a piece of advice\".",
        },
        {
          id: "b2",
          options: ["a pen", "pen", "an pen"],
          correct: "a pen",
          expEn: "One pen, a thing you can count, needs a word in front. \"Pen\" starts with a consonant sound: a pen.",
        },
        {
          id: "b3",
          options: ["a lot of information", "a lot of informations", "many information"],
          correct: "a lot of information",
          expEn: "Information cannot be counted: no -s, and \"many\" only goes with things you can count. \"A lot of\" goes with both.",
        },
        {
          // From Unit 1.
          id: "b4",
          options: ["minutes. It", "minutes, it", "minutes it"],
          correct: "minutes. It",
          expEn: "\"Do not check your phone every five minutes\" and \"it looks rude\" are two complete sentences. A comma alone is a splice; nothing at all is a run-on.",
        },
        {
          // From Unit 2.
          id: "b5",
          options: ["feel", "feels", "feeling"],
          correct: "feel",
          expEn: "Most new workers = they, so no -s: feel.",
        }
      ]
    },
    {
      id: "ge4",
      title: "A Trip to the Dentist",
      passage: "Last week one of my [[b1]] started to hurt, so I made [[b2]] appointment with a dentist near my flat. [[b3]] dentist was young and kind. She said I eat too [[b4]] and do not brush for long enough. Now I brush my teeth twice [[b5]] day.",
      blanks: [
        {
          id: "b1",
          options: ["teeth", "tooths", "tooth"],
          correct: "teeth",
          expEn: "\"One of my …\" takes a plural, and \"tooth\" is irregular: teeth.",
        },
        {
          id: "b2",
          options: ["an", "a", "some"],
          correct: "an",
          expEn: "\"Appointment\" starts with a vowel sound, so \"an\".",
        },
        {
          id: "b3",
          options: ["The", "A", "An"],
          correct: "The",
          expEn: "The reader already knows which dentist (the one near my flat), so \"The\".",
        },
        {
          id: "b4",
          options: ["much sugar", "many sugar", "much sugars"],
          correct: "much sugar",
          expEn: "Sugar cannot be counted: no -s, and \"much\", not \"many\".",
        },
        {
          id: "b5",
          options: ["a", "an", "the"],
          correct: "a",
          expEn: "\"Twice a day\" means two times in every day: a. \"Day\" starts with a consonant sound.",
        }
      ]
    }
  ],
  // Find & Fix: 20 mistakes, 5 of them from Units 1 and 2. One miss across the task still
  // earns full marks (proofreadScore).
  proofread: [
    {
      id: "pf1",
      title: "A Message from the Gym",
      passage: "Dear members, from Monday the gym will have new opening hours. We will open at six o'clock in morning and close at ten at night. We have bought five new running machine and some new equipments. Please bring a towel and a bottle of water. There is a small shop next to the entrance, and it sells snacks and drinks. Childs under twelve must stay with an adult. The changing rooms is closed on Sundays for cleaning.",
      errors: [
        {
          id: "e1",
          wrong: "o'clock in morning",
          right: "o'clock in the morning",
          accept: [],
          kind: "Missing the",
          expEn: "We say \"in the morning\", \"in the afternoon\", \"in the evening\": there is only one morning that day.",
        },
        {
          id: "e2",
          wrong: "running machine and",
          right: "running machines and",
          accept: [],
          kind: "Missing plural",
          expEn: "Five is more than one, so \"machine\" takes -s: five machines.",
        },
        {
          id: "e3",
          wrong: "new equipments",
          right: "new equipment",
          accept: [],
          kind: "Cannot count",
          expEn: "Equipment cannot be counted, so it takes no -s: some new equipment.",
        },
        {
          id: "e4",
          wrong: "Childs under twelve",
          right: "Children under twelve",
          accept: [],
          kind: "Irregular plural",
          expEn: "\"Child\" is irregular: one child, two children.",
        },
        {
          // From Unit 2.
          id: "e5",
          wrong: "rooms is closed",
          right: "rooms are closed",
          accept: [],
          kind: "Agreement",
          expEn: "The changing rooms = they, so \"are\", not \"is\".",
        }
      ]
    },
    {
      id: "pf2",
      title: "My First Week in a New City",
      passage: "Last month I moved to a big city for my studies. The first week was hard. I didn't know anybody, and I had a lot of homeworks. My flat is small, but it has a balcony. From balcony I can see a river and two bridge. On Saturday I met a girl from my class she showed me a good market. Now I know the city better, and I have three new friend.",
      errors: [
        {
          id: "e1",
          wrong: "of homeworks",
          right: "of homework",
          accept: [],
          kind: "Cannot count",
          expEn: "Homework cannot be counted, so it takes no -s: a lot of homework.",
        },
        {
          id: "e2",
          wrong: "From balcony I",
          right: "From the balcony I",
          accept: ["From my balcony I", "From the balcony, I", "From my balcony, I"],
          kind: "Missing the",
          expEn: "One balcony, and the reader knows which one (the one in my flat), so it needs \"the\" or \"my\" in front.",
        },
        {
          id: "e3",
          wrong: "two bridge",
          right: "two bridges",
          accept: [],
          kind: "Missing plural",
          expEn: "Two is more than one, so \"bridge\" takes -s.",
        },
        {
          // From Unit 1.
          id: "e4",
          wrong: "class she showed",
          right: "class, and she showed",
          accept: ["class. She showed", "class; she showed"],
          kind: "Run-on",
          expEn: "Two complete sentences with nothing between them. Add a comma + and, or use a full stop.",
        },
        {
          id: "e5",
          wrong: "three new friend",
          right: "three new friends",
          accept: [],
          kind: "Missing plural",
          expEn: "Three is more than one, so \"friend\" takes -s.",
        }
      ]
    },
    {
      id: "pf3",
      title: "The Science Museum",
      passage: "Last week our class visited the science museum in the capital. The museum have four floors. On the first floor there is a huge model of a human heart, and you can walk inside it. My favourite part was a room about the space. A guide gave us a lot of informations about the planets. The tickets was cheap, and the food in the café was good. I bought two postcard in the gift shop for my grandparents.",
      errors: [
        {
          // From Unit 2.
          id: "e1",
          wrong: "museum have four",
          right: "museum has four",
          accept: [],
          kind: "Agreement",
          expEn: "The museum = it, so \"has\", not \"have\".",
        },
        {
          id: "e2",
          wrong: "about the space",
          right: "about space",
          accept: [],
          kind: "No article",
          expEn: "Space (the stars and planets) is talked about in general and cannot be counted, so it takes no article.",
        },
        {
          id: "e3",
          wrong: "of informations",
          right: "of information",
          accept: [],
          kind: "Cannot count",
          expEn: "Information cannot be counted, so it takes no -s.",
        },
        {
          // From Unit 2.
          id: "e4",
          wrong: "tickets was cheap",
          right: "tickets were cheap",
          accept: [],
          kind: "Agreement",
          expEn: "The tickets = they, so the past of be is \"were\".",
        },
        {
          id: "e5",
          wrong: "two postcard",
          right: "two postcards",
          accept: [],
          kind: "Missing plural",
          expEn: "Two is more than one, so \"postcard\" takes -s.",
        }
      ]
    },
    {
      id: "pf4",
      title: "Healthy Habits",
      passage: "The sleep is important for teenagers. Most teenager need about nine hours a night, but many sleep less. Phones are a big problem, because the light from a screen keeps the brain awake. A good advice is to leave your phone in another room at night. Also, try to eat a breakfast every morning, it gives you energy for the day.",
      errors: [
        {
          id: "e1",
          wrong: "The sleep is",
          right: "Sleep is",
          accept: [],
          kind: "No article",
          expEn: "This is about sleep in general, and sleep cannot be counted, so there is no article.",
        },
        {
          id: "e2",
          wrong: "Most teenager need",
          right: "Most teenagers need",
          accept: [],
          kind: "Missing plural",
          expEn: "\"Most\" is about many teenagers, so the noun is plural: most teenagers.",
        },
        {
          id: "e3",
          wrong: "A good advice is",
          right: "A good piece of advice is",
          accept: ["Good advice is", "One good piece of advice is"],
          kind: "Cannot count",
          expEn: "Advice cannot be counted, so it takes no \"a\". Say \"a good piece of advice\" or \"good advice\".",
        },
        {
          id: "e4",
          wrong: "eat a breakfast",
          right: "eat breakfast",
          accept: ["have breakfast"],
          kind: "No article",
          expEn: "Meals take no article: eat breakfast, have lunch, cook dinner.",
        },
        {
          // From Unit 1.
          id: "e5",
          wrong: "morning, it gives",
          right: "morning. It gives",
          accept: ["morning; it gives", "morning, because it gives", "morning because it gives", "morning, and it gives", "morning, as it gives"],
          kind: "Comma splice",
          expEn: "\"Try to eat breakfast every morning\" and \"it gives you energy\" are two complete sentences. A comma alone cannot join them.",
        }
      ]
    }
  ],
  // "Fix it your way" (engine Rewrite): nine noun sentences (`kind: 'exact'`: the right
  // sentence, or any listed in `accept`; a contraction counts as its long form) and three
  // from Units 1 and 2. `checkRewriteItems` runs every answer through the checker
  // (tests/rewrite.test.mjs). None repeats a lesson example.
  rewrite: [
    {
      id: "nw1", kind: "exact", label: "Cannot count", ask: NOUN,
      given: "Can you give me some informations about the trip?",
      right: "Can you give me some information about the trip?",
      accept: ["Can you give me information about the trip?", "Can you give me any information about the trip?"],
      hint: "Information cannot be counted, so it takes no -s.",
      note: "information, advice, homework, furniture: no -s, ever.",
    },
    {
      id: "nw2", kind: "exact", label: "Cannot count", ask: NOUN,
      given: "My grandfather gave me a useful advice.",
      right: "My grandfather gave me some useful advice.",
      accept: ["My grandfather gave me useful advice.", "My grandfather gave me a useful piece of advice.", "My grandfather gave me a piece of useful advice."],
      hint: "Advice cannot be counted: no a, no -s. Use some advice, or a piece of advice.",
      note: "To count advice, count the pieces: a piece of advice, two pieces of advice.",
    },
    {
      id: "nw3", kind: "exact", label: "Irregular plural", ask: NOUN,
      given: "There are four child in the swimming pool.",
      right: "There are four children in the swimming pool.",
      accept: ["There were four children in the swimming pool."],
      hint: "Four is more than one, and child has its own plural: not childs.",
      note: "child → children, person → people, man → men, tooth → teeth.",
    },
    {
      id: "nw4", kind: "exact", label: "A job needs a / an", ask: NOUN,
      given: "My sister is nurse.",
      right: "My sister is a nurse.",
      accept: ["My sister was a nurse."],
      hint: "A job needs a or an in front. Which one? Listen to the first sound of \"nurse\".",
      note: "She is a nurse. He is an engineer. Jobs take a / an.",
    },
    {
      id: "nw5", kind: "exact", label: "One thing needs a word", ask: NOUN,
      given: "We bought new sofa yesterday.",
      right: "We bought a new sofa yesterday.",
      accept: ["We bought the new sofa yesterday.", "We bought our new sofa yesterday.", "Yesterday we bought a new sofa.", "Yesterday, we bought a new sofa."],
      hint: "A sofa is one thing you can count, so it needs a word in front: a, the or our. Choose a or an by the first sound of the next word.",
      note: "One thing you can count never stands alone: a sofa, the sofa, our sofa.",
    },
    {
      id: "nw6", kind: "exact", label: "A or an", ask: NOUN,
      given: "He is a honest man.",
      right: "He is an honest man.",
      accept: ["He was an honest man."],
      hint: "Say \"honest\" out loud. The h is silent, so it starts with a vowel sound.",
      note: "a or an goes by the sound, not the letter: an honest man, an hour, a university.",
    },
    {
      id: "nw7", kind: "exact", label: "Much or many", ask: NOUN,
      given: "I don't have many money.",
      right: "I don't have much money.",
      accept: ["I don't have a lot of money.", "I don't have lots of money.", "I don't have any money."],
      hint: "Money cannot be counted, so not \"many\". Use much, or a lot of.",
      note: "many + things you count (many coins). much + things you cannot (much money).",
    },
    {
      id: "nw8", kind: "exact", label: "The: only one", ask: NOUN,
      given: "Sun rises in the east.",
      right: "The sun rises in the east.",
      accept: ["The Sun rises in the east.", "The sun rises in the East.", "The Sun rises in the East."],
      hint: "There is only one sun, and everyone knows which one. What goes in front of it?",
      note: "Only one, and everyone knows it: the sun, the moon, the internet.",
    },
    {
      id: "nw9", kind: "exact", label: "Missing plural", ask: NOUN,
      given: "We have three bus stop near our house.",
      right: "We have three bus stops near our house.",
      accept: ["There are three bus stops near our house."],
      hint: "Three is more than one. Which word takes the -s?",
      note: "In \"bus stop\", the last word takes the -s: bus stops.",
    },
    {
      // From Unit 2.
      id: "nw10", kind: "exact", label: "Missing -s (Unit 2)", ask: VERB,
      given: "My best friend live near the station.",
      right: "My best friend lives near the station.",
      accept: ["My best friend lived near the station."],
      hint: "My best friend = he or she, so the present verb takes -s.",
      note: "he / she / it + verb-s: my best friend lives.",
    },
    {
      // From Unit 2.
      id: "nw11", kind: "exact", label: "Missing be (Unit 2)", ask: VERB,
      given: "The shops very busy today.",
      right: "The shops are very busy today.",
      accept: ["The shops were very busy today."],
      hint: "Nothing happens in this sentence, so it needs be. The shops = they: are, or were for the past.",
      note: "\"Busy\" describes the shops. With no action, English still needs a verb: are.",
    },
    {
      // From Unit 1.
      id: "nw12", label: "Comma splice (Unit 1)",
      given: "The bread was old, we threw it away.",
      a: "The bread was old", b: "we threw it away",
      fanboys: ["so"], weak: ["and"], subs: [{ w: "because", dep: "a" }, { w: "since", dep: "a" }],
      model: "The bread was old, so we threw it away.",
      also: "Because the bread was old, we threw it away.",
    },
  ],
  writing: {
    type: "explanatory",
    minutes: 30,
    minWords: 150,
    paragraphs: 3,
    focus: {
      label: "Nouns and articles",
      look: "a missing plural -s, an -s or \"a\" on things you cannot count (\"informations\", \"an advice\"), a missing a / an / the before one thing (\"I have car\"), a and an mixed up, and \"the\" before things in general"
    },
    // One prompt. Its id never changes once used.
    prompt: {
      id: "u3w1",
      title: "A meal I can make",
      task: "Explain how to make a simple meal or snack you know well: what it is, what you need, and how to make it.",
      guidelines: [
        "Paragraph 1: what the meal is, and when people eat it.",
        "Paragraph 2: what you need. Use a / an / some, and plurals: two eggs, some rice, a little salt.",
        "Paragraph 3: the steps, in order. Use First, Next and Finally.",
        "Check every noun: one or more? Can you count it? a, an, the or nothing?"
      ],
      // The planner's own example is a sandwich, too close to this task to leave in.
      plan: {
        start: "how to make a cheese omelette",
        steps: "two eggs and some cheese · beat the eggs · cook and fold",
        end: "it is quick, cheap and good"
      },
    }
  },
  assessment,
  reading,
  notes
};
