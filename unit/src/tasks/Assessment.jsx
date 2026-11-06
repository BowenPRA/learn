import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, XCircle, Clock, BookOpen, Target,
  ChevronRight, ChevronDown, ChevronUp, RefreshCcw, 
  PlayCircle, Award, AlertTriangle, ArrowRight, 
  Check, MapPin, Edit3, GripVertical, CornerDownRight 
} from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';

// --- MATH & TEXT RENDERING UTILITIES ---

const SafeMath = ({ math, block = false, className = "" }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      try {
        const cleanMath = math.replace(/[\u200B-\u200D\uFEFF]/g, '');
        katex.render(cleanMath, containerRef.current, {
          throwOnError: false,
          displayMode: block,
          strict: false,
          output: 'html'
        });
      } catch (err) {
        containerRef.current.textContent = math;
        containerRef.current.className = "text-rose-500 font-mono text-sm px-1";
      }
    }
  }, [math, block]);
  
  return (
    <span 
      ref={containerRef} 
      className={`${block ? "my-3 flex justify-center w-full overflow-x-auto custom-scrollbar text-xl sm:text-2xl" : "mx-0.5 inline-block"} ${className}`} 
    />
  );
};

// A typed blank is matched forgivingly on form, never on content: case, stray
// spaces, and the typeset minus a phone keyboard offers ("−3", "- 3" = "-3").
// The authored `accept` list of alternative answers is honoured too — it was
// being written in the data and never read.
const normBlank = (s) => String(s ?? '')
  .replace(/[−–]/g, '-').trim().toLowerCase().replace(/\s+/g, ' ').replace(/^-\s+/, '-');
const blankMatches = (typed, def) =>
  [def?.correct, ...(def?.accept || [])].some((a) => a != null && normBlank(a) === normBlank(typed));

const parseText = (text) => {
  if (!text || typeof text !== 'string') return null;
  // strictly match ONLY block-style delimiters ($$) to prevent syntax bleeding 
  // into standard currency values (e.g., "$20 sign-up fee")
  const parts = text.split(/(\$\$[\s\S]+?\$\$)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      return <SafeMath key={i} math={part.slice(2, -2).trim()} block={false} className="text-[1.15em] mx-1" />;
    }
    return <span key={i} className="whitespace-pre-line">{part}</span>;
  });
};

// --- QUESTION TYPE RENDERERS ---

const MCQQuestion = ({ question, value, onChange, isReviewing }) => {
  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {(question.options || []).map((opt) => {
        const isSelected = value === opt.val;
        const isCorrectOption = opt.val === question.correct;
        
        let containerStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-[0_4px_0_0_#e2e8f0] dark:shadow-[0_4px_0_0_#334155] hover:bg-slate-50 dark:hover:bg-slate-700/50 active:translate-y-[4px] active:shadow-none";
        let markerStyle = "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 group-hover:border-slate-400";
        
        if (isReviewing) {
          if (isCorrectOption) {
            containerStyle = "bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border-[#58A700] shadow-[0_4px_0_0_#46A802]";
            markerStyle = "border-[#58A700] bg-[#58A700] text-white";
          } else if (isSelected && !isCorrectOption) {
            containerStyle = "bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] shadow-[0_4px_0_0_#C5221F]";
            markerStyle = "border-[#EA4335] bg-[#EA4335] text-white";
          } else {
            containerStyle = "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60";
          }
        } else if (isSelected) {
          containerStyle = "bg-[#1CB0F6]/10 border-[#1CB0F6] shadow-[0_4px_0_0_#1899D6] translate-y-0 active:translate-y-[4px] active:shadow-none";
          markerStyle = "border-[#1CB0F6] bg-[#1CB0F6] text-white";
        }

        return (
          <button
            key={opt.val}
            onClick={() => !isReviewing && onChange(opt.val)}
            disabled={isReviewing}
            className={`relative w-full p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 ease-out flex items-center group ${containerStyle}`}
          >
            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 transition-colors shadow-sm ${markerStyle}`}>
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white transition-transform ${(isSelected || (isReviewing && isCorrectOption)) ? 'scale-100' : 'scale-0'}`} />
            </div>
            <div className={`font-bold text-base sm:text-lg lg:text-xl ${isReviewing && isCorrectOption ? 'text-[#3E7500] dark:text-[#a3e635]' : isReviewing && isSelected ? 'text-[#A32D23] dark:text-[#f87171]' : 'text-slate-700 dark:text-slate-200'}`}>
              {parseText(opt.text.replace(/^[A-D]\.\s*/, ''))}
            </div>
            {isReviewing && isCorrectOption && <CheckCircle2 className="w-6 h-6 ml-auto text-[#58A700] shrink-0" strokeWidth={3} />}
            {isReviewing && isSelected && !isCorrectOption && <XCircle className="w-6 h-6 ml-auto text-[#EA4335] shrink-0" strokeWidth={3} />}
          </button>
        );
      })}
    </div>
  );
};

const InlineQuestion = ({ question, value, onChange, isReviewing }) => {
  const currentAnswers = value || {};
  
  const handleSelect = (blankIndex, val) => {
    onChange({ ...currentAnswers, [blankIndex]: val });
  };

  return (
    <div className="text-slate-700 dark:text-slate-200 text-lg sm:text-xl lg:text-2xl font-medium leading-[2.5] sm:leading-[2.5] lg:leading-[2.5] animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
      {(question.textParts || []).map((part, i) => {
        const blankIndex = (i + 1).toString();
        const blankDef = question.blanks?.[blankIndex];
        const selectedVal = currentAnswers[blankIndex] || '';

        let selectStyle = selectedVal 
          ? 'bg-[#1CB0F6]/10 border-[#1CB0F6] text-[#1CB0F6] shadow-[0_3px_0_0_#1899D6]' 
          : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-500 shadow-[0_3px_0_0_#cbd5e1] dark:shadow-[0_3px_0_0_#475569] hover:border-slate-400';
        let showCorrection = false;

        if (isReviewing && blankDef) {
          const isCorrect = selectedVal === blankDef.correct;
          if (isCorrect) {
            selectStyle = 'bg-[#D7FFD7] dark:bg-[#D7FFD7]/20 border-[#58A700] text-[#3E7500] dark:text-[#a3e635] shadow-[0_3px_0_0_#46A802]';
          } else {
            selectStyle = 'bg-[#FFE5E5] dark:bg-[#FFE5E5]/10 border-[#EA4335] text-[#A32D23] dark:text-[#f87171] shadow-[0_3px_0_0_#C5221F]';
            showCorrection = true;
          }
        }

        return (
          <React.Fragment key={i}>
            {parseText(part)}
            {blankDef && (
              <span className="inline-flex items-center mx-2 align-middle -mt-1.5">
                <div className="relative inline-block">
                  <select
                    value={selectedVal}
                    onChange={(e) => handleSelect(blankIndex, e.target.value)}
                    disabled={isReviewing}
                    className={`appearance-none font-bold outline-none cursor-pointer pr-10 pl-4 py-2 rounded-xl border-2 transition-all ${selectStyle}`}
                  >
                    <option value="" disabled>{isReviewing ? 'Blank' : '...'}</option>
                    {(blankDef.options || []).map((opt) => (
                      <option key={opt.val} value={opt.val}>{opt.text}</option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-3 top-[45%] -translate-y-1/2 w-5 h-5 pointer-events-none ${selectedVal ? 'text-current' : 'text-slate-400'}`} strokeWidth={3} />
                </div>
                {showCorrection && (
                  <span className="ml-2 px-3 py-1 rounded-lg text-sm font-black tracking-widest uppercase bg-[#D7FFD7] text-[#3E7500] border-2 border-[#58A700] shadow-sm">
                    {blankDef.options.find(o => o.val === blankDef.correct)?.text}
                  </span>
                )}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const DndQuestion = ({ question, value, onChange, isReviewing }) => {
  const [selectedBankItem, setSelectedBankItem] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const placements = value || {}; 
  
  const placedItemVals = Object.values(placements).flat();
  const availableBank = (question.bank || []).filter(item => !placedItemVals.includes(item.val));

  const handleBankClick = (item) => {
    if (isReviewing) return;
    if (selectedBankItem?.val === item.val) setSelectedBankItem(null);
    else setSelectedBankItem(item);
  };

  const handleTargetClick = (targetId) => {
    if (isReviewing || !selectedBankItem) return;
    const currentTargetItems = placements[targetId] || [];
    onChange({ ...placements, [targetId]: [...currentTargetItems, selectedBankItem.val] });
    setSelectedBankItem(null);
  };

  const handleRemoveFromTarget = (targetId, itemVal) => {
    if (isReviewing) return;
    const currentTargetItems = placements[targetId] || [];
    onChange({ ...placements, [targetId]: currentTargetItems.filter(val => val !== itemVal) });
    if (selectedBankItem?.val === itemVal) setSelectedBankItem(null);
  };

  const handleDragStart = (e, item) => {
    if (isReviewing) return;
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.val);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (isReviewing || !draggedItem) return;
    const newPlacements = { ...placements };
    Object.keys(newPlacements).forEach(tId => {
      newPlacements[tId] = newPlacements[tId].filter(val => val !== draggedItem.val);
    });

    const currentTargetItems = newPlacements[targetId] || [];
    newPlacements[targetId] = [...currentTargetItems, draggedItem.val];
    onChange(newPlacements);
    setDraggedItem(null);
    setSelectedBankItem(null);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {!isReviewing && (
        <div className="bg-[#1CB0F6]/10 border-2 border-[#1CB0F6]/30 rounded-xl p-3 flex items-center text-[#1899D6] text-xs sm:text-sm font-black uppercase tracking-widest shadow-sm">
          <Target className="w-5 h-5 mr-3 shrink-0" strokeWidth={2.5} />
          Drag an item or tap to select, then tap an empty box to place it.
        </div>
      )}

      {!isReviewing && (
        <div className="bg-slate-100 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 border-dashed rounded-2xl p-4 sm:p-6 min-h-[120px] flex flex-wrap gap-3 items-center justify-center shadow-inner">
          {availableBank.length === 0 ? (
            <span className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center">
              <Check className="w-5 h-5 mr-2" /> All items placed
            </span>
          ) : (
            availableBank.map(item => (
              <button
                key={item.id}
                onClick={() => handleBankClick(item)}
                draggable={!isReviewing}
                onDragStart={(e) => handleDragStart(e, item)}
                className={`
                  flex items-center px-4 sm:px-5 py-3 rounded-xl border-2 font-bold transition-all duration-200 ease-out cursor-grab active:cursor-grabbing
                  ${selectedBankItem?.val === item.val 
                    ? 'bg-[#1CB0F6] border-[#1899D6] text-white shadow-[0_4px_0_0_#1899D6] scale-105' 
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-[0_4px_0_0_#cbd5e1] dark:shadow-[0_4px_0_0_#475569] hover:-translate-y-1 hover:shadow-[0_6px_0_0_#cbd5e1] dark:hover:shadow-[0_6px_0_0_#475569] active:translate-y-[4px] active:shadow-none'}
                `}
              >
                <GripVertical className="w-4 h-4 mr-2 opacity-40" strokeWidth={3} />
                {parseText(item.text)}
              </button>
            ))
          )}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {(question.targets || []).map(target => {
          const placedVals = placements[target.id] || [];
          const isTargetActive = !!selectedBankItem && !isReviewing;

          return (
            <div 
              key={target.id}
              onClick={() => handleTargetClick(target.id)}
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
              onDrop={(e) => handleDrop(e, target.id)}
              className={`
                relative flex flex-col sm:flex-row items-stretch bg-white dark:bg-slate-800 rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-sm
                ${isTargetActive ? 'border-[#1CB0F6] cursor-pointer ring-4 ring-[#1CB0F6]/20 shadow-lg scale-[1.01]' : 'border-slate-200 dark:border-slate-700'}
              `}
            >
              <div className="bg-slate-50 dark:bg-slate-900 border-b-2 sm:border-b-0 sm:border-r-2 border-slate-200 dark:border-slate-700 p-4 flex items-center justify-center sm:w-1/3 shrink-0">
                <span className="font-black text-slate-500 dark:text-slate-400 text-center uppercase tracking-widest text-sm">
                  {parseText(target.title)}
                </span>
              </div>
              
              <div className="flex-1 p-4 min-h-[90px] flex flex-wrap gap-2 items-center bg-slate-50/30 dark:bg-slate-800/30">
                {placedVals.length === 0 && !isReviewing && (
                  <div className={`flex items-center justify-center w-full font-black uppercase tracking-widest transition-opacity text-sm ${isTargetActive ? 'text-[#1CB0F6] opacity-100 animate-pulse' : 'text-slate-300 dark:text-slate-600 opacity-50'}`}>
                    <CornerDownRight className="w-5 h-5 mr-2" />
                    {isTargetActive ? 'Tap Here To Place' : 'Drop Items Here'}
                  </div>
                )}
                {placedVals.length === 0 && isReviewing && (
                  <div className="text-rose-400 font-bold text-sm uppercase tracking-widest w-full text-center">Left Blank</div>
                )}
                
                {placedVals.map((val, idx) => {
                  const bankItem = question.bank.find(b => b.val === val);
                  
                  let itemStyle = "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200";
                  let isCorrectInSlot = false;

                  if (isReviewing) {
                    const expectedArr = question.correctSets?.[target.id] || [];
                    isCorrectInSlot = question.type === 'order' ? expectedArr[idx] === val : expectedArr.includes(val);
                    
                    if (isCorrectInSlot) {
                      itemStyle = "bg-[#D7FFD7] border-[#58A700] text-[#3E7500] dark:bg-[#D7FFD7]/20 dark:text-[#a3e635]";
                    } else {
                      itemStyle = "bg-[#FFE5E5] border-[#EA4335] text-[#A32D23] dark:bg-[#FFE5E5]/10 dark:text-[#f87171]";
                    }
                  }

                  return bankItem ? (
                    <button
                      key={val}
                      onClick={(e) => { e.stopPropagation(); handleRemoveFromTarget(target.id, val); }}
                      disabled={isReviewing}
                      className={`group px-4 py-2 rounded-xl border-2 font-bold transition-all shadow-sm flex items-center gap-2 ${itemStyle} ${!isReviewing ? 'hover:border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 active:scale-95' : ''}`}
                    >
                      {parseText(bankItem.text)}
                      {!isReviewing && <XCircle className="w-5 h-5 text-rose-400 opacity-50 group-hover:opacity-100 transition-opacity" />}
                      {isReviewing && isCorrectInSlot && <CheckCircle2 className="w-5 h-5 text-[#58A700]" strokeWidth={3} />}
                      {isReviewing && !isCorrectInSlot && <XCircle className="w-5 h-5 text-[#EA4335]" strokeWidth={3} />}
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FillBlankQuestion = ({ question, value, onChange, isReviewing }) => {
  const currentAnswers = value || {};
  return (
    <div className="text-slate-700 dark:text-slate-200 text-lg sm:text-xl lg:text-2xl font-medium leading-[2.5] bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      {(question.textParts || []).map((part, i) => {
          const blankIndex = (i + 1).toString();
          const blankDef = question.blanks?.[blankIndex];
          const selectedVal = currentAnswers[blankIndex] || '';

          let inputStyle = "border-slate-300 dark:border-slate-600 focus:border-[#1CB0F6] bg-slate-50 dark:bg-slate-800";
          let showCorrection = false;

          if (isReviewing && blankDef) {
            const isCorrect = blankMatches(selectedVal, blankDef);
            if (isCorrect) {
              inputStyle = "border-[#58A700] bg-[#D7FFD7] text-[#3E7500] dark:bg-[#D7FFD7]/20 dark:text-[#a3e635]";
            } else {
              inputStyle = "border-[#EA4335] bg-[#FFE5E5] text-[#A32D23] dark:bg-[#FFE5E5]/10 dark:text-[#f87171]";
              showCorrection = true;
            }
          }

          return (
            <React.Fragment key={i}>
              {parseText(part)}
              {blankDef && (
                <span className="inline-flex items-center">
                  <input 
                    type="text"
                    value={selectedVal}
                    onChange={(e) => onChange({...currentAnswers, [blankIndex]: e.target.value})}
                    disabled={isReviewing}
                    className={`mx-2 w-32 border-b-4 border-t-2 border-x-2 rounded-xl outline-none text-center transition-colors font-bold pb-1 pt-1.5 shadow-sm ${inputStyle}`}
                    placeholder="..."
                  />
                  {showCorrection && (
                    <span className="ml-1 px-3 py-1 rounded-lg text-sm font-black tracking-widest uppercase bg-[#D7FFD7] text-[#3E7500] border-2 border-[#58A700] shadow-sm">
                      {blankDef.correct}
                    </span>
                  )}
                </span>
              )}
            </React.Fragment>
          )
      })}
    </div>
  );
};

const HotSpotQuestion = () => {
  return (
    <div className="w-full p-10 border-4 border-dashed border-slate-300 dark:border-slate-700 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-800/50 shadow-inner">
      <MapPin className="w-16 h-16 mb-4 text-slate-300 dark:text-slate-600" strokeWidth={2} />
      <span className="font-black uppercase tracking-widest text-lg text-slate-500">Interactive Hotspot Map</span>
      <span className="text-sm text-center mt-2 max-w-xs leading-relaxed font-bold">Vector coordinate selection logic currently requires spatial definitions in the configuration.</span>
    </div>
  );
};

// A question's passageId may name one of the assessment's own passages or one
// of the unit's reading passages, so both lists are searched. The assessment's
// win on a shared id. (It used to take the unit's list OR the assessment's, so a
// unit with reading passages silently hid every passage its quiz authored.)
const mergePassages = (...lists) => {
  const seen = new Set();
  return lists.flatMap((l) => (Array.isArray(l) ? l : [])).filter((p) => {
    if (!p?.id || seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
};

// A quiz passage's text is authored either as one string with line breaks or
// as an array of paragraphs (every GED English quiz uses the array). Calling
// .split on the array crashed the quiz on its first passage question.
const passageParagraphs = (text) =>
  (Array.isArray(text) ? text : String(text || '').split('\n')).filter((p) => String(p).trim());

// --- MAIN ASSESSMENT COMPONENT ---

export default function Assessment(props) {
  const { onComplete, onQuit } = props;

  let extractedQuestions = [];
  let extractedTimeLimit = 0;
  let extractedPassages = [];

  if (props.unit?.assessment?.questions && Array.isArray(props.unit.assessment.questions)) {
    extractedQuestions = props.unit.assessment.questions;
    extractedTimeLimit = props.unit.assessment.timeLimit || 0;
    extractedPassages = mergePassages(props.unit.assessment.passages, props.unit.passages);
  } else if (Array.isArray(props.questions)) {
    extractedQuestions = props.questions;
    extractedTimeLimit = props.timeLimit || 0;
    extractedPassages = props.passages || [];
  } else if (props.assessment?.questions && Array.isArray(props.assessment.questions)) {
    extractedQuestions = props.assessment.questions;
    extractedTimeLimit = props.assessment.timeLimit || 0;
    extractedPassages = mergePassages(props.assessment.passages, props.passages);
  } else {
    for (const key in props) {
      if (props[key] && typeof props[key] === 'object') {
        if (Array.isArray(props[key].questions)) {
          extractedQuestions = props[key].questions;
          extractedTimeLimit = props[key].timeLimit || 0;
          extractedPassages = props[key].passages || [];
          break;
        } else if (props[key].assessment && Array.isArray(props[key].assessment.questions)) {
          extractedQuestions = props[key].assessment.questions;
          extractedTimeLimit = props[key].assessment.timeLimit || 0;
          extractedPassages = mergePassages(props[key].assessment.passages, props[key].passages);
          break;
        }
      }
    }
  }

  const [phase, setPhase] = useState('setup');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(extractedTimeLimit);
  // EN/VN, or EN/VN/FR on Year 7 (`langs` from the host); an English-only
  // track (`bilingual: false` in the task registry) gets no toggle.
  const { lang, toggleLang } = useLang({ langs: props.langs, bilingual: props.bilingual });
  // A content twin in the current language — an empty or missing one shows English.
  const twin = (en, vn, fr) => tr(lang, en, vn || en, fr || en);
  
  const [scoreData, setScoreData] = useState(null);
  const [expandedReviewId, setExpandedReviewId] = useState(null);
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);

  // Reset the clock when a different assessment loads. Adjusting state during
  // render rather than in an effect means the first paint already shows the new
  // limit — the effect version rendered the previous unit's clock for a frame.
  const [clockSetFor, setClockSetFor] = useState(extractedTimeLimit);
  if (clockSetFor !== extractedTimeLimit) {
    setClockSetFor(extractedTimeLimit);
    setTimeLeft(extractedTimeLimit);
  }

  // `submitAssessment` is a hoisted function declaration, not a const, so the
  // run-out-of-time branch below can name it despite it being written further
  // down the file. As a `const` it sat in the temporal dead zone at this point
  // and only worked because effects run after the body finishes evaluating.
  useEffect(() => {
    if (phase !== 'testing') return undefined;
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
    // `submitAssessment` is a hoisted function declaration, so there is no
    // temporal dead zone here; the rule only sees that it is written further
    // down the file.
    // eslint-disable-next-line react-hooks/immutability
    if (extractedTimeLimit > 0) submitAssessment();
    return undefined;
  }, [phase, timeLeft, extractedTimeLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!extractedQuestions || extractedQuestions.length === 0) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 font-sans">
        <div className="w-24 h-24 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-white dark:border-slate-800">
          <AlertTriangle className="w-12 h-12 text-rose-500 dark:text-rose-400" strokeWidth={2.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">Assessment Unavailable</h2>
        <p className="text-slate-500 dark:text-slate-400 font-bold mb-8 max-w-sm text-lg leading-relaxed">
          We could not locate any questions for this specific module format.
        </p>
        <button onClick={onQuit} className="px-10 py-5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-slate-50 active:translate-y-[4px] border-b-[6px] active:border-b-[2px] shadow-sm transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const totalQuestions = extractedQuestions.length;
  const currentQ = extractedQuestions[currentIdx];
  const currentPassage = currentQ ? extractedPassages.find(p => p.id === currentQ.passageId) : null;

  const hasGraphic = !!currentQ.inlineSvg || !!currentQ.image || !!currentQ.imageUrl;
  const hasPassage = !!currentPassage;
  const hasLHS = hasGraphic || hasPassage;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
      setActiveGlossaryTerm(null);
    } else {
      submitAssessment();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setActiveGlossaryTerm(null);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    const results = extractedQuestions.map(q => {
      const userAns = answers[q.id];
      let isCorrect = false;

      if (!userAns) return { ...q, isCorrect: false, userAns: null };

      if (q.type === 'mcq') {
        isCorrect = userAns === q.correct;
      } 
      else if (q.type === 'inline' || q.type === 'fill_blank') {
        const blankKeys = Object.keys(q.blanks || {});
        isCorrect = blankKeys.length > 0 && blankKeys.every(k => {
            if (q.type === 'fill_blank') {
                return blankMatches(userAns[k], q.blanks[k]);
            }
            return userAns[k] === q.blanks[k].correct;
        });
      }
      else if (q.type === 'dnd' || q.type === 'order') {
        const targetKeys = (q.targets || []).map(t => t.id);
        isCorrect = targetKeys.length > 0 && targetKeys.every(k => {
          const uArr = userAns[k] || [];
          const cArr = q.correctSets[k] || [];
          if (q.type === 'order') {
            return uArr.length === cArr.length && uArr.every((v, i) => v === cArr[i]);
          } else {
            if (uArr.length !== cArr.length) return false;
            const unmatched = [...cArr];
            for (const val of uArr) {
                const idx = unmatched.indexOf(val);
                if (idx !== -1) unmatched.splice(idx, 1);
                else return false;
            }
            return true;
          }
        });
      }

      if (isCorrect) correctCount++;
      return { ...q, isCorrect, userAns };
    });

    return { correctCount, results };
  };

  // Declared with `function` so the timer effect above can call it — see there.
  function submitAssessment() {
    setScoreData(calculateScore());
    setPhase('review');
    window.scrollTo(0, 0);
  }

  const finishAndExit = () => {
    const scorePct = scoreData.correctCount / totalQuestions;
    const earnedXP = Math.round(scorePct * 20);
    if (typeof onComplete === 'function') onComplete(earnedXP);
  };

  // A timed quiz is the one task that does NOT save on the way out — an
  // unfinished sitting is not a score. So leaving mid-test asks first, because
  // everywhere else in the app the same X now saves.
  const quitTest = () => {
    if (phase === 'testing') {
      const ok = window.confirm(tr(lang,
        'Leave the quiz? This attempt will not be saved.',
        'Thoát bài đánh giá? Lần làm này sẽ không được lưu.',
        'Quitter le quiz ? Cette tentative ne sera pas enregistrée.'));
      if (!ok) return;
    }
    if (typeof onQuit === 'function') onQuit();
  };

  const renderPassageWithGlossary = (text) => {
    if (!text || typeof text !== 'string') return null;
    const parts = text.split(/\{([^}]+)\}/g);
    return parts.map((part, i) => {
      if (i % 2 !== 0) {
        const cleanWord = part.toLowerCase();
        const termData = currentPassage?.glossary?.[cleanWord];
        if (!termData) return <span key={i} className="font-black text-slate-800 dark:text-slate-200">{part}</span>;
        return (
          <button 
            key={i} 
            onClick={() => setActiveGlossaryTerm({ word: part, ...termData })}
            className="text-[#1CB0F6] font-black border-b-[3px] border-dotted border-[#1CB0F6] hover:bg-[#1CB0F6]/10 transition-colors mx-0.5 rounded px-1 active:translate-y-[2px]"
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // --- DERIVE DYNAMIC ANSWERS ---
  const currentAnswer = answers[currentQ?.id];
  let isAnswered = false;
  if (currentQ) {
    if (currentQ.type === 'mcq') isAnswered = !!currentAnswer;
    if (currentQ.type === 'inline' || currentQ.type === 'fill_blank') {
      const totalBlanks = Object.keys(currentQ.blanks || {}).length;
      isAnswered = currentAnswer && Object.keys(currentAnswer).length === totalBlanks && Object.values(currentAnswer).every(v => String(v).trim() !== '');
    }
    if (currentQ.type === 'dnd' || currentQ.type === 'order') {
      let totalTargets = 0;
      (currentQ.targets || []).forEach(t => totalTargets += (currentQ.correctSets?.[t.id]?.length || 1));
      const placedCount = Object.values(currentAnswer || {}).flat().length;
      isAnswered = placedCount === totalTargets;
    }
    if (currentQ.type === 'hot_spot') {
      isAnswered = !!currentAnswer;
    }
  }

  const handleAnswerChange = (val) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 overflow-hidden selection:bg-indigo-100">
      
      <TopBar 
        onQuit={phase === 'review' ? finishAndExit : quitTest}
        quitLabel={phase === 'testing' ? 'Exit' : 'Save & Quit'}
        modeTitle={phase === 'review' ? tr(lang, 'Results', 'Kết Quả', 'Résultats') : tr(lang, 'Assessment Module', 'Bài Đánh Giá', 'Évaluation')}
        current={phase === 'review' ? scoreData?.correctCount : (phase === 'testing' ? currentIdx + 1 : undefined)}
        total={phase === 'setup' ? undefined : totalQuestions}
        progress={phase === 'testing' ? ((currentIdx) / totalQuestions) * 100 : (phase === 'review' ? 100 : undefined)}
        timeLeft={phase === 'testing' ? timeLeft : undefined}
        lang={lang}
        onLangToggle={toggleLang}
      />

      <div className="flex-1 overflow-hidden flex flex-col relative min-h-0 w-full">
        
        {phase === 'setup' && (
          <div className="h-full overflow-y-auto flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full text-center">
            <div className="w-32 h-32 bg-[#1CB0F6]/10 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner border-4 border-[#1CB0F6]/20">
              <Edit3 className="w-16 h-16 text-[#1CB0F6]" strokeWidth={2.5} />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight drop-shadow-sm text-slate-800 dark:text-white">
              {tr(lang, 'Module Ready', 'Sẵn Sàng Chưa?', 'On commence ?')}
            </h1>
            
            <p className="text-lg sm:text-xl font-bold text-slate-500 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
              {tr(lang,
                'Test your knowledge on this module. Answer carefully and review your performance at the end.',
                'Kiểm tra kiến thức của bạn. Trả lời cẩn thận và xem lại kết quả chi tiết ở cuối bài.',
                'Teste tes connaissances. Réponds avec soin et revois tes résultats en détail à la fin.')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 w-full justify-center">
              <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex items-center shadow-sm w-full sm:w-auto">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mr-5 shadow-inner">
                  <Target className="w-7 h-7 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                    {tr(lang, 'Total Questions', 'Tổng câu hỏi', 'Nombre de questions')}
                  </div>
                  <div className="text-3xl font-black text-slate-700 dark:text-white">{totalQuestions}</div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex items-center shadow-sm w-full sm:w-auto">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mr-5 shadow-inner">
                  <Clock className="w-7 h-7 text-amber-500 dark:text-amber-400" strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                    {tr(lang, 'Time Limit', 'Thời gian', 'Temps limite')}
                  </div>
                  <div className="text-3xl font-black font-mono text-slate-700 dark:text-white">
                    {extractedTimeLimit ? formatTime(extractedTimeLimit) : 'None'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <button 
                  onClick={onQuit}
                  className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border-b-[6px] active:border-b-[2px] active:translate-y-[4px] shadow-sm"
              >
                {tr(lang, 'Later', 'Thoát', 'Plus tard')}
              </button>
              <button 
                  onClick={() => setPhase('testing')}
                  className="px-12 py-4 bg-[#58CC02] border-[#46A802] text-white rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-[#46A802] transition-all border-b-[6px] active:border-b-0 active:translate-y-[6px] shadow-sm flex items-center justify-center"
              >
                <PlayCircle className="w-7 h-7 mr-3" />
                {tr(lang, 'Start Assessment', 'Bắt Đầu', 'Commencer')}
              </button>
            </div>
          </div>
        )}

        {phase === 'testing' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0">
              {hasLHS && (
                <div className="flex-none lg:flex-1 w-full lg:w-1/2 h-[40%] min-h-[250px] lg:h-full bg-slate-100 dark:bg-slate-900 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-200 dark:border-slate-800 flex flex-col p-4 sm:p-6 lg:p-10 relative overflow-y-auto custom-scrollbar shrink-0">
                  {hasPassage && (
                    <div className={`w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 sm:p-8 lg:p-10 rounded-3xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mb-6 ${hasGraphic ? 'shrink-0' : ''}`}>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-6 leading-tight">
                        {twin(currentPassage.title, currentPassage.vnTitle, currentPassage.frTitle)}
                      </h2>
                      {currentPassage.meta && (
                        <div className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-xs mb-6">
                          {currentPassage.meta}
                        </div>
                      )}
                      <div className="space-y-4 text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
                        {passageParagraphs(twin(currentPassage.text, currentPassage.vnText, currentPassage.frText)).map((p, i) => (
                          <p key={i}>{renderPassageWithGlossary(p)}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasGraphic && (
                    <div className="w-full h-full max-w-2xl mx-auto flex items-center justify-center bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-2 border-slate-200 dark:border-slate-700 p-4 lg:p-8 overflow-hidden min-h-[250px]">
                      {currentQ.inlineSvg ? (
                        <div className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full drop-shadow-sm" dangerouslySetInnerHTML={{ __html: currentQ.inlineSvg }} />
                      ) : (
                        <img src={currentQ.image || currentQ.imageUrl} alt="Reference" className="max-w-full max-h-full object-contain drop-shadow-sm rounded-xl" />
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className={`flex-1 overflow-y-auto custom-scrollbar flex justify-center bg-white dark:bg-slate-950 ${hasLHS ? 'lg:w-1/2' : 'w-full'}`}>
                <div className={`w-full max-w-4xl p-6 sm:p-8 lg:p-14 flex flex-col min-h-full`}>
                  <div className="mb-8 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 dark:text-white leading-snug tracking-tight">
                      {parseText(currentQ.title)}
                    </h2>
                  </div>

                  <div className="flex-1">
                    {currentQ.type === 'mcq' && <MCQQuestion question={currentQ} value={currentAnswer} onChange={handleAnswerChange} isReviewing={false} />}
                    {currentQ.type === 'inline' && <InlineQuestion question={currentQ} value={currentAnswer} onChange={handleAnswerChange} isReviewing={false} />}
                    {currentQ.type === 'fill_blank' && <FillBlankQuestion question={currentQ} value={currentAnswer} onChange={handleAnswerChange} isReviewing={false} />}
                    {(currentQ.type === 'dnd' || currentQ.type === 'order') && <DndQuestion question={currentQ} value={currentAnswer} onChange={handleAnswerChange} isReviewing={false} />}
                    {currentQ.type === 'hot_spot' && <HotSpotQuestion question={currentQ} value={currentAnswer} onChange={handleAnswerChange} isReviewing={false} />}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 p-4 sm:p-6 z-30 shrink-0 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.02)] relative">
              <button 
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="px-6 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 font-black text-slate-400 uppercase tracking-widest text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              >
                {tr(lang, 'Previous', 'Quay Lại', 'Précédent')}
              </button>

              <button 
                onClick={handleNext}
                disabled={!isAnswered}
                className={`
                  px-10 sm:px-14 py-4 rounded-2xl font-black uppercase tracking-widest text-lg sm:text-xl transition-all border-b-[6px] flex items-center shadow-sm
                  ${isAnswered 
                    ? 'bg-[#1CB0F6] border-[#1899D6] text-white hover:bg-[#159BD9] active:border-b-0 active:translate-y-[6px]' 
                    : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-600 pointer-events-none'}
                `}
              >
                <span className="hidden sm:inline">
                  {currentIdx === totalQuestions - 1 ? tr(lang, 'Submit', 'Nộp Bài', 'Valider') : tr(lang, 'Continue', 'Tiếp Theo', 'Continuer')}
                </span>
                <span className="sm:hidden">
                  {currentIdx === totalQuestions - 1 ? 'Submit' : 'Next'}
                </span>
                {currentIdx !== totalQuestions - 1 && <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 ml-2 -mr-2" strokeWidth={3} />}
              </button>
            </div>
          </div>
        )}

        {phase === 'review' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className={`p-8 sm:p-12 border-b-[6px] text-center text-white shrink-0 ${(scoreData.correctCount / totalQuestions) >= 0.7 ? 'bg-[#58CC02] border-[#46A802]' : 'bg-[#FFC800] border-[#CCA000]'}`}>
                <div className="w-24 h-24 bg-white/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner border-[4px] border-white/30">
                  {(scoreData.correctCount / totalQuestions) >= 0.7 ? <Award className="w-12 h-12" strokeWidth={2.5} /> : <RefreshCcw className="w-12 h-12" strokeWidth={2.5} />}
                </div>
                <h1 className="text-4xl sm:text-6xl font-black mb-3 tracking-tight drop-shadow-md">
                  {(scoreData.correctCount / totalQuestions) >= 0.7 ? tr(lang, 'Outstanding!', 'Tuyệt Vời!', 'Excellent !') : tr(lang, 'Keep Practicing', 'Cần Cố Gắng', 'Encore un effort')}
                </h1>
                <div className="inline-flex items-center bg-black/10 px-6 py-2.5 rounded-2xl font-black text-xl sm:text-3xl mt-2 border border-white/20 shadow-sm">
                  <span className="opacity-90 mr-3">{tr(lang, 'Score:', 'Điểm:', 'Score :')}</span>
                  <span>{scoreData.correctCount} / {totalQuestions}</span>
                </div>
              </div>

              <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-4">
                {scoreData.results.map((res, i) => (
                  <div key={res.id} className={`bg-white dark:bg-slate-900 border-2 rounded-3xl overflow-hidden shadow-sm transition-all ${res.isCorrect ? 'border-slate-200 dark:border-slate-800' : 'border-rose-200 dark:border-rose-900/50'}`}>
                      <button 
                        onClick={() => setExpandedReviewId(expandedReviewId === res.id ? null : res.id)}
                        className={`w-full p-4 sm:p-6 flex items-start gap-4 sm:gap-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${expandedReviewId === res.id ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
                      >
                        <div className={`mt-0.5 shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 shadow-sm ${res.isCorrect ? 'bg-[#58CC02] border-[#D7FFD7] dark:border-[#58A700]/30 text-white' : 'bg-[#EA4335] border-[#FFE5E5] dark:border-[#C5221F]/30 text-white'}`}>
                          {res.isCorrect ? <CheckCircle2 className="w-6 h-6" strokeWidth={3} /> : <XCircle className="w-6 h-6" strokeWidth={3} />}
                        </div>
                        <div className="flex-1">
                          <div className="font-black text-xs sm:text-sm text-slate-400 uppercase tracking-widest mb-1">
                            {tr(lang, 'Question', 'Câu hỏi', 'Question')} {i + 1}
                          </div>
                          <div className="font-bold text-lg sm:text-xl text-slate-700 dark:text-slate-200 leading-relaxed">
                            {parseText(res.title)}
                          </div>
                        </div>
                        <div className="shrink-0 text-slate-400 mt-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                          {expandedReviewId === res.id ? <ChevronUp className="w-6 h-6" strokeWidth={3} /> : <ChevronDown className="w-6 h-6" strokeWidth={3} />}
                        </div>
                      </button>

                      {expandedReviewId === res.id && (
                        <div className="p-4 sm:p-8 lg:p-10 border-t-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-8 shadow-inner">
                          {(res.inlineSvg || res.image || res.imageUrl) && (
                            <div className="w-full max-w-xl mx-auto bg-white dark:bg-slate-800 p-4 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center">
                              {res.inlineSvg ? (
                                <div className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-auto" dangerouslySetInnerHTML={{__html: res.inlineSvg}} />
                              ) : (
                                <img src={res.image || res.imageUrl} alt="Diagram" className="max-w-full h-auto object-contain rounded-xl" />
                              )}
                            </div>
                          )}

                          <div className="max-w-3xl mx-auto">
                            {res.type === 'mcq' && <MCQQuestion question={res} value={res.userAns} isReviewing={true} />}
                            {res.type === 'inline' && <InlineQuestion question={res} value={res.userAns} isReviewing={true} />}
                            {res.type === 'fill_blank' && <FillBlankQuestion question={res} value={res.userAns} isReviewing={true} />}
                            {(res.type === 'dnd' || res.type === 'order') && <DndQuestion question={res} value={res.userAns} isReviewing={true} />}
                          </div>

                          {twin(res.expEn, res.expVn, res.expFr) && (
                            <div className="max-w-3xl mx-auto bg-[#1CB0F6]/10 border-2 border-[#1CB0F6]/30 rounded-3xl p-6 sm:p-8 text-[#1899D6] dark:text-[#38bdf8] shadow-sm">
                              <div className="flex items-center font-black uppercase tracking-widest text-sm mb-4">
                                <BookOpen className="w-6 h-6 mr-3" strokeWidth={3} />
                                {tr(lang, 'Explanation', 'Giải Thích', 'Explication')}
                              </div>
                              <div className="font-bold text-lg sm:text-xl leading-relaxed text-slate-800 dark:text-slate-200">
                                {parseText(twin(res.expEn, res.expVn, res.expFr))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-center z-10 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <button 
                onClick={finishAndExit}
                className="w-full sm:w-auto px-12 py-5 bg-[#1CB0F6] border-[#1899D6] text-white rounded-2xl font-black uppercase tracking-widest text-lg sm:text-xl hover:bg-[#159BD9] transition-all border-b-[6px] active:border-b-0 active:translate-y-[6px] shadow-sm flex items-center justify-center"
              >
                {tr(lang, 'Finish & Continue', 'Hoàn Thành', 'Terminer')} <ArrowRight className="w-7 h-7 ml-3" strokeWidth={3} />
              </button>
            </div>
          </div>
        )}
      </div>

      {activeGlossaryTerm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setActiveGlossaryTerm(null)}>
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border-2 border-slate-200 dark:border-slate-700 p-6 sm:p-8 animate-in zoom-in-95 slide-in-from-bottom-8 sm:slide-in-from-bottom-0" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 capitalize">{activeGlossaryTerm.word}</h3>
              <button onClick={() => setActiveGlossaryTerm(null)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              {twin(activeGlossaryTerm.def, activeGlossaryTerm.vnDef, activeGlossaryTerm.frDef)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}