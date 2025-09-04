import { useState, useEffect } from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { StarRating } from "./StarRating";
const apiKey = process.env.REACT_APP_OMDB_KEY;

export function MovieDetails({ selectedMovie, backFromDetails }) {
  const [selectedMovieDetails, setSelectedMovieDetails] = useState("");
  const [loadingMovieDetails, setLoadingMovieDetails] = useState(false);

  useEffect(() => {
    async function fetchSelectedMovieDetails() {
      try {
        setLoadingMovieDetails(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedMovie}`
        );
        const data = await res.json();
        console.log(data);
        // TODO: validation logic
        const result = data;
        setSelectedMovieDetails(result);
      } catch (err) {
        console.error("Error:", err);
        // TODO: further error handling
      } finally {
        setLoadingMovieDetails(false);
      }
    }
    fetchSelectedMovieDetails();
  }, [selectedMovie]);
  return (
    <div className="details">
      {loadingMovieDetails ? (
        <LoadingIndicator />
      ) : selectedMovieDetails ? (
        <>
          <header>
            <button className="btn-back" onClick={backFromDetails}>
              &larr;
            </button>
            <img
              src={selectedMovieDetails.Poster}
              alt={`Poster of ${selectedMovieDetails.Movie} movie`}
            />
            <div className="details-overview">
              <h2>{selectedMovieDetails.Title}</h2>
              <p>
                {selectedMovieDetails.Released} &bull;{" "}
                {selectedMovieDetails.Runtime}
              </p>
              <p>{selectedMovieDetails.Genre}</p>
              <p>
                <span>⭐️</span>
                {selectedMovieDetails.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxLength={10} />
            </div>

            <p>
              <em>{selectedMovieDetails.Plot}</em>
            </p>
            <p>Starring {selectedMovieDetails.Actors}</p>
            <p>Directed by {selectedMovieDetails.Director}</p>
          </section>
        </>
      ) : (
        <p>Unkown issue</p>
      )}
    </div>
  );
}
