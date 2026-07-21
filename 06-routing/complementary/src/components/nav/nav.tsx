import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  fontWeight: isActive ? 700 : 400,
  marginRight: 16,
});

export function Nav() {
  return (
    <nav>
      <NavLink to="/" end style={linkStyle}>
        Блог
      </NavLink>
      <NavLink to="/about" style={linkStyle}>
        О станции
      </NavLink>
    </nav>
  );
}
