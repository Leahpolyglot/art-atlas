import {
  MAX_ARTWORK_RESULTS,
  MAX_OBJECT_IDS_TO_CHECK,
  MET_API_BASE_URL,
} from "./constants";

export function searchArtworks(query) {
  return fetch(
    `${MET_API_BASE_URL}/search?hasImages=true&q=${encodeURIComponent(query)}`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Search request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((result) => {
      const ids = result.objectIDs?.slice(0, MAX_OBJECT_IDS_TO_CHECK) || [];

      return Promise.all(
        ids.map((id) =>
          fetch(`${MET_API_BASE_URL}/objects/${id}`)
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
    .then((artworks) =>
      artworks
        .filter(
          (artwork) =>
            artwork && artwork.isPublicDomain && artwork.primaryImageSmall,
        )
        .slice(0, MAX_ARTWORK_RESULTS),
    )
    .catch((error) => {
      throw new Error("Unable to load artworks from The Met API.", {
        cause: error,
      });
    });
}
