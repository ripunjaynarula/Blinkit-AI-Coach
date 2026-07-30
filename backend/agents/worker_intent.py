from typing import Dict, Any

class Worker1IntentDetection:
    """
    Worker 1: Intent Detection
    Input: Category, Onboarding Answer / Guidance Choice
    Output: Structured Shopping Intent object
    """

    INTENT_MAPPING = {
        "beginner friendly": {"primary_goal": "beginner_safety", "risk_tolerance": "low", "priority": "ease_and_forgiveness"},
        "budget": {"primary_goal": "cost_efficiency", "risk_tolerance": "medium", "priority": "high_value_per_rupee"},
        "muscle gain": {"primary_goal": "high_protein_yield", "risk_tolerance": "medium", "priority": "protein_concentration"},
        "easy digestion": {"primary_goal": "stomach_comfort", "risk_tolerance": "low", "priority": "no_bloating_or_acidity"},
        "gentle skin": {"primary_goal": "barrier_protection", "risk_tolerance": "low", "priority": "no_stinging_or_redness"},
        "best taste": {"primary_goal": "palatability", "risk_tolerance": "low", "priority": "delicious_flavor_crema"},
        "fast results": {"primary_goal": "potency", "risk_tolerance": "medium", "priority": "proven_active_strength"}
    }

    def process(self, category: str, onboarding_answer: str) -> Dict[str, Any]:
        normalized = onboarding_answer.strip().lower() if onboarding_answer else "beginner friendly"
        
        # Match intent keyword
        matched_intent = self.INTENT_MAPPING.get("beginner friendly")
        for key in self.INTENT_MAPPING:
            if key in normalized:
                matched_intent = self.INTENT_MAPPING[key]
                break

        return {
            "category": category,
            "raw_answer": onboarding_answer,
            "intent_code": matched_intent["primary_goal"],
            "risk_tolerance": matched_intent["risk_tolerance"],
            "priority": matched_intent["priority"],
            "is_first_time": "beginner" in normalized or "easy" in normalized or "gentle" in normalized
        }
