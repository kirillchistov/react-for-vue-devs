import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('не вызывает onSubmit, если email и пароль невалидны', () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/введите настоящий email/i)).toBeInTheDocument();
    expect(screen.getByText(/не короче 6 символов/i)).toBeInTheDocument();
  });

  it('не показывает ошибки до первой попытки отправить форму', () => {
    render(<LoginForm onSubmit={() => {}} />);
    expect(screen.queryByText(/введите настоящий email/i)).not.toBeInTheDocument();
  });

  it('вызывает onSubmit с email и паролем, если оба валидны', () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'pilot@stellar.burger' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ email: 'pilot@stellar.burger', password: '123456' });
  });
});
