from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from backend.data_loader import data_loader
from backend.agents.orchestrator import orchestrator

app = FastAPI(
    title="Blinkit AI Shopping Coach Backend API",
    description="Multi-Agent Reasoning Engine powering 'Buy with Confidence'",
    version="2.0.0"
)

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EvaluateRequest(BaseModel):
    product_id: str
    onboarding_answer: Optional[str] = "Beginner friendly"
    user_memory: Optional[List[Dict[str, Any]]] = []

class AddMemoryRequest(BaseModel):
    product_id: str
    product_name: str
    rating: str  # "loved", "okay", "avoid"
    tags: List[str]  # e.g., ["too bitter", "sweet", "bloating", "great taste"]

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Blinkit AI Shopping Coach ('Buy with Confidence')",
        "total_products": len(data_loader.products),
        "total_reviews": len(data_loader.reviews)
    }

@app.get("/api/categories")
def get_categories():
    return [
        {
            "id": "coffee",
            "name": "Coffee",
            "tagline": "Find your perfect roast & brew",
            "icon": "Coffee",
            "onboarding_choices": ["Beginner friendly", "Budget", "Best taste", "Instant prep"]
        },
        {
            "id": "protein",
            "name": "Protein Powder",
            "tagline": "Zero bloating, max recovery",
            "icon": "Dumbbell",
            "onboarding_choices": ["Beginner friendly", "Budget", "Easy digestion", "Muscle gain"]
        },
        {
            "id": "skincare",
            "name": "Skincare",
            "tagline": "Gentle barrier repair & acne control",
            "icon": "Sparkles",
            "onboarding_choices": ["Gentle skin", "Budget", "Acne control", "Fast results"]
        }
    ]

@app.get("/api/products")
def list_products(
    category: Optional[str] = None,
    search: Optional[str] = None
):
    items = data_loader.products
    if category:
        items = [p for p in items if p["category"].lower() == category.lower()]
    if search:
        q = search.lower()
        items = [p for p in items if q in p["name"].lower() or q in p["brand"].lower() or q in p["description"].lower()]
    return items

@app.get("/api/products/{product_id}")
def get_product_detail(product_id: str):
    product = data_loader.get_product(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    reviews = data_loader.get_reviews_for_product(product_id)
    return {
        "product": product,
        "reviews_sample": reviews[:5],
        "total_reviews": len(reviews)
    }

@app.post("/api/coach/evaluate")
def evaluate_product(req: EvaluateRequest):
    try:
        ui_response = orchestrator.evaluate_product(
            product_id=req.product_id,
            onboarding_answer=req.onboarding_answer or "Beginner friendly",
            user_memory=req.user_memory or []
        )
        return ui_response
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI pipeline evaluation error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
