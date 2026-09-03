import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Nutrient } from '../../../types';
import { BackHeader } from '../../common/BackHeader';
import { Button } from '../../common/Button';

interface WhyPageProps {
  nutrient: Nutrient;
  index: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  onLearnMore?: () => void;
}

/** Flow page 2: why this nutrient was flagged, quoting the user's own quiz answer. */
export const WhyPage: React.FC<WhyPageProps> = ({ nutrient, index, total, onBack, onNext, onLearnMore }) => (
  <>
    <div>
      <BackHeader onBack={onBack} dark className="pb-3" backLabel="Back to overview">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-white/[0.15] text-[12px] font-bold text-white">{nutrient.symbol}</span>
          <span className="text-[13px] text-white/80 font-medium">
            {index + 1} of {total}
          </span>
          <div className="flex items-center gap-1 ml-1">
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </BackHeader>

      <p className="text-[13px] text-white/70 font-medium tracking-wide mt-2 mb-4">Why we think so</p>

      {/* Large nutrient mark */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-24 h-24 rounded-2xl bg-white/[0.15] flex items-center justify-center shadow-inner">
          <span className="text-[44px] font-bold text-white tracking-tight">{nutrient.symbol}</span>
        </div>
        <h2 className="text-[22px] font-semibold text-white mt-2.5">{nutrient.name}</h2>
      </div>

      <h3 className="text-[24px] font-bold text-white leading-tight mb-3">{nutrient.whyHeading}</h3>
      <p className="text-[16px] text-white/85 leading-relaxed mb-4">{nutrient.whyReason}</p>

      <div className="bg-white/[0.10] rounded-xl p-3.5 mb-4">
        <p className="text-[14px] text-white/90 italic font-medium">{nutrient.userAnswerQuote}</p>
      </div>

      <p className="text-[15px] text-white/85 leading-snug mb-3">{nutrient.functionSummary}</p>

      {onLearnMore && (
        <button
          type="button"
          onClick={onLearnMore}
          className="text-[15px] text-white font-medium underline underline-offset-4 hover:text-white/80 transition-colors inline-block"
        >
          Learn more
        </button>
      )}
    </div>

    <div className="pt-6">
      <Button variant="inverse" onClick={onNext}>
        <span>How do I get more?</span>
        <ArrowRight className="w-5 h-5" aria-hidden />
      </Button>
    </div>
  </>
);
