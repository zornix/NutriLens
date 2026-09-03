import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { Nutrient } from '../../../types';
import { FoodIcon } from '../../common/FoodIcon';

interface NutrientResultCardProps {
  nutrient: Nutrient;
  isAdded: boolean;
  onOpen: () => void;
  onAdd: () => void;
}

/**
 * Summary card for one flagged nutrient. Two independent controls, no nesting:
 * the header is a button that opens the detail page; the chip row holds the Add / Added control.
 */
export const NutrientResultCard: React.FC<NutrientResultCardProps> = ({ nutrient, isAdded, onOpen, onAdd }) => (
  <article className="bg-white rounded-xl shadow-xs border border-slate-200 flex flex-col overflow-hidden">
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${nutrient.name}: ${nutrient.categoryTag}. Open details`}
      className="w-full text-left p-4 pb-3 flex items-start justify-between gap-2 hover:bg-slate-50 active:bg-slate-100 transition-colors"
    >
      <span className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-[18px] font-bold">
          {nutrient.symbol}
        </span>
        <span>
          <span className="flex items-center gap-2">
            <span className="text-[17px] font-bold text-slate-900">{nutrient.name}</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
              {nutrient.categoryTag}
            </span>
          </span>
          <span className="block text-[13px] text-slate-500 mt-0.5">{nutrient.whyHeading}</span>
        </span>
      </span>
      <ChevronRight className="w-5 h-5 text-slate-500 shrink-0 mt-1" aria-hidden />
    </button>

    <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-slate-100">
      <ul className="flex flex-wrap items-center gap-1.5" aria-label="Food sources">
        {nutrient.whereToFindIt.slice(0, 3).map((source) => (
          <li
            key={source.name}
            className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700"
          >
            <FoodIcon name={source.icon} className="w-3 h-3" />
            <span>{source.name}</span>
          </li>
        ))}
      </ul>

      {isAdded ? (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[12px] font-medium shrink-0">
          <Check className="w-3.5 h-3.5" aria-hidden />
          Added
        </span>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${nutrient.name} to routine`}
          className="min-h-9 px-2.5 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-[12px] font-semibold transition-colors shrink-0"
        >
          + Add
        </button>
      )}
    </div>
  </article>
);
