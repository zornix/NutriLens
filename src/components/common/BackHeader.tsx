import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackHeaderProps {
  onBack: () => void;
  /** Center content: a title, progress dots, a step counter... */
  children?: React.ReactNode;
  /** Right slot. Defaults to an invisible spacer so the center stays centered. */
  right?: React.ReactNode;
  /** White-on-navy styling for the results flow. */
  dark?: boolean;
  className?: string;
  backLabel?: string;
}

/** Back arrow + centered content + right slot. Used by every "drill-in" screen. */
export const BackHeader: React.FC<BackHeaderProps> = ({
  onBack,
  children,
  right,
  dark = false,
  className = '',
  backLabel = 'Go back'
}) => (
  <header className={`flex items-center justify-between ${className}`}>
    <button
      onClick={onBack}
      aria-label={backLabel}
      className={`w-10 h-10 -ml-2 rounded-xl flex items-center justify-center active:scale-95 transition-all ${
        dark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-200/60'
      }`}
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
    {children}
    {right ?? <div className="w-10" />}
  </header>
);
