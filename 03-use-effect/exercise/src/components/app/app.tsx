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
    // TODO: загрузите ингредиенты через fetchIngredients() при монтировании.
    //
    // Порядок действий:
    // 1. поставьте status в 'loading' (он и так 'loading' по умолчанию, но
    //    представьте, что этот эффект может перезапуститься ещё раз);
    // 2. вызовите fetchIngredients(), в .then(...) запишите результат в
    //    ingredients через setIngredients и поставьте status в 'ready';
    // 3. в .catch(...) поставьте status в 'error'.
    //
    // Важно: пока запрос летит, компонент может успеть размонтироваться
    // (например, если это часть роутинга). Чтобы не вызвать setState на
    // размонтированном компоненте, заведите флаг-переменную (например,
    // `let ignore = false`) и проверяйте её перед каждым setState внутри
    // .then/.catch. В функции очистки (return () => {...}) поставьте
    // `ignore = true`.
    //
    // В Vue это был бы просто `await` внутри onMounted — здесь нужен явный
    // guard, потому что useEffect не отменяет уже запущенный промис сам.
  }, []);

  useEffect(() => {
    // TODO: обновляйте debouncedSearch через SEARCH_DEBOUNCE_MS миллисекунд
    // после того, как searchInput перестал меняться.
    //
    // Подсказка: setTimeout внутри эффекта, clearTimeout в функции очистки.
    // Функция очистки будет вызываться при каждом новом рендере (то есть при
    // каждом нажатии клавиши) ДО того, как отработает эффект — именно она и
    // отменяет предыдущий, ещё не сработавший таймер.
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
