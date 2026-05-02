import os
from pathlib import Path

from dotenv import load_dotenv

_backend_dir = Path(__file__).resolve().parents[2]
load_dotenv(_backend_dir / ".env")


class Settings:
    def __init__(self) -> None:
        _path = (os.getenv("STOCKFISH_PATH") or "").strip()
        self.stockfish_path: str | None = _path or None
        self.cors_origins = [
            origin.strip()
            for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
            if origin.strip()
        ]


settings = Settings()
