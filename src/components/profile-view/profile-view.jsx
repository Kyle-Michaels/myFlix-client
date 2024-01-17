import { useState, useEffect } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, favorite, unfavorite }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id))

  const handleUpdate = (event) => {
    event.preventDefault();
  }

  const handleDelete = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <h1>Profile</h1>
      <hr />
      <Row>
        <Col className="mb-4" md={8}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {user.Birthday}</Card.Text>
              <Card.Text>Fav: {user.FavoriteMovies}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Edit Profile</Card.Title>
              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row md={8}>
        <Col>
          <Card>
            <h1>Favorite movies</h1>
            <hr />
            {favoriteMovies.length === 0 ? (
              <Col>This list is empty!</Col>
            ) : (
              <Row>
                {favoriteMovies.map((movie) => (
                  <Col className="mb-4" key={movie.id} md={3}>
                    <MovieCard
                      movie={movie}
                      favorite={favorite}
                      unfavorite={unfavorite}
                      isFav={user.FavoriteMovies.includes(movie.id)}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}