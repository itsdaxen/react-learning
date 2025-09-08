import { useState, useCallback } from "react";

import { NavBar } from "./components/NavBar";
import { MainArea } from "./components/MainArea";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [loading, setLoading] = useState(false);
  const [apiInternalError, setApiInternalError] = useState("");
  const [errorType, setErrortype] = useState("");

  const fetchQueryMovies = useCallback((movies) => {
    setMovies(movies);
  }, []);

  const loadingStateCallback = useCallback((status) => {
    setLoading(status);
  }, []);

  const apiInternalErrorCallbac = useCallback((err) => {
    setApiInternalError(err);
  }, []);

  const errortypeCallback = useCallback((error) => {
    setErrortype(error);
  }, []);

  return (
    <>
      <NavBar
        movies={movies}
        fetchQueryMovies={fetchQueryMovies}
        loadingStateCallback={loadingStateCallback}
        apiInternalErrorCallback={apiInternalErrorCallbac}
        errortypeCallback={errortypeCallback}
      />
      <MainArea
        movies={movies}
        loading={loading}
        apiInternalError={apiInternalError}
        errorType={errorType}
      />
    </>
  );
}
