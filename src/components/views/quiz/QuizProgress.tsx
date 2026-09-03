import React from 'react';
import { BackHeader } from '../../common/BackHeader';

interface QuizProgressProps {
  step: number;
  total: number;
  onBack: () => void;
}

/** Sticky quiz header: back arrow, one pill per question (active pill is wider) and a "2 of 5" counter (H1). */
export const QuizProgress: React.FC<QuizProgressProps> = ({ step, total, onBack }) => (
  <BackHeader onBack={onBack} className="px-5 pt-4 pb-2 sticky top-0 bg-slate-50/95 backdrop-blur-md z-30">
    <div
      className="flex items-center gap-1.5"
      role="progressbar"
      aria-label={`Question ${step + 1} of ${total}`}
      aria-valuemin={1}
      aria-valuenow={step + 1}
      aria-valuemax={total}
    >
      {Array.from({ length: total }, (_, idx) => (
        <span
          key={idx}
          className={`h-1.5 rounded-full transition-all duration-200 ${
            idx === step ? 'w-6 bg-indigo-600' : idx < step ? 'w-2 bg-indigo-600' : 'w-2 bg-slate-200'
          }`}
        />
      ))}
      <span className="text-[12px] font-medium text-slate-500 ml-1.5 tabular-nums" aria-hidden>
        {step + 1}/{total}
      </span>
    </div>
  </BackHeader>
);
