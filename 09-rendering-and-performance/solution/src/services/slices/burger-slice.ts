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
      state.items.push({ uid: crypto.randomUUID(), ingredient: action.payload });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.uid !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = burgerSlice.actions;
export const burgerReducer = burgerSlice.reducer;
