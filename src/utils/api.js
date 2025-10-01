const BASE = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) console.warn("VITE_TMDB_API_KEY is not set in .env");

export async function fetchPopular(page = 1) {
  const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  return res.json();
}

export async function searchMovies(query, page = 1) {
  const res = await fetch(`${BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export function getPosterUrl(path, size = "w342") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}
