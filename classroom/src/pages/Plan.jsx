import { ArrowLeft, Printer, Clock, FileDown } from 'lucide-react'

// Print-friendly teacher lesson plan. Reads `lesson.plan`, an optional object
// on each lesson module. All fields are optional — empty sections are skipped.
//   plan = { duration, objective, materials: [..], vocab: [{term, def}],
//            timeline: [{ time, phase, detail }], answers: [{ q, a }], notes,
//            print: [{ label, href, note }] }
// `print` lists files to print for the lesson (a PDF imported with `?url`, so
// Vite fingerprints it — never a hand-written path). It renders as links on
// screen and is hidden on the printed sheet, where a link is useless.
//
// Printed, a plan is one A4 page (PRA's rule for every teacher's plan). The
// print style below is compact: A4 with 12 mm margins, no card padding, and
// the root font at 13px, so every rem-based size and gap in the sheet shrinks
// together and the screen view is untouched. Sections may split across pages
// (a long plan no longer leaves half a page empty); a heading stays with its
// first line and a row or answer never splits. Check with headless Chrome
// (print to PDF).
//
// Copied from BowenPRA/classroom (src/pages/Plan.jsx at 50586cc) on 10 Nov 2026.
// In PRA Learn it opens at /classroom/#/plan/<course>/<slug>, for staff only
// (classroom/main.jsx), and Back returns to the lesson.
const PRINT_CSS = `
@page { size: A4; margin: 12mm; }
@media print {
  html { font-size: 13px; }
  body { background: #fff; }
  .no-print { display: none !important; }
  .sheet { box-shadow: none !important; margin: 0 !important; max-width: none !important; padding: 0 !important; }
  .sheet section { break-inside: auto; margin-bottom: 1rem; }
  .sheet h2 { break-after: avoid; }
  .sheet li, .sheet tr, .sheet dl > div { break-inside: avoid; }
}`

export default function Plan({ lesson, course, onBack }) {
  const plan = lesson.plan || {}
  const color = course?.color || '#1cb0f6'

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 print:bg-white py-6 sm:py-10 print:py-0">
      <style>{PRINT_CSS}</style>

      {/* Screen-only toolbar */}
      <div className="no-print max-w-3xl mx-auto px-4 mb-4 flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-300 hover:text-[#1cb0f6] font-black uppercase tracking-widest text-xs transition-colors">
          <ArrowLeft className="w-4 h-4" strokeWidth={3} /> Back to the lesson
        </button>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b5cf6] text-white rounded-xl font-black uppercase tracking-widest text-xs border-b-4 border-[#7c3aed] active:border-b-0 active:translate-y-1 transition-all">
          <Printer className="w-4 h-4" strokeWidth={2.5} /> Print
        </button>
      </div>

      {/* The sheet */}
      <div className="sheet max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl print:rounded-none shadow-lg px-8 sm:px-12 py-10">
        <div className="border-b-4 pb-4 mb-6" style={{ borderColor: color }}>
          <div className="text-xs font-black uppercase tracking-[0.2em]" style={{ color }}>{course?.title}{course?.teacher && ` · ${course.teacher}`} · {lessonLabel(lesson.unit)}</div>
          <h1 className="text-3xl font-black tracking-tight mt-1">{lesson.title}</h1>
          <div className="flex flex-wrap gap-4 mt-3 text-sm font-bold text-slate-600">
            {plan.duration && <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" strokeWidth={2.5} />{plan.duration}</span>}
          </div>
        </div>

        <Section title="Objective" color={color}>
          <p className="font-medium text-slate-700 leading-relaxed">{plan.objective || lesson.objective || '—'}</p>
        </Section>

        {plan.materials?.length > 0 && (
          <Section title="Materials" color={color}>
            <ul className="list-disc ml-5 space-y-1 text-slate-700 font-medium">
              {plan.materials.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </Section>
        )}

        {plan.print?.length > 0 && (
          <div className="no-print">
            <Section title="To print" color={color}>
              <ul className="space-y-1.5">
                {plan.print.map((f, i) => (
                  <li key={i} className="text-slate-700 font-medium">
                    <a href={f.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-black underline underline-offset-2" style={{ color }}>
                      <FileDown className="w-4 h-4" strokeWidth={2.5} />{f.label}
                    </a>
                    {f.note && <span> — {f.note}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        )}

        {plan.vocab?.length > 0 && (
          <Section title="Key vocabulary" color={color}>
            <dl className="space-y-1.5">
              {plan.vocab.map((v, i) => (
                <div key={i} className="flex gap-2 text-slate-700">
                  <dt className="font-black shrink-0">{v.term}</dt>
                  <dd className="font-medium">— {v.def}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {plan.timeline?.length > 0 && (
          <Section title="Lesson flow" color={color}>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {plan.timeline.map((row, i) => (
                  <tr key={i} className="border-b border-slate-200 align-top">
                    <td className="py-2 pr-3 font-black whitespace-nowrap" style={{ color }}>{row.time}</td>
                    <td className="py-2 pr-3 font-black text-slate-800 whitespace-nowrap">{row.phase}</td>
                    <td className="py-2 font-medium text-slate-600">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {plan.answers?.length > 0 && (
          <Section title="Answer key" color={color}>
            <ol className="space-y-1.5">
              {plan.answers.map((a, i) => (
                <li key={i} className="text-slate-700">
                  <span className="font-bold">{a.q}</span> <span className="font-black" style={{ color }}>{a.a}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {plan.notes && (
          <Section title="Teacher notes" color={color}>
            <p className="font-medium text-slate-700 leading-relaxed whitespace-pre-line">{plan.notes}</p>
          </Section>
        )}
      </div>
    </div>
  )
}

// "Lesson 5.2" for a book section; a teacher lesson numbered in its unit
// (meta.unit '5 · Lesson 3', folder U05_L3) reads "Unit 5 · Lesson 3".
function lessonLabel(unit) {
  const m = /^(\d+) · Lesson (\d+)$/.exec(unit)
  return m ? `Unit ${m[1]} · Lesson ${m[2]}` : `Lesson ${unit}`
}

function Section({ title, color, children }) {
  return (
    <section className="mb-6 break-inside-avoid">
      <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-2" style={{ color }}>{title}</h2>
      {children}
    </section>
  )
}
