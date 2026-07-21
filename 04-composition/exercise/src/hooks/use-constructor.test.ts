import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useConstructor } from './use-constructor';
import type { TIngredient } from '@/types';

const bun: TIngredient = {
  id: 'bun-01',
  name: 'Булка',
  type: 'bun',
  price: 988,
  image: '🥯',
  calories: 643,
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
};

describe('useConstructor', () => {
  it('изначально пустой список', () => {
    const { result } = renderHook(() => useConstructor());
    expect(result.current.items).toEqual([]);
  });

  it('addItem добавляет новый слот с этим ингредиентом', () => {
    const { result } = renderHook(() => useConstructor());
    act(() => {
      result.current.addItem(bun);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].ingredient).toEqual(bun);
  });

  it('removeItem удаляет слот по uid, не трогая остальные', () => {
    const { result } = renderHook(() => useConstructor());
    act(() => {
      result.current.addItem(bun);
      result.current.addItem(bun);
    });
    const uidToRemove = result.current.items[0].uid;

    act(() => {
      result.current.removeItem(uidToRemove);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].uid).not.toBe(uidToRemove);
  });
});
