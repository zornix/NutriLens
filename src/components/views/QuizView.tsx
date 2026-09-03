import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Check,
  Milk,
  Egg,
  Fish,
  Utensils,
  Wheat,
  Leaf,
  Apple,
  Flower2
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/mockData';
import { VitoMascot } from '../common/VitoMascot';

interface QuizViewProps {
  onBackToSplash: () => void;
  onCompleteQuiz: (answers: Record<string, any>) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onBackToSplash, onCompleteQuiz }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({
    q1: 'dining_hall',
    q2: ['eggs', 'fruit', 'nuts_seeds'],
    q3: 'under_30',
    q4: 'once_daily',
    q5: 'winter_fatigue'
  });

  const question = QUIZ_QUESTIONS[currentStepIndex];
  const isLastQuestion = currentStepIndex === QUIZ_QUESTIONS.length - 1;

  // Icon mapping for multi-choice cards with dedicated color chips for recognition over recall (#6)
  const getOptionIcon = (iconName?: string, isSelected?: boolean) => {
    switch (iconName) {
      case 'water_drop':
        return <Milk className="w-5 h-5 text-sky-600" />;
      case 'egg':
        return <Egg className="w-5 h-5 text-amber-500" />;
      case 'fish':
        return <Fish className="w-5 h-5 text-indigo-500" />;
      case 'restaurant':
        return <Utensils className="w-5 h-5 text-rose-500" />;
      case 'grain':
        return <Wheat className="w-5 h-5 text-amber-700" />;
      case 'eco':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'apple':
        return <Apple className="w-5 h-5 text-red-500" />;
      case 'spa':
        return <Flower2 className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const handleSelectSingle = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const handleToggleMulti = (optionId: string) => {
    setAnswers((prev) => {
      const currentList: string[] = Array.isArray(prev[question.id]) ? [...prev[question.id]] : [];
      const exists = currentList.includes(optionId);
      const updated = exists
        ? currentList.filter((id) => id !== optionId)
        : [...currentList, optionId];
      return { ...prev, [question.id]: updated };
    });
  };

  const handleNotSureToggle = () => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: ['not_sure']
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onCompleteQuiz(answers);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      onBackToSplash();
    }
  };

  // Compute selected count for multi-select
  const currentAnswer = answers[question.id];
  const selectedCount = Array.isArray(currentAnswer) ? currentAnswer.length : currentAnswer ? 1 : 0;
  const canContinue = selectedCount > 0;

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center selection:bg-indigo-600 selection:text-white">
      <div className="w-full max-w-[393px] min-h-screen bg-slate-50 flex flex-col relative pb-28 shadow-sm">
        {/* Top Header with Back & Progress Indicator */}
        <header className="px-5 pt-4 pb-2 flex items-center justify-between sticky top-0 bg-slate-50/95 backdrop-blur-md z-30">
          <button
            onClick={handlePrev}
            aria-label="Go back"
            className="w-10 h-10 flex items-center justify-center -ml-2 rounded-lg hover:bg-slate-200/60 active:scale-95 transition-all text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* 5 Progress Dots / Pills */}
          <div className="flex items-center gap-1.5" role="progressbar" aria-valuenow={currentStepIndex + 1}>
            {QUIZ_QUESTIONS.map((_, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;

              return (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-6 bg-indigo-600'
                      : isPast
                      ? 'w-2 bg-indigo-600'
                      : 'w-2 bg-slate-200'
                  }`}
                />
              );
            })}
          </div>

          <div className="w-10 h-10" />
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 px-5 pt-2 pb-6 overflow-y-auto no-scrollbar">
          {/* Mascot Guidance Widget */}
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 pl-1.5 pr-3 py-1 rounded-full shadow-xs mb-4">
            <VitoMascot size="sm" animate={false} />
            <span className="text-[12px] font-semibold text-slate-600">{question.badge}</span>
          </div>

          {/* Heading and Helper Text */}
          <section className="mb-6 space-y-1">
            <h1 className="text-[26px] leading-[32px] font-bold text-slate-900 tracking-tight">
              {question.question}
            </h1>
            {question.helperText && (
              <p className="text-[14px] leading-[21px] text-slate-500">
                {question.helperText}
              </p>
            )}
          </section>

          {/* Layout: Multi-column or Single-column based on question type */}
          {question.type === 'multi' ? (
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-2.5" role="group">
                {question.options.map((opt) => {
                  const isSelected =
                    Array.isArray(currentAnswer) && currentAnswer.includes(opt.id);

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleToggleMulti(opt.id)}
                      className={`group relative flex items-center justify-between min-h-[64px] p-3 text-left rounded-xl transition-all duration-150 active:scale-[0.98] ${
                        isSelected
                          ? 'bg-indigo-50/70 border-2 border-indigo-600 shadow-xs'
                          : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-1">
                        <span
                          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-indigo-100 border border-indigo-200'
                              : 'bg-slate-100/90 border border-slate-200/80'
                          }`}
                        >
                          {getOptionIcon(opt.icon, isSelected)}
                        </span>
                        <span className="text-[13px] leading-[17px] font-medium text-slate-900 line-clamp-2">
                          {opt.label}
                        </span>
                      </div>

                      {/* Checkbox indicator */}
                      <span
                        className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'border border-slate-300 bg-white group-hover:border-slate-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 'I'm not sure' Option */}
              {question.hasUnsureOption && (
                <button
                  type="button"
                  onClick={handleNotSureToggle}
                  className={`w-full min-h-[48px] flex items-center justify-between px-4 py-2.5 rounded-xl border border-dashed transition-colors active:scale-[0.99] ${
                    Array.isArray(currentAnswer) && currentAnswer.includes('not_sure')
                      ? 'bg-indigo-50/70 border-indigo-600 text-indigo-700'
                      : 'border-slate-300 bg-white/70 hover:bg-white text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span className="text-[14px] font-medium">I'm not sure</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              )}

              {/* Slim Educational Insight Card */}
              {question.insightCallout && (
                <aside className="bg-blue-50/80 rounded-xl p-3.5 border border-blue-200/70 flex items-start gap-2.5 mt-4">
                  <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] leading-[19px] text-slate-800">
                    {question.insightCallout.text}
                  </p>
                </aside>
              )}
            </div>
          ) : (
            /* Single Select List Layout */
            <div className="flex flex-col gap-2.5 mb-4">
              {question.options.map((opt) => {
                const isSelected = currentAnswer === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectSingle(opt.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl text-left transition-all duration-150 active:scale-[0.98] ${
                      isSelected
                        ? 'bg-indigo-50/70 border-2 border-indigo-600 shadow-xs'
                        : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col pr-3">
                      <span
                        className={`text-[15px] font-semibold ${
                          isSelected ? 'text-indigo-950' : 'text-slate-900'
                        }`}
                      >
                        {opt.label}
                      </span>
                      {opt.detail && (
                        <span className="text-[13px] text-slate-500 mt-0.5">
                          {opt.detail}
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </main>

        {/* Sticky Footer / Bottom CTA */}
        <footer className="fixed bottom-0 max-w-[393px] w-full px-5 pb-8 pt-3 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent z-40">
          <button
            type="button"
            disabled={!canContinue}
            onClick={handleNext}
            className={`w-full h-[48px] rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 ${
              canContinue
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-500/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>
              {question.type === 'multi' && selectedCount > 0
                ? `Continue (${selectedCount} selected)`
                : isLastQuestion
                ? 'View findings'
                : 'Continue'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
};
