import { useLocation, useNavigate } from 'react-router-dom';
import type { TIngredient } from '@/types';
import styles from './ingredient-card.module.css';

interface IngredientCardProps {
  ingredient: TIngredient;
  onAdd?: (ingredient: TIngredient) => void;
}

export function IngredientCard({ ingredient, onAdd }: IngredientCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const openDetails = () => {
    // TODO: перейдите на `/ingredients/${ingredient.id}`, передав в state
    // текущий location как background — именно это превращает переход в
    // модальный маршрут поверх фона, а не в обычный переход на страницу.
    // Подсказка: navigate(path, { state: { background: location } }).
  };

  return (
    <article className={styles.card} onClick={openDetails}>
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
