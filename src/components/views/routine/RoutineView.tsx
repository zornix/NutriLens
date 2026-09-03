import React, { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { RoutineItem } from '../../../types';
import { PageShell } from '../../common/PageShell';
import { ScreenHeader } from '../../common/ScreenHeader';
import { RoutineItemRow } from '../../common/RoutineItemRow';
import { Toast } from '../../common/Toast';
import { ConfirmDialog } from '../../modals/ConfirmDialog';
import { ProgressCard } from './ProgressCard';
import { AddItemForm } from './AddItemForm';

interface RoutineViewProps {
  routineItems: RoutineItem[];
  onToggleItem: (itemId: string) => void;
  /** Returns false when a same-named item already exists. */
  onAddItem: (item: RoutineItem) => boolean;
  onRemoveItem: (itemId: string) => void;
  onResetToDefaults: () => void;
}

/**
 * Routine tab. Elements: header with "+" button, ProgressCard, AddItemForm (toggled),
 * checklist of RoutineItemRow + delete, reset link guarded by ConfirmDialog, Toast with undo-remove.
 */
export const RoutineView: React.FC<RoutineViewProps> = ({
  routineItems,
  onToggleItem,
  onAddItem,
  onRemoveItem,
  onResetToDefaults
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [lastRemoved, setLastRemoved] = useState<RoutineItem | null>(null);

  const completed = routineItems.filter((i) => i.completed).length;

  const remove = (item: RoutineItem) => {
    setLastRemoved(item);
    onRemoveItem(item.id);
    setToast(`${item.name} removed`);
  };

  const undoRemove = () => {
    if (!lastRemoved) return;
    onAddItem(lastRemoved);
    setToast(`${lastRemoved.name} restored to routine`);
    setLastRemoved(null);
  };

  return (
    <PageShell className="px-5 pt-4 pb-28">
      <ScreenHeader
        eyebrow="Daily Nutrition Plan"
        title="Today's Routine"
        right={
          <button
            type="button"
            aria-expanded={isAdding}
            onClick={() => setIsAdding((v) => !v)}
            className="w-11 h-11 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 shadow-xs transition-transform active:scale-95"
            aria-label="Add habit"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      <ProgressCard completed={completed} total={routineItems.length} />

      {isAdding && (
        <AddItemForm
          onSubmit={(item) => {
            if (!onAddItem(item)) {
              setToast(`${item.name} is already in your routine`);
              return;
            }
            setIsAdding(false);
            setToast(`${item.name} added to your routine`);
          }}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {/* Checklist */}
      <section className="space-y-2 mb-5 flex-1">
        {routineItems.length === 0 ? (
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-500 space-y-2.5">
            <Calendar className="w-9 h-9 mx-auto text-slate-500" aria-hidden />
            <p className="text-[13px]">Your routine is currently empty.</p>
            <button type="button" onClick={onResetToDefaults} className="min-h-11 text-[13px] text-indigo-600 font-semibold underline">
              Restore recommended items
            </button>
          </div>
        ) : (
          routineItems.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <RoutineItemRow item={item} onToggle={onToggleItem} showTiming />
              <button
                type="button"
                onClick={() => remove(item)}
                aria-label={`Remove ${item.name}`}
                className="w-10 h-10 -mr-1 rounded-md hover:bg-rose-50 text-slate-500 hover:text-rose-600 flex items-center justify-center transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" aria-hidden />
              </button>
            </div>
          ))
        )}
      </section>

      {routineItems.length > 0 && (
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="min-h-11 text-[12px] text-slate-500 hover:text-indigo-600 text-center pb-4 transition-colors font-medium"
        >
          Reset to recommended student routine
        </button>
      )}

      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset daily routine?"
        body="This will restore the recommended default student habits and remove any custom items you've added."
        confirmText="Reset routine"
        cancelText="Keep current"
        onCancel={() => setShowResetConfirm(false)}
        onConfirm={() => {
          onResetToDefaults();
          setShowResetConfirm(false);
          setToast('Routine reset to student defaults');
        }}
      />

      <Toast message={toast} onUndo={lastRemoved ? undoRemove : undefined} onDismiss={() => setToast(null)} />
    </PageShell>
  );
};
