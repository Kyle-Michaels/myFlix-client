import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { setUser } from "../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";


export const ToggleFavs = ({ movie }) => {
  const { user, token } = useSelector((state) => state.user);
  const isFav = user.FavoriteMovies.includes(movie.id);
  const dispatch = useDispatch();

  // Add to favorites
  const favorite = () => {
    fetch(`https://my-flix-4e112dcd3c89.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to favorite movie!");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setUser({ user: user, token: token }));
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  // Delete favorites
  const unfavorite = () => {
    fetch(`https://my-flix-4e112dcd3c89.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to unfavorite movie!");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setUser({ user: user, token: token }));
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  return (
    <>
      {isFav ? (
        <Button onClick={() => unfavorite(movie.id)}>💔</Button>
      ) : (
        <Button onClick={() => favorite(movie.id)}>❤️</Button>
      )}
    </>
  )
};