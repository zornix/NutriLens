import React, { useEffect, useId, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useEscapeKey } from '../../lib/useEscapeKey';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  body: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Centered "are you sure?" dialog for destructive actions (H5 error prevention).
 * Focus lands on the safe Cancel button; Escape and backdrop tap cancel (H3).
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  body,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}) => {
  const titleId = useId();
  const bodyId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);
  useEscapeKey(onCancel, isOpen);
  useEffect(() => {
    if (isOpen) cancelRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-5 z-50 animate-in fade-in duration-150"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        className="bg-white rounded-2xl p-5 max-w-[340px] w-full shadow-xl border border-slate-200 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200 shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" aria-hidden />
          </div>
          <h3 id={titleId} className="text-[16px] font-bold text-slate-900">
            {title}
          </h3>
        </div>
        <p id={bodyId} className="text-[13px] text-slate-600 leading-relaxed">
          {body}
        </p>
        <div className="flex gap-2 pt-1">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="flex-1 h-11 rounded-xl border border-slate-200 font-medium text-[13px] text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[13px] transition-colors shadow-xs"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
