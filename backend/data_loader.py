import json
import logging
from typing import List, Dict, Any, Optional
from backend.config import PRODUCTS_PATH, REVIEWS_PATH, PERSONAS_PATH, KNOWLEDGE_DIR

logger = logging.getLogger(__name__)

class DataLoader:
    def __init__(self):
        self.products: List[Dict[str, Any]] = []
        self.reviews: List[Dict[str, Any]] = []
        self.personas: List[Dict[str, Any]] = []
        self.knowledge: Dict[str, str] = {}
        self.load_all()

    def load_all(self):
        try:
            with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
                self.products = json.load(f)
            logger.info(f"Loaded {len(self.products)} products.")
        except Exception as e:
            logger.error(f"Error loading products: {e}")

        try:
            with open(REVIEWS_PATH, "r", encoding="utf-8") as f:
                self.reviews = json.load(f)
            logger.info(f"Loaded {len(self.reviews)} reviews.")
        except Exception as e:
            logger.error(f"Error loading reviews: {e}")

        try:
            with open(PERSONAS_PATH, "r", encoding="utf-8") as f:
                self.personas = json.load(f)
            logger.info(f"Loaded {len(self.personas)} personas.")
        except Exception as e:
            logger.error(f"Error loading personas: {e}")

        for cat in ["coffee", "protein", "skincare"]:
            kb_file = KNOWLEDGE_DIR / f"{cat}.md"
            if kb_file.exists():
                with open(kb_file, "r", encoding="utf-8") as f:
                    self.knowledge[cat] = f.read()

    def get_product(self, product_id: str) -> Optional[Dict[str, Any]]:
        return next((p for p in self.products if p["id"] == product_id), None)

    def get_products_by_category(self, category: str) -> List[Dict[str, Any]]:
        return [p for p in self.products if p["category"].lower() == category.lower()]

    def get_reviews_for_product(self, product_id: str) -> List[Dict[str, Any]]:
        return [r for r in self.reviews if r["product_id"] == product_id]

    def get_knowledge_for_category(self, category: str) -> str:
        cat_key = category.lower()
        if "protein" in cat_key:
            cat_key = "protein"
        elif "coffee" in cat_key:
            cat_key = "coffee"
        elif "skin" in cat_key:
            cat_key = "skincare"
        return self.knowledge.get(cat_key, "")

data_loader = DataLoader()
