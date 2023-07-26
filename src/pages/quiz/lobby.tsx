import { useAppSelector } from "src/store/store";
import LogoutButton from "@components/logoutButton/LogoutButton";
import styles from "./lobby.module.css";
import { useDispatch } from "react-redux";
import { resetQuiz } from "src/store/features/quiz/quizSlice";
import { useEffect } from "react";
import Link from "next/link";
import useProtectRoute from "src/customHooks/useProtectRoute";

function Lobby() {
  useProtectRoute();
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useDispatch();
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
              <p>Choose what to do :)</p>
            </div>
            <div className={styles.actions}>
              <Link className={styles.link} href="/highscore">
                Global high scores
              </Link>
              <Link className={styles.link} href="/user">
                Personal scores
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
