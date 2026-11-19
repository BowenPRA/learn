// content/games/G06_guess-the-teacher/match.js
// Whether a typed guess names the teacher. Forgiving, because a parent is
// typing a name they may only have heard: capitals, accents (Hiền = Hien),
// punctuation and a title (Mr, Ms, Mrs, Miss, Teacher, Thầy, Cô) never matter,
// and a small typo still counts (one letter in a name of four to seven letters,
// two in a longer one; a swapped pair of letters counts as one).
//
// A guess that names two teachers ("Seth Bowen") is wrong, so typing every name
// at once never pays.

const TITLES = new Set(['mr', 'mrs', 'ms', 'miss', 'mister', 'sir', 'madam', 'teacher', 'thay', 'co', 'dr'])

/** The words of `text`, lower case, without accents, punctuation or titles. */
export function words(text) {
  const all = String(text || '')
    .replace(/[đĐ]/g, 'd')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
  const kept = all.filter((w) => !TITLES.has(w))
  return kept.length ? kept : all
}

// Optimal string alignment distance: insert, delete, change, or swap two
// neighbouring letters, each costing one.
function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
    }
  }
  return d[a.length][b.length]
}

const allowed = (len) => (len <= 3 ? 0 : len <= 7 ? 1 : 2)

/** The spellings that name `teacher`: its name and every `also`, as words. */
export function keysOf(teacher) {
  return [teacher.name, ...(teacher.also || [])].map((n) => words(n).join(' ')).filter(Boolean)
}

/** Whether `text` names one of `keys`: the whole guess, the words run together, or one word of a short guess. */
function names(text, keys) {
  const w = words(text)
  if (!w.length) return false
  const tries = [w.join(' '), w.join('')]
  if (w.length <= 3) tries.push(...w)
  return keys.some((k) => tries.some((t) => distance(t, k) <= allowed(k.length)))
}

/**
 * Judge a guess against the round's teacher. `teachers` is every named
 * teacher in the game; `answer` an index into it. Returns { ok, other }:
 * `other` is the one other teacher the guess named, if it named exactly one
 * (for "3 teams said Mr. Seth" at the reveal).
 */
export function judge(text, answer, teachers) {
  const hit = []
  teachers.forEach((t, i) => { if (t.name && names(text, keysOf(t))) hit.push(i) })
  const ok = hit.length === 1 && hit[0] === answer
  return { ok, other: !ok && hit.length === 1 ? hit[0] : null }
}
