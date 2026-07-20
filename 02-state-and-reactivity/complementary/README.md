# Дополнительный пример: лайк-кнопка

Тот же принцип, что в конструкторе бургера (иммутабельное обновление массива в state), но в одну кнопку — без ингредиентов и категорий. Уже решено, TODO нет.

```sh
npm install   # один раз, из корня репозитория (npm workspaces)
npm run dev    # http://localhost:5173
```

Посмотрите `src/components/LikeButton.tsx`: `likedBy` — массив, и обновляется он всегда через `filter`/spread, никогда через `push`/`splice`. Попробуйте сами сломать это — замените `setLikedBy([...likedBy, CURRENT_USER])` на `likedBy.push(CURRENT_USER); setLikedBy(likedBy)` и посмотрите, что кнопка перестанет обновляться, хотя ошибки не будет.
