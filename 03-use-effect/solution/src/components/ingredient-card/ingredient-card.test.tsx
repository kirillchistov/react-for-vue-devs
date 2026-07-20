import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IngredientCard } from './ingredient-card';
import type { TIngredient } from '@/types';

const ingredient: TIngredient = {
  id: 'bun-01',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  price: 988,
  image: '🥯',
};

describe('IngredientCard', () => {
  it('показывает название и цену ингредиента', () => {
    render(<IngredientCard ingredient={ingredient} />);
    expect(screen.getByText(ingredient.name)).toBeInTheDocument();
    expect(screen.getByText(/988/)).toBeInTheDocument();
  });

  it('вызывает onAdd с этим ингредиентом по клику на кнопку', () => {
    const handleAdd = vi.fn();
    render(<IngredientCard ingredient={ingredient} onAdd={handleAdd} />);
    fireEvent.click(screen.getByRole('button', { name: /добавить/i }));
    expect(handleAdd).toHaveBeenCalledWith(ingredient);
  });
});
