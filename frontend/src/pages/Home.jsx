import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="page-title">Chess analysis, step by step</h1>
      <p className="page-lead">
        Load any game as PGN and see how each move changed the evaluation. Built for clarity — no chess account required.
      </p>

      <ol className="hero-steps">
        <li className="hero-step">
          <strong>Step 1</strong>
          Paste your game or open a <code>.pgn</code> file.
        </li>
        <li className="hero-step">
          <strong>Step 2</strong>
          Stockfish reviews every move on your machine.
        </li>
        <li className="hero-step">
          <strong>Step 3</strong>
          Click moves in the list to replay the board.
        </li>
      </ol>

      <div className="hero-cta">
        <Link to="/upload" className="btn btn--primary">
          Analyze a game
        </Link>
      </div>
    </div>
  );
}

export default Home;
