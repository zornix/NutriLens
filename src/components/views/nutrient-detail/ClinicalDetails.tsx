import React, { useState } from 'react';
import { ChevronDown, AlertTriangle, ShoppingBag, BookOpen } from 'lucide-react';
import { Nutrient } from '../../../types';
import { TestimonialCard } from './TestimonialCard';

/** Citation lines shown in the accordion. Same for every nutrient today. */
const CITATIONS = [
  'National Institutes of Health (NIH) Office of Dietary Supplements.',
  'Institute of Medicine (IOM) Dietary Reference Intakes (DRIs).',
  'Harvard T.H. Chan School of Public Health: Micronutrient Index.'
];

/**
 * "Tier 2" of the nutrient page, collapsed by default so the high-stakes numbers don't crowd the first view.
 * Contains: dosage & upper-limit card, where-to-buy note, TestimonialCard, citations accordion.
 */
export const ClinicalDetails: React.FC<{ nutrient: Nutrient }> = ({ nutrient }) => {
  const [expanded, setExpanded] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  return (
    <div className="pt-2 border-t border-slate-200/80">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-left transition-colors"
      >
        <div>
          <span className="text-[13px] font-bold text-slate-800 block">
            {expanded ? 'Hide clinical & source details' : 'Learn more: Dosages & scientific sources'}
          </span>
          <span className="text-[11px] text-slate-500 block">
            High-stakes intake targets, upper limits, and campus store guide
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ml-2 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="mt-3 space-y-3.5 animate-in fade-in duration-200">
          {/* Dosage & upper limit */}
          <section className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <h3 className="text-[13px] font-bold">Daily Requirement & Upper Limit</h3>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-amber-200/60 divide-y divide-slate-100 text-[12px]">
              <div className="flex justify-between py-1">
                <span className="text-slate-600">{nutrient.howMuchYouNeed.targetLabel}</span>
                <span className="font-bold text-slate-900">{nutrient.howMuchYouNeed.target}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Upper limit safety cap</span>
                <span className="font-bold text-amber-800">{nutrient.howMuchYouNeed.upperLimit}</span>
              </div>
            </div>
            <p className="text-[11px] text-amber-950 leading-relaxed">
              {nutrient.supplement.dosage}. {nutrient.supplement.note}
            </p>
          </section>

          {/* Where to buy */}
          <section className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-[13px]">
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span>Where to buy on campus</span>
            </div>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              Available at the Student Health & Wellness Center pharmacy, Memorial Union bookstore market, or Russell Blvd
              grocery stores with student discount cards.
            </p>
          </section>

          <TestimonialCard testimonial={nutrient.testimonial} />

          {/* Citations */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
            <button
              type="button"
              aria-expanded={sourcesOpen}
              onClick={() => setSourcesOpen((v) => !v)}
              className="w-full min-h-11 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span className="text-[13px] text-slate-800 font-bold">Scientific Citations</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${sourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {sourcesOpen && (
              <div className="mt-2 pl-2 border-l-2 border-indigo-500 space-y-1 text-[11px] text-slate-500 pt-1">
                {CITATIONS.map((c) => (
                  <p key={c}>• {c}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
