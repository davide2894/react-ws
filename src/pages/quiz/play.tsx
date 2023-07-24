import QuizEnd from "@components/quizEnd/QuizEnd";
import QuizInGameCard from "@components/quizInGameCard/QuizInGameCard";
import { useAppSelector } from "@store";
import { prepareQuizQuestions } from "src/api/tracksApi";
import styles from "./play.module.css";
import { useRouter } from "next/router";

function play(props: { questionsFetchedOnServerSide: any }) {
  const router = useRouter();
  const quizState = useAppSelector((state) => state.quizReducer);
  const isQuizEnd =
    quizState.numberOfQuestionsAnswered === quizState.questions?.length;
  const currentQuestion = getCurrentQuestion();
  let content;

  if (!props.questionsFetchedOnServerSide) {
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
    return quizState.questions?.find((question: any) => !question.isAnswered);
  }

  return <div>{content}</div>;
}

export default play;

export const getServerSideProps = async () => {
  const questionsFetchedOnServerSide = await prepareQuizQuestions();
  return { props: { questionsFetchedOnServerSide } };
};
