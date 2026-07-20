import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { ingredients } from './data/ingredients';

function getAddButtonFor(name: string) {
  const card = screen.getByText(name).closest('article') as HTMLElement;
  return within(card).getByRole('button', { name: /добавить/i });
}

describe('App — конструктор бургера', () => {
  it('смоук: каталог ингредиентов из модуля 01 по-прежнему рендерится', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Булки' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Соусы' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Начинки' })).toBeInTheDocument();
  });

  it('добавляет ингредиент в конструктор по клику "Добавить"', () => {
    render(<App />);
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    fireEvent.click(getAddButtonFor(bun.name));

    const constructor = screen.getByTestId('burger-constructor');
    expect(within(constructor).getByText(bun.name)).toBeInTheDocument();
  });

  it('позволяет добавить один и тот же ингредиент дважды', () => {
    render(<App />);
    const sauce = ingredients.find((ingredient) => ingredient.type === 'sauce')!;
    const addButton = getAddButtonFor(sauce.name);
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const constructor = screen.getByTestId('burger-constructor');
    expect(within(constructor).getAllByText(sauce.name)).toHaveLength(2);
  });

  it('удаляет ингредиент из конструктора по клику "Убрать"', () => {
    render(<App />);
    const main = ingredients.find((ingredient) => ingredient.type === 'main')!;
    fireEvent.click(getAddButtonFor(main.name));

    const constructor = screen.getByTestId('burger-constructor');
    fireEvent.click(within(constructor).getByRole('button', { name: /убрать/i }));
    expect(within(constructor).queryByText(main.name)).not.toBeInTheDocument();
  });
});
