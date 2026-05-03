import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChessBoard from "../components/ChessBoard";
import EvalBar from "../components/EvalBar";
import MoveList from "../components/MoveList";
import { getAnalysis } from "../services/api";
import { fenAfterMoves } from "../utils/chessFen";
import { formatApiError } from "../utils/formatApiError";

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function useBoardWidth() {
  const [width, setWidth] = useState(340);
  useEffect(() => {
    function update() {
      const max = 400;
      const min = 260;
      const gutter = 56;
      setWidth(Math.min(max, Math.max(min, window.innerWidth - gutter)));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

function Analysis() {
  const { analysisId } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [selectedMoveIndex, setSelectedMoveIndex] = useState(-1);
  const boardWidth = useBoardWidth();

  useEffect(() => {
    async function load() {
      try {
        const data = await getAnalysis(analysisId);
        setResult(data);
        if (data.moves?.length) {
          setSelectedMoveIndex(data.moves.length - 1);
        }
      } catch (err) {
        setError(formatApiError(err));
      }
    }
    load();
  }, [analysisId]);

  const fen = useMemo(() => {
    if (!result) return null;
    if (!result.moves?.length) return START_FEN;
    return fenAfterMoves(result.moves, selectedMoveIndex);
  }, [result, selectedMoveIndex]);

  const currentMove = result?.moves?.[selectedMoveIndex];
  const lastIndex = result?.moves?.length ? result.moves.length - 1 : -1;

  function goStart() {
    setSelectedMoveIndex(-1);
  }
  function goPrev() {
    setSelectedMoveIndex((i) => Math.max(-1, i - 1));
  }
  function goNext() {
    setSelectedMoveIndex((i) => Math.min(lastIndex, i + 1));
  }
  function goEnd() {
    setSelectedMoveIndex(lastIndex);
  }

  if (error) {
    return (
      <div>
        <h1 className="page-title">Could not open analysis</h1>
        <div className="card">
          <p className="alert alert--error" style={{ margin: 0 }} role="alert">
            {error}
          </p>
          <p className="form-hint" style={{ marginTop: "1rem", marginBottom: 0 }}>
            If you restarted the server, run a new analysis from the upload page. Old links are cleared when the API
            restarts.
          </p>
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <Link to="/upload" className="btn btn--secondary">
            Analyze another game
          </Link>
        </p>
      </div>
    );
  }

  if (!result || fen == null) {
    return (
      <div className="loading-state" aria-live="polite">
        <div className="spinner" aria-hidden />
        <p style={{ margin: 0 }}>Loading your analysis…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="toolbar">
        <h1 className="page-title" style={{ margin: 0, flex: "1 1 auto" }}>
          Your game
        </h1>
        <Link to="/upload" className="btn btn--secondary">
          New game
        </Link>
      </div>
      <p className="meta-muted" style={{ margin: "0 0 1rem" }}>
        Reference id: {result.analysis_id}
      </p>

      <EvalBar accuracy={result.accuracy} />

      <div className="analysis-grid">
        <div>
          <ChessBoard fen={fen} boardWidth={boardWidth} />
          <p className="board-caption">
            {selectedMoveIndex < 0
              ? "Starting position."
              : currentMove
                ? `After ${currentMove.san} (move ${currentMove.ply}).`
                : "Select a move in the table."}
          </p>
          {result.moves?.length ? (
            <div className="file-row" style={{ justifyContent: "center", marginTop: "0.25rem" }}>
              <button type="button" className="btn btn--secondary" onClick={goStart} disabled={selectedMoveIndex < 0}>
                Start
              </button>
              <button type="button" className="btn btn--secondary" onClick={goPrev} disabled={selectedMoveIndex < 0}>
                Previous
              </button>
              <button type="button" className="btn btn--secondary" onClick={goNext} disabled={selectedMoveIndex >= lastIndex}>
                Next
              </button>
              <button type="button" className="btn btn--secondary" onClick={goEnd} disabled={selectedMoveIndex >= lastIndex}>
                End
              </button>
            </div>
          ) : null}
        </div>
        <MoveList moves={result.moves} selectedIndex={selectedMoveIndex} onSelectMove={setSelectedMoveIndex} />
      </div>
    </div>
  );
}

export default Analysis;
