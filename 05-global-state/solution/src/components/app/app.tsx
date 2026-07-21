import { useEffect, useMemo, useState } from 'react';
import { IngredientCatalog } from '../ingredient-catalog/ingredient-catalog';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { IngredientSearch } from '../ingredient-search/ingredient-search';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { AppHeader } from '../app-header/app-header';
import { useIngredients } from '@/hooks/use-ingredients';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { addItem, removeItem } from '@/services/slices/burger-slice';
import { SEARCH_DEBOUNCE_MS } from '@/utils/constants';
import type { TIngredient } from '@/types';
import styles from './app.module.css';

export function App() {
  const { ingredients, status } = useIngredients();
  const items = useAppSelector((state) => state.burger.items);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);

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

  const handleAdd = (ingredient: TIngredient) => {
    dispatch(addItem(ingredient));
  };

  const handleRemove = (uid: string) => {
    dispatch(removeItem(uid));
  };

  return (
    <main className={styles.app}>
      <AppHeader />
      <h1>Конструктор Stellar Burger</h1>
      <div className={styles.layout}>
        <div className={styles.catalogColumn}>
          <IngredientSearch value={searchInput} onChange={setSearchInput} />
          <IngredientCatalog
            ingredients={visibleIngredients}
            status={status}
            onAdd={handleAdd}
            onSelect={setSelectedIngredient}
          />
        </div>
        <BurgerConstructor items={items} onRemove={handleRemove} />
      </div>
      {selectedIngredient && (
        <Modal onClose={() => setSelectedIngredient(null)}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </main>
  );
}
