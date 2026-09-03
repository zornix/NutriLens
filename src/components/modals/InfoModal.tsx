import React, { useEffect, useId, useRef } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { useEscapeKey } from '../../lib/useEscapeKey';

interface InfoModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  /** Bulleted takeaways shown in a highlighted box. */
  keyPoints?: string[];
  onClose: () => void;
  /** Runs before closing when the action button is pressed. */
  onAction?: () => void;
  actionText?: string;
}

/**
 * Dark bottom-sheet for reading an article or an explanation.
 * Accessible dialog: labelled by its title, closes on Escape or backdrop tap, focus moves to Close on open (H3).
 */
export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  title,
  description,
  keyPoints,
  onClose,
  onAction,
  actionText = 'Understood'
}) => {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEscapeKey(onClose, isOpen);
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-[393px] bg-slate-900 text-white rounded-t-2xl sm:rounded-2xl p-6 border-t sm:border border-slate-800 shadow-2xl animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-4" aria-hidden />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" aria-hidden />
            <h3 id={titleId} className="text-[19px] font-bold text-white">
              {title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[14px] text-slate-300 leading-relaxed mb-4">{description}</p>

        {keyPoints && keyPoints.length > 0 && (
          <ul className="space-y-2 mb-5 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            {keyPoints.map((pt) => (
              <li key={pt} className="flex items-center gap-2.5 text-[13px] text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => {
            onAction?.();
            onClose();
          }}
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-sm shadow-indigo-500/20 transition-all active:scale-[0.98]"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};
