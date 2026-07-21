import { useAppSelector } from '@/hooks/use-app-selector';
import styles from './app-header.module.css';

export function AppHeader() {
  const count = useAppSelector((state) => state.burger.items.length);

  return (
    <header className={styles.header}>
      <span>🍔 Stellar Burger</span>
      <span className={styles.count} data-testid="header-count">
        {count}
      </span>
    </header>
  );
}
