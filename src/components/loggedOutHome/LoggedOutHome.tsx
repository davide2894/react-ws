import LoginButton from "@components/loginButton/LoginButton";
import Link from "next/link";
import React from "react";

function LoggedOutHome() {
  return (
    <>
      <div className="flex flex-col">
        <LoginButton />
        <Link
          className="bg-gray-300 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
          href="/leaderboard">
          Leaderboard
        </Link>
      </div>
    </>
  );
}

export default LoggedOutHome;
