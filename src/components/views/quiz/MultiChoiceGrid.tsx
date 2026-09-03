import React from 'react';
import { Check, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { QuizQuestion } from '../../../types';
import { FoodIcon } from '../../common/FoodIcon';

/** Sentinel answer stored when the user picks "I'm not sure". */
export const NOT_SURE = 'not_sure';

interface MultiChoiceGridProps {
  question: QuizQuestion;
  selectedIds: string[];
  onToggle: (optionId: string) => void;
  onNotSure: () => void;
}

/** Two-column checkbox grid with food icons, optional "I'm not sure" row and insight callout. */
export const MultiChoiceGrid: React.FC<MultiChoiceGridProps> = ({ question, selectedIds, onToggle, onNotSure }) => (
  <div className="space-y-3 mb-4">
    <div className="grid grid-cols-2 gap-2.5" role="group" aria-label={question.question}>
      {question.options.map((opt) => {
        const isSelected = selectedIds.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(opt.id)}
            className={`group relative flex items-center justify-between min-h-[64px] p-3 text-left rounded-xl transition-all duration-150 active:scale-[0.98] ${
              isSelected
                ? 'bg-indigo-50/70 border-2 border-indigo-600 shadow-xs'
                : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-1">
              <span
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? 'bg-indigo-100 border border-indigo-200' : 'bg-slate-100/90 border border-slate-200/80'
                }`}
              >
                <FoodIcon name={opt.icon} />
              </span>
              <span className="text-[13px] leading-[17px] font-medium text-slate-900 line-clamp-2">{opt.label}</span>
            </div>
            <span
              className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${
                isSelected ? 'bg-indigo-600 text-white' : 'border border-slate-300 bg-white group-hover:border-slate-400'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden />}
            </span>
          </button>
        );
      })}
    </div>

    {question.hasUnsureOption && (
      <button
        type="button"
        aria-pressed={selectedIds.includes(NOT_SURE)}
        onClick={onNotSure}
        className={`w-full min-h-[48px] flex items-center justify-between px-4 py-2.5 rounded-xl border border-dashed transition-colors active:scale-[0.99] ${
          selectedIds.includes(NOT_SURE)
            ? 'bg-indigo-50/70 border-indigo-600 text-indigo-700'
            : 'border-slate-300 bg-white/70 hover:bg-white text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span className="text-[14px] font-medium">I'm not sure</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-500" />
      </button>
    )}

    {question.insightCallout && (
      <aside className="bg-blue-50/80 rounded-xl p-3.5 border border-blue-200/70 flex items-start gap-2.5 mt-4">
        <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-[13px] leading-[19px] text-slate-800">{question.insightCallout.text}</p>
      </aside>
    )}
  </div>
);
