import React, { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  /** Null hides the toast. */
  message: string | null;
  onUndo?: () => void;
  /** Called after `duration` ms so the parent can clear `message`. */
  onDismiss?: () => void;
  duration?: number;
  /** White-on-navy styling for the dark results flow. */
  inverse?: boolean;
}

/**
 * Bottom-anchored confirmation with optional Undo.
 * The wrapper is a permanent live region so screen readers announce each message (H1),
 * and the toast dismisses itself after `duration` so it never has to be closed by hand (H8).
 */
export const Toast: React.FC<ToastProps> = ({ message, onUndo, onDismiss, duration = 5000, inverse = false }) => {
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => dismissRef.current?.(), duration);
    return () => clearTimeout(t);
  }, [message, duration]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[360px] pointer-events-none"
    >
      {message && (
        <div
          className={`pointer-events-auto px-4 py-3 rounded-xl shadow-xl border flex items-center justify-between animate-in fade-in slide-in-from-bottom-5 duration-200 ${
            inverse ? 'bg-white text-[#022851] border-slate-200' : 'bg-slate-900 text-white border-slate-700/80'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden />
            <span className="text-[14px] font-medium truncate">{message}</span>
          </div>
          {onUndo && (
            <button
              type="button"
              onClick={onUndo}
              className={`min-h-9 px-1 text-[13px] font-semibold underline underline-offset-2 active:scale-95 transition-all shrink-0 ml-2 ${
                inverse ? 'text-[#022851] hover:opacity-80' : 'text-indigo-400 hover:text-indigo-300'
              }`}
            >
              Undo
            </button>
          )}
        </div>
      )}
    </div>
  );
};
