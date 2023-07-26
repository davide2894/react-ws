import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import SubmitButton from "@components/submitButton/SubmitButton";
import { useRouter } from "next/router";
import { login } from "src/store/features/user/userSlice";
import styles from "./LoginForm.module.css";

function LoginForm(props: { onLoginFormSubmit: () => void }) {
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  function onFormSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    dispatch(login(userName));
    router.push("/quiz/lobby");
  }

  return (
    <form className={styles.loginForm} onSubmit={(evt) => onFormSubmit(evt)}>
      <div className="mb-4">
        <label htmlFor="nameInput" className={styles.loginLabel}>
          Login:
        </label>
        <input
          className={styles.nameInput}
          type="text"
          name="name"
          required
          id="nameInput"
          value={userName}
          onChange={(evt) => {
            setUserName(evt.target.value);
          }}
        />
      </div>
      <SubmitButton text="Login" />
    </form>
  );
}

export default LoginForm;
