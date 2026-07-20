import type { Ingredient } from '../types';
import { IngredientCard } from './IngredientCard';

interface IngredientListProps {
  ingredients: Ingredient[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <IngredientCard ingredient={ingredient} />
        </li>
      ))}
    </ul>
  );
}
