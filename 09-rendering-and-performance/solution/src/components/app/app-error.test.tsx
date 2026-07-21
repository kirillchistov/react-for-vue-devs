import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/render-with-providers';

vi.mock('@/utils/api', () => ({
  fetchIngredients: () => Promise.reject(new Error('network error')),
}));

import { App } from './app';

describe('App — ошибка загрузки', () => {
  it('показывает сообщение об ошибке, если запрос не удался', async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText(/не получилось/i)).toBeInTheDocument();
  });
});
