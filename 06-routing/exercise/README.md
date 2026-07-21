# Упражнение: роутинг и модальные маршруты

Полное описание задачи и теория — в [README модуля](../README.md).

```sh
npm install        # один раз, из корня репозитория (npm workspaces)
npm test            # красный — TODO ещё не сделаны
npm run test:watch  # тот же прогон, но в watch-режиме
npm run dev          # http://localhost:5173
```

Файлы с `// TODO`:

- `src/components/app/app.tsx` — два блока `<Routes>` с трюком `background`
- `src/components/ingredient-card/ingredient-card.tsx` — переход на `/ingredients/:id` с `background` в state
- `src/components/nav-menu/nav-menu.tsx` — три `NavLink`
