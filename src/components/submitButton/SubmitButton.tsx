import styles from "./SubmitButton.module.css";

function SubmitButton(props: { text: string }) {
  return (
    <button
      data-testid="submitButtonTestAttribute"
      className={styles.submitButton}
      type="submit"
      value="submit">
      {props.text}
    </button>
  );
}

export default SubmitButton;
