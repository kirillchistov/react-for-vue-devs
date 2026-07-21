import { NavLink } from 'react-router-dom';
import styles from './nav-menu.module.css';

export function NavMenu() {
  // TODO: отрендерите три NavLink — на "/" (текст "Конструктор"), на "/feed"
  // ("Лента") и на "/profile" ("Профиль"). Для активного пункта className
  // должен быть styles.linkActive, для остальных — styles.link.
  //
  // NavLink — единственный компонент React Router, которому не всё равно,
  // активен он сейчас или нет: он сам знает текущий адрес и передаёт это
  // знание в className как функцию: ({ isActive }) => ... В обычном <Link>
  // такого нет — там className просто строка.
  //
  // Ловушка: по умолчанию NavLink считает себя активным, если текущий путь
  // НАЧИНАЕТСЯ с его to — а с этим совпадает вообще любой путь для to="/".
  // Добавьте проп `end` именно на ссылку "/", чтобы она была активна только
  // на самом корне, а не на "/feed" и "/profile" тоже.
  return <nav className={styles.nav}></nav>;
}
