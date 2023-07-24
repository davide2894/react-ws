import { useDispatch } from "react-redux";
import { resetQuiz, startQuiz } from "src/features/quiz/quizSlice";
import styles from "./QuizStart.module.css";

function QuizStart(props: { questions: any }) {
  const dispatch = useDispatch();

  function handleQuizStart() {
    // dispatch(resetQuiz());
    dispatch(startQuiz({ questions: props.questions }));
  }

  return (
    <div className={styles.quizStart}>
      <h2>Press the Start button whenever you are ready.</h2>
      <button onClick={handleQuizStart}>Start</button>
    </div>
  );
}

export default QuizStart;
