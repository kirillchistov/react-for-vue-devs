import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IngredientCatalog } from './ingredient-catalog';
import { ingredients } from '@/data/ingredients';

describe('IngredientCatalog', () => {
  it('показывает загрузку в статусе loading', () => {
    render(<IngredientCatalog ingredients={[]} status="loading" />);
    expect(screen.getByRole('status')).toHaveTextContent(/груз/i);
  });

  it('показывает сообщение об ошибке в статусе error', () => {
    render(<IngredientCatalog ingredients={[]} status="error" />);
    expect(screen.getByRole('status')).toHaveTextContent(/не получилось/i);
  });

  it('показывает пустое состояние, когда данных нет', () => {
    render(<IngredientCatalog ingredients={[]} status="ready" />);
    expect(screen.getByRole('status')).toHaveTextContent(/пусто/i);
  });

  it('группирует ингредиенты по категориям', () => {
    render(<IngredientCatalog ingredients={ingredients} status="ready" />);
    expect(screen.getByRole('heading', { name: 'Булки' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Соусы' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Начинки' })).toBeInTheDocument();
  });

  it('рендерит карточки внутри своей категории', () => {
    render(<IngredientCatalog ingredients={ingredients} status="ready" />);
    const bunsHeading = screen.getByRole('heading', { name: 'Булки' });
    const bunsSection = bunsHeading.closest('section') as HTMLElement;
    const bunsCount = ingredients.filter((ingredient) => ingredient.type === 'bun').length;
    expect(within(bunsSection).getAllByRole('listitem')).toHaveLength(bunsCount);
  });
});
