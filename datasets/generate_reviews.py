import json
import random

# Load products
with open("datasets/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

REVIEW_TEMPLATES = {
    "Coffee": [
        {"comment": "I was hesitant buying this instant coffee because I usually find instant coffee bitter, but this one is incredibly smooth! Makes my morning latte so easy.", "rating": 5, "exp": "Beginner", "tags": ["ease_of_use", "smooth_taste"], "sent": "positive"},
        {"comment": "Great aroma when opening the jar. Doesn't leave a sour aftertaste in milk. Has become my daily go-to cup.", "rating": 5, "exp": "Intermediate", "tags": ["aroma", "repeat_buy"], "sent": "positive"},
        {"comment": "As a beginner to black coffee, this was surprisingly pleasant. Not overly acidic or burnt tasting.", "rating": 4, "exp": "Beginner", "tags": ["beginner_friendly", "low_acidity"], "sent": "positive"},
        {"comment": "Bit on the pricier side compared to basic instant, but the freeze-dried granules make a noticeable quality difference.", "rating": 4, "exp": "Intermediate", "tags": ["quality", "value_for_money"], "sent": "positive"},
        {"comment": "If you add too much water it gets a bit thin, so stick to 1 tsp for a mug. Otherwise great flavor.", "rating": 4, "exp": "Beginner", "tags": ["beginner_confusion", "preparation"], "sent": "mixed"},
        {"comment": "Takes 10 seconds to prepare. Saves me 200 bucks daily compared to ordering from cafes.", "rating": 5, "exp": "Beginner", "tags": ["convenience", "savings"], "sent": "positive"},
        {"comment": "Strong kick! Exactly what I needed for late night work shifts. Blends nicely with cold milk too.", "rating": 5, "exp": "Expert", "tags": ["strong_caffeine", "versatility"], "sent": "positive"},
        {"comment": "Slightly less punchy if you like ultra-dark bitter coffee, but for mild drinkers it is ideal.", "rating": 4, "exp": "Intermediate", "tags": ["flavor_profile"], "sent": "positive"},
        {"comment": "First time trying this brand. Packaging was super sturdy and granules dissolve instantly in cold milk.", "rating": 5, "exp": "Beginner", "tags": ["packaging", "dissolvability"], "sent": "positive"},
        {"comment": "Found it a little too mild when mixed with heavy cream, but with normal toned milk it's spot on.", "rating": 4, "exp": "Beginner", "tags": ["recipe_fit"], "sent": "mixed"},
        {"comment": "Solid everyday coffee. Reordered 3 times already.", "rating": 5, "exp": "Intermediate", "tags": ["repeat_buy"], "sent": "positive"},
        {"comment": "Good quality coffee. Not bitter at all.", "rating": 5, "exp": "Beginner", "tags": ["quality"], "sent": "positive"}
    ],
    "Protein Powder": [
        {"comment": "As someone who usually gets severe bloating from protein shakes, this one was a game changer! Zero stomach discomfort.", "rating": 5, "exp": "Beginner", "tags": ["digestibility", "no_bloating"], "sent": "positive"},
        {"comment": "Mixes in 10 seconds in a basic shaker without forming any annoying lumps. Chocolate flavor tastes genuine.", "rating": 5, "exp": "Intermediate", "tags": ["mixability", "taste"], "sent": "positive"},
        {"comment": "I was confused about how many scoops to take per day as a beginner. Once I stuck to 1 scoop after workout, recovery improved fast.", "rating": 4, "exp": "Beginner", "tags": ["beginner_confusion", "dosage"], "sent": "mixed"},
        {"comment": "Slightly sweet if mixed in only 200ml water, but with 300ml cold water or toned milk it tastes like a café shake.", "rating": 4, "exp": "Beginner", "tags": ["sweetness_level", "recipe_fit"], "sent": "positive"},
        {"comment": "High protein yield per serving and verified lab quality. Gives me consistent muscle recovery post workout.", "rating": 5, "exp": "Expert", "tags": ["protein_yield", "recovery"], "sent": "positive"},
        {"comment": "Worth the price point. No heavy aftertaste or synthetic chemical smell.", "rating": 5, "exp": "Intermediate", "tags": ["quality_signals", "flavor"], "sent": "positive"},
        {"comment": "My stomach adapted within 2 days. Very light on digestion.", "rating": 5, "exp": "Beginner", "tags": ["digestibility"], "sent": "positive"},
        {"comment": "If you use hot water it will clump (always use room temp or cold water!). Great product overall.", "rating": 4, "exp": "Beginner", "tags": ["beginner_confusion", "preparation"], "sent": "mixed"},
        {"comment": "Third tub buying this. High trust brand.", "rating": 5, "exp": "Intermediate", "tags": ["repeat_buy", "brand_trust"], "sent": "positive"},
        {"comment": "Decent value for money. Helps meet daily protein targets easily.", "rating": 4, "exp": "Beginner", "tags": ["value_for_money"], "sent": "positive"},
        {"comment": "Scoop was buried at the bottom of tub, but powder quality is 10/10.", "rating": 4, "exp": "Beginner", "tags": ["packaging"], "sent": "positive"},
        {"comment": "Good clean profile. Does not cause acne breakouts.", "rating": 5, "exp": "Intermediate", "tags": ["skin_safe", "clean_label"], "sent": "positive"}
    ],
    "Skincare": [
        {"comment": "I have extremely sensitive skin and was terrified of trying new products, but this didn't cause any stinging or redness at all!", "rating": 5, "exp": "Beginner", "tags": ["sensitive_skin", "no_irritation"], "sent": "positive"},
        {"comment": "Repaired my damaged skin barrier in less than a week. No fragrance, no gimmicks.", "rating": 5, "exp": "Intermediate", "tags": ["barrier_repair", "fragrance_free"], "sent": "positive"},
        {"comment": "First 3 days I noticed minor tiny bumps (purge), but by week 2 my skin became significantly clearer and smoother.", "rating": 4, "exp": "Beginner", "tags": ["purging_vs_breakout", "patience_needed"], "sent": "mixed"},
        {"comment": "Extremely lightweight! Absorbs in 5 seconds and leaves zero sticky or oily layer behind.", "rating": 5, "exp": "Beginner", "tags": ["texture", "fast_absorption"], "sent": "positive"},
        {"comment": "Dermatologist recommended this to me. Cleared my active pimples without drying out my face.", "rating": 5, "exp": "Expert", "tags": ["derm_recommended", "acne_control"], "sent": "positive"},
        {"comment": "Great under makeup or sunscreen. Doesn't cause pilling.", "rating": 5, "exp": "Intermediate", "tags": ["layering", "no_pilling"], "sent": "positive"},
        {"comment": "Be sure to apply on slightly damp skin for best results! A little goes a long way.", "rating": 4, "exp": "Beginner", "tags": ["application_tip", "beginner_friendly"], "sent": "positive"},
        {"comment": "Simple bottle packaging. Very effective daily essential.", "rating": 5, "exp": "Beginner", "tags": ["daily_staple"], "sent": "positive"},
        {"comment": "Did not clog my pores or cause blackheads. Very gentle.", "rating": 5, "exp": "Intermediate", "tags": ["non_comedogenic"], "sent": "positive"},
        {"comment": "Repurchasing for the 4th time. Can't live without it in my routine.", "rating": 5, "exp": "Intermediate", "tags": ["repeat_buy"], "sent": "positive"},
        {"comment": "Noticeable improvement in skin hydration and softness after 5 days.", "rating": 5, "exp": "Beginner", "tags": ["hydration", "visible_results"], "sent": "positive"},
        {"comment": "Value for money product. High concentration that actually works.", "rating": 5, "exp": "Intermediate", "tags": ["value_for_money"], "sent": "positive"}
    ]
}

reviews = []
review_id_counter = 1

for p in products:
    cat = p["category"]
    templates = REVIEW_TEMPLATES.get(cat, REVIEW_TEMPLATES["Coffee"])
    
    # Generate 12-14 reviews per product
    num_reviews = random.randint(12, 14)
    selected = random.choices(templates, k=num_reviews)
    
    for i, t in enumerate(selected):
        reviews.append({
            "id": f"rev-{review_id_counter:04d}",
            "product_id": p["id"],
            "author": f"Verified Shopper #{random.randint(100, 999)}",
            "rating": t["rating"],
            "date": f"2026-06-{random.randint(1, 28):02d}",
            "comment": t["comment"],
            "user_experience": t["exp"],
            "tags": t["tags"],
            "sentiment": t["sent"]
        })
        review_id_counter += 1

with open("datasets/reviews.json", "w", encoding="utf-8") as f:
    json.dump(reviews, f, indent=2)

print(f"Generated {len(reviews)} realistic reviews for {len(products)} products.")
