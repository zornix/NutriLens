import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ProgressCardProps {
  completed: number;
  total: number;
}

/** "Daily Completion" card: count, percentage, progress bar, and a celebration line at 100%. */
export const ProgressCard: React.FC<ProgressCardProps> = ({ completed, total }) => {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[14px] font-bold text-slate-900">Daily Completion</span>
        <span className="text-[13px] font-bold text-indigo-600">
          {completed} / {total} ({percent}%)
        </span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
      </div>
      {percent === 100 && (
        <div className="mt-3 flex items-center gap-2 text-[12px] font-medium text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200/60">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>All daily items completed! Outstanding work today.</span>
        </div>
      )}
    </section>
  );
};
