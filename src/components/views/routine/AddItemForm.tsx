import React, { useState } from 'react';
import { RoutineItem } from '../../../types';

const TIMINGS = ['Morning', 'Midday', 'Evening'];

interface AddItemFormProps {
  onSubmit: (item: RoutineItem) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full h-9 px-3 bg-white rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500';

/** Inline form for a custom habit: name, portion/detail, timing. Builds the RoutineItem and hands it up. */
export const AddItemForm: React.FC<AddItemFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [timing, setTiming] = useState(TIMINGS[0]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      id: `custom-user-${Date.now()}`,
      name: name.trim(),
      detail: detail.trim() || 'Daily habit',
      timing,
      category: 'habit',
      completed: false
    });
  };

  return (
    <form
      onSubmit={submit}
      className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-100 mb-4 space-y-2.5 animate-in fade-in duration-150"
    >
      <h3 className="text-[13px] font-bold text-slate-900">Add to your routine</h3>
      <input
        type="text"
        placeholder="Item name (e.g. Greek yogurt, 2L water)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
        required
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Portion / Detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className={inputClass}
        />
        <select value={timing} onChange={(e) => setTiming(e.target.value)} className={inputClass}>
          {TIMINGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 h-8 bg-indigo-600 text-white rounded-lg font-medium text-[13px] hover:bg-indigo-700 shadow-xs"
        >
          Save item
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 h-8 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium text-[13px] hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
