import React, { useState } from 'react';
import { Search, MapPin, Sparkles, BookOpen, ChevronRight, Apple } from 'lucide-react';
import { EDUCATIONAL_ARTICLES, NUTRIENTS_DATA } from '../../data/mockData';

interface DiscoverViewProps {
  onOpenArticle: (articleId: string) => void;
  onOpenNutrientDetail: (nutrientId: string) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  onOpenArticle,
  onOpenNutrientDetail
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const nutrients = Object.values(NUTRIENTS_DATA);

  const filteredArticles = EDUCATIONAL_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center pb-24">
      <div className="w-full max-w-[393px] min-h-screen bg-slate-50 flex flex-col px-5 pt-4">
        {/* Header */}
        <header className="mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Campus Guides & Nutrients
          </span>
          <h1 className="text-[22px] font-bold text-slate-900">Discover</h1>
        </header>

        {/* Search Bar */}
        <div className="relative mb-5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search produce, campus spots, guides..."
            className="w-full h-10 pl-9 pr-4 bg-white rounded-lg border border-slate-200 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xs"
          />
        </div>

        {/* Micronutrient Encyclopedia Quick Access */}
        <section className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[16px] font-bold text-slate-900">Nutrient Guides</h2>
            <span className="text-[12px] font-medium text-slate-500">Reference</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {nutrients.map((n) => (
              <button
                key={n.id}
                onClick={() => onOpenNutrientDetail(n.id)}
                className="bg-white p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 flex flex-col items-center text-center shadow-xs active:scale-95 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-[15px] mb-1.5 border border-indigo-100/80 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {n.symbol}
                </div>
                <span className="text-[13px] font-bold text-slate-900 truncate w-full">
                  {n.name}
                </span>
                <span className="text-[10px] text-slate-500 truncate w-full">
                  {n.tagline}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Campus Spotlights */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[16px] font-bold text-slate-900">Campus Food Resources</h2>
            <span className="text-[12px] font-medium text-slate-500">Local</span>
          </div>

          <div className="space-y-2.5">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onOpenArticle(article.id)}
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 shadow-xs cursor-pointer active:scale-[0.99] transition-all flex items-start justify-between"
              >
                <div className="pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-100">
                      {article.type}
                    </span>
                    <span className="text-[11px] text-slate-500">{article.timeRead}</span>
                  </div>
                  <h3 className="text-[14px] font-bold text-slate-900 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-[12px] text-slate-600 mt-1 line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
