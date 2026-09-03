import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { EDUCATIONAL_ARTICLES, NUTRIENTS_DATA } from '../../../data/mockData';
import { PageShell } from '../../common/PageShell';
import { ScreenHeader } from '../../common/ScreenHeader';
import { NutrientGuideGrid } from './NutrientGuideGrid';
import { ArticleCard } from './ArticleCard';

interface DiscoverViewProps {
  onOpenArticle: (articleId: string) => void;
  onOpenNutrientDetail: (nutrientId: string) => void;
}

/**
 * Discover tab: header, search box (filters articles by title/tag), NutrientGuideGrid, article list.
 * An empty search result explains itself and offers a one-tap recovery (H9).
 */
export const DiscoverView: React.FC<DiscoverViewProps> = ({ onOpenArticle, onOpenNutrientDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const term = searchTerm.trim().toLowerCase();
  const articles = EDUCATIONAL_ARTICLES.filter(
    (a) => a.title.toLowerCase().includes(term) || a.tags.some((t) => t.toLowerCase().includes(term))
  );

  return (
    <PageShell className="px-5 pt-4 pb-24">
      <ScreenHeader eyebrow="Campus Guides & Nutrients" title="Discover" />

      <div className="relative mb-5">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden />
        <input
          type="search"
          aria-label="Search guides by title or tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search produce, campus spots, guides..."
          className="w-full h-11 pl-9 pr-4 bg-white rounded-lg border border-slate-200 text-[14px] text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xs"
        />
      </div>

      <NutrientGuideGrid nutrients={Object.values(NUTRIENTS_DATA)} onOpen={onOpenNutrientDetail} />

      <section className="mb-6" aria-labelledby="discover-articles">
        <div className="flex items-center justify-between mb-2.5">
          <h2 id="discover-articles" className="text-[16px] font-bold text-slate-900">
            Campus Food Resources
          </h2>
          <span className="text-[12px] font-medium text-slate-500">Local</span>
        </div>
        {articles.length === 0 ? (
          <p role="status" className="bg-white p-4 rounded-xl border border-slate-200 text-center text-[13px] text-slate-600">
            No guides match “{searchTerm.trim()}”.{' '}
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-indigo-600 font-semibold underline underline-offset-2"
            >
              Clear search
            </button>
          </p>
        ) : (
          <div className="space-y-2.5">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} onOpen={() => onOpenArticle(article.id)} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
};
