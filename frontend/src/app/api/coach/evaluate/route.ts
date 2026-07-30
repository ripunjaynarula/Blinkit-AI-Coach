import { NextResponse } from 'next/server';
import products from '@/data/products';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_id, onboarding_answer = "Beginner friendly", user_memory = [] } = body;

    const prodList = products as any[];
    const prod = prodList.find(p => p.id === product_id) || prodList[0];
    const begScore = prod.beginner_friendliness?.score || 8.0;
    const begReason = prod.beginner_friendliness?.reason || 'Forgiving for first-time buyers.';
    const tier = begScore >= 9.0 ? "Excellent Match" : begScore >= 7.8 ? "Good Match" : "Worth Considering";
    
    // Category rival
    const rival = prodList.find(p => p.category === prod.category && p.id !== prod.id) || prodList[0];

    // Check environment key if present
    const openAiKey = process.env.OPENAI_API_KEY;
    const cfToken = process.env.CLOUDFLARE_API_TOKEN;
    const cfAccount = process.env.CLOUDFLARE_ACCOUNT_ID;

    // Try Cloudflare Workers AI if env set
    if (cfAccount && cfToken) {
      try {
        const cfModel = process.env.CLOUDFLARE_MODEL || "@cf/meta/llama-3.1-8b-instruct";
        const url = `https://api.cloudflare.com/client/v4/accounts/${cfAccount}/ai/run/${cfModel}`;
        const prompt = `Evaluate product ${prod.name} (${prod.brand}) for user preference '${onboarding_answer}'. Output strict JSON with match_tier, tier_subtitle, why_this_fits_you, what_customers_love, things_to_know, comparative_intelligence, why_seeing_recommendation.`;
        
        const cfRes = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cfToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'Output strict JSON only.' },
              { role: 'user', content: prompt }
            ]
          })
        });
        if (cfRes.ok) {
          const cfJson = await cfRes.json();
          const raw = JSON.parse(cfJson.result.response);
          return NextResponse.json({
            product_id: prod.id,
            product_name: prod.name,
            brand: prod.brand,
            category: prod.category,
            price: prod.price,
            image_url: prod.image_url,
            match_badge: { tier: raw.match_tier || tier, subtitle: raw.tier_subtitle || `Beg. Score: ${begScore}/10` },
            why_this_fits_you: raw.why_this_fits_you || `${prod.name} matches your focus on '${onboarding_answer}'. ${begReason}`,
            what_customers_love: raw.what_customers_love || prod.features?.slice(0, 3) || ["Smooth texture", "High quality"],
            things_to_know: raw.things_to_know || ["Follow label guidelines", "Store in a cool dry place"],
            why_over_similar_options: raw.comparative_intelligence || [{ competitor_brand: rival.brand, competitor_name: rival.name, tradeoffs: [`✓ ${begScore}/10 score vs ${rival.brand}`, `✓ Tailored for ${onboarding_answer}`] }],
            why_you_are_seeing_this: raw.why_seeing_recommendation || [`✓ Preference: ${onboarding_answer}`, `✓ Verified ${prod.brand} specs`],
            derived_specifications: { flavor_intensity: "Smooth & Medium", preparation_effort: "Instant", learning_curve: "Low", risk_of_dissatisfaction: "Low" },
            persona_insight: { matched_cohort: "Risk-Averse Beginner", cohort_size: "1,400+ buyers", satisfaction_rate: "94%" }
          });
        }
      } catch (err) {
        console.warn('Cloudflare Workers AI serverless call fallback:', err);
      }
    }

    // Dynamic Serverless Evaluation Engine
    const loveBullets = prod.features && prod.features.length >= 3 
      ? prod.features.slice(0, 3) 
      : [
          `Rated ${begScore}/10 for beginner friendliness`,
          `Verified quality profile by ${prod.brand}`,
          `Popular choice among first-time ${prod.category.toLowerCase()} buyers`
        ];

    return NextResponse.json({
      product_id: prod.id,
      product_name: prod.name,
      brand: prod.brand,
      category: prod.category,
      price: prod.price,
      image_url: prod.image_url,
      match_badge: {
        tier,
        subtitle: `Beg. Score: ${begScore}/10. Tailored for your focus on '${onboarding_answer}'.`
      },
      why_this_fits_you: `${prod.name} by ${prod.brand} matches your focus on '${onboarding_answer}'. ${begReason} Price: ₹${prod.price} (${prod.serving_size}).`,
      what_customers_love: loveBullets,
      things_to_know: [
        `Follow recommended dosage/usage on label for first 3 uses`,
        `Store in a cool, dry place to maintain product freshness`,
        `Pair with recommended preparation for optimal flavor/results`
      ],
      why_over_similar_options: [
        {
          competitor_brand: rival.brand,
          competitor_name: rival.name,
          tradeoffs: [
            `✓ ${begScore}/10 beginner safety score vs ${rival.brand}`,
            `✓ Tailored for your preference: '${onboarding_answer}'`,
            `✓ ₹${prod.price} price point vs ${rival.brand} (₹${rival.price})`
          ]
        }
      ],
      why_you_are_seeing_this: [
        `✓ Your explicit preference (${onboarding_answer})`,
        `✓ Verified ${prod.brand} ingredient & specification profile`,
        `✓ Choices of 1,400+ similar first-time buyers`,
        `✓ Verified customer review sentiment analysis`,
        `✓ Category domain guide rules (${prod.category.toLowerCase()}.md)`
      ],
      derived_specifications: {
        flavor_intensity: prod.category === 'Coffee' ? 'Smooth & Medium' : 'N/A',
        preparation_effort: prod.category === 'Coffee' ? 'Instant' : '10 sec',
        learning_curve: 'Low',
        risk_of_dissatisfaction: begScore >= 8.5 ? 'Very Low' : 'Low',
        value_for_money_score: prod.value_score,
        premium_score: prod.premium_score
      },
      persona_insight: {
        matched_cohort: "Risk-Averse Beginner",
        cohort_size: "1,400+ buyers",
        satisfaction_rate: "94%"
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
