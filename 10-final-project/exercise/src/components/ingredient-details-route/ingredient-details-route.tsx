import { useParams } from 'react-router-dom';
import { useIngredients } from '@/hooks/use-ingredients';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Loader } from '../loader/loader';

export function IngredientDetailsRoute() {
  const { id } = useParams();
  const ingredientsState = useIngredients();

  if (ingredientsState.status === 'loading') {
    return <Loader />;
  }

  const ingredient =
    ingredientsState.status === 'ready' ? ingredientsState.data.find((item) => item.id === id) : undefined;

  if (!ingredient) {
    return <p>Ингредиент не найден.</p>;
  }

  return <IngredientDetails ingredient={ingredient} />;
}
