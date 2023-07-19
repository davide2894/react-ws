import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import log from "@utils/log";
import {
  getUserInLocalDbByName,
  insertNewUserInLocalDb,
  updateUserInLocalDb,
} from "./data/localDatabase";

const userMiddleWare = (store: any) => (next: any) => (action: any) => {
  log("middleware --> dispatching", action);
  log("middleware --> store", store);
  log("middleware --> next", next);
  log("middleware --> action", action);

  if (action.type === "userSlice/login") {
    log(action.payload);
    // find user in local db
    // if user exists -> user its own propertirs to update global state
    // if user does not exist -> create a new one in local db and use those
    // properties to set global state
    const userInLocalDb = getUserInLocalDbByName(action.payload.userName);
    const nameFromDispatchedLoginAction = action.payload;
    action.payload = {
      name: nameFromDispatchedLoginAction,
    };

    if (userInLocalDb) {
      action.payload.personalGames = userInLocalDb.personalGames;
    } else {
      insertNewUserInLocalDb({
        name: nameFromDispatchedLoginAction,
        personalGames: [],
      });
      action.payload.personalGames = [];
    }

    log("middleware --> next", next);
    log("middleware --> action", action);
    return next(action);
  }
};

export const store = configureStore({
  reducer: {
    userReducer,
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
