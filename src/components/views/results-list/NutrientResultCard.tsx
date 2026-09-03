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
 * Summary card for one flagged nutrient: symbol tile, name + status tag, reason line,
 * the first three food sources as chips, and an Add / Added control.
 * The whole card opens the detail screen; the chip row stops propagation so Add doesn't navigate.
 */
export const NutrientResultCard: React.FC<NutrientResultCardProps> = ({ nutrient, isAdded, onOpen, onAdd }) => (
  <article
    onClick={onOpen}
    className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 flex flex-col gap-3 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all"
  >
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-[18px] font-bold">
          {nutrient.symbol}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[17px] font-bold text-slate-900">{nutrient.name}</h3>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
              {nutrient.categoryTag}
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mt-0.5">{nutrient.whyHeading}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
    </div>

    <div className="flex items-center justify-between pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-wrap items-center gap-1.5">
        {nutrient.whereToFindIt.slice(0, 3).map((source) => (
          <div
            key={source.name}
            className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700"
          >
            <FoodIcon name={source.icon} className="w-3 h-3" />
            <span>{source.name}</span>
          </div>
        ))}
      </div>

      {isAdded ? (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[12px] font-medium shrink-0">
          <Check className="w-3.5 h-3.5" />
          Added
        </span>
      ) : (
        <button
          onClick={onAdd}
          className="px-2.5 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-[12px] font-semibold transition-colors shrink-0"
        >
          + Add
        </button>
      )}
    </div>
  </article>
);
