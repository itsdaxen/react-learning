import { useState, useEffect, useRef } from "react";
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
  const isRated = watched.find(
    (m) => m.imdbID === selectedMovie && m.userRating && m.clickLog
  );

  const logClickCounts = useRef(isRated ? isRated.clickLog : 0);

  function handleStarRating(number) {
    if (!selectedMovieDetails) return;
    logClickCounts.current++;
    console.log(
      `StarRating: Star has been clicked ${logClickCounts.current} times for ${selectedMovieDetails.Title}.`
    );
    const withRating = {
      ...selectedMovieDetails,
      userRating: number,
      clickLog: logClickCounts.current,
    };
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
        const result = data;
        setSelectedMovieDetails(result);
      } catch (err) {
        console.error("Error:", err);
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

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        backFromDetails();
      }
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [backFromDetails]);

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
                defaultRate={isRated ? isRated.userRating : 0}
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
