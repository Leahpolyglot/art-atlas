import { useContext } from "react";
import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Favorites.css";

function Favorites({ favorites, onFavorite }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <p className="favorites__eyebrow">{currentUser?.name}'s collection</p>
      <h2 className="main__title">Your favorites.</h2>

      <p className="main__description">
        You have saved {favorites.length} {favorites.length === 1 ? "artwork" : "artworks"}.
      </p>

      {favorites.length === 0 ? (
        <div className="favorites__empty-state">
          <h3 className="favorites__empty-title">No favorites yet.</h3>
          <p className="favorites__empty-text">Explore the collection and save the artworks you love.</p>
        </div>
      ) : (
        <div className="favorites__grid">
          {favorites.map((artwork) => (
            <ArtworkCard
              key={artwork._id || artwork.objectID}
              artwork={artwork}
              isFavorite
              onFavorite={onFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
