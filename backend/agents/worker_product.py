from typing import Dict, Any

class Worker3ProductIntelligence:
    """
    Worker 3: Product Intelligence
    Deterministic Worker (No LLM).
    Derives essential reasoning metrics from product metadata:
    - beginner_suitability
    - flavor_intensity
    - preparation_effort
    - learning_curve
    - risk_of_dissatisfaction
    - value_for_money
    - complexity_level
    """

    def process(self, product: Dict[str, Any]) -> Dict[str, Any]:
        category = product.get("category", "")
        price = product.get("price", 0)
        beg_score = product.get("beginner_friendliness", {}).get("score", 7.5)
        val_score = product.get("value_score", 7.0)
        prem_score = product.get("premium_score", 7.0)
        tags = [t.lower() for t in product.get("tags", [])]

        # Derive specs
        if category == "Coffee":
            prep_effort = "Instant (5 sec)" if "instant prep" in tags or "instant" in tags else "Medium (Requires Filter/Press)"
            flavor_intensity = "Bold & Intense" if "dark roast" in tags or "chicory blend" in tags else "Smooth & Medium"
            learning_curve = "None (Mix with milk/water)" if "instant" in tags else "Moderate (Brew ratio needed)"
            complexity = "Simple" if "instant" in tags else "Moderate"
        elif category == "Protein Powder":
            prep_effort = "Instant (10 sec Shaker)"
            flavor_intensity = "Rich & Sweet" if "chocolate" in product.get("name", "").lower() else "Mild / Natural"
            learning_curve = "Low (1 scoop post workout)"
            complexity = "Simple (Shake & Drink)"
        else: # Skincare
            prep_effort = "Instant (30 sec application)"
            flavor_intensity = "N/A (Topical)"
            learning_curve = "Moderate (Patch test & frequency)" if "exfoliant" in tags or "salicylic" in tags else "None (Daily Cleanser/Moisturizer)"
            complexity = "Moderate (Active Ingredient)" if "serum" in product.get("name", "").lower() else "Simple (Daily Staple)"

        # Calculate risk of dissatisfaction
        if beg_score >= 9.0:
            risk_of_dissatisfaction = "Very Low (Forgiving & widely loved)"
        elif beg_score >= 7.5:
            risk_of_dissatisfaction = "Low (Good for most users)"
        else:
            risk_of_dissatisfaction = "Moderate (Requires specific preference or equipment)"

        return {
            "product_id": product["id"],
            "name": product["name"],
            "brand": product["brand"],
            "category": category,
            "price": price,
            "beginner_suitability_score": beg_score,
            "beginner_reason": product.get("beginner_friendliness", {}).get("reason", ""),
            "derived_metrics": {
                "flavor_intensity": flavor_intensity,
                "preparation_effort": prep_effort,
                "learning_curve": learning_curve,
                "risk_of_dissatisfaction": risk_of_dissatisfaction,
                "value_for_money_score": val_score,
                "premium_score": prem_score,
                "complexity_level": complexity
            },
            "specifications": product.get("ingredients_specifications", {})
        }
