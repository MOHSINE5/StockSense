from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    pgn: str = Field(..., min_length=10)


class MoveAnalysis(BaseModel):
    ply: int
    move: str
    san: str
    evaluation_before: float
    evaluation_after: float
    drop: float
    classification: str


class AnalyzeResponse(BaseModel):
    analysis_id: str


class AnalysisResult(BaseModel):
    analysis_id: str
    accuracy: float
    moves: list[MoveAnalysis]
