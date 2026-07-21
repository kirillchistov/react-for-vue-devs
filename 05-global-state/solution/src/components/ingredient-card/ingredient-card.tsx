import type { TIngredient } from '@/types';
import styles from './ingredient-card.module.css';

interface IngredientCardProps {
  ingredient: TIngredient;
  onAdd?: (ingredient: TIngredient) => void;
  onSelect?: (ingredient: TIngredient) => void;
}

export function IngredientCard({ ingredient, onAdd, onSelect }: IngredientCardProps) {
  return (
    <article className={styles.card} onClick={() => onSelect?.(ingredient)}>
      <span className={styles.image}>{ingredient.image}</span>
      <p>{ingredient.name}</p>
      <p>{ingredient.price} ₽</p>
      {onAdd && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onAdd(ingredient);
          }}
        >
          Добавить
        </button>
      )}
    </article>
  );
}
