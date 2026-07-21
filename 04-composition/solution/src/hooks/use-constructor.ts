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
    setItems((current) => [...current, { uid: crypto.randomUUID(), ingredient }]);
  };

  const removeItem = (uid: string) => {
    setItems((current) => current.filter((item) => item.uid !== uid));
  };

  return { items, addItem, removeItem };
}
