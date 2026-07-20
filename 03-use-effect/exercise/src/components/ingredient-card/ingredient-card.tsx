import type { TIngredient } from '@/types';
import styles from './ingredient-card.module.css';

interface IngredientCardProps {
  ingredient: TIngredient;
  onAdd?: (ingredient: TIngredient) => void;
}

export function IngredientCard({ ingredient, onAdd }: IngredientCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.image}>{ingredient.image}</span>
      <p>{ingredient.name}</p>
      <p>{ingredient.price} ₽</p>
      {onAdd && <button onClick={() => onAdd(ingredient)}>Добавить</button>}
    </article>
  );
}
