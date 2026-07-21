import { NavLink } from 'react-router-dom';
import styles from './nav-menu.module.css';

const linkClassName = ({ isActive }: { isActive: boolean }) => (isActive ? styles.linkActive : styles.link);

export function NavMenu() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" end className={linkClassName}>
        Конструктор
      </NavLink>
      <NavLink to="/feed" className={linkClassName}>
        Лента
      </NavLink>
      <NavLink to="/profile" className={linkClassName}>
        Профиль
      </NavLink>
    </nav>
  );
}
