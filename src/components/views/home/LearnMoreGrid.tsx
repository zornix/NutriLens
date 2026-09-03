import React from 'react';
import { EducationalArticle } from '../../../types';

interface LearnMoreGridProps {
  articles: EducationalArticle[];
  onOpen: (articleId: string) => void;
}

/** Two-column grid of compact article tiles (title + read time). */
export const LearnMoreGrid: React.FC<LearnMoreGridProps> = ({ articles, onOpen }) => (
  <section className="flex flex-col gap-2.5 mb-6">
    <h2 className="text-[17px] font-bold text-slate-900">Learn more</h2>
    <div className="grid grid-cols-2 gap-2.5">
      {articles.map((article) => (
        <article
          key={article.id}
          onClick={() => onOpen(article.id)}
          className="p-3.5 rounded-xl flex flex-col justify-between min-h-[110px] cursor-pointer active:scale-[0.98] transition-all border border-slate-200 bg-white hover:border-indigo-300 shadow-xs"
        >
          <h3 className="text-[13px] font-bold text-slate-900 leading-snug">{article.title}</h3>
          <span className="text-[11px] text-slate-500 pt-2 font-medium">{article.timeRead}</span>
        </article>
      ))}
    </div>
  </section>
);
