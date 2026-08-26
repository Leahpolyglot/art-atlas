export const MET_API_BASE_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

export const MAIN_API_BASE_URL =
  import.meta.env.VITE_MAIN_API_URL || "https://art-atlas-api-backend.onrender.com";

export const RESULTS_PER_PAGE = 3;
export const MAX_ARTWORK_RESULTS = 6;
export const MAX_OBJECT_IDS_TO_CHECK = 8;
