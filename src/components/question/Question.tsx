import Choice from "@components/choice/Choice";
import Countdown from "@components/countdown/Countdown";
import { AppDispatch, useAppSelector } from "src/store/store";
import { QuizType } from "@types";
import log from "@utils/log";
import { useDispatch } from "react-redux";
import { getUserGameScores } from "src/data/localDatabase";
import { updateQuizWithAnsweredQuestionThunk } from "src/store/features/quiz/quizSlice";
import { updateUser } from "src/store/features/user/userSlice";
import styles from "./Question.module.css";
import { useEffect, useState } from "react";

function Question(props: { quiz: QuizType; question: any }) {
  const [countDownIsOn, setCountDownIsOn] = useState(true);
  const [isChoiceDisabled, setIsChoiceDisabled] = useState(false);
  const userState = useAppSelector((state) => state.userReducer);
  const dispatch = useDispatch<AppDispatch>();
  log("inside Question component");
  log({ propsSingleQuestion: props.question });
  const question = props.question;

  useEffect(() => {
    setCountDownIsOn(true);
    setIsChoiceDisabled(false);
  }, [question.trackId]);

  function handleTimerFreezing() {
    setCountDownIsOn(false);
  }

  function handleAnswer(choice?: any) {
    dispatch(updateQuizWithAnsweredQuestionThunk({ question, choice }))
      .unwrap()
      .then((args) => {
        const isQuizEnd =
          args.quizState.numberOfQuestionsAnswered ===
          args.quizState.questions.length;
        if (isQuizEnd) {
          dispatch(
            updateUser({ personalScores: getUserGameScores(userState.name) })
          );
        }
      });
  }

  function disableChoicesHandler() {
    setIsChoiceDisabled(true);
  }

  return (
    <>
      <div className={styles.question}>
        <div
          className={styles.snippet}>{`"${question.trackSnippet.body}"`}</div>
        <div>
          <ul className={styles.choiceList}>
            {question.choices.map((choice: any, idx: number) => {
              log({
                questionId: question.trackId,
                currentChoice: choice.id,
                idx: idx,
                key: props.question.trackId + choice.id + idx,
              });
              return (
                <Choice
                  key={props.question.trackId + choice.id + idx}
                  choice={choice}
                  onChoiceSelected={handleAnswer}
                  freezeTimer={handleTimerFreezing}
                  isChoiceDisabled={isChoiceDisabled}
                  disableChoices={disableChoicesHandler}
                />
              );
            })}
          </ul>
        </div>
        <Countdown
          key={question.trackId}
          secondsBeforeExpiration={10}
          onExpire={handleAnswer}
          isOn={countDownIsOn}
        />
      </div>
    </>
  );
}

export default Question;
