import { useEffect, useState } from 'react';
import { fetchIngredients } from '@/utils/api';
import type { TCatalogStatus, TIngredient } from '@/types';

interface UseIngredientsResult {
  ingredients: TIngredient[];
  status: TCatalogStatus;
}

export function useIngredients(): UseIngredientsResult {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [status, setStatus] = useState<TCatalogStatus>('loading');

  useEffect(() => {
    // TODO: перенесите сюда эффект загрузки из App (модуль 03) — тот же
    // fetchIngredients() с ignore-guard и cleanup, один в один. Идея модуля:
    // то, что раньше было "логикой компонента App", теперь самостоятельный
    // переиспользуемый кастомный хук — компонент про него больше не знает
    // ничего, кроме { ingredients, status }.
  }, []);

  return { ingredients, status };
}
