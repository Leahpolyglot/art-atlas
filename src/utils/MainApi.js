import { MAIN_API_BASE_URL } from "./constants";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return response
    .json()
    .catch(() => ({}))
    .then((data) => {
      throw new Error(
        data.message || data.error || `Request failed: ${response.status}`,
      );
    });
}

function request(path, options = {}) {
  return fetch(`${MAIN_API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }).then(checkResponse);
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

function normalizeArtwork(artwork) {
  return {
    ...artwork,
    objectID: artwork.externalId,
    primaryImageSmall: artwork.imageUrl,
    artistDisplayName: artwork.artist,
    objectDate:
      artwork.objectDate ||
      (artwork.year ? String(artwork.year) : "Date unknown"),
  };
}

function artworkPayload(artwork) {
  const parsedYear = Number.parseInt(
    artwork.objectBeginDate || artwork.objectDate,
    10,
  );

  return {
    externalId: artwork.objectID,
    title: artwork.title || "Untitled",
    artist: artwork.artistDisplayName || "Unknown artist",
    year: Number.isNaN(parsedYear) ? undefined : parsedYear,
    objectDate: artwork.objectDate || "",
    museum: artwork.repository || "The Metropolitan Museum of Art",
    country: artwork.country || artwork.culture || "",
    imageUrl: artwork.primaryImageSmall || artwork.primaryImage || "",
    description: artwork.objectName || artwork.medium || "",
  };
}

export const mainApi = {
  register({ name, email, password }) {
    return request("/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },

  login({ email, password }) {
    return request("/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  getCurrentUser(token) {
    return request("/users/me", { headers: authHeaders(token) });
  },

  getSavedArtworks(token) {
    return request("/api/artworks", { headers: authHeaders(token) }).then(
      (items) => items.map(normalizeArtwork),
    );
  },

  saveArtwork(artwork, token) {
    return request("/api/artworks", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(artworkPayload(artwork)),
    }).then(normalizeArtwork);
  },

  deleteArtwork(id, token) {
    return request(`/api/artworks/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
  },
};
