import React from 'react';
import {
  Sun,
  Fish,
  Egg,
  Milk,
  Utensils,
  Wheat,
  Leaf,
  Apple,
  Flower2,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

/** Icon key (as used in mockData `icon` fields) -> lucide icon + colors for light and dark screens. */
const ICONS: Record<string, { Icon: LucideIcon; light: string; dark: string }> = {
  sun: { Icon: Sun, light: 'text-amber-500', dark: 'text-amber-300' },
  fish: { Icon: Fish, light: 'text-indigo-500', dark: 'text-sky-300' },
  egg: { Icon: Egg, light: 'text-amber-500', dark: 'text-amber-200' },
  water_drop: { Icon: Milk, light: 'text-sky-600', dark: 'text-sky-200' },
  restaurant: { Icon: Utensils, light: 'text-rose-500', dark: 'text-rose-300' },
  grain: { Icon: Wheat, light: 'text-amber-700', dark: 'text-amber-300' },
  eco: { Icon: Leaf, light: 'text-emerald-600', dark: 'text-emerald-300' },
  apple: { Icon: Apple, light: 'text-red-500', dark: 'text-rose-300' },
  spa: { Icon: Flower2, light: 'text-amber-600', dark: 'text-amber-300' }
};

const FALLBACK = { Icon: CheckCircle2, light: 'text-indigo-600', dark: 'text-white' };

interface FoodIconProps {
  name?: string;
  dark?: boolean;
  /** Size classes. Color comes from the map. */
  className?: string;
}

/** Renders the icon for a food/habit key from the data. Add new foods by adding a row to ICONS. */
export const FoodIcon: React.FC<FoodIconProps> = ({ name, dark = false, className = 'w-5 h-5' }) => {
  const { Icon, light, dark: darkColor } = ICONS[name ?? ''] ?? FALLBACK;
  return <Icon className={`${className} ${dark ? darkColor : light}`} />;
};
