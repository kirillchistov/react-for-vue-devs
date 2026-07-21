import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfilePage } from './profile';
import { renderWithProviders } from '@/test/render-with-providers';

describe('ProfilePage', () => {
  it('показывает email авторизованного пользователя', () => {
    renderWithProviders(<ProfilePage />, { user: { email: 'pilot@stellar.burger' } });
    expect(screen.getByText(/pilot@stellar\.burger/)).toBeInTheDocument();
  });

  it('кнопка "Выйти" очищает пользователя из auth-состояния', () => {
    const { store } = renderWithProviders(<ProfilePage />, { user: { email: 'pilot@stellar.burger' } });

    fireEvent.click(screen.getByRole('button', { name: /выйти/i }));

    expect(store.getState().auth.user).toBeNull();
  });
});
