import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { OrderSubmit } from './order-submit';
import { burgerReducer } from '@/services/slices/burger-slice';
import type { TBurgerItem, TIngredient } from '@/types';

vi.mock('@/utils/api', async () => {
  const actual = await vi.importActual<typeof import('@/utils/api')>('@/utils/api');
  return {
    ...actual,
    submitOrder: vi.fn(),
  };
});

import { submitOrder } from '@/utils/api';

const bun: TIngredient = {
  id: 'bun-01',
  name: 'Булка',
  type: 'bun',
  price: 988,
  image: '🥯',
  calories: 643,
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
};

function renderWithStore(items: TBurgerItem[]) {
  const store = configureStore({
    reducer: { burger: burgerReducer },
    preloadedState: { burger: { items } },
  });
  const utils = render(
    <Provider store={store}>
      <OrderSubmit items={items} />
    </Provider>,
  );
  return { ...utils, store };
}

describe('OrderSubmit', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('кнопка отключена, если конструктор пуст', () => {
    renderWithStore([]);
    expect(screen.getByRole('button', { name: /оформить заказ/i })).toBeDisabled();
  });

  it('отправляет заказ, показывает номер и очищает конструктор', async () => {
    vi.mocked(submitOrder).mockResolvedValueOnce({ orderNumber: 12345, ingredientIds: [bun.id] });
    const { store } = renderWithStore([{ uid: 'uid-1', ingredient: bun }]);

    fireEvent.click(screen.getByRole('button', { name: /оформить заказ/i }));

    expect(await screen.findByText(/12345/)).toBeInTheDocument();
    expect(store.getState().burger.items).toHaveLength(0);
  });

  it('показывает ошибку, если запрос не удался', async () => {
    vi.mocked(submitOrder).mockRejectedValueOnce(new Error('network error'));
    renderWithStore([{ uid: 'uid-1', ingredient: bun }]);

    fireEvent.click(screen.getByRole('button', { name: /оформить заказ/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/не получилось/i);
  });

  it('запоминает номер последнего заказа в localStorage', async () => {
    vi.mocked(submitOrder).mockResolvedValueOnce({ orderNumber: 54321, ingredientIds: [bun.id] });
    renderWithStore([{ uid: 'uid-1', ingredient: bun }]);

    fireEvent.click(screen.getByRole('button', { name: /оформить заказ/i }));
    await screen.findByText(/54321/);

    expect(localStorage.getItem('stellar-last-order')).toBe(JSON.stringify({ orderNumber: 54321 }));
  });

  it('показывает номер последнего заказа при следующем монтировании', () => {
    localStorage.setItem('stellar-last-order', JSON.stringify({ orderNumber: 11111 }));
    renderWithStore([]);

    expect(screen.getByTestId('last-order')).toHaveTextContent('11111');
  });
});
