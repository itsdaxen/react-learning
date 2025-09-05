import { useState, useEffect } from "react";
import { LoadingIndicator } from "./UI/LoadingIndicator";
import { StarRating } from "./UI/StarRating";
const apiKey = process.env.REACT_APP_OMDB_KEY;

export function MovieDetails({
  selectedMovie,
  backFromDetails,
  addToWatchedCallback,
  watched,
}) {
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [loadingMovieDetails, setLoadingMovieDetails] = useState(false);
  const isWatched = watched?.some((m) => m.imdbID === selectedMovie);
  const isRated = watched.filter(
    (m) => m.imdbID === selectedMovie && m.userRating
  );

  function handleStarRating(number) {
    if (!selectedMovieDetails) return;
    const withRating = { ...selectedMovieDetails, userRating: number };
    setSelectedMovieDetails(withRating);
    if (isWatched) addToWatchedCallback(withRating);
  }

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

  useEffect(() => {
    document.title = selectedMovieDetails?.Title
      ? "Movie | " + selectedMovieDetails.Title
      : "UsePopcorn";
    return () => (document.title = "UsePopcorn");
  }, [selectedMovieDetails]);

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
              alt={`Poster of ${selectedMovieDetails.Title} movie`}
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
              <button
                className="btn-add"
                onClick={() => addToWatchedCallback(selectedMovieDetails)}
              >
                {isWatched ? "Already in Watched" : "Add to Watched"}
              </button>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxLength={10}
                size={22}
                handleStarRating={handleStarRating}
                defaultRate={isRated.length > 0 ? isRated[0].userRating : 0}
              />
            </div>

            <p>
              <em>{selectedMovieDetails.Plot}</em>
            </p>
            <p>Starring {selectedMovieDetails.Actors}</p>
            <p>Directed by {selectedMovieDetails.Director}</p>
          </section>
        </>
      ) : (
        <p>Unknown issue</p>
      )}
    </div>
  );
}
