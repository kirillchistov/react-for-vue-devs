import type { Ingredient } from '../types';

interface IngredientCardProps {
  ingredient: Ingredient;
  onAdd?: (ingredient: Ingredient) => void;
}

export function IngredientCard({ ingredient, onAdd }: IngredientCardProps) {
  return (
    <article className="ingredient-card">
      <span className="ingredient-card__image">{ingredient.image}</span>
      <p>{ingredient.name}</p>
      <p>{ingredient.price} ₽</p>
      {/* TODO: если передан onAdd, отрендерите кнопку "Добавить",
          которая по клику вызывает onAdd(ingredient).
          Если onAdd не передан (например, в модуле 01 карточка
          использовалась без него) — кнопки быть не должно. */}
    </article>
  );
}
