import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TBurgerItem, TIngredient } from '@/types';

interface BurgerState {
  items: TBurgerItem[];
}

const initialState: BurgerState = {
  items: [],
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TIngredient>) => {
      // TODO: добавьте новый слот { uid: crypto.randomUUID(), ingredient: action.payload }
      // в state.items.
      //
      // Это reducer внутри createSlice — Immer оборачивает его и позволяет
      // писать «мутирующий» код (state.items.push(...)), при этом снаружи
      // reducer всё равно возвращает новое неизменяемое состояние. Это
      // единственное официально разрешённое исключение из иммутабельного
      // правила Redux — см. шпаргалку модуля 00 и входную диагностику.
    },
    removeItem: (state, action: PayloadAction<string>) => {
      // TODO: уберите из state.items слот, чей uid равен action.payload.
      // Можно обычным .filter() с переприсваиванием state.items — Immer
      // одинаково хорошо обрабатывает и мутацию, и переприсвоение.
    },
  },
});

export const { addItem, removeItem } = burgerSlice.actions;
export const burgerReducer = burgerSlice.reducer;
