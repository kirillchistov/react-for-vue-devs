import { Link } from 'react-router-dom';
import { IngredientDetailsRoute } from '@/components/ingredient-details-route/ingredient-details-route';

export function IngredientPage() {
  return (
    <div>
      <p>
        <Link to="/">← Назад в конструктор</Link>
      </p>
      <IngredientDetailsRoute />
    </div>
  );
}
