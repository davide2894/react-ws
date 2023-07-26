import log from "@utils/log";
import {
  getUserInLocalDbByName,
  insertNewUserInLocalDb,
} from "src/data/localDatabase";

const userMiddleWare = (store: any) => (next: any) => (action: any) => {
  log("middleware --> dispatching", action);
  log("middleware --> store", store);
  log("middleware --> next", next);
  log("middleware --> action", action);

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

    log("middleware --> next", next);
    log("middleware --> action", action);
  }
  return next(action);
};

export default userMiddleWare;
