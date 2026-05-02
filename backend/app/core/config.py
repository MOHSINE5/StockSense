import os


class Settings:
    def __init__(self) -> None:
        self.stockfish_path = os.getenv("STOCKFISH_PATH", "../stockfish/stockfish")
        self.cors_origins = [
            origin.strip()
            for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
            if origin.strip()
        ]


settings = Settings()
