import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Info,
  CheckCircle2,
  Fish,
  Egg,
  Milk,
  Sun,
  Wheat,
  Leaf,
  Apple,
  ChevronDown,
  Quote,
  ShoppingBag,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import { NUTRIENTS_DATA } from '../../data/mockData';
import { Toast } from '../common/Toast';
import { RoutineItem } from '../../types';

interface NutrientDetailViewProps {
  nutrientId: string;
  onBack: () => void;
  onWhyWeThinkSo: () => void;
  onAddRoutineItem: (item: RoutineItem) => void;
  isAlreadyAdded: boolean;
}

export const NutrientDetailView: React.FC<NutrientDetailViewProps> = ({
  nutrientId,
  onBack,
  onWhyWeThinkSo,
  onAddRoutineItem,
  isAlreadyAdded
}) => {
  const nutrient = NUTRIENTS_DATA[nutrientId] || NUTRIENTS_DATA['vitamin-d'];
  const [isFavorited, setIsFavorited] = useState(false);
  // Tier two is collapsed by default per HCI critique #8 (Aesthetic and minimalist design)
  const [tierTwoExpanded, setTierTwoExpanded] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAdd = () => {
    onAddRoutineItem({
      id: `nutrient-${nutrient.id}-${Date.now()}`,
      name: nutrient.name,
      detail: nutrient.whereToFindIt[0]?.amount || 'Daily portion',
      category: 'supplement',
      completed: false,
      nutrientId: nutrient.id
    });
    setToastMessage(`${nutrient.name} added to your routine · Undo`);
  };

  const getSourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'fish':
        return <Fish className="w-4 h-4 text-indigo-600" />;
      case 'egg':
        return <Egg className="w-4 h-4 text-amber-500" />;
      case 'water_drop':
        return <Milk className="w-4 h-4 text-indigo-500" />;
      case 'sun':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'grain':
        return <Wheat className="w-4 h-4 text-amber-600" />;
      case 'eco':
        return <Leaf className="w-4 h-4 text-emerald-600" />;
      case 'apple':
        return <Apple className="w-4 h-4 text-rose-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center selection:bg-indigo-600 selection:text-white pb-28">
      <div className="w-full max-w-[393px] min-h-screen bg-white shadow-lg flex flex-col relative border-x border-slate-200/60">
        {/* Top Header */}
        <header className="flex justify-between items-center w-full px-4 py-3 bg-white/95 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/80">
          <button
            onClick={onBack}
            className="w-9 h-9 -ml-1 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[17px] font-bold text-slate-900">{nutrient.name}</h1>
          <button
            onClick={() => setIsFavorited((prev) => !prev)}
            className="w-9 h-9 -mr-1 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
            aria-label="Favorite"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
              }`}
            />
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-5 py-4 space-y-4 no-scrollbar">
          {/* Contextual Warning Banner */}
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

          {/* ========================================================================= */}
          {/* TIER 1: Clean, minimalist, immediate view without scrolling fatigue       */}
          {/* 1. Three benefits                                                         */}
          {/* 2. Image                                                                  */}
          {/* 3. One-sentence "what it does"                                            */}
          {/* 4. Food chips with real portions                                          */}
          {/* 5. Add to routine                                                         */}
          {/* ========================================================================= */}
          <section className="space-y-3.5">
            {/* 1. Three Benefits */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Key Benefits
              </span>
              <ul className="space-y-1.5">
                {nutrient.keyBenefits.slice(0, 3).map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="text-[13px] font-medium text-slate-800">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Image */}
            <div className="w-full h-36 rounded-xl overflow-hidden shadow-xs bg-slate-100 border border-slate-200">
              <img
                src={nutrient.imageUrl}
                alt={`${nutrient.name} rich dietary sources`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 3. One-sentence "What it does" */}
            <div className="space-y-1">
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500">
                What it does
              </h2>
              <p className="text-[14px] leading-relaxed text-slate-700">
                {nutrient.whatItDoes}
              </p>
            </div>

            {/* 4. Food chips with real-world portions (e.g. 1 salmon fillet ≈ full day) */}
            <div className="space-y-1.5">
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500">
                Ways to get it in real portions
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {nutrient.whereToFindIt.map((source, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 rounded-lg p-2.5 flex items-center gap-2 border border-slate-200/80"
                  >
                    <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center shadow-2xs border border-slate-200/60 shrink-0">
                      {getSourceIcon(source.icon)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-slate-900 truncate">
                        {source.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{source.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* TIER 2: Collapsed by default behind "Learn more & dosages"                */}
          {/* Contains high-stakes dosage details, upper limit, sources & testimonials */}
          {/* ========================================================================= */}
          <div className="pt-2 border-t border-slate-200/80">
            <button
              onClick={() => setTierTwoExpanded((prev) => !prev)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-left transition-colors"
            >
              <div>
                <span className="text-[13px] font-bold text-slate-800 block">
                  {tierTwoExpanded ? 'Hide clinical & source details' : 'Learn more: Dosages & scientific sources'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  High-stakes intake targets, upper limits, and campus store guide
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ml-2 ${
                  tierTwoExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {tierTwoExpanded && (
              <div className="mt-3 space-y-3.5 animate-in fade-in duration-200">
                {/* Dosage & Requirements Card (High-Stakes Information) */}
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

                {/* Where to buy on campus */}
                <section className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-[13px]">
                    <ShoppingBag className="w-4 h-4 text-indigo-600" />
                    <span>Where to buy on campus</span>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed">
                    Available at the Student Health & Wellness Center pharmacy, Memorial Union bookstore market, or Russell Blvd grocery stores with student discount cards.
                  </p>
                </section>

                {/* Student Testimonial */}
                <section className="bg-slate-900 text-white rounded-xl p-3.5 relative overflow-hidden shadow-xs">
                  <Quote className="w-8 h-8 absolute -bottom-1 -right-1 text-slate-800" />
                  <p className="text-[12px] leading-relaxed italic mb-2 relative z-10 text-slate-200">
                    "{nutrient.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-2.5 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                      <img
                        src={nutrient.testimonial.avatarUrl}
                        alt={nutrient.testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-white">{nutrient.testimonial.author}</div>
                      <div className="text-[10px] text-slate-400">{nutrient.testimonial.role}</div>
                    </div>
                  </div>
                </section>

                {/* Scientific Citations Accordion */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                  <button
                    onClick={() => setSourcesOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span className="text-[13px] text-slate-800 font-bold">
                        Scientific Citations
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        sourcesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {sourcesOpen && (
                    <div className="mt-2 pl-2 border-l-2 border-indigo-500 space-y-1 text-[11px] text-slate-500 pt-1">
                      <p>• National Institutes of Health (NIH) Office of Dietary Supplements.</p>
                      <p>• Institute of Medicine (IOM) Dietary Reference Intakes (DRIs).</p>
                      <p>• Harvard T.H. Chan School of Public Health: Micronutrient Index.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Sticky CTA Bottom Bar (Tier 1 Action) */}
        <div className="fixed bottom-0 max-w-[393px] w-full bg-white/95 backdrop-blur-md p-3.5 border-t border-slate-200 shadow-sm z-40">
          <button
            onClick={handleAdd}
            className={`w-full h-[48px] font-medium text-[15px] rounded-xl transition-all active:scale-[0.98] shadow-xs flex items-center justify-center gap-2 ${
              isAlreadyAdded
                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20'
            }`}
          >
            {isAlreadyAdded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>In your routine</span>
              </>
            ) : (
              <span>Add to routine</span>
            )}
          </button>
        </div>

        <Toast
          message={toastMessage}
          onUndo={() => {
            setToastMessage('Item undone');
          }}
        />
      </div>
    </div>
  );
};
