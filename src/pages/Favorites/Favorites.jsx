import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";

function Favorites({ favorites, onFavorite }) {
  return (
    <main className="main">
      <h2 className="main__title">Your favorites.</h2>

      <p className="main__description">
        Save artworks you love and revisit your personal collection anytime.
      </p>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-state__title">No favorites yet.</h3>

          <p className="empty-state__text">
            Explore the collection and save the artworks you love.
          </p>
        </div>
      ) : (
        <div className="artworks-grid">
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
