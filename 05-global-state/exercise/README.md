# Упражнение: глобальное состояние на Redux Toolkit

Полное описание задачи и теория — в [README модуля](../README.md).

```sh
npm install        # один раз, из корня репозитория (npm workspaces)
npm test            # красный — TODO ещё не сделаны
npm run test:watch  # тот же прогон, но в watch-режиме
npm run dev          # http://localhost:5173
```

Файлы с `// TODO`:

- `src/services/slices/burger-slice.ts` — reducers `addItem`/`removeItem`
- `src/components/app/app.tsx` — `handleAdd`/`handleRemove` через `dispatch`
- `src/components/app-header/app-header.tsx` — счётчик через `useAppSelector`
