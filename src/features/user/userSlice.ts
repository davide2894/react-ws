import { createSlice } from "@reduxjs/toolkit";
import { User } from "@types";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    name: "",
    isLogged: false,
    personalGames: [],
  } as User,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.isLogged = true;
      state.personalGames = action.payload.personalGames;
    },
    logout: (state) => {
      state.name = "";
      state.isLogged = false;
      state.personalGames = [];
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
