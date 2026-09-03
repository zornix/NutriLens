import React from 'react';

interface ScreenHeaderProps {
  /** Small uppercase label above the title, e.g. "Daily Nutrition Plan". */
  eyebrow: string;
  title: string;
  /** Optional action rendered on the right (avatar button, add button...). */
  right?: React.ReactNode;
}

/** Top-of-tab header used by Home, Discover, Routine and Profile. */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ eyebrow, title, right }) => (
  <header className="flex justify-between items-center mb-4">
    <div className="flex flex-col">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{eyebrow}</span>
      <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">{title}</h1>
    </div>
    {right}
  </header>
);
