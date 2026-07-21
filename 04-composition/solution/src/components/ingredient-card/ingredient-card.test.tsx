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
  calories: 643,
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
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

  it('вызывает onSelect с этим ингредиентом по клику на карточку', () => {
    const handleSelect = vi.fn();
    render(<IngredientCard ingredient={ingredient} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText(ingredient.name));
    expect(handleSelect).toHaveBeenCalledWith(ingredient);
  });

  it('клик на кнопку "Добавить" не вызывает onSelect', () => {
    const handleAdd = vi.fn();
    const handleSelect = vi.fn();
    render(<IngredientCard ingredient={ingredient} onAdd={handleAdd} onSelect={handleSelect} />);
    fireEvent.click(screen.getByRole('button', { name: /добавить/i }));
    expect(handleAdd).toHaveBeenCalled();
    expect(handleSelect).not.toHaveBeenCalled();
  });
});
