import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

export async function createAnalysis(pgn) {
  const response = await api.post("/analyze", { pgn });
  return response.data;
}

export async function getAnalysis(analysisId) {
  const response = await api.get(`/analysis/${analysisId}`);
  return response.data;
}
