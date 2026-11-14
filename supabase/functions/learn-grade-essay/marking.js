// The rules around the AI marker for PRA Learn's timed writing, in plain JavaScript so
// the Edge Function (index.ts) and the site's demo marker (src/lib/essays.js) use the
// same ones. Brought over from the Dashboard's gradeEssay (Y8Science-Backend), with the
// GED rubric replaced by a general English one (13 November 2026).
//
// A model told to be strict is strict on average and generous on exactly the essays
// that need it: the short ones and the copied ones. So the counts are made here, shown
// to the model, and the caps are applied again here after it has scored.
//
// Three parts, 0-4 each, 12 in all:
//   ideas         answers the task, with a clear main point and specific detail
//   organisation  paragraphs, order, a beginning, middle and end, linking words
//   language      sentences, grammar, spelling and punctuation

export const TRAIT_MAX = 4
export const TOTAL_MAX = 12
export const TRAIT_KEYS = ['ideas', 'organisation', 'language']

export const NON_SCORABLE_WORDS = 50
export const COPIED = 0.5            // this share copied from the task: not marked
export const PART_COPIED = 0.25      // this share: ideas at most 2
export const CLASSMATE_MATCH = 0.3   // this share matching one classmate: flagged for the teacher
export const MAX_REVISIONS = 15

export const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean)

/** Paragraphs, counting a single line break as one (students rarely leave a blank line). */
export const paragraphCount = (s) =>
  String(s || '').split(/\n\s*\n|\n/).map((p) => p.trim()).filter((p) => p.length > 30).length

const normalise = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

/** The share of `text` found word for word in `haystack`, in 8-word windows. */
export function sharedShare(text, haystack) {
  const w = normalise(text).split(' ').filter(Boolean)
  if (w.length < 8) return 0
  const hay = normalise(haystack)
  if (!hay) return 0
  let hit = 0
  for (let i = 0; i + 8 <= w.length; i++) if (hay.includes(w.slice(i, i + 8).join(' '))) hit++
  return hit / (w.length - 7)
}

/** The highest share of the essay matching any one classmate's essay on the same task. */
export function classmateMatch(text, others = []) {
  let best = 0
  for (const o of others) best = Math.max(best, sharedShare(text, o))
  return best
}

/** The exact characters of `haystack` that a model's quote points at, or null. */
export function findVerbatim(haystack, needle) {
  const q = String(needle || '').trim()
  if (q.length < 2) return null
  if (haystack.includes(q)) return q
  const i = haystack.toLowerCase().indexOf(q.toLowerCase())
  if (i !== -1) return haystack.slice(i, i + q.length)
  const parts = q.split(/\s+/).filter(Boolean).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (parts.length < 2) return null
  const m = haystack.match(new RegExp(parts.join('\\s+'), 'i'))
  return m ? m[0] : null
}

/** The model's corrections, kept only when they can be found and applied on the page. */
export function usableRevisions(raw, text) {
  const seen = new Set()
  const out = []
  for (const r of Array.isArray(raw) ? raw : []) {
    const quote = findVerbatim(text, r?.quote)
    if (!quote) continue
    const correction = String(r?.correction || '').trim()
    if (!correction || correction === quote) continue
    const key = quote.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push({
      quote, correction,
      kind: String(r?.kind || '').trim() || 'Correction',
      why: String(r?.why || '').trim(),
      rule: String(r?.rule || '').trim(),
      focus: Boolean(r?.focus),
    })
    if (out.length >= MAX_REVISIONS) break
  }
  return out.sort((a, b) => text.indexOf(a.quote) - text.indexOf(b.quote))
}

const clamp = (v, max = TRAIT_MAX) => {
  const n = Math.round(Number(v))
  return Number.isFinite(n) ? Math.max(0, Math.min(max, n)) : 0
}

/**
 * What the code measures before the model reads the essay. `prompt` is the task as
 * saved with the essay ({ task, guidelines, minWords, paragraphs }).
 */
export function measure(text, prompt = {}, classmates = []) {
  const wordCount = words(text).length
  const paragraphs = Math.max(1, paragraphCount(text))
  const copied = sharedShare(text, [prompt.task, ...(prompt.guidelines || [])].join(' '))
  const matched = classmateMatch(text, classmates)
  return { wordCount, paragraphs, copied, matched }
}

/**
 * The model's answer made into the saved report: scores clamped, the caps applied,
 * the revisions checked against the text. `ai` has ideas, organisation, language,
 * the three feedback lines, nextStep, focusNote and revisions.
 */
export function buildReport(ai, text, prompt = {}, counts = measure(text, prompt)) {
  const { wordCount, paragraphs, copied, matched } = counts
  const minWords = Number(prompt.minWords) || 150
  const wantParas = Number(prompt.paragraphs) || 1
  const traits = { ideas: clamp(ai?.ideas), organisation: clamp(ai?.organisation), language: clamp(ai?.language) }
  const revisions = usableRevisions(ai?.revisions, String(text || ''))
  const density = wordCount ? (revisions.length / wordCount) * 100 : 0
  const notes = []
  const cap = (key, max, why) => { if (traits[key] > max) { traits[key] = max; notes.push(why) } }

  if (wordCount < minWords) {
    cap('ideas', 2, `Ideas is at most 2: ${wordCount} words is less than the ${minWords} this task asks for.`)
    cap('organisation', 2, `Organisation is at most 2: there is not enough writing to show a clear beginning, middle and end.`)
  }
  if (paragraphs < wantParas) {
    cap('organisation', 2, `Organisation is at most 2: this task asks for ${wantParas} paragraphs and there ${paragraphs === 1 ? 'is 1' : `are ${paragraphs}`}.`)
  }
  if (density >= 6) cap('language', 1, `Language is at most 1: ${revisions.length} mistakes in ${wordCount} words.`)
  else if (density >= 3 || revisions.length >= 10) cap('language', 2, `Language is at most 2: ${revisions.length} mistakes in ${wordCount} words is enough for a reader to notice.`)
  if (copied >= PART_COPIED && copied < COPIED) {
    cap('ideas', 2, `Ideas is at most 2: about ${Math.round(copied * 100)}% of this is copied from the task. Marks are for your own words.`)
  }

  let notMarked = ''
  if (wordCount < NON_SCORABLE_WORDS) notMarked = `${wordCount} words is too short to mark. Write at least ${NON_SCORABLE_WORDS}.`
  else if (copied >= COPIED) notMarked = `About ${Math.round(copied * 100)}% of this is copied from the task, so it cannot be marked.`
  else if (ai?.offTopic) notMarked = 'This does not answer the task, so it cannot be marked.'
  if (notMarked) TRAIT_KEYS.forEach((k) => { traits[k] = 0 })

  const focusCount = revisions.filter((r) => r.focus).length
  return {
    version: 1,
    traits,
    total: traits.ideas + traits.organisation + traits.language,
    feedback: {
      ideas: String(ai?.ideasFeedback || '').trim(),
      organisation: String(ai?.organisationFeedback || '').trim(),
      language: String(ai?.languageFeedback || '').trim(),
    },
    nextStep: String(ai?.nextStep || '').trim(),
    focus: prompt.focus ? { label: prompt.focus.label || '', count: focusCount, note: String(ai?.focusNote || '').trim() } : null,
    strengths: (Array.isArray(ai?.strengths) ? ai.strengths : []).map((s) => String(s || '').trim()).filter(Boolean).slice(0, 3),
    revisions,
    wordCount, paragraphs,
    copied: Math.round(copied * 100) / 100,
    classmateMatch: Math.round(matched * 100) / 100,
    scoreNotes: notes,
    notMarked,
    harmful: Boolean(ai?.harmful),
  }
}

/** The task's XP share (0..1) from a marked essay and its revision: 8 parts for the mark, 2 for fixing the mistakes. */
export function essayScore(report, revision) {
  if (!report) return 0
  const mark = (report.total / TOTAL_MAX) * 0.8
  let fix = 0
  if (!report.notMarked) {
    const total = revision?.total ?? null
    const fixed = revision?.fixed ?? 0
    if (revision && (total === 0 || fixed >= total)) fix = 0.2
    else if (revision && fixed >= Math.ceil(total / 2)) fix = 0.1
  }
  return Math.max(0, Math.min(1, mark + fix))
}
