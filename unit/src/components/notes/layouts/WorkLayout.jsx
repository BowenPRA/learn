// `work`: a worked example written like a notebook page (Upper Secondary Maths 1,
// 22 November 2026). One column: the hook line, then a picture of the step if the
// slide has one (`groups`: an expression's terms sorted into x terms and numbers;
// `expand`: { a, b } for the arrows of a(x + b)), then the working, which steps
// (`work`, see utils/working.js), then the notes. A check or a typed question sits in
// the side panel as on any layout.
import { Note, HeaderBar, Reveal } from './primitives.jsx';
import { renderContent, toHex } from './helpers.jsx';
import NotebookWorking, { TermGroups, ExpandArrows } from '../../math/NotebookWorking.jsx';

export default function WorkLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx;
  const accent = toHex(s.accent || s.color, '#1cb0f6');
  const content = pick(s.content, s.contentVn, s.contentFr);
  return (
    <>
      <HeaderBar title={pick(s.title, s.titleVn, s.titleFr) || ''} icon={s.icon || 'PenLine'} accent={accent} eyebrow={pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr)} isDisplayMode={isDisplayMode} />
      <div className={`flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-900/50 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-5 lg:p-6'}`}>
        <div className={`mx-auto flex flex-col ${isDisplayMode ? 'max-w-5xl gap-5' : 'max-w-3xl gap-3'}`}>
          {content && <div>{renderContent(content, { isDisplayMode })}</div>}
          {s.groups && <TermGroups expr={s.groups.expr || s.groups} sums={s.groups.sums !== false} chips={s.groups.chips !== false} isDisplayMode={isDisplayMode} />}
          {s.expand && (
            <div className="flex flex-col items-center gap-1">
              {[].concat(s.expand).map((e) => <ExpandArrows key={`${e.a}${e.b}`} a={e.a} b={e.b} isDisplayMode={isDisplayMode} />)}
            </div>
          )}
          {s.work && (
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm px-3 py-3 sm:px-5">
              <NotebookWorking spec={s.work} isDisplayMode={isDisplayMode} />
            </div>
          )}
          {s.notes?.length > 0 && (
            <div className="space-y-3">
              {s.notes.map((note, i) => <Note key={i} note={note} lang={lang} isDisplayMode={isDisplayMode} />)}
            </div>
          )}
          {s.reveal && <Reveal reveal={s.reveal} lang={lang} accent={accent} isDisplayMode={isDisplayMode} />}
        </div>
      </div>
    </>
  );
}
