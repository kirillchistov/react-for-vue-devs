import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NavMenu } from './nav-menu';

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <NavMenu />
    </MemoryRouter>,
  );
}

describe('NavMenu', () => {
  it('рендерит пункты меню с правильными ссылками', () => {
    renderAt('/');
    expect(screen.getByRole('link', { name: 'Конструктор' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Лента' })).toHaveAttribute('href', '/feed');
    expect(screen.getByRole('link', { name: 'Профиль' })).toHaveAttribute('href', '/profile');
    expect(screen.getByRole('link', { name: 'Войти' })).toHaveAttribute('href', '/login');
  });

  it('помечает активный пункт меню через aria-current', () => {
    renderAt('/feed');
    expect(screen.getByRole('link', { name: 'Лента' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Конструктор' })).not.toHaveAttribute('aria-current');
  });
});
