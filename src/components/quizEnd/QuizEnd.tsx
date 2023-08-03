import Score from "@components/points/Points";
import Link from "next/link";
import { resetQuiz } from "src/store/features/quiz/quizSlice";
import { useAppSelector } from "src/customHooks/useAppSelector";
import { useAppDispatch } from "src/customHooks/useAppDispatch";
import { useRouter } from "next/router";
import styles from "./QuizEnd.module.css";
import { globalHighScoresString, personalScoresString } from "src/constants";

function QuizEnd() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const quizState = useAppSelector((state) => state.quizReducer);

  function handleQuizEnd() {
    dispatch(resetQuiz());
    router.reload();
  }

  return (
    <div>
      <div className={styles.recapStats}>
        <p>Game end :/</p>
        <Score />
        <p className={styles.numberOfCorrectAnswers}>
          You answered correctly to{" "}
          <span>{quizState.numberOfCorrectAnswers}</span> questions out of{" "}
          {quizState.questions.length}
        </p>
      </div>
      <div className={styles.quizEndActions}>
        <Link className={styles.quizEndLink} href="/highscore">
          {globalHighScoresString}
        </Link>
        <Link className={styles.quizEndLink} href="/user">
          {personalScoresString}
        </Link>
        <button className={styles.quizRestartButton} onClick={handleQuizEnd}>
          Play again
        </button>
      </div>
    </div>
  );
}

export default QuizEnd;
