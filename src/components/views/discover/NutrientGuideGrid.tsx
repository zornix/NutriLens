import React from 'react';
import { Nutrient } from '../../../types';

interface NutrientGuideGridProps {
  nutrients: Nutrient[];
  onOpen: (nutrientId: string) => void;
}

/** Three-column grid of symbol tiles linking to each nutrient's detail page. */
export const NutrientGuideGrid: React.FC<NutrientGuideGridProps> = ({ nutrients, onOpen }) => (
  <section className="mb-5">
    <div className="flex items-center justify-between mb-2.5">
      <h2 className="text-[16px] font-bold text-slate-900">Nutrient Guides</h2>
      <span className="text-[12px] font-medium text-slate-500">Reference</span>
    </div>

    <div className="grid grid-cols-3 gap-2.5">
      {nutrients.map((n) => (
        <button
          key={n.id}
          onClick={() => onOpen(n.id)}
          className="bg-white p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 flex flex-col items-center text-center shadow-xs active:scale-95 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-[15px] mb-1.5 border border-indigo-100/80 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            {n.symbol}
          </div>
          <span className="text-[13px] font-bold text-slate-900 truncate w-full">{n.name}</span>
          <span className="text-[10px] text-slate-500 truncate w-full">{n.tagline}</span>
        </button>
      ))}
    </div>
  </section>
);
