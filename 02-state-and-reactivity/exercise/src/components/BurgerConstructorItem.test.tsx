import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BurgerConstructorItem } from './BurgerConstructorItem';
import type { BurgerItem } from '../types';

const item: BurgerItem = {
  uid: 'uid-1',
  ingredient: {
    id: 'bun-01',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    price: 988,
    image: '🥯',
  },
};

describe('BurgerConstructorItem', () => {
  it('показывает название и цену ингредиента', () => {
    render(<BurgerConstructorItem item={item} onRemove={() => {}} />);
    expect(screen.getByText(item.ingredient.name)).toBeInTheDocument();
    expect(screen.getByText(/988/)).toBeInTheDocument();
  });

  it('вызывает onRemove с uid этого слота по клику на "Убрать"', () => {
    const handleRemove = vi.fn();
    render(<BurgerConstructorItem item={item} onRemove={handleRemove} />);
    fireEvent.click(screen.getByRole('button', { name: /убрать/i }));
    expect(handleRemove).toHaveBeenCalledWith('uid-1');
  });
});
