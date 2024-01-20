import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload
    }
  }
});