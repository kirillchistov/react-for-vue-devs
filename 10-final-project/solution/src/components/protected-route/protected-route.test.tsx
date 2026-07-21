import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { authReducer, type TAuthUser } from '@/services/slices/auth-slice';

function renderProtected(user: TAuthUser | null) {
  const store = configureStore({ reducer: { auth: authReducer }, preloadedState: { auth: { user } } });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route path="/login" element={<p>Страница входа</p>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <p>Секретное содержимое</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('ProtectedRoute', () => {
  it('перенаправляет на /login, если пользователь не авторизован', () => {
    renderProtected(null);
    expect(screen.getByText('Страница входа')).toBeInTheDocument();
    expect(screen.queryByText('Секретное содержимое')).not.toBeInTheDocument();
  });

  it('показывает children, если пользователь авторизован', () => {
    renderProtected({ email: 'pilot@stellar.burger' });
    expect(screen.getByText('Секретное содержимое')).toBeInTheDocument();
  });
});
