import React, { useState } from 'react';
import { Bell, Plus, ArrowRight } from 'lucide-react';
import { RoutineItem } from '../../../types';
import { FLAGGED_NUTRIENTS } from '../../../data/mockData';
import { nutrientToRoutineItem } from '../../../lib/routine';
import { PageShell } from '../../common/PageShell';
import { Button } from '../../common/Button';
import { VitoMascot } from '../../common/VitoMascot';
import { Toast } from '../../common/Toast';
import { NutrientResultCard } from './NutrientResultCard';

interface ResultsListViewProps {
  routineItems: RoutineItem[];
  /** Returns false when a same-named item already exists. */
  onAddRoutineItem: (item: RoutineItem) => boolean;
  onRemoveRoutineItem: (itemId: string) => void;
  onAddAllToRoutine: () => void;
  onOpenNutrientDetail: (nutrientId: string) => void;
  onGoToHome: () => void;
}

/**
 * Light "summary list" alternative to the dark flow.
 * Elements: brand header, headline, mascot summary card, one NutrientResultCard per flagged nutrient, CTAs, footer.
 */
export const ResultsListView: React.FC<ResultsListViewProps> = ({
  routineItems,
  onAddRoutineItem,
  onRemoveRoutineItem,
  onAddAllToRoutine,
  onOpenNutrientDetail,
  onGoToHome
}) => {
  const [toast, setToast] = useState<string | null>(null);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const isInRoutine = (nutrientId: string) => routineItems.some((r) => r.nutrientId === nutrientId);

  return (
    <PageShell className="relative px-5 pt-4 pb-12">
      <header className="flex justify-between items-center w-full py-2 mb-2">
        <span className="text-[22px] font-bold text-slate-900 tracking-tight">NutriLens</span>
        <button
          type="button"
          aria-label="Notifications"
          className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600 border border-slate-200/60"
        >
          <Bell className="w-4 h-4" />
        </button>
      </header>

      <h1 className="text-[26px] leading-[32px] font-bold text-slate-900 tracking-tight mb-3">Here's what we found</h1>

      {/* Mascot summary */}
      <section className="bg-indigo-50/80 rounded-xl p-4 border border-indigo-100 flex items-start gap-3.5 mb-4 shadow-xs">
        <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-indigo-200 bg-white shadow-xs flex items-center justify-center">
          <VitoMascot size="sm" animate={false} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[16px] font-bold text-slate-900 leading-snug">
            {FLAGGED_NUTRIENTS.length} nutrients worth a closer look
          </h2>
          <p className="text-[13px] text-slate-600 mt-0.5">Based on 5 answers. This is an estimate, not a test.</p>
        </div>
      </section>

      <div className="flex flex-col gap-3 mb-5">
        {FLAGGED_NUTRIENTS.map((n) => (
          <NutrientResultCard
            key={n.id}
            nutrient={n}
            isAdded={isInRoutine(n.id)}
            onOpen={() => onOpenNutrientDetail(n.id)}
            onAdd={() => {
              const item = nutrientToRoutineItem(n);
              if (onAddRoutineItem(item)) {
                setLastAddedId(item.id);
                setToast(`${n.name} added to your routine`);
              } else {
                setLastAddedId(null);
                setToast(`${n.name} is already in your routine`);
              }
            }}
          />
        ))}
      </div>

      <section className="flex flex-col gap-2.5 mb-6">
        <Button
          onClick={() => {
            onAddAllToRoutine();
            setLastAddedId(null);
            setToast(`All ${FLAGGED_NUTRIENTS.length} nutrients added to routine`);
          }}
        >
          <span>Add all to my routine</span>
          <Plus className="w-4 h-4" />
        </Button>
        <button
          type="button"
          onClick={onGoToHome}
          className="w-full min-h-11 py-2 text-slate-600 hover:text-slate-900 font-medium text-[14px] transition-colors flex items-center justify-center gap-1"
        >
          <span>Go to home</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      <footer className="text-center pb-6 text-[12px] text-slate-500">
        <p>Talk to a doctor or Student Health for anything real.</p>
      </footer>

      <Toast
        message={toast}
        onDismiss={() => setToast(null)}
        onUndo={
          lastAddedId
            ? () => {
                onRemoveRoutineItem(lastAddedId);
                setLastAddedId(null);
                setToast('Removed from your routine');
              }
            : undefined
        }
      />
    </PageShell>
  );
};
