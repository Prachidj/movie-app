import React from "react";
import MovieCard from "../components/MovieCard";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useLocalStorage("watchlist_v1", []);

  function removeFromWatchlist(movie) {
    setWatchlist(watchlist.filter(m => m.id !== movie.id));
  }

  return (
    <div className="page watchlist-page">
      <header className="hero">
        <h1>Your Watchlist ({watchlist.length})</h1>
      </header>

      <section className="grid">
        {watchlist.length === 0 ? (
          <div className="empty">Your watchlist is empty. Add movies from Home.</div>
        ) : (
          watchlist.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={true}
              onRemove={removeFromWatchlist}
            />
          ))
        )}
      </section>
    </div>
  );
}
