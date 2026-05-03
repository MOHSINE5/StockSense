import { Chessboard } from "react-chessboard";

function ChessBoard({ fen, boardWidth }) {
  return (
    <div className="analysis-board-wrap" aria-label="Chess position">
      <Chessboard
        position={fen}
        boardWidth={boardWidth}
        arePiecesDraggable={false}
        boardOrientation="white"
        customBoardStyle={{
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        }}
      />
    </div>
  );
}

export default ChessBoard;
