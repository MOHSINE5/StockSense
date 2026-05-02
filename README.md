# Chess Game Analysis App

Monorepo web application for chess game analysis using FastAPI, React, and Stockfish engine.

The app allows users to upload PGN files and receive move-by-move analysis with evaluation feedback.

## 🧠 Tech Stack

- Backend: FastAPI (Python)
- Frontend: React (Vite)
- Engine: Stockfish (external binary, not included in repo)

## 📡 Backend API

**POST /analyze**

Accepts PGN text and returns an analysis ID.

**GET /analysis/{id}**

Returns move-by-move analysis and evaluation results.

**GET /health**

Checks API status.

## 🎮 Frontend Features

- Upload PGN text
- Request engine analysis
- View move-by-move breakdown
- Display basic accuracy / evaluation

## 🚀 Quick Start (Local Setup)

### Backend

Install [Stockfish](https://stockfishchess.org/download/) on your system. The repo does not include the engine binary.

```bash
cd backend
pip install -r requirements.txt
```

Copy `backend/.env.example` to `backend/.env` (on Windows: `copy .env.example .env` in that folder).

Edit `backend/.env` and set `STOCKFISH_PATH` to your installed binary, for example:

- Linux / macOS: `STOCKFISH_PATH=/usr/local/bin/stockfish`
- Windows: `STOCKFISH_PATH=C:\Stockfish\stockfish.exe`

```bash
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## ⚙️ Notes

- Stockfish binary is not included in this repository (see [`stockfish/README.md`](stockfish/README.md))
- You must install Stockfish locally and set `STOCKFISH_PATH` (see `backend/.env.example`)
- Backend and frontend run independently during development

### Docker

The backend image does not bundle Stockfish. Set `STOCKFISH_PATH` when running Compose (for example in a `docker/.env` file or your shell) to the path **inside the container** where the binary is available. Typical pattern: bind-mount your host binary read-only and point `STOCKFISH_PATH` at that path, e.g. mount `C:\path\to\stockfish.exe` to `/usr/local/bin/stockfish` and set `STOCKFISH_PATH=/usr/local/bin/stockfish`.
