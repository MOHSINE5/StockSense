function badgeClass(classification) {
  switch (classification) {
    case "best":
      return "badge badge--best";
    case "inaccuracy":
      return "badge badge--inaccuracy";
    case "mistake":
      return "badge badge--mistake";
    case "blunder":
      return "badge badge--blunder";
    default:
      return "badge badge--inaccuracy";
  }
}

function formatEval(n) {
  if (n == null || Number.isNaN(n)) return "—";
  const v = Number(n);
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(2)}`;
}

function MoveList({ moves, selectedIndex, onSelectMove }) {
  if (!moves?.length) {
    return <p className="form-hint">No moves to show.</p>;
  }

  return (
    <section className="card card--tight" aria-labelledby="moves-heading">
      <h2 id="moves-heading" className="eval-card__title" style={{ marginBottom: "0.75rem" }}>
        Moves
      </h2>
      <p className="form-hint" style={{ marginTop: 0, marginBottom: "0.75rem" }}>
        Click a row to see the position <strong>after</strong> that move. “Eval after” is in pawns from the player who
        moved (positive = good for them).
      </p>
      <div className="move-table-wrap">
        <table className="move-table">
          <thead>
            <tr>
              <th className="num" scope="col">
                #
              </th>
              <th scope="col">Move</th>
              <th scope="col">Quality</th>
              <th scope="col">Eval before</th>
              <th scope="col">Eval after</th>
              <th scope="col">Lost</th>
            </tr>
          </thead>
          <tbody>
            {moves.map((move, index) => (
              <tr
                key={move.ply}
                className={selectedIndex === index ? "is-selected" : ""}
                role="button"
                onClick={() => onSelectMove(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectMove(index);
                  }
                }}
                tabIndex={0}
                aria-label={`Move ${move.ply}, ${move.san}, ${move.classification}`}
              >
                <td className="num">{move.ply}</td>
                <td>
                  <strong>{move.san}</strong>{" "}
                  <span className="mono meta-muted" style={{ fontSize: "0.8rem" }}>
                    {move.move}
                  </span>
                </td>
                <td>
                  <span className={badgeClass(move.classification)}>{move.classification}</span>
                </td>
                <td className="mono">{formatEval(move.evaluation_before)}</td>
                <td className="mono">{formatEval(move.evaluation_after)}</td>
                <td className="mono">{formatEval(move.drop)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="legend">
        <strong>Quality:</strong> Best — engine agrees. Inaccuracy / mistake / blunder — evaluation dropped after your
        move (bigger drop = worse).
      </div>
    </section>
  );
}

export default MoveList;
