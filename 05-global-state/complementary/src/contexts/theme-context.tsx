import { createContext, useContext, useState, type ReactNode } from 'react';

type TTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: TTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<TTheme>('dark');

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme должен вызываться внутри <ThemeProvider>');
  }
  return context;
}
