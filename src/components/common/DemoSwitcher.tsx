import React from 'react';
import { AppScreen } from '../../types';

/** Screens exposed in the demo bar, in display order. */
const SCREENS: { id: AppScreen; label: string }[] = [
  { id: 'splash', label: 'Splash' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'results-flow', label: 'Dark Results Flow' },
  { id: 'results-list', label: 'Summary List' },
  { id: 'home', label: 'Home' },
  { id: 'nutrient-detail', label: 'Nutrient Detail' },
  { id: 'how-it-works', label: 'How It Works' }
];

interface DemoSwitcherProps {
  current: AppScreen;
  onSelect: (screen: AppScreen) => void;
}

/** Dev-only top bar for jumping straight to any screen. Remove from App.tsx for production. */
export const DemoSwitcher: React.FC<DemoSwitcherProps> = ({ current, onSelect }) => (
  <nav
    aria-label="Demo page switcher"
    className="w-full bg-[#0F172A] border-b border-slate-800 text-slate-300 py-1.5 px-3 z-50 flex items-center justify-between text-[11px] overflow-x-auto no-scrollbar shadow-sm"
  >
    <span className="font-bold text-indigo-400 tracking-wider uppercase text-[10px] shrink-0">NutriLens Demo:</span>
    <div className="flex items-center gap-1 shrink-0">
      {SCREENS.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`px-2.5 py-0.5 rounded-md transition-colors ${
            current === s.id
              ? 'bg-indigo-600 text-white font-medium shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  </nav>
);
