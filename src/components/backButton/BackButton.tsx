import Link from "next/link";
import styles from "./BackButton.module.css";

function BackButton() {
  return (
    <Link href="/" className={styles.backButton}>
      Go back
    </Link>
  );
}

export default BackButton;
