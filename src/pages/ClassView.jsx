import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, EyeOff, KeyRound, Loader2, Lock, Pencil, Printer, Send, Unlock, UserPlus } from 'lucide-react'
import { Loading, Notice, Stars } from '../components/ui.jsx'
import { api } from '../lib/api.js'
import { pick, shortDate, useT } from '../lib/i18n.jsx'
import { className } from '../data/subjects.js'
import { partsOf, starsFor } from '../pack/model.js'
import { plainText } from '../stepPractice/text.js'
import { slipsByKey } from '../stepPractice/model.js'

import { CARDS_KEY } from '../lib/cards.js'

const STATUS_CLS = {
  draft: 'bg-pra-sun-pale text-pra-sun-ink',
  published: 'bg-pra-green-pale text-pra-green-dark',
  hidden: 'bg-slate-100 text-slate-600',
}

// One class: its lessons (open, hide, due date, most missed), who did what, and
// the students' logins. Office, head teachers and the class's teachers.
export default function ClassView() {
  const { classKey: raw } = useParams()
  const classKey = decodeURIComponent(raw)
  const { t, lang } = useT()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  const [note, setNote] = useState('')       // a plain warning, not an error
  const [busy, setBusy] = useState('')
  const [open, setOpen] = useState(null)       // the pack whose misses are shown
  const [misses, setMisses] = useState({})

  const load = useCallback(() => api.classOverview(classKey).then(setData).catch((e) => setErr(e.message)), [classKey])
  useEffect(() => { load() }, [load])

  const run = async (key, fn) => {
    setBusy(key); setErr(''); setNote('')
    try { await fn() } catch (e) { setErr(e.message) } finally { setBusy('') }
  }
  // stillIn: the old device could not be signed out (learn-accounts said signed_out: false).
  const toCards = (cards, stillIn = false) => {
    try { sessionStorage.setItem(CARDS_KEY, JSON.stringify({ class_key: classKey, cards, still_in: stillIn })) } catch { /* ignore */ }
    navigate(`/t/${encodeURIComponent(classKey)}/cards`)
  }
  const makeLogins = () => run('make', async () => {
    const res = await api.accounts({ action: 'make', class_key: classKey })
    if (res.failed?.length) setErr(res.failed.map((f) => `${f.name}: ${f.reason}`).join('; '))
    if (res.made?.length) toCards(res.made)
    else await load()
  })
  const newPin = (s) => run(`pin:${s.id}`, async () => {
    const res = await api.accounts({ action: 'reset', student_id: s.id })
    toCards([{ student_id: s.id, name: s.name, username: res.username, pin: res.pin }], res.signed_out === false || !!res.warning)
  })
  const block = (s, on) => run(`block:${s.id}`, async () => {
    if (on && !window.confirm(t('confirmBlock', { name: s.name }))) return
    const res = await api.accounts({ action: on ? 'disable' : 'enable', student_id: s.id })
    if (on && (res?.signed_out === false || res?.warning)) {
      setNote(lang === 'vn' ? 'Đã khóa, nhưng thiết bị cũ có thể vẫn đăng nhập thêm tối đa một giờ.' : 'Blocked, but the old device may stay signed in for up to an hour.')
    }
    await load()
  })
  const setPack = (p, patch) => run(`pack:${p.id}`, async () => { await api.updatePack(p.id, patch); await load() })
  const showMisses = async (p) => {
    if (open === p.id) { setOpen(null); return }
    setOpen(p.id)
    if (!misses[p.id]) {
      try {
        const [list, full] = await Promise.all([api.misses(p.id), api.pack(p.slug)])
        setMisses((m) => ({ ...m, [p.id]: { list, content: full?.pack?.content } }))
      } catch (e) { setErr(e.message) }
    }
  }

  if (!data && !err) return <Loading />
  if (!data) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{t('failed', { msg: err })}</Notice></div>

  const noLogin = data.students.filter((s) => s.login === 'none')
  const rowOf = (sid, pid, part) => data.progress.find((g) => g.student_id === sid && g.pack_id === pid && g.part === part)
  const shown = data.packs.filter((p) => p.status !== 'draft')
  const L = (en, vn) => (lang === 'vn' ? vn : en)
  const needs = needsOf(data)
  const order = [...data.students].sort((a, b) => (a.login === 'on') !== (b.login === 'on') ? (a.login === 'on' ? -1 : 1)
    : needs[b.id].score - needs[a.id].score || a.name.localeCompare(b.name))

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <Link to="/" className="btn-ghost -ml-3 mb-2"><ArrowLeft className="h-5 w-5" /> {t('myClassesStaff')}</Link>
      <h1 className="mb-1 text-3xl font-extrabold text-pra-ink">{className(classKey, lang)}</h1>
      <p className="mb-6 font-bold text-pra-ink-soft">{t('nStudents', { n: data.students.length })} · {t('nLogins', { n: data.students.filter((s) => s.login === 'on').length })}</p>
      {err && <div className="mb-4"><Notice tone="bad">{t('failed', { msg: err })}</Notice></div>}
      {note && <div className="mb-4"><Notice tone="bad">{note}</Notice></div>}

      {/* Lessons */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-extrabold text-pra-ink">{t('lessons')}</h2>
        {!data.packs.length && <div className="card p-5 font-semibold text-pra-ink-soft">{t('noLessons')}</div>}
        <div className="space-y-3">
          {data.packs.map((p) => {
            const m = misses[p.id]
            return (
              <div key={p.id} className="card p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="min-w-0 basis-full md:basis-0 md:flex-1">
                    <span className={`mb-1 inline-block rounded-full px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider ${STATUS_CLS[p.status]}`}>{t(`status_${p.status}`)}</span>
                    <h3 className="text-lg font-extrabold leading-snug text-pra-ink">{lang === 'vn' ? p.title_vn || p.title : p.title}</h3>
                  </div>
                  <label className="flex items-center gap-2 text-sm font-bold text-pra-ink-soft">
                    {t('dueOn')}
                    <input type="date" className="rounded-xl border-2 border-pra-line px-2 py-2 text-pra-ink" value={p.due_on || ''}
                      onChange={(e) => setPack(p, { due_on: e.target.value || null })} disabled={busy === `pack:${p.id}`} />
                  </label>
                  {p.status === 'published'
                    ? <button type="button" className="btn-soft" onClick={() => setPack(p, { status: 'hidden' })} disabled={!!busy}><EyeOff className="h-5 w-5" /> {t('hide')}</button>
                    : <button type="button" className="btn-green" onClick={() => setPack(p, { status: 'published' })} disabled={!!busy}><Send className="h-5 w-5" /> {t('openForClass')}</button>}
                </div>
                {p.status !== 'draft' && <PartsSummary pack={p} data={data} />}
                <div className="mt-3 flex flex-wrap gap-2">
                  {partsOf({ parts: p.parts }).map((part, _, all) => (
                    <Link key={part.id} to={partLink(p.slug, part)} className="btn-ghost border-2 border-pra-line">
                      {part.kind === 'practice' ? <Pencil className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />} {t('preview_')}: {partLabel(all, part, t)}
                    </Link>
                  ))}
                  {p.status !== 'draft' && <button type="button" className="btn-ghost ml-auto" onClick={() => showMisses(p)} aria-expanded={open === p.id}>
                    {t('mostMissed')} · {L('Common slips', 'Lỗi thường gặp')} {open === p.id ?<ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>}
                </div>
                {open === p.id && (
                  <div className="mt-3 rounded-2xl bg-pra-paper p-4">
                    {!m ? <Loader2 className="h-5 w-5 animate-spin text-pra-ink-soft" /> : <Misses m={m} lang={lang} students={data.students} />}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Who did what */}
      <section className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <div className="mr-auto">
            <h2 className="text-xl font-extrabold text-pra-ink">{t('whoDid')}</h2>
            <p className="text-sm font-semibold text-pra-ink-soft">{L('Who needs help comes first: work past its due date, then low first scores.', 'Học viên cần hỗ trợ đứng đầu: bài quá hạn, rồi điểm lần đầu thấp.')}</p>
          </div>
          {noLogin.length > 0
            ? <button type="button" className="btn-primary" onClick={makeLogins} disabled={!!busy}>{busy === 'make' ? <Loader2 className="h-5 w-5 animate-spin" /> : <UserPlus className="h-5 w-5" />} {noLogin.length === 1 ? t('makeLoginFor1') : t('makeLoginsFor', { n: noLogin.length })}</button>
            : <span className="text-sm font-bold text-pra-ink-soft">{t('everyoneHasLogin')}</span>}
        </div>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-pra-line text-xs font-extrabold uppercase tracking-wider text-pra-ink-soft">
                <th className="sticky left-0 bg-white px-4 py-3">{t('student')}</th>
                <th className="px-3 py-3">{t('login')}</th>
                {shown.map((p) => partsOf({ parts: p.parts }).map((part, _, all) => (
                  <th key={`${p.id}:${part.id}`} className="px-3 py-3" title={p.title}>
                    <span className="block max-w-[140px] truncate normal-case tracking-normal text-pra-ink">{lang === 'vn' ? p.title_vn || p.title : p.title}</span>
                    <span className="inline-flex items-center gap-1">{part.kind === 'practice' ? <Pencil className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />} {partLabel(all, part, t)}</span>
                  </th>
                )))}
              </tr>
            </thead>
            <tbody>
              {order.map((s) => (
                <tr key={s.id} className="border-b border-pra-line last:border-0">
                  <td className="sticky left-0 min-w-[170px] bg-white px-4 py-3">
                    <span className="block whitespace-nowrap font-extrabold text-pra-ink">{s.name}</span>
                    {s.login === 'on' && needs[s.id].help && (
                      <span className="my-0.5 inline-block whitespace-nowrap rounded-full bg-pra-coral-pale px-2 py-0.5 text-xs font-extrabold text-pra-coral-deep">
                        {L('Needs help', 'Cần hỗ trợ')}{needs[s.id].why.length ? `: ${needs[s.id].why.map((w) => L(...w)).join(', ')}` : ''}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-pra-ink-soft">{t('lastSeen')}: {s.last_seen ? shortDate(s.last_seen, lang) : t('never')}</span>
                  </td>
                  <td className="px-3 py-3">
                    {s.login === 'none' ? <span className="font-bold text-pra-ink-soft">{t('noLogin')}</span> : (
                      <span className="flex flex-wrap items-center gap-1">
                        <code className={`mr-1 rounded-lg px-2 py-1 font-bold ${s.login === 'off' ? 'bg-slate-100 text-slate-500 line-through' : 'bg-pra-blue-pale text-pra-blue-ink'}`}>{s.username}</code>
                        <button type="button" className="btn-ghost min-h-[40px] px-2" title={t('newPin')} aria-label={`${t('newPin')}: ${s.name}`} onClick={() => newPin(s)} disabled={!!busy || s.login === 'off'}><KeyRound className="h-4 w-4" /></button>
                        <button type="button" className="btn-ghost min-h-[40px] px-2" title={s.login === 'off' ? t('unblock') : t('block')} aria-label={`${s.login === 'off' ? t('unblock') : t('block')}: ${s.name}`} onClick={() => block(s, s.login !== 'off')} disabled={!!busy}>
                          {s.login === 'off' ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                        </button>
                      </span>
                    )}
                  </td>
                  {shown.map((p) => partsOf({ parts: p.parts }).map((part) => {
                    const g = rowOf(s.id, p.id, part.id)
                    return (
                      <td key={`${p.id}:${part.id}`} className="px-3 py-3">
                        {g?.done
                          ? <span className="flex flex-col"><Stars n={starsFor(g.first_score ?? g.score)} size="h-4 w-4" label={t('stars', { n: starsFor(g.first_score ?? g.score) })} /><span className="text-xs font-bold text-pra-ink-soft">{t('firstScore')}: {Math.round((g.first_score ?? g.score) * 100)}%{g.runs > 1 ? ` · ${t('runs')}: ${g.runs}` : ''}</span></span>
                          : g ? <span className="font-bold text-pra-blue">{t('started')}</span> : <span className="text-slate-300">—</span>}
                      </td>
                    )
                  }))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-pra-ink-soft"><Printer className="h-4 w-4 shrink-0" /> {t('cardsHow')}</p>
      </section>
    </main>
  )
}

/** "Practice", or "Practice 2" when a pack has more than one practice part. */
function partLabel(parts, part, t) {
  const same = parts.filter((x) => x.kind === part.kind)
  return same.length > 1 ? `${t(part.kind)} ${same.indexOf(part) + 1}` : t(part.kind)
}
const partLink = (slug, part) => `/p/${slug}/${part.kind === 'practice' ? `practice${part.id !== 'practice' ? `?part=${encodeURIComponent(part.id)}` : ''}` : 'review'}`

const todayIso = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/**
 * Who needs help, per student, over the lessons open now: { [id]: { score, help, why } }.
 * Work past its due date weighs most, then work not finished, then a low first score.
 * `why` holds [en, vn] pairs for the tag.
 */
function needsOf(data) {
  const today = todayIso()
  const out = {}
  const open = data.packs.filter((p) => p.status === 'published' && (!p.opens_on || p.opens_on <= today))
  for (const s of data.students) {
    let score = 0
    let late = 0
    let low = 0
    for (const p of open) {
      const overdue = p.due_on && p.due_on < today
      for (const part of partsOf({ parts: p.parts })) {
        const g = data.progress.find((x) => x.student_id === s.id && x.pack_id === p.id && x.part === part.id)
        if (!g?.done) {
          score += (g ? 0.5 : 1) * (overdue ? 3 : 1)
          if (overdue) late += 1
        } else {
          const first = g.first_score ?? g.score ?? 0
          score += (1 - first) * 2
          if (first < 0.6) low += 1
        }
      }
    }
    const why = []
    if (late) why.push([`${late} overdue`, `${late} bài quá hạn`])
    if (low) why.push([`${low} low first ${low === 1 ? 'score' : 'scores'}`, `${low} bài điểm lần đầu thấp`])
    out[s.id] = { score, help: late > 0 || low > 0, why }
  }
  return out
}

/** Per part of a lesson: how many children have finished, started, not started (of the class). */
function PartsSummary({ pack, data }) {
  const { t, lang } = useT()
  const L = (en, vn) => (lang === 'vn' ? vn : en)
  const all = partsOf({ parts: pack.parts })
  const total = data.students.length
  if (!total || !all.length) return null
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {all.map((part) => {
        const rows = data.progress.filter((g) => g.pack_id === pack.id && g.part === part.id)
        const done = rows.filter((g) => g.done).length
        const started = rows.length - done
        const none = Math.max(0, total - rows.length)
        const pct = (n) => `${(n / total) * 100}%`
        const label = `${partLabel(all, part, t)}: ${done} ${L('done', 'xong')}, ${started} ${L('started', 'đang làm')}, ${none} ${L('not started', 'chưa làm')}`
        return (
          <div key={part.id} className="rounded-xl border-2 border-pra-line px-3 py-2" role="group" aria-label={label}>
            <p className="flex items-center gap-1.5 text-sm font-extrabold text-pra-ink">
              {part.kind === 'practice' ? <Pencil className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />} {partLabel(all, part, t)}
            </p>
            <div className="mt-1.5 flex h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
              <div className="bg-pra-green" style={{ width: pct(done) }} />
              <div className="bg-pra-blue-tint" style={{ width: pct(started) }} />
            </div>
            <p className="mt-1 flex flex-wrap gap-x-3 text-xs font-bold text-pra-ink-soft">
              <span><span className="font-extrabold text-pra-green-dark">{done}</span> {L('done', 'xong')}</span>
              <span><span className="font-extrabold text-pra-blue-deep">{started}</span> {L('started', 'đang làm')}</span>
              <span><span className="font-extrabold text-pra-ink">{none}</span> {L('not started', 'chưa làm')}</span>
            </p>
          </div>
        )
      })}
    </div>
  )
}

/**
 * The most-missed checks and items of one pack, and beside them the common slips on
 * each practice part: the slip's own message, how many children hit it, and who.
 */
function Misses({ m, lang, students }) {
  const { t } = useT()
  const L = (en, vn) => (lang === 'vn' ? vn : en)
  const all = partsOf(m.content)
  const practiceParts = all.filter((p) => p.kind === 'practice')
  const list = (m.list || []).filter((x) => x.wrong_first > 0).sort((a, b) => b.wrong_first - a.wrong_first).slice(0, 6)
  const labelOf = (x) => {
    const part = all.find((p) => p.id === x.part)
    if (part?.kind === 'review') {
      const c = part.slides.find((s) => s.check?.id === x.id)?.check
      return plainText(pick(c, 'q', lang) || x.id)
    }
    const it = part?.set?.items?.find((i) => i.id === x.id)
    return plainText(pick(it, 'prompt', lang) || x.id)
  }
  const partName = (id) => { const part = all.find((q) => q.id === id); return part ? partLabel(all, part, t) : t('practice') }
  const nameOf = (id) => students.find((s) => s.id === id)?.name
  // Common slips, per practice part: every (item, slip key) the class hit, with its message.
  const slipParts = practiceParts.map((part) => {
    const rows = []
    for (const x of (m.list || []).filter((y) => y.part === part.id)) {
      const item = part.set?.items?.find((i) => i.id === x.id)
      const known = slipsByKey(item)
      for (const [key, n] of Object.entries(x.slips || {})) {
        const hit = known[key]
        if (!hit || !n) continue
        rows.push({
          key: `${x.id}:${key}`, n, msg: plainText(pick(hit.slip, 'msg', lang) || ''), step: hit.step + 1,
          prompt: plainText(pick(item, 'prompt', lang) || x.id), who: (x.slip_who?.[key] || []).map(nameOf).filter(Boolean),
        })
      }
    }
    return { part, rows: rows.sort((a, b) => b.n - a.n).slice(0, 5) }
  }).filter((g) => g.rows.length)

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="min-w-0">
        <h4 className="mb-2 text-sm font-extrabold uppercase tracking-wider text-pra-ink-soft">{t('mostMissed')}</h4>
        {!list.length ? <p className="font-semibold text-pra-ink-soft">{t('noMisses')}</p> : (
          <ol className="space-y-3">
            {list.map((x) => (
              <li key={`${x.part}:${x.id}`} className="flex gap-3">
                <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-pra-coral-pale px-2 text-sm font-extrabold text-pra-coral-deep">{x.wrong_first}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-pra-ink">{labelOf(x)}</span>
                  <span className="text-xs font-bold text-pra-ink-soft">{partName(x.part)} · {t('wrongFirst', { n: x.wrong_first, asked: x.asked })}</span>
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="min-w-0">
        <h4 className="mb-2 text-sm font-extrabold uppercase tracking-wider text-pra-ink-soft">{L('Common slips', 'Lỗi thường gặp')}</h4>
        {!slipParts.length ? <p className="font-semibold text-pra-ink-soft">{L('No slips yet. They show here once children answer the practice.', 'Chưa có lỗi nào. Lỗi sẽ hiện ở đây khi các em làm phần luyện tập.')}</p> : (
          <div className="space-y-4">
            {slipParts.map(({ part, rows }) => (
              <div key={part.id}>
                {practiceParts.length > 1 && (
                  <p className="mb-1.5 flex items-center gap-1.5 text-sm font-extrabold text-pra-ink"><Pencil className="h-3.5 w-3.5" /> {pick(part, 'title', lang) || partName(part.id)}</p>
                )}
                <ol className="space-y-3">
                  {rows.map((r) => (
                    <li key={r.key} className="flex gap-3">
                      <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-pra-sun-pale px-2 text-sm font-extrabold text-pra-sun-ink"
                        title={L(`${r.n} children`, `${r.n} em`)}>{r.n}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-pra-ink">{r.msg}</span>
                        <span className="block truncate text-xs font-semibold text-pra-ink-soft" title={r.prompt}>{L('Step', 'Bước')} {r.step} · {r.prompt}</span>
                        {r.who.length > 0 && <span className="block text-xs font-bold text-pra-blue-deep">{r.who.join(', ')}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
