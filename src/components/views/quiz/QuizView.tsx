import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { QuizAnswers } from '../../../types';
import { QUIZ_QUESTIONS } from '../../../data/mockData';
import { PageShell } from '../../common/PageShell';
import { Button } from '../../common/Button';
import { VitoMascot } from '../../common/VitoMascot';
import { QuizProgress } from './QuizProgress';
import { SingleChoiceList } from './SingleChoiceList';
import { MultiChoiceGrid, NOT_SURE } from './MultiChoiceGrid';

interface QuizViewProps {
  /** Pre-filled answers (e.g. from the saved profile when retaking). */
  initialAnswers?: QuizAnswers;
  /** Back from the first question. Wired to browser history in App. */
  onBack: () => void;
  onCompleteQuiz: (answers: QuizAnswers) => void;
}

/**
 * Assessment wizard. Owns step index and answers; renders one question at a time.
 * Elements: QuizProgress (header), badge + heading, SingleChoiceList | MultiChoiceGrid, sticky footer CTA.
 */
export const QuizView: React.FC<QuizViewProps> = ({ initialAnswers = {}, onBack, onCompleteQuiz }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);

  const question = QUIZ_QUESTIONS[step];
  const isLast = step === QUIZ_QUESTIONS.length - 1;
  const current = answers[question.id];
  const selectedIds = Array.isArray(current) ? current : [];
  const selectedCount = Array.isArray(current) ? current.length : current ? 1 : 0;

  const setAnswer = (value: string | string[]) => setAnswers((prev) => ({ ...prev, [question.id]: value }));

  const toggleMulti = (optionId: string) => {
    const withoutNotSure = selectedIds.filter((id) => id !== NOT_SURE);
    setAnswer(
      withoutNotSure.includes(optionId) ? withoutNotSure.filter((id) => id !== optionId) : [...withoutNotSure, optionId]
    );
  };

  const next = () => (isLast ? onCompleteQuiz(answers) : setStep((s) => s + 1));
  const back = () => (step > 0 ? setStep((s) => s - 1) : onBack());

  const ctaLabel =
    question.type === 'multi' && selectedCount > 0
      ? `Continue (${selectedCount} selected)`
      : isLast
      ? 'View findings'
      : 'Continue';

  return (
    <PageShell className="relative pb-28 shadow-sm">
      <QuizProgress step={step} total={QUIZ_QUESTIONS.length} onBack={back} />

      <main className="flex-1 px-5 pt-2 pb-6 overflow-y-auto no-scrollbar">
        {/* Mascot badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 pl-1.5 pr-3 py-1 rounded-full shadow-xs mb-4">
          <VitoMascot size="sm" animate={false} />
          <span className="text-[12px] font-semibold text-slate-600">{question.badge}</span>
        </div>

        {/* Question */}
        <section className="mb-6 space-y-1">
          <h1 className="text-[26px] leading-[32px] font-bold text-slate-900 tracking-tight">{question.question}</h1>
          {question.helperText && <p className="text-[14px] leading-[21px] text-slate-500">{question.helperText}</p>}
        </section>

        {question.type === 'multi' ? (
          <MultiChoiceGrid
            question={question}
            selectedIds={selectedIds}
            onToggle={toggleMulti}
            onNotSure={() => setAnswer([NOT_SURE])}
          />
        ) : (
          <SingleChoiceList
            options={question.options}
            selectedId={typeof current === 'string' ? current : undefined}
            onSelect={setAnswer}
          />
        )}
      </main>

      {/* Sticky footer CTA */}
      <footer className="fixed bottom-0 max-w-[393px] w-full px-5 pb-8 pt-3 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent z-40">
        <Button disabled={selectedCount === 0} onClick={next}>
          <span>{ctaLabel}</span>
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Button>
      </footer>
    </PageShell>
  );
};
