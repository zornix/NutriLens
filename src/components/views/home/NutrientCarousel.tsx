import React from 'react';
import { Nutrient } from '../../../types';

interface NutrientCarouselProps {
  nutrients: Nutrient[];
  onOpen: (nutrientId: string) => void;
}

/** Horizontally scrolling row of image cards, one per nutrient. Each card is a real button (keyboard + screen reader). */
export const NutrientCarousel: React.FC<NutrientCarouselProps> = ({ nutrients, onOpen }) => (
  <section className="flex flex-col gap-2 mb-5" aria-labelledby="home-nutrients">
    <div className="flex items-center justify-between">
      <h2 id="home-nutrients" className="text-[17px] font-bold text-slate-900">
        Your nutrients
      </h2>
      <span className="text-[12px] font-medium text-slate-500">Daily scan</span>
    </div>

    <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
      {nutrients.map((n) => (
        <button
          key={n.id}
          type="button"
          onClick={() => onOpen(n.id)}
          className="flex-shrink-0 w-[125px] bg-white p-2.5 rounded-xl shadow-xs border border-slate-200 flex flex-col text-left cursor-pointer hover:border-indigo-300 active:scale-[0.98] transition-all"
        >
          <span className="block w-full h-22 rounded-lg overflow-hidden bg-slate-100 mb-2 border border-slate-100">
            <img src={n.imageUrl} alt="" loading="lazy" className="w-full h-full object-cover" />
          </span>
          <span className="block px-0.5 pb-0.5">
            <span className="block text-[13px] font-bold text-slate-900 leading-tight">{n.name}</span>
            <span className="block text-[11px] text-slate-500 mt-0.5 line-clamp-1">{n.tagline}</span>
          </span>
        </button>
      ))}
    </div>
  </section>
);
