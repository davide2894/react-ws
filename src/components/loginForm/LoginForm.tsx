import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@store";
import { login } from "@userSlice";
import SubmitButton from "@components/submitButton/SubmitButton";
import { useRouter } from "next/router";

function LoginForm(props: { onLoginFormSubmit: () => void }) {
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  function onFormSubmit(evt: SyntheticEvent) {
    evt.preventDefault();

    dispatch(login(userName));

    if (props.onLoginFormSubmit) {
      props.onLoginFormSubmit();
      router.push("/");
    }
  }

  const inputCssClasses =
    "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black";

  return (
    <form
      className="shadow-md rounded pt-6 pb-8 mb-4"
      onSubmit={(evt) => onFormSubmit(evt)}>
      <div className="mb-4">
        <label htmlFor="nameInput" className="block mb-2">
          Name:
          <input
            className={inputCssClasses}
            type="text"
            name="name"
            required
            id="nameInput"
            value={userName}
            onChange={(evt) => {
              setUserName(evt.target.value);
            }}
          />
        </label>
      </div>
      <SubmitButton text="Login" />
    </form>
  );
}

export default LoginForm;
