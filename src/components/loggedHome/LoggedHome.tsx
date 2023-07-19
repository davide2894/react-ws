import LogoutButton from "@components/logoutButton/LogoutButton";
import { useAppSelector } from "@store";
import Link from "next/link";
import React from "react";

function LoggedHome() {
  const user = useAppSelector((state) => state.userReducer);

  return (
    <>
      <LogoutButton />
      <div>LoggedHome</div>
      <div>{user.isLogged ? "logged" : "not logged"}</div>
      <div>{user.name}</div>
      <Link
        className="bg-gray-300 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
        href="/leaderboard">
        Leaderboard
      </Link>
      <Link
        className="bg-gray-300 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
        href="/user">
        Check your own best scores
      </Link>
      <Link
        className="bg-gray-300 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
        href="/quiz">
        Play Game!
      </Link>
    </>
  );
}

export default LoggedHome;
