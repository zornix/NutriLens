import React from 'react';
import { Nutrient } from '../../../types';

interface NutrientCarouselProps {
  nutrients: Nutrient[];
  onOpen: (nutrientId: string) => void;
}

/** Horizontally scrolling row of image cards, one per nutrient. Tap opens the detail screen. */
export const NutrientCarousel: React.FC<NutrientCarouselProps> = ({ nutrients, onOpen }) => (
  <section className="flex flex-col gap-2 mb-5">
    <div className="flex items-center justify-between">
      <h2 className="text-[17px] font-bold text-slate-900">Your nutrients</h2>
      <span className="text-[12px] font-medium text-slate-500">Daily scan</span>
    </div>

    <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
      {nutrients.map((n) => (
        <article
          key={n.id}
          onClick={() => onOpen(n.id)}
          className="flex-shrink-0 w-[125px] bg-white p-2.5 rounded-xl shadow-xs border border-slate-200 flex flex-col cursor-pointer hover:border-indigo-300 active:scale-[0.98] transition-all"
        >
          <div className="w-full h-22 rounded-lg overflow-hidden bg-slate-100 mb-2 border border-slate-100">
            <img src={n.imageUrl} alt={n.name} className="w-full h-full object-cover" />
          </div>
          <div className="px-0.5 pb-0.5">
            <p className="text-[13px] font-bold text-slate-900 leading-tight">{n.name}</p>
            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{n.tagline}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);
