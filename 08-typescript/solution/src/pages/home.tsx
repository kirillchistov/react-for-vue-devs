import { useEffect, useMemo, useState } from 'react';
import { IngredientCatalog } from '@/components/ingredient-catalog/ingredient-catalog';
import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { IngredientSearch } from '@/components/ingredient-search/ingredient-search';
import { OrderSubmit } from '@/components/order-submit/order-submit';
import { useIngredients } from '@/hooks/use-ingredients';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { addItem, removeItem } from '@/services/slices/burger-slice';
import { SEARCH_DEBOUNCE_MS } from '@/utils/constants';
import styles from './home.module.css';

export function HomePage() {
  const ingredientsState = useIngredients();
  const ingredients = ingredientsState.status === 'ready' ? ingredientsState.data : [];
  const items = useAppSelector((state) => state.burger.items);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const visibleIngredients = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) {
      return ingredients;
    }
    return ingredients.filter((ingredient) => ingredient.name.toLowerCase().includes(query));
  }, [ingredients, debouncedSearch]);

  return (
    <>
      <h1>Конструктор Stellar Burger</h1>
      <div className={styles.layout}>
        <div className={styles.catalogColumn}>
          <IngredientSearch value={searchInput} onChange={setSearchInput} />
          <IngredientCatalog
            ingredients={visibleIngredients}
            status={ingredientsState.status}
            onAdd={(ingredient) => dispatch(addItem(ingredient))}
          />
        </div>
        <div className={styles.constructorColumn}>
          <BurgerConstructor items={items} onRemove={(uid) => dispatch(removeItem(uid))} />
          <OrderSubmit items={items} />
        </div>
      </div>
    </>
  );
}
