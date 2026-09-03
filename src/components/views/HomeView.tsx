import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Check,
  CheckCircle2,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { VitoMascot } from '../common/VitoMascot';
import { NUTRIENTS_DATA, EDUCATIONAL_ARTICLES } from '../../data/mockData';
import { RoutineItem } from '../../types';

interface HomeViewProps {
  userName: string;
  onOpenAssessment: () => void;
  onOpenNutrientDetail: (nutrientId: string) => void;
  onOpenArticle: (articleId: string) => void;
  onOpenProfile: () => void;
  routineItems: RoutineItem[];
  onToggleRoutineItem: (itemId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userName,
  onOpenAssessment,
  onOpenNutrientDetail,
  onOpenArticle,
  onOpenProfile,
  routineItems,
  onToggleRoutineItem
}) => {
  const nutrientsList = Object.values(NUTRIENTS_DATA);
  const completedCount = routineItems.filter((i) => i.completed).length;

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center selection:bg-indigo-600 selection:text-white pb-24">
      <main className="w-full max-w-[393px] min-h-screen bg-slate-50 flex flex-col relative px-5 pt-4">
        {/* Top App Bar */}
        <header className="flex justify-between items-center w-full py-2 bg-transparent mb-1">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              NutriLens
            </span>
            <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
              Good morning, {userName}
            </h1>
          </div>
          <button
            onClick={onOpenProfile}
            aria-label="Profile"
            className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs active:scale-95 transition-transform"
          >
            <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-[13px]">
              {userName.charAt(0)}
            </div>
          </button>
        </header>

        {/* Mascot Vito Hero Section */}
        <section className="flex flex-col items-center justify-center py-2 relative my-1">
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 rounded-2xl bg-indigo-50/60 border border-indigo-100/70 flex items-center justify-center shadow-xs">
              <VitoMascot size="hero" animate={true} />
            </div>
          </div>
        </section>

        {/* Gap Summary Banner Card */}
        <section className="mb-4">
          <button
            onClick={onOpenAssessment}
            className="w-full bg-indigo-50/80 hover:bg-indigo-100/80 text-left p-3.5 rounded-xl flex items-center justify-between shadow-xs active:scale-[0.99] transition-all border border-indigo-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white shadow-xs">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="text-[14px] font-bold text-slate-900">
                3 nutrients worth a closer look
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600" />
          </button>
        </section>

        {/* Your Nutrients Horizontal Scroll */}
        <section className="flex flex-col gap-2 mb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-slate-900">Your nutrients</h2>
            <span className="text-[12px] font-medium text-slate-500">Daily scan</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
            {nutrientsList.map((nutrient) => (
              <article
                key={nutrient.id}
                onClick={() => onOpenNutrientDetail(nutrient.id)}
                className="flex-shrink-0 w-[125px] bg-white p-2.5 rounded-xl shadow-xs border border-slate-200 flex flex-col cursor-pointer hover:border-indigo-300 active:scale-[0.98] transition-all"
              >
                <div className="w-full h-22 rounded-lg overflow-hidden bg-slate-100 mb-2 border border-slate-100">
                  <img
                    src={nutrient.imageUrl}
                    alt={nutrient.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-0.5 pb-0.5">
                  <p className="text-[13px] font-bold text-slate-900 leading-tight">
                    {nutrient.name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {nutrient.tagline}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Primary Action CTA */}
        <section className="mb-5">
          <button
            onClick={onOpenAssessment}
            className="w-full h-[48px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 active:scale-[0.98] transition-all"
          >
            <span>Check my nutrition</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* Today's Routine Card */}
        <section className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[17px] font-bold text-slate-900">Today's routine</h2>
            <span className="bg-indigo-50 text-indigo-700 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-indigo-100">
              {completedCount} of {routineItems.length} completed
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {routineItems.length === 0 ? (
              <p className="text-[13px] text-slate-500 py-2">
                No items added yet. Explore nutrients above to build your daily habits!
              </p>
            ) : (
              routineItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onToggleRoutineItem(item.id)}
                  className="flex items-center gap-3 min-h-[40px] cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                      item.completed
                        ? 'bg-emerald-500 text-white'
                        : 'border border-slate-300 group-hover:border-indigo-600'
                    }`}
                  >
                    {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`text-[14px] font-semibold transition-colors ${
                        item.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="text-[12px] text-slate-500">{item.detail}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Learn More Section */}
        <section className="flex flex-col gap-2.5 mb-6">
          <h2 className="text-[17px] font-bold text-slate-900">Learn more</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {EDUCATIONAL_ARTICLES.slice(0, 2).map((article) => (
              <article
                key={article.id}
                onClick={() => onOpenArticle(article.id)}
                className="p-3.5 rounded-xl flex flex-col justify-between min-h-[110px] cursor-pointer active:scale-[0.98] transition-all border border-slate-200 bg-white hover:border-indigo-300 shadow-xs"
              >
                <h3 className="text-[13px] font-bold text-slate-900 leading-snug">
                  {article.title}
                </h3>
                <span className="text-[11px] text-slate-500 pt-2 font-medium">
                  {article.timeRead}
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
