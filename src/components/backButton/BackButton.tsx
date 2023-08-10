import Link from "next/link";
import styles from "./BackButton.module.css";
import { useAppSelector } from "src/customHooks/useAppSelector";

function BackButton() {
  const user = useAppSelector((user) => user.userReducer);
  let targetUrl;
  let text;
  if (user.isLogged) {
    targetUrl = "/quiz/lobby";
    text = "Back to game lobby";
  } else {
    targetUrl = "/";
    text = "Back to homepage";
  }

  return (
    <Link href={targetUrl} className={styles.backButton}>
      {text}
    </Link>
  );
}

export default BackButton;
