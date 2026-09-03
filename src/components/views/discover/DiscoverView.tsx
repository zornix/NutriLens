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

/** Discover tab: header, search box (filters articles by title/tag), NutrientGuideGrid, article list. */
export const DiscoverView: React.FC<DiscoverViewProps> = ({ onOpenArticle, onOpenNutrientDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const term = searchTerm.toLowerCase();
  const articles = EDUCATIONAL_ARTICLES.filter(
    (a) => a.title.toLowerCase().includes(term) || a.tags.some((t) => t.toLowerCase().includes(term))
  );

  return (
    <PageShell className="px-5 pt-4 pb-24">
      <ScreenHeader eyebrow="Campus Guides & Nutrients" title="Discover" />

      <div className="relative mb-5">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search produce, campus spots, guides..."
          className="w-full h-10 pl-9 pr-4 bg-white rounded-lg border border-slate-200 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xs"
        />
      </div>

      <NutrientGuideGrid nutrients={Object.values(NUTRIENTS_DATA)} onOpen={onOpenNutrientDetail} />

      <section className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[16px] font-bold text-slate-900">Campus Food Resources</h2>
          <span className="text-[12px] font-medium text-slate-500">Local</span>
        </div>
        <div className="space-y-2.5">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} onOpen={() => onOpenArticle(article.id)} />
          ))}
        </div>
      </section>
    </PageShell>
  );
};
