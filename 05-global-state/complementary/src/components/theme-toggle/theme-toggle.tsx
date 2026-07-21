import { useTheme } from '@/contexts/theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Сейчас: {theme === 'dark' ? 'тёмная' : 'светлая'} тема — переключить</button>;
}
