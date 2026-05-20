from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pathlib import Path

from routes.analytics import router as analytics_router
from services.metrics import compute_all_metrics

app = FastAPI(title="Bank Retention Analytics API")

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dataset once on startup — support both backend/ and root directories
CSV_PATH = Path(__file__).parent / "European_Bank.csv"
ALT_CSV_PATH = Path(__file__).parent.parent / "European_Bank.csv"

@app.on_event("startup")
def load_data():
    path = CSV_PATH
    if not path.exists() and ALT_CSV_PATH.exists():
        path = ALT_CSV_PATH
    df = pd.read_csv(path)
    app.state.df = df
    app.state.metrics = compute_all_metrics(df)

app.include_router(analytics_router, prefix="/api")
