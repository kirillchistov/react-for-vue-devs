import type { Ingredient } from '../types';
import { IngredientCard } from './IngredientCard';

interface IngredientListProps {
  ingredients: Ingredient[];
  onAdd?: (ingredient: Ingredient) => void;
}

export function IngredientList({ ingredients, onAdd }: IngredientListProps) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <IngredientCard ingredient={ingredient} onAdd={onAdd} />
        </li>
      ))}
    </ul>
  );
}
