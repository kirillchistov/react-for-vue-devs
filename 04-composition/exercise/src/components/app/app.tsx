import { useEffect, useMemo, useState } from 'react';
import { IngredientCatalog } from '../ingredient-catalog/ingredient-catalog';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { IngredientSearch } from '../ingredient-search/ingredient-search';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useIngredients } from '@/hooks/use-ingredients';
import { useConstructor } from '@/hooks/use-constructor';
import { SEARCH_DEBOUNCE_MS } from '@/utils/constants';
import type { TIngredient } from '@/types';
import styles from './app.module.css';

export function App() {
  const { ingredients, status } = useIngredients();
  const { items, addItem, removeItem } = useConstructor();
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

  return (
    <main className={styles.app}>
      <h1>Конструктор Stellar Burger</h1>
      <div className={styles.layout}>
        <div className={styles.catalogColumn}>
          <IngredientSearch value={searchInput} onChange={setSearchInput} />
          <IngredientCatalog
            ingredients={visibleIngredients}
            status={status}
            onAdd={addItem}
            onSelect={setSelectedIngredient}
          />
        </div>
        <BurgerConstructor items={items} onRemove={removeItem} />
      </div>
      {selectedIngredient && (
        <Modal onClose={() => setSelectedIngredient(null)}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </main>
  );
}
