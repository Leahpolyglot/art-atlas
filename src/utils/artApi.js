const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export function searchArtworks(query) {
  return fetch(
    `${BASE_URL}/search?hasImages=true&q=${encodeURIComponent(query)}`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return response.json();
    })
    .then((result) => {
      const ids = result.objectIDs?.slice(0, 40) || [];

      return Promise.all(
        ids.map((id) =>
          fetch(`${BASE_URL}/objects/${id}`)
            .then((response) => {
              if (!response.ok) {
                return null;
              }

              return response.json();
            })
            .catch(() => null),
        ),
      );
    })
    .then((artworks) => {
      return artworks
        .filter(
          (artwork) =>
            artwork && artwork.isPublicDomain && artwork.primaryImageSmall,
        )
        .slice(0, 12);
    });
}
