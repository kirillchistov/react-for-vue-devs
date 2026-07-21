import type { TIngredient } from '@/types';
import styles from './ingredient-details.module.css';

interface IngredientDetailsProps {
  ingredient: TIngredient;
}

export function IngredientDetails({ ingredient }: IngredientDetailsProps) {
  return (
    <div className={styles.details}>
      <span className={styles.image}>{ingredient.image}</span>
      <h2>{ingredient.name}</h2>
      <dl className={styles.nutrition}>
        <div>
          <dt>Калории, ккал</dt>
          <dd>{ingredient.calories}</dd>
        </div>
        <div>
          <dt>Белки, г</dt>
          <dd>{ingredient.proteins}</dd>
        </div>
        <div>
          <dt>Жиры, г</dt>
          <dd>{ingredient.fat}</dd>
        </div>
        <div>
          <dt>Углеводы, г</dt>
          <dd>{ingredient.carbohydrates}</dd>
        </div>
      </dl>
    </div>
  );
}
