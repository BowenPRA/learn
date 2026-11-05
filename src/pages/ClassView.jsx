import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, EyeOff, KeyRound, Loader2, Lock, Pencil, Printer, Send, Unlock, UserPlus } from 'lucide-react'
import { Loading, Notice, Stars } from '../components/ui.jsx'
import { api } from '../lib/api.js'
import { pick, shortDate, useT } from '../lib/i18n.jsx'
import { className } from '../data/subjects.js'
import { partsOf, starsFor } from '../pack/model.js'
import { plainText } from '../stepPractice/text.js'

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
  const [busy, setBusy] = useState('')
  const [open, setOpen] = useState(null)       // the pack whose misses are shown
  const [misses, setMisses] = useState({})

  const load = useCallback(() => api.classOverview(classKey).then(setData).catch((e) => setErr(e.message)), [classKey])
  useEffect(() => { load() }, [load])

  const run = async (key, fn) => {
    setBusy(key); setErr('')
    try { await fn() } catch (e) { setErr(e.message) } finally { setBusy('') }
  }
  const toCards = (cards) => {
    try { sessionStorage.setItem(CARDS_KEY, JSON.stringify({ class_key: classKey, cards })) } catch { /* ignore */ }
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
    toCards([{ student_id: s.id, name: s.name, username: res.username, pin: res.pin }])
  })
  const block = (s, on) => run(`block:${s.id}`, async () => {
    if (on && !window.confirm(t('confirmBlock', { name: s.name }))) return
    await api.accounts({ action: on ? 'disable' : 'enable', student_id: s.id })
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

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <Link to="/" className="btn-ghost -ml-3 mb-2"><ArrowLeft className="h-5 w-5" /> {t('myClassesStaff')}</Link>
      <h1 className="mb-1 text-3xl font-extrabold text-pra-ink">{className(classKey, lang)}</h1>
      <p className="mb-6 font-bold text-pra-ink-soft">{t('nStudents', { n: data.students.length })} · {t('nLogins', { n: data.students.filter((s) => s.login === 'on').length })}</p>
      {err && <div className="mb-4"><Notice tone="bad">{t('failed', { msg: err })}</Notice></div>}

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
                <div className="mt-3 flex flex-wrap gap-2">
                  {partsOf({ parts: p.parts }).map((part) => (
                    <Link key={part.id} to={`/p/${p.slug}/${part.kind === 'practice' ? 'practice' : 'review'}`} className="btn-ghost border-2 border-pra-line">
                      {part.kind === 'practice' ? <Pencil className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />} {t('preview_')}: {t(part.kind)}
                    </Link>
                  ))}
                  {p.status !== 'draft' && <button type="button" className="btn-ghost ml-auto" onClick={() => showMisses(p)} aria-expanded={open === p.id}>
                    {t('mostMissed')} {open === p.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>}
                </div>
                {open === p.id && (
                  <div className="mt-3 rounded-2xl bg-pra-paper p-4">
                    {!m ? <Loader2 className="h-5 w-5 animate-spin text-pra-ink-soft" /> : <Misses m={m} lang={lang} />}
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
          <h2 className="mr-auto text-xl font-extrabold text-pra-ink">{t('whoDid')}</h2>
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
                {shown.map((p) => partsOf({ parts: p.parts }).map((part) => (
                  <th key={`${p.id}:${part.id}`} className="px-3 py-3" title={p.title}>
                    <span className="block max-w-[140px] truncate normal-case tracking-normal text-pra-ink">{lang === 'vn' ? p.title_vn || p.title : p.title}</span>
                    <span className="inline-flex items-center gap-1">{part.kind === 'practice' ? <Pencil className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />} {t(part.kind)}</span>
                  </th>
                )))}
              </tr>
            </thead>
            <tbody>
              {data.students.map((s) => (
                <tr key={s.id} className="border-b border-pra-line last:border-0">
                  <td className="sticky left-0 bg-white px-4 py-3">
                    <span className="block font-extrabold text-pra-ink">{s.name}</span>
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

/** The most-missed checks and items of one pack, with the slip messages children hit. */
function Misses({ m, lang }) {
  const { t } = useT()
  const list = (m.list || []).filter((x) => x.wrong_first > 0).sort((a, b) => b.wrong_first - a.wrong_first).slice(0, 6)
  if (!list.length) return <p className="font-semibold text-pra-ink-soft">{t('noMisses')}</p>
  const labelOf = (x) => {
    const part = partsOf(m.content).find((p) => p.id === x.part)
    if (part?.kind === 'review') {
      const c = part.slides.find((s) => s.check?.id === x.id)?.check
      return plainText(pick(c, 'q', lang) || x.id)
    }
    const it = part?.set?.items?.find((i) => i.id === x.id)
    return plainText(pick(it, 'prompt', lang) || x.id)
  }
  return (
    <ol className="space-y-3">
      {list.map((x) => (
        <li key={`${x.part}:${x.id}`} className="flex gap-3">
          <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-pra-coral-pale px-2 text-sm font-extrabold text-pra-coral-deep">{x.wrong_first}</span>
          <span className="flex-1">
            <span className="block font-bold text-pra-ink">{labelOf(x)}</span>
            <span className="text-xs font-bold text-pra-ink-soft">{t(x.part === 'review' ? 'review' : 'practice')} · {t('wrongFirst', { n: x.wrong_first, asked: x.asked })}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
