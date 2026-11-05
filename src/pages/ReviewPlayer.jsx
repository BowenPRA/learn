import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Home, Pencil } from 'lucide-react'
import { CloseButton, LangSwitch, Loading, Notice, Stars } from '../components/ui.jsx'
import Slide from '../pack/Slide.jsx'
import Check from '../pack/Check.jsx'
import { api } from '../lib/api.js'
import { useAuth } from '../lib/auth.jsx'
import { useT } from '../lib/i18n.jsx'
import { usePack } from '../lib/usePack.js'
import { partsOf, scoreOf, starsFor } from '../pack/model.js'

// The guided review: the lesson's slides one at a time, with the check question
// under each; Next opens once it is answered. Only the first answer to each
// question counts. Students' answers are saved as they go; staff preview only.
export default function ReviewPlayer() {
  const { slug } = useParams()
  const { t } = useT()
  const { loading, pack, progress, assets, error } = usePack(slug)
  if (loading) return <Loading />
  if (error) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{t(error === 'offline' ? 'offline' : 'notOpen')}</Notice></div>
  const part = partsOf(pack.content).find((p) => p.kind === 'review')
  if (!part) return <div className="mx-auto max-w-3xl p-4"><Notice tone="bad">{t('notOpen')}</Notice></div>
  return <ReviewRun pack={pack} part={part} row={progress.find((g) => g.part === part.id)} assets={assets} />
}

function ReviewRun({ pack, part, row, assets }) {
  const { t, lang } = useT()
  const { me } = useAuth()
  const navigate = useNavigate()
  const student = me?.kind === 'student'
  const slides = part.slides
  const resume = row?.run_open ? row.items || {} : {}
  const firstOpen = slides.findIndex((s) => s.check && !resume[s.check.id])
  const [items, setItems] = useState(resume)
  const [at, setAt] = useState(Object.keys(resume).length && firstOpen > 0 ? firstOpen : 0)
  const [finished, setFinished] = useState(false)
  const [saveFailed, setSaveFailed] = useState(false)
  const top = useRef(null)
  const slide = slides[at]
  const answered = !slide.check || !!items[slide.check.id]
  const isLast = at === slides.length - 1
  const hasPractice = partsOf(pack.content).some((p) => p.kind === 'practice')
  const back = `/p/${pack.slug}`

  useEffect(() => { top.current?.scrollIntoView?.({ block: 'start' }) }, [at, finished])

  const save = async (next, done) => {
    if (!student) return
    try { await api.save(pack.id, part.id, next, done); setSaveFailed(false) } catch { setSaveFailed(true) }
  }
  const solved = ({ ok, tries }) => {
    const next = { ...items, [slide.check.id]: { ok, tries, hints: 0, shown: false, slips: [] } }
    setItems(next)
    save(next, false)
  }
  const goNext = () => {
    if (!answered) return
    if (isLast) { setFinished(true); save(items, true); return }
    setAt(at + 1)
  }

  if (finished) {
    const score = scoreOf(pack.content, part.id, items)
    const total = slides.filter((s) => s.check).length
    const right = Object.values(items).filter((v) => v.ok).length
    return (
      <div ref={top} className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center gap-5 px-4 py-10 text-center">
        <Stars n={starsFor(score)} size="h-14 w-14" label={t('stars', { n: starsFor(score) })} />
        <h1 className="text-3xl font-extrabold text-pra-ink sm:text-4xl">{t('reviewDone')}</h1>
        <p className="text-xl font-bold text-pra-ink-soft">{t('rightFirst', { n: right, total })}</p>
        {!student && <Notice>{t('preview')}</Notice>}
        {saveFailed && <Notice tone="bad">{t('notSaved')}</Notice>}
        <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
          {hasPractice && <button type="button" className="btn-green btn-big flex-1" onClick={() => navigate(`/p/${pack.slug}/practice`)}><Pencil className="h-6 w-6" /> {t('nowPractise')}</button>}
          <Link to={student ? '/' : back} className="btn-soft btn-big flex-1"><Home className="h-6 w-6" /> {t('home')}</Link>
        </div>
      </div>
    )
  }

  return (
    <div ref={top} className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b-2 border-pra-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
          <CloseButton to={back} label={t('back')} />
          <div className="flex flex-1 items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-pra-line" role="progressbar" aria-valuemin={1} aria-valuemax={slides.length} aria-valuenow={at + 1}>
              <div className="h-full rounded-full bg-pra-green transition-all" style={{ width: `${((at + 1) / slides.length) * 100}%` }} />
            </div>
            <span className="text-sm font-extrabold tabular-nums text-pra-ink-soft">{at + 1} / {slides.length}</span>
          </div>
          <LangSwitch />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-4 px-4 py-5">
        {!student && <Notice>{t('preview')}</Notice>}
        <div className="card p-4 sm:p-8"><Slide key={at} slide={slide} lang={lang} assets={assets} /></div>
        {slide.check && <Check key={`${at}:${slide.check.id}`} check={slide.check} lang={lang} solved={!!items[slide.check.id]} onSolved={solved} />}
        {saveFailed && <Notice tone="bad">{t('notSaved')}</Notice>}
      </main>

      <footer className="sticky bottom-0 z-20 border-t-2 border-pra-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <button type="button" className="btn-soft h-14 w-14 p-0" onClick={() => setAt(Math.max(0, at - 1))} disabled={at === 0} aria-label={t('back')}>
            <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
          </button>
          <p className="flex-1 text-center text-sm font-bold text-pra-ink-soft">{!answered ? t('answerFirst') : ''}</p>
          <button type="button" className="btn-primary btn-big min-w-[150px]" onClick={goNext} disabled={!answered}>
            {isLast ? t('done') : t('next')} <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>
      </footer>
    </div>
  )
}

