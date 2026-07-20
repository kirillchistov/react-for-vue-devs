import type { CatalogStatus, Ingredient } from '../types';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '../data/categories';
import { CategorySection } from './CategorySection';
import { Loader } from './Loader';
import { EmptyState } from './EmptyState';

interface IngredientCatalogProps {
  ingredients: Ingredient[];
  status: CatalogStatus;
}

export function IngredientCatalog({ ingredients, status }: IngredientCatalogProps) {
  // TODO: обработайте три ситуации, без директив — обычным JS внутри функции:
  //
  // 1. status === 'loading'                        → <Loader />
  // 2. status === 'ready' && ingredients.length === 0 → <EmptyState />
  // 3. status === 'ready' && ingredients.length > 0   → сгруппируйте
  //    ingredients по type (используйте CATEGORY_ORDER для порядка и
  //    CATEGORY_LABELS для заголовков) и отрендерите по одной
  //    <CategorySection> на каждую непустую категорию.
  //
  // В Vue для первых двух случаев вы бы написали v-if/v-else на корневом
  // элементе шаблона. В JSX отдельного синтаксиса для этого нет — это
  // обычный ранний return или тернарник.
  return null;
}
