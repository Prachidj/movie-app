import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";

export default function App() {
  return (
    <div className="app-root">
      <nav className="nav">
        <Link to="/" className="logo">🎬 Movie Library</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </main>

      <footer className="footer">
        Built with TMDB API • Local watchlist (localStorage)
      </footer>
    </div>
  );
}
