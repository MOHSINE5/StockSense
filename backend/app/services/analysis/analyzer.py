from __future__ import annotations

import chess

from app.schemas.analysis import AnalysisResult, MoveAnalysis
from app.services.engine.stockfish import StockfishService


class GameAnalyzer:
    def __init__(self, engine: StockfishService) -> None:
        self.engine = engine

    @staticmethod
    def _classify_drop(drop: float) -> str:
        if drop < 0.5:
            return "best"
        if drop < 1.2:
            return "inaccuracy"
        if drop < 2.5:
            return "mistake"
        return "blunder"

    @staticmethod
    def _move_accuracy(drop: float) -> float:
        return max(0.0, min(100.0, 100.0 - (drop * 22.0)))

    def analyze_game(self, analysis_id: str, game) -> AnalysisResult:
        board = game.board()
        moves: list[MoveAnalysis] = []
        move_accuracies: list[float] = []

        for ply, move in enumerate(game.mainline_moves(), start=1):
            mover: chess.Color = board.turn
            eval_before = self.engine.evaluate(board, perspective=mover)
            san = board.san(move)

            board.push(move)
            eval_after = self.engine.evaluate(board, perspective=mover)

            drop = max(0.0, eval_before - eval_after)
            classification = self._classify_drop(drop)

            moves.append(
                MoveAnalysis(
                    ply=ply,
                    move=move.uci(),
                    san=san,
                    evaluation_before=round(eval_before, 2),
                    evaluation_after=round(eval_after, 2),
                    drop=round(drop, 2),
                    classification=classification,
                )
            )
            move_accuracies.append(self._move_accuracy(drop))

        accuracy = round(sum(move_accuracies) / len(move_accuracies), 2) if move_accuracies else 0.0
        return AnalysisResult(analysis_id=analysis_id, accuracy=accuracy, moves=moves)
