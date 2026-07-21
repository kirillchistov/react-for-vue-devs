import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TAuthUser {
  email: string;
}

interface AuthState {
  user: TAuthUser | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<TAuthUser>) => {
      // TODO: запишите пользователя из action.payload в state.user
    },
    logout: (state) => {
      // TODO: очистите state.user — верните его в null
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
