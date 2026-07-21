import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { burgerReducer } from '@/services/slices/burger-slice';
import { authReducer, type TAuthUser } from '@/services/slices/auth-slice';

interface RenderWithProvidersOptions {
  route?: string;
  user?: TAuthUser | null;
}

export function renderWithProviders(ui: ReactElement, { route = '/', user = null }: RenderWithProvidersOptions = {}) {
  const store = configureStore({
    reducer: { burger: burgerReducer, auth: authReducer },
    preloadedState: { auth: { user } },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    ),
  };
}
