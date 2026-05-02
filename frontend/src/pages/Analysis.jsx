import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChessBoard from "../components/ChessBoard";
import EvalBar from "../components/EvalBar";
import MoveList from "../components/MoveList";
import { getAnalysis } from "../services/api";

function Analysis() {
  const { analysisId } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getAnalysis(analysisId);
        setResult(data);
      } catch (err) {
        setError(err?.response?.data?.detail || "Could not load analysis");
      }
    }
    load();
  }, [analysisId]);

  if (error) {
    return (
      <main style={{ padding: "2rem" }}>
        <p style={{ color: "crimson" }}>{error}</p>
        <Link to="/upload">Back to upload</Link>
      </main>
    );
  }

  if (!result) {
    return <main style={{ padding: "2rem" }}>Loading analysis...</main>;
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Analysis</h1>
      <p>Analysis ID: {result.analysis_id}</p>
      <EvalBar accuracy={result.accuracy} />
      <ChessBoard currentMove={result.moves[0]?.san} />
      <MoveList moves={result.moves} />
    </main>
  );
}

export default Analysis;
