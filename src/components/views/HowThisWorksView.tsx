import React from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Brain,
  Scale,
  Sun,
  Egg,
  Apple,
  AlertCircle,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { VitoMascot } from '../common/VitoMascot';

interface HowThisWorksViewProps {
  onBack: () => void;
  onStartQuiz: () => void;
}

export const HowThisWorksView: React.FC<HowThisWorksViewProps> = ({
  onBack,
  onStartQuiz
}) => {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center selection:bg-indigo-600 selection:text-white pb-24">
      <div className="w-full max-w-[393px] min-h-screen bg-slate-50 flex flex-col px-5 pt-4">
        {/* Header */}
        <header className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/80">
          <button
            onClick={onBack}
            className="w-9 h-9 -ml-1 flex items-center justify-center rounded-lg hover:bg-slate-200/60 active:scale-95 transition-all text-slate-700"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-[14px] font-bold text-slate-900">How It Works</span>
          <div className="w-9" />
        </header>

        <main className="space-y-4 overflow-y-auto no-scrollbar">
          {/* Hero Banner */}
          <section className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
              <VitoMascot size="sm" animate={false} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                Rule-Based Methodology
              </span>
              <h1 className="text-[17px] font-bold text-slate-900 leading-tight">
                Inference, Not a Clinical Diagnosis
              </h1>
            </div>
          </section>

          {/* Primary HCI Heuristic Callout (#10 Help & Documentation) */}
          <section className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-[14px] font-bold text-amber-950">
                  Important Medical Clarification
                </h2>
                <p className="text-[13px] leading-relaxed text-amber-900">
                  NutriLens is an educational guidance tool. The inference is <strong>rule-based from your answers</strong>, not a clinical blood diagnosis or laboratory test. It flags nutrients worth a closer look in your daily campus dining routine.
                </p>
              </div>
            </div>
          </section>

          {/* Core Methodology Cards */}
          <section className="space-y-2.5">
            <h2 className="text-[14px] font-bold uppercase tracking-wider text-slate-500">
              How the inference works
            </h2>

            {/* Rule 1: Vitamin D */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-slate-900">Sunlight Rule</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                    Vitamin D
                  </span>
                </div>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Humans synthesize ~80% of Vitamin D through UVB sunlight. Spending &lt; 30 min outside most days triggers an evaluation because food sources alone rarely meet student targets.
                </p>
              </div>
            </div>

            {/* Rule 2: Vitamin B12 */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                <Egg className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-slate-900">Protein Pattern Rule</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                    Vitamin B12
                  </span>
                </div>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Vitamin B12 is produced by bacteria in animal products and fortified foods. When someone eats eggs but little meat, dairy, or fish, we highlight campus-friendly fortified options.
                </p>
              </div>
            </div>

            {/* Rule 3: Vitamin C */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <Apple className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-slate-900">Produce Frequency Rule</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                    Vitamin C
                  </span>
                </div>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Vitamin C is strictly water-soluble and cannot be stored in the body. If fresh produce is eaten once a day or less, daily levels quickly dip below optimal immune maintenance.
                </p>
              </div>
            </div>
          </section>

          {/* Real World Portions */}
          <section className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-600" />
              <h2 className="text-[14px] font-bold text-slate-900">
                Portions Over Abstract Numbers
              </h2>
            </div>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              Instead of confusing clinical units like "570 IU" or "2.4 mcg", NutriLens translates requirements into recognizable campus portions: <em>1 salmon fillet ≈ a full day's worth</em>, <em>2 eggs ≈ 15%</em>, or <em>1 orange ≈ a full day</em>.
            </p>
          </section>

          {/* Campus Student Health */}
          <section className="bg-indigo-50/70 rounded-xl p-4 border border-indigo-100 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <h2 className="text-[14px] font-bold text-slate-900">
                When to Visit Student Health
              </h2>
            </div>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              If you experience persistent severe fatigue, bone aches, or unusual muscle weakness, schedule an appointment with your campus Student Health Center for an authentic blood test (like a serum 25(OH)D panel).
            </p>
          </section>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-[12px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>100% client-side privacy · No answers leave your browser</span>
          </div>

          {/* Bottom Action */}
          <div className="pt-2">
            <button
              onClick={onStartQuiz}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-[15px] flex items-center justify-center shadow-xs active:scale-[0.98] transition-all"
            >
              Take 60-second assessment
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
