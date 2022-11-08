import { NavLink } from "react-router-dom";
import styles from "../sass/Header.module.sass";
import logo from "../assets/images/logo.png";

const Header = () => {
  const activeStyle = {
    backgroundColor: "#a7ffeb77"
  };

  return (
    <header>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span>Mi Panel</span>
      </div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink end to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/usuarios"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Lista de usuarios
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/usuarios/crear"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Crear usuario
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
