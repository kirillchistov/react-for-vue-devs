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

  return { ingredients, status };
}
