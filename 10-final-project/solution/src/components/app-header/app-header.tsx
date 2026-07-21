import { useAppSelector } from '@/hooks/use-app-selector';
import styles from './app-header.module.css';

export function AppHeader() {
  const count = useAppSelector((state) => state.burger.items.length);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className={styles.header}>
      <span>🍔 Stellar Burger</span>
      {user && <span data-testid="header-user">{user.email}</span>}
      <span className={styles.count} data-testid="header-count">
        {count}
      </span>
    </header>
  );
}
