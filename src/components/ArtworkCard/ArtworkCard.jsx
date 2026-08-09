import "./ArtworkCard.css";

function ArtworkCard({ artwork, isFavorite, onFavorite }) {
  function handleFavoriteClick() {
    onFavorite(artwork);
  }

  return (
    <article className="artwork-card">
      <div className="artwork-card__image-wrapper">
        <img
          className="artwork-card__image"
          src={artwork.primaryImageSmall}
          alt={artwork.title}
        />

        <button
          className={`artwork-card__favorite ${
            isFavorite ? "artwork-card__favorite_active" : ""
          }`}
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="artwork-card__content">
        <h3 className="artwork-card__title">{artwork.title}</h3>

        <p className="artwork-card__artist">
          {artwork.artistDisplayName || "Unknown artist"}
        </p>

        <p className="artwork-card__date">
          {artwork.objectDate || "Date unknown"}
        </p>
      </div>
    </article>
  );
}

export default ArtworkCard;
