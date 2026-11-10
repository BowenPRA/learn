import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Home, Pencil } from 'lucide-react'
import { Bar, CloseButton, LangSwitch, Loading, Notice } from '../components/ui.jsx'
import DoneScreen from '../components/DoneScreen.jsx'
import { ListenButton, stopSpeaking } from '../components/Listen.jsx'
import { nextPart, partLabels, partPath } from '../components/packs.jsx'
import Slide from '../pack/Slide.jsx'
import Check from '../pack/Check.jsx'
import { api } from '../lib/api.js'
import { useAuth } from '../lib/auth.jsx'
import { useT } from '../lib/i18n.jsx'
import { usePack } from '../lib/usePack.js'
import { contentLang, partsOf, scoreOf, starsFor } from '../pack/model.js'

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
  return <ReviewRun pack={pack} part={part} row={progress.find((g) => g.part === part.id)} progress={progress} assets={assets} />
}

function ReviewRun({ pack, part, row, progress, assets }) {
  const { t, lang: uiLang } = useT()
  const lang = contentLang(pack.content, uiLang)
  const oneLang = Array.isArray(pack.content.langs) && pack.content.langs.length === 1
  const { me } = useAuth()
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
  const back = `/p/${pack.slug}`

  useEffect(() => { stopSpeaking(); top.current?.scrollIntoView?.({ block: 'start' }) }, [at, finished])

  // Arrow keys move between slides (Right only once the question is answered).
  useEffect(() => {
    if (finished) return undefined
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName)) return
      if (e.key === 'ArrowRight') document.getElementById('review-next')?.click()
      if (e.key === 'ArrowLeft') document.getElementById('review-back')?.click()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finished])

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
    const rows = { ...Object.fromEntries((progress || []).map((g) => [g.part, g])), [part.id]: { done: true } }
    const next = nextPart(pack.content, rows)
    const label = next ? partLabels(pack.content, t)[next.id] : ''
    return (
      <div ref={top}>
        <DoneScreen stars={starsFor(score)} title={next ? t('reviewDone') : t('packDone')} whole={!next}
          line={total ? t('rightFirst', { n: right, total }) : ''}
          notices={[!student && { text: t('preview') }, saveFailed && { tone: 'bad', text: t('notSaved') }]}
          actions={[
            next && { to: partPath(pack.slug, next), main: true, icon: <Pencil className="h-6 w-6" />, label: t('next_', { part: label }) },
            { to: student ? '/' : back, main: !next, icon: <Home className="h-6 w-6" />, label: t('home') },
          ]} />
      </div>
    )
  }

  return (
    <div ref={top} className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b-2 border-pra-line bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
          <CloseButton to={back} label={t('back')} />
          <div className="flex flex-1 items-center gap-3">
            <Bar value={(at + 1) / slides.length} className="h-4 flex-1" role="progressbar" aria-valuemin={1} aria-valuemax={slides.length} aria-valuenow={at + 1} />
            <span className="text-sm font-extrabold tabular-nums text-pra-ink-soft">{at + 1} / {slides.length}</span>
          </div>
          {!oneLang && <LangSwitch />}
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-4 px-4 py-5">
        {!student && <Notice>{t('preview')}</Notice>}
        <div className="card p-4 sm:p-8"><Slide key={at} slide={slide} lang={lang} assets={assets} meta={pack.content.assets} /></div>
        {slide.check && <Check key={`${at}:${slide.check.id}`} check={slide.check} lang={lang} solved={!!items[slide.check.id]} onSolved={solved} />}
        {saveFailed && <Notice tone="bad">{t('notSaved')}</Notice>}
      </main>

      <footer className="sticky bottom-0 z-20 border-t-2 border-pra-line bg-white">
        {!answered && <p className="mx-auto max-w-5xl px-4 pt-2 text-center text-sm font-bold text-pra-ink-soft" role="status">{t('answerFirst')}</p>}
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 sm:gap-3">
          <button id="review-back" type="button" className="btn-icon h-14 w-14" onClick={() => setAt(Math.max(0, at - 1))} disabled={at === 0} aria-label={t('back')}>
            <ChevronLeft className="h-7 w-7" strokeWidth={3} />
          </button>
          {/* Listen reads this slide's title and main text in English. */}
          <div className="flex flex-1 justify-center"><ListenButton key={at} text={slideWords(slide)} className="min-h-[56px] px-4" /></div>
          <button id="review-next" type="button" className="btn-primary btn-big min-w-[132px] shrink-0 px-5 sm:min-w-[150px]" onClick={goNext} disabled={!answered}>
            {isLast ? t('done') : t('next')} <ChevronRight className="h-6 w-6" strokeWidth={3} />
          </button>
        </div>
      </footer>
    </div>
  )
}

/** A slide's title and main text in English, for Listen (notes and pictures are left out). */
function slideWords(slide) {
  const en = (o, k) => (o ? o[k] ?? o[`${k}En`] : undefined)
  return [
    en(slide, 'title'), en(slide, 'objective') || en(slide, 'subtitle'), en(slide, 'text'), en(slide, 'sub'), en(slide, 'content'),
    en(slide, 'example'), en(slide.card, 'text'),
    ...(Array.isArray(slide.steps) ? slide.steps.map((x) => en(x, 'text')) : []),
    ...(Array.isArray(slide.columns) ? slide.columns.flatMap((c) => [en(c, 'heading'), en(c, 'content')]) : []),
    ...(Array.isArray(slide.items) ? slide.items.map((x) => (typeof x === 'string' ? x : [en(x, 'term'), en(x, 'text')].filter(Boolean).join(': '))) : []),
    en(slide, 'caption'),
  ].filter((x) => typeof x === 'string' && x.trim())
}
