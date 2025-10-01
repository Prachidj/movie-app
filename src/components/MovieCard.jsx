import React from "react";
import { getPosterUrl } from "../utils/api";

export default function MovieCard({ movie, onAdd, onRemove, isInWatchlist = false }) {
  const poster = getPosterUrl(movie.poster_path);
  return (
    <div className="movie-card">
      {poster ? (
        <img src={poster} alt={movie.title} className="poster" />
      ) : (
        <div className="poster placeholder">No Image</div>
      )}

      <div className="card-body">
        <h3 className="title">{movie.title}</h3>
        <p className="meta">⭐ {movie.vote_average} • {movie.release_date?.slice(0,4)}</p>

        <div className="card-actions">
          {!isInWatchlist ? (
            <button onClick={() => onAdd(movie)} className="btn">+ Add</button>
          ) : (
            <button onClick={() => onRemove(movie)} className="btn btn-danger">Remove</button>
          )}
        </div>
      </div>
    </div>
  );
}
