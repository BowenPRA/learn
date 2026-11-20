// "Fix it your way" (Upper Secondary English): the student types a new version of a
// faulty sentence, and this file decides whether it is right.
//
// There is no AI here. Only the join between two ideas is judged, with rules that are
// the lesson's own, so every wrong answer can be named:
//   a full stop      A. B.          (also A. However, B.)
//   a semicolon      A; B.          (also A; however, B.)
//   comma + FANBOYS  A, so B.
//   a subordinator   Because A, B.   or   B because A.   (comma after a first clause only)
// A correct sentence must never be marked wrong: a join word that is correct but weaker
// than the best one (`weak`, usually "and") is accepted with a note naming the better word.
//
// An item is { id, given, label, a, b, fanboys?, weak?, subs?, allow?, accept? } (a "join"),
// or { id, kind: 'exact', given, label, right, accept?, hint? } (a missing verb).
//   a, b      the two ideas, as they appear in `given`, with no end punctuation
//   fanboys   the joining words that fit the meaning with the ideas in this order, e.g. ['so'];
//             with the ideas swapped, "so" and "for" swap too ("A, so B" = "B, for A")
//   weak      joining words that are correct but say less, e.g. ['and']: right, with a note
//   subs      [{ w: 'because', dep: 'a' }]: the subordinator and which idea it makes dependent
//   allow     which of 'stop' 'semi' 'fanboys' 'sub' count (default all four)
//   holdHint  what to say when a correct sentence uses a fix that `allow` leaves out
//   accept    whole sentences that are also right though the checker cannot see why
//             (e.g. "The library opens at nine and closes at five.")
//   hint      (exact items) what to say when the answer is neither right nor a near miss
import { tidy } from '../writing/revision.js'
import { checkFix } from '../../src/utils/proofread.js'

export const FANBOYS = ['for', 'and', 'nor', 'but', 'or', 'yet', 'so']
// Longest first, so "even though" is found before "though".
const SUBORDINATORS = ['as soon as', 'even though', 'whenever', 'although', 'because', 'whereas', 'unless', 'before', 'though', 'until', 'since', 'while', 'after', 'once', 'when', 'if']
// Linking words that are not FANBOYS: right after a full stop or a semicolon, a splice after a
// comma alone. Each means what one FANBOYS word means, so it fits the same pairs of ideas.
const LINKERS = { however: 'but', therefore: 'so', thus: 'so', consequently: 'so', then: 'and', also: 'and', moreover: 'and', besides: 'and', meanwhile: 'and', instead: 'but', still: 'but', otherwise: 'or' }
// These take a comma after them at the start of a sentence or after a semicolon.
const COMMA_AFTER = ['however', 'therefore', 'thus', 'consequently', 'moreover', 'besides', 'meanwhile', 'instead', 'otherwise']
const FLIP = { so: 'for', for: 'so' }

const FIXES = ['stop', 'semi', 'fanboys', 'sub']
const NAMES = { stop: 'a full stop', semi: 'a semicolon', fanboys: 'a comma and a joining word', sub: 'a word like because or although' }

const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1)
const list = (words) => [...new Set(words)].map((w) => `"${w}"`).join(' or ')
const subWords = (item) => [...new Set((item.subs || []).map((s) => s.w))]

const right = (fix, word = '', note = '') => ({ ok: true, fix, word, note, hint: '' })
const wrong = (hint) => ({ ok: false, hint })

/** The FANBOYS words that fit, and the weaker ones, with the ideas in this order. */
function fitting(item, swapped) {
  const turn = (ws) => (ws || []).map((w) => (swapped ? FLIP[w] || w : w))
  return { best: turn(item.fanboys), weak: turn(item.weak) }
}

/**
 * Is `input` a correct new version of `item`? `{ ok, hint, fix?, word?, note? }`: when it is
 * right, `fix` says which of the four was used (and `note` may name a better word); when it is
 * not, `hint` says what is still wrong.
 */
export function checkRewrite(item, input) {
  if (item?.kind === 'exact') {
    const r = checkFix(input, { wrong: item.given, right: item.right, accept: item.accept })
    return !r.ok && item.hint && /^Not quite/.test(r.hint) ? wrong(item.hint) : r
  }

  const t = tidy(input)
  if (!t) return wrong('Type your new sentence.')
  if ((item.accept || []).map(tidy).includes(t)) return right('other')
  const allow = item.allow || FIXES
  const a = tidy(item.a)
  const b = tidy(item.b)
  const low = t.toLowerCase()
  const ia = low.indexOf(a.toLowerCase())
  const ib = low.indexOf(b.toLowerCase())
  if (ia < 0 || ib < 0) return wrong(`Keep the words of both ideas: "${a}" and "${b}". Change only what joins them.`)
  if (ia < ib + b.length && ib < ia + a.length) return wrong('Write each idea once.')

  const swapped = ib < ia
  const [first, second] = swapped ? [{ id: 'b', i: ib, s: b }, { id: 'a', i: ia, s: a }] : [{ id: 'a', i: ia, s: a }, { id: 'b', i: ib, s: b }]
  const pre = t.slice(0, first.i).trim()
  const between = t.slice(first.i + first.s.length, second.i).trim().replace(/\s+/g, ' ')
  const mid = between.toLowerCase()
  const post = t.slice(second.i + second.s.length).trim()

  if (post === '') return wrong('End your sentence with a full stop.')
  if (!/^[.!?]$/.test(post)) return wrong('Keep the words as they are. Change only what joins the two ideas.')

  const firstLetter = t.match(/[A-Za-z]/)?.[0]
  if (firstLetter && firstLetter !== firstLetter.toUpperCase()) return wrong('Start your sentence with a capital letter.')
  // An idea in the middle of a sentence starts with a small letter (unless it starts with "I").
  const midCapital = (idea) => {
    const word = t.slice(idea.i).match(/^[A-Za-z]+/)?.[0] || ''
    return word && word !== 'I' && word[0] !== word[0].toLowerCase()
      ? wrong(`"${word}" does not need a capital letter: it is in the middle of the sentence.`) : null
  }

  const { best, weak } = fitting(item, swapped)
  const tryWords = () => list([...best, ...subWords(item)])
  const meaning = (w) => wrong(`"${w}" does not fit the meaning of these two ideas. Try ${tryWords()}.`)
  const wants = (fix, word = '', note = '') => {
    if (!allow.includes(fix)) {
      return wrong(item.holdHint || `That is a correct sentence, but this one wants ${NAMES[allow[0]]}. Try again with ${subWords(item).length ? list(subWords(item)) : 'a joining word'}.`)
    }
    return right(fix, word, note)
  }
  // A FANBOYS word (or a linker that means the same) checked against the meaning. The better
  // word named for a weak one is never the old-fashioned "for": "because" says it plainly.
  const better = best.find((w) => w !== 'for') || subWords(item)[0] || best[0]
  const byMeaning = (w, as, then) => {
    if (best.includes(as)) return then()
    if (weak.includes(as)) return then(better ? `"${better}" would show how the two ideas link more clearly.` : '')
    return meaning(w)
  }
  // A subordinator that fits, put in front of the wrong idea, is named as such.
  const sub = (w, dep, fix) => {
    if ((item.subs || []).some((s) => s.w === w && s.dep === dep)) return fix()
    const other = (item.subs || []).find((s) => s.w === w)
    if (!other) return meaning(w)
    const clause = other.dep === 'a' ? a : b
    const lowered = /^I\b/.test(clause) ? clause : clause[0].toLowerCase() + clause.slice(1)
    return wrong(`"${w}" is the right word, but it goes in front of the other idea: "${w} ${lowered}".`)
  }

  // The sentence starts with one of the ideas.
  if (pre === '') {
    if (mid === '') return wrong('Nothing joins the two ideas. That is a run-on. Put a full stop, a semicolon or a joining word between them.')
    if (mid === ',') return wrong('A comma alone cannot join two ideas. That is a comma splice. Add a joining word after the comma, or use a full stop.')
    if (mid === '.') {
      if (/[a-z]/.test(t[second.i])) return wrong('Start the new sentence with a capital letter.')
      return wants('stop')
    }
    if (mid === ';') return midCapital(second) || wants('semi')

    // comma + FANBOYS ("and then" is the same join)
    const fan = mid.match(/^,\s?([a-z]+)(?: then)?$/)
    if (fan && FANBOYS.includes(fan[1])) return midCapital(second) || byMeaning(fan[1], fan[1], (note) => wants('fanboys', fan[1], note))
    // FANBOYS with no comma, or starting a new sentence
    const bare = mid.match(/^([a-z]+)$/)
    if (bare && FANBOYS.includes(bare[1])) return byMeaning(bare[1], bare[1], () => wrong(`Put a comma before "${bare[1]}".`))
    const opener = mid.match(/^\.\s?([a-z]+),?$/)
    if (opener && FANBOYS.includes(opener[1])) {
      return byMeaning(opener[1], opener[1], () => wrong(`Do not start a new sentence with "${cap(opener[1])}". Use a comma and "${opener[1]}" between the two ideas.`))
    }

    // a linking word: however, therefore, then ...
    const link = between.match(/^([.;,]?)\s?([A-Za-z]+)(,?)$/)
    const lw = link && link[2].toLowerCase()
    if (lw && LINKERS[lw]) {
      const [, punct, said, comma] = link
      if (punct === ',' || punct === '') {
        return wrong(`"${lw}" is not one of the seven joining words (for, and, nor, but, or, yet, so), so it cannot join two ideas with ${punct ? 'only a comma' : 'nothing before it'}. Put a semicolon before it ("; ${lw}${COMMA_AFTER.includes(lw) ? ',' : ''}") or a full stop.`)
      }
      return byMeaning(lw, LINKERS[lw], () => {
        if (punct === '.' && said[0] !== said[0].toUpperCase()) return wrong('Start the new sentence with a capital letter.')
        if (punct === ';' && said[0] !== said[0].toLowerCase()) return wrong(`After a semicolon the sentence goes on, so "${lw}" needs no capital letter.`)
        if (COMMA_AFTER.includes(lw) && !comma) return wrong(`Put a comma after "${said}".`)
        return midCapital(second) || wants(punct === '.' ? 'stop' : 'semi', said)
      })
    }

    // a subordinator in front of the second idea
    const later = mid.match(/^,?\s?([a-z ]+)$/)
    const word = later && SUBORDINATORS.find((s) => s === later[1])
    if (word) return midCapital(second) || sub(word, second.id, () => wants('sub', word))
    const stranded = mid.match(/^\.\s?([a-z ]+)$/)
    if (stranded && SUBORDINATORS.includes(stranded[1])) return wrong(`"${cap(stranded[1])} ..." cannot stand alone. That is a fragment. Join it to the sentence before it: take away the full stop.`)
    return wrong('Join the two ideas with a full stop, a semicolon, a comma and a joining word (so, and, but), or a word like because or although.')
  }

  // The sentence starts with a subordinator, so the first idea depends on the second.
  const lead = pre.toLowerCase()
  if (SUBORDINATORS.includes(lead)) {
    if (mid === '') return wrong(`An idea that starts with "${lead}" needs a comma after it, before the main idea.`)
    if (mid === '.') return wrong(`"${pre} ..." cannot stand alone. That is a fragment. Join it to the other idea with a comma.`)
    if (mid !== ',') return wrong(`Put a comma after the idea that starts with "${lead}", then the main idea.`)
    return midCapital(first) || midCapital(second) || sub(lead, first.id, () => wants('sub', lead))
  }
  if (FANBOYS.includes(lead) || LINKERS[lead]) return wrong(`Do not start the sentence with "${pre}". Start with one of the two ideas.`)
  return wrong('Keep the words of the two ideas. Add only the joining word.')
}

/** What a right answer used, in words, for the feedback line ('' when there is nothing to name). */
export const fixName = (result) => {
  if (!result?.ok) return ''
  if (result.fix === 'fanboys') return `a comma and "${result.word}"`
  if (result.fix === 'sub') return `"${result.word}"`
  if ((result.fix === 'stop' || result.fix === 'semi') && result.word) return `${NAMES[result.fix]} and "${result.word}"`
  return NAMES[result.fix] || ''
}

/** Problems with an item list (empty means clean): an item whose own answers fail its own checker. */
export function checkRewriteItems(items) {
  const problems = []
  const ids = new Set()
  ;(items || []).forEach((it, i) => {
    const at = `rewrite ${it?.id || `#${i + 1}`}`
    if (!it?.id) problems.push(`${at}: missing id`)
    else if (ids.has(it.id)) problems.push(`${at}: duplicate id`)
    ids.add(it?.id)
    if (!it?.given || !it?.label) problems.push(`${at}: needs given and label`)
    if (it?.kind === 'exact') {
      if (!it.right) problems.push(`${at}: needs right`)
      for (const s of [it.right, ...(it.accept || [])].filter(Boolean)) if (!checkRewrite(it, s).ok) problems.push(`${at}: "${s}" fails its own checker`)
    } else {
      if (!it?.a || !it?.b) problems.push(`${at}: needs a and b`)
      if (it?.given && it?.a && it?.b && !(it.given.includes(it.a) && it.given.includes(it.b))) problems.push(`${at}: a and b must be written as they are in given`)
      if (!it?.model) problems.push(`${at}: needs a model answer`)
      for (const s of [it?.model, it?.also].filter(Boolean)) {
        const r = checkRewrite(it, s)
        if (!r.ok) problems.push(`${at}: "${s}" fails its own checker: ${r.hint}`)
        else if (r.note) problems.push(`${at}: "${s}" is only a weak answer`)
      }
      if (it?.given && checkRewrite(it, it.given).ok) problems.push(`${at}: the faulty sentence passes`)
    }
  })
  return problems
}
