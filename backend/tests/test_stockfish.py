"""Smoke test: run with STOCKFISH_PATH set to your Stockfish binary."""

import os
import sys

import chess
import chess.engine


def main() -> None:
    path = (os.environ.get("STOCKFISH_PATH") or "").strip()
    if not path:
        print(
            "Set STOCKFISH_PATH to your Stockfish executable, e.g. "
            "STOCKFISH_PATH=C:\\Stockfish\\stockfish.exe",
            file=sys.stderr,
        )
        sys.exit(1)

    engine = chess.engine.SimpleEngine.popen_uci(path)
    try:
        board = chess.Board()
        result = engine.analyse(board, chess.engine.Limit(depth=10))
        print("Evaluation:", result["score"])
    finally:
        engine.quit()


if __name__ == "__main__":
    main()
