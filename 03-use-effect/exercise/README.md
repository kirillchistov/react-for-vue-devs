# Упражнение: загрузка и поиск ингредиентов

Полное описание задачи и теория — в [README модуля](../README.md).

```sh
npm install        # один раз, из корня репозитория (npm workspaces)
npm test            # красный — TODO ещё не сделаны
npm run test:watch  # тот же прогон, но в watch-режиме
npm run dev          # http://localhost:5173
```

Файлы с `// TODO`:

- `src/components/app/app.tsx` — эффект загрузки (`fetchIngredients`) и эффект debounce для поиска
- `src/components/ingredient-search/ingredient-search.tsx` — контролируемый инпут

С этого модуля структура файлов и типы приведены в соответствие с реальным Stellar Burger: kebab-case папки компонентов с колокейтед `*.module.css`, типы с префиксом `T` (`TIngredient`), алиас `@/` вместо относительных `../../`.
