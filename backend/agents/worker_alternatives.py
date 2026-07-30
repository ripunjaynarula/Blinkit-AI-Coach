from typing import List, Dict, Any

class Worker5AlternativeFinder:
    """
    Worker 5: Alternative Finder (Deterministic)
    Identifies top 2 category rival products to compare against the selected product.
    Output: Structured alternative products list with key spec differences.
    """

    def process(self, current_product: Dict[str, Any], all_category_products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        # Filter out current product
        candidates = [p for p in all_category_products if p["id"] != current_product["id"]]
        
        if not candidates:
            return []

        # Sort by relevance / similarity (e.g. price proximity or rating)
        current_price = current_product.get("price", 0)
        
        # Sort candidates by price difference relative to current product
        candidates.sort(key=lambda x: abs(x.get("price", 0) - current_price))

        selected = candidates[:2]
        alternatives = []

        for alt in selected:
            # Determine comparative trade-offs
            price_diff = alt["price"] - current_price
            price_str = f"₹{abs(price_diff)} cheaper" if price_diff < 0 else f"₹{price_diff} higher" if price_diff > 0 else "Same price"

            alternatives.append({
                "id": alt["id"],
                "name": alt["name"],
                "brand": alt["brand"],
                "price": alt["price"],
                "rating": alt["rating"],
                "price_comparison": price_str,
                "beginner_score": alt.get("beginner_friendliness", {}).get("score", 7.0),
                "key_distinction": f"{alt['brand']} alternative focusing on {alt.get('tags', ['quality'])[0]}"
            })

        return alternatives
