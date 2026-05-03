import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link to="/" className="app-logo">
            Analetico
          </Link>
          <nav className="app-nav" aria-label="Main">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/upload" className="nav-link">
              Analyze game
            </Link>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        Engine analysis runs on your computer via Stockfish. Paste or open a PGN file, then step through moves below the
        board.
      </footer>
    </div>
  );
}

export default Layout;
