import Modal from "@components/modal/Modal";
import { logout } from "@userSlice";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function LogoutButton() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleLogout(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    evt.preventDefault();
    dispatch(logout());
    // setShowLogoutModal(false);
    router.reload();
  }

  return (
    <div>
      <button
        className="bg-gray-300 hover:bg-green-700 w-16 h-16 text-black font-bold py-2 px-4 rounded"
        onClick={() => setShowLogoutModal(true)}>
        Logout
      </button>
      {showLogoutModal && (
        <Modal onClose={() => setShowLogoutModal(false)}>
          Are you sure you want to logout?
          <button
            className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={(evt) => handleLogout(evt)}>
            Yes
          </button>
          <button
            className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setShowLogoutModal(false)}>
            No
          </button>
        </Modal>
      )}
    </div>
  );
}

export default LogoutButton;
