import unittest
from backend.agents.orchestrator import orchestrator
from backend.data_loader import data_loader

class TestMultiAgentPipeline(unittest.TestCase):

    def test_data_loader(self):
        self.assertGreaterEqual(len(data_loader.products), 54)
        self.assertGreaterEqual(len(data_loader.reviews), 600)
        self.assertEqual(len(data_loader.personas), 6)

    def test_evaluate_coffee_product(self):
        product_id = "coff-01"  # Nescafe Classic
        result = orchestrator.evaluate_product(
            product_id=product_id,
            onboarding_answer="Beginner friendly",
            user_memory=[]
        )
        self.assertEqual(result["product_id"], product_id)
        self.assertIn(result["match_badge"]["tier"], ["Excellent Match", "Good Match", "Worth Considering", "Not Recommended"])
        self.assertGreaterEqual(len(result["what_customers_love"]), 3)
        self.assertGreaterEqual(len(result["things_to_know"]), 3)
        self.assertGreaterEqual(len(result["why_over_similar_options"]), 1)
        self.assertEqual(len(result["why_you_are_seeing_this"]), 5)

    def test_evaluate_protein_product(self):
        product_id = "prot-02"  # MuscleBlaze Biozyme
        result = orchestrator.evaluate_product(
            product_id=product_id,
            onboarding_answer="Easy digestion",
            user_memory=[{"product_name": "ON Whey", "rating": "avoid", "tags": ["bloating"]}]
        )
        self.assertEqual(result["product_id"], product_id)
        self.assertIn("Match", result["match_badge"]["tier"])
        self.assertTrue("digestion" in result["why_this_fits_you"].lower() or "bloating" in result["why_this_fits_you"].lower())

    def test_evaluate_skincare_product(self):
        product_id = "skin-01"  # Cetaphil Cleanser
        result = orchestrator.evaluate_product(
            product_id=product_id,
            onboarding_answer="Gentle skin",
            user_memory=[]
        )
        self.assertEqual(result["product_id"], product_id)
        self.assertEqual(result["match_badge"]["tier"], "Excellent Match")

if __name__ == "__main__":
    unittest.main()
