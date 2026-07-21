import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IngredientSearch } from './ingredient-search';

describe('IngredientSearch', () => {
  it('показывает переданное value', () => {
    render(<IngredientSearch value="соус" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Найти ингредиент…')).toHaveValue('соус');
  });

  it('вызывает onChange с новым текстом при вводе', () => {
    const handleChange = vi.fn();
    render(<IngredientSearch value="" onChange={handleChange} />);
    fireEvent.change(screen.getByPlaceholderText('Найти ингредиент…'), {
      target: { value: 'булка' },
    });
    expect(handleChange).toHaveBeenCalledWith('булка');
  });
});
