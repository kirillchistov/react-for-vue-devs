import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoginPage } from './login';

describe('LoginPage', () => {
  it('показывает приветствие с email после успешного входа', () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'pilot@stellar.burger' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    expect(screen.getByText(/pilot@stellar\.burger/)).toBeInTheDocument();
  });
});
