import log from "@utils/log";
import {
  getUserInLocalDbByName,
  insertNewUserInLocalDb,
} from "src/data/localDatabase";

const userMiddleWare = (store: any) => (next: any) => (action: any) => {
  log("userMiddleware --> dispatching", action);
  log("userMiddleware --> store", store);
  log("userMiddleware --> next", next);
  log("userMiddleware --> action", action);

  if (action.type === "userSlice/login") {
    log(action.payload);
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

    log("userMiddleware --> next", next);
    log("userMiddleware --> action", action);
  }
  return next(action);
};

export default userMiddleWare;
