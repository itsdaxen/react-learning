import { Box } from "./UI/Box";
import { LoadingIndicator } from "./UI/LoadingIndicator";
import { ErrorMessage } from "./UI/ErrorMessage";
import { MoviesList } from "./MoviesList";
import { useState, useEffect } from "react";
import { MovieDetails } from "./MovieDetails";
import { MoviesWatched } from "./MoviesWatched";
import { Feedback } from "./UI/Feedback";

export function MainArea({ movies, loading, apiInternalError, errorType }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watched, setWatched] = useState(() => {
    try {
      const raw = localStorage.getItem("watched");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  function selectedMovieCallback(movie) {
    setSelectedMovie(movie);
  }

  function backFromDetails() {
    setSelectedMovie(null);
  }

  function addToWatchedCallback(movie) {
    if (watched?.some((m) => m.imdbID === movie.imdbID)) {
      const newList = watched.filter((m) => m.imdbID !== movie.imdbID);
      setWatched([...newList, movie]);
    } else {
      setWatched((prevItems) => [...prevItems, movie]);
    }
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <main className="main">
      <Box selectedMovieCallback={selectedMovieCallback}>
        {loading ? (
          <LoadingIndicator />
        ) : errorType ? (
          <ErrorMessage errorType={errorType} />
        ) : apiInternalError ? (
          <Feedback>{apiInternalError}</Feedback>
        ) : movies.length > 0 ? (
          <MoviesList
            movies={movies}
            selectedMovieCallback={selectedMovieCallback}
          />
        ) : (
          <Feedback>No Result!</Feedback>
        )}
      </Box>

      <Box
        selectedMovie={selectedMovie}
        backFromDetails={backFromDetails}
        watched={watched}
        addToWatchedCallback={addToWatchedCallback}
        selectedMovieCallback={selectedMovieCallback}
      >
        {selectedMovie ? (
          <div>
            <MovieDetails
              selectedMovie={selectedMovie}
              backFromDetails={backFromDetails}
              addToWatchedCallback={addToWatchedCallback}
              watched={watched}
            />
          </div>
        ) : (
          <MoviesWatched
            watched={watched}
            selectedMovieCallback={selectedMovieCallback}
          />
        )}
      </Box>
    </main>
  );
}
