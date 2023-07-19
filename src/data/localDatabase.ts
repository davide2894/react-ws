import { User, UserTypeInLocalDb } from "@types";

const usersKeyInLocalDb = "musixmatch/who-sings/localDb/users";

export function insertNewUserInLocalDb(user: UserTypeInLocalDb) {
  if (!userExistsInLocalDb(user.name)) {
    updateUserInLocalDb(user);
  }
}

export function userExistsInLocalDb(userName: string) {
  if (!localDbExists()) {
    return null;
  }

  return getUserInLocalDbByName(userName);
}

export function getUsersInLocalDb(): Array<UserTypeInLocalDb> {
  const usersInLocalDb = localStorage.getItem(usersKeyInLocalDb);
  return usersInLocalDb ? JSON.parse(usersInLocalDb) : [];
}

export function updateUserInLocalDb(updatedUser: UserTypeInLocalDb) {
  const users = getUsersInLocalDb();
  users.push(updatedUser);
  localStorage.setItem(usersKeyInLocalDb, JSON.stringify(users));
}

export function getUserInLocalDbByName(name: string) {
  const users = getUsersInLocalDb();
  return users.find((user) => user.name === name);
}

function localDbExists() {
  return localStorage.getItem("musixmatch/who-sings/localDb/users");
}

function removeUserFromLocalDb(userName: string) {
  // code here
}

function deleteUserInLocalDb(user: any) {
  // code
}

const DB = {
  users: [
    {
      name: "Davide",
      isLogged: "false",
      personalGames: [
        {
          score: 100,
          date: "3 nov 2022",
          time: "1m 30s",
        },
        {
          score: 200,
          date: "19 july 20223",
          time: "1m 2s",
        },
      ],
    },
  ],
};
