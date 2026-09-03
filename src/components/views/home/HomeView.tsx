import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { RoutineItem } from '../../../types';
import { NUTRIENTS_DATA, FLAGGED_NUTRIENTS, EDUCATIONAL_ARTICLES } from '../../../data/mockData';
import { PageShell } from '../../common/PageShell';
import { ScreenHeader } from '../../common/ScreenHeader';
import { Button } from '../../common/Button';
import { VitoMascot } from '../../common/VitoMascot';
import { NutrientCarousel } from './NutrientCarousel';
import { TodayRoutineCard } from './TodayRoutineCard';
import { LearnMoreGrid } from './LearnMoreGrid';

interface HomeViewProps {
  userName: string;
  routineItems: RoutineItem[];
  onToggleRoutineItem: (itemId: string) => void;
  onOpenAssessment: () => void;
  onOpenNutrientDetail: (nutrientId: string) => void;
  onOpenArticle: (articleId: string) => void;
  onOpenProfile: () => void;
}

/**
 * Home tab. Elements top to bottom: greeting header with avatar, mascot hero, gap banner,
 * NutrientCarousel, "Check my nutrition" CTA, TodayRoutineCard, LearnMoreGrid.
 */
export const HomeView: React.FC<HomeViewProps> = ({
  userName,
  routineItems,
  onToggleRoutineItem,
  onOpenAssessment,
  onOpenNutrientDetail,
  onOpenArticle,
  onOpenProfile
}) => (
  <PageShell className="relative px-5 pt-4 pb-24">
    <ScreenHeader
      eyebrow="NutriLens"
      title={`Good morning, ${userName}`}
      right={
        <button
          onClick={onOpenProfile}
          aria-label="Profile"
          className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-[13px]">
            {userName.charAt(0)}
          </div>
        </button>
      }
    />

    {/* Mascot hero */}
    <section className="flex items-center justify-center py-2 my-1">
      <div className="w-32 h-32 rounded-2xl bg-indigo-50/60 border border-indigo-100/70 flex items-center justify-center shadow-xs">
        <VitoMascot size="hero" />
      </div>
    </section>

    {/* Gap banner */}
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
            {FLAGGED_NUTRIENTS.length} nutrients worth a closer look
          </span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />
      </button>
    </section>

    <NutrientCarousel nutrients={Object.values(NUTRIENTS_DATA)} onOpen={onOpenNutrientDetail} />

    <section className="mb-5">
      <Button onClick={onOpenAssessment}>
        <span>Check my nutrition</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </section>

    <TodayRoutineCard items={routineItems} onToggle={onToggleRoutineItem} />

    <LearnMoreGrid articles={EDUCATIONAL_ARTICLES.slice(0, 2)} onOpen={onOpenArticle} />
  </PageShell>
);
