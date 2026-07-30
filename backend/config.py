import os
from pathlib import Path
from dotenv import load_dotenv

# Root Directory & Single Central .env File
BASE_DIR = Path(__file__).resolve().parent.parent
ROOT_ENV_PATH = BASE_DIR / ".env"

# Load environment variables strictly from single root .env
load_dotenv(dotenv_path=ROOT_ENV_PATH)

DATA_DIR = BASE_DIR / "datasets"
PRODUCTS_PATH = DATA_DIR / "products.json"
REVIEWS_PATH = DATA_DIR / "reviews.json"
PERSONAS_PATH = DATA_DIR / "personas.json"
KNOWLEDGE_DIR = DATA_DIR / "knowledge"

# Global AI Workers Engine Mode
AI_WORKERS_MODE = os.getenv("AI_WORKERS_MODE", "auto")

# 1. Cloudflare Workers AI Settings
CLOUDFLARE_ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID", "")
CLOUDFLARE_API_TOKEN = os.getenv("CLOUDFLARE_API_TOKEN", "")
CLOUDFLARE_MODEL = os.getenv("CLOUDFLARE_MODEL", "@cf/meta/llama-3.1-8b-instruct")

# 2. OpenAI API Settings
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

# 3. Google Gemini Settings
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

# Individual AI Worker Models Routing
WORKER_1_INTENT_MODEL = os.getenv("WORKER_1_INTENT_MODEL", CLOUDFLARE_MODEL)
WORKER_2_USER_MODEL = os.getenv("WORKER_2_USER_MODEL", CLOUDFLARE_MODEL)
WORKER_3_PRODUCT_MODEL = os.getenv("WORKER_3_PRODUCT_MODEL", CLOUDFLARE_MODEL)
WORKER_4_REVIEWS_MODEL = os.getenv("WORKER_4_REVIEWS_MODEL", CLOUDFLARE_MODEL)
WORKER_5_ALTERNATIVES_MODEL = os.getenv("WORKER_5_ALTERNATIVES_MODEL", CLOUDFLARE_MODEL)
WORKER_6_BEHAVIOR_MODEL = os.getenv("WORKER_6_BEHAVIOR_MODEL", CLOUDFLARE_MODEL)
WORKER_7_REASONING_MODEL = os.getenv("WORKER_7_REASONING_MODEL", CLOUDFLARE_MODEL)
WORKER_8_COMPOSER_MODEL = os.getenv("WORKER_8_COMPOSER_MODEL", CLOUDFLARE_MODEL)

# Fallback mode enabled if no API key present
USE_MOCK_LLM_IF_NO_KEY = True
