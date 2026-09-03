import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import { UserProfile } from '../../../types';
import { PageShell } from '../../common/PageShell';
import { ScreenHeader } from '../../common/ScreenHeader';
import { VitoMascot } from '../../common/VitoMascot';

interface ProfileViewProps {
  userProfile: UserProfile;
  onRetakeQuiz: () => void;
}

/** Profile tab: user card, mascot status card, quick-actions list, disclaimer footer. Read-only for now. */
export const ProfileView: React.FC<ProfileViewProps> = ({ userProfile, onRetakeQuiz }) => (
  <PageShell className="px-5 pt-4 pb-28">
    <ScreenHeader eyebrow="Student Account" title="Profile" />

    {/* User card */}
    <section className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 flex items-center gap-3.5 mb-4">
      <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[20px] shadow-xs">
        {userProfile.name.charAt(0)}
      </div>
      <div>
        <h2 className="text-[16px] font-bold text-slate-900">{userProfile.name}</h2>
        <p className="text-[12px] text-slate-500">{userProfile.campusYear}</p>
        <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-100">
          {userProfile.dietPreference}
        </span>
      </div>
    </section>

    {/* Mascot status card */}
    <section className="bg-indigo-50/70 rounded-xl p-3.5 border border-indigo-100 shadow-xs flex items-center gap-3 mb-4">
      <VitoMascot size="sm" animate={false} />
      <div className="flex-1 min-w-0">
        <h3 className="text-[13px] font-bold text-slate-900">NutriLens Baseline Active</h3>
        <p className="text-[12px] text-slate-600 mt-0.5">Assessing Vitamin D, B12, and C for academic stamina.</p>
      </div>
    </section>

    {/* Quick actions */}
    <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100 mb-5">
      <button
        onClick={onRetakeQuiz}
        className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100/80">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[13px] font-bold text-slate-900 block">Retake Nutrition Assessment</span>
            <span className="text-[11px] text-slate-500 block">Re-evaluate dining and sunlight habits</span>
          </div>
        </div>
        <span className="text-[12px] font-semibold text-indigo-600">Start →</span>
      </button>

      <div className="p-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/60">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[13px] font-bold text-slate-900 block">Privacy & Data</span>
          <span className="text-[11px] text-slate-500 block">Stored securely on your client device</span>
        </div>
      </div>
    </section>

    <footer className="mt-auto text-center pb-4 text-[11px] text-slate-400 space-y-1">
      <p className="font-semibold text-slate-700">Not Medical Advice</p>
      <p>
        NutriLens is an educational estimate for campus lifestyle guidance. Consult a medical practitioner or campus Student
        Health center for clinical lab panels.
      </p>
    </footer>
  </PageShell>
);
