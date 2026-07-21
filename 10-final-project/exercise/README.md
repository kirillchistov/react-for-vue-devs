# Упражнение: финальный проект

Полное описание задачи и теория — в [README модуля](../README.md).

```sh
npm install        # один раз, из корня репозитория (npm workspaces)
npm test            # красный — TODO ещё не сделаны
npm run test:watch  # тот же прогон, но в watch-режиме
npm run dev          # http://localhost:5173
```

Файлы с `// TODO`:

- `src/services/slices/auth-slice.ts` — редьюсеры `login`/`logout`
- `src/components/protected-route/protected-route.tsx` — редирект на `/login`, если пользователь не авторизован
- `src/pages/login.tsx` — `dispatch(login(...))` и переход на `/profile` после входа
- `src/pages/profile.tsx` — `dispatch(logout())` и переход на `/` после выхода
