# Упражнение: формы и данные

Полное описание задачи и теория — в [README модуля](../README.md).

```sh
npm install        # один раз, из корня репозитория (npm workspaces)
npm test            # красный — TODO ещё не сделаны
npm run test:watch  # тот же прогон, но в watch-режиме
npm run dev          # http://localhost:5173
```

Файлы с `// TODO`:

- `src/utils/validation.ts` — `isValidEmail`/`isValidPassword`
- `src/components/order-submit/order-submit.tsx` — отправка заказа
- `src/pages/login.tsx` — сохранение email после успешного входа
