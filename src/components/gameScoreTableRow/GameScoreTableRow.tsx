function GameScoreTableRow(props: { score: any; position: number }) {
  const { score, position } = props;
  return (
    <tr>
      <td>{position}</td>
      {Object.keys(score).map((objKey, idx) => {
        return <td key={`${idx}-${score[objKey]}`}>{score[objKey]}</td>;
      })}
    </tr>
  );
}

export default GameScoreTableRow;
