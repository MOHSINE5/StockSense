from __future__ import annotations

import chess
import chess.engine


class StockfishService:
    def __init__(self, path: str) -> None:
        self.path = path
        self.engine = chess.engine.SimpleEngine.popen_uci(path)

    def evaluate(self, board: chess.Board, perspective: chess.Color, time_limit: float = 0.08) -> float:
        info = self.engine.analyse(board, chess.engine.Limit(time=time_limit))
        score = info["score"].pov(perspective)
        cp = score.score(mate_score=100000)
        return cp / 100.0

    def close(self) -> None:
        if self.engine is not None:
            self.engine.quit()
