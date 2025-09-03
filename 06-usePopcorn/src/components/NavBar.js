import { useState, useEffect } from "react";

export function NavBar({
  fetchQueryMovies,
  loadingStateCallback,
  errortypeCallback,
}) {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  const apiKey = "6edd928";

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      try {
        loadingStateCallback(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        const results = Array.isArray(data?.Search) ? data.Search : [];
        setCount(results.length);
        fetchQueryMovies(results);
      } catch (err) {
        console.error("Error:", err);
        errortypeCallback(String(err));
        fetchQueryMovies([]);
        setCount(0);
      } finally {
        loadingStateCallback(false);
      }
    }
    fetchMovies();
  }, [query]);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{count}</strong> results
      </p>
    </nav>
  );
}
