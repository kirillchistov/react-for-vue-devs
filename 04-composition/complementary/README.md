# Дополнительный пример: useLocalStorage

Один и тот же кастомный хук переиспользован в двух совершенно разных компонентах — это и есть композиция вместо копирования кода. Уже решено, TODO нет.

```sh
npm install   # один раз, из корня репозитория (npm workspaces)
npm run dev    # http://localhost:5173
```

Посмотрите `src/hooks/use-local-storage.ts`: API один в один повторяет `useState` — `[value, setValue]` — только вдобавок сохраняет значение в `localStorage`. `NicknameWidget` и `NoteWidget` вызывают его с разными ключами и ничего не знают друг о друге.
