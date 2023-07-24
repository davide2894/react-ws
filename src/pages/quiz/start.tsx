import log from "@utils/log";
import React from "react";
import { prepareQuizQuestions } from "src/api/tracksApi";

function start(props: { questionsFetchedOnServerSide: any }) {
  log({ questionsFetchedOnServerSide: props.questionsFetchedOnServerSide });
  return <div>start</div>;
}

export default start;

export const getServerSideProps = async () => {
  const questionsFetchedOnServerSide = await prepareQuizQuestions();
  return { props: { questionsFetchedOnServerSide } };
};
