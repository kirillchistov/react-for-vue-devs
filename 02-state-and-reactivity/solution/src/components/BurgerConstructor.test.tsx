import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BurgerConstructor } from './BurgerConstructor';
import type { BurgerItem, Ingredient } from '../types';

const bun: Ingredient = { id: 'bun-01', name: 'Булка', type: 'bun', price: 988, image: '🥯' };
const sauce: Ingredient = { id: 'sauce-01', name: 'Соус', type: 'sauce', price: 90, image: '🥫' };

describe('BurgerConstructor', () => {
  it('показывает заглушку, если бургер пуст', () => {
    render(<BurgerConstructor items={[]} onRemove={() => {}} />);
    expect(screen.getByTestId('burger-constructor')).toHaveTextContent(/собери/i);
  });

  it('рендерит по одному BurgerConstructorItem на каждый переданный item', () => {
    const items: BurgerItem[] = [
      { uid: 'uid-1', ingredient: bun },
      { uid: 'uid-2', ingredient: sauce },
    ];
    render(<BurgerConstructor items={items} onRemove={() => {}} />);
    const constructor = screen.getByTestId('burger-constructor');
    expect(within(constructor).getByText(bun.name)).toBeInTheDocument();
    expect(within(constructor).getByText(sauce.name)).toBeInTheDocument();
  });

  it('показывает сумму цен всех ингредиентов в бургере', () => {
    const items: BurgerItem[] = [
      { uid: 'uid-1', ingredient: bun },
      { uid: 'uid-2', ingredient: sauce },
    ];
    render(<BurgerConstructor items={items} onRemove={() => {}} />);
    expect(screen.getByTestId('burger-constructor')).toHaveTextContent('1078');
  });

  it('корректно считает сумму, если один и тот же ингредиент добавлен дважды', () => {
    const items: BurgerItem[] = [
      { uid: 'uid-1', ingredient: sauce },
      { uid: 'uid-2', ingredient: sauce },
    ];
    render(<BurgerConstructor items={items} onRemove={() => {}} />);
    expect(screen.getByTestId('burger-constructor')).toHaveTextContent('180');
  });
});
