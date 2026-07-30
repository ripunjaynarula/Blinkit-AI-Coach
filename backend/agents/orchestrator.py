import logging
from typing import Dict, Any, List
from backend.data_loader import data_loader
from backend.agents.worker_intent import Worker1IntentDetection
from backend.agents.worker_user import Worker2UserUnderstanding
from backend.agents.worker_product import Worker3ProductIntelligence
from backend.agents.worker_reviews import Worker4ReviewIntelligence
from backend.agents.worker_alternatives import Worker5AlternativeFinder
from backend.agents.worker_behavior import Worker6BehaviorMatching
from backend.agents.worker_reasoning import Worker7DecisionReasoning
from backend.agents.worker_composer import Worker8ResponseComposer

logger = logging.getLogger(__name__)

class MultiAgentOrchestrator:
    def __init__(self):
        self.w1_intent = Worker1IntentDetection()
        self.w2_user = Worker2UserUnderstanding()
        self.w3_product = Worker3ProductIntelligence()
        self.w4_reviews = Worker4ReviewIntelligence()
        self.w5_alternatives = Worker5AlternativeFinder()
        self.w6_behavior = Worker6BehaviorMatching()
        self.w7_reasoning = Worker7DecisionReasoning()
        self.w8_composer = Worker8ResponseComposer()

    def evaluate_product(
        self,
        product_id: str,
        onboarding_answer: str = "Beginner friendly",
        user_memory: List[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        if user_memory is None:
            user_memory = []

        product = data_loader.get_product(product_id)
        if not product:
            raise ValueError(f"Product with id '{product_id}' not found.")

        category = product["category"]
        reviews = data_loader.get_reviews_for_product(product_id)
        all_cat_products = data_loader.get_products_by_category(category)
        domain_kb = data_loader.get_knowledge_for_category(category)

        # Worker 1: Intent Detection
        intent_out = self.w1_intent.process(category, onboarding_answer)

        # Worker 2: User Understanding & Memory
        user_out = self.w2_user.process(intent_out, user_memory)

        # Worker 3: Product Intelligence & Spec Derivations
        product_out = self.w3_product.process(product)

        # Worker 4: Review Intelligence
        reviews_out = self.w4_reviews.process(reviews)

        # Worker 5: Alternative Finder (Deterministic)
        alternatives_out = self.w5_alternatives.process(product, all_cat_products)

        # Worker 6: Persona Behavior Matching
        behavior_out = self.w6_behavior.process(user_out, data_loader.personas, category)

        # Worker 7: Decision & Comparative Reasoning (Main LLM)
        reasoning_out = self.w7_reasoning.process(
            user_profile=user_out,
            product_specs=product_out,
            review_intel=reviews_out,
            alternatives=alternatives_out,
            persona_match=behavior_out,
            domain_knowledge=domain_kb
        )

        # Worker 8: Response Composer
        final_ui_payload = self.w8_composer.process(
            product=product,
            derived_specs=product_out,
            reasoning_output=reasoning_out,
            persona_match=behavior_out
        )

        return final_ui_payload

orchestrator = MultiAgentOrchestrator()
