import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IngredientCard } from './IngredientCard';
import type { Ingredient } from '../types';

const ingredient: Ingredient = {
  id: 'bun-01',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  price: 988,
  image: '🥯',
};

describe('IngredientCard', () => {
  it('показывает название ингредиента', () => {
    render(<IngredientCard ingredient={ingredient} />);
    expect(screen.getByText(ingredient.name)).toBeInTheDocument();
  });

  it('показывает цену ингредиента', () => {
    render(<IngredientCard ingredient={ingredient} />);
    expect(screen.getByText(/988/)).toBeInTheDocument();
  });

  it('показывает картинку-эмодзи ингредиента', () => {
    render(<IngredientCard ingredient={ingredient} />);
    expect(screen.getByText(ingredient.image)).toBeInTheDocument();
  });

  it('не показывает кнопку "Добавить", если onAdd не передан', () => {
    render(<IngredientCard ingredient={ingredient} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('вызывает onAdd с этим ингредиентом по клику на кнопку', () => {
    const handleAdd = vi.fn();
    render(<IngredientCard ingredient={ingredient} onAdd={handleAdd} />);
    fireEvent.click(screen.getByRole('button', { name: /добавить/i }));
    expect(handleAdd).toHaveBeenCalledWith(ingredient);
  });
});
