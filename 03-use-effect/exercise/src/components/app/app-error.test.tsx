import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/api', () => ({
  fetchIngredients: () => Promise.reject(new Error('network error')),
}));

import { App } from './app';

describe('App — ошибка загрузки', () => {
  it('показывает сообщение об ошибке, если запрос не удался', async () => {
    render(<App />);
    expect(await screen.findByText(/не получилось/i)).toBeInTheDocument();
  });
});
