import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CalendarClock, Pencil, User } from 'lucide-react'
import { Loading, Notice, Ring, Stars, SubjectTile } from '../components/ui.jsx'
import Pip from '../components/Pip.jsx'
import { useT, pick, shortDate } from '../lib/i18n.jsx'
import { useAuth } from '../lib/auth.jsx'
import { usePack } from '../lib/usePack.js'
import { partsOf, starsFor } from '../pack/model.js'
import { nextPart, packDone, partLabels, partPath, partState } from '../components/packs.jsx'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'

// A lesson: one card per part (Review, Practice), each with how far the child got.
// The next part to do is marked; buttons are blue (review) and green (practice).
export default function PackPage() {
  const { slug } = useParams()
  const { t, lang } = useT()
  const { me } = useAuth()
  const { loading, pack, progress, error } = usePack(slug)
  const staff = me?.kind === 'staff'
  if (loading) return <Loading />
  if (error) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{t(error === 'offline' ? 'offline' : 'notOpen')}</Notice></div>

  const [subject] = splitClass(pack.class_key)
  const tone = subjectTone(subject)
  const rows = Object.fromEntries(progress.map((g) => [g.part, g]))
  const back = staff ? `/t/${encodeURIComponent(pack.class_key)}` : '/'
  const labels = partLabels(pack.content, t)
  const whole = !staff && packDone(pack.content, rows)
  const upNext = !staff && !whole ? nextPart(pack.content, rows) : null

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">
      <Link to={back} className="btn-ghost -ml-3 mb-3"><ArrowLeft className="h-5 w-5" /> {t('back')}</Link>
      <header className="mb-6 flex items-start gap-4">
        <SubjectTile subject={subject} tone={tone} size="h-16 w-16" icon="h-8 w-8" />
        <div className="min-w-0">
          <p className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm font-extrabold uppercase tracking-wide" style={{ color: tone }}>{subjectName(subject, lang)}</span>
            {pack.content.teacher && <span className="inline-flex items-center gap-1 text-sm font-bold text-pra-ink-soft"><User className="h-4 w-4" /> {pack.content.teacher}</span>}
            {pack.due_on && (
              <span className="chip bg-pra-sun-pale text-pra-sun-ink"><CalendarClock className="h-4 w-4" /> {t('due', { date: shortDate(pack.due_on, lang) })}</span>
            )}
          </p>
          <h1 className="break-words text-3xl font-black leading-tight text-pra-ink sm:text-4xl">{pick(pack.content, 'title', lang)}</h1>
        </div>
      </header>
      {staff && <div className="mb-4"><Notice>{t('preview')}</Notice></div>}
      {whole && (
        <div className="mb-6 flex items-center gap-4 overflow-hidden rounded-3xl border border-pra-green-tint bg-gradient-to-r from-pra-green-pale to-white p-4 shadow-soft sm:p-5" role="status">
          <Pip wave mood="happy" size={88} className="-mb-6" />
          <div>
            <p className="text-xl font-extrabold text-pra-green-dark">{t('packDone')}</p>
            <p className="font-semibold text-pra-green-dark">{t('packDoneSub')}</p>
          </div>
        </div>
      )}

      <div className={`grid gap-4 sm:grid-cols-2 ${partsOf(pack.content).length === 3 ? 'lg:grid-cols-3' : ''}`}>
        {partsOf(pack.content).map((p) => {
          const g = rows[p.id]
          const st = partState(pack.content, p.id, g)
          const own = pick(p, 'title', lang)
          const practice = p.kind === 'practice'
          const Icon = practice ? Pencil : BookOpen
          const ringTone = practice ? '#7C5CFF' : '#116DFF'
          const action = !g ? t('start') : g.run_open && st.n ? t('keepGoing') : g.done ? t('again') : t('start')
          const next = upNext?.id === p.id
          return (
            <Link key={p.id} to={partPath(pack.slug, p)}
              className={`card card-link group relative flex flex-col items-center gap-3 p-6 text-center ${next ? 'border-pra-blue-tint ring-2 ring-pra-blue/30' : ''}`}>
              {next && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-pra-blue px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-[0_3px_0_#0B4FBF]">
                  {t('upNext')}
                </span>
              )}
              <Ring value={g ? (g.done ? 1 : st.n / Math.max(1, st.total)) : null} done={g?.done} size={104} tone={ringTone}>
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full" style={{ background: g?.done ? '#EDF7E3' : `${ringTone}14` }}>
                  <Icon className="h-9 w-9" style={{ color: g?.done ? '#2F7D14' : ringTone }} strokeWidth={2.5} />
                </span>
              </Ring>
              <span className="text-2xl font-extrabold text-pra-ink">{labels[p.id]}</span>
              <span className="text-base font-semibold text-pra-ink-soft">{own && own !== labels[p.id] ? own : t(practice ? 'practiceSub' : 'reviewSub')}</span>
              <span className={`chip ${st.state === 'done' ? 'bg-pra-green-pale text-pra-green-dark' : st.state === 'started' ? 'bg-pra-blue-pale text-pra-blue-ink' : 'bg-pra-paper text-pra-ink-soft'}`}>
                {st.state === 'done' ? `${t('done')} ✓` : st.state === 'started' ? t('nOfTotal', { n: st.n, total: st.total }) : t('notStarted')}
              </span>
              {g?.done && <Stars n={starsFor(g.best_score ?? g.score)} label={t('stars', { n: starsFor(g.best_score ?? g.score) })} />}
              <span className={`${practice ? 'btn-green' : 'btn-primary'} mt-auto w-full`}>
                {action} <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" strokeWidth={3} />
              </span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
