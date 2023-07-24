import GameScoreTableRow from "@components/gameScoreTableRow/GameScoreTableRow";
import { Score } from "@types";
import React, { useEffect, useState } from "react";
import { getAllHighScores } from "src/data/localDatabase";

function HighScoreTable() {
  const [highScores, setHighScores] = useState<any>([]);

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
            <th>Total Time</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {highScores.sort(compareFn).map((highScore: any, idx: number) => {
            return (
              //TODO: change key value from idx to unique value
              <GameScoreTableRow
                key={idx}
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
