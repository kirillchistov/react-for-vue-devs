import { useCallback, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { IngredientCard } from './ingredient-card';
import type { TIngredient } from '@/types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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

function renderCard(onAdd?: (ingredient: TIngredient) => void) {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <IngredientCard ingredient={ingredient} onAdd={onAdd} />
    </MemoryRouter>,
  );
}

describe('IngredientCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('показывает название и цену ингредиента', () => {
    renderCard();
    expect(screen.getByText(ingredient.name)).toBeInTheDocument();
    expect(screen.getByText(/988/)).toBeInTheDocument();
  });

  it('вызывает onAdd с этим ингредиентом по клику на кнопку', () => {
    const handleAdd = vi.fn();
    renderCard(handleAdd);
    fireEvent.click(screen.getByRole('button', { name: /добавить/i }));
    expect(handleAdd).toHaveBeenCalledWith(ingredient);
  });

  it('переходит на /ingredients/:id с background в state по клику на карточку', () => {
    renderCard();
    fireEvent.click(screen.getByText(ingredient.name));
    expect(mockNavigate).toHaveBeenCalledWith(
      `/ingredients/${ingredient.id}`,
      expect.objectContaining({ state: expect.objectContaining({ background: expect.anything() }) }),
    );
  });

  it('клик на кнопку "Добавить" не запускает переход на страницу ингредиента', () => {
    const handleAdd = vi.fn();
    renderCard(handleAdd);
    fireEvent.click(screen.getByRole('button', { name: /добавить/i }));
    expect(handleAdd).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

function getRenderCount() {
  return screen.getByTestId(`card-${ingredient.id}`).getAttribute('data-render-count');
}

function TestHarness({ stableCallback }: { stableCallback: boolean }) {
  const [unrelated, setUnrelated] = useState(0);
  const stableOnAdd = useCallback(() => {}, []);
  const onAdd = stableCallback ? stableOnAdd : () => {};

  return (
    <MemoryRouter initialEntries={['/']}>
      <button onClick={() => setUnrelated((value) => value + 1)}>Несвязанное обновление ({unrelated})</button>
      <IngredientCard ingredient={ingredient} onAdd={onAdd} />
    </MemoryRouter>
  );
}

describe('IngredientCard — memo', () => {
  it('не перерисовывается при несвязанном обновлении родителя, если onAdd стабилен', () => {
    render(<TestHarness stableCallback />);
    const before = getRenderCount();

    fireEvent.click(screen.getByRole('button', { name: /несвязанное обновление/i }));

    expect(getRenderCount()).toBe(before);
  });

  it('перерисовывается при несвязанном обновлении родителя, если onAdd каждый раз новый', () => {
    render(<TestHarness stableCallback={false} />);
    const before = Number(getRenderCount());

    fireEvent.click(screen.getByRole('button', { name: /несвязанное обновление/i }));

    expect(Number(getRenderCount())).toBeGreaterThan(before);
  });
});
