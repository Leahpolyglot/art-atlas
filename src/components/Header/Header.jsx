import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1 className="header__logo">Art Atlas</h1>

      <nav className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link_active" : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link_active" : ""}`
          }
        >
          Explore
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link_active" : ""}`
          }
        >
          Favorites
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
