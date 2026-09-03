import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  /** Null hides the toast. */
  message: string | null;
  onUndo?: () => void;
  /** White-on-navy styling for the dark results flow. */
  inverse?: boolean;
}

/**
 * Bottom-anchored confirmation with optional Undo link.
 * ponytail: no auto-dismiss; the parent clears `message` (usually on the next action). Add a timer if users ask.
 */
export const Toast: React.FC<ToastProps> = ({ message, onUndo, inverse = false }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[360px] animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div
        className={`px-4 py-3 rounded-xl shadow-xl border flex items-center justify-between ${
          inverse ? 'bg-white text-[#022851] border-slate-200' : 'bg-slate-900 text-white border-slate-700/80'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-[14px] font-medium truncate">{message}</span>
        </div>
        {onUndo && (
          <button
            onClick={onUndo}
            className={`text-[13px] font-semibold underline underline-offset-2 active:scale-95 transition-all shrink-0 ml-2 ${
              inverse ? 'text-[#022851] hover:opacity-80' : 'text-indigo-400 hover:text-indigo-300'
            }`}
          >
            Undo
          </button>
        )}
      </div>
    </div>
  );
};
