import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import quizReducer from "./features/quiz/quizSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import log from "@utils/log";
import {
  getUserInLocalDbByName,
  insertNewUserInLocalDb,
  updateUserInLocalDb,
} from "./data/localDatabase";
import { prepareQuizQuestions } from "./api/tracksApi";

const userMiddleWare = (store: any) => (next: any) => (action: any) => {
  // log("middleware --> dispatching", action);
  // log("middleware --> store", store);
  // log("middleware --> next", next);
  // log("middleware --> action", action);

  if (action.type === "userSlice/login") {
    // log(action.payload);
    const userInLocalDb = getUserInLocalDbByName(action.payload);
    const nameFromDispatchedLoginAction = action.payload;
    action.payload = {
      name: nameFromDispatchedLoginAction,
    };

    if (userInLocalDb) {
      action.payload.personalScores = userInLocalDb.personalScores;
    } else {
      insertNewUserInLocalDb({
        name: nameFromDispatchedLoginAction,
        personalScores: [],
      });
      action.payload.personalScores = [];
    }

    // log("middleware --> next", next);
    // log("middleware --> action", action);
  }
  return next(action);
};

const quizMiddleWare = (store: any) => (next: any) => (action: any) => {
  if (action.type === "quizSlice/startQuiz") {
    log("quizMiddleWare");
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    userReducer,
    quizReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userMiddleWare).concat(quizMiddleWare);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
