import { Chess } from "chess.js";

/**
 * @param {{ san: string, move: string }[]} moves
 * @param {number} lastMoveIndex inclusive index into moves; -1 = start position
 */
export function fenAfterMoves(moves, lastMoveIndex) {
  const chess = new Chess();
  if (lastMoveIndex < 0 || !moves?.length) {
    return chess.fen();
  }
  const end = Math.min(lastMoveIndex, moves.length - 1);
  for (let i = 0; i <= end; i++) {
    const san = moves[i]?.san;
    const uci = moves[i]?.move;
    let ok = false;
    if (san) {
      try {
        const r = chess.move(san);
        ok = !!r;
      } catch {
        ok = false;
      }
    }
    if (!ok && uci && uci.length >= 4) {
      try {
        const r = chess.move({
          from: uci.slice(0, 2),
          to: uci.slice(2, 4),
          promotion: uci.length > 4 ? uci[4] : undefined,
        });
        ok = !!r;
      } catch {
        break;
      }
    }
    if (!ok) break;
  }
  return chess.fen();
}
