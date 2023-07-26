import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Store, configureStore } from "@reduxjs/toolkit";
import type { AnyAction, PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "../store/features/user/userSlice";
import quizReducer from "../store/features/quiz/quizSlice";
import { RootState } from "src/store/store";
import { QuizType, User } from "@types";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: Store;
}
//sources:
// - https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react-redux/#-how-to-perform-testing-with-the-react-redux-toolkit
// - https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      userReducer: {
        name: "",
        isLogged: false,
        personalScores: [],
      } as User,
      quizReducer: {
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
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        userReducer: userReducer,
        quizReducer: quizReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
