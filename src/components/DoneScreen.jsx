import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { Notice } from './ui.jsx'
import Pip from './Pip.jsx'
import { useT } from '../lib/i18n.jsx'

// The screen at the end of a part or of a whole lesson: Pip cheering, stars from
// first-try answers popping in one by one, a few kind words in English and Vietnamese
// (both, so the English is always there to read), and the next thing to do.

const CHEER = {
  3: ['Brilliant! You got almost everything right the first time.', 'Tuyệt vời! Em làm đúng gần hết ngay lần đầu.'],
  2: ['Good work! You are getting there.', 'Em làm tốt lắm! Em sắp nắm chắc bài rồi.'],
  1: ['You finished! Every try helps you learn.', 'Em đã làm xong! Mỗi lần thử giúp em học thêm.'],
}
const WHOLE = ['You finished every part of this lesson. Well done!', 'Em đã làm xong tất cả các phần của bài. Giỏi lắm!']

// Little dots around Pip (decoration): [left %, top %, colour class, delay ms]
const CONFETTI = [[8, 18, 'bg-pra-sun', 0], [88, 12, 'bg-pra-sky', 300], [16, 70, 'bg-pra-lime', 600], [82, 64, 'bg-pra-coral', 150], [50, 2, 'bg-pra-violet', 450], [94, 40, 'bg-pra-sun', 750]]

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
      <div className="relative px-10 pt-4">
        {CONFETTI.map(([x, y, c, d]) => (
          <span key={`${x}-${y}`} aria-hidden className={`absolute h-3 w-3 rounded-full ${c} motion-safe:animate-sparkle`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}ms` }} />
        ))}
        <Pip wave float mood="happy" size={150} label={t('pipName')} className="motion-safe:animate-in motion-safe:zoom-in-75 motion-safe:duration-500" />
      </div>
      <div className="-mt-2 flex items-end gap-2" role="img" aria-label={t('stars', { n: stars })}>
        {[1, 2, 3].map((i) => (
          <Star key={i}
            className={`${i === 2 ? 'h-16 w-16 -translate-y-2' : 'h-12 w-12'} ${i <= stars ? 'fill-pra-sun text-pra-sun-deep drop-shadow-[0_3px_0_rgba(245,166,35,0.35)]' : 'fill-pra-line text-pra-line'} motion-safe:animate-star-pop`}
            style={{ animationDelay: `${250 + i * 220}ms` }} strokeWidth={2} />
        ))}
      </div>
      <h1 className="text-3xl font-black leading-tight text-pra-ink sm:text-4xl">{title}</h1>
      {line && <p className="text-xl font-bold text-pra-ink-soft">{line}</p>}
      <div className="w-full rounded-3xl border border-pra-green-tint bg-gradient-to-br from-pra-green-pale to-white px-5 py-4 shadow-soft">
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
