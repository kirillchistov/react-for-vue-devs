import { useParams } from 'react-router-dom';
import { useIngredients } from '@/hooks/use-ingredients';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Loader } from '../loader/loader';

export function IngredientDetailsRoute() {
  const { id } = useParams();
  const { ingredients, status } = useIngredients();

  if (status === 'loading') {
    return <Loader />;
  }

  const ingredient = ingredients.find((item) => item.id === id);

  if (!ingredient) {
    return <p>Ингредиент не найден.</p>;
  }

  return <IngredientDetails ingredient={ingredient} />;
}
