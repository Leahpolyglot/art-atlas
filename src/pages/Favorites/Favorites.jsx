import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";
import "./Favorites.css";

function Favorites({ favorites, onFavorite }) {
  return (
    <main className="main">
      <h2 className="main__title">Your favorites.</h2>

      <p className="main__description">
        Save artworks you love and revisit your personal collection anytime.
      </p>

      {favorites.length === 0 ? (
        <div className="favorites__empty-state">
          <h3 className="favorites__empty-title">No favorites yet.</h3>

          <p className="favorites__empty-text">
            Explore the collection and save the artworks you love.
          </p>
        </div>
      ) : (
        <div className="favorites__grid">
          {favorites.map((artwork) => (
            <ArtworkCard
              key={artwork.objectID}
              artwork={artwork}
              isFavorite={true}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
