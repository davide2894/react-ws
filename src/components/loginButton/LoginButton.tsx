import LoginForm from "@components/loginForm/LoginForm";
import Modal from "@components/modal/Modal";
import React, { useState } from "react";
import styles from "./LoginButton.module.css";

function LoginButton() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div>
      <button
        className={styles.loginButton}
        onClick={() => setShowLoginModal(true)}>
        Login
      </button>
      {showLoginModal && (
        <Modal
          text="Log into the game"
          onClose={() => setShowLoginModal(false)}>
          <LoginForm onLoginFormSubmit={() => setShowLoginModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default LoginButton;
