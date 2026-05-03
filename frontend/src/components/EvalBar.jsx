function EvalBar({ accuracy }) {
  const pct = Math.max(0, Math.min(100, Number(accuracy) || 0));

  return (
    <section className="card card--tight" aria-labelledby="accuracy-heading">
      <div className="eval-card__label">
        <h2 id="accuracy-heading" className="eval-card__title">
          Game accuracy
        </h2>
        <span className="eval-card__value">{pct.toFixed(1)}%</span>
      </div>
      <div className="eval-bar-track" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
        <div className="eval-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="eval-card__help">
        Average from every move you played: small drops in evaluation lower this score. It is a quick guide, not a
        perfect grade.
      </p>
    </section>
  );
}

export default EvalBar;
