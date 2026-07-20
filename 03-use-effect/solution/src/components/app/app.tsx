import { useEffect, useMemo, useState } from 'react';
import { IngredientCatalog } from '../ingredient-catalog/ingredient-catalog';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { IngredientSearch } from '../ingredient-search/ingredient-search';
import { fetchIngredients } from '@/utils/api';
import { SEARCH_DEBOUNCE_MS } from '@/utils/constants';
import type { TBurgerItem, TCatalogStatus, TIngredient } from '@/types';
import styles from './app.module.css';

export function App() {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [status, setStatus] = useState<TCatalogStatus>('loading');
  const [burgerItems, setBurgerItems] = useState<TBurgerItem[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    let ignore = false;
    setStatus('loading');

    fetchIngredients()
      .then((data) => {
        if (!ignore) {
          setIngredients(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const handleAdd = (ingredient: TIngredient) => {
    setBurgerItems([...burgerItems, { uid: crypto.randomUUID(), ingredient }]);
  };

  const handleRemove = (uid: string) => {
    setBurgerItems(burgerItems.filter((item) => item.uid !== uid));
  };

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
          <IngredientCatalog ingredients={visibleIngredients} status={status} onAdd={handleAdd} />
        </div>
        <BurgerConstructor items={burgerItems} onRemove={handleRemove} />
      </div>
    </main>
  );
}
