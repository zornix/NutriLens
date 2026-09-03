import { Sun, Egg, Apple, LucideIcon } from 'lucide-react';

/** One plain-language explanation of an inference rule. Add a row here when a new nutrient rule ships. */
export interface InferenceRule {
  title: string;
  nutrient: string;
  body: string;
  Icon: LucideIcon;
  /** Tailwind classes for the icon tile. */
  tone: string;
}

export const INFERENCE_RULES: InferenceRule[] = [
  {
    title: 'Sunlight Rule',
    nutrient: 'Vitamin D',
    body: 'Humans synthesize ~80% of Vitamin D through UVB sunlight. Spending < 30 min outside most days triggers an evaluation because food sources alone rarely meet student targets.',
    Icon: Sun,
    tone: 'bg-amber-50 text-amber-600 border-amber-100'
  },
  {
    title: 'Protein Pattern Rule',
    nutrient: 'Vitamin B12',
    body: 'Vitamin B12 is produced by bacteria in animal products and fortified foods. When someone eats eggs but little meat, dairy, or fish, we highlight campus-friendly fortified options.',
    Icon: Egg,
    tone: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  },
  {
    title: 'Produce Frequency Rule',
    nutrient: 'Vitamin C',
    body: 'Vitamin C is strictly water-soluble and cannot be stored in the body. If fresh produce is eaten once a day or less, daily levels quickly dip below optimal immune maintenance.',
    Icon: Apple,
    tone: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  }
];
