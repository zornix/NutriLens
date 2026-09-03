import React from 'react';
import { Home, Compass, CalendarCheck, User } from 'lucide-react';
import { AppScreen } from '../../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'routine', label: 'Routine', icon: CalendarCheck },
    { id: 'profile', label: 'Profile', icon: User }
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-[393px] bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-sm px-4 py-2 flex justify-around items-center pointer-events-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id as AppScreen)}
              className={`flex flex-col items-center justify-center transition-all duration-150 py-1.5 px-3.5 rounded-lg active:scale-95 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" strokeWidth={isActive ? 2.2 : 1.8} />
              <span className={`text-[11px] leading-tight font-medium ${isActive ? 'font-semibold text-white' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
