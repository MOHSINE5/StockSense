import { useState } from "react";

function UploadForm({ onSubmit, loading }) {
  const [pgn, setPgn] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(pgn);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <label htmlFor="pgn">Paste PGN</label>
      <textarea
        id="pgn"
        rows={14}
        value={pgn}
        onChange={(e) => setPgn(e.target.value)}
        placeholder={'[Event "Rated Blitz"] ...'}
      />
      <button type="submit" disabled={loading || !pgn.trim()}>
        {loading ? "Analyzing..." : "Analyze game"}
      </button>
    </form>
  );
}

export default UploadForm;
