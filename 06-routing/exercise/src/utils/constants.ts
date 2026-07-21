import type { TIngredientType } from '@/types';

export const CATEGORY_ORDER: TIngredientType[] = ['bun', 'sauce', 'main'];

export const CATEGORY_LABELS: Record<TIngredientType, string> = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

export const SEARCH_DEBOUNCE_MS = 300;
