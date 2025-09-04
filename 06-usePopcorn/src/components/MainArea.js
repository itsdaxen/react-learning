import { Box } from "./Box";
import { LoadingIndicator } from "./LoadingIndicator";
import { ErrorMessage } from "./ErrorMessage";
import { MoviesList } from "./MoviesList";
import { useState } from "react";
import { MovieDetails } from "./MovieDetails";

export function MainArea({ movies, watched, loading, errorType }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const [selectedMovie, setSelectedMovie] = useState(null);

  function selectedMovieCallback(movie) {
    setSelectedMovie(movie);
  }

  function backFromDetails() {
    setSelectedMovie(null);
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

      <Box selectedMovie={selectedMovie} backFromDetails={backFromDetails}>
        {selectedMovie ? (
          <div>
            <MovieDetails
              selectedMovie={selectedMovie}
              backFromDetails={backFromDetails}
            />
          </div>
        ) : (
          <>
            <div className="summary">
              <h2>Movies you watched</h2>
              <div>
                <p>
                  <span>#️⃣</span>
                  <span>{watched.length} movies</span>
                </p>
                <p>
                  <span>⭐️</span>
                  <span>{avgImdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{avgUserRating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{avgRuntime} min</span>
                </p>
              </div>
            </div>

            <ul className="list">
              {watched.map((movie) => (
                <li key={movie.imdbID}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>⭐️</span>
                      <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>{movie.userRating}</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>{movie.runtime} min</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Box>
    </main>
  );
}
