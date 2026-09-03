import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onUndo?: () => void;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onUndo }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[360px] animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-[14px] font-medium truncate text-slate-100">{message}</span>
        </div>
        {onUndo && (
          <button
            onClick={onUndo}
            className="text-[13px] font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-2 active:scale-95 transition-all shrink-0 ml-2"
          >
            Undo
          </button>
        )}
      </div>
    </div>
  );
};
