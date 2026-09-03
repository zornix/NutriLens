import React, { useState } from 'react';
import { AppScreen, RoutineItem, UserProfile } from './types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_ROUTINE_ITEMS,
  EDUCATIONAL_ARTICLES,
  NUTRIENTS_DATA
} from './data/mockData';

// Subcomponents
import { SplashView } from './components/views/SplashView';
import { QuizView } from './components/views/QuizView';
import { ResultsFlowView } from './components/views/ResultsFlowView';
import { ResultsListView } from './components/views/ResultsListView';
import { HomeView } from './components/views/HomeView';
import { NutrientDetailView } from './components/views/NutrientDetailView';
import { DiscoverView } from './components/views/DiscoverView';
import { RoutineView } from './components/views/RoutineView';
import { ProfileView } from './components/views/ProfileView';
import { HowThisWorksView } from './components/views/HowThisWorksView';
import { BottomNav } from './components/common/BottomNav';
import { NutrientModal } from './components/modals/NutrientModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>(INITIAL_ROUTINE_ITEMS);
  const [activeNutrientId, setActiveNutrientId] = useState<string>('vitamin-d');

  // Educational article modal state
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Routine Handlers
  const handleToggleRoutineItem = (itemId: string) => {
    setRoutineItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddRoutineItem = (newItem: RoutineItem) => {
    setRoutineItems((prev) => {
      const exists = prev.some((i) => i.name.toLowerCase() === newItem.name.toLowerCase());
      if (exists) return prev;
      return [...prev, newItem];
    });
  };

  const handleRemoveRoutineItem = (itemId: string) => {
    setRoutineItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleAddAllNutrientsToRoutine = () => {
    const defaultToAdd: RoutineItem[] = [
      {
        id: `routine-d-${Date.now()}`,
        name: 'Vitamin D',
        detail: '1000 IU · morning',
        category: 'supplement',
        completed: false,
        nutrientId: 'vitamin-d'
      },
      {
        id: `routine-b12-${Date.now()}`,
        name: 'Vitamin B12',
        detail: '500 mcg · sublingual',
        category: 'supplement',
        completed: false,
        nutrientId: 'vitamin-b12'
      },
      {
        id: `routine-c-${Date.now()}`,
        name: 'Vitamin C',
        detail: '500 mg · with lunch',
        category: 'supplement',
        completed: false,
        nutrientId: 'vitamin-c'
      }
    ];

    setRoutineItems((prev) => {
      const newItems = defaultToAdd.filter(
        (def) => !prev.some((p) => p.name.toLowerCase() === def.name.toLowerCase())
      );
      return [...prev, ...newItems];
    });
  };

  const handleResetToDefaults = () => {
    setRoutineItems(INITIAL_ROUTINE_ITEMS);
  };

  // Assessment Quiz completion
  const handleCompleteQuiz = (answers: Record<string, any>) => {
    setUserProfile((prev) => ({
      ...prev,
      answers,
      hasCompletedQuiz: true
    }));
    setCurrentScreen('results-flow');
  };

  const handleOpenNutrientDetail = (nutrientId: string) => {
    setActiveNutrientId(nutrientId);
    setCurrentScreen('nutrient-detail');
  };

  // Active article details for modal
  const activeArticle = EDUCATIONAL_ARTICLES.find((a) => a.id === activeArticleId);

  // Screens that should show bottom navigation (Home, Discover, Routine, Profile)
  const isNavScreen = ['home', 'discover', 'routine', 'profile'].includes(currentScreen);

  return (
    <div className="w-full min-h-screen bg-[#F1F5F9] text-slate-900 font-sans antialiased flex flex-col items-center">
      {/* Demo Screen Switcher Bar (Quickly test every screen requested by the user) */}
      <nav aria-label="Demo page switcher" className="w-full bg-[#0F172A] border-b border-slate-800 text-slate-300 py-1.5 px-3 z-50 flex items-center justify-between text-[11px] overflow-x-auto no-scrollbar shadow-sm">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-bold text-indigo-400 tracking-wider uppercase text-[10px]">NutriLens Demo:</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setCurrentScreen('splash')}
            className={`px-2.5 py-0.5 rounded-md transition-colors ${
              currentScreen === 'splash'
                ? 'bg-indigo-600 text-white font-medium shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Splash
          </button>
          <button
            onClick={() => setCurrentScreen('quiz')}
            className={`px-2.5 py-0.5 rounded-md transition-colors ${
              currentScreen === 'quiz'
                ? 'bg-indigo-600 text-white font-medium shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => setCurrentScreen('results-flow')}
            className={`px-2.5 py-0.5 rounded-md transition-colors ${
              currentScreen === 'results-flow'
                ? 'bg-indigo-600 text-white font-medium shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Dark Results Flow
          </button>
          <button
            onClick={() => setCurrentScreen('results-list')}
            className={`px-2.5 py-0.5 rounded-md transition-colors ${
              currentScreen === 'results-list'
                ? 'bg-indigo-600 text-white font-medium shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Summary List
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className={`px-2.5 py-0.5 rounded-md transition-colors ${
              currentScreen === 'home'
                ? 'bg-indigo-600 text-white font-medium shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setActiveNutrientId('vitamin-d');
              setCurrentScreen('nutrient-detail');
            }}
            className={`px-2.5 py-0.5 rounded-md transition-colors ${
              currentScreen === 'nutrient-detail'
                ? 'bg-indigo-600 text-white font-medium shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Nutrient Detail
          </button>
          <button
            onClick={() => setCurrentScreen('how-it-works')}
            className={`px-2.5 py-0.5 rounded-md transition-colors ${
              currentScreen === 'how-it-works'
                ? 'bg-indigo-600 text-white font-medium shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            How It Works
          </button>
        </div>
      </nav>

      {/* Screen Render Switch */}
      <div className="w-full flex-1 flex flex-col items-center">
        {currentScreen === 'splash' && (
          <SplashView
            onStartQuiz={() => setCurrentScreen('quiz')}
            onContinueAsGuest={() => setCurrentScreen('home')}
            onOpenHowItWorks={() => setCurrentScreen('how-it-works')}
          />
        )}

        {currentScreen === 'how-it-works' && (
          <HowThisWorksView
            onBack={() => setCurrentScreen('splash')}
            onStartQuiz={() => setCurrentScreen('quiz')}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizView
            onBackToSplash={() => setCurrentScreen('splash')}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}

        {currentScreen === 'results-flow' && (
          <ResultsFlowView
            onFinishFlow={() => setCurrentScreen('home')}
            onGoToOverviewList={() => setCurrentScreen('results-list')}
            onAddRoutineItem={handleAddRoutineItem}
            onRemoveRoutineItem={handleRemoveRoutineItem}
            routineItems={routineItems}
            onOpenNutrientDetail={handleOpenNutrientDetail}
          />
        )}

        {currentScreen === 'results-list' && (
          <ResultsListView
            onGoToHome={() => setCurrentScreen('home')}
            onOpenNutrientDetail={handleOpenNutrientDetail}
            onAddRoutineItem={handleAddRoutineItem}
            onAddAllToRoutine={handleAddAllNutrientsToRoutine}
            routineItems={routineItems}
          />
        )}

        {currentScreen === 'home' && (
          <HomeView
            userName={userProfile.name}
            onOpenAssessment={() => setCurrentScreen('results-flow')}
            onOpenNutrientDetail={handleOpenNutrientDetail}
            onOpenArticle={(articleId) => setActiveArticleId(articleId)}
            onOpenProfile={() => setCurrentScreen('profile')}
            routineItems={routineItems}
            onToggleRoutineItem={handleToggleRoutineItem}
          />
        )}

        {currentScreen === 'nutrient-detail' && (
          <NutrientDetailView
            nutrientId={activeNutrientId}
            onBack={() => setCurrentScreen('home')}
            onWhyWeThinkSo={() => setCurrentScreen('results-flow')}
            onAddRoutineItem={handleAddRoutineItem}
            isAlreadyAdded={routineItems.some((r) => r.nutrientId === activeNutrientId)}
          />
        )}

        {currentScreen === 'discover' && (
          <DiscoverView
            onOpenArticle={(articleId) => setActiveArticleId(articleId)}
            onOpenNutrientDetail={handleOpenNutrientDetail}
          />
        )}

        {currentScreen === 'routine' && (
          <RoutineView
            routineItems={routineItems}
            onToggleItem={handleToggleRoutineItem}
            onAddItem={handleAddRoutineItem}
            onRemoveItem={handleRemoveRoutineItem}
            onResetToDefaults={handleResetToDefaults}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onRetakeQuiz={() => setCurrentScreen('quiz')}
            onUpdateName={(name) => setUserProfile((p) => ({ ...p, name }))}
          />
        )}
      </div>

      {/* Shared Bottom Navigation for core tabs */}
      {isNavScreen && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}

      {/* Article Reader Modal */}
      {activeArticle && (
        <NutrientModal
          isOpen={!!activeArticle}
          title={activeArticle.title}
          description={activeArticle.summary}
          keyPoints={activeArticle.content}
          onClose={() => setActiveArticleId(null)}
          actionText="Done reading"
        />
      )}

      {/* "How this works" Information Modal */}
      <NutrientModal
        isOpen={showHowItWorks}
        title="How NutriLens Works"
        description="The inference is rule-based from your answers, not a clinical diagnosis. NutriLens evaluates your self-reported sunlight hours and dining hall eating patterns against peer-reviewed student nutrition research to identify nutrients worth a closer look."
        keyPoints={[
          'Rule-based inference from your answers — not a clinical diagnosis or medical test',
          'Translates nutrients into realistic student portions (e.g. 1 salmon fillet ≈ full day)',
          'Evidence-based food sources you can find at university dining halls and campus stores',
          'Client-side privacy — all evaluations run locally in your browser'
        ]}
        onClose={() => setShowHowItWorks(false)}
        actionText="Got it"
      />
    </div>
  );
}
