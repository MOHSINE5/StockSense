from __future__ import annotations

from uuid import uuid4

from fastapi import APIRouter, HTTPException, Path

from app.core.config import settings
from app.schemas.analysis import AnalysisResult, AnalyzeRequest, AnalyzeResponse
from app.services.analysis.analyzer import GameAnalyzer
from app.services.engine.stockfish import StockfishService
from app.services.pgn.parser import PgnParserService

router = APIRouter(prefix="", tags=["analysis"])
_analysis_store: dict[str, AnalysisResult] = {}


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_pgn(payload: AnalyzeRequest) -> AnalyzeResponse:
    try:
        if not settings.stockfish_path:
            raise HTTPException(
                status_code=503,
                detail="STOCKFISH_PATH is not set. Install Stockfish and set STOCKFISH_PATH to the engine binary.",
            )
        game = PgnParserService.parse_game(payload.pgn)
        analysis_id = str(uuid4())

        engine = StockfishService(settings.stockfish_path)
        try:
            analyzer = GameAnalyzer(engine)
            result = analyzer.analyze_game(analysis_id=analysis_id, game=game)
        finally:
            engine.close()

        _analysis_store[analysis_id] = result
        return AnalyzeResponse(analysis_id=analysis_id)
    except FileNotFoundError:
        raise HTTPException(
            status_code=500,
            detail=(
                f"Stockfish binary not found at {settings.stockfish_path!r}. "
                "Install from https://stockfishchess.org/download/ and set STOCKFISH_PATH in backend/.env "
                "(Windows: path must end with .exe, e.g. C:\\Tools\\stockfish\\stockfish-windows-x86-64-avx2.exe)."
            ),
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {exc}")


@router.get("/analysis/{analysis_id}", response_model=AnalysisResult)
def get_analysis(
    analysis_id: str = Path(
        ...,
        description="Exact `analysis_id` from the POST /analyze response (a UUID). Not a sequence number.",
        examples=["550e8400-e29b-41d4-a716-446655440000"],
    ),
) -> AnalysisResult:
    if analysis_id not in _analysis_store:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return _analysis_store[analysis_id]
