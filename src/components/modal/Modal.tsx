import { ReactNode, SyntheticEvent, useEffect } from "react";
import log from "@utils/log";
import styles from "./Modal.module.css";

function Modal(props: {
  text: string;
  onClose: () => void;
  children?: ReactNode;
  mode?: string;
}) {
  const { text, onClose, children } = props;

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        onClose();
        log("escape pressed");
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  function onCloseClick() {
    props.onClose();
  }

  function closeModalOnClickOutside(evt: SyntheticEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.currentTarget.classList.contains("modalOverlay") && props.onClose();
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={(evt) => closeModalOnClickOutside(evt)}>
      <div
        className={styles.modal}
        onClick={(evt) => {
          evt.stopPropagation();
        }}>
        <button className={styles.closeButton} onClick={onCloseClick}>
          <span>X</span>
        </button>
        <div>
          <h2 className={styles.modalH2}>{props.text}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
