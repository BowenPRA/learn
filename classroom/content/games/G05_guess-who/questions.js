// content/games/G05_guess-who/questions.js
// The ideas under the board's question box. Asking their own question is the
// point (it is English practice), so these are a helping hand: three model
// questions at a time, each about something nobody has asked yet. Ported from
// BowenPRA/classroom src/guess-who/questions.js on 16 Nov 2026, with the
// student-face topics left behind and an animal board added.
//
// Every idea belongs to a topic. A topic is covered when a question asks about
// it: a tapped idea always (its topic travels with it, in any language), and a
// typed question when its English mentions it ("Is it a bird?" covers
// feathers). French typed questions are not read, so their topics stay on offer.
//
// Animals: the ideas are the key's own questions (Science 4.4), each offered
// only while it splits the animals still up. They come in a shuffled order, not
// best first: picking the question that splits the animals most evenly is the
// class's job (Science 4.5 Constructing keys).
//
// Pure and deterministic, with no React in it.

/** Lower case, no accents or punctuation, single spaces: "Bảo Châu" → "bao chau". */
const fold = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

// ── Reading a typed question ────────────────────────────────────────────────

const NUMBER_WORDS = {
  one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
}

/** A question as plain words: no accents or punctuation, "monster's" as "monster", number words as digits. */
export function words(text) {
  const s = String(text || '').replace(/([a-z0-9])['’‘`´]s\b/gi, '$1')
  return fold(s).split(' ').filter(Boolean).map((w) => NUMBER_WORDS[w] || w)
}

/** A plural made singular: "flies" → "fly", "horns" → "horn". */
function singular(w) {
  if (w.length > 4 && w.endsWith('ies')) return `${w.slice(0, -3)}y`
  if (w.length > 4 && w.endsWith('sses')) return w.slice(0, -2)
  if (w.length > 4 && /(x|ch|sh|z)es$/.test(w)) return w.slice(0, -2)
  if (w.length > 3 && w.endsWith('s') && !/(ss|us|is)$/.test(w)) return w.slice(0, -1)
  return w
}

/**
 * A word's stem, so "horns", "flying" and "stripes" meet "horn", "fly" and
 * "stripe". Deliberately small: a keyword and a typed word are stemmed the
 * same way, so the stem only has to be consistent, not correct.
 */
function stem(w) {
  let s = singular(w)
  if (s.length > 5 && s.endsWith('ing')) s = s.slice(0, -3)
  else if (s.length > 4 && s.endsWith('ed')) s = s.slice(0, -2)
  if (s.length >= 5 && s.endsWith('e')) s = s.slice(0, -1)
  return s
}

/** Edits between two short words, a swap of neighbours counting as one; anything over `cap` reports cap + 1. */
function edits(a, b, cap) {
  if (Math.abs(a.length - b.length) > cap) return cap + 1
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
    }
  }
  return Math.min(d[a.length][b.length], cap + 1)
}

// Words a question is made of. They, and every keyword, are spelled right by
// definition: "short" is never a slip for "shirt".
const COMMON = `your you it its he she his her they them their does do did is are was be have has had wear wearing
  the a an this that name start with can could of in on at or and not no yes than more less big small little like
  look see very any some what who which how many much there got get letter word from live eat kind type one by for
  to as so ear eye nose mouth face head tall fat thin animal monster body made long`.split(/\s+/)

// ── Topics ──────────────────────────────────────────────────────────────────
// `keys`: words or phrases, any one of which covers the topic. `test`: anything
// a word list cannot say. `ask`: model questions as [English, French], one
// shown per game; or `make`, which builds one from the cards still up (or
// returns null). `family`: topics shown one at a time. Ranked by `tier`, best
// first; each game shuffles within a tier.

const COLOURS = ['black', 'brown', 'red', 'grey', 'gray', 'white', 'yellow', 'orange', 'golden', 'green', 'purple', 'blue', 'pink', 'gold', 'silver', 'colour', 'color']

const isNumber = (w) => /^\d{1,2}$/.test(w)
const mentions = (ws, key) => hasPhrase(ws, key)
const LEG = (ws) => mentions(ws, 'leg') || mentions(ws, 'feet') || mentions(ws, 'foot')
const WING = (ws) => mentions(ws, 'wing')
const MORE = ['more', 'than', 'over', 'fewer', 'less', 'under']
const saysMore = (ws) => MORE.some((m) => ws.includes(m))

/**
 * An animal idea that is offered only while it splits the cards still up:
 * some have it and some do not.
 */
const split = (has, en, fr) => (cards) => {
  const yes = cards.filter(has).length
  return yes > 0 && yes < cards.length ? [en, fr] : null
}

const ANIMAL_TOPICS = [
  { id: 'legs', family: 'legs', tier: 1, test: (ws) => LEG(ws) && !ws.some(isNumber) && !saysMore(ws), make: split((c) => c.has.legs > 0, 'Does it have legs?', 'A-t-il des pattes ?') },
  { id: 'sixLegs', family: 'legs', tier: 1, test: (ws) => LEG(ws) && ws.includes('6') && !saysMore(ws), make: split((c) => c.has.legs === 6, 'Does it have six legs?', 'A-t-il six pattes ?') },
  { id: 'moreLegs', family: 'legs', tier: 1, test: (ws) => LEG(ws) && (saysMore(ws) || ws.some((w) => isNumber(w) && Number(w) > 6)), make: split((c) => c.has.legs > 6, 'Does it have more than six legs?', 'A-t-il plus de six pattes ?') },
  { id: 'wings', family: 'wings', tier: 1, test: (ws) => WING(ws) && !ws.some(isNumber), make: split((c) => c.has.wings > 0, 'Does it have wings?', 'A-t-il des ailes ?') },
  { id: 'fourWings', family: 'wings', tier: 1, test: (ws) => WING(ws) && (ws.includes('4') || ws.includes('2')), make: split((c) => c.has.wings === 4, 'Does it have four wings?', 'A-t-il quatre ailes ?') },
  { id: 'rings', tier: 1, keys: ['ring', 'segment', 'segmented'], make: split((c) => c.has.rings, 'Is its body made of rings?', 'Son corps est-il fait d’anneaux ?') },
  { id: 'scales', tier: 1, keys: ['scale', 'scaly', 'reptile'], make: split((c) => c.has.scales, 'Does it have scales?', 'A-t-il des écailles ?') },
  { id: 'fins', tier: 1, keys: ['fin'], make: split((c) => c.has.fins, 'Does it have fins?', 'A-t-il des nageoires ?') },
  { id: 'shell', tier: 1, keys: ['shell'], make: split((c) => c.has.shell, 'Does it have a shell?', 'A-t-il une coquille ?') },
  { id: 'feathers', tier: 1, keys: ['feather', 'bird'], make: split((c) => c.has.feathers, 'Does it have feathers?', 'A-t-il des plumes ?') },
  { id: 'fly', tier: 2, keys: ['fly', 'flying', 'flies'], make: split((c) => c.has.flies, 'Can it fly?', 'Peut-il voler ?') },
  { id: 'big', tier: 2, keys: ['big', 'bigger', 'large', 'huge', 'giant', 'size'], make: split((c) => c.has.big, 'Is it bigger than a person?', 'Est-il plus grand qu’une personne ?') },
  { id: 'fourLegs', family: 'legs', tier: 2, test: (ws) => LEG(ws) && ws.includes('4'), make: split((c) => c.has.legs === 4, 'Does it have four legs?', 'A-t-il quatre pattes ?') },
  { id: 'insect', tier: 2, keys: ['insect', 'bug'], make: split((c) => c.has.insect, 'Is it an insect?', 'Est-ce un insecte ?') },
  { id: 'fish', tier: 2, keys: ['fish'], make: split((c) => c.has.fish, 'Is it a fish?', 'Est-ce un poisson ?') },
  { id: 'water', tier: 2, keys: ['water', 'sea', 'ocean', 'swim', 'river', 'lake'], make: split((c) => c.has.water, 'Does it live in water?', 'Vit-il dans l’eau ?') },
  { id: 'stripes', tier: 2, keys: ['stripe', 'striped', 'stripy'], make: split((c) => c.has.stripes, 'Does it have stripes?', 'A-t-il des rayures ?') },
  { id: 'spots', tier: 2, keys: ['spot', 'spotted', 'spotty', 'dot'], make: split((c) => c.has.spots, 'Does it have spots?', 'A-t-il des taches ?') },
  { id: 'fur', tier: 2, keys: ['fur', 'furry', 'hair', 'hairy', 'mammal'], make: split((c) => c.has.fur, 'Does it have fur?', 'A-t-il des poils ?') },
  { id: 'horns', tier: 2, keys: ['horn'], make: split((c) => c.has.horns, 'Does it have horns?', 'A-t-il des cornes ?') },
]

const MONSTER_TOPICS = [
  { id: 'fly', family: 'sky', tier: 1, keys: ['fly', 'flew', 'flying', 'float', 'hover'], ask: [['Can your monster fly?', 'Ton monstre peut-il voler ?']] },
  { id: 'animal', tier: 1, keys: ['animal', 'pet'], ask: [['Is your monster an animal?', 'Ton monstre est-il un animal ?']] },
  { id: 'person', tier: 1, keys: ['a person', 'human', 'people', 'man', 'men', 'woman', 'women', 'boy', 'girl', 'lady'], ask: [['Is your monster a person?', 'Ton monstre est-il une personne ?']] },
  {
    id: 'colour', tier: 1, keys: COLOURS,
    ask: [
      ['Is your monster green?', 'Ton monstre est-il vert ?'],
      ['Is your monster purple?', 'Ton monstre est-il violet ?'],
      ['Is your monster orange?', 'Ton monstre est-il orange ?'],
      ['Is your monster black?', 'Ton monstre est-il noir ?'],
    ],
  },
  { id: 'horns', tier: 1, keys: ['horn'], ask: [['Does your monster have horns?', 'Ton monstre a-t-il des cornes ?']] },
  { id: 'wings', family: 'sky', tier: 1, keys: ['wing'], ask: [['Does your monster have wings?', 'Ton monstre a-t-il des ailes ?']] },
  { id: 'magic', tier: 2, keys: ['magic', 'magical', 'spell', 'wand'], ask: [['Can your monster do magic?', 'Ton monstre fait-il de la magie ?']] },
  { id: 'hat', tier: 2, keys: ['hat', 'cap', 'crown', 'hood', 'helmet', 'turban'], ask: [['Is your monster wearing a hat?', 'Ton monstre porte-t-il un chapeau ?']] },
  { id: 'tail', tier: 2, keys: ['tail'], ask: [['Does your monster have a tail?', 'Ton monstre a-t-il une queue ?']] },
  {
    id: 'legs', tier: 2, keys: ['leg', 'feet', 'foot'],
    ask: [
      ['Does your monster have legs?', 'Ton monstre a-t-il des jambes ?'],
      ['Does your monster have four legs?', 'Ton monstre a-t-il quatre pattes ?'],
    ],
  },
  { id: 'hair', tier: 2, keys: ['hair', 'hairy', 'fur', 'furry', 'bald'], ask: [['Does your monster have hair?', 'Ton monstre a-t-il des poils ?']] },
  { id: 'clothes', tier: 2, keys: ['clothes', 'clothing', 'dress', 'cape', 'cloak', 'costume', 'shirt', 'robe', 'suit'], ask: [['Is your monster wearing clothes?', 'Ton monstre porte-t-il des vêtements ?']] },
  { id: 'teeth', tier: 2, keys: ['teeth', 'tooth', 'fang'], ask: [['Does your monster have sharp teeth?', 'Ton monstre a-t-il des dents pointues ?']] },
  { id: 'smile', tier: 2, keys: ['smile', 'smiling', 'happy', 'laugh', 'grin'], ask: [['Is your monster smiling?', 'Ton monstre sourit-il ?']] },
  { id: 'water', tier: 2, keys: ['water', 'sea', 'ocean', 'swim', 'river', 'lake', 'fish'], ask: [['Does your monster live in water?', 'Ton monstre vit-il dans l’eau ?']] },
  { id: 'real', tier: 2, keys: ['real', 'exist'], ask: [['Is your monster a real animal?', 'Ton monstre est-il un vrai animal ?']] },
  { id: 'eyes', tier: 2, keys: ['eye'], ask: [['Does your monster have big eyes?', 'Ton monstre a-t-il de grands yeux ?']] },
]

const TOPICS = { animals: ANIMAL_TOPICS, monsters: MONSTER_TOPICS }

// First letters, on the monster board only (a key asks about the animal, never
// its name): the unasked letter that starts the most names still up, as long
// as it does not start them all. Each letter is its own topic ('letter:k').
const firstLetter = (name) => fold(name).replace(/[^a-z]/g, '')[0] || null

function bestLetter(names, skip) {
  const m = new Map()
  for (const n of names) {
    const l = firstLetter(n)
    if (l) m.set(l, (m.get(l) || 0) + 1)
  }
  const fits = [...m.entries()].filter(([l, k]) => k < names.length && !skip(l))
  if (!fits.length) return null
  fits.sort((a, b) => Math.abs(a[1] - names.length / 2) - Math.abs(b[1] - names.length / 2) || a[0].localeCompare(b[0]))
  return fits[0][0]
}

// Words in their own right (and their singulars), never slips for another word.
const KNOWN = new Set([
  ...COMMON,
  ...Object.values(TOPICS).flatMap((list) => list.flatMap((t) => t.keys || [])).flatMap((k) => k.split(' ')),
  'leg', 'feet', 'foot', 'wing', 'first', 'begin', 'end', 'last',
].flatMap((w) => [w, singular(w)]))

/**
 * Does the typed word `w` mean the keyword `k`? The same stem; or, for a word
 * nobody would type on purpose, a small slip in a longer word: one change from
 * five letters, two from eight, and a swapped pair in a four-letter word
 * ("wnig"). A slip never changes the first letter.
 */
function sameWord(w, k) {
  const sw = stem(w)
  const sk = stem(k)
  if (sw === sk || w === k) return true
  if (w.length < 4 || KNOWN.has(w) || KNOWN.has(singular(w)) || w[0] !== k[0]) return false
  const allowed = (s) => (s.length >= 8 ? 2 : s.length >= 5 ? 1 : 0)
  const allow = allowed(k)
  if (allow) return edits(w, k, allow) <= allow || (allowed(sk) > 0 && edits(sw, sk, allowed(sk)) <= allowed(sk))
  return k.length === 4 && w.length === 4 && edits(w, k, 1) === 1 && [...w].sort().join() === [...k].sort().join()
}

/** Does the phrase `key` ("a person", "horn") run through the words? */
function hasPhrase(ws, key) {
  const ks = key.split(' ')
  for (let i = 0; i + ks.length <= ws.length; i++) if (ks.every((k, j) => sameWord(ws[i + j], k))) return true
  return false
}

const CUES = new Set(['start', 'begin', 'beginn', 'began', 'first', 'initial'].map(stem))
const STOPS = new Set(['end', 'last', 'finish'].map(stem))

/** The first letters an English question asks about: "Does its name start with A?" → ['a']. */
function lettersAsked(text) {
  const ws = words(text)
  const from = ws.findIndex((w) => CUES.has(stem(w)))
  if (from < 0) return []
  const found = []
  for (let i = from + 1; i < ws.length; i++) {
    const w = ws[i]
    if (STOPS.has(stem(w))) break
    if (!/^[a-z]$/.test(w)) continue
    // "a" is the letter only on its own: last, or "A or B"; "a B", "a letter" are articles.
    if (w === 'a' && i + 1 < ws.length && !['or', 'and', 'please'].includes(ws[i + 1])) continue
    if (!found.includes(w)) found.push(w)
  }
  return found
}

/** The topics an English question covers on this board: ids like 'wings', and 'letter:a'. */
export function topicsIn(text, board) {
  const ws = words(text)
  const out = []
  for (const t of TOPICS[board] || []) {
    if ((t.keys || []).some((k) => hasPhrase(ws, k)) || t.test?.(ws)) out.push(t.id)
  }
  if (board === 'monsters') for (const l of lettersAsked(text)) out.push(`letter:${l}`)
  return out
}

// A small, fixed hash, so each game's shuffle is the same every time it is drawn.
function hash(s) {
  let h = 2166136261
  for (const c of s) h = Math.imul(h ^ c.codePointAt(0), 16777619)
  return h >>> 0
}

const normal = (q) => words(q).join(' ')

/**
 * Up to `count` ideas, as `{ q, topic }` in `lang` ('fr', else English): none
 * on a topic already covered, none that would not split the cards still up,
 * at most one per family. `asked` is every question so far (typed or tapped);
 * `topics` the topics of the ideas tapped so far; `cards` the cards still up,
 * with `label` (the name as shown). An empty list means the ideas ran dry.
 */
export function suggestions({ board, asked = [], topics = [], cards = [], game = 0, lang = 'en', count = 3 }) {
  const fr = lang === 'fr' ? 1 : 0
  const covered = new Set([...topics.filter(Boolean), ...asked.filter(Boolean).flatMap((q) => topicsIn(q, board))])
  const said = new Set(asked.filter(Boolean).map(normal))
  const ranked = [...(TOPICS[board] || [])].sort((a, b) => a.tier - b.tier || hash(`${game}:${a.id}`) - hash(`${game}:${b.id}`))

  const ideas = []
  for (const t of ranked) {
    if (covered.has(t.id)) continue
    const pair = t.make ? t.make(cards) : t.ask[hash(`${game}:${t.id}:pick`) % t.ask.length]
    if (pair) ideas.push({ family: t.family || t.id, q: pair[fr], topic: t.id })
  }
  if (board === 'monsters') {
    const l = bestLetter(cards.map((c) => c.label), (x) => covered.has(`letter:${x}`))
    if (l) {
      const L = l.toUpperCase()
      const q = fr ? `Le nom de ton monstre commence-t-il par ${L} ?` : `Does your monster's name start with ${L}?`
      // Tier 1: it slots in among the first ideas, at a place fixed per game.
      ideas.splice(hash(`${game}:letter`) % Math.min(ideas.length + 1, 6), 0, { family: 'letter', q, topic: `letter:${l}` })
    }
  }

  const families = new Set()
  const out = []
  for (const i of ideas) {
    if (out.length >= count) break
    if (families.has(i.family) || said.has(normal(i.q))) continue
    families.add(i.family)
    out.push({ q: i.q, topic: i.topic })
  }
  return out
}
