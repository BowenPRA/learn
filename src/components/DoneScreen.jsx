import { Link } from 'react-router-dom'
import { PartyPopper } from 'lucide-react'
import { Notice, Stars } from './ui.jsx'
import { useT } from '../lib/i18n.jsx'

// The screen at the end of a part or of a whole lesson: stars from first-try
// answers, a few kind words in English and Vietnamese (both, so the English is
// always there to read), and the next thing to do.

const CHEER = {
  3: ['Brilliant! You got almost everything right the first time.', 'Tuyệt vời! Em làm đúng gần hết ngay lần đầu.'],
  2: ['Good work! You are getting there.', 'Em làm tốt lắm! Em sắp nắm chắc bài rồi.'],
  1: ['You finished! Every try helps you learn.', 'Em đã làm xong! Mỗi lần thử giúp em học thêm.'],
}
const WHOLE = ['You finished every part of this lesson. Well done!', 'Em đã làm xong tất cả các phần của bài. Giỏi lắm!']

/**
 * stars: 0-3; title: big heading; line: e.g. "7 of 8 right the first time";
 * whole: the whole lesson is done; actions: [{ to, onClick, label, icon, main }];
 * notices: extra lines (preview, not saved).
 */
export default function DoneScreen({ stars, title, line, whole = false, actions = [], notices = [] }) {
  const { t } = useT()
  const [en, vn] = whole ? WHOLE : CHEER[Math.max(1, stars)]
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center gap-5 px-4 py-10 text-center">
      <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-pra-sun-pale motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-500">
        <PartyPopper className="h-12 w-12 text-pra-sun-deep" strokeWidth={2.2} aria-hidden />
      </span>
      <Stars n={stars} size="h-14 w-14" label={t('stars', { n: stars })} />
      <h1 className="text-3xl font-extrabold leading-tight text-pra-ink sm:text-4xl">{title}</h1>
      {line && <p className="text-xl font-bold text-pra-ink-soft">{line}</p>}
      <div className="w-full rounded-3xl border-2 border-pra-green-tint bg-pra-green-pale px-5 py-4">
        <p className="text-lg font-extrabold text-pra-green-dark" lang="en">{en}</p>
        <p className="lang-vi mt-1 text-base font-semibold text-pra-green-dark" lang="vi">{vn}</p>
      </div>
      {notices.filter(Boolean).map((n, i) => <Notice key={i} tone={n.tone}>{n.text}</Notice>)}
      <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
        {actions.filter(Boolean).map((a) => {
          const cls = `${a.main ? 'btn-green' : 'btn-soft'} btn-big flex-1`
          const body = <>{a.icon} {a.label}</>
          return a.to
            ? <Link key={a.label} to={a.to} className={cls}>{body}</Link>
            : <button key={a.label} type="button" className={cls} onClick={a.onClick}>{body}</button>
        })}
      </div>
    </div>
  )
}
