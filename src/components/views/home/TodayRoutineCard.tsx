import React from 'react';
import { RoutineItem } from '../../../types';
import { RoutineItemRow } from '../../common/RoutineItemRow';

interface TodayRoutineCardProps {
  items: RoutineItem[];
  onToggle: (itemId: string) => void;
}

/** White card with a "n of m completed" badge and a checklist of today's routine items. */
export const TodayRoutineCard: React.FC<TodayRoutineCardProps> = ({ items, onToggle }) => {
  const completed = items.filter((i) => i.completed).length;

  return (
    <section className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[17px] font-bold text-slate-900">Today's routine</h2>
        <span className="bg-indigo-50 text-indigo-700 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-indigo-100">
          {completed} of {items.length} completed
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.length === 0 ? (
          <p className="text-[13px] text-slate-500 py-2">
            No items added yet. Explore nutrients above to build your daily habits!
          </p>
        ) : (
          items.map((item) => <RoutineItemRow key={item.id} item={item} onToggle={onToggle} />)
        )}
      </div>
    </section>
  );
};
