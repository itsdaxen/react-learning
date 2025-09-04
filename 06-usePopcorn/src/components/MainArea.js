import { Box } from "./UI/Box";
import { LoadingIndicator } from "./UI/LoadingIndicator";
import { ErrorMessage } from "./UI/ErrorMessage";
import { MoviesList } from "./MoviesList";
import { useState } from "react";
import { MovieDetails } from "./MovieDetails";
import { MoviesWatched } from "./MoviesWatched";

export function MainArea({ movies, loading, errorType }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watched, setWatched] = useState([]);

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

  return (
    <main className="main">
      <Box selectedMovieCallback={selectedMovieCallback}>
        {loading ? (
          <LoadingIndicator />
        ) : movies.length > 0 ? (
          <MoviesList
            movies={movies}
            selectedMovieCallback={selectedMovieCallback}
          />
        ) : errorType ? (
          <ErrorMessage errorType={errorType} />
        ) : (
          <p
            style={{
              fontSize: "2.4rem",
              fontWeight: 500,
              color: "#f8f9fa",
              textAlign: "center",
              margin: "6rem 0",
              letterSpacing: "0.05em",
            }}
          >
            No result!
          </p>
        )}
      </Box>

      <Box
        selectedMovie={selectedMovie}
        backFromDetails={backFromDetails}
        watched={watched}
        addToWatchedCallback={addToWatchedCallback}
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
          <MoviesWatched watched={watched} />
        )}
      </Box>
    </main>
  );
}
