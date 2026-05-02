from io import StringIO

import chess.pgn


class PgnParserService:
    @staticmethod
    def parse_game(pgn_text: str) -> chess.pgn.Game:
        game = chess.pgn.read_game(StringIO(pgn_text))
        if game is None:
            raise ValueError("Invalid PGN: no game found")
        return game
