import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Favorites from "./pages/Favorites/Favorites";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "./contexts/CurrentUserContext";
import { mainApi } from "./utils/MainApi";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [authModal, setAuthModal] = useState(null);
  const [isCheckingToken, setIsCheckingToken] = useState(() => Boolean(localStorage.getItem("jwt")));

  const openLogin = useCallback(() => setAuthModal("login"), []);
  const openRegister = useCallback(() => setAuthModal("register"), []);
  const closeAuthModal = useCallback(() => setAuthModal(null), []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    Promise.all([mainApi.getCurrentUser(token), mainApi.getSavedArtworks(token)])
      .then(([user, savedArtworks]) => {
        setCurrentUser(user);
        setFavorites(savedArtworks);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setFavorites([]);
      })
      .finally(() => setIsCheckingToken(false));
  }, []);

  function handleRegister(data) {
    return mainApi.register(data);
  }

  function handleLogin(data) {
    return mainApi.login(data).then(({ token }) => {
      localStorage.setItem("jwt", token);

      return Promise.all([mainApi.getCurrentUser(token), mainApi.getSavedArtworks(token)]).then(
        ([user, savedArtworks]) => {
          setCurrentUser(user);
          setFavorites(savedArtworks);
          closeAuthModal();
        },
      );
    });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setFavorites([]);
    navigate("/");
  }

  function handleFavorite(artwork) {
    if (!currentUser) {
      openLogin();
      return Promise.resolve();
    }

    const token = localStorage.getItem("jwt");
    const savedArtwork = favorites.find(
      (favorite) => favorite.objectID === artwork.objectID,
    );

    if (savedArtwork) {
      return mainApi.deleteArtwork(savedArtwork._id, token).then(() => {
        setFavorites((items) => items.filter((item) => item._id !== savedArtwork._id));
      });
    }

    return mainApi.saveArtwork(artwork, token).then((newArtwork) => {
      setFavorites((items) => [newArtwork, ...items]);
    });
  }

  if (isCheckingToken) {
    return <div className="app app_loading">Restoring your Art Atlas session...</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header onLogin={openLogin} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/explore"
            element={<Explore favorites={favorites} onFavorite={handleFavorite} />}
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute isLoggedIn={Boolean(currentUser)} onUnauthorized={openLogin}>
                <Favorites favorites={favorites} onFavorite={handleFavorite} />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        <Login
          isOpen={authModal === "login"}
          onClose={closeAuthModal}
          onLogin={handleLogin}
          onSwitchToRegister={openRegister}
        />
        <Register
          isOpen={authModal === "register"}
          onClose={closeAuthModal}
          onRegister={handleRegister}
          onSwitchToLogin={openLogin}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
