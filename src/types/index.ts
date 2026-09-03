export type AppScreen =
  | 'splash'
  | 'quiz'
  | 'results-flow'
  | 'results-list'
  | 'home'
  | 'nutrient-detail'
  | 'discover'
  | 'routine'
  | 'profile'
  | 'how-it-works';

/** questionId -> optionId (single choice) | optionId[] (multi choice). */
export type QuizAnswers = Record<string, string | string[]>;

export interface QuizOption {
  id: string;
  label: string;
  icon?: string;
  detail?: string;
  subtext?: string;
}

export interface QuizQuestion {
  id: string;
  stepNumber: number;
  totalSteps: number;
  badge: string;
  question: string;
  helperText?: string;
  type: 'single' | 'multi';
  options: QuizOption[];
  hasUnsureOption?: boolean;
  insightCallout?: {
    icon: string;
    text: string;
  };
}

export interface FoodSource {
  name: string;
  amount: string;
  /** Key into FoodIcon's map (sun, fish, egg, water_drop, grain, eco, apple, ...). */
  icon: string;
}

export interface SupplementOption {
  title: string;
  dosage: string;
  note: string;
}

export interface Nutrient {
  id: string;
  symbol: string;
  name: string;
  tagline: string;
  categoryTag: string;
  whyHeading: string;
  whyReason: string;
  userAnswerQuote: string;
  functionSummary: string;
  detailedBio: string;
  keyBenefits: string[];
  whatItDoes: string;
  /** Food/habit sources with real-world portions. Also drives the "Ways to get more" list in the results flow. */
  whereToFindIt: FoodSource[];
  howMuchYouNeed: {
    target: string;
    targetLabel: string;
    upperLimit: string;
  };
  /** Detail line used when this nutrient is added to the routine as a supplement, e.g. "1000 IU · morning". */
  routineDefault: string;
  supplement: SupplementOption;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatarUrl: string;
  };
  imageUrl: string;
  isFlaggedLow: boolean;
}

export interface RoutineItem {
  id: string;
  name: string;
  detail: string;
  category: 'habit' | 'food' | 'supplement';
  timing?: string;
  completed: boolean;
  nutrientId?: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  type: string;
  timeRead: string;
  summary: string;
  content: string[];
  tags: string[];
  location?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  campusYear: string;
  dietPreference: string;
  answers: QuizAnswers;
  hasCompletedQuiz: boolean;
}
