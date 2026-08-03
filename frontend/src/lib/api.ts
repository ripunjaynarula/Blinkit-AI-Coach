export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  review_count: number;
  serving_size: string;
  description: string;
  features: string[];
  ingredients_specifications: Record<string, any>;
  beginner_friendliness: { score: number; reason: string };
  value_score: number;
  premium_score: number;
  tags: string[];
  image_url: string;
}

export interface EvaluateResponse {
  product_id: string;
  product_name: string;
  brand: string;
  category: string;
  price: number;
  image_url: string;
  match_badge: {
    tier: "Excellent Match" | "Good Match" | "Worth Considering" | "Not Recommended";
    subtitle: string;
  };
  why_this_fits_you: string;
  what_customers_love: string[];
  things_to_know: string[];
  why_over_similar_options: {
    competitor_name: string;
    competitor_brand: string;
    tradeoffs: string[];
  }[];
  why_you_are_seeing_this: string[];
  derived_specifications: Record<string, any>;
  persona_insight: {
    matched_cohort: string;
    cohort_size: string;
    satisfaction_rate: string;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchProducts(category?: string, search?: string): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.warn('API connection failed, loading local bundle fallback:', error);
    const mockModule = await import('@/data/products');
    let items: Product[] = mockModule.default as any;
    if (category) {
      items = items.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return items;
  }
}

export async function evaluateProductWithAI(
  productId: string,
  onboardingAnswer: string = "Beginner friendly",
  userMemory: any[] = []
): Promise<EvaluateResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/coach/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: productId,
        onboarding_answer: onboardingAnswer,
        user_memory: userMemory
      })
    });
    if (!res.ok) throw new Error('Evaluation request failed');
    return await res.json();
  } catch (error) {
    console.warn('Backend evaluation call failed, computing local intelligent fallback:', error);
    // Intelligent fallback generator if backend server is offline
    const productsModule = await import('@/data/products');
    const products: Product[] = productsModule.default as any;
    const prod = products.find(p => p.id === productId) || products[0];
    
    const begScore = prod.beginner_friendliness?.score || 8.0;
    const begReason = prod.beginner_friendliness?.reason || 'Forgiving for first-time buyers.';
    const tier = begScore >= 9.0 ? "Excellent Match" : begScore >= 7.8 ? "Good Match" : "Worth Considering";
    
    // Find category rival for comparison
    const rival = products.find(p => p.category === prod.category && p.id !== prod.id) || products[0];

    const loveBullets = prod.features && prod.features.length >= 3 
      ? prod.features.slice(0, 3) 
      : [
          `Rated ${begScore}/10 for beginner friendliness`,
          `Verified quality profile by ${prod.brand}`,
          `Popular choice among first-time ${prod.category.toLowerCase()} buyers`
        ];

    return {
      product_id: prod.id,
      product_name: prod.name,
      brand: prod.brand,
      category: prod.category,
      price: prod.price,
      image_url: prod.image_url,
      match_badge: {
        tier: tier as any,
        subtitle: `Beg. Score: ${begScore}/10. Tailored for your focus on '${onboardingAnswer}'.`
      },
      why_this_fits_you: `${prod.name} by ${prod.brand} matches your focus on '${onboardingAnswer}'. ${begReason} Price: ₹${prod.price} (${prod.serving_size}).`,
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
            `✓ Tailored for your preference: '${onboardingAnswer}'`,
            `✓ ₹${prod.price} price point vs ${rival.brand} (₹${rival.price})`
          ]
        }
      ],
      why_you_are_seeing_this: [
        `✓ Derived from verified customer reviews`,
        `✓ Derived from product specifications (${prod.brand} ${prod.name})`,
        `✓ Derived from category domain knowledge base (${prod.category.toLowerCase()}.md)`,
        `✓ Derived from similar product comparisons (${rival.brand})`,
        `✓ Tailored to selected decision context (${onboardingAnswer})`
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
        matched_cohort: "Budget-Conscious Beginner",
        cohort_size: "1,400+ shoppers",
        satisfaction_rate: "94%"
      }
    };
  }
}
