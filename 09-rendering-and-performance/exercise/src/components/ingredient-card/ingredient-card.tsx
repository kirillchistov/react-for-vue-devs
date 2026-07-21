import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { TIngredient } from '@/types';
import styles from './ingredient-card.module.css';

interface IngredientCardProps {
  ingredient: TIngredient;
  onAdd?: (ingredient: TIngredient) => void;
}

// TODO: оберните эту функцию в memo(...) (импортируйте memo из 'react') и
// не забудьте поменять `function IngredientCard` на `const IngredientCard =
// memo(function IngredientCard`, с закрывающей `)` после последней `}`.
//
// data-render-count ниже — счётчик рендеров прямо в DOM, специально для
// тестов и для того, чтобы увидеть эффект своими глазами в браузере.
export function IngredientCard({ ingredient, onAdd }: IngredientCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const renderCount = useRef(0);
  renderCount.current += 1;

  const openDetails = () => {
    navigate(`/ingredients/${ingredient.id}`, { state: { background: location } });
  };

  return (
    <article
      className={styles.card}
      onClick={openDetails}
      data-testid={`card-${ingredient.id}`}
      data-render-count={renderCount.current}
    >
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
