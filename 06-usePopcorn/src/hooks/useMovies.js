import { useState, useEffect } from "react";

export function useMovies({
  query,
  loadingStateCallback,
  fetchQueryMovies,
  apiInternalErrorCallback,
  errortypeCallback,
}) {
  const [count, setCount] = useState(0);

  const apiKey = process.env.REACT_APP_OMDB_KEY;

  useEffect(() => {
    if (!query) return;
    const trimmed = (query || "").trim();
    if (trimmed.length < 3) {
      apiInternalErrorCallback("");
      errortypeCallback("");
      fetchQueryMovies([]);
      setCount(0);
      return;
    }

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        loadingStateCallback(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
            trimmed
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
  }, [
    query,
    apiInternalErrorCallback,
    apiKey,
    errortypeCallback,
    fetchQueryMovies,
    loadingStateCallback,
  ]);

  return count;
}
