import BackButton from "@components/backButton/BackButton";
import { useAppSelector } from "@store";
import { prepareQuizQuestions } from "src/api/tracksApi";
import LogoutButton from "@components/logoutButton/LogoutButton";
import QuizStart from "@components/quizStart/QuizStart";
import QuizEnd from "@components/quizEnd/QuizEnd";
import QuizInGameCard from "@components/quizInGameCard/QuizInGameCard";
import styles from "./quiz.module.css";

function Quiz(props: { questionsFetchedOnServerSide: any }) {
  const quizState = useAppSelector((state) => state.quizReducer);
  const isQuizEnd =
    quizState.numberOfQuestionsAnswered === quizState.questions.length;
  const currentQuestion = getCurrentQuestion();
  let content;

  if (!props.questionsFetchedOnServerSide) {
    content = (
      <p className={styles.quizEmptyResponse}>
        There was an error while loading the quiz questions. Please reload the
        page and retry.
      </p>
    );
  } else if (!quizState.initialized) {
    content = <QuizStart questions={props.questionsFetchedOnServerSide} />;
  } else if (isQuizEnd) {
    content = <QuizEnd />;
  } else if (currentQuestion) {
    content = <QuizInGameCard quiz={quizState} question={currentQuestion} />;
  }

  function getCurrentQuestion() {
    return quizState.questions.find((question: any) => !question.isAnswered);
  }

  return (
    <div className={styles.page}>
      <div className={styles.actions}>
        <BackButton />
        <LogoutButton shouldDisplayGameLossWarning={true} />
      </div>
      <div className={styles.main}>{content}</div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const questionsFetchedOnServerSide = await prepareQuizQuestions();
  // const questions = prepareMockQuestions()
  return { props: { questionsFetchedOnServerSide } };
};

export default Quiz;
