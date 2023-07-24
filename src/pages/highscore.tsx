import BackButton from "@components/backButton/BackButton";
import HighScoreTable from "@components/highScoreTable/HighScoreTable";

function HighScore() {
  return (
    <div className="scoresPage highScoresPage">
      <BackButton />
      <h2>High Score Table</h2>
      <HighScoreTable />
    </div>
  );
}

export default HighScore;
