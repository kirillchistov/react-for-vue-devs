import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategorySection } from './CategorySection';
import { ingredients } from '../data/ingredients';

const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');

describe('CategorySection', () => {
  it('показывает заголовок категории', () => {
    render(<CategorySection title="Булки" ingredients={buns} />);
    expect(screen.getByRole('heading', { name: 'Булки' })).toBeInTheDocument();
  });

  it('показывает карточки ингредиентов этой категории', () => {
    render(<CategorySection title="Булки" ingredients={buns} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(buns.length);
  });
});
