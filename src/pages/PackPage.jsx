import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, CalendarClock, PartyPopper, Pencil } from 'lucide-react'
import { Loading, Notice, Ring, Stars } from '../components/ui.jsx'
import { useT, pick, shortDate } from '../lib/i18n.jsx'
import { useAuth } from '../lib/auth.jsx'
import { usePack } from '../lib/usePack.js'
import { partsOf, starsFor } from '../pack/model.js'
import { packDone, partLabels, partPath, partState } from '../components/packs.jsx'
import { splitClass, subjectName, subjectTone } from '../data/subjects.js'

// A lesson: two big buttons, Review and Practice, each with how far the child got.
export default function PackPage() {
  const { slug } = useParams()
  const { t, lang } = useT()
  const { me } = useAuth()
  const { loading, pack, progress, error } = usePack(slug)
  const staff = me?.kind === 'staff'
  if (loading) return <Loading />
  if (error) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{t(error === 'offline' ? 'offline' : 'notOpen')}</Notice></div>

  const [subject] = splitClass(pack.class_key)
  const rows = Object.fromEntries(progress.map((g) => [g.part, g]))
  const back = staff ? `/t/${encodeURIComponent(pack.class_key)}` : '/'
  const labels = partLabels(pack.content, t)
  const whole = !staff && packDone(pack.content, rows)

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-6">
      <Link to={back} className="btn-ghost -ml-3 mb-2"><ArrowLeft className="h-5 w-5" /> {t('back')}</Link>
      <p className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full px-3 py-0.5 text-sm font-extrabold text-white" style={{ background: subjectTone(subject) }}>{subjectName(subject, lang)}</span>
        {pack.content.teacher && <span className="text-sm font-bold text-pra-ink-soft">{pack.content.teacher}</span>}
        {pack.due_on && (
          <span className="inline-flex items-center gap-1 rounded-full bg-pra-sun-pale px-3 py-0.5 text-sm font-bold text-pra-sun-ink">
            <CalendarClock className="h-4 w-4" /> {t('due', { date: shortDate(pack.due_on, lang) })}
          </span>
        )}
      </p>
      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-pra-ink sm:text-4xl">{pick(pack.content, 'title', lang)}</h1>
      {staff && <div className="mb-4"><Notice>{t('preview')}</Notice></div>}
      {whole && (
        <div className="mb-5 flex items-center gap-4 rounded-3xl border-2 border-pra-green-tint bg-pra-green-pale p-4 sm:p-5" role="status">
          <PartyPopper className="h-10 w-10 shrink-0 text-pra-green-deep" aria-hidden />
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
          const total = st.total
          const answered = st.n
          const own = pick(p, 'title', lang)
          const Icon = p.kind === 'practice' ? Pencil : BookOpen
          const tone = p.kind === 'practice' ? '#7C5CFF' : '#116DFF'
          const action = !g ? t('start') : g.run_open && answered ? t('keepGoing') : g.done ? t('again') : t('start')
          return (
            <Link key={p.id} to={partPath(pack.slug, p)}
              className="card group flex flex-col items-center gap-3 p-6 text-center transition hover:-translate-y-0.5 hover:border-pra-blue">
              <Ring value={g ? (g.done ? 1 : answered / Math.max(1, total)) : null} done={g?.done} size={96} tone={tone}>
                <Icon className="h-10 w-10" style={{ color: g?.done ? '#2F7D14' : tone }} strokeWidth={2.5} />
              </Ring>
              <span className="text-2xl font-extrabold text-pra-ink">{labels[p.id]}</span>
              <span className="text-base font-semibold text-pra-ink-soft">{own && own !== labels[p.id] ? own : t(p.kind === 'practice' ? 'practiceSub' : 'reviewSub')}</span>
              <span className={`text-sm font-extrabold ${st.state === 'done' ? 'text-pra-green-dark' : st.state === 'started' ? 'text-pra-blue-ink' : 'text-pra-ink-soft'}`}>
                {st.state === 'done' ? `${t('done')} ✓` : st.state === 'started' ? t('nOfTotal', { n: st.n, total: st.total }) : t('notStarted')}
              </span>
              {g?.done && <Stars n={starsFor(g.best_score ?? g.score)} label={t('stars', { n: starsFor(g.best_score ?? g.score) })} />}
              <span className={`btn mt-1 w-full text-white ${p.kind === 'practice' ? 'bg-pra-violet' : 'bg-pra-blue'}`}>{action}</span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
