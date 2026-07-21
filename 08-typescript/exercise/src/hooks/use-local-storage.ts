import { useState } from 'react';

export function useLocalStorage<TValue>(
  key: string,
  initialValue: TValue,
): [TValue, (value: TValue) => void] {
  const [value, setValue] = useState<TValue>(() => {
    // TODO: прочитайте значение из localStorage.getItem(key).
    // Если там что-то есть — распарсите его как JSON (JSON.parse) и верните.
    // Если ничего нет — верните initialValue.
    //
    // На случай битого JSON (кто-то руками испортил localStorage) заверните
    // JSON.parse в try/catch и в catch тоже верните initialValue.
    return initialValue;
  });

  const setStoredValue = (next: TValue) => {
    // TODO: сохраните next в localStorage.setItem(key, ...) как JSON
    // (JSON.stringify) и обновите value через setValue(next).
  };

  return [value, setStoredValue];
}
