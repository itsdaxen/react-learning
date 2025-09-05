import { useState, useEffect } from "react";

export function NavBar({
  fetchQueryMovies,
  loadingStateCallback,
  apiInternalErrorCallback,
  errortypeCallback,
}) {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  const apiKey = process.env.REACT_APP_OMDB_KEY;

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        loadingStateCallback(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
            query
          )}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        console.log(data);
        const error = data?.Error;
        const results = Array.isArray(data?.Search) ? data.Search : [];
        console.log(results);
        apiInternalErrorCallback(error ? error : "");
        setCount(results.length);
        fetchQueryMovies(results);
      } catch (err) {
        console.error("Error:", err);
        if (err.name === "AbortError") return;
        errortypeCallback(String(err));
        fetchQueryMovies([]);
        setCount(0);
      } finally {
        loadingStateCallback(false);
      }
    }
    fetchMovies();
    return () => controller.abort();
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
