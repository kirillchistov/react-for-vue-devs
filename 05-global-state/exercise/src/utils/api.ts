import type { TIngredient } from '@/types';
import { ingredients } from '@/data/ingredients';

export function fetchIngredients(): Promise<TIngredient[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ingredients), 50);
  });
}
