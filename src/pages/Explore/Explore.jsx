import { useState } from "react";
import { searchArtworks } from "../../utils/artApi";
import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";

function Explore({ favorites, onFavorite }) {
  const [query, setQuery] = useState("");
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    setIsLoading(true);
    setError("");
    setHasSearched(true);

    searchArtworks(query)
      .then((result) => {
        setArtworks(result);
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className="main">
      <h2 className="main__title">Explore the collection.</h2>

      <p className="main__description">
        Search and discover artworks from museums around the world.
      </p>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for Monet, Picasso, flowers..."
        />

        <button
          className="search-form__button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Searching the collection...</p>
        </div>
      )}
      {error && (
        <div className="error-state">
          <h3 className="error-state__title">Something went wrong.</h3>

          <p className="error-state__text">
            We couldn&apos;t load the collection. Please try again.
          </p>
        </div>
      )}

      {hasSearched && !isLoading && !error && artworks.length === 0 && (
        <div className="empty-state">
          <h3 className="empty-state__title">No artworks found.</h3>

          <p className="empty-state__text">
            Try another artist, artwork, or keyword.
          </p>
        </div>
      )}

      {!isLoading && artworks.length > 0 && (
        <div className="artworks-grid">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.objectID}
              artwork={artwork}
              isFavorite={favorites.some(
                (favorite) => favorite.objectID === artwork.objectID,
              )}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Explore;
