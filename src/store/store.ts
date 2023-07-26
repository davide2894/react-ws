import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import quizReducer from "./features/quiz/quizSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
