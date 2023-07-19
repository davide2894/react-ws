import Link from "next/link";
import React from "react";

function BackButton() {
  return (
    <Link
      href="/"
      className="self-center bg-gray-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded">
      BackButton
    </Link>
  );
}

export default BackButton;
