import { useAppSelector } from '@/hooks/use-app-selector';
import styles from './app-header.module.css';

export function AppHeader() {
  // TODO: получите count — количество ингредиентов в конструкторе — через
  // useAppSelector, читая state.burger.items.length.
  //
  // Идея модуля: AppHeader не является родителем ни каталога, ни
  // конструктора — это компонент из совсем другой ветки дерева. Прокидывать
  // сюда count пропсами через десяток промежуточных компонентов (prop
  // drilling, привет из модуля 02) было бы неприятно. С Redux он просто сам
  // читает нужный кусочек глобального состояния.
  const count = 0;

  return (
    <header className={styles.header}>
      <span>🍔 Stellar Burger</span>
      <span className={styles.count} data-testid="header-count">
        {count}
      </span>
    </header>
  );
}
