import { useState } from "react";
import styles from "./Choice.module.css";

function Choice(props: {
  choice: any;
  onChoiceSelected: (arg0: any) => void;
  freezeTimer: () => void;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const choice = props.choice;
  const isCorrectChoiceClass = choice.isCorrectChoice
    ? styles.isCorrectChoice
    : "";
  let isCorrectChoiceSelectedClass;
  if (isSelected) {
    isCorrectChoiceSelectedClass = choice.isCorrectChoice
      ? styles.correctChoiceSelected
      : styles.wrongChoiceSelected;
  } else {
    isCorrectChoiceSelectedClass = "";
  }

  function handleChoiceClick(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    evt.preventDefault();
    evt.stopPropagation();
    setIsSelected(true);
    props.freezeTimer();
    setTimeout(() => {
      props.onChoiceSelected(choice);
    }, 2000);
  }

  return (
    <li
      className={`${styles.choice} ${isCorrectChoiceClass} ${isCorrectChoiceSelectedClass}`}
      onClick={(evt) => handleChoiceClick(evt)}>
      {choice.name}
    </li>
  );
}

export default Choice;
