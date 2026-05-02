import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm";
import { createAnalysis } from "../services/api";

function Upload() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(pgn) {
    setLoading(true);
    setError("");
    try {
      const { analysis_id: analysisId } = await createAnalysis(pgn);
      navigate(`/analysis/${analysisId}`);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to analyze PGN");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Upload PGN</h1>
      <UploadForm onSubmit={handleSubmit} loading={loading} />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </main>
  );
}

export default Upload;
