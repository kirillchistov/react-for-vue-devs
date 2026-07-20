import type { Ingredient } from '../types';
import { IngredientList } from './IngredientList';

interface CategorySectionProps {
  title: string;
  ingredients: Ingredient[];
}

export function CategorySection({ title, ingredients }: CategorySectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <IngredientList ingredients={ingredients} />
    </section>
  );
}
