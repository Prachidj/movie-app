import React, { useEffect, useState } from "react";
import { fetchPopular, searchMovies } from "../utils/api";
import MovieCard from "../components/MovieCard";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useLocalStorage("watchlist_v1", []);

  useEffect(() => {
    loadPopular();
  }, []);

  async function loadPopular() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPopular();
      setMovies(data.results || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) {
      loadPopular();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query);
      setMovies(data.results || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function addToWatchlist(movie) {
    if (watchlist.some(m => m.id === movie.id)) return;
    setWatchlist([movie, ...watchlist]);
  }

  function removeFromWatchlist(movie) {
    setWatchlist(watchlist.filter(m => m.id !== movie.id));
  }

  return (
    <div className="page home-page">
      <header className="hero">
        <h1>Popular Movies</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            placeholder="Search movies by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search movies"
          />
          <button type="submit" className="btn">Search</button>
          <button type="button" className="btn btn-ghost" onClick={() => { setQuery(""); loadPopular(); }}>Reset</button>
        </form>
      </header>

      {error && <div className="error">Error: {error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <section className="grid">
          {movies.length === 0 && <div>No movies found.</div>}
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAdd={addToWatchlist}
              onRemove={removeFromWatchlist}
              isInWatchlist={watchlist.some(m => m.id === movie.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
}
