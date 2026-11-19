// content/games/G06_guess-the-teacher/words.js
// Team names that are not OK on a TV at a family event: swearing, sexual
// words and slurs, in English and Vietnamese. The phone will not join with
// one (phone.jsx), and the TV refuses one even if a phone gets round that
// (widgets.jsx). Guesses are never shown to anyone else, so they are not
// checked.
//
// It looks through the usual disguises: capitals, accents typed or not,
// numbers and symbols for letters (sh1t, $hit, @ss), repeated letters
// (fuuuck), letters spaced out (f u c k, f.u.c.k) and words run together
// (fuckface). It is careful the other way too: Peacock, Class 3B, Titan,
// Grape, "Minh lớn", "Đĩa bay", "Các bạn" and "Buổi sáng" are fine. Short
// words and Vietnamese syllables that mean something innocent without their
// accents only count as whole words, or only with their accents.
//
// To ban another word, add it to the list that matches how it should be found.

// Found anywhere inside a word, with accents stripped and look-alikes undone.
// Only words that never turn up inside an innocent one.
const ROOTS = [
  'fuck', 'fuk', 'fck', 'fvck', 'phuck', 'shit', 'bitch', 'biatch', 'cunt', 'nigg', 'faggot', 'whore', 'slut', 'wank',
  'bastard', 'dickhead', 'motherf', 'pussy', 'porn', 'penis', 'vagina', 'boob', 'dildo', 'horny', 'retard', 'twat',
  'bollock', 'jizz', 'rapist', 'asshole', 'arsehole', 'cocksuck', 'dumbass', 'jackass', 'skank', 'blowjob', 'handjob',
]

// Whole words only, accents stripped and look-alikes undone: in English, and
// Vietnamese chat shorthand typed without accents.
const WORDS = [
  'ass', 'arse', 'asses', 'cum', 'tit', 'tits', 'titty', 'titties', 'cock', 'cocks', 'dick', 'dicks', 'piss', 'crap', 'damn',
  'sex', 'sexy', 'nude', 'naked', 'rape', 'hoe', 'hoes', 'thot', 'wtf', 'stfu', 'gtfo', 'kys', 'milf', 'xxx', 'nazi', 'hitler',
  'kkk', 'prick', 'perv', 'pervert', 'anus', 'anal', 'butthole', 'fag', 'fags', 'negro', 'chink', 'gook', 'spic', 'kike', 'coon',
  'dm', 'dmm', 'dcm', 'dkm', 'dcmm', 'vcl', 'vkl', 'vl', 'vcc', 'vclm', 'cl', 'clm', 'cmm', 'cc', 'loz', 'lozz', 'djt', 'dit', 'ditme',
]

// Whole words, with their Vietnamese accents. Without accents these spell
// everyday words (lớn, các, buổi, đeo, đi, đĩa, cắt), so only the accented
// spelling counts. The first five are found inside a run-together word too.
const VI_ROOTS = ['địt', 'lồn', 'cặc', 'buồi', 'đéo']
const VI_WORDS = ['đụ', 'đĩ', 'cứt', 'đù']

// Phrases: Vietnamese with accents, and both languages without.
const VI_PHRASES = [
  'địt mẹ', 'đụ má', 'đụ mẹ', 'đù má', 'chó đẻ', 'đồ chó', 'óc chó', 'thằng chó', 'con đĩ', 'mẹ mày', 'bố mày',
  'đồ ngu', 'thằng ngu', 'con ngu', 'óc lợn', 'vãi lồn',
]
const PHRASES = ['dit me', 'dit con me', 'du ma', 'du me', 'dit cu', 'kill yourself', 'go die', 'son of a b']

// Numbers and symbols people use for letters.
const LOOKALIKE = { 0: 'o', 1: 'i', 3: 'e', 4: 'a', 5: 's', 7: 't', 8: 'b', '@': 'a', $: 's', '!': 'i', '|': 'i', '+': 't', '€': 'e' }

/** Lower case, one form of each accented letter, and anything that is not a letter or digit as a space. */
function accented(text) {
  return String(text || '').normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
}

/** As `accented`, then no accents (đ = d), and look-alike numbers and symbols turned back into letters. */
function plain(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[0134578@$!|+€]/g, (c) => LOOKALIKE[c])
    .replace(/[đĐ]/g, 'd')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/** Letters typed one at a time, joined up: "f u c k" and "f.u.c.k" give "fuck". */
function runs(words) {
  const out = []
  let run = ''
  for (const w of [...words, '']) {
    if (w.length === 1) run += w
    else {
      if (run.length > 1) out.push(run)
      run = ''
    }
  }
  return out
}

/** A word as typed, with every run of a repeated letter cut to one, and to two (fuuuck: fuck; asss: ass). */
const spellings = (w) => [w, w.replace(/(.)\1+/g, '$1'), w.replace(/(.)\1{2,}/g, '$1$1')]

const hasPhrase = (text, list) => list.some((p) => ` ${text} `.includes(` ${p} `))
const hasRoot = (s) => ROOTS.some((r) => s.includes(r))

/** Whether a team name is not OK to show on the TV. */
export function isRude(text) {
  const a = accented(text)
  const p = plain(text)
  const aWords = a ? a.split(' ') : []
  const pWords = p ? p.split(' ') : []
  if (aWords.some((w) => VI_WORDS.includes(w) || VI_ROOTS.some((r) => w.includes(r)))) return true
  if (hasPhrase(a, VI_PHRASES) || hasPhrase(p, PHRASES)) return true
  if (pWords.some((w) => spellings(w).some((s) => WORDS.includes(s) || hasRoot(s)))) return true
  // Spelled out a letter at a time. Only the longer words count here, so a
  // pair of initials ("C & L", "D M") stays fine.
  return runs(pWords).some((w) => spellings(w).some((s) => hasRoot(s) || (s.length >= 4 && WORDS.includes(s))))
}
