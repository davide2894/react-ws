export interface UserTypeInLocalDb {
  name: string;
  personalScores: Array<Score>;
}

export interface User extends UserTypeInLocalDb {
  isLogged: boolean;
}
export interface Score {
  dateString: string;
  time: number;
  points: number;
  id: string | number;
}

export interface HighScore extends Score {
  name: string;
  runs: number;
}

export interface QuizType {
  initialized: boolean;
  questions: Array<QuestionType>;
  totalPoints: number;
  numberOfQuestionsAnswered: number;
  numberOfCorrectAnswers: number;
  dateString: string;
  startDateInMilliseconds: number;
  endDateInMilliseconds: number;
  totalTime: number | string;
}

export declare type QuestionType = {
  trackId: number;
  trackName: string;
  trackSnippet: Snippet;
  choices: Choice[];
  isAnswered: boolean;
  isAnsweredCorrectly: boolean;
};

export declare type Snippet = {
  id: number;
  body: string;
};

export declare type Choice = {
  id: number;
  name: string;
  isCorrectChoice: boolean;
};
