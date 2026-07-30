import json
import logging
import httpx
from typing import Dict, Any, Optional
from backend.config import (
    CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, CLOUDFLARE_MODEL,
    OPENAI_API_KEY, OPENAI_MODEL
)

logger = logging.getLogger(__name__)

class AIWorkerClient:
    """
    Unified AI Worker Client for calling Cloudflare Workers AI or OpenAI APIs
    for any of the 8 logical AI Workers in the architecture.
    """

    @staticmethod
    def call_ai_worker(
        system_prompt: str,
        user_prompt: str,
        model_name: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        
        # 1. Try Cloudflare Workers AI if configured
        if CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN:
            try:
                cf_model = model_name or CLOUDFLARE_MODEL
                url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/{cf_model}"
                headers = {
                    "Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "messages": [
                        {"role": "system", "content": system_prompt + " Output strict JSON format only."},
                        {"role": "user", "content": user_prompt}
                    ]
                }
                with httpx.Client(timeout=12.0) as client:
                    resp = client.post(url, headers=headers, json=payload)
                    resp.raise_for_status()
                    data = resp.json()
                    raw_text = data.get("result", {}).get("response", "")
                    return json.loads(raw_text)
            except Exception as e:
                logger.warning(f"Cloudflare Workers AI worker call failed: {e}")

        # 2. Try OpenAI API if configured
        if OPENAI_API_KEY and len(OPENAI_API_KEY) > 10:
            try:
                from openai import OpenAI
                client = OpenAI(api_key=OPENAI_API_KEY)
                oa_model = OPENAI_MODEL
                response = client.chat.completions.create(
                    model=oa_model,
                    messages=[
                        {"role": "system", "content": system_prompt + " Output strict JSON format only."},
                        {"role": "user", "content": user_prompt}
                    ],
                    response_format={"type": "json_object"}
                )
                return json.loads(response.choices[0].message.content)
            except Exception as e:
                logger.warning(f"OpenAI AI worker call failed: {e}")

        return None
