import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../../common/Button';

interface AddToRoutineBarProps {
  isAdded: boolean;
  onAdd: () => void;
}

/** Sticky bottom bar with the page's single primary action. Shows a passive "In your routine" state once added. */
export const AddToRoutineBar: React.FC<AddToRoutineBarProps> = ({ isAdded, onAdd }) => (
  <div className="fixed bottom-0 max-w-[393px] w-full bg-white/95 backdrop-blur-md p-3.5 border-t border-slate-200 shadow-sm z-40">
    {isAdded ? (
      <Button variant="secondary" disabled className="disabled:bg-slate-100 disabled:text-slate-700">
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        <span>In your routine</span>
      </Button>
    ) : (
      <Button onClick={onAdd}>Add to routine</Button>
    )}
  </div>
);
