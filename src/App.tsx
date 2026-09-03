import React, { useEffect, useState } from 'react';
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

const STORAGE_KEY = 'nutrilens:v1';

interface Saved {
  userProfile: UserProfile;
  routineItems: RoutineItem[];
}

/** Persisted profile + routine from a previous visit. Missing or corrupt storage falls back to the demo defaults. */
function loadSaved(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Saved;
  } catch {
    /* private mode, SSR, or bad JSON: use defaults */
  }
  return { userProfile: INITIAL_USER_PROFILE, routineItems: INITIAL_ROUTINE_ITEMS };
}

const saved = loadSaved();

/** Browser history entry. `depth` lets in-app Back know whether there is anything to go back to. */
interface NavState {
  screen: AppScreen;
  depth: number;
}

const readNavState = (): NavState | null =>
  typeof window !== 'undefined' && window.history.state?.screen ? (window.history.state as NavState) : null;

/**
 * Root: owns all app state and hands data + callbacks down to one screen at a time.
 * `screen` is the route. Navigation is mirrored into the browser history so the browser's
 * Back button and every in-app back arrow do the same thing (H3 user control, H4 platform consistency).
 * Profile and routine persist in localStorage so a reload doesn't lose the user's work (H6 recognition over recall).
 */
export default function App() {
  const [screen, setScreen] = useState<AppScreen>(() => readNavState()?.screen ?? 'home');
  const [userProfile, setUserProfile] = useState<UserProfile>(saved.userProfile);
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>(saved.routineItems);
  const [activeNutrientId, setActiveNutrientId] = useState('vitamin-d');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // --- Browser history integration ---
  useEffect(() => {
    if (!readNavState()) window.history.replaceState({ screen: 'home', depth: 0 } satisfies NavState, '');
    const onPop = (e: PopStateEvent) => setScreen((e.state as NavState | null)?.screen ?? 'home');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (next: AppScreen) => {
    if (next === screen) return;
    window.history.pushState({ screen: next, depth: (readNavState()?.depth ?? 0) + 1 } satisfies NavState, '');
    setScreen(next);
  };

  /** In-app Back. Uses real browser history; falls back to Home when this is the first page. */
  const goBack = () => ((readNavState()?.depth ?? 0) > 0 ? window.history.back() : navigate('home'));

  // --- Persistence ---
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ userProfile, routineItems } satisfies Saved));
    } catch {
      /* storage unavailable: app still works for this session */
    }
  }, [userProfile, routineItems]);

  // --- Routine: the only place the list is mutated. Returns false when a same-named item already exists. ---
  const toggleRoutineItem = (id: string) =>
    setRoutineItems((prev) => prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)));
  const addRoutineItem = (item: RoutineItem): boolean => {
    if (hasRoutineItemNamed(routineItems, item.name)) return false;
    setRoutineItems((prev) => [...prev, item]);
    return true;
  };
  const removeRoutineItem = (id: string) => setRoutineItems((prev) => prev.filter((i) => i.id !== id));
  const addAllFlagged = () =>
    setRoutineItems((prev) => [
      ...prev,
      ...FLAGGED_NUTRIENTS.map(nutrientToRoutineItem).filter((i) => !hasRoutineItemNamed(prev, i.name))
    ]);
  const resetRoutine = () => setRoutineItems(INITIAL_ROUTINE_ITEMS);

  // --- Flows ---
  const completeQuiz = (answers: QuizAnswers) => {
    setUserProfile((p) => ({ ...p, answers, hasCompletedQuiz: true }));
    navigate('results-flow');
  };
  const continueAsGuest = () => {
    setUserProfile((p) => ({ ...p, hasCompletedQuiz: false }));
    navigate('home');
  };
  const openNutrient = (id: string) => {
    setActiveNutrientId(id);
    navigate('nutrient-detail');
  };

  const activeArticle = EDUCATIONAL_ARTICLES.find((a) => a.id === activeArticleId);

  const screens: Record<AppScreen, React.ReactNode> = {
    splash: (
      <SplashView
        onStartQuiz={() => navigate('quiz')}
        onContinueAsGuest={continueAsGuest}
        onOpenHowItWorks={() => navigate('how-it-works')}
      />
    ),
    'how-it-works': <HowThisWorksView onBack={goBack} onStartQuiz={() => navigate('quiz')} />,
    quiz: <QuizView initialAnswers={userProfile.answers} onBack={goBack} onCompleteQuiz={completeQuiz} />,
    'results-flow': (
      <ResultsFlowView
        routineItems={routineItems}
        onAddRoutineItem={addRoutineItem}
        onRemoveRoutineItem={removeRoutineItem}
        onFinishFlow={() => navigate('home')}
        onOpenNutrientDetail={openNutrient}
      />
    ),
    'results-list': (
      <ResultsListView
        routineItems={routineItems}
        onAddRoutineItem={addRoutineItem}
        onRemoveRoutineItem={removeRoutineItem}
        onAddAllToRoutine={addAllFlagged}
        onOpenNutrientDetail={openNutrient}
        onGoToHome={() => navigate('home')}
      />
    ),
    home: (
      <HomeView
        userName={userProfile.name}
        hasCompletedQuiz={userProfile.hasCompletedQuiz}
        routineItems={routineItems}
        onToggleRoutineItem={toggleRoutineItem}
        onOpenAssessment={() => navigate('results-flow')}
        onStartQuiz={() => navigate('quiz')}
        onOpenNutrientDetail={openNutrient}
        onOpenArticle={setActiveArticleId}
        onOpenProfile={() => navigate('profile')}
      />
    ),
    'nutrient-detail': (
      <NutrientDetailView
        nutrientId={activeNutrientId}
        isAlreadyAdded={routineItems.some((r) => r.nutrientId === activeNutrientId)}
        onBack={goBack}
        onWhyWeThinkSo={() => navigate('results-flow')}
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
    profile: (
      <ProfileView
        userProfile={userProfile}
        onRetakeQuiz={() => navigate('quiz')}
        onOpenHowItWorks={() => navigate('how-it-works')}
      />
    )
  };

  return (
    <div className="w-full min-h-screen bg-[#F1F5F9] text-slate-900 font-sans antialiased flex flex-col items-center">
      {import.meta.env?.DEV && <DemoSwitcher current={screen} onSelect={navigate} />}

      <div className="w-full flex-1 flex flex-col items-center">{screens[screen] ?? screens.home}</div>

      {TAB_SCREENS.includes(screen) && <BottomNav currentScreen={screen} onNavigate={navigate} />}

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
