import React, { useState } from 'react';
import { ChevronDown, Check, ArrowRight } from 'lucide-react';
import { FoodSource, Nutrient } from '../../../types';
import { BackHeader } from '../../common/BackHeader';
import { Button } from '../../common/Button';
import { FoodIcon } from '../../common/FoodIcon';

interface HowToGetPageProps {
  nutrient: Nutrient;
  isLast: boolean;
  /** Returns true when a food with this name is already in the routine. */
  isInRoutine: (name: string) => boolean;
  onAdd: (source: FoodSource) => void;
  onBack: () => void;
  onNext: () => void;
}

/** Flow page 3: food/habit rows with "+ Add", collapsed supplement note, Next/Finish. */
export const HowToGetPage: React.FC<HowToGetPageProps> = ({ nutrient, isLast, isInRoutine, onAdd, onBack, onNext }) => {
  const [suppExpanded, setSuppExpanded] = useState(false);

  return (
    <>
      <div>
        <BackHeader onBack={onBack} dark className="pb-2" backLabel="Back to why">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-white/[0.15] text-[12px] font-bold text-white">{nutrient.symbol}</span>
            <span className="text-[13px] text-white/80 font-medium">2 of 3 for this nutrient</span>
          </div>
        </BackHeader>

        <p className="text-[13px] text-white/70 font-medium tracking-wide mb-1">Ways to get more</p>
        <h1 className="text-[26px] font-bold text-white mb-4">{nutrient.name}</h1>

        {/* Food rows */}
        <div className="flex flex-col gap-2.5 mb-4">
          {nutrient.whereToFindIt.map((source) => {
            const added = isInRoutine(source.name);
            return (
              <div
                key={source.name}
                className="h-[64px] bg-white/[0.12] rounded-[16px] px-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.15] flex items-center justify-center shrink-0">
                    <FoodIcon name={source.icon} dark />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[16px] font-semibold text-white block truncate">{source.name}</span>
                    <span className="text-[14px] text-white/80 block truncate">{source.amount}</span>
                  </div>
                </div>

                {added ? (
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-300 bg-white/[0.15] px-2.5 py-1 rounded-lg shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    Added
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAdd(source)}
                    aria-label={`Add ${source.name} to routine`}
                    className="min-h-10 border border-white/80 hover:bg-white/10 active:scale-95 text-white rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-all shrink-0"
                  >
                    + Add
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Supplement accordion */}
        <div className="bg-white/[0.10] rounded-[16px] overflow-hidden transition-all">
          <button
            type="button"
            aria-expanded={suppExpanded}
            onClick={() => setSuppExpanded((v) => !v)}
            className="w-full h-12 px-4 flex items-center justify-between text-left text-[14px] font-medium text-white/90 hover:bg-white/[0.05] transition-colors"
          >
            <span>{nutrient.supplement.title}</span>
            <ChevronDown
              aria-hidden
              className={`w-4 h-4 text-white/70 transition-transform duration-200 ${suppExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          {suppExpanded && (
            <div className="px-4 pb-3.5 pt-1 text-[13px] text-white/85 leading-relaxed border-t border-white/10">
              <p>
                {nutrient.supplement.dosage}. {nutrient.supplement.note}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6">
        <Button variant="inverse" onClick={onNext}>
          <span>{isLast ? 'Finish' : 'Next nutrient'}</span>
          <ArrowRight className="w-5 h-5" aria-hidden />
        </Button>
      </div>
    </>
  );
};
