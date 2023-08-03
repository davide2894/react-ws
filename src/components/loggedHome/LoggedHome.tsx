import LogoutButton from "@components/logoutButton/LogoutButton";
import { useAppSelector } from "src/customHooks/useAppSelector";
import Link from "next/link";
import styles from "./LoggedHome.module.css";

function LoggedHome() {
  const user = useAppSelector((state) => state.userReducer);

  return (
    <div className={styles.loggedHomeContainer}>
      <div className={styles.welcome}>
        Wecome
        <span className={styles.userName}>{user.name}</span>
      </div>
      <div className={styles.actions}>
        <LogoutButton shouldDisplayGameLossWarning={false} />
        <Link className={styles.link} href="/highscore">
          Global high scores
        </Link>
        <Link className={styles.link} href="/user">
          Personal scores
        </Link>
        <Link className={styles.link} href="/quiz">
          Play
        </Link>
      </div>
    </div>
  );
}

export default LoggedHome;
