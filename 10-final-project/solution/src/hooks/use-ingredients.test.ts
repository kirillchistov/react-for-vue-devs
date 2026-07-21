import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useIngredients } from './use-ingredients';
import { ingredients } from '@/data/ingredients';

describe('useIngredients', () => {
  it('изначально возвращает { status: "loading" }', () => {
    const { result } = renderHook(() => useIngredients());
    expect(result.current).toEqual({ status: 'loading' });
  });

  it('после загрузки возвращает { status: "ready", data }', async () => {
    const { result } = renderHook(() => useIngredients());
    await waitFor(() => {
      expect(result.current.status).toBe('ready');
    });
    expect(result.current).toEqual({ status: 'ready', data: ingredients });
  });
});
