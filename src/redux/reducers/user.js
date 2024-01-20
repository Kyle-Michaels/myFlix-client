import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;