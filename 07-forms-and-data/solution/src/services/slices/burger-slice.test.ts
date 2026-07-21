import { describe, expect, it } from 'vitest';
import { burgerReducer, addItem, removeItem, clearItems } from './burger-slice';
import type { TIngredient } from '@/types';

const bun: TIngredient = {
  id: 'bun-01',
  name: 'Булка',
  type: 'bun',
  price: 988,
  image: '🥯',
  calories: 643,
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
};

describe('burgerSlice', () => {
  it('изначально items пустой', () => {
    const state = burgerReducer(undefined, { type: '@@INIT' });
    expect(state.items).toEqual([]);
  });

  it('addItem добавляет новый слот с этим ингредиентом', () => {
    const state = burgerReducer(undefined, addItem(bun));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].ingredient).toEqual(bun);
  });

  it('addItem не мутирует предыдущее состояние', () => {
    const initialState = burgerReducer(undefined, { type: '@@INIT' });
    const nextState = burgerReducer(initialState, addItem(bun));
    expect(initialState.items).toHaveLength(0);
    expect(nextState.items).toHaveLength(1);
    expect(initialState).not.toBe(nextState);
  });

  it('removeItem удаляет слот по uid, не трогая остальные', () => {
    let state = burgerReducer(undefined, addItem(bun));
    state = burgerReducer(state, addItem(bun));
    const uidToRemove = state.items[0].uid;

    state = burgerReducer(state, removeItem(uidToRemove));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].uid).not.toBe(uidToRemove);
  });

  it('clearItems полностью очищает конструктор', () => {
    let state = burgerReducer(undefined, addItem(bun));
    state = burgerReducer(state, addItem(bun));

    state = burgerReducer(state, clearItems());

    expect(state.items).toEqual([]);
  });
});
