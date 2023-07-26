import Link from "next/link";
import styles from "./BackButton.module.css";

function BackButton() {
  return (
    <Link href="/quiz/lobby" className={styles.backButton}>
      Back to game lobby
    </Link>
  );
}

export default BackButton;
