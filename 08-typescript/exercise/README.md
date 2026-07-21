# Упражнение: продвинутый TypeScript

Полное описание задачи и теория — в [README модуля](../README.md).

```sh
npm install        # один раз, из корня репозитория (npm workspaces)
npm test            # красный — TODO ещё не сделаны
npm run test:watch  # тот же прогон, но в watch-режиме
npm run dev          # http://localhost:5173
```

Файлы с `// TODO`:

- `src/hooks/use-local-storage.ts` — дженерик-хук: чтение/запись JSON в `localStorage`
- `src/hooks/use-ingredients.ts` — переход на дискриминированное объединение `TAsyncState<T>`
