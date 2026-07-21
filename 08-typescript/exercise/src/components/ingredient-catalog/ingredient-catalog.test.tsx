import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { IngredientCatalog } from './ingredient-catalog';
import { ingredients } from '@/data/ingredients';

function renderCatalog(props: Parameters<typeof IngredientCatalog>[0]) {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <IngredientCatalog {...props} />
    </MemoryRouter>,
  );
}

describe('IngredientCatalog', () => {
  it('показывает загрузку в статусе loading', () => {
    renderCatalog({ ingredients: [], status: 'loading' });
    expect(screen.getByRole('status')).toHaveTextContent(/груз/i);
  });

  it('показывает сообщение об ошибке в статусе error', () => {
    renderCatalog({ ingredients: [], status: 'error' });
    expect(screen.getByRole('status')).toHaveTextContent(/не получилось/i);
  });

  it('показывает пустое состояние, когда данных нет', () => {
    renderCatalog({ ingredients: [], status: 'ready' });
    expect(screen.getByRole('status')).toHaveTextContent(/пусто/i);
  });

  it('группирует ингредиенты по категориям', () => {
    renderCatalog({ ingredients, status: 'ready' });
    expect(screen.getByRole('heading', { name: 'Булки' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Соусы' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Начинки' })).toBeInTheDocument();
  });

  it('рендерит карточки внутри своей категории', () => {
    renderCatalog({ ingredients, status: 'ready' });
    const bunsHeading = screen.getByRole('heading', { name: 'Булки' });
    const bunsSection = bunsHeading.closest('section') as HTMLElement;
    const bunsCount = ingredients.filter((ingredient) => ingredient.type === 'bun').length;
    expect(within(bunsSection).getAllByRole('listitem')).toHaveLength(bunsCount);
  });
});
