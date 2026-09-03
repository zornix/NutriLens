import React from 'react';
import { Check } from 'lucide-react';
import { RoutineItem } from '../../types';

interface RoutineItemRowProps {
  item: RoutineItem;
  onToggle: (itemId: string) => void;
  /** Append "· timing" after the detail line (Routine tab). */
  showTiming?: boolean;
}

/**
 * One routine item as a real checkbox: keyboard operable (Space), announced as checked/unchecked,
 * whole row is the label so the tap target is the full width (Fitts's law).
 */
export const RoutineItemRow: React.FC<RoutineItemRowProps> = ({ item, onToggle, showTiming = false }) => (
  <label className="flex items-center gap-3 min-h-[44px] cursor-pointer flex-1 min-w-0 group">
    <input type="checkbox" checked={item.completed} onChange={() => onToggle(item.id)} className="sr-only peer" />
    <span
      aria-hidden
      className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2 ${
        item.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300 group-hover:border-indigo-600'
      }`}
    >
      {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
    </span>
    <span className="min-w-0">
      <span
        className={`text-[14px] font-semibold block truncate transition-colors ${
          item.completed ? 'line-through text-slate-500' : 'text-slate-900'
        }`}
      >
        {item.name}
      </span>
      <span className="text-[12px] text-slate-500 block truncate">
        {item.detail}
        {showTiming && item.timing ? ` · ${item.timing}` : ''}
      </span>
    </span>
  </label>
);
