import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IngredientList } from './IngredientList';
import { ingredients } from '../data/ingredients';

describe('IngredientList', () => {
  it('рендерит карточку на каждый переданный ингредиент', () => {
    render(<IngredientList ingredients={ingredients} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(ingredients.length);
  });

  it('рендерит пустой список без ошибок, если ингредиентов нет', () => {
    render(<IngredientList ingredients={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
