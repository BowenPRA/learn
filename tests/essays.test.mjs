// Timed writing: supabase/learn-essays.sql in PGlite (who can start, save, hand in, read,
// revise and mark an essay, and the server's clock), and the marking rules every mark
// passes through (supabase/functions/learn-grade-essay/marking.js).
//
//   npm test
import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'
import { buildReport, essayScore, findVerbatim, measure, usableRevisions } from '../supabase/functions/learn-grade-essay/marking.js'

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8')
let db
const ids = {}

async function as(claims, fn) {
  return db.transaction(async (tx) => {
    await tx.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(claims)])
    await tx.exec('set local role authenticated')
    return fn(async (sql, params) => {
      await tx.exec('savepoint q')
      try {
        const rows = (await tx.query(sql, params)).rows
        await tx.exec('release savepoint q')
        return rows
      } catch (e) {
        await tx.exec('rollback to savepoint q')
        throw e
      }
    })
  })
}
const fails = async (p, re) => {
  let err = null
  try { await p } catch (e) { err = e }
  assert.ok(err, 'expected an error')
  assert.match(err.message, re)
}
const student = (who) => ({ sub: ids[`${who}User`], role: 'authenticated', email: `${who}@learn.pra.edu.vn`, app_metadata: { role: 'student', student_id: ids[who] } })
const staff = (email) => ({ sub: crypto.randomUUID(), role: 'authenticated', email, app_metadata: { role: 'teacher' } })
const CLASS = 'english:Upper Secondary'
const SAVE = `select * from learn_essay_save($1, 'UPPER_ENG/U01', 'writing', $2, 'u1w1', $3, 30, $4, null, $5, $6)`
const PROMPT = JSON.stringify({ title: 'A day that went wrong', task: 'Write a true story.', minWords: 150, paragraphs: 3 })

before(async () => {
  db = new PGlite()
  await db.exec(read('./sql/stubs.sql'))
  await db.exec(read('../supabase/current-hardening.sql'))
  await db.exec(read('../supabase/learn-schema.sql'))
  for (const who of ['ana', 'binh']) {
    ids[who] = (await db.query(`insert into adm_students (full_name, nickname, level, status, active) values ($1, $2, 'Upper Secondary', 'active', true) returning id`, [`Learner ${who}`, who])).rows[0].id
    ids[`${who}User`] = crypto.randomUUID()
    await db.query(`insert into auth.users (id, email, last_sign_in_at) values ($1, $2, now())`, [ids[`${who}User`], `${who}@learn.pra.edu.vn`])
    await db.query(`insert into learn_accounts (user_id, student_id, username, active) values ($1, $2, $3, true)`, [ids[`${who}User`], ids[who], `${who}word11`])
  }
  await db.exec(`insert into adm_teachers (email, name, title, role, subjects, homeroom_groups) values
    ('bowen@pra.edu.vn', 'Bowen', 'Mr.', 'teacher', array['english:Upper Secondary'], array[]::text[]),
    ('david@pra.edu.vn', 'David', 'Mr.', 'teacher', array['science:Year 7'], array[]::text[])`)
  const sql = read('../supabase/learn-essays.sql')
  await db.exec(sql)
  await db.exec(sql)
})

test('a student starts, saves and hands in; the server counts the words and the time', async () => {
  ids.e1 = crypto.randomUUID()
  await as(student('ana'), async (q) => {
    const [start] = await q(SAVE, [ids.e1, CLASS, PROMPT, '', '{}', false])
    assert.equal(start.status, 'draft')
    const [mid] = await q(SAVE, [ids.e1, CLASS, PROMPT, 'Last summer we went to the beach.', JSON.stringify({ tabAways: 1 }), false])
    assert.deepEqual([mid.word_count, mid.flags.tabAways], [7, 1])
    const [done] = await q(SAVE, [ids.e1, CLASS, PROMPT, 'Last summer we went to the beach. It rained.', '{}', true])
    assert.equal(done.status, 'submitted')
    assert.ok(done.seconds_used >= 0 && done.seconds_used <= 1800)
    // Handed in: the text no longer changes.
    const [again] = await q(SAVE, [ids.e1, CLASS, PROMPT, 'Something else entirely.', '{}', false])
    assert.equal(again.body, 'Last summer we went to the beach. It rained.')
  })
})

test('a student cannot start writing for a class that is not theirs', async () => {
  await fails(as(student('ana'), (q) => q(SAVE, [crypto.randomUUID(), 'science:Year 7', PROMPT, '', '{}', false])), /not for your class/)
})

test('after the time allowed, a save hands the essay in as last saved', async () => {
  ids.e2 = crypto.randomUUID()
  await as(student('ana'), (q) => q(SAVE, [ids.e2, CLASS, PROMPT, 'What I had written in time.', '{}', false]))
  await db.query(`update learn_essays set started_at = now() - interval '40 minutes' where id = $1`, [ids.e2])
  await as(student('ana'), async (q) => {
    const [late] = await q(SAVE, [ids.e2, CLASS, PROMPT, 'What I had written in time, and more after.', '{}', false])
    assert.equal(late.status, 'submitted')
    assert.equal(late.body, 'What I had written in time.')
    assert.equal(late.flags.late, true)
  })
})

test('students read only their own writing and cannot write a mark', async () => {
  await as(student('binh'), async (q) => {
    assert.equal((await q(`select id from learn_essays`)).length, 0)
    await fails(q(SAVE, [ids.e1, CLASS, PROMPT, 'not mine', '{}', false]), /Not your essay/)
  })
  await as(student('ana'), async (q) => {
    assert.equal((await q(`select id from learn_essays`)).length, 2)
    await fails(q(`update learn_essays set score = 12 where id = $1`, [ids.e1]), /permission denied/)
  })
})

test('corrections are saved only once the essay is marked', async () => {
  const rev = JSON.stringify({ fixed: 2, total: 2, revisedText: 'Fixed.' })
  await fails(as(student('ana'), (q) => q(`select * from learn_essay_revise($1, $2)`, [ids.e1, rev])), /cannot be revised/)
  await db.query(`update learn_essays set status = 'marked', score = 8, report = '{"total":8}' where id = $1`, [ids.e1])
  const [r] = await as(student('ana'), (q) => q(`select * from learn_essay_revise($1, $2)`, [ids.e1, rev]))
  assert.deepEqual(r.revision, { fixed: 2, total: 2, revisedText: 'Fixed.' })
})

test('the class teacher reads the essays and adds a mark and a note; another teacher cannot', async () => {
  await as(staff('bowen@pra.edu.vn'), async (q) => {
    assert.equal((await q(`select id from learn_essays`)).length, 2)
    const [r] = await q(`select * from learn_essay_note($1, 9, 'Good detail.')`, [ids.e1])
    assert.deepEqual([r.teacher_score, r.teacher_note], [9, 'Good detail.'])
    await fails(q(`select * from learn_essay_note($1, 13, '')`, [ids.e1]), /0 to 12/)
  })
  await as(staff('david@pra.edu.vn'), async (q) => {
    assert.equal((await q(`select id from learn_essays`)).length, 0)
    await fails(q(`select * from learn_essay_note($1, 5, 'x')`, [ids.e1]), /Only a teacher of this class/)
  })
})

/* ---- the marking rules ------------------------------------------------- */

const essay = 'Last summer we was at the beach, it was hot.\nThen my brother lost his shoe in the sea and we looked for it for an hour.\nIn the end my father found it under a boat and we all laughed together. After that we bought ice cream from a small shop near the road and walked home slowly in the evening sun.'

test('quotes are found as written, or dropped', () => {
  assert.equal(findVerbatim(essay, 'WE WAS at'), 'we was at')
  assert.equal(findVerbatim(essay, 'we   was\nat'), 'we was at')
  assert.equal(findVerbatim(essay, 'not on the page'), null)
  const kept = usableRevisions([
    { quote: 'beach, it was', correction: 'beach. It was', kind: 'Comma splice' },
    { quote: 'we was at', correction: 'we were at', kind: 'Subject-verb agreement' },
    { quote: 'invented words', correction: 'x' },
    { quote: 'we was at', correction: 'we were at' },
  ], essay)
  assert.deepEqual(kept.map((r) => r.kind), ['Subject-verb agreement', 'Comma splice'])
})

test('the code caps what the model gives: too short, too few paragraphs, too many mistakes', () => {
  const ai = { ideas: 4, organisation: 4, language: 4, revisions: [{ quote: 'we was at', correction: 'we were at', kind: 'SVA', focus: false }, { quote: 'beach, it was', correction: 'beach. It was', kind: 'Comma splice', focus: true }] }
  const r = buildReport(ai, essay, { minWords: 150, paragraphs: 3, focus: { label: 'Complete sentences' } })
  assert.equal(r.notMarked, '')
  assert.deepEqual(r.traits, { ideas: 2, organisation: 2, language: 2 })
  assert.equal(r.focus.count, 1)
  assert.ok(r.scoreNotes.length >= 3)
})

test('too short or copied from the task is not marked', () => {
  assert.match(buildReport({ ideas: 4, organisation: 4, language: 4 }, 'Too short to mark.', {}).notMarked, /too short/)
  const task = 'Write a true story about a day when something went wrong and tell us what happened and how you felt about it at the end of the day.'
  const r = buildReport({ ideas: 4, organisation: 4, language: 4 }, `${task} ${task} ${task}`, { task })
  assert.match(r.notMarked, /copied/)
  assert.equal(r.total, 0)
})

test('a classmate match is measured for the teacher', () => {
  const m = measure(essay, {}, [essay.replace('beach', 'sea')])
  assert.ok(m.matched > 0.5)
})

test('the task XP: 8 parts for the mark, 2 for fixing the mistakes', () => {
  const report = { total: 9, notMarked: '' }
  const xp = (rev) => Math.round(essayScore(report, rev) * 100) / 100
  assert.equal(xp(null), 0.6)
  assert.equal(xp({ fixed: 3, total: 3 }), 0.8)
  assert.equal(xp({ fixed: 2, total: 3 }), 0.7)
  assert.equal(xp({ fixed: 0, total: 0 }), 0.8)
})
