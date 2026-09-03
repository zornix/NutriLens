import React from 'react';
import { InferenceRule } from './rules';

/** White card explaining one inference rule: icon tile, title, nutrient tag, body. */
export const RuleCard: React.FC<{ rule: InferenceRule }> = ({ rule }) => (
  <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-start gap-3">
    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${rule.tone}`}>
      <rule.Icon className="w-5 h-5" />
    </div>
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-bold text-slate-900">{rule.title}</span>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 rounded">{rule.nutrient}</span>
      </div>
      <p className="text-[12px] text-slate-600 leading-relaxed">{rule.body}</p>
    </div>
  </div>
);
