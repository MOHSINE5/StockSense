import { Link } from "react-router-dom";

function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Chess Game Analyzer</h1>
      <p>Upload a PGN and review move-by-move engine evaluations.</p>
      <Link to="/upload">Start analysis</Link>
    </main>
  );
}

export default Home;
