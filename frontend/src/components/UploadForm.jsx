import { useRef, useState } from "react";

function UploadForm({ onSubmit, loading }) {
  const [pgn, setPgn] = useState("");
  const fileRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(pgn);
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setPgn(text);
    };
    reader.readAsText(file, "UTF-8");
    event.target.value = "";
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="file-row">
        <label className="btn btn--secondary" style={{ cursor: "pointer" }}>
          <span>Open .pgn file</span>
          <input
            ref={fileRef}
            type="file"
            accept=".pgn,.txt,text/plain"
            className="sr-only"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>
        <span className="form-hint" style={{ margin: 0 }}>
          Or paste text below — headers optional.
        </span>
      </div>

      <label className="form-label" htmlFor="pgn">
        Game notation (PGN)
      </label>
      <p className="form-hint">
        Copy a game from Chess.com, Lichess, or any app that exports PGN. You can paste several lines; the whole game
        should stay in this box.
      </p>
      <textarea
        id="pgn"
        className="textarea-field"
        rows={16}
        value={pgn}
        onChange={(e) => setPgn(e.target.value)}
        placeholder={`[Event "Friendly"]\n[Site "?"]\n[Date "2026.05.03"]\n[White "You"]\n[Black "Opponent"]\n\n1. e4 e5 2. Nf3 Nc6 *`}
        disabled={loading}
        spellCheck={false}
        autoComplete="off"
      />

      <button type="submit" className="btn btn--primary btn--block" disabled={loading || !pgn.trim()}>
        {loading ? "Running engine…" : "Analyze with Stockfish"}
      </button>
    </form>
  );
}

export default UploadForm;
