import Modal from "@components/modal/Modal";
import { logout } from "src/store/features/user/userSlice";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch } from "src/customHooks/useAppDispatch";
import logoutStyles from "./Logout.module.css";

function LogoutButton(props: { shouldDisplayGameLossWarning: boolean }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleLogout(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    evt.preventDefault();
    dispatch(logout());
    router.push("/");
  }

  return (
    <>
      <button
        className={logoutStyles.logoutButton}
        onClick={() => setShowLogoutModal(true)}>
        Logout
      </button>
      {showLogoutModal && (
        <Modal text="Logout" onClose={() => setShowLogoutModal(false)}>
          <div className={logoutStyles.promptContainer}>
            <p className={logoutStyles.confirmationPrompt}>
              Are you sure you want to logout?
            </p>
            {props.shouldDisplayGameLossWarning && (
              <p className={logoutStyles.warning}>
                All of your game progress will be lost
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
    </>
  );
}

export default LogoutButton;
