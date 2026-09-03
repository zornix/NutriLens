import React, { useState } from 'react';
import { Heart, Info, CheckCircle2 } from 'lucide-react';
import { RoutineItem } from '../../../types';
import { NUTRIENTS_DATA } from '../../../data/mockData';
import { nutrientToRoutineItem } from '../../../lib/routine';
import { PageShell } from '../../common/PageShell';
import { BackHeader } from '../../common/BackHeader';
import { Toast } from '../../common/Toast';
import { FoodSourcesGrid } from './FoodSourcesGrid';
import { ClinicalDetails } from './ClinicalDetails';
import { AddToRoutineBar } from './AddToRoutineBar';

interface NutrientDetailViewProps {
  nutrientId: string;
  isAlreadyAdded: boolean;
  onBack: () => void;
  onWhyWeThinkSo: () => void;
  onAddRoutineItem: (item: RoutineItem) => void;
  onRemoveRoutineItem: (itemId: string) => void;
}

/**
 * Encyclopedia page for one nutrient.
 * Tier 1 (always visible): flag banner, key benefits, image, what it does, FoodSourcesGrid.
 * Tier 2 (ClinicalDetails, collapsed): dosages, upper limit, where to buy, testimonial, citations.
 * AddToRoutineBar is the one primary action; Toast offers undo.
 */
export const NutrientDetailView: React.FC<NutrientDetailViewProps> = ({
  nutrientId,
  isAlreadyAdded,
  onBack,
  onWhyWeThinkSo,
  onAddRoutineItem,
  onRemoveRoutineItem
}) => {
  const nutrient = NUTRIENTS_DATA[nutrientId] ?? NUTRIENTS_DATA['vitamin-d'];
  const [isFavorited, setIsFavorited] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  const add = () => {
    const item = nutrientToRoutineItem(nutrient);
    onAddRoutineItem(item);
    setLastAddedId(item.id);
    setToast(`${nutrient.name} added to your routine`);
  };

  const undo = () => {
    if (!lastAddedId) return;
    onRemoveRoutineItem(lastAddedId);
    setLastAddedId(null);
    setToast(`${nutrient.name} removed`);
  };

  return (
    <PageShell className="relative bg-white shadow-lg border-x border-slate-200/60 pb-28">
      <BackHeader
        onBack={onBack}
        className="px-4 py-3 bg-white/95 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/80"
        right={
          <button
            onClick={() => setIsFavorited((v) => !v)}
            className="w-10 h-10 -mr-2 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
            aria-label="Favorite"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
          </button>
        }
      >
        <h1 className="text-[17px] font-bold text-slate-900">{nutrient.name}</h1>
      </BackHeader>

      <main className="flex-1 overflow-y-auto px-5 py-4 space-y-4 no-scrollbar">
        {/* Flag banner */}
        {nutrient.isFlaggedLow && (
          <div className="bg-indigo-50/80 rounded-xl p-3 flex items-start gap-2.5 border border-indigo-100 shadow-xs">
            <Info className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] text-slate-900 font-bold">You may be low in this</p>
              <button
                onClick={onWhyWeThinkSo}
                className="text-[12px] text-indigo-600 hover:text-indigo-700 font-semibold underline mt-0.5 inline-block active:opacity-75"
              >
                Why we think so →
              </button>
            </div>
          </div>
        )}

        {/* Tier 1 */}
        <section className="space-y-3.5">
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Key Benefits</span>
            <ul className="space-y-1.5">
              {nutrient.keyBenefits.slice(0, 3).map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-[13px] font-medium text-slate-800">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-36 rounded-xl overflow-hidden shadow-xs bg-slate-100 border border-slate-200">
            <img src={nutrient.imageUrl} alt={`${nutrient.name} rich dietary sources`} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-1">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500">What it does</h2>
            <p className="text-[14px] leading-relaxed text-slate-700">{nutrient.whatItDoes}</p>
          </div>

          <FoodSourcesGrid sources={nutrient.whereToFindIt} />
        </section>

        <ClinicalDetails nutrient={nutrient} />
      </main>

      <AddToRoutineBar isAdded={isAlreadyAdded} onAdd={add} />
      <Toast message={toast} onUndo={lastAddedId ? undo : undefined} />
    </PageShell>
  );
};
