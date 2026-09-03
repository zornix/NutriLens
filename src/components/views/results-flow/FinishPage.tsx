import React from 'react';
import { RoutineItem } from '../../../types';
import { Button } from '../../common/Button';

interface FinishPageProps {
  routineItems: RoutineItem[];
  onRemove: (item: RoutineItem) => void;
  onFinish: () => void;
}

/** Flow finish page: "You're set." with the first few routine items and a Remove link on each. */
export const FinishPage: React.FC<FinishPageProps> = ({ routineItems, onRemove, onFinish }) => (
  <>
    <div>
      <h1 className="text-[32px] font-bold text-white tracking-tight mb-2 pt-4">You're set.</h1>
      <p className="text-[15px] text-white/80 leading-snug mb-6">
        Here are the practical food portions and habits added to your daily student routine.
      </p>

      <div className="space-y-3 mb-6">
        {routineItems.slice(0, 4).map((item) => (
          <div key={item.id} className="bg-white/[0.12] rounded-[14px] p-3.5 flex items-center justify-between">
            <div className="min-w-0 pr-3">
              <span className="text-[15px] font-semibold text-white block truncate">{item.name}</span>
              <span className="text-[13px] text-white/75 block truncate">{item.detail}</span>
            </div>
            <button
              type="button"
              onClick={() => onRemove(item)}
              aria-label={`Remove ${item.name} from routine`}
              className="min-h-10 px-1 text-[13px] text-white/75 hover:text-white underline underline-offset-2 shrink-0 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}

        {routineItems.length === 0 && (
          <div className="bg-white/[0.08] rounded-[14px] p-4 text-center text-white/70 text-[14px]">
            No items were added yet. You can always customize your daily routine anytime!
          </div>
        )}
      </div>
    </div>

    <div className="pt-6 space-y-3.5">
      <Button variant="inverse" onClick={onFinish}>
        Go to home
      </Button>
      <p className="text-[13px] text-white/70 text-center leading-relaxed">
        This is an estimate from 5 answers, not a test. Talk to a doctor or Student Health for anything real.
      </p>
    </div>
  </>
);
