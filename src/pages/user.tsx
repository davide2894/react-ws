import BackButton from "@components/backButton/BackButton";
import UserScoreTable from "@components/userScoreTable/UserScoreTable";
import { useAppSelector } from "src/store/store";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./user.module.css";
import { useDispatch } from "react-redux";
import { getUserGameScores } from "src/data/localDatabase";
import { updateUser } from "src/store/features/user/userSlice";
import useProtectRoute from "src/customHooks/useProtectRoute";

function User() {
  useProtectRoute();
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage) {
      dispatch(updateUser({ personalScores: getUserGameScores(user.name) }));
    }
  }, [dispatch, user.name]);

  let content;

  if (
    user &&
    user.isLogged &&
    user.personalScores &&
    user.personalScores.length
  ) {
    content = <UserScoreTable user={user} />;
  } else {
    content = (
      <div className={styles.personalScoresEmpty}>
        <p>
          You have not played any game yet. Play one to see your scores here
        </p>
        <Link href="quiz/game">Play a game!</Link>
      </div>
    );
  }

  return (
    <div className="scoresPage personalScoresPage">
      <BackButton />
      <h2>Personal scores of the last games</h2>
      {content}
    </div>
  );
}

export default User;
