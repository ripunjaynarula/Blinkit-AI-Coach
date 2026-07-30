from typing import Dict, Any, List

class Worker2UserUnderstanding:
    """
    Worker 2: User Understanding & Memory
    Combines Intent + User Interaction State + Persistent Past Feedback Memory
    Output: Comprehensive User Behavioral & Preference Profile
    """

    def process(self, intent_data: Dict[str, Any], user_memory: List[Dict[str, Any]]) -> Dict[str, Any]:
        # Analyze past feedback memories
        positive_tags = []
        negative_tags = []
        avoided_ingredients = []

        for item in user_memory:
            rating = item.get("rating", "")  # "loved", "okay", "avoid"
            tags = item.get("tags", [])
            product_name = item.get("product_name", "")

            if rating == "loved":
                positive_tags.extend(tags)
            elif rating == "avoid":
                negative_tags.extend(tags)
                if "bitter" in tags or "too bitter" in tags:
                    avoided_ingredients.append("dark roast / heavy bitterness")
                if "bloating" in tags or "stomach" in tags:
                    avoided_ingredients.append("lactose / WPC concentrate")
                if "breakout" in tags or "purging" in tags:
                    avoided_ingredients.append("high fragrance / harsh actives")

        experience_level = "Beginner" if intent_data.get("is_first_time", True) else "Intermediate"
        if len(user_memory) >= 3:
            experience_level = "Intermediate / Informed"

        return {
            "experience_level": experience_level,
            "risk_tolerance": intent_data.get("risk_tolerance", "low"),
            "primary_priority": intent_data.get("priority", "ease_and_forgiveness"),
            "memory_summary": {
                "items_rated": len(user_memory),
                "positive_preferences": list(set(positive_tags)),
                "negative_dislikes": list(set(negative_tags)),
                "avoided_ingredients": list(set(avoided_ingredients))
            },
            "shopping_style": "Value Seeker" if "cost" in intent_data.get("intent_code", "") else "Quality & Safety First"
        }
