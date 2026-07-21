import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './login';
import { renderWithProviders } from '@/test/render-with-providers';

function loginRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<p>Личный кабинет: тест</p>} />
    </Routes>
  );
}

describe('LoginPage', () => {
  it('после успешного входа переходит на /profile', () => {
    renderWithProviders(loginRoutes(), { route: '/login' });

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'pilot@stellar.burger' } });
    fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    expect(screen.getByText('Личный кабинет: тест')).toBeInTheDocument();
  });

  it('уже авторизованного пользователя сразу перенаправляет на /profile', () => {
    renderWithProviders(loginRoutes(), { route: '/login', user: { email: 'pilot@stellar.burger' } });

    expect(screen.getByText('Личный кабинет: тест')).toBeInTheDocument();
  });
});
