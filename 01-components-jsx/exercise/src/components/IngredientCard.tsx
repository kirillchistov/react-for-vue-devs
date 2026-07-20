import type { Ingredient } from '../types';

interface IngredientCardProps {
  ingredient: Ingredient;
}

export function IngredientCard({ ingredient }: IngredientCardProps) {
  // TODO: отрендерите карточку ингредиента.
  // Нужно показать: ingredient.image, ingredient.name и ingredient.price.
  //
  // В Vue это был бы шаблон с {{ ingredient.name }}. Здесь такой же текст —
  // просто значение обычного JS-выражения внутри JSX: {ingredient.name}
  return null;
}
