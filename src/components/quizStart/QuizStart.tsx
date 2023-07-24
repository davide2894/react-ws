import { useDispatch } from "react-redux";
import {
  resetQuiz,
  startQuiz,
  startQuizThunk,
} from "src/features/quiz/quizSlice";
import styles from "./QuizStart.module.css";
import { useState } from "react";
import { prepareQuizQuestions } from "src/api/tracksApi";
import { useEffect } from "react";
import log from "@utils/log";
import { AppDispatch } from "@store";
import Link from "next/link";

function QuizStart(props: { questions: any }) {
  const dispatch = useDispatch<AppDispatch>();

  function handleQuizStart() {
    dispatch(resetQuiz());
    dispatch(startQuizThunk(""));
  }

  return (
    <div className={styles.quizStart}>
      <h2>Press the Start button whenever you are ready.</h2>
      <button onClick={handleQuizStart}>
        Start a new game by fetching on client side
      </button>
      <Link href="/quiz/play">Start a new game by fetching on server side</Link>
    </div>
  );
}

export default QuizStart;
