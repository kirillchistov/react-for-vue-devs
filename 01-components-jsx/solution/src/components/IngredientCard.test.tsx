import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});
