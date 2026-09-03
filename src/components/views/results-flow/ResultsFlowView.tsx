import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { FoodSource, RoutineItem } from '../../../types';
import { FLAGGED_NUTRIENTS } from '../../../data/mockData';
import { hasRoutineItemNamed } from '../../../lib/routine';
import { PageShell } from '../../common/PageShell';
import { Toast } from '../../common/Toast';
import { FlowPage } from './FlowPage';
import { OverviewPage } from './OverviewPage';
import { WhyPage } from './WhyPage';
import { HowToGetPage } from './HowToGetPage';
import { FinishPage } from './FinishPage';

type FlowStep = 'overview' | 'why' | 'how-to-get' | 'finish';

interface ResultsFlowViewProps {
  routineItems: RoutineItem[];
  onAddRoutineItem: (item: RoutineItem) => void;
  onRemoveRoutineItem: (itemId: string) => void;
  onFinishFlow: () => void;
  onOpenNutrientDetail?: (nutrientId: string) => void;
}

/**
 * Dark, story-style walkthrough of the flagged nutrients.
 * State machine: overview -> (why -> how-to-get) per nutrient -> finish.
 * Owns the toast + single-level undo for add/remove actions; the pages are stateless except for local accordions.
 */
export const ResultsFlowView: React.FC<ResultsFlowViewProps> = ({
  routineItems,
  onAddRoutineItem,
  onRemoveRoutineItem,
  onFinishFlow,
  onOpenNutrientDetail
}) => {
  const [step, setStep] = useState<FlowStep>('overview');
  const [nutrientIndex, setNutrientIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [lastChange, setLastChange] = useState<{ item: RoutineItem; action: 'add' | 'remove' } | null>(null);

  const nutrient = FLAGGED_NUTRIENTS[nutrientIndex];
  const isLastNutrient = nutrientIndex === FLAGGED_NUTRIENTS.length - 1;

  const openNutrient = (index: number) => {
    setNutrientIndex(index);
    setStep('why');
  };

  const addSource = (source: FoodSource) => {
    const item: RoutineItem = {
      id: `flow-${nutrient.id}-${source.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: source.name,
      detail: source.amount,
      category: 'food',
      completed: false,
      nutrientId: nutrient.id
    };
    onAddRoutineItem(item);
    setLastChange({ item, action: 'add' });
    setToast(`${source.name} added to your routine`);
  };

  const removeItem = (item: RoutineItem) => {
    onRemoveRoutineItem(item.id);
    setLastChange({ item, action: 'remove' });
    setToast(`${item.name} removed`);
  };

  const undo = () => {
    if (!lastChange) return;
    if (lastChange.action === 'add') {
      onRemoveRoutineItem(lastChange.item.id);
      setToast(`${lastChange.item.name} removed`);
    } else {
      onAddRoutineItem(lastChange.item);
      setToast(`${lastChange.item.name} restored`);
    }
    setLastChange(null);
  };

  return (
    <PageShell dark className="min-h-[852px] justify-between px-5 py-6 relative select-none">
      <AnimatePresence mode="wait">
        {step === 'overview' && (
          <FlowPage key="overview">
            <OverviewPage nutrients={FLAGGED_NUTRIENTS} onSelect={openNutrient} />
          </FlowPage>
        )}

        {step === 'why' && (
          <FlowPage key={`why-${nutrientIndex}`}>
            <WhyPage
              nutrient={nutrient}
              index={nutrientIndex}
              total={FLAGGED_NUTRIENTS.length}
              onBack={() => setStep('overview')}
              onNext={() => setStep('how-to-get')}
              onLearnMore={onOpenNutrientDetail && (() => onOpenNutrientDetail(nutrient.id))}
            />
          </FlowPage>
        )}

        {step === 'how-to-get' && (
          <FlowPage key={`how-${nutrientIndex}`}>
            <HowToGetPage
              nutrient={nutrient}
              isLast={isLastNutrient}
              isInRoutine={(name) => hasRoutineItemNamed(routineItems, name)}
              onAdd={addSource}
              onBack={() => setStep('why')}
              onNext={() => (isLastNutrient ? setStep('finish') : openNutrient(nutrientIndex + 1))}
            />
          </FlowPage>
        )}

        {step === 'finish' && (
          <FlowPage key="finish">
            <FinishPage routineItems={routineItems} onRemove={removeItem} onFinish={onFinishFlow} />
          </FlowPage>
        )}
      </AnimatePresence>

      <Toast message={toast} onUndo={lastChange ? undo : undefined} inverse />
    </PageShell>
  );
};
