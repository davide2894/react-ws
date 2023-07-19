import React from "react";

function SubmitButton(props: { text: string }) {
  return (
    <button
      className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
      value="submit">
      {props.text}
    </button>
  );
}

export default SubmitButton;
