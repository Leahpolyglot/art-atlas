import {
  MAX_ARTWORK_RESULTS,
  MAX_OBJECT_IDS_TO_CHECK,
  MET_API_BASE_URL,
} from "./constants";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return response;
      }

      if (attempt === retries) {
        return null;
      }
    } catch {
      if (attempt === retries) {
        return null;
      }
    }

    await delay(700);
  }

  return null;
}

async function fetchArtwork(id) {
  const response = await fetchWithRetry(`${MET_API_BASE_URL}/objects/${id}`);

  if (!response) {
    return null;
  }

  try {
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
    const searchResponse = await fetchWithRetry(
      `${MET_API_BASE_URL}/search?hasImages=true&q=${encodeURIComponent(query)}`,
    );

    if (!searchResponse) {
      throw new Error("Search request failed");
    }

    const result = await searchResponse.json();
    const ids = result.objectIDs?.slice(0, MAX_OBJECT_IDS_TO_CHECK) || [];

    const artworks = [];

    for (let index = 0; index < ids.length; index += 3) {
      const batch = ids.slice(index, index + 3);

      const batchResults = await Promise.all(
        batch.map((id) => fetchArtwork(id)),
      );

      artworks.push(...batchResults.filter(Boolean));

      if (artworks.length >= MAX_ARTWORK_RESULTS) {
        break;
      }

      await delay(400);
    }

    return artworks.slice(0, MAX_ARTWORK_RESULTS);
  } catch (error) {
    throw new Error("Unable to load artworks from The Met API.", {
      cause: error,
    });
  }
}
