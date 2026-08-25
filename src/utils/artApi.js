import {
  MAX_ARTWORK_RESULTS,
  MAX_OBJECT_IDS_TO_CHECK,
  MET_API_BASE_URL,
} from "./constants";

async function fetchArtwork(id) {
  try {
    const response = await fetch(`${MET_API_BASE_URL}/objects/${id}`);

    if (!response.ok) {
      return null;
    }

    const artwork = await response.json();

    if (!artwork.primaryImageSmall && !artwork.primaryImage) {
      return null;
    }

    return artwork;
  } catch {
    return null;
  }
}

export async function searchArtworks(query) {
  try {
    const searchResponse = await fetch(
      `${MET_API_BASE_URL}/search?hasImages=true&q=${encodeURIComponent(query)}`,
    );

    if (!searchResponse.ok) {
      throw new Error(`Search request failed: ${searchResponse.status}`);
    }

    const result = await searchResponse.json();
    const ids = result.objectIDs?.slice(0, MAX_OBJECT_IDS_TO_CHECK) || [];

    const artworks = [];

    for (let index = 0; index < ids.length; index += 5) {
      const batch = ids.slice(index, index + 5);

      const batchResults = await Promise.all(
        batch.map((id) => fetchArtwork(id)),
      );

      artworks.push(...batchResults.filter(Boolean));

      if (artworks.length >= MAX_ARTWORK_RESULTS) {
        break;
      }
    }

    return artworks.slice(0, MAX_ARTWORK_RESULTS);
  } catch (error) {
    throw new Error("Unable to load artworks from The Met API.", {
      cause: error,
    });
  }
}
