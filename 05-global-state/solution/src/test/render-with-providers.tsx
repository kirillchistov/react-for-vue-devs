import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { burgerReducer } from '@/services/slices/burger-slice';

export function renderWithProviders(ui: ReactElement) {
  const store = configureStore({ reducer: { burger: burgerReducer } });
  return render(<Provider store={store}>{ui}</Provider>);
}
