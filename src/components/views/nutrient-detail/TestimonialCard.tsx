import React from 'react';
import { Quote } from 'lucide-react';
import { Nutrient } from '../../../types';

/** Dark quote card with avatar, author and role. */
export const TestimonialCard: React.FC<{ testimonial: Nutrient['testimonial'] }> = ({ testimonial }) => (
  <section className="bg-slate-900 text-white rounded-xl p-3.5 relative overflow-hidden shadow-xs">
    <Quote className="w-8 h-8 absolute -bottom-1 -right-1 text-slate-800" />
    <p className="text-[12px] leading-relaxed italic mb-2 relative z-10 text-slate-200">"{testimonial.quote}"</p>
    <div className="flex items-center gap-2.5 relative z-10">
      <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
        <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="text-[12px] font-bold text-white">{testimonial.author}</div>
        <div className="text-[10px] text-slate-500">{testimonial.role}</div>
      </div>
    </div>
  </section>
);
