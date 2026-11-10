// A step-practice task: step-by-step problems in the style of the unit's Workbook pages
// (fresh problems, never the book's), played by the step engine
// (src/stepPractice/StepPracticeSet.jsx) with the tasks' top bar. The engine scores out
// of 10 (a problem done without help counts 1, with help ½). Problems already done are
// skipped next time.
import { useState } from 'react'
import TopBar from '../src/components/TopBar.jsx'
import StepPracticeSet from '../src/stepPractice/StepPracticeSet.jsx'

export default function Workbook({ set, record, langs, title, onSave, onDone, onQuit }) {
  const [lang, setLang] = useState(langs[0] || 'en')
  const [pos, setPos] = useState([0, set?.items?.length || 0])
  const save = (summary, finished) => onSave({ score: summary.score / 10, finished, saved: summary.blob })
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <TopBar onQuit={onQuit} modeTitle={title(lang)} current={pos[0]} total={pos[1]}
        lang={langs.length > 1 ? lang : undefined}
        onLangToggle={langs.length > 1 ? () => setLang(langs[(langs.indexOf(lang) + 1) % langs.length]) : undefined} />
      <main className="flex-1 min-h-0">
        <StepPracticeSet set={set} lang={lang} saved={record?.saved || {}}
          onPos={(p, total) => setPos([p, total])}
          onSave={(summary) => save(summary, false)}
          onFinish={(summary) => { save(summary, true); onDone() }} />
      </main>
    </div>
  )
}
