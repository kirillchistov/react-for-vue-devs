import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePage } from './home';
import { ingredients } from '@/data/ingredients';
import { renderWithProviders } from '@/test/render-with-providers';

function getCard(name: string) {
  return screen.getByText(name).closest('article') as HTMLElement;
}

function getRenderCount(name: string) {
  return getCard(name).getAttribute('data-render-count');
}

describe('HomePage — рендеринг карточек ингредиентов', () => {
  it('добавление одного ингредиента не перерисовывает карточки остальных', async () => {
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
    const sauce = ingredients.find((ingredient) => ingredient.type === 'sauce')!;

    renderWithProviders(<HomePage />);
    await screen.findByText(bun.name);

    const sauceCountBefore = getRenderCount(sauce.name);

    fireEvent.click(within(getCard(bun.name)).getByRole('button', { name: /добавить/i }));

    expect(getRenderCount(sauce.name)).toBe(sauceCountBefore);
  });
});
