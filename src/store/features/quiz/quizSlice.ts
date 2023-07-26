import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { QuizType } from "@types";
import log from "@utils/log";
import { WritableDraft } from "immer/dist/internal";
import { addLastPlayedQuizToLocalDb } from "src/data/localDatabase";

export const updateQuizWithAnsweredQuestionThunk = createAsyncThunk(
  "quizSlice/updateQuizWithAnsweredQuestionThunk",
  async (choiceSelectedPayLoad: any, thunkAPI: any) => {
    const quizState = thunkAPI.getState().quizReducer;
    thunkAPI.dispatch(updateQuizWithAnsweredQuestion(choiceSelectedPayLoad));

    return {
      quizState,
      userState: thunkAPI.getState().userReducer,
    };
  }
);

export const quizSlice = createSlice({
  name: "quizSlice",
  initialState: {
    initialized: false,
    questions: [],
    totalPoints: 0,
    numberOfQuestionsAnswered: 0,
    numberOfCorrectAnswers: 0,
    dateString: "",
    startDateInMilliseconds: 0,
    endDateInMilliseconds: 0,
    totalTime: "",
  } as QuizType,
  reducers: {
    startQuiz: (state, action) => {
      state.initialized = true;
      state.startDateInMilliseconds = new Date().getTime();
      state.questions = action.payload.questions;
    },
    updateQuizWithAnsweredQuestion: (state, action) => {
      const questionToUpdate = getQuestionToUpdate(
        state,
        action.payload.question
      );
      if (questionToUpdate) {
        questionToUpdate.isAnswered = true;
        questionToUpdate.isAnsweredCorrectly = action.payload?.choice
          ?.isCorrectChoice
          ? true
          : false;
      }
      state.numberOfQuestionsAnswered = state.numberOfQuestionsAnswered + 1;
      if (action.payload.choice?.isCorrectChoice) {
        state.numberOfCorrectAnswers = state.numberOfCorrectAnswers + 1;
        state.totalPoints = state.totalPoints + 10;
      }
    },
    resetQuiz: (state) => {
      state.initialized = false;
      state.questions = [];
      state.totalPoints = 0;
      state.numberOfQuestionsAnswered = 0;
      state.numberOfCorrectAnswers = 0;
      state.totalTime = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(
      updateQuizWithAnsweredQuestionThunk.fulfilled,
      (state, action) => {
        log({ stateAfterThunk: current(state) });
        if (state.numberOfQuestionsAnswered === state.questions.length) {
          addLastPlayedQuizToLocalDb(state, action.payload.userState.name);
        }
      }
    );
  },
});

function getQuestionToUpdate(
  state: WritableDraft<QuizType>,
  payloadQuestion: { trackId: number }
) {
  return state.questions.find(
    (question) => question.trackId === payloadQuestion.trackId
  );
}

export const { startQuiz, updateQuizWithAnsweredQuestion, resetQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
