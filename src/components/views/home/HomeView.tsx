import React from 'react';
import { Sparkles, ArrowRight, ClipboardList } from 'lucide-react';
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
  /** Results are only shown once the quiz has been taken; guests get a prompt instead (H1, H2). */
  hasCompletedQuiz: boolean;
  routineItems: RoutineItem[];
  onToggleRoutineItem: (itemId: string) => void;
  onOpenAssessment: () => void;
  onStartQuiz: () => void;
  onOpenNutrientDetail: (nutrientId: string) => void;
  onOpenArticle: (articleId: string) => void;
  onOpenProfile: () => void;
}

/**
 * Home tab. Elements top to bottom: greeting header with avatar, mascot hero, results banner (or quiz prompt),
 * NutrientCarousel, one quiz CTA, TodayRoutineCard, LearnMoreGrid.
 */
export const HomeView: React.FC<HomeViewProps> = ({
  userName,
  hasCompletedQuiz,
  routineItems,
  onToggleRoutineItem,
  onOpenAssessment,
  onStartQuiz,
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
          type="button"
          onClick={onOpenProfile}
          aria-label="Open profile"
          className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs active:scale-95 transition-transform"
        >
          <span
            aria-hidden
            className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-[13px]"
          >
            {userName.charAt(0)}
          </span>
        </button>
      }
    />

    {/* Mascot hero */}
    <section className="flex items-center justify-center py-2 my-1">
      <div className="w-32 h-32 rounded-2xl bg-indigo-50/60 border border-indigo-100/70 flex items-center justify-center shadow-xs">
        <VitoMascot size="hero" />
      </div>
    </section>

    {/* Results banner or quiz prompt */}
    <section className="mb-4">
      {hasCompletedQuiz ? (
        <button
          type="button"
          onClick={onOpenAssessment}
          className="w-full min-h-[52px] bg-indigo-50/80 hover:bg-indigo-100/80 text-left p-3.5 rounded-xl flex items-center justify-between shadow-xs active:scale-[0.99] transition-all border border-indigo-100"
        >
          <span className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white shadow-xs">
              <Sparkles className="w-4 h-4 fill-current" aria-hidden />
            </span>
            <span className="text-[14px] font-bold text-slate-900">
              {FLAGGED_NUTRIENTS.length} nutrients worth a closer look
            </span>
          </span>
          <ArrowRight className="w-4 h-4 text-slate-600" aria-hidden />
        </button>
      ) : (
        <div className="bg-white p-3.5 rounded-xl flex items-center gap-3 shadow-xs border border-slate-200">
          <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600">
            <ClipboardList className="w-4 h-4" aria-hidden />
          </span>
          <p className="text-[13px] text-slate-600">
            <span className="font-bold text-slate-900">No assessment yet.</span> Take the 60-second quiz to see which
            nutrients are worth a closer look.
          </p>
        </div>
      )}
    </section>

    <NutrientCarousel nutrients={Object.values(NUTRIENTS_DATA)} onOpen={onOpenNutrientDetail} />

    <section className="mb-5">
      <Button onClick={onStartQuiz}>
        <span>{hasCompletedQuiz ? 'Retake the quiz' : 'Check my nutrition'}</span>
        <ArrowRight className="w-4 h-4" aria-hidden />
      </Button>
    </section>

    <TodayRoutineCard items={routineItems} onToggle={onToggleRoutineItem} />

    <LearnMoreGrid articles={EDUCATIONAL_ARTICLES.slice(0, 2)} onOpen={onOpenArticle} />
  </PageShell>
);
