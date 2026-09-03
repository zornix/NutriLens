import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Sun,
  Fish,
  Egg,
  Milk,
  Apple,
  Leaf,
  Wheat,
  Sparkles,
  Check
} from 'lucide-react';
import { RoutineItem } from '../../types';

interface OptionRow {
  name: string;
  portion: string;
  iconType: 'sun' | 'fish' | 'egg' | 'milk' | 'grain' | 'leaf' | 'apple' | 'sparkles';
}

interface NutrientFlowData {
  id: string;
  mark: string;
  name: string;
  overviewReason: string;
  whyHeadline: string;
  whyBody: string;
  quizAnswerQuote: string;
  oneLiner: string;
  options: OptionRow[];
  supplementText: string;
}

const FLOW_NUTRIENTS: NutrientFlowData[] = [
  {
    id: 'vitamin-d',
    mark: 'D',
    name: 'Vitamin D',
    overviewReason: "You don't get outside much during the day.",
    whyHeadline: "You don't get outside much during the day.",
    whyBody:
      'Sunlight is the main way people get vitamin D. With under 30 minutes outside most days, it may be low.',
    quizAnswerQuote: "Your answer: 'Less than 30 minutes'",
    oneLiner: 'It helps you absorb calcium and supports your immune system.',
    options: [
      { name: 'Sunlight', portion: '15 minutes midday', iconType: 'sun' },
      { name: 'Salmon', portion: '1 fillet ≈ a full day', iconType: 'fish' },
      { name: 'Eggs', portion: '2 eggs ≈ 15%', iconType: 'egg' },
      { name: 'Milk', portion: '1 cup ≈ 20%', iconType: 'milk' }
    ],
    supplementText:
      'Vitamin D3, 600–1,000 IU/day. Upper limit 4,000 IU. Check with a clinician before going higher.'
  },
  {
    id: 'vitamin-b12',
    mark: 'B12',
    name: 'Vitamin B12',
    overviewReason: 'You eat eggs, but not much dairy, meat or fish.',
    whyHeadline: 'You eat eggs, but not much dairy, meat or fish.',
    whyBody:
      "Those are where most B12 comes from. Plant foods don't make it naturally, so it's worth a closer look.",
    quizAnswerQuote: "Your answer: 'Eggs, but not dairy, meat or fish'",
    oneLiner: 'It powers your nerve cells and helps produce essential red blood cells.',
    options: [
      { name: 'Eggs', portion: '2 eggs ≈ 25%', iconType: 'egg' },
      { name: 'Fortified cereal', portion: '1 bowl ≈ 50%', iconType: 'grain' },
      { name: 'Nutritional yeast', portion: '1 tbsp ≈ full day', iconType: 'sparkles' },
      { name: 'Salmon', portion: '1 fillet ≈ full day', iconType: 'fish' }
    ],
    supplementText:
      'Vitamin B12 (cyanocobalamin), 250–500 mcg/day or 1,000 mcg 2x/week. Safe with no established upper limit. Check with a clinician before taking high-dose megavitamins.'
  },
  {
    id: 'vitamin-c',
    mark: 'C',
    name: 'Vitamin C',
    overviewReason: 'Fruit and vegetables show up about once a day.',
    whyHeadline: 'Fruit and vegetables show up about once a day.',
    whyBody:
      "Fresh fruit and vibrant vegetables supply daily Vitamin C. Because it's water-soluble, your body cannot store it, so it may be low.",
    quizAnswerQuote: "Your answer: 'About once a day (or less)'",
    oneLiner: 'It protects cells from stress and helps you absorb iron from food.',
    options: [
      { name: 'Bell pepper', portion: '1/2 pepper ≈ full day', iconType: 'leaf' },
      { name: 'Orange', portion: '1 orange ≈ full day', iconType: 'apple' },
      { name: 'Strawberries', portion: '1 cup ≈ full day', iconType: 'apple' },
      { name: 'Broccoli', portion: '1 cup ≈ 90%', iconType: 'leaf' }
    ],
    supplementText:
      'Vitamin C (ascorbic acid), 250–500 mg/day with meals. Upper limit 2,000 mg. Check with a clinician before going higher.'
  }
];

interface ResultsFlowViewProps {
  onFinishFlow: () => void;
  onGoToOverviewList?: () => void;
  onAddRoutineItem: (item: RoutineItem) => void;
  onRemoveRoutineItem: (itemId: string) => void;
  routineItems: RoutineItem[];
  onOpenNutrientDetail?: (nutrientId: string) => void;
}

export const ResultsFlowView: React.FC<ResultsFlowViewProps> = ({
  onFinishFlow,
  onAddRoutineItem,
  onRemoveRoutineItem,
  routineItems,
  onOpenNutrientDetail
}) => {
  // Page routing state:
  // 'overview' = Page 1 (Overview)
  // 'why' = Page 2 (Why we think so for current nutrient)
  // 'how-to-get' = Page 3 (Ways to get more for current nutrient)
  // 'finish' = Finish page (You're set)
  const [currentPage, setCurrentPage] = useState<'overview' | 'why' | 'how-to-get' | 'finish'>('overview');
  const [nutrientIndex, setNutrientIndex] = useState<number>(0);
  const [suppExpanded, setSuppExpanded] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastModifiedItem, setLastModifiedItem] = useState<{ item: RoutineItem; action: 'add' | 'remove' } | null>(null);

  const currentNutrient = FLOW_NUTRIENTS[nutrientIndex] || FLOW_NUTRIENTS[0];

  // Helper to render food option icon
  const renderOptionIcon = (type: OptionRow['iconType']) => {
    switch (type) {
      case 'sun':
        return <Sun className="w-5 h-5 text-amber-300" />;
      case 'fish':
        return <Fish className="w-5 h-5 text-sky-300" />;
      case 'egg':
        return <Egg className="w-5 h-5 text-amber-200" />;
      case 'milk':
        return <Milk className="w-5 h-5 text-sky-200" />;
      case 'grain':
        return <Wheat className="w-5 h-5 text-amber-300" />;
      case 'leaf':
        return <Leaf className="w-5 h-5 text-emerald-300" />;
      case 'apple':
        return <Apple className="w-5 h-5 text-rose-300" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-amber-200" />;
    }
  };

  const isOptionInRoutine = (name: string) => {
    return routineItems.some((r) => r.name.toLowerCase() === name.toLowerCase());
  };

  const handleAddOption = (option: OptionRow) => {
    const newItem: RoutineItem = {
      id: `flow-${currentNutrient.id}-${option.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: option.name,
      detail: option.portion,
      category: 'food',
      completed: false,
      nutrientId: currentNutrient.id
    };
    onAddRoutineItem(newItem);
    setLastModifiedItem({ item: newItem, action: 'add' });
    setToastMessage(`${option.name} added to your routine`);
  };

  const handleRemoveOption = (id: string, name: string) => {
    const existing = routineItems.find((r) => r.id === id);
    if (existing) {
      setLastModifiedItem({ item: existing, action: 'remove' });
    }
    onRemoveRoutineItem(id);
    setToastMessage(`${name} removed`);
  };

  const handleUndo = () => {
    if (!lastModifiedItem) return;
    if (lastModifiedItem.action === 'add') {
      onRemoveRoutineItem(lastModifiedItem.item.id);
      setToastMessage(`${lastModifiedItem.item.name} removed`);
    } else {
      onAddRoutineItem(lastModifiedItem.item);
      setToastMessage(`${lastModifiedItem.item.name} restored`);
    }
    setLastModifiedItem(null);
  };

  // Navigation handlers
  const handleOpenPage2 = (index: number) => {
    setNutrientIndex(index);
    setSuppExpanded(false);
    setCurrentPage('why');
  };

  const handlePage2Back = () => {
    // Page 1 is the hub — back arrow from any Page 2 returns to it
    setCurrentPage('overview');
  };

  const handlePage3Back = () => {
    // Back from Page 3 returns to Page 2 of same nutrient
    setCurrentPage('why');
  };

  const handleNextFromPage3 = () => {
    if (nutrientIndex < FLOW_NUTRIENTS.length - 1) {
      setNutrientIndex((prev) => prev + 1);
      setSuppExpanded(false);
      setCurrentPage('why');
    } else {
      setCurrentPage('finish');
    }
  };

  // Slide key for animated horizontal transitions (240ms)
  const slideKey = `${currentPage}-${nutrientIndex}`;

  return (
    <div className="w-full min-h-screen bg-[#022851] flex justify-center selection:bg-white selection:text-[#022851]">
      <div className="w-full max-w-[393px] min-h-[852px] bg-[#022851] text-white flex flex-col justify-between px-5 py-6 font-sans relative select-none">
        
        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* PAGE 1 — Overview ("Here's what we found")                                  */}
          {/* ========================================================================= */}
          {currentPage === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Eyebrow: 13px white 70% */}
                <p className="text-[13px] text-white/70 font-medium tracking-wide mb-1.5">
                  Here's what we found
                </p>

                {/* Headline: 28px bold */}
                <h1 className="text-[28px] font-bold text-white leading-tight mb-6">
                  3 nutrients worth a closer look
                </h1>

                {/* Three stacked cards: white 12% fill, 16px radius, 20px padding, 12px gap */}
                <div className="flex flex-col gap-3">
                  {FLOW_NUTRIENTS.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenPage2(idx)}
                      className="bg-white/[0.12] hover:bg-white/[0.16] active:scale-[0.99] rounded-[16px] p-5 flex items-center justify-between cursor-pointer transition-all duration-150"
                    >
                      <div className="flex items-center gap-3.5 min-w-0 pr-2">
                        {/* Nutrient mark: 56px rounded square, white 15% fill, bold letter */}
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.15] flex items-center justify-center shrink-0">
                          <span className="text-[20px] font-bold text-white tracking-tight">
                            {item.mark}
                          </span>
                        </div>

                        {/* Name 20px semibold + One line 15px white 85% naming the reason */}
                        <div className="min-w-0">
                          <h2 className="text-[20px] font-semibold text-white leading-snug">
                            {item.name}
                          </h2>
                          <p className="text-[15px] text-white/85 leading-tight mt-0.5 line-clamp-2">
                            {item.overviewReason}
                          </p>
                        </div>
                      </div>

                      {/* Chevron on right */}
                      <ChevronRight className="w-5 h-5 text-white/70 shrink-0 ml-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="pt-6 space-y-3">
                {/* Primary button: full-width, white fill, navy text, 52px, 12px radius */}
                <button
                  onClick={() => handleOpenPage2(0)}
                  className="w-full h-[52px] bg-white hover:bg-white/95 text-[#022851] rounded-[12px] font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
                >
                  Next →
                </button>

                {/* Footer: 13px white 60% */}
                <p className="text-[13px] text-white/60 text-center font-normal">
                  Not medical advice
                </p>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 2 — Why (one nutrient, e.g. Vitamin D)                                  */}
          {/* ========================================================================= */}
          {currentPage === 'why' && (
            <motion.div
              key={slideKey}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Top: Back arrow & Step indicator (1 of 3, 2 of 3, 3 of 3) */}
                <header className="flex items-center justify-between pb-3">
                  <button
                    onClick={handlePage2Back}
                    className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Back to overview"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Step dots: small nutrient mark + "1 of 3" */}
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.15] text-[12px] font-bold text-white">
                      {currentNutrient.mark}
                    </span>
                    <span className="text-[13px] text-white/80 font-medium">
                      {nutrientIndex + 1} of {FLOW_NUTRIENTS.length}
                    </span>
                    <div className="flex items-center gap-1 ml-1">
                      {FLOW_NUTRIENTS.map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`h-1.5 rounded-full transition-all ${
                            dotIdx === nutrientIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="w-10" />
                </header>

                {/* Eyebrow: "Why we think so" */}
                <p className="text-[13px] text-white/70 font-medium tracking-wide mt-2 mb-4">
                  Why we think so
                </p>

                {/* Large nutrient mark centered: 96px, letter at 48px bold */}
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-white/[0.15] flex items-center justify-center shadow-inner">
                    <span className="text-[44px] font-bold text-white tracking-tight">
                      {currentNutrient.mark}
                    </span>
                  </div>
                  {/* Below it: nutrient name 22px semibold */}
                  <h2 className="text-[22px] font-semibold text-white mt-2.5">
                    {currentNutrient.name}
                  </h2>
                </div>

                {/* Headline: 26px bold */}
                <h3 className="text-[24px] font-bold text-white leading-tight mb-3">
                  {currentNutrient.whyHeadline}
                </h3>

                {/* Body: 17px white 85%, max 3 short lines */}
                <p className="text-[16px] text-white/85 leading-relaxed mb-4">
                  {currentNutrient.whyBody}
                </p>

                {/* Small quote block: white 10% fill */}
                <div className="bg-white/[0.10] rounded-xl p-3.5 mb-4">
                  <p className="text-[14px] text-white/90 italic font-medium">
                    {currentNutrient.quizAnswerQuote}
                  </p>
                </div>

                {/* One line: 15px white 85% */}
                <p className="text-[15px] text-white/85 leading-snug mb-3">
                  {currentNutrient.oneLiner}
                </p>

                {/* Text link, underlined: "Learn more" */}
                {onOpenNutrientDetail && (
                  <button
                    onClick={() => onOpenNutrientDetail(currentNutrient.id)}
                    className="text-[15px] text-white font-medium underline underline-offset-4 hover:text-white/80 transition-colors inline-block"
                  >
                    Learn more
                  </button>
                )}
              </div>

              {/* Bottom Primary Button */}
              <div className="pt-6">
                <button
                  onClick={() => setCurrentPage('how-to-get')}
                  className="w-full h-[52px] bg-white hover:bg-white/95 text-[#022851] rounded-[12px] font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
                >
                  How do I get more? →
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 3 — What to eat / take (same nutrient)                                */}
          {/* ========================================================================= */}
          {currentPage === 'how-to-get' && (
            <motion.div
              key={slideKey}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Same top bar: Back arrow & "2 of 3" for this nutrient */}
                <header className="flex items-center justify-between pb-2">
                  <button
                    onClick={handlePage3Back}
                    className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Back to why"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.15] text-[12px] font-bold text-white">
                      {currentNutrient.mark}
                    </span>
                    <span className="text-[13px] text-white/80 font-medium">
                      2 of 3 for this nutrient
                    </span>
                  </div>

                  <div className="w-10" />
                </header>

                {/* Eyebrow: "Ways to get more" */}
                <p className="text-[13px] text-white/70 font-medium tracking-wide mb-1">
                  Ways to get more
                </p>

                {/* Headline: 26px bold */}
                <h1 className="text-[26px] font-bold text-white mb-4">
                  {currentNutrient.name}
                </h1>

                {/* Vertical list of 4 option rows: white 12% fill, 16px radius, 64px tall */}
                <div className="flex flex-col gap-2.5 mb-4">
                  {currentNutrient.options.map((option, idx) => {
                    const added = isOptionInRoutine(option.name);

                    return (
                      <div
                        key={idx}
                        className="h-[64px] bg-white/[0.12] rounded-[16px] px-4 flex items-center justify-between transition-colors"
                      >
                        {/* Food icon left + Name 17px semibold + Portion-based amount 15px white 80% */}
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.15] flex items-center justify-center shrink-0">
                            {renderOptionIcon(option.iconType)}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[16px] font-semibold text-white block truncate">
                              {option.name}
                            </span>
                            <span className="text-[14px] text-white/80 block truncate">
                              {option.portion}
                            </span>
                          </div>
                        </div>

                        {/* Right action: "+ Add" ghost button with white outline or Added badge */}
                        {added ? (
                          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-300 bg-white/[0.15] px-2.5 py-1 rounded-lg shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            Added
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAddOption(option)}
                            className="border border-white/80 hover:bg-white/10 active:scale-95 text-white rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-all shrink-0"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Collapsed supplement row: "Supplement option ⌄" */}
                <div className="bg-white/[0.10] rounded-[16px] overflow-hidden transition-all">
                  <button
                    onClick={() => setSuppExpanded((prev) => !prev)}
                    className="w-full h-12 px-4 flex items-center justify-between text-left text-[14px] font-medium text-white/90 hover:bg-white/[0.05] transition-colors"
                  >
                    <span>Supplement option</span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
                        suppExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {suppExpanded && (
                    <div className="px-4 pb-3.5 pt-1 text-[13px] text-white/85 leading-relaxed border-t border-white/10">
                      <p>{currentNutrient.supplementText}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Primary Button */}
              <div className="pt-6">
                <button
                  onClick={handleNextFromPage3}
                  className="w-full h-[52px] bg-white hover:bg-white/95 text-[#022851] rounded-[12px] font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
                >
                  {nutrientIndex < FLOW_NUTRIENTS.length - 1 ? 'Next nutrient →' : 'Finish'}
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* FINISH page ("You're set.")                                                */}
          {/* ========================================================================= */}
          {currentPage === 'finish' && (
            <motion.div
              key="finish"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Headline: "You're set." */}
                <h1 className="text-[32px] font-bold text-white tracking-tight mb-2 pt-4">
                  You're set.
                </h1>

                <p className="text-[15px] text-white/80 leading-snug mb-6">
                  Here are the practical food portions and habits added to your daily student routine.
                </p>

                {/* Three compact rows showing what was added to the routine, with a small "Remove" text link on each */}
                <div className="space-y-3 mb-6">
                  {routineItems.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/[0.12] rounded-[14px] p-3.5 flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-3">
                        <span className="text-[15px] font-semibold text-white block truncate">
                          {item.name}
                        </span>
                        <span className="text-[13px] text-white/75 block truncate">
                          {item.detail}
                        </span>
                      </div>

                      {/* Small "Remove" text link */}
                      <button
                        onClick={() => handleRemoveOption(item.id, item.name)}
                        className="text-[13px] text-white/70 hover:text-white underline underline-offset-2 shrink-0 transition-colors"
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

              {/* Bottom Section */}
              <div className="pt-6 space-y-3.5">
                {/* Primary button: "Go to home" */}
                <button
                  onClick={onFinishFlow}
                  className="w-full h-[52px] bg-white hover:bg-white/95 text-[#022851] rounded-[12px] font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
                >
                  Go to home
                </button>

                {/* Footer 14px white 70%: "This is an estimate from 5 answers, not a test. Talk to a doctor or Student Health for anything real." */}
                <p className="text-[13px] text-white/70 text-center leading-relaxed">
                  This is an estimate from 5 answers, not a test. Talk to a doctor or Student Health for anything real.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Toast with Undo (#5 Error Prevention & #3 User Control) */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[340px] w-full px-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="bg-white text-[#022851] py-2.5 px-4 rounded-xl shadow-xl flex items-center justify-between text-[13px] font-medium border border-slate-200">
              <span className="truncate pr-2">{toastMessage}</span>
              <button
                onClick={handleUndo}
                className="text-[#022851] font-bold underline shrink-0 hover:opacity-80 transition-opacity"
              >
                Undo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
