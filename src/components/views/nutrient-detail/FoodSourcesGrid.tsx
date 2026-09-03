import React from 'react';
import { FoodSource } from '../../../types';
import { FoodIcon } from '../../common/FoodIcon';

/** Two-column grid of food chips: icon, name, real-world portion ("1 fillet ≈ a full day"). */
export const FoodSourcesGrid: React.FC<{ sources: FoodSource[] }> = ({ sources }) => (
  <div className="space-y-1.5">
    <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500">Ways to get it in real portions</h2>
    <div className="grid grid-cols-2 gap-2">
      {sources.map((source) => (
        <div key={source.name} className="bg-slate-50 rounded-lg p-2.5 flex items-center gap-2 border border-slate-200/80">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center shadow-2xs border border-slate-200/60 shrink-0">
            <FoodIcon name={source.icon} className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-bold text-slate-900 truncate">{source.name}</div>
            <div className="text-[11px] text-slate-500 truncate">{source.amount}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
