import type { TIngredient } from '@/types';
import { ingredients } from '@/data/ingredients';

export function fetchIngredients(): Promise<TIngredient[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ingredients), 50);
  });
}

export interface TOrderResponse {
  orderNumber: number;
  ingredientIds: string[];
}

export function submitOrder(ingredientIds: string[]): Promise<TOrderResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ orderNumber: Math.floor(10000 + Math.random() * 90000), ingredientIds });
    }, 50);
  });
}
