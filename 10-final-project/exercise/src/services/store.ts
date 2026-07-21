import { configureStore } from '@reduxjs/toolkit';
import { burgerReducer } from './slices/burger-slice';
import { authReducer } from './slices/auth-slice';

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
