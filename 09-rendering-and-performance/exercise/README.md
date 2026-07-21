# Упражнение: рендеринг и производительность

Полное описание задачи и теория — в [README модуля](../README.md).

```sh
npm install        # один раз, из корня репозитория (npm workspaces)
npm test            # красный — TODO ещё не сделаны
npm run test:watch  # тот же прогон, но в watch-режиме
npm run dev          # http://localhost:5173
```

Файлы с `// TODO`:

- `src/components/ingredient-card/ingredient-card.tsx` — оберните компонент в `memo(...)`
- `src/pages/home.tsx` — оберните `onAdd` в `useCallback`
