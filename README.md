# Blinkit Decision Assistant — Buy with Confidence 🚀

> **AI-Native Decision Support System** designed to eliminate buying hesitation when Monthly Active Customers evaluate unfamiliar products on Blinkit.

---

## Source of Truth & Validated Problem

User research and Discovery Engine findings established that:
- Users open Blinkit with **high purchase intent**. Most sessions begin with Search or Buy Again.
- Users **rarely browse unfamiliar categories** and **hesitate** before purchasing unfamiliar products due to insufficient confidence rather than a lack of recommendations.
- Users frequently leave Blinkit to Google, Reddit, or competing apps to research products before making a first purchase.
- **Core Focus**: Confidence before first purchase, NOT product discovery.

---

## Product Vision

Help users confidently make first-time purchases in unfamiliar categories by reducing uncertainty through personalized AI reasoning.

> **Core Question Answered**: *"Is this the right product for me?"*

---

## Why AI?

Traditional recommendation systems optimize for product discovery using popularity, ratings, or collaborative filtering.

However, research showed that the primary barrier is **not discovering products—it is confidently evaluating unfamiliar products**.

This requires AI because the system must:
- **Understand user decision context** (e.g., *First time buying*, *Best value*, *Healthy choice*),
- **Interpret customer review semantics** across sentiment nuances,
- **Reason over structured product attributes** and specifications,
- **Apply category-specific domain knowledge** (acidity vs bitterness, lactose bloating, barrier care),
- **Compare head-to-head alternatives** dynamically,
- **Explain trade-offs in clear natural language**, and
- **Continuously learn from user feedback** memory.

These reasoning tasks cannot be achieved using rule-based recommendation algorithms alone.

---

## Conceptual Product Architecture

```
User Context  +  Product Metadata  +  Review Intelligence  +  Category Knowledge
                                     │
                                     ▼
                           AI Decision Reasoning
                                     │
                                     ▼
                             Decision Guidance
```

- **User Context**: Selected decision context (*First time buying*, *Best value*, *Healthy choice*) + past-purchase memory.
- **Product Metadata**: 54 structured product records (Coffee, Protein Powder, Skincare) with price, serving size, and specs.
- **Review Intelligence**: 703 sentiment-analyzed verified buyer reviews extracting praise & watchouts.
- **Category Knowledge**: Grounded domain guides (`coffee.md`, `protein.md`, `skincare.md`).
- **AI Decision Reasoning**: Multi-agent reasoning synthesizing inputs into qualitative match tiers & trade-offs.
- **Decision Guidance**: Strict 6-step Decision Panel presented in the mobile bottom sheet.

---

## Decision Panel Structure

The mobile slide-up assistant follows a strict 6-part decision order:

1. **Recommendation**: Match Tier (`Excellent Match`, `Good Match`, `Worth Considering`, `Not Recommended`).
2. **Why this recommendation**: Concise personalized reasoning explaining why this tier was assigned.
3. **Supporting Evidence**: Transparent evidence sources (*Derived from verified customer reviews*, *Product specifications*, *Category knowledge base*, *Similar product comparisons*, *Selected decision context*).
4. **Things to Know**: Highlights important trade-offs, potential drawbacks, and customer praise.
5. **Recommended Alternative**: Rendered only when the current product is not the strongest choice (`Not Recommended` or `Worth Considering`).
6. **Ask AI**: Optional follow-up question input with instant AI reasoning.

---

## Traceability Matrix (Research Mapping)

| Visible Feature | Validated Research Finding | Problem Solved |
|---|---|---|
| **Qualitative Match Tier** | Shoppers distrust fake 94% precision scores; qualitative tiers provide clear safety guidance. | Uncertainty Reduction |
| **Decision Context Pills** | Users evaluate products differently depending on purchase intent (*First time buying* vs *Best value*). | Context Alignment |
| **Supporting Evidence Checklist** | Shoppers leave Blinkit to research on Google/Reddit due to lack of source transparency. | Source Trust & Proof |
| **Things to Know (Trade-offs)** | First-time buyers fear hidden surprises (bloating, prep equipment, acid stinging). | Dissatisfaction Risk |
| **Negative Path & Alternatives** | When a product is not ideal, users leave without buying; suggesting a better alternative keeps them in flow. | Bounce Reduction |
| **Ask AI Follow-Up** | Users have specific long-tail questions (*"Is this safe for daily use?"*) before buying. | Information Friction |

---

## Directory Structure

```
blinkit-ai-shopping-coach/
├── frontend/                 # Next.js 14 App Router (UI & Netlify/Vercel Serverless API)
│   ├── netlify.toml          # 1-Click Free Netlify Configuration
│   ├── src/app/api/          # Serverless AI Workers API Routes (/api/coach/evaluate)
│   ├── src/components/       # Decision Panel Components:
│   │   ├── BuyWithConfidence.tsx  # Main Decision Panel
│   │   ├── ContextualGuidanceBar.tsx # Decision Context Pills
│   │   ├── ComparativeCard.tsx    # Recommended Alternative / Trade-offs
│   │   ├── ExplainableCard.tsx    # Supporting Evidence Sources
│   │   ├── AskAIWidget.tsx        # Ask AI Follow-Up Widget
│   │   └── AIMemoryWidget.tsx     # Past-Purchase Feedback Rater
│   └── src/data/             # Product & Review Datasets
├── backend/                  # FastAPI Python Reasoning Engine (Local/Railway)
├── datasets/                 # 54 Products, 703 Reviews, Category Domain Guides
├── .env.example              # Environment Configuration Template
├── .gitignore                # Security Filter
└── README.md                 # Product Management Evaluation Guide
```

---

## Quick Commands

```bash
# 1. Run Automated Test Suite
python -m unittest backend/tests/test_pipeline.py

# 2. Start Backend FastAPI Server (Port 8000)
python -m uvicorn backend.main:app --port 8000 --reload

# 3. Start Frontend Next.js App (Port 3000)
npm run dev
```
