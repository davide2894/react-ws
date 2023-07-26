import QuizEnd from "@components/quizEnd/QuizEnd";
import QuizInGameCard from "@components/quizInGameCard/QuizInGameCard";
import { useAppSelector } from "src/store/store";
import { prepareQuizQuestions } from "src/api/tracksApi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LogoutButton from "@components/logoutButton/LogoutButton";
import styles from "./game.module.css";
import { resetQuiz, startQuiz } from "src/store/features/quiz/quizSlice";
import { QuestionType } from "@types";
import useProtectRoute from "src/customHooks/useProtectRoute";

function Game(props: { questionsFetchedOnServerSide: QuestionType[] }) {
  useProtectRoute();
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const quizState = useAppSelector((state) => state.quizReducer);
  const isQuizEnd =
    quizState.questions?.length &&
    quizState.numberOfQuestionsAnswered === quizState.questions?.length;
  const currentQuestion = getCurrentQuestion();
  let content;

  useEffect(() => {
    dispatch(resetQuiz());
    dispatch(startQuiz({ questions: props.questionsFetchedOnServerSide }));
  }, [dispatch, props.questionsFetchedOnServerSide]);

  if (!user.isLogged) {
    content = "";
  } else if (!props.questionsFetchedOnServerSide) {
    content = (
      <div className={styles.quizEmptyResponse}>
        <p>
          There was an error while loading the quiz questions. Please reload the
          page and retry.
        </p>
        <button onClick={() => router.reload()}>Reload</button>
      </div>
    );
  } else if (currentQuestion) {
    content = <QuizInGameCard quiz={quizState} question={currentQuestion} />;
  } else if (isQuizEnd) {
    content = <QuizEnd />;
  }

  function getCurrentQuestion() {
    return quizState.questions?.find(
      (question: QuestionType) => !question.isAnswered
    );
  }

  return (
    <div className={styles.main}>
      <LogoutButton shouldDisplayGameLossWarning={true} />
      {content}
    </div>
  );
}

export default Game;

export const getServerSideProps = async () => {
  const questionsFetchedOnServerSide = await prepareQuizQuestions();
  return { props: { questionsFetchedOnServerSide } };
};
