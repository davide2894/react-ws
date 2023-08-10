import { Score, HighScore, QuizType, User, UserTypeInLocalDb } from "@types";
import log from "@utils/log";
import {
  calculatElapsedMilliseconds,
  convertMillisecondsToSeconds,
} from "@utils/time";

const usersKeyInLocalDb = "musixmatch/who-sings/localDb/users";

export function insertNewUserInLocalDb(user: UserTypeInLocalDb) {
  const users = getUsersInLocalDb();
  users.push(user);
  localStorage.setItem(usersKeyInLocalDb, JSON.stringify(users));
}

export function userExistsInLocalDb(userName: string) {
  if (!localDbExists()) {
    return null;
  }

  return getUserInLocalDbByName(userName);
}

export function getUsersInLocalDb(): Array<UserTypeInLocalDb | any> {
  const usersInLocalDb = localStorage.getItem(usersKeyInLocalDb);
  return usersInLocalDb ? JSON.parse(usersInLocalDb) : [];
}

export function updateUserInLocalDb(updatedUser: UserTypeInLocalDb) {
  let users = getUsersInLocalDb();
  if (!users.length) {
    users.push(updatedUser);
  } else {
    users = users.map((user) => {
      if (user.name === updatedUser.name) {
        user = updatedUser;
        return user;
      } else {
        return user;
      }
    });
  }
  localStorage.setItem(usersKeyInLocalDb, JSON.stringify(users));
}

export function getUserInLocalDbByName(name: string) {
  const users = getUsersInLocalDb();
  return users.find((user) => user.name === name);
}

export function addLastPlayedQuizToLocalDb(quiz: QuizType, userName: string) {
  let userInLocalDb = getUserInLocalDbByName(userName);

  if (userInLocalDb) {
    const currentDate = new Date();
    userInLocalDb.personalScores.push({
      dateString: currentDate.toDateString(),
      time: calculateGameTime(
        quiz.startDateInMilliseconds,
        currentDate.getTime()
      ),
      points: quiz.totalPoints,
      id: crypto.randomUUID(),
    }) as Score;
    updateUserInLocalDb(userInLocalDb);
  }
}

export function getUserGameScores(userName: string) {
  let userInLocalDb = getUserInLocalDbByName(userName);
  return userInLocalDb?.personalScores || [];
}

export function getAllHighScores() {
  const users = getUsersInLocalDb();
  const allHighScores: Array<HighScore> = [];
  users.forEach((user) => {
    allHighScores.push(getUserHighScore(user));
  });
  log({ allHighScores });
  return allHighScores;
}

function calculateGameTime(
  startGameDateInMilliseconds: number,
  endGameDateInMilliseconds: number
) {
  const elapsedGameMilliseconds = calculatElapsedMilliseconds(
    startGameDateInMilliseconds,
    endGameDateInMilliseconds
  );

  return Math.floor(convertMillisecondsToSeconds(elapsedGameMilliseconds));
}

function getUserHighScore(user: User): HighScore {
  const highScore = {
    name: user.name,
    runs: 0,
    time: 0,
    points: 0,
    dateString: "",
    id: "",
  };
  if (user && user.personalScores && user.personalScores.length) {
    user.personalScores.forEach((game) => {
      highScore.runs++;
      highScore.time += game.time;
      highScore.points += game.points;
      highScore.id += game.id;
    });
  }
  return highScore;
}

function localDbExists() {
  return localStorage.getItem("musixmatch/who-sings/localDb/users");
}
