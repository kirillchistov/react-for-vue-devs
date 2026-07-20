import type { IngredientType } from '../types';

export const CATEGORY_ORDER: IngredientType[] = ['bun', 'sauce', 'main'];

export const CATEGORY_LABELS: Record<IngredientType, string> = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};
