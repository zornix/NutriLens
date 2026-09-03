import React from 'react';
import { EducationalArticle } from '../../../types';

interface LearnMoreGridProps {
  articles: EducationalArticle[];
  onOpen: (articleId: string) => void;
}

/** Two-column grid of compact article tiles (title + read time). Tiles are buttons so they are keyboard reachable. */
export const LearnMoreGrid: React.FC<LearnMoreGridProps> = ({ articles, onOpen }) => (
  <section className="flex flex-col gap-2.5 mb-6" aria-labelledby="home-learn">
    <h2 id="home-learn" className="text-[17px] font-bold text-slate-900">
      Learn more
    </h2>
    <div className="grid grid-cols-2 gap-2.5">
      {articles.map((article) => (
        <button
          key={article.id}
          type="button"
          onClick={() => onOpen(article.id)}
          className="p-3.5 rounded-xl flex flex-col justify-between text-left min-h-[110px] cursor-pointer active:scale-[0.98] transition-all border border-slate-200 bg-white hover:border-indigo-300 shadow-xs"
        >
          <span className="text-[13px] font-bold text-slate-900 leading-snug">{article.title}</span>
          <span className="text-[11px] text-slate-500 pt-2 font-medium">{article.timeRead}</span>
        </button>
      ))}
    </div>
  </section>
);
