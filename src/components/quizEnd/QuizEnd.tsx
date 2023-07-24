import Progress from "@components/progress/Progress";
import Score from "@components/points/Points";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetQuiz } from "src/features/quiz/quizSlice";
import { useAppSelector } from "@store";
import { useRouter } from "next/router";
import styles from "./QuizEnd.module.css";

function QuizEnd() {
  const dispatch = useDispatch();
  const router = useRouter();
  const quizState = useAppSelector((state) => state.quizReducer);

  function handleQuizEnd() {
    router.push("quiz", { query: "replay" });
    // TODO: test and see if you still need it --> dispatch(resetQuiz());
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
          Global high scores
        </Link>
        <Link className={styles.quizEndLink} href="/user">
          Personal scores
        </Link>
        <button className={styles.quizRestartButton} onClick={handleQuizEnd}>
          Play again
        </button>
      </div>
    </div>
  );
}

export default QuizEnd;
