import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BurgerConstructor } from './burger-constructor';
import type { TBurgerItem, TIngredient } from '@/types';

const bun: TIngredient = { id: 'bun-01', name: 'Булка', type: 'bun', price: 988, image: '🥯', calories: 643, proteins: 44, fat: 26, carbohydrates: 85 };
const sauce: TIngredient = { id: 'sauce-01', name: 'Соус', type: 'sauce', price: 90, image: '🥫', calories: 30, proteins: 0, fat: 2, carbohydrates: 3 };

describe('BurgerConstructor', () => {
  it('показывает заглушку, если бургер пуст', () => {
    render(<BurgerConstructor items={[]} onRemove={() => {}} />);
    expect(screen.getByTestId('burger-constructor')).toHaveTextContent(/собери/i);
  });

  it('рендерит по одному BurgerConstructorItem на каждый переданный item', () => {
    const items: TBurgerItem[] = [
      { uid: 'uid-1', ingredient: bun },
      { uid: 'uid-2', ingredient: sauce },
    ];
    render(<BurgerConstructor items={items} onRemove={() => {}} />);
    const constructor = screen.getByTestId('burger-constructor');
    expect(within(constructor).getByText(bun.name)).toBeInTheDocument();
    expect(within(constructor).getByText(sauce.name)).toBeInTheDocument();
  });

  it('показывает сумму цен всех ингредиентов в бургере', () => {
    const items: TBurgerItem[] = [
      { uid: 'uid-1', ingredient: bun },
      { uid: 'uid-2', ingredient: sauce },
    ];
    render(<BurgerConstructor items={items} onRemove={() => {}} />);
    expect(screen.getByTestId('burger-constructor')).toHaveTextContent('1078');
  });
});
