import type { Ingredient } from '../types';
import { IngredientCard } from './IngredientCard';

interface IngredientListProps {
  ingredients: Ingredient[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  // TODO: отрендерите по одной IngredientCard на каждый ингредиент через
  // ingredients.map(...). Оберните каждую карточку в <li>, а сам список — в <ul>.
  //
  // Не забудьте про key на <li> — и про то, что это должен быть ingredient.id,
  // а не индекс массива.
  return null;
}
