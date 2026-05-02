# Stockfish (not included in this repository)

This project uses **Stockfish as an external binary**. Do not commit the engine, source tree, or downloaded archives here.

## What to do

1. Install Stockfish on your machine: [https://stockfishchess.org/download/](https://stockfishchess.org/download/)
2. Point the backend at the executable by setting **`STOCKFISH_PATH`** in `backend/.env` (copy from `backend/.env.example`).

Examples:

- **Windows:** `STOCKFISH_PATH=C:\Path\To\stockfish.exe`
- **Linux / macOS:** `STOCKFISH_PATH=/usr/local/bin/stockfish`

Optional: you can keep a local copy of the binary in this folder for your own use; those files are ignored by git and will not appear on GitHub.
