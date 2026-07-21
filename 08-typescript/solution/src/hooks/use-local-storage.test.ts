import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalStorage } from './use-local-storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('возвращает initialValue, если в localStorage ничего нет', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('сохраняет значение в localStorage как JSON и обновляет value', () => {
    const { result } = renderHook(() => useLocalStorage<number>('test-count', 0));

    act(() => {
      result.current[1](42);
    });

    expect(result.current[0]).toBe(42);
    expect(localStorage.getItem('test-count')).toBe('42');
  });

  it('работает не только с примитивами, но и с объектами', () => {
    const { result } = renderHook(() => useLocalStorage<{ orderNumber: number } | null>('test-order', null));

    act(() => {
      result.current[1]({ orderNumber: 777 });
    });

    expect(result.current[0]).toEqual({ orderNumber: 777 });
  });

  it('читает уже сохранённое значение при монтировании', () => {
    localStorage.setItem('test-existing', JSON.stringify({ orderNumber: 555 }));

    const { result } = renderHook(() =>
      useLocalStorage<{ orderNumber: number } | null>('test-existing', null),
    );

    expect(result.current[0]).toEqual({ orderNumber: 555 });
  });
});
