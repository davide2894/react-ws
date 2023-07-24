import Modal from "@components/modal/Modal";
import { logout } from "src/features/user/userSlice";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import logoutStyles from "./Logout.module.css";

function LogoutButton(props: { shouldDisplayGameLossWarning: boolean }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleLogout(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    evt.preventDefault();
    dispatch(logout());
    router.push("/");
  }

  return (
    <div>
      <button onClick={() => setShowLogoutModal(true)}>Logout</button>
      {showLogoutModal && (
        <Modal text="Logout" onClose={() => setShowLogoutModal(false)}>
          <div className={logoutStyles.promptContainer}>
            <p className={logoutStyles.confirmationPrompt}>
              Are you sure you want to logout?
            </p>
            {props.shouldDisplayGameLossWarning ?? (
              <p className={logoutStyles.warning}>
                "All of your game progress will be lost"
              </p>
            )}
          </div>
          <div className={logoutStyles.actions}>
            <button
              className={logoutStyles.choice}
              onClick={(evt) => handleLogout(evt)}>
              Yes
            </button>
            <button
              className={logoutStyles.choice}
              onClick={() => setShowLogoutModal(false)}>
              No
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default LogoutButton;
