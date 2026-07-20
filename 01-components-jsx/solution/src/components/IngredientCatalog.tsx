import type { CatalogStatus, Ingredient, IngredientType } from '../types';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '../data/categories';
import { CategorySection } from './CategorySection';
import { Loader } from './Loader';
import { EmptyState } from './EmptyState';

interface IngredientCatalogProps {
  ingredients: Ingredient[];
  status: CatalogStatus;
}

export function IngredientCatalog({ ingredients, status }: IngredientCatalogProps) {
  if (status === 'loading') {
    return <Loader />;
  }

  if (ingredients.length === 0) {
    return <EmptyState />;
  }

  const groupedByType = CATEGORY_ORDER.reduce<Record<IngredientType, Ingredient[]>>(
    (groups, type) => {
      groups[type] = ingredients.filter((ingredient) => ingredient.type === type);
      return groups;
    },
    {} as Record<IngredientType, Ingredient[]>,
  );

  return (
    <>
      {CATEGORY_ORDER.filter((type) => groupedByType[type].length > 0).map((type) => (
        <CategorySection key={type} title={CATEGORY_LABELS[type]} ingredients={groupedByType[type]} />
      ))}
    </>
  );
}
