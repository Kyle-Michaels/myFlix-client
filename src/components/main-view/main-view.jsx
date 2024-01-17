import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  // Connect to api
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://my-flix-4e112dcd3c89.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImagePath,
            genreName: movie.Genre.Name,
            director: movie.Director.Name,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  // Add to favorites
  const favorite = (id) => {
    fetch(`https://my-flix-4e112dcd3c89.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (response.ok) {
        console.log(response);
        alert("Added to favorites!");
      } else {
        alert("Failed to favorite movie!");
      }
    }).then((data) => {
      console.log(data);
      console.log(JSON.stringify(data));
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  // Delete favorites
  const unfavorite = (id) => {
    fetch(`https://my-flix-4e112dcd3c89.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (response.ok) {
        alert("Removed from favorites!");
        window.location.reload();
      } else {
        alert("Failed to unfavorite movie!");
      }
    }).then((data) => {
      console.log(data);
      console.log(JSON.stringify(data));
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user && token ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user && token ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user || !token ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView
                      user={user}
                      setUser={setUser}
                      token={token}
                      setToken={setToken}
                      movies={movies}
                      favorite={favorite}
                      unfavorite={unfavorite}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user || !token ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user || !token ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          favorite={favorite}
                          unfavorite={unfavorite}
                          isFav={user.FavoriteMovies.includes(movie.id)}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};