import React from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface NutrientModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  keyPoints?: string[];
  onClose: () => void;
  onAction?: () => void;
  actionText?: string;
}

export const NutrientModal: React.FC<NutrientModalProps> = ({
  isOpen,
  title,
  description,
  keyPoints,
  onClose,
  onAction,
  actionText = 'Understood'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-[393px] bg-slate-900 text-white rounded-t-2xl sm:rounded-2xl p-6 border-t sm:border border-slate-800 shadow-2xl animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-[19px] font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[14px] text-slate-300 leading-relaxed mb-4">
          {description}
        </p>

        {keyPoints && keyPoints.length > 0 && (
          <div className="space-y-2 mb-5 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            {keyPoints.map((pt, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-[13px] text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2">
          {onAction && actionText !== 'Understood' ? (
            <button
              onClick={() => {
                onAction();
                onClose();
              }}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-sm shadow-indigo-500/20 transition-all active:scale-[0.98]"
            >
              {actionText}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-sm shadow-indigo-500/20 transition-all active:scale-[0.98]"
            >
              Understood
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
