import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setStoredValue = (next: string) => {
    localStorage.setItem(key, next);
    setValue(next);
  };

  return [value, setStoredValue] as const;
}
