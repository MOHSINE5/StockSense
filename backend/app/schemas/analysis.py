from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    pgn: str = Field(
        ...,
        min_length=10,
        description=(
            "PGN text. In JSON the value must be one string: use \\n for line breaks, "
            "or a single line. Raw newlines inside the JSON quotes are invalid."
        ),
        examples=[
            '[Event "Demo"]\n\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 *'
        ],
    )


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
