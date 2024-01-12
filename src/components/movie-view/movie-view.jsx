import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movie, movies, onBackClick }) => {
  let similarMovies = movies.filter((movies) => {
    if (movie.genreName === movies.genreName) {
      if (movie.title === movies.title) {
        return false;
      }
      return true;
    }

  });

  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genreName}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
      <hr />
      <h2>Similar Movies</h2>
      {similarMovies.map((movie) => {
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};