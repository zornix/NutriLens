import React from 'react';

type Variant = 'primary' | 'secondary' | 'inverse';

const VARIANTS: Record<Variant, string> = {
  /** Indigo call-to-action on light screens. */
  primary:
    'h-12 rounded-xl text-[15px] font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20',
  /** White outlined button on light screens. */
  secondary:
    'h-12 rounded-xl text-[15px] font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs',
  /** White button with navy text for the dark results flow. */
  inverse: 'h-[52px] rounded-[12px] text-[16px] font-bold bg-white hover:bg-white/95 text-[#022851] shadow-sm'
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/** Full-width action button. All screen-level CTAs go through this so sizing stays consistent. */
export const Button: React.FC<ButtonProps> = ({ variant = 'primary', type = 'button', className = '', children, ...rest }) => (
  <button
    type={type}
    className={`w-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:pointer-events-none disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none ${VARIANTS[variant]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);
