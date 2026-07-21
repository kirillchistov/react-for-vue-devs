export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
}

export const posts: Post[] = [
  {
    slug: 'pervyj-polyot',
    title: 'Первый полёт',
    excerpt: 'Как станция Nine получила своё имя.',
    body: 'Станцию назвали Nine в честь девятого дока верфи — ничего романтичнее придумать не успели.',
  },
  {
    slug: 'proxy-drive',
    title: 'Прощание с Proxy Drive',
    excerpt: 'Почему старый движок списали на berth 7.',
    body: 'Proxy Drive служил исправно, но новый стандарт флота требует React Core — переход неизбежен.',
  },
  {
    slug: 'recept-sousa',
    title: 'Рецепт фирменного соуса',
    excerpt: 'Немного истории Space Sauce.',
    body: 'Рецепт Space Sauce передаётся от повара к повару и не записан ни в одном журнале станции.',
  },
];
