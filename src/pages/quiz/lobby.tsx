import { useAppSelector } from "src/customHooks/useAppSelector";
import { useAppDispatch } from "src/customHooks/useAppDispatch";
import LogoutButton from "@components/logoutButton/LogoutButton";
import styles from "./lobby.module.css";
import { resetQuiz } from "src/store/features/quiz/quizSlice";
import { useEffect } from "react";
import Link from "next/link";
import useProtectRoute from "src/customHooks/useProtectRoute";
import { globalHighScoresString, personalScoresString } from "src/constants";

function Lobby() {
  useProtectRoute();
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const quizState = useAppSelector((state) => state.quizReducer);
  let content;

  useEffect(() => {
    dispatch(resetQuiz());
  }, [dispatch]);

  if (!user.isLogged) {
    content = "";
  } else {
    content = (
      <div className={styles.page}>
        <div className={styles.actions}>
          <LogoutButton shouldDisplayGameLossWarning={false} />
        </div>
        {!quizState.initialized && (
          <div className={styles.main}>
            <div className={styles.welcome}>
              <p></p>
              Wecome
              <span className={styles.userName}>{user.name}</span>!
              <p>This is the game lobby.</p>
              <p>Choose what to do :D </p>
            </div>
            <div className={styles.actions}>
              <Link className={styles.link} href="/highscore">
                {globalHighScoresString}
              </Link>
              <Link className={styles.link} href="/user">
                {personalScoresString}
              </Link>
              <Link className={styles.link} href="/quiz/game">
                Play a game
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
  return content;
}

export default Lobby;
