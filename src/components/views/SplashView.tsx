import React from 'react';
import { VitoMascot } from '../common/VitoMascot';

interface SplashViewProps {
  onStartQuiz: () => void;
  onContinueAsGuest: () => void;
  onOpenHowItWorks: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({
  onStartQuiz,
  onContinueAsGuest,
  onOpenHowItWorks
}) => {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-between px-6 py-10 relative overflow-hidden select-none">
      {/* Top Background Glow */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top 45%: Mascot Animation Section */}
      <div className="w-full flex-1 flex flex-col items-center justify-center pt-8 z-10">
        <div className="relative">
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-b from-indigo-50/60 to-slate-100 border border-slate-200/80 flex items-center justify-center shadow-xs">
            <VitoMascot size="hero" animate={true} />
          </div>
          {/* Mascot Tag */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-slate-200 shadow-xs text-center whitespace-nowrap">
            <span className="text-[12px] font-semibold text-indigo-600 tracking-tight">
              Meet Vito · Your Nutrition Guide
            </span>
          </div>
        </div>
      </div>

      {/* Center Copy Section */}
      <div className="w-full max-w-sm flex flex-col items-center text-center z-10 my-auto py-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-semibold uppercase tracking-wider mb-3">
          Evidence-Based Nutrition
        </div>
        <h1 className="text-[32px] leading-[38px] font-bold text-slate-900 tracking-tight mb-2">
          Improve your journey
        </h1>
        <p className="text-[16px] leading-[24px] text-slate-500 max-w-[280px]">
          Find the gaps in your diet in 60 seconds.
        </p>
      </div>

      {/* Bottom Actions Section */}
      <div className="w-full max-w-sm flex flex-col items-center gap-2.5 z-10 pb-4">
        <button
          onClick={onStartQuiz}
          className="w-full h-[50px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-[16px] flex items-center justify-center shadow-sm shadow-indigo-500/20 active:scale-[0.99] transition-all duration-150"
        >
          Take the quiz
        </button>

        <button
          onClick={onContinueAsGuest}
          className="w-full h-[46px] bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-medium text-[15px] shadow-xs transition-colors"
        >
          Continue as guest
        </button>

        <div className="flex items-center gap-2 text-[12px] text-slate-400 pt-2">
          <span>Not medical advice</span>
          <span>·</span>
          <button
            onClick={onOpenHowItWorks}
            className="hover:text-slate-800 underline underline-offset-2 transition-colors"
          >
            How this works
          </button>
        </div>
      </div>
    </div>
  );
};
