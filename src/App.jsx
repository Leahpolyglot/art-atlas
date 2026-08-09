import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Favorites from "./pages/Favorites/Favorites";
import Footer from "./components/Footer/Footer";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("art-atlas-favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  function handleFavorite(artwork) {
    const isAlreadyFavorite = favorites.some(
      (favorite) => favorite.objectID === artwork.objectID,
    );

    let updatedFavorites;

    if (isAlreadyFavorite) {
      updatedFavorites = favorites.filter(
        (favorite) => favorite.objectID !== artwork.objectID,
      );
    } else {
      updatedFavorites = [...favorites, artwork];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "art-atlas-favorites",
      JSON.stringify(updatedFavorites),
    );
  }

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/explore"
          element={
            <Explore favorites={favorites} onFavorite={handleFavorite} />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites favorites={favorites} onFavorite={handleFavorite} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
