import type { TCatalogStatus, TIngredient, TIngredientType } from '@/types';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/utils/constants';
import { CategorySection } from '../category-section/category-section';
import { Loader } from '../loader/loader';
import { EmptyState } from '../empty-state/empty-state';
import { ErrorState } from '../error-state/error-state';

interface IngredientCatalogProps {
  ingredients: TIngredient[];
  status: TCatalogStatus;
  onAdd?: (ingredient: TIngredient) => void;
  onSelect?: (ingredient: TIngredient) => void;
}

export function IngredientCatalog({ ingredients, status, onAdd, onSelect }: IngredientCatalogProps) {
  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <ErrorState />;
  }

  if (ingredients.length === 0) {
    return <EmptyState />;
  }

  const groupedByType = CATEGORY_ORDER.reduce<Record<TIngredientType, TIngredient[]>>(
    (groups, type) => {
      groups[type] = ingredients.filter((ingredient) => ingredient.type === type);
      return groups;
    },
    {} as Record<TIngredientType, TIngredient[]>,
  );

  return (
    <>
      {CATEGORY_ORDER.filter((type) => groupedByType[type].length > 0).map((type) => (
        <CategorySection
          key={type}
          title={CATEGORY_LABELS[type]}
          ingredients={groupedByType[type]}
          onAdd={onAdd}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
