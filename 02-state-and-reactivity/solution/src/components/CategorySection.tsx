import type { Ingredient } from '../types';
import { IngredientList } from './IngredientList';

interface CategorySectionProps {
  title: string;
  ingredients: Ingredient[];
  onAdd?: (ingredient: Ingredient) => void;
}

export function CategorySection({ title, ingredients, onAdd }: CategorySectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <IngredientList ingredients={ingredients} onAdd={onAdd} />
    </section>
  );
}
