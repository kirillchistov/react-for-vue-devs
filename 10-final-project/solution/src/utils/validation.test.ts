import { describe, expect, it } from 'vitest';
import { isValidEmail, isValidPassword } from './validation';

describe('isValidEmail', () => {
  it('принимает похожий на настоящий email', () => {
    expect(isValidEmail('pilot@stellar.burger')).toBe(true);
  });

  it('отклоняет строку без "@"', () => {
    expect(isValidEmail('pilotstellar.burger')).toBe(false);
  });

  it('отклоняет строку без точки в домене', () => {
    expect(isValidEmail('pilot@stellar')).toBe(false);
  });

  it('отклоняет пустую строку', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidPassword', () => {
  it('принимает пароль от 6 символов', () => {
    expect(isValidPassword('123456')).toBe(true);
  });

  it('отклоняет короткий пароль', () => {
    expect(isValidPassword('123')).toBe(false);
  });

  it('отклоняет пустую строку', () => {
    expect(isValidPassword('')).toBe(false);
  });
});
