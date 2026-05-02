function MoveList({ moves }) {
  return (
    <section>
      <h3>Move List</h3>
      <ol>
        {moves.map((move) => (
          <li key={move.ply}>
            {move.ply}. {move.san} ({move.classification}, {move.evaluation_after})
          </li>
        ))}
      </ol>
    </section>
  );
}

export default MoveList;
