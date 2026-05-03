import os
from pathlib import Path

from dotenv import load_dotenv

_backend_dir = Path(__file__).resolve().parents[2]
load_dotenv(_backend_dir / ".env")


def _resolved_stockfish_path(raw: str) -> str | None:
    text = raw.strip()
    if not text:
        return None
    path = Path(text)
    if not path.is_absolute():
        path = (_backend_dir / path).resolve()
    return str(path)


class Settings:
    def __init__(self) -> None:
        self.stockfish_path = _resolved_stockfish_path(os.getenv("STOCKFISH_PATH") or "")
        self.cors_origins = [
            origin.strip()
            for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
            if origin.strip()
        ]


settings = Settings()
