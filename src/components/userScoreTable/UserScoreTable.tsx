import GameScoreTableRow from "@components/gameScoreTableRow/GameScoreTableRow";
import { UserTypeInLocalDb } from "@types";

function UserScoreTable(props: { user: UserTypeInLocalDb }) {
  return (
    <div className="scoresTable">
      <table>
        <thead>
          <tr>
            <th>Game Number</th>
            <th>When</th>
            <th>Time</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {props.user &&
            props.user.personalScores &&
            [...props.user.personalScores]
              .reverse()
              .map((personalScore, idx) => {
                return (
                  //TODO: change key value from idx to unique value
                  <GameScoreTableRow
                    key={idx}
                    position={props.user.personalScores.length - idx}
                    score={personalScore}
                  />
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default UserScoreTable;
