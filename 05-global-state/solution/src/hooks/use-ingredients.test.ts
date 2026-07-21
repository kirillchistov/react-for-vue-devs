import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useIngredients } from './use-ingredients';
import { ingredients } from '@/data/ingredients';

describe('useIngredients', () => {
  it('изначально возвращает статус loading и пустой список', () => {
    const { result } = renderHook(() => useIngredients());
    expect(result.current.status).toBe('loading');
    expect(result.current.ingredients).toEqual([]);
  });

  it('после загрузки возвращает статус ready и список ингредиентов', async () => {
    const { result } = renderHook(() => useIngredients());
    await waitFor(() => {
      expect(result.current.status).toBe('ready');
    });
    expect(result.current.ingredients).toEqual(ingredients);
  });
});
