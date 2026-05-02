import chess
import chess.engine

engine = chess.engine.SimpleEngine.popen_uci(
    "stockfish/stockfish-windows-x86-64-avx2.exe"
)

board = chess.Board()

result = engine.analyse(board, chess.engine.Limit(depth=10))

print("Evaluation:", result["score"])

engine.quit()