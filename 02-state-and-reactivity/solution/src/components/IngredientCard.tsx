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
      {onAdd && <button onClick={() => onAdd(ingredient)}>Добавить</button>}
    </article>
  );
}
