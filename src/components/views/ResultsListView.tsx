import React, { useState } from 'react';
import {
  Bell,
  ChevronRight,
  Sun,
  Fish,
  Egg,
  Check,
  Wheat,
  Apple,
  Leaf,
  Plus,
  ArrowRight
} from 'lucide-react';
import { NUTRIENTS_DATA } from '../../data/mockData';
import { VitoMascot } from '../common/VitoMascot';
import { Toast } from '../common/Toast';
import { RoutineItem } from '../../types';

interface ResultsListViewProps {
  onGoToHome: () => void;
  onOpenNutrientDetail: (nutrientId: string) => void;
  onAddRoutineItem: (item: RoutineItem) => void;
  onAddAllToRoutine: () => void;
  routineItems: RoutineItem[];
}

export const ResultsListView: React.FC<ResultsListViewProps> = ({
  onGoToHome,
  onOpenNutrientDetail,
  onAddRoutineItem,
  onAddAllToRoutine,
  routineItems
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isNutrientInRoutine = (nutrientId: string) => {
    return routineItems.some((r) => r.nutrientId === nutrientId);
  };

  const handleAddNutrient = (nutrientId: string, name: string, detail: string) => {
    onAddRoutineItem({
      id: `routine-${nutrientId}`,
      name,
      detail,
      category: 'supplement',
      completed: false,
      nutrientId
    });
    setToastMessage(`${name} added to your routine`);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center selection:bg-indigo-600 selection:text-white pb-12">
      <main className="w-full max-w-[393px] min-h-screen bg-slate-50 flex flex-col relative px-5 pt-4">
        {/* Top Header */}
        <header className="flex justify-between items-center w-full py-2 bg-transparent mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[22px] font-bold text-slate-900 tracking-tight">NutriLens</span>
          </div>
          <button
            aria-label="Notifications"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600 border border-slate-200/60"
          >
            <Bell className="w-4 h-4" />
          </button>
        </header>

        {/* Headline */}
        <section className="mb-3">
          <h1 className="text-[26px] leading-[32px] font-bold text-slate-900 tracking-tight">
            Here's what we found
          </h1>
        </section>

        {/* Mascot Summary Card */}
        <section className="bg-indigo-50/80 rounded-xl p-4 border border-indigo-100 flex items-start gap-3.5 mb-4 shadow-xs">
          <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-indigo-200 bg-white shadow-xs flex items-center justify-center">
            <VitoMascot size="sm" animate={false} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[16px] font-bold text-slate-900 leading-snug">
              3 nutrients worth a closer look
            </h2>
            <p className="text-[13px] text-slate-600 mt-0.5">
              Based on 5 answers. This is an estimate, not a test.
            </p>
          </div>
        </section>

        {/* Nutrients List Cards */}
        <div className="flex flex-col gap-3 mb-5">
          {/* Card 1: Vitamin D */}
          <article
            className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 flex flex-col gap-3 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all"
            onClick={() => onOpenNutrientDetail('vitamin-d')}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-[20px] font-bold">
                  D
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[17px] font-bold text-slate-900">Vitamin D</h3>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
                      May be low
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-500 mt-0.5">
                    You spend under 30 minutes outside most days.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
            </div>

            {/* Chips and Action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-wrap items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700">
                  <Sun className="w-3 h-3 text-amber-500" />
                  <span>Sun (15 min)</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700">
                  <Fish className="w-3 h-3 text-indigo-500" />
                  <span>Salmon</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700">
                  <Egg className="w-3 h-3 text-amber-500" />
                  <span>Eggs</span>
                </div>
              </div>

              {isNutrientInRoutine('vitamin-d') ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[12px] font-medium shrink-0">
                  <Check className="w-3.5 h-3.5" />
                  Added
                </span>
              ) : (
                <button
                  onClick={() => handleAddNutrient('vitamin-d', 'Vitamin D', '1000 IU · morning')}
                  className="px-2.5 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-[12px] font-semibold transition-colors shrink-0"
                >
                  + Add
                </button>
              )}
            </div>
          </article>

          {/* Card 2: Vitamin B12 */}
          <article
            className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 flex flex-col gap-3 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all"
            onClick={() => onOpenNutrientDetail('vitamin-b12')}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-[17px] font-bold">
                  B12
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[17px] font-bold text-slate-900">Vitamin B12</h3>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
                      May be low
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-500 mt-0.5">
                    You picked Eggs but not Dairy, Meat or Fish.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-wrap items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700">
                  <Egg className="w-3 h-3 text-amber-500" />
                  <span>Eggs</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700">
                  <Wheat className="w-3 h-3 text-indigo-500" />
                  <span>Fortified</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700">
                  <span>Yeast</span>
                </div>
              </div>

              {isNutrientInRoutine('vitamin-b12') ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[12px] font-medium shrink-0">
                  <Check className="w-3.5 h-3.5" />
                  Added
                </span>
              ) : (
                <button
                  onClick={() => handleAddNutrient('vitamin-b12', 'Vitamin B12', '500 mcg · sublingual')}
                  className="px-2.5 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-[12px] font-semibold transition-colors shrink-0"
                >
                  + Add
                </button>
              )}
            </div>
          </article>

          {/* Card 3: Vitamin C */}
          <article
            className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 flex flex-col gap-3 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all"
            onClick={() => onOpenNutrientDetail('vitamin-c')}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-[20px] font-bold">
                  C
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[17px] font-bold text-slate-900">Vitamin C</h3>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
                      May be low
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-500 mt-0.5">
                    Fruit and vegetables show up about once a day.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-wrap items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700">
                  <Apple className="w-3 h-3 text-amber-500" />
                  <span>Citrus</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700">
                  <Leaf className="w-3 h-3 text-indigo-500" />
                  <span>Peppers</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-700">
                  <span>Kiwi</span>
                </div>
              </div>

              {isNutrientInRoutine('vitamin-c') ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[12px] font-medium shrink-0">
                  <Check className="w-3.5 h-3.5" />
                  Added
                </span>
              ) : (
                <button
                  onClick={() => handleAddNutrient('vitamin-c', 'Vitamin C', '500 mg · with lunch')}
                  className="px-2.5 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-[12px] font-semibold transition-colors shrink-0"
                >
                  + Add
                </button>
              )}
            </div>
          </article>
        </div>

        {/* Action CTAs */}
        <section className="flex flex-col gap-2.5 mb-6">
          <button
            onClick={() => {
              onAddAllToRoutine();
              setToastMessage('All 3 nutrients added to routine');
            }}
            className="w-full h-[48px] bg-indigo-600 text-white font-medium rounded-lg shadow-sm shadow-indigo-600/20 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Add all three to my routine</span>
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToHome}
            className="w-full py-2 text-slate-600 hover:text-slate-900 font-medium text-[14px] transition-colors text-center flex items-center justify-center gap-1"
          >
            <span>Go to home</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* Footer */}
        <footer className="text-center pb-6 text-[12px] text-slate-400">
          <p>Talk to a doctor or Student Health for anything real.</p>
        </footer>

        <Toast message={toastMessage} />
      </main>
    </div>
  );
};
