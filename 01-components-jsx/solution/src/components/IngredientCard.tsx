import type { Ingredient } from '../types';

interface IngredientCardProps {
  ingredient: Ingredient;
}

export function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <article className="ingredient-card">
      <span className="ingredient-card__image">{ingredient.image}</span>
      <p>{ingredient.name}</p>
      <p>{ingredient.price} ₽</p>
    </article>
  );
}
