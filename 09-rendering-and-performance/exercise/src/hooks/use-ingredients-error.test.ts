import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/api', () => ({
  fetchIngredients: () => Promise.reject(new Error('network error')),
}));

import { useIngredients } from './use-ingredients';

describe('useIngredients — ошибка загрузки', () => {
  it('возвращает { status: "error", error } при неудачном запросе', async () => {
    const { result } = renderHook(() => useIngredients());

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });
    expect(result.current).toEqual({ status: 'error', error: expect.any(String) });
  });
});
