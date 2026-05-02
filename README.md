# Chess Game Analyzer

Monorepo for a chess game analysis web app using FastAPI, React, and Stockfish.

## Backend
- `POST /analyze` accepts PGN text and returns an `analysis_id`
- `GET /analysis/{id}` returns move-by-move analysis
- `GET /health` API health check

## Frontend
- Upload PGN text
- Request analysis
- View move list and basic accuracy output

## Quick Start (Local)
1. Backend
   - `cd backend`
   - `pip install -r requirements.txt`
   - `uvicorn app.main:app --reload`
2. Frontend
   - `cd frontend`
   - `npm install`
   - `npm run dev`

Set `STOCKFISH_PATH` in `backend/.env` to your local Stockfish binary.
