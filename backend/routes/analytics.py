from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok", "message": "Bank Retention Analytics API is running"}

@router.get("/kpis")
def get_kpis(request: Request):
    return request.app.state.metrics["kpis"]

@router.get("/engagement")
def get_engagement(request: Request):
    return request.app.state.metrics["engagement"]

@router.get("/products")
def get_products(request: Request):
    return request.app.state.metrics["products"]

@router.get("/geography")
def get_geography(request: Request):
    return request.app.state.metrics["geography"]

@router.get("/rsi")
def get_rsi(request: Request):
    return request.app.state.metrics["rsi"]

@router.get("/pipeline")
def get_pipeline(request: Request):
    return request.app.state.metrics["pipeline"]

@router.get("/all")
def get_all_metrics(request: Request):
    return request.app.state.metrics
