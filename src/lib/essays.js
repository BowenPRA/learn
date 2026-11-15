// A student's timed writing, kept attempt by attempt (supabase/learn-essays.sql).
//
//   essay = { id, unitKey, taskId, classKey, promptId, prompt, status, body, plan,
//             minutesAllowed, secondsUsed, wordCount, flags, report, score, revision,
//             teacherScore, teacherNote, teacherBy, teacherAt, startedAt, submittedAt,
//             markedAt, error }
//
// status: draft (being written), submitted (waiting for the marker), marked, error.
// The live site saves through learn_essay_save / learn_essay_revise and is marked by the
// learn-grade-essay Edge Function, which writes the mark itself. Demo mode keeps essays
// in this browser and marks them with demoMark() below: a stand-in that finds a few
// common mistakes by rule, so the whole flow can be tried without the AI.
import { DEMO } from './api.js'
import { supabase } from './supabase.js'
import { buildReport, measure, usableRevisions, words } from '../../supabase/functions/learn-grade-essay/marking.js'

const DEMO_KEY = 'learn-demo-essays'

const fromRow = (r) => r && ({
  id: r.id, studentId: r.student_id, unitKey: r.unit_key, taskId: r.task_id, classKey: r.class_key, promptId: r.prompt_id,
  prompt: r.prompt || {}, status: r.status, body: r.body || '', plan: r.plan || null,
  minutesAllowed: r.minutes_allowed, secondsUsed: r.seconds_used, wordCount: r.word_count || 0, flags: r.flags || {},
  report: r.report || null, score: r.score, revision: r.revision || null,
  teacherScore: r.teacher_score, teacherNote: r.teacher_note || '', teacherBy: r.teacher_by || '', teacherAt: r.teacher_at,
  startedAt: r.started_at, submittedAt: r.submitted_at, markedAt: r.marked_at, error: r.error || '',
})

/** The mark that counts: the teacher's when they gave one, else the marker's. */
export const markOf = (e) => (e?.teacherScore ?? e?.score ?? null)

export const newEssayId = () => (globalThis.crypto?.randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => ((Math.random() * 16) | 0).toString(16)))

/* ---- demo mode --------------------------------------------------------- */

const readDemo = () => { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || 'null') } catch { return null } }
const writeDemo = (list) => { try { localStorage.setItem(DEMO_KEY, JSON.stringify(list)) } catch { /* private window */ } }

const daysAgo = (n, h = 10) => { const d = new Date(Date.now() - n * 86400000); d.setHours(h, 0, 0, 0); return d.toISOString() }

// Three earlier essays, so My Writing has a history to show in the demo.
function demoSeed() {
  const prompt = (id, title, task) => ({
    id, title, task, type: 'narrative', minWords: 150, paragraphs: 3,
    focus: { label: 'Complete sentences', look: 'fragments, run-on sentences and comma splices' },
    guidelines: ['Tell what happened in order.', 'Write three paragraphs.'],
  })
  const seed = [
    { n: 21, id: 'u1w1', title: 'A day that went wrong', score: [2, 1, 1], body: 'Last year I go to the beach with my family, we was very happy. Because the sun was hot. My brother lost his shoe in the water, he cry a lot.\nWe look for it for one hour. Then my father find it.' },
    { n: 12, id: 'u1w2', title: 'Someone who helped me', score: [2, 2, 2], body: 'My grandmother help me learn to cook. Every Sunday she show me one new dish, I watched her hands carefully.\nThe first time I made soup it was too salty. She laughed, she said I will do better next time.\nNow I can cook for my family. Because of her I love cooking.' },
    { n: 4, id: 'u1w3', title: 'My first time', score: [3, 3, 2], body: 'Last year my uncle taught me to ride his motorbike on a quiet road near the river. I was nervous because the bike was heavy and loud.\nAt first I pressed the brake too hard and nearly fell. My uncle laughed, he told me to look ahead and not at my hands. After an hour I could ride slowly to the end of the road and back.\nNow I feel proud when I ride with my family. That day taught me that being scared is part of learning something new.' },
  ]
  const kinds = [['Comma splice', 'Join two sentences with a full stop, not a comma.'], ['Verb tense', 'Tell a past story in the past tense.'], ['Fragment', 'A because-clause cannot stand alone.']]
  return seed.map((s) => {
    const report = {
      version: 1, traits: { ideas: s.score[0], organisation: s.score[1], language: s.score[2] },
      total: s.score[0] + s.score[1] + s.score[2],
      feedback: { ideas: 'You answer the task with one clear event.', organisation: 'Your paragraphs follow the order of events.', language: 'Watch for commas that join two sentences.' },
      nextStep: 'End each sentence with a full stop before you start the next idea.',
      focus: { label: 'Complete sentences', count: 2, note: 'Two comma splices are left to fix.' },
      strengths: ['A clear opening line'],
      revisions: kinds.slice(0, 3 - s.score[2] + 1).map(([kind, rule]) => ({ quote: '', correction: '', kind, why: '', rule, focus: kind !== 'Verb tense' })),
      wordCount: words(s.body).length, paragraphs: s.body.split('\n').length, copied: 0, classmateMatch: 0, scoreNotes: [], notMarked: '', harmful: false,
    }
    return {
      id: `demo-essay-${s.id}`, unitKey: 'UPPER_ENG/U01', taskId: 'writing', classKey: 'english:Upper Secondary', promptId: s.id,
      prompt: prompt(s.id, s.title, `Write about ${s.title.toLowerCase()}.`), status: 'marked', body: s.body, plan: null,
      minutesAllowed: 30, secondsUsed: 1500 + s.n * 10, wordCount: report.wordCount, flags: { tabAways: s.n === 21 ? 2 : 0, pasteTries: 0 },
      report, score: report.total, revision: { fixed: 2, total: 3 },
      teacherScore: null, teacherNote: s.n === 4 ? 'Good detail about the heavy, loud bike. Now fix that last comma splice.' : '', teacherBy: s.n === 4 ? 'Mr. Bowen' : '', teacherAt: s.n === 4 ? daysAgo(3) : null,
      startedAt: daysAgo(s.n), submittedAt: daysAgo(s.n, 11), markedAt: daysAgo(s.n, 11), error: '', demoSample: true,
    }
  })
}

function demoList() {
  let list = readDemo()
  if (!list) { list = demoSeed(); writeDemo(list) }
  return list
}

// The stand-in marker's rules: each finds one kind of mistake and says how to fix it.
const RULES = [
  { re: /,\s(I|we|he|she|they|it|my \w+|the \w+)\s(was|were|went|had|felt|saw|could|did|said|is|are|have|go|like|love)\b/g, kind: 'Comma splice', focus: true,
    fix: (m, who, verb) => `. ${who.charAt(0).toUpperCase()}${who.slice(1)} ${verb}`, why: 'A comma cannot join two full sentences.', rule: 'Two sentences: use a full stop.' },
  { re: /(^|[.!?]\s+)(Because [^.!?]{3,60}[.!?])/g, kind: 'Fragment', focus: true,
    fix: (m, lead, frag) => `${lead}${frag}`, skip: true, why: 'A because-clause cannot stand alone as a sentence.', rule: 'Join because-clauses to a full sentence.' },
  { re: /\bi\b/g, kind: 'Capital letter', fix: () => 'I', why: 'The word I is always a capital letter.', rule: 'Always write I as a capital.' },
  { re: /\balot\b/gi, kind: 'Spelling', fix: () => 'a lot', why: 'A lot is two words.', rule: 'A lot is two words.' },
  { re: /\b(dont|cant|wont|didnt|isnt)\b/gi, kind: 'Apostrophe', fix: (m) => ({ dont: "don't", cant: "can't", wont: "won't", didnt: "didn't", isnt: "isn't" }[m.toLowerCase()]), why: 'A short form needs an apostrophe.', rule: "Short forms take an apostrophe: don't." },
  { re: /\b(we|they|you) was\b/gi, kind: 'Subject-verb agreement', fix: (m, who) => `${who} were`, why: 'We, they and you take were.', rule: 'We, they, you + were.' },
]

/** A stand-in for the AI marker in demo mode: rule-found mistakes and marks from length and paragraphs. */
export function demoMark(text, prompt = {}) {
  const raw = []
  for (const r of RULES) {
    if (r.skip) continue
    for (const m of text.matchAll(r.re)) {
      const start = Math.max(0, text.lastIndexOf(' ', Math.max(0, m.index - 2)) + 1)
      const quote = text.slice(start, m.index + m[0].length)
      const correction = text.slice(start, m.index) + r.fix(...m)
      raw.push({ quote, correction, kind: r.kind, why: r.why, rule: r.rule, focus: !!r.focus })
    }
  }
  const counts = measure(text, prompt)
  const { wordCount, paragraphs } = counts
  const found = usableRevisions(raw, text).length
  const min = Number(prompt.minWords) || 150
  const ideas = wordCount >= min * 1.5 ? 4 : wordCount >= min ? 3 : 2
  const organisation = paragraphs >= (prompt.paragraphs || 1) + 1 ? 4 : paragraphs >= (prompt.paragraphs || 1) ? 3 : 2
  const language = Math.max(1, 4 - Math.floor(found / 2))
  const ai = {
    ideas, organisation, language, revisions: raw,
    strengths: [words(text).slice(0, 6).join(' ') + '…'],
    ideasFeedback: ideas >= 3 ? 'You answer the task with real detail.' : 'Add more specific detail: names, places, what you saw and felt.',
    organisationFeedback: organisation >= 3 ? 'Your paragraphs are in a clear order.' : `Use ${prompt.paragraphs || 3} paragraphs: a beginning, a middle and an end.`,
    languageFeedback: found ? `There ${found === 1 ? 'is 1 mistake' : `are ${found} mistakes`} to fix; look at the list below.` : 'Your sentences are complete and correct.',
    focusNote: raw.some((r) => r.focus) ? 'Some sentences are still joined with a comma.' : 'Every sentence ends where it should.',
    nextStep: found ? 'Read each sentence alone: if it is two sentences, use a full stop.' : 'Try joining some short sentences with because, when or although.',
  }
  return buildReport(ai, text, prompt, counts)
}

/* ---- reading ----------------------------------------------------------- */

/** Every essay of the signed-in student, newest first (drafts included). */
export async function myEssays() {
  if (DEMO) return demoList().slice().sort((a, b) => String(b.startedAt).localeCompare(String(a.startedAt)))
  const { data, error } = await supabase.from('learn_essays').select('*').order('started_at', { ascending: false }).limit(300)
  if (error) throw notReady(error)
  return (data || []).map(fromRow)
}

/** One essay by id. */
export async function getEssay(id) {
  if (DEMO) return demoList().find((e) => e.id === id) || null
  const { data, error } = await supabase.from('learn_essays').select('*').eq('id', id).maybeSingle()
  if (error) throw notReady(error)
  return fromRow(data)
}

const notReady = (e) => Object.assign(new Error('Writing is not set up on the live site yet, so it cannot be saved.'), { cause: e, code: 'essays' })

/* ---- writing ----------------------------------------------------------- */

/**
 * Start, save or hand in an essay. `e` carries id, unitKey, taskId, classKey, promptId,
 * prompt, minutesAllowed, body, plan, flags; `submit` hands it in. Returns the essay as
 * saved; the server may have handed it in itself if time had run out.
 */
export async function saveEssay(e, { submit = false } = {}) {
  if (DEMO) {
    const list = demoList()
    const i = list.findIndex((x) => x.id === e.id)
    const now = new Date().toISOString()
    const prev = i >= 0 ? list[i] : { startedAt: now, status: 'draft', flags: {} }
    if (prev.status !== 'draft') return prev
    const next = {
      ...prev, ...e, flags: { ...prev.flags, ...(e.flags || {}) }, wordCount: words(e.body).length, status: submit ? 'submitted' : 'draft',
      ...(submit ? { submittedAt: now, secondsUsed: Math.min(e.minutesAllowed * 60, Math.round((Date.now() - Date.parse(prev.startedAt)) / 1000)) } : {}),
    }
    if (i >= 0) list[i] = next; else list.push(next)
    writeDemo(list)
    return next
  }
  const { data, error } = await supabase.rpc('learn_essay_save', {
    p_id: e.id, p_unit: e.unitKey, p_task: e.taskId, p_class: e.classKey, p_prompt_id: e.promptId, p_prompt: e.prompt,
    p_minutes: e.minutesAllowed, p_body: e.body || '', p_plan: e.plan || null, p_flags: e.flags || {}, p_submit: !!submit,
  })
  if (error) throw notReady(error)
  return fromRow(data)
}

/** Have a handed-in essay marked. Returns the marked essay, or throws with the marker's reason. */
export async function markEssay(id) {
  if (DEMO) {
    await new Promise((r) => setTimeout(r, 1800))
    const list = demoList()
    const i = list.findIndex((x) => x.id === id)
    if (i < 0) throw new Error('No such essay.')
    const report = demoMark(list[i].body, list[i].prompt)
    list[i] = { ...list[i], status: 'marked', report, score: report.total, markedAt: new Date().toISOString() }
    writeDemo(list)
    return list[i]
  }
  const { data, error } = await supabase.functions.invoke('learn-grade-essay', { body: { essay_id: id } })
  if (error) {
    let message = 'The marker is not working right now. Your writing is saved; try again soon.'
    try { const b = await error.context?.json?.(); if (b?.error) message = b.error } catch { /* keep the plain message */ }
    throw new Error(message)
  }
  return fromRow(data)
}

/** Save the student's corrections: { fixed, total, revisedText }. */
export async function saveRevision(id, revision) {
  if (DEMO) {
    const list = demoList()
    const i = list.findIndex((x) => x.id === id)
    if (i >= 0) { list[i] = { ...list[i], revision }; writeDemo(list) }
    return list[i]
  }
  const { data, error } = await supabase.rpc('learn_essay_revise', { p_id: id, p_revision: revision })
  if (error) throw notReady(error)
  return fromRow(data)
}

/* ---- for staff ---------------------------------------------------------- */

// A made-up class's writing for the demo: two Unit 1 prompts, built from a few stock
// paragraphs with each student's own slips, marked by the demo marker. The same every time.
const DEMO_CLASS_KEY = 'learn-demo-class-essays'
const STOCK = {
  u1w1: ['A day that went wrong', [
    'Last month i went to the night market with my cousin, we wanted to buy new shoes.',
    'It started to rain very hard. Because we forgot our umbrella. We ran into a small shop and waited for an hour.',
    'The shop owner gave us hot tea, she was very kind. In the end the rain stopped and we found the shoes. I learned that a bad day can still end well.',
  ]],
  u1w2: ['Someone who helped me', [
    'My English teacher helped me when I was afraid to speak in class.',
    'Every day she asked me one easy question, I answered quietly. She never laughed at my mistakes, she smiled and helped me fix them.',
    'Now I can speak in front of the whole class. I dont feel scared anymore. I will always remember her because she believed in me.',
  ]],
}
const SLIPS = [(t) => t, (t) => t.replace(/\. I /g, ', I '), (t) => t.replace(/were/g, 'was'), (t) => t.replace(/a lot/g, 'alot'), (t) => t + ' We was tired but happy.']

function demoClassEssays(classKey, students) {
  try { const kept = JSON.parse(localStorage.getItem(DEMO_CLASS_KEY) || 'null'); if (kept?.classKey === classKey) return kept.list } catch { /* make it again */ }
  const list = []
  students.forEach((st, i) => {
    if (st.id === 'demo-s-A') return
    Object.entries(STOCK).forEach(([pid, [title, paras]], k) => {
      if ((i + k) % 5 === 4) return
      const body = paras.map((para, n) => (n === 2 && i === 7 && k === 0 ? '' : SLIPS[(i + n + k) % SLIPS.length](para))).filter(Boolean).join('\n')
      const prompt = { id: pid, title, task: `Write about ${title.toLowerCase()}.`, type: 'narrative', minWords: 150, paragraphs: 3, focus: { label: 'Complete sentences', look: 'fragments, run-on sentences and comma splices' } }
      const report = demoMark(body, prompt)
      if (i === 3 && k === 0) report.classmateMatch = 0.42
      const at = daysAgo(9 - k * 5 + (i % 3), 9 + (i % 4))
      list.push({
        id: `demo-ce-${st.id}-${pid}`, studentId: st.id, unitKey: 'UPPER_ENG/U01', taskId: 'writing', classKey, promptId: pid, prompt,
        status: 'marked', body, plan: null, minutesAllowed: 30, secondsUsed: 1100 + ((i * 97 + k * 31) % 700), wordCount: report.wordCount,
        flags: { tabAways: (i * 7 + k) % 6 === 0 ? 3 : (i + k) % 4 === 0 ? 1 : 0, pasteTries: i === 5 && k === 1 ? 2 : 0, bigInserts: 0, timedOut: (i + k) % 7 === 0 },
        report, score: report.total, revision: (i + k) % 3 ? { fixed: report.revisions.length, total: report.revisions.length } : null,
        teacherScore: null, teacherNote: '', teacherBy: '', teacherAt: null, startedAt: at, submittedAt: at, markedAt: at, error: '',
      })
    })
  })
  try { localStorage.setItem(DEMO_CLASS_KEY, JSON.stringify({ classKey, list })) } catch { /* private window */ }
  return list
}

/**
 * A class's writing, for staff: every essay handed in (drafts left out), newest first.
 * `students` is the class page's list; in demo mode it is used to make the class up,
 * with the demo student's own essays in it.
 */
export async function classEssays(classKey, students = []) {
  if (DEMO) {
    const mine = demoList().filter((e) => e.classKey === classKey).map((e) => ({ ...e, studentId: 'demo-s-A' }))
    return [...demoClassEssays(classKey, students), ...mine]
      .filter((e) => e.status !== 'draft')
      .sort((a, b) => String(b.submittedAt || b.startedAt).localeCompare(String(a.submittedAt || a.startedAt)))
  }
  const { data, error } = await supabase.from('learn_essays').select('*').eq('class_key', classKey).neq('status', 'draft').order('submitted_at', { ascending: false }).limit(2000)
  if (error) throw notReady(error)
  return (data || []).map(fromRow)
}

/** A teacher's own mark (0-12, or null to use the marker's) and note on an essay. Returns the essay. */
export async function noteEssay(id, { score = null, note = '', by = '' } = {}) {
  const patch = { teacherScore: score == null || score === '' ? null : Number(score), teacherNote: String(note || '').trim(), teacherBy: by, teacherAt: new Date().toISOString() }
  if (DEMO) {
    for (const key of [DEMO_KEY, DEMO_CLASS_KEY]) {
      let kept
      try { kept = JSON.parse(localStorage.getItem(key) || 'null') } catch { kept = null }
      const list = key === DEMO_KEY ? kept : kept?.list
      const i = (list || []).findIndex((e) => e.id === id)
      if (i < 0) continue
      list[i] = { ...list[i], ...patch }
      try { localStorage.setItem(key, JSON.stringify(key === DEMO_KEY ? list : { ...kept, list })) } catch { /* private window */ }
      return list[i]
    }
    throw new Error('No such essay.')
  }
  const { data, error } = await supabase.rpc('learn_essay_note', { p_id: id, p_score: patch.teacherScore, p_note: patch.teacherNote })
  if (error) throw Object.assign(new Error(error.message || 'The note could not be saved.'), { cause: error })
  return fromRow(data)
}

/** Whether an essay is worth a teacher's look: flags that warn, a classmate match, or not marked. */
export function needsALook(e) {
  const f = e?.flags || {}
  return (f.tabAways >= 3) || f.pasteTries > 0 || f.bigInserts > 0 || f.late || (e?.report?.classmateMatch >= 0.3) || !!e?.report?.notMarked || e?.status === 'error'
}

/* ---- what the essays add up to ---------------------------------------- */

/** The marked essays, oldest first, for a trend. */
export const markedOldestFirst = (list = []) =>
  list.filter((e) => e.status === 'marked' && e.report && !e.report.notMarked)
    .sort((a, b) => String(a.submittedAt || a.startedAt).localeCompare(String(b.submittedAt || b.startedAt)))

/** The kinds of mistake across essays, most common first: [{ kind, count, essays, focus }]. */
export function mistakeKinds(list = []) {
  const map = new Map()
  for (const e of list) {
    const seen = new Set()
    for (const r of e.report?.revisions || []) {
      const k = r.kind || 'Correction'
      const cur = map.get(k) || { kind: k, count: 0, essays: 0, rule: r.rule, focus: r.focus }
      cur.count++
      if (!seen.has(k)) { cur.essays++; seen.add(k) }
      map.set(k, cur)
    }
  }
  return [...map.values()].sort((a, b) => b.essays - a.essays || b.count - a.count)
}

/** Headline numbers: how many marked, the latest mark, the best, and the change from the one before. */
export function essayStats(list = []) {
  const marked = markedOldestFirst(list)
  const marks = marked.map(markOf)
  const latest = marks.at(-1) ?? null
  const before = marks.at(-2) ?? null
  return { count: marked.length, latest, best: marks.length ? Math.max(...marks) : null, change: latest != null && before != null ? latest - before : null }
}
