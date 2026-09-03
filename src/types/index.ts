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
  icon: string;
  image?: string;
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
  whereToFindIt: FoodSource[];
  howMuchYouNeed: {
    target: string;
    targetLabel: string;
    upperLimit: string;
  };
  routineSuggestions: Array<{
    name: string;
    portion: string;
    icon: string;
  }>;
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
  answers: Record<string, any>;
  hasCompletedQuiz: boolean;
}
