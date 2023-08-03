import GameScoreTableRow from "@components/gameScoreTableRow/GameScoreTableRow";
import { UserTypeInLocalDb } from "@types";
import log from "@utils/log";

function UserScoreTable(props: { user: UserTypeInLocalDb }) {
  return (
    <div className="scoresTable">
      <table>
        <thead>
          <tr>
            <th>Game Number</th>
            <th>When</th>
            <th>Time in seconds</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {props.user &&
            props.user.personalScores &&
            [...props.user.personalScores]
              .reverse()
              .map((personalScore, idx) => {
                log({ key: personalScore.id });
                return (
                  <GameScoreTableRow
                    key={personalScore.id}
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
