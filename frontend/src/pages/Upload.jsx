import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm";
import { createAnalysis } from "../services/api";
import { formatApiError } from "../utils/formatApiError";

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
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="page-title">Analyze a game</h1>
      <p className="page-lead">
        The engine needs a few seconds per game. Keep this tab open until results appear.
      </p>

      <div className="card">
        <UploadForm onSubmit={handleSubmit} loading={loading} />
        {error ? (
          <div className="alert alert--error" role="alert">
            {error}
          </div>
        ) : null}
      </div>

      <p className="form-hint" style={{ marginTop: "1.25rem" }}>
        <Link to="/">← Back to home</Link>
      </p>
    </div>
  );
}

export default Upload;
