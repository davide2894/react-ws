import GameScoreTableRow from "@components/gameScoreTableRow/GameScoreTableRow";
import { HighScore, Score } from "@types";
import log from "@utils/log";
import React, { useEffect, useState } from "react";
import { getAllHighScores } from "src/data/localDatabase";

function HighScoreTable() {
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    setHighScores(getAllHighScores());
  }, [setHighScores]);

  let content;

  function compareFn(a: Score, b: Score) {
    if (a.points === b.points) {
      return a.time - b.time;
    } else {
      return b.points - a.points;
    }
  }

  if (highScores && highScores.length) {
    content = (
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Runs</th>
            <th>Total Time (seconds) spent playing</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {highScores.sort(compareFn).map((highScore: any, idx: number) => {
            log({ key: highScore.id });
            return (
              <GameScoreTableRow
                key={highScore.id}
                position={idx + 1}
                score={highScore}
              />
            );
          })}
        </tbody>
      </table>
    );
  } else {
    content = <p>Play some game to see something here</p>;
  }

  return <div className="scoresTable">{content}</div>;
}

export default HighScoreTable;
