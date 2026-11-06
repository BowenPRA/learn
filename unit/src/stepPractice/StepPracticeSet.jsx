import { useMemo, useState } from 'react';
import { Construction } from 'lucide-react';
import ItemRunner from './ItemRunner.jsx';
import { QuestionCard } from './parts.jsx';
import { txt } from './model';
import { summaryOf, queueOf } from './progress';
import { words } from './words';

/**
 * A whole step-practice set, with no host around it: no login, no XP, no top
 * bar. The host gives the language and what was saved, and hears back:
 *
 *   set       the unit's `stepPractice` ({ title, items, big?, signed? })
 *   lang      'en' | 'vn' | 'fr'
 *   saved     the blob saved last time: { [itemId]: 1 } — items done without help
 *   onSave    (summary) after every finished item   — summary = { score, blob, items, done, total }
 *   onFinish  (summary) when the last item's Next is pressed
 *   onPos     (pos, total) when the item in hand changes (for a host's progress bar)
 *
 * Items already in `saved` are left out of the run, so a student picks up
 * where they stopped; once every item is saved the whole set runs again.
 */
export default function StepPracticeSet({ set, lang = 'en', saved = {}, onSave, onFinish, onPos }) {
  const t = words(lang);
  const items = useMemo(() => (set?.items || []).filter((it) => it?.id && it.steps?.length), [set]);
  const queue = useMemo(() => queueOf(items, saved), [items, saved]);
  const [pos, setPos] = useState(0);
  const [results, setResults] = useState({});   // this sitting: { [itemId]: { score, helped, slipped } }

  if (!queue.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <Construction className="w-10 h-10 text-slate-400 mb-3" strokeWidth={2.5} />
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">{t.noItems}</h2>
      </div>
    );
  }

  const item = queue[pos];
  const big = !!set.big;
  const isLast = pos === queue.length - 1;
  const done = (r) => {
    const next = { ...results, [item.id]: r };
    setResults(next);
    onSave?.(summaryOf(items, saved, next));
  };
  const goNext = () => {
    if (isLast) { onFinish?.(summaryOf(items, saved, results)); return; }
    setPos(pos + 1);
    onPos?.(pos + 1, queue.length);
  };
  const newLevel = pos === 0 || queue[pos - 1].level !== item.level;
  const sum = summaryOf(items, saved, results);

  return (
    <ItemRunner key={item.id} item={item} lang={lang} big={big} signed={!!set.signed} isLast={isLast} onDone={done} onNext={goNext}
      left={(finished) => (
        <QuestionCard item={item} lang={lang} prompt={txt(item, 'prompt', lang)} done={finished} big={big}
          how={newLevel ? (big ? t.howBig : t.how)[item.level] : null}
          doneText={`${sum.done} / ${sum.total} ${t.solved}`} />
      )} />
  );
}
