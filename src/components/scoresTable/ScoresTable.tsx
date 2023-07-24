import GameScoreTableRow from "@components/gameScoreTableRow/GameScoreTableRow";
import log from "@utils/log";
import React, { useEffect } from "react";
import { getUsersInLocalDb } from "src/data/localDatabase";

function ScoresTable() {
  useEffect(() => {
    const scores = getUsersInLocalDb().map((user) => {
      return {
        user: user.name,
        personalScores: user.personalScores,
      };
    });
    log({ scores });
  });

  return (
    <div className="scores">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Time</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {/* {props.playedGames.map((playedGame: any, idx: number) => {
            return (
              //TODO: change idx
              <GameScoreTableRow
                key={idx}
                playedGame={playedGame}
                position={idx}
              />
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
}

export default ScoresTable;
