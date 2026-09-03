import React, { useState } from 'react';
import {
  Plus,
  Check,
  Trash2,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { RoutineItem } from '../../types';
import { Toast } from '../common/Toast';

interface RoutineViewProps {
  routineItems: RoutineItem[];
  onToggleItem: (itemId: string) => void;
  onAddItem: (item: RoutineItem) => void;
  onRemoveItem: (itemId: string) => void;
  onResetToDefaults: () => void;
}

export const RoutineView: React.FC<RoutineViewProps> = ({
  routineItems,
  onToggleItem,
  onAddItem,
  onRemoveItem,
  onResetToDefaults
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newTiming, setNewTiming] = useState('Morning');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastRemovedItem, setLastRemovedItem] = useState<RoutineItem | null>(null);

  const completedCount = routineItems.filter((i) => i.completed).length;
  const progressPercent = routineItems.length > 0
    ? Math.round((completedCount / routineItems.length) * 100)
    : 0;

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddItem({
      id: `custom-user-${Date.now()}`,
      name: newName.trim(),
      detail: newDetail.trim() || 'Daily habit',
      timing: newTiming,
      category: 'habit',
      completed: false
    });

    setNewName('');
    setNewDetail('');
    setIsAddingNew(false);
    setToastMessage(`${newName.trim()} added to your routine`);
  };

  const handleRemove = (item: RoutineItem) => {
    setLastRemovedItem(item);
    onRemoveItem(item.id);
    setToastMessage(`${item.name} removed · Undo`);
  };

  const handleUndoRemove = () => {
    if (lastRemovedItem) {
      onAddItem(lastRemovedItem);
      setLastRemovedItem(null);
      setToastMessage(`${lastRemovedItem.name} restored to routine`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center pb-28">
      <div className="w-full max-w-[393px] min-h-screen bg-slate-50 flex flex-col px-5 pt-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Daily Nutrition Plan
            </span>
            <h1 className="text-[22px] font-bold text-slate-900">Today's Routine</h1>
          </div>
          <button
            onClick={() => setIsAddingNew((prev) => !prev)}
            className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 shadow-xs transition-transform active:scale-95"
            aria-label="Add habit"
          >
            <Plus className="w-5 h-5" />
          </button>
        </header>

        {/* Progress Card */}
        <section className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[14px] font-bold text-slate-900">Daily Completion</span>
            <span className="text-[13px] font-bold text-indigo-600">
              {completedCount} / {routineItems.length} ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {progressPercent === 100 && (
            <div className="mt-3 flex items-center gap-2 text-[12px] font-medium text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200/60">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>All daily items completed! Outstanding work today.</span>
            </div>
          )}
        </section>

        {/* Add New Item Form Accordion */}
        {isAddingNew && (
          <form
            onSubmit={handleCreateItem}
            className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-100 mb-4 space-y-2.5 animate-in fade-in duration-150"
          >
            <h3 className="text-[13px] font-bold text-slate-900">Add to your routine</h3>
            <div>
              <input
                type="text"
                placeholder="Item name (e.g. Greek yogurt, 2L water)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full h-9 px-3 bg-white rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Portion / Detail"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                className="w-full h-9 px-3 bg-white rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <select
                value={newTiming}
                onChange={(e) => setNewTiming(e.target.value)}
                className="w-full h-9 px-2 bg-white rounded-lg border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Morning">Morning</option>
                <option value="Midday">Midday</option>
                <option value="Evening">Evening</option>
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
                onClick={() => setIsAddingNew(false)}
                className="px-3 h-8 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium text-[13px] hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Routine Items List */}
        <section className="space-y-2 mb-5 flex-1">
          {routineItems.length === 0 ? (
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-500 space-y-2.5">
              <Calendar className="w-9 h-9 mx-auto text-slate-300" />
              <p className="text-[13px]">Your routine is currently empty.</p>
              <button
                onClick={onResetToDefaults}
                className="text-[13px] text-indigo-600 font-semibold underline"
              >
                Restore recommended items
              </button>
            </div>
          ) : (
            routineItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between"
              >
                <div
                  onClick={() => onToggleItem(item.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 pr-2 group"
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                      item.completed
                        ? 'bg-emerald-500 text-white'
                        : 'border border-slate-300 group-hover:border-indigo-600'
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
                      {item.detail} {item.timing ? `· ${item.timing}` : ''}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item)}
                  className="w-7 h-7 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors shrink-0"
                  title="Delete item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </section>

        {/* Reset button triggering Error-Prevention modal */}
        {routineItems.length > 0 && (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-[12px] text-slate-500 hover:text-indigo-600 text-center pb-4 transition-colors font-medium"
          >
            Reset to recommended student routine
          </button>
        )}

        {/* Error-Prevention Modal (#5 Error Prevention & #3 User Control) */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-5 z-50 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl p-5 max-w-[340px] w-full shadow-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5 text-amber-600">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200 shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-[16px] font-bold text-slate-900">Reset daily routine?</h3>
              </div>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                This will restore the recommended default student habits and remove any custom items you've added.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 h-10 rounded-xl border border-slate-200 font-medium text-[13px] text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Keep current
                </button>
                <button
                  onClick={() => {
                    onResetToDefaults();
                    setShowResetConfirm(false);
                    setToastMessage('Routine reset to student defaults');
                  }}
                  className="flex-1 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[13px] transition-colors shadow-xs"
                >
                  Reset routine
                </button>
              </div>
            </div>
          </div>
        )}

        <Toast
          message={toastMessage}
          onUndo={handleUndoRemove}
        />
      </div>
    </div>
  );
};
