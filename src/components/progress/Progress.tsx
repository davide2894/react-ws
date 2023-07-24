import { useAppSelector } from "@store";
import styles from "./Progress.module.css";

function Progress() {
  const quizState = useAppSelector((state) => state.quizReducer);
  return (
    <div className="progress">
      <span className={styles.numberOfQuestionsAnswered}>
        {quizState.numberOfQuestionsAnswered + 1}
      </span>
      <span> / </span>
      <span className={styles.totalQuestions}>
        {quizState.questions.length}
      </span>
    </div>
  );
}

export default Progress;
