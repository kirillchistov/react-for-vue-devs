import type { TIngredient } from '@/types';
import { IngredientList } from '../ingredient-list/ingredient-list';

interface CategorySectionProps {
  title: string;
  ingredients: TIngredient[];
  onAdd?: (ingredient: TIngredient) => void;
  onSelect?: (ingredient: TIngredient) => void;
}

export function CategorySection({ title, ingredients, onAdd, onSelect }: CategorySectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <IngredientList ingredients={ingredients} onAdd={onAdd} onSelect={onSelect} />
    </section>
  );
}
