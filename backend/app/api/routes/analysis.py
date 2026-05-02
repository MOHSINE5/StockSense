from __future__ import annotations

from uuid import uuid4

from fastapi import APIRouter, HTTPException

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
            detail="Stockfish binary not found at STOCKFISH_PATH. Check the path and file permissions.",
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {exc}")


@router.get("/analysis/{analysis_id}", response_model=AnalysisResult)
def get_analysis(analysis_id: str) -> AnalysisResult:
    if analysis_id not in _analysis_store:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return _analysis_store[analysis_id]
