import { useAppSelector } from "src/store/store";
import styles from "./Progress.module.css";

function Progress() {
  const quizState = useAppSelector((state) => state.quizReducer);
  return (
    <div className="progress">
      <span>You are on question </span>
      <span className={styles.numberOfQuestionsAnswered}>
        {quizState.numberOfQuestionsAnswered + 1}
      </span>
      <span> out of </span>
      <span className={styles.totalQuestions}>
        {quizState.questions.length}
      </span>
    </div>
  );
}

export default Progress;
