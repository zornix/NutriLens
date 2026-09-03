import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
  /** Extra classes for the inner phone column (padding, bottom spacing for BottomNav, etc.). */
  className?: string;
  /** Navy theme used by the results flow. */
  dark?: boolean;
}

/**
 * Centers a screen in a 393px phone-width column on any viewport.
 * Every screen starts with this so layout rules live in one place.
 */
export const PageShell: React.FC<PageShellProps> = ({ children, className = '', dark = false }) => (
  <div
    className={`w-full min-h-screen flex justify-center ${
      dark
        ? 'bg-[#022851] selection:bg-white selection:text-[#022851]'
        : 'bg-slate-50 selection:bg-indigo-600 selection:text-white'
    }`}
  >
    <div className={`w-full max-w-[393px] min-h-screen flex flex-col ${dark ? 'text-white' : ''} ${className}`}>
      {children}
    </div>
  </div>
);
