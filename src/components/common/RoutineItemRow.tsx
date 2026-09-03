import React from 'react';
import { Check } from 'lucide-react';
import { RoutineItem } from '../../types';

interface RoutineItemRowProps {
  item: RoutineItem;
  onToggle: (itemId: string) => void;
  /** Append "· timing" after the detail line (Routine tab). */
  showTiming?: boolean;
}

/** Checkbox + name + detail for one routine item. Clicking anywhere toggles completion. */
export const RoutineItemRow: React.FC<RoutineItemRowProps> = ({ item, onToggle, showTiming = false }) => (
  <div
    onClick={() => onToggle(item.id)}
    className="flex items-center gap-3 min-h-[40px] cursor-pointer flex-1 min-w-0 group"
  >
    <div
      className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
        item.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300 group-hover:border-indigo-600'
      }`}
    >
      {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
    </div>
    <div className="min-w-0">
      <span
        className={`text-[14px] font-semibold block truncate transition-colors ${
          item.completed ? 'line-through text-slate-400' : 'text-slate-900'
        }`}
      >
        {item.name}
      </span>
      <span className="text-[12px] text-slate-500 block truncate">
        {item.detail}
        {showTiming && item.timing ? ` · ${item.timing}` : ''}
      </span>
    </div>
  </div>
);
