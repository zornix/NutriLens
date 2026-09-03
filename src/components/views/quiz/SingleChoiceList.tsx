import React from 'react';
import { Check } from 'lucide-react';
import { QuizOption } from '../../../types';

interface SingleChoiceListProps {
  options: QuizOption[];
  selectedId?: string;
  onSelect: (optionId: string) => void;
}

/** Vertical radio-style list: label + detail line + round check indicator. */
export const SingleChoiceList: React.FC<SingleChoiceListProps> = ({ options, selectedId, onSelect }) => (
  <div className="flex flex-col gap-2.5 mb-4">
    {options.map((opt) => {
      const isSelected = selectedId === opt.id;
      return (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelect(opt.id)}
          className={`flex items-center justify-between p-3.5 rounded-xl text-left transition-all duration-150 active:scale-[0.98] ${
            isSelected
              ? 'bg-indigo-50/70 border-2 border-indigo-600 shadow-xs'
              : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
          }`}
        >
          <div className="flex flex-col pr-3">
            <span className={`text-[15px] font-semibold ${isSelected ? 'text-indigo-950' : 'text-slate-900'}`}>
              {opt.label}
            </span>
            {opt.detail && <span className="text-[13px] text-slate-500 mt-0.5">{opt.detail}</span>}
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
            }`}
          >
            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </button>
      );
    })}
  </div>
);
