import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './app';
import { ingredients } from '@/data/ingredients';
import { renderWithProviders } from '@/test/render-with-providers';

function getAddButtonFor(name: string) {
  const card = screen.getByText(name).closest('article') as HTMLElement;
  return within(card).getByRole('button', { name: /добавить/i });
}

describe('App — базовые маршруты', () => {
  it('на "/" показывает конструктор', async () => {
    renderWithProviders(<App />, { route: '/' });
    expect(await screen.findByRole('heading', { name: 'Булки' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Соусы' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Начинки' })).toBeInTheDocument();
  });

  it('на "/feed" показывает заглушку ленты', () => {
    renderWithProviders(<App />, { route: '/feed' });
    // ищем текст заглушки, а не пункт меню "Лента" — оба совпали бы с /лент/i
    expect(screen.getByText(/заказов/i)).toBeInTheDocument();
  });

  it('на "/profile" показывает заглушку профиля', () => {
    renderWithProviders(<App />, { route: '/profile' });
    expect(screen.getByText(/личный кабинет/i)).toBeInTheDocument();
  });

  it('на неизвестном пути показывает страницу "не найдено"', () => {
    renderWithProviders(<App />, { route: '/something-else' });
    expect(screen.getByText(/нет на станции/i)).toBeInTheDocument();
  });
});

describe('App — конструктор и шапка', () => {
  it('добавляет и убирает ингредиент из конструктора', async () => {
    renderWithProviders(<App />, { route: '/' });
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    await screen.findByText(bun.name);

    fireEvent.click(getAddButtonFor(bun.name));
    const constructor = screen.getByTestId('burger-constructor');
    expect(within(constructor).getByText(bun.name)).toBeInTheDocument();

    fireEvent.click(within(constructor).getByRole('button', { name: /убрать/i }));
    expect(within(constructor).queryByText(bun.name)).not.toBeInTheDocument();
  });

  it('обновляет счётчик в шапке при добавлении и удалении ингредиентов', async () => {
    renderWithProviders(<App />, { route: '/' });
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    await screen.findByText(bun.name);

    expect(screen.getByTestId('header-count')).toHaveTextContent('0');

    fireEvent.click(getAddButtonFor(bun.name));
    expect(screen.getByTestId('header-count')).toHaveTextContent('1');

    const constructor = screen.getByTestId('burger-constructor');
    fireEvent.click(within(constructor).getByRole('button', { name: /убрать/i }));
    expect(screen.getByTestId('header-count')).toHaveTextContent('0');
  });

  it('фильтрует список по поиску с задержкой (debounce)', async () => {
    renderWithProviders(<App />, { route: '/' });
    const sauce = ingredients.find((ingredient) => ingredient.type === 'sauce')!;
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    await screen.findByText(bun.name);

    fireEvent.change(screen.getByPlaceholderText('Найти ингредиент…'), {
      target: { value: sauce.name },
    });

    // сразу после ввода список ещё не должен отфильтроваться — debounce ждёт
    expect(screen.getByText(bun.name)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(bun.name)).not.toBeInTheDocument();
    });
    expect(screen.getByText(sauce.name)).toBeInTheDocument();
  });
});

describe('App — модальный маршрут', () => {
  it('клик по карточке открывает модалку поверх конструктора, фон остаётся на экране', async () => {
    renderWithProviders(<App />, { route: '/' });
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    await screen.findByText(bun.name);

    fireEvent.click(screen.getByText(bun.name));

    const dialog = await screen.findByRole('dialog');
    // модалка рендерится сразу, но IngredientDetailsRoute сам грузит данные —
    // ждём конкретно текст ингредиента, а не просто появление role="dialog"
    expect(await within(dialog).findByText(bun.name)).toBeInTheDocument();
    expect(within(dialog).getByText(/калории/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Булки' })).toBeInTheDocument();
  });

  it('закрытие модалки (Escape) возвращает на фон, не теряя введённый поиск', async () => {
    renderWithProviders(<App />, { route: '/' });
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    const sauce = ingredients.find((ingredient) => ingredient.type === 'sauce')!;
    await screen.findByText(bun.name);

    fireEvent.change(screen.getByPlaceholderText('Найти ингредиент…'), {
      target: { value: sauce.name },
    });
    await waitFor(() => expect(screen.queryByText(bun.name)).not.toBeInTheDocument());

    fireEvent.click(screen.getByText(sauce.name));
    await screen.findByRole('dialog');

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByPlaceholderText('Найти ингредиент…')).toHaveValue(sauce.name);
  });

  it('прямой переход на /ingredients/:id (без background) открывает страницу целиком, а не модалку', async () => {
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    renderWithProviders(<App />, { route: `/ingredients/${bun.id}` });

    expect(await screen.findByText(bun.name)).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(/назад/i)).toBeInTheDocument();
  });
});
