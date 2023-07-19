export interface UserTypeInLocalDb {
  name: string;
  personalGames: Array<PersonalGame>;
}

export interface User extends UserTypeInLocalDb {
  isLogged: boolean;
}

export interface PersonalGame {}
