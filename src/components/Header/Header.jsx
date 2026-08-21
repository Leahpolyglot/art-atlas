import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";

function Header({ onLogin, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <NavLink to="/" className="header__logo">Art Atlas</NavLink>

      <nav className="header__nav">
        <NavLink to="/" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>
          Explore
        </NavLink>

        {currentUser ? (
          <>
            <NavLink to="/favorites" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>
              Favorites
            </NavLink>
            <button className="header__auth-button" type="button" onClick={onLogout}>
              Log out
              <span className="header__user-name">{currentUser.name}</span>
            </button>
          </>
        ) : (
          <button className="header__auth-button" type="button" onClick={onLogin}>
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
