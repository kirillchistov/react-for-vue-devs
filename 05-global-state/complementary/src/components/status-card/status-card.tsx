import { useTheme } from '@/contexts/theme-context';

export function StatusCard() {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'card card--dark' : 'card card--light'}>
      <p>Эта карточка не имеет никакого отношения к кнопке переключения темы.</p>
      <p>Она просто читает тему напрямую из Context — без единого пропа.</p>
    </div>
  );
}
