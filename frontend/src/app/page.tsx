'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CategoryPills } from '@/components/CategoryPills';
import { ProductGrid } from '@/components/ProductGrid';
import { BottomSheet } from '@/components/BottomSheet';
import { BuyWithConfidence } from '@/components/BuyWithConfidence';
import { StickyCart } from '@/components/StickyCart';
import { fetchProducts, evaluateProductWithAI, Product, EvaluateResponse } from '@/lib/api';
import { CartItem, MemoryItem, getInitialMemory } from '@/lib/store';
import { ShieldCheck, Sparkles, Coffee, Dumbbell, X, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // AI Coach Sheet state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [aiData, setAiData] = useState<EvaluateResponse | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [activePreference, setActivePreference] = useState<string>('Beginner friendly');

  // AI Memory state
  const [userMemories, setUserMemories] = useState<MemoryItem[]>(getInitialMemory());
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState<boolean>(false);

  // Fetch products
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts(activeCategory, searchQuery);
      setProducts(data);
    };
    loadData();
  }, [activeCategory, searchQuery]);

  // Trigger AI Coach evaluation when product is selected or preference changes
  useEffect(() => {
    if (selectedProduct) {
      setAiData(null);
      const runAiPipeline = async () => {
        setIsAiLoading(true);
        const response = await evaluateProductWithAI(
          selectedProduct.id,
          activePreference,
          userMemories
        );
        setAiData(response);
        setIsAiLoading(false);
      };
      runAiPipeline();
    }
  }, [selectedProduct, activePreference, userMemories]);

  // Handle Cart Operations
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Handle Save Memory
  const handleSaveMemory = (memory: Omit<MemoryItem, 'id' | 'date'>) => {
    setUserMemories((prev) => {
      const filtered = prev.filter((m) => m.product_id !== memory.product_id);
      return [
        ...filtered,
        {
          ...memory,
          id: `mem-${Date.now()}`,
          date: new Date().toISOString().split('T')[0]
        }
      ];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartProductIds = cart.map((item) => item.product.id);

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Top Header with Integrated Category Bar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        onOpenCart={() => {}}
        onOpenMemory={() => setIsMemoryModalOpen(true)}
        memoryCount={userMemories.length}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Hero Banner Introducing "Buy with Confidence" */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        <div className="bg-gradient-to-r from-emerald-900 via-blinkit-green to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blinkit-yellow">
              <ShieldCheck className="w-4 h-4 fill-blinkit-yellow text-gray-900" />
              <span>BLINKIT AI COACH</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Buy from unfamiliar categories with 100% Confidence.
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
              Hesitating on your first coffee bean, whey protein, or active skin serum? Blinkit AI answers <strong className="text-white">&quot;Is this the right product for me?&quot;</strong> before you order.
            </p>

            {/* Category Quick Chips */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button onClick={() => setActiveCategory('Coffee')} className="bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors">
                <Coffee className="w-3.5 h-3.5 text-blinkit-yellow" />
                <span>18 Coffee Roasts</span>
              </button>

              <button onClick={() => setActiveCategory('Protein Powder')} className="bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors">
                <Dumbbell className="w-3.5 h-3.5 text-blinkit-yellow" />
                <span>18 Protein Powders</span>
              </button>

              <button onClick={() => setActiveCategory('Skincare')} className="bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-blinkit-yellow" />
                <span>18 Active Skincare</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              {activeCategory ? `${activeCategory} Products` : 'All Featured Products'}
            </h2>
            <p className="text-xs text-gray-500">Showing {products.length} products with verified AI evaluation metadata</p>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          onOpenCoach={(product) => {
            setSelectedProduct(product);
          }}
          onAddToCart={handleAddToCart}
          cartProductIds={cartProductIds}
        />
      </main>

      {/* Mobile-Native Bottom Sheet for "Buy with Confidence" */}
      <BottomSheet
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title="Blinkit AI Coach"
        subtitle="Buy with Confidence • Powered by Multi-Agent Architecture"
      >
        {selectedProduct && (
          <BuyWithConfidence
            product={selectedProduct}
            aiData={aiData}
            isLoading={isAiLoading}
            activePreference={activePreference}
            onSelectPreference={(pref) => setActivePreference(pref)}
            userMemories={userMemories}
            onSaveMemory={handleSaveMemory}
            onAddToCart={handleAddToCart}
            isInCart={cartProductIds.includes(selectedProduct.id)}
          />
        )}
      </BottomSheet>

      {/* AI Memory Drawer Modal */}
      {isMemoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blinkit-green" />
                <h3 className="font-extrabold text-gray-900 text-lg">My AI Memory Profile</h3>
              </div>
              <button onClick={() => setIsMemoryModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Blinkit AI stores your past ratings and preferences to continuously customize &quot;Buy with Confidence&quot; match scores across all categories.
            </p>

            {userMemories.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl">
                <p className="text-xs text-gray-500">No past feedback saved yet. Open any product and rate it to build your AI memory!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {userMemories.map((mem) => (
                  <div key={mem.id} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{mem.product_name}</h4>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {mem.tags.map((t) => (
                          <span key={t} className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-lg text-gray-600 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0">
                      {mem.rating === 'loved' && (
                        <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> Loved
                        </span>
                      )}
                      {mem.rating === 'okay' && (
                        <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-xl">
                          Okay
                        </span>
                      )}
                      {mem.rating === 'avoid' && (
                        <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                          <ThumbsDown className="w-3 h-3" /> Avoid
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky Bottom Cart Bar */}
      <StickyCart
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}
