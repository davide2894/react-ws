import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import quizReducer from "./features/quiz/quizSlice";
import userMiddleWare from "./middleware/userMiddleware";

export const store = configureStore({
  reducer: {
    userReducer,
    quizReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userMiddleWare);
  },
});

// Source: https://redux-toolkit.js.org/tutorials/typescript#project-setup
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
