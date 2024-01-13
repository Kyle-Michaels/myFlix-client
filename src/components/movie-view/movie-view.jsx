import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./movie-view.scss"

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
        <img className="w-100" src={movie.image} />
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
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
      <hr />
      <h2>Similar Movies</h2>
      <Row>
        {similarMovies.map((movie) => {
          return (
            <Col key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};