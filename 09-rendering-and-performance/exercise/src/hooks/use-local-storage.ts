import { useState } from 'react';

export function useLocalStorage<TValue>(
  key: string,
  initialValue: TValue,
): [TValue, (value: TValue) => void] {
  const [value, setValue] = useState<TValue>(() => {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      return initialValue;
    }
    try {
      return JSON.parse(stored) as TValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (next: TValue) => {
    localStorage.setItem(key, JSON.stringify(next));
    setValue(next);
  };

  return [value, setStoredValue];
}
