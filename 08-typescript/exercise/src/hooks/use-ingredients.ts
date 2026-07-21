import { useEffect, useState } from 'react';
import { fetchIngredients } from '@/utils/api';
import type { TAsyncState, TIngredient } from '@/types';

export function useIngredients(): TAsyncState<TIngredient[]> {
  const [state, setState] = useState<TAsyncState<TIngredient[]>>({ status: 'loading' });

  useEffect(() => {
    let ignore = false;
    setState({ status: 'loading' });

    fetchIngredients()
      .then((data) => {
        if (!ignore) {
          // TODO: вызовите setState с вариантом 'ready' — { status: 'ready', data }.
        }
      })
      .catch(() => {
        if (!ignore) {
          // TODO: вызовите setState с вариантом 'error' — { status: 'error',
          // error: '...сообщение...' }.
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return state;
}
