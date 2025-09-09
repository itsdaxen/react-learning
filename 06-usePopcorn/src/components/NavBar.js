import { useState, useEffect, useRef } from "react";
import { useMovies } from "../hooks/useMovies";
import { useKey } from "../hooks/useKey";

export function NavBar({
  fetchQueryMovies,
  loadingStateCallback,
  apiInternalErrorCallback,
  errortypeCallback,
}) {
  const [query, setQuery] = useState("");

  const count = useMovies({
    query,
    loadingStateCallback,
    fetchQueryMovies,
    apiInternalErrorCallback,
    errortypeCallback,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useKey("Enter", () => inputRef.current.focus());

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
        ref={inputRef}
      />
      <p className="num-results">
        Found <strong>{count}</strong> results
      </p>
    </nav>
  );
}
