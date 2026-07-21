import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { AppHeader } from './app-header';
import { burgerReducer, addItem } from '@/services/slices/burger-slice';
import { authReducer, type TAuthUser } from '@/services/slices/auth-slice';
import type { TIngredient } from '@/types';

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

function renderWithStore(preloadedItems: TIngredient[] = [], user: TAuthUser | null = null) {
  const store = configureStore({
    reducer: { burger: burgerReducer, auth: authReducer },
    preloadedState: { auth: { user } },
  });
  preloadedItems.forEach((ingredient) => store.dispatch(addItem(ingredient)));
  return render(
    <Provider store={store}>
      <AppHeader />
    </Provider>,
  );
}

describe('AppHeader', () => {
  it('показывает 0, если конструктор пуст', () => {
    renderWithStore();
    expect(screen.getByTestId('header-count')).toHaveTextContent('0');
  });

  it('показывает количество ингредиентов в конструкторе', () => {
    renderWithStore([bun, bun]);
    expect(screen.getByTestId('header-count')).toHaveTextContent('2');
  });

  it('не показывает email, если пользователь не авторизован', () => {
    renderWithStore();
    expect(screen.queryByTestId('header-user')).not.toBeInTheDocument();
  });

  it('показывает email авторизованного пользователя', () => {
    renderWithStore([], { email: 'pilot@stellar.burger' });
    expect(screen.getByTestId('header-user')).toHaveTextContent('pilot@stellar.burger');
  });
});
