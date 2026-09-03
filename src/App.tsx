import React, { useState } from 'react';
import { AppScreen, QuizAnswers, RoutineItem, UserProfile } from './types';
import { INITIAL_USER_PROFILE, INITIAL_ROUTINE_ITEMS, EDUCATIONAL_ARTICLES, FLAGGED_NUTRIENTS } from './data/mockData';
import { nutrientToRoutineItem, hasRoutineItemNamed } from './lib/routine';
import { DemoSwitcher } from './components/common/DemoSwitcher';
import { BottomNav } from './components/common/BottomNav';
import { InfoModal } from './components/modals/InfoModal';
import { SplashView } from './components/views/splash/SplashView';
import { HowThisWorksView } from './components/views/how-it-works/HowThisWorksView';
import { QuizView } from './components/views/quiz/QuizView';
import { ResultsFlowView } from './components/views/results-flow/ResultsFlowView';
import { ResultsListView } from './components/views/results-list/ResultsListView';
import { HomeView } from './components/views/home/HomeView';
import { NutrientDetailView } from './components/views/nutrient-detail/NutrientDetailView';
import { DiscoverView } from './components/views/discover/DiscoverView';
import { RoutineView } from './components/views/routine/RoutineView';
import { ProfileView } from './components/views/profile/ProfileView';

/** Screens that show the bottom tab bar. */
const TAB_SCREENS: AppScreen[] = ['home', 'discover', 'routine', 'profile'];

/**
 * Root: owns all app state (current screen, profile, routine, selections) and hands
 * data + callbacks down to one screen at a time. There is no router; `screen` is the route.
 */
export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>(INITIAL_ROUTINE_ITEMS);
  const [activeNutrientId, setActiveNutrientId] = useState('vitamin-d');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // --- Routine: the only place the list is mutated. Adds are de-duplicated by name. ---
  const toggleRoutineItem = (id: string) =>
    setRoutineItems((prev) => prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)));
  const addRoutineItem = (item: RoutineItem) =>
    setRoutineItems((prev) => (hasRoutineItemNamed(prev, item.name) ? prev : [...prev, item]));
  const removeRoutineItem = (id: string) => setRoutineItems((prev) => prev.filter((i) => i.id !== id));
  const addAllFlagged = () =>
    setRoutineItems((prev) => [
      ...prev,
      ...FLAGGED_NUTRIENTS.map(nutrientToRoutineItem).filter((i) => !hasRoutineItemNamed(prev, i.name))
    ]);
  const resetRoutine = () => setRoutineItems(INITIAL_ROUTINE_ITEMS);

  // --- Navigation helpers ---
  const completeQuiz = (answers: QuizAnswers) => {
    setUserProfile((p) => ({ ...p, answers, hasCompletedQuiz: true }));
    setScreen('results-flow');
  };
  const openNutrient = (id: string) => {
    setActiveNutrientId(id);
    setScreen('nutrient-detail');
  };

  const activeArticle = EDUCATIONAL_ARTICLES.find((a) => a.id === activeArticleId);

  const screens: Record<AppScreen, React.ReactNode> = {
    splash: (
      <SplashView
        onStartQuiz={() => setScreen('quiz')}
        onContinueAsGuest={() => setScreen('home')}
        onOpenHowItWorks={() => setScreen('how-it-works')}
      />
    ),
    'how-it-works': <HowThisWorksView onBack={() => setScreen('splash')} onStartQuiz={() => setScreen('quiz')} />,
    quiz: (
      <QuizView
        initialAnswers={userProfile.answers}
        onBackToSplash={() => setScreen('splash')}
        onCompleteQuiz={completeQuiz}
      />
    ),
    'results-flow': (
      <ResultsFlowView
        routineItems={routineItems}
        onAddRoutineItem={addRoutineItem}
        onRemoveRoutineItem={removeRoutineItem}
        onFinishFlow={() => setScreen('home')}
        onOpenNutrientDetail={openNutrient}
      />
    ),
    'results-list': (
      <ResultsListView
        routineItems={routineItems}
        onAddRoutineItem={addRoutineItem}
        onAddAllToRoutine={addAllFlagged}
        onOpenNutrientDetail={openNutrient}
        onGoToHome={() => setScreen('home')}
      />
    ),
    home: (
      <HomeView
        userName={userProfile.name}
        routineItems={routineItems}
        onToggleRoutineItem={toggleRoutineItem}
        onOpenAssessment={() => setScreen('results-flow')}
        onOpenNutrientDetail={openNutrient}
        onOpenArticle={setActiveArticleId}
        onOpenProfile={() => setScreen('profile')}
      />
    ),
    'nutrient-detail': (
      <NutrientDetailView
        nutrientId={activeNutrientId}
        isAlreadyAdded={routineItems.some((r) => r.nutrientId === activeNutrientId)}
        onBack={() => setScreen('home')}
        onWhyWeThinkSo={() => setScreen('results-flow')}
        onAddRoutineItem={addRoutineItem}
        onRemoveRoutineItem={removeRoutineItem}
      />
    ),
    discover: <DiscoverView onOpenArticle={setActiveArticleId} onOpenNutrientDetail={openNutrient} />,
    routine: (
      <RoutineView
        routineItems={routineItems}
        onToggleItem={toggleRoutineItem}
        onAddItem={addRoutineItem}
        onRemoveItem={removeRoutineItem}
        onResetToDefaults={resetRoutine}
      />
    ),
    profile: <ProfileView userProfile={userProfile} onRetakeQuiz={() => setScreen('quiz')} />
  };

  return (
    <div className="w-full min-h-screen bg-[#F1F5F9] text-slate-900 font-sans antialiased flex flex-col items-center">
      <DemoSwitcher current={screen} onSelect={setScreen} />

      <div className="w-full flex-1 flex flex-col items-center">{screens[screen]}</div>

      {TAB_SCREENS.includes(screen) && <BottomNav currentScreen={screen} onNavigate={setScreen} />}

      {activeArticle && (
        <InfoModal
          isOpen
          title={activeArticle.title}
          description={activeArticle.summary}
          keyPoints={activeArticle.content}
          actionText="Done reading"
          onClose={() => setActiveArticleId(null)}
        />
      )}
    </div>
  );
}
