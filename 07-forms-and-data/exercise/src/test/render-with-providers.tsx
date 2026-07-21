import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { burgerReducer } from '@/services/slices/burger-slice';

interface RenderWithProvidersOptions {
  route?: string;
}

export function renderWithProviders(ui: ReactElement, { route = '/' }: RenderWithProvidersOptions = {}) {
  const store = configureStore({ reducer: { burger: burgerReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  );
}
