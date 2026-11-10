import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react'
import { pick, useT } from '../lib/i18n.jsx'
import { Inline } from './Rich.jsx'
import { ListenButton } from '../components/Listen.jsx'

// The question a review slide asks (the Dashboard's check shape). A child picks an
// answer; a right one shows why and lets them go on; a wrong one is crossed out,
// shows the explanation and lets them choose again. Only the first answer counts:
// `onSolved({ ok, tries })` fires once, when the right answer is found.
export default function Check({ check, lang, solved, onSolved }) {
  const { t } = useT()
  const [wrong, setWrong] = useState([])
  const [right, setRight] = useState(!!solved)
  const exp = lang === 'vn' ? check.expVn ?? check.exp ?? check.expEn : check.exp ?? check.expEn
  const choose = (val) => {
    if (right || wrong.includes(val)) return
    if (val === check.correct) {
      setRight(true)
      onSolved?.({ ok: wrong.length === 0, tries: wrong.length + 1 })
    } else {
      setWrong((w) => [...w, val])
    }
  }
  const lastWrong = wrong.length > 0 && !right
  const said = useRef(null)
  // After an answer, bring the explanation (and the Next button under it) into view.
  useEffect(() => { if (wrong.length || right) said.current?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' }) }, [wrong.length, right])

  return (
    <section className="rounded-3xl border-2 border-pra-blue-tint bg-pra-blue-pale p-4 shadow-edge-blue sm:p-6" aria-live="polite">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow flex items-center gap-2 text-pra-blue"><HelpCircle className="h-4 w-4" strokeWidth={3} /> {t('quickCheck')}</p>
        {/* Read aloud in English: the question, then each answer with its letter. */}
        <ListenButton text={[check.q ?? check.qEn, ...(check.options || []).map((o) => `${o.val}: ${o.text ?? o.textEn ?? ''}`)]} />
      </div>
      <p className="mb-4 text-xl font-extrabold leading-snug text-pra-ink sm:text-2xl"><Inline text={pick(check, 'q', lang)} /></p>
      <div className="grid gap-3 sm:grid-cols-2">
        {(check.options || []).map((o) => {
          const isRight = right && o.val === check.correct
          const isWrong = wrong.includes(o.val)
          const cls = isRight
            ? 'border-pra-green-deep bg-pra-green-pale text-pra-green-dark shadow-[0_3px_0_#2F7D14]'
            : isWrong
              ? 'border-pra-coral bg-pra-coral-pale text-pra-coral-deep line-through decoration-2'
              : right
                ? 'border-pra-line bg-white text-slate-400'
                : 'border-pra-line bg-white text-pra-ink shadow-edge hover:border-pra-blue hover:shadow-[0_3px_0_#116DFF] active:translate-y-[3px] active:shadow-none'
          return (
            <button key={o.val} type="button" onClick={() => choose(o.val)} disabled={right || isWrong}
              className={`flex min-h-[60px] items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-lg font-bold transition duration-100 ${cls}`}>
              {isRight ? <CheckCircle2 className="h-8 w-8 shrink-0" /> : isWrong ? <XCircle className="h-8 w-8 shrink-0" /> : (
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-pra-line text-sm font-extrabold text-pra-ink-soft">{o.val}</span>
              )}
              <Inline text={pick(o, 'text', lang)} />
            </button>
          )
        })}
      </div>
      {(right || lastWrong) && (
        <div ref={said} className={`mt-4 scroll-mb-28 rounded-2xl border-2 px-4 py-3 text-lg font-semibold motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200 ${right ? 'border-pra-green-tint bg-pra-green-pale text-pra-green-dark' : 'border-[#F9CFC6] bg-pra-coral-pale text-[#A8321F]'}`}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="font-extrabold">{right ? t('right') : t('notQuite')}</p>
            <ListenButton key={`${right}:${wrong.length}`} text={check.exp ?? check.expEn} />
          </div>
          {exp && <p className="mt-1"><Inline text={exp} /></p>}
        </div>
      )}
    </section>
  )
}
