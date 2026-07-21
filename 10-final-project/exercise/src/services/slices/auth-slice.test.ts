import { describe, expect, it } from 'vitest';
import { authReducer, login, logout } from './auth-slice';

describe('authSlice', () => {
  it('изначально user равен null', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state.user).toBeNull();
  });

  it('login записывает пользователя в state', () => {
    const state = authReducer(undefined, login({ email: 'pilot@stellar.burger' }));
    expect(state.user).toEqual({ email: 'pilot@stellar.burger' });
  });

  it('logout очищает пользователя', () => {
    let state = authReducer(undefined, login({ email: 'pilot@stellar.burger' }));
    state = authReducer(state, logout());
    expect(state.user).toBeNull();
  });
});
