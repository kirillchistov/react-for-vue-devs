import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './app';
import { ingredients } from '@/data/ingredients';

function getAddButtonFor(name: string) {
  const card = screen.getByText(name).closest('article') as HTMLElement;
  return within(card).getByRole('button', { name: /добавить/i });
}

describe('App', () => {
  it('показывает загрузку сразу после монтирования', () => {
    render(<App />);
    expect(screen.getByRole('status')).toHaveTextContent(/груз/i);
  });

  it('после загрузки показывает каталог по категориям', async () => {
    render(<App />);
    expect(await screen.findByRole('heading', { name: 'Булки' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Соусы' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Начинки' })).toBeInTheDocument();
  });

  it('добавляет и убирает ингредиент из конструктора', async () => {
    render(<App />);
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    await screen.findByText(bun.name);

    fireEvent.click(getAddButtonFor(bun.name));
    const constructor = screen.getByTestId('burger-constructor');
    expect(within(constructor).getByText(bun.name)).toBeInTheDocument();

    fireEvent.click(within(constructor).getByRole('button', { name: /убрать/i }));
    expect(within(constructor).queryByText(bun.name)).not.toBeInTheDocument();
  });

  it('фильтрует список по поиску с задержкой (debounce)', async () => {
    render(<App />);
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

  it('открывает модалку с деталями ингредиента по клику на карточку', async () => {
    render(<App />);
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    await screen.findByText(bun.name);

    fireEvent.click(screen.getByText(bun.name));

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText(bun.name)).toBeInTheDocument();
    expect(within(dialog).getByText(/калории/i)).toBeInTheDocument();
  });
});
