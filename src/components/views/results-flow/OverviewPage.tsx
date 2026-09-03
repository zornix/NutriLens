import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Nutrient } from '../../../types';
import { Button } from '../../common/Button';

interface OverviewPageProps {
  nutrients: Nutrient[];
  onSelect: (index: number) => void;
}

/** Flow page 1: "Here's what we found" hub. One button card per flagged nutrient (keyboard reachable), plus Next. */
export const OverviewPage: React.FC<OverviewPageProps> = ({ nutrients, onSelect }) => (
  <>
    <div>
      <p className="text-[13px] text-white/70 font-medium tracking-wide mb-1.5">Here's what we found</p>
      <h1 className="text-[28px] font-bold text-white leading-tight mb-6">
        {nutrients.length} nutrients worth a closer look
      </h1>

      <div className="flex flex-col gap-3">
        {nutrients.map((n, idx) => (
          <button
            key={n.id}
            type="button"
            onClick={() => onSelect(idx)}
            className="w-full text-left bg-white/[0.12] hover:bg-white/[0.16] active:scale-[0.99] rounded-[16px] p-5 flex items-center justify-between cursor-pointer transition-all duration-150"
          >
            <div className="flex items-center gap-3.5 min-w-0 pr-2">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.15] flex items-center justify-center shrink-0">
                <span className="text-[20px] font-bold text-white tracking-tight">{n.symbol}</span>
              </div>
              <div className="min-w-0">
                <h2 className="text-[20px] font-semibold text-white leading-snug">{n.name}</h2>
                <p className="text-[15px] text-white/85 leading-tight mt-0.5 line-clamp-2">{n.whyHeading}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/70 shrink-0 ml-1" aria-hidden />
          </button>
        ))}
      </div>
    </div>

    <div className="pt-6 space-y-3">
      <Button variant="inverse" onClick={() => onSelect(0)}>
        <span>Next</span>
        <ArrowRight className="w-5 h-5" aria-hidden />
      </Button>
      <p className="text-[13px] text-white/70 text-center">Not medical advice</p>
    </div>
  </>
);
