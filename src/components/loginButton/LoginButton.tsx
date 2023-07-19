import LoginForm from "@components/loginForm/LoginForm";
import Modal from "@components/modal/Modal";
import React, { useState } from "react";

function LoginButton() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div>
      <button
        className="bg-gray-300 hover:bg-green-700 w-16 h-16 text-black font-bold py-2 px-4 rounded"
        onClick={() => setShowLoginModal(true)}>
        Login
      </button>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm onLoginFormSubmit={() => setShowLoginModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default LoginButton;
