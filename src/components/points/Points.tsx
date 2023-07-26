import { useAppSelector } from "src/store/store";
import styles from "./Points.module.css";
function Points() {
  const points = useAppSelector((state) => state.quizReducer.totalPoints);
  return (
    <div data-testid="pointsTestAttribute" className={styles.points}>
      Points: {points}
    </div>
  );
}

export default Points;
