# Упражнение: кастомные хуки и модалка

Полное описание задачи и теория — в [README модуля](../README.md).

```sh
npm install        # один раз, из корня репозитория (npm workspaces)
npm test            # красный — TODO ещё не сделаны
npm run test:watch  # тот же прогон, но в watch-режиме
npm run dev          # http://localhost:5173
```

Файлы с `// TODO`:

- `src/hooks/use-ingredients.ts` — эффект загрузки, перенесённый из `App` (модуль 03)
- `src/hooks/use-constructor.ts` — `addItem`/`removeItem`, перенесённые из `App` (модуль 02)
- `src/components/modal/modal.tsx` — закрытие по Escape
