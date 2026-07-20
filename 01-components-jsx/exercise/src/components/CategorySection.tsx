import type { Ingredient } from '../types';
import { IngredientList } from './IngredientList';

interface CategorySectionProps {
  title: string;
  ingredients: Ingredient[];
}

export function CategorySection({ title, ingredients }: CategorySectionProps) {
  // TODO: отрендерите <section> с заголовком категории (title, как <h2>)
  // и списком ингредиентов этой категории (<IngredientList ingredients={ingredients} />).
  return null;
}
