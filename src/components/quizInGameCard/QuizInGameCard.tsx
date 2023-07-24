import Progress from "@components/progress/Progress";
import Question from "@components/question/Question";
import Points from "@components/points/Points";
import { QuestionType, QuizType } from "@types";
import styles from "./QuizInGameCard.module.css";

function QuizInGameCard(props: { quiz: QuizType; question: QuestionType }) {
  return (
    <div className={styles.quizInGameCard}>
      <div className="quiz_tracking flex justify-around mt-4 mb-4">
        <Points />
        <Progress />
      </div>
      <Question quiz={props.quiz} question={props.question}></Question>
    </div>
  );
}

export default QuizInGameCard;
