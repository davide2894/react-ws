import { useState } from "react";
import styles from "./Choice.module.css";

function Choice(props: {
  choice: any;
  onChoiceSelected: (arg0: any) => void;
  freezeTimer: () => void;
  disableChoices: () => void;
  isChoiceDisabled: boolean;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const isCorrectChoiceClass = props.choice.isCorrectChoice
    ? "isCorrectChoice"
    : "";
  let isCorrectChoiceSelectedClass;
  let isChoiceDisabledClass;

  if (isSelected) {
    isCorrectChoiceSelectedClass = props.choice.isCorrectChoice
      ? styles.correctChoiceSelected
      : styles.wrongChoiceSelected;
  } else {
    isCorrectChoiceSelectedClass = "";
  }

  if (props.isChoiceDisabled) {
    isChoiceDisabledClass = styles.choiceDisabled;
  } else {
    isChoiceDisabledClass = "";
  }

  function handleChoiceClick(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    evt.preventDefault();
    evt.stopPropagation();
    setIsSelected(true);
    props.freezeTimer();
    props.disableChoices();
    setTimeout(() => {
      props.onChoiceSelected(props.choice);
    }, 2000);
  }

  return (
    <li
      className={`${styles.choice} ${isCorrectChoiceClass} ${isCorrectChoiceSelectedClass} ${isChoiceDisabledClass}`}
      onClick={(evt) => handleChoiceClick(evt)}>
      {props.choice.name}
    </li>
  );
}

export default Choice;
