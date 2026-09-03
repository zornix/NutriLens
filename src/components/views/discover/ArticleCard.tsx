import React from 'react';
import { ChevronRight } from 'lucide-react';
import { EducationalArticle } from '../../../types';

interface ArticleCardProps {
  article: EducationalArticle;
  onOpen: () => void;
}

/** List row for one article: type tag, read time, title, two-line summary. A button, so it works from the keyboard. */
export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    className="w-full bg-white p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 shadow-xs cursor-pointer active:scale-[0.99] transition-all flex items-start justify-between text-left"
  >
    <span className="pr-3">
      <span className="flex items-center gap-2 mb-1">
        <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-100">
          {article.type}
        </span>
        <span className="text-[11px] text-slate-500">{article.timeRead}</span>
      </span>
      <span className="block text-[14px] font-bold text-slate-900 leading-snug">{article.title}</span>
      <span className="block text-[12px] text-slate-600 mt-1 line-clamp-2">{article.summary}</span>
    </span>
    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 mt-2" aria-hidden />
  </button>
);
