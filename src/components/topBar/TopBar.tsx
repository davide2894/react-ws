import styles from "./TopBar.module.css";

function TopBar() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Who sings?</h1>
    </div>
  );
}

export default TopBar;
