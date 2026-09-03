import React from 'react';
import { ShieldCheck, Scale, AlertCircle, Building2 } from 'lucide-react';
import { PageShell } from '../../common/PageShell';
import { BackHeader } from '../../common/BackHeader';
import { Button } from '../../common/Button';
import { VitoMascot } from '../../common/VitoMascot';
import { RuleCard } from './RuleCard';
import { INFERENCE_RULES } from './rules';

interface HowThisWorksViewProps {
  onBack: () => void;
  onStartQuiz: () => void;
}

/**
 * Methodology page. Elements top to bottom: hero, medical disclaimer, one RuleCard per inference rule,
 * "portions over numbers" note, when-to-see-a-doctor note, privacy line, CTA.
 */
export const HowThisWorksView: React.FC<HowThisWorksViewProps> = ({ onBack, onStartQuiz }) => (
  <PageShell className="px-5 pt-4 pb-24">
    <BackHeader onBack={onBack} className="pb-3 mb-2 border-b border-slate-200/80">
      <span className="text-[14px] font-bold text-slate-900">How It Works</span>
    </BackHeader>

    <main className="space-y-4 overflow-y-auto no-scrollbar">
      {/* Hero */}
      <section className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
          <VitoMascot size="sm" animate={false} />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Rule-Based Methodology</span>
          <h1 className="text-[17px] font-bold text-slate-900 leading-tight">Inference, Not a Clinical Diagnosis</h1>
        </div>
      </section>

      {/* Medical disclaimer */}
      <section className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-[14px] font-bold text-amber-950">Important Medical Clarification</h2>
            <p className="text-[13px] leading-relaxed text-amber-900">
              NutriLens is an educational guidance tool. The inference is <strong>rule-based from your answers</strong>, not a
              clinical blood diagnosis or laboratory test. It flags nutrients worth a closer look in your daily campus dining
              routine.
            </p>
          </div>
        </div>
      </section>

      {/* Inference rules */}
      <section className="space-y-2.5">
        <h2 className="text-[14px] font-bold uppercase tracking-wider text-slate-500">How the inference works</h2>
        {INFERENCE_RULES.map((rule) => (
          <RuleCard key={rule.nutrient} rule={rule} />
        ))}
      </section>

      {/* Portions over numbers */}
      <section className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-indigo-600" />
          <h2 className="text-[14px] font-bold text-slate-900">Portions Over Abstract Numbers</h2>
        </div>
        <p className="text-[12px] text-slate-600 leading-relaxed">
          Instead of confusing clinical units like "570 IU" or "2.4 mcg", NutriLens translates requirements into recognizable
          campus portions: <em>1 salmon fillet ≈ a full day's worth</em>, <em>2 eggs ≈ 15%</em>, or{' '}
          <em>1 orange ≈ a full day</em>.
        </p>
      </section>

      {/* When to see Student Health */}
      <section className="bg-indigo-50/70 rounded-xl p-4 border border-indigo-100 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-indigo-600" />
          <h2 className="text-[14px] font-bold text-slate-900">When to Visit Student Health</h2>
        </div>
        <p className="text-[12px] text-slate-600 leading-relaxed">
          If you experience persistent severe fatigue, bone aches, or unusual muscle weakness, schedule an appointment with your
          campus Student Health Center for an authentic blood test (like a serum 25(OH)D panel).
        </p>
      </section>

      <div className="flex items-center justify-center gap-2 text-[12px] text-slate-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>100% client-side privacy · No answers leave your browser</span>
      </div>

      <div className="pt-2">
        <Button onClick={onStartQuiz}>Take 60-second assessment</Button>
      </div>
    </main>
  </PageShell>
);
