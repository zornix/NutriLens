import { Nutrient, RoutineItem } from '../types';

/**
 * The routine entry every "Add to routine" button creates for a nutrient.
 * One place to change what gets added (id, category, detail line).
 */
export const nutrientToRoutineItem = (n: Nutrient): RoutineItem => ({
  id: `routine-${n.id}`,
  name: n.name,
  detail: n.routineDefault,
  category: 'supplement',
  completed: false,
  nutrientId: n.id
});

/** Case-insensitive "is there already an item with this name" check used for de-duplication. */
export const hasRoutineItemNamed = (items: RoutineItem[], name: string) =>
  items.some((i) => i.name.toLowerCase() === name.toLowerCase());
