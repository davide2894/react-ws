import LoginButton from "@components/loginButton/LoginButton";
import Link from "next/link";
import { globalHighScoresString } from "src/constants";
import styles from "./LoggedOut.module.css";

function LoggedOutHome() {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <p>Welcome dear visitor, you find yourself in a music quiz game.</p>
        <p>Try your best!</p>
        <p>
          Log in and play a game or check the high scores so far to get an idea
          of who your competing with!
        </p>
      </div>
      <div className={styles.actions}>
        <LoginButton />
        <Link className={styles.link} href="/highscore">
          {globalHighScoresString}
        </Link>
      </div>
    </div>
  );
}

export default LoggedOutHome;
