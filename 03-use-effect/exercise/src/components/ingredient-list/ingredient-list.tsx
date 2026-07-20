import type { TIngredient } from '@/types';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import styles from './ingredient-list.module.css';

interface IngredientListProps {
  ingredients: TIngredient[];
  onAdd?: (ingredient: TIngredient) => void;
}

export function IngredientList({ ingredients, onAdd }: IngredientListProps) {
  return (
    <ul className={styles.list}>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <IngredientCard ingredient={ingredient} onAdd={onAdd} />
        </li>
      ))}
    </ul>
  );
}
