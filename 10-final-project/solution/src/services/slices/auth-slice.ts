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
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
