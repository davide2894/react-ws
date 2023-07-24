import { createSlice } from "@reduxjs/toolkit";
import { User } from "@types";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    name: "",
    isLogged: false,
    personalScores: [],
  } as User,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.isLogged = true;
      state.personalScores = action.payload.personalScores;
    },
    logout: (state) => {
      state.name = "";
      state.isLogged = false;
      state.personalScores = [];
    },
    updateUser: (state, action) => {
      state.personalScores = action.payload.personalScores;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
