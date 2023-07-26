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

export interface QuestionType {
  trackId: number;
  trackName: string;
  trackSnippet: {
    id: number;
    body: string;
  };
  choices: [
    {
      id: number;
      name: string;
      isCorrectChoice: boolean;
    },
    {
      id: number;
      name: string;
      isCorrectChoice: boolean;
    },
    {
      id: number;
      name: string;
      isCorrectChoice: boolean;
    }
  ];
  isAnswered: boolean;
  isAnsweredCorrectly: boolean;
}
