import { useState } from 'react';
import type { TBurgerItem, TIngredient } from '@/types';

interface UseConstructorResult {
  items: TBurgerItem[];
  addItem: (ingredient: TIngredient) => void;
  removeItem: (uid: string) => void;
}

export function useConstructor(): UseConstructorResult {
  const [items, setItems] = useState<TBurgerItem[]>([]);

  const addItem = (ingredient: TIngredient) => {
    // TODO: перенесите сюда handleAdd из App (модуль 02) — иммутабельное
    // добавление { uid: crypto.randomUUID(), ingredient } в items.
  };

  const removeItem = (uid: string) => {
    // TODO: перенесите сюда handleRemove из App (модуль 02) — иммутабельное
    // удаление слота с этим uid через .filter().
  };

  return { items, addItem, removeItem };
}
