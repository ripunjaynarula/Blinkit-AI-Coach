'use client';

import React from 'react';
import { ShieldCheck, Heart, AlertCircle, ShoppingBag, Sparkles, Check, ShieldAlert } from 'lucide-react';
import { Product, EvaluateResponse } from '@/lib/api';
import { ContextualGuidanceBar } from './ContextualGuidanceBar';
import { ComparativeCard } from './ComparativeCard';
import { ExplainableCard } from './ExplainableCard';
import { AIMemoryWidget } from './AIMemoryWidget';
import { AskAIWidget } from './AskAIWidget';
import { MemoryItem } from '@/lib/store';

interface BuyWithConfidenceProps {
  product: Product;
  aiData: EvaluateResponse | null;
  isLoading: boolean;
  activePreference: string;
  onSelectPreference: (pref: string) => void;
  userMemories: MemoryItem[];
  onSaveMemory: (mem: Omit<MemoryItem, 'id' | 'date'>) => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

export const BuyWithConfidence: React.FC<BuyWithConfidenceProps> = ({
  product,
  aiData,
  isLoading,
  activePreference,
  onSelectPreference,
  userMemories,
  onSaveMemory,
  onAddToCart,
  isInCart
}) => {
  const getBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'Excellent Match':
        return 'bg-gradient-to-r from-blinkit-green to-emerald-800 text-white';
      case 'Good Match':
        return 'bg-gradient-to-r from-emerald-600 to-teal-800 text-white';
      case 'Worth Considering':
        return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white';
      case 'Not Recommended':
        return 'bg-gradient-to-r from-rose-700 to-red-900 text-white';
      default:
        return 'bg-gradient-to-r from-blinkit-green to-emerald-800 text-white';
    }
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Product Summary Header */}
      <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-xl bg-white shrink-0 border border-gray-100"
        />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-blinkit-green uppercase tracking-wide">{product.brand}</div>
          <h3 className="font-extrabold text-gray-900 text-sm leading-snug line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-base font-black text-gray-900">₹{product.price}</span>
            <span className="text-xs text-gray-400">({product.serving_size})</span>
          </div>
        </div>
      </div>

      {/* Decision Context Pills */}
      <ContextualGuidanceBar
        category={product.category}
        activePreference={activePreference}
        onSelectPreference={onSelectPreference}
      />

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-xl w-1/3" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
          <div className="h-20 bg-gray-100 rounded-2xl" />
          <div className="h-24 bg-gray-100 rounded-2xl" />
        </div>
      ) : aiData ? (
        <>
          {/* ================================================================= */}
          {/* 1. RECOMMENDATION (Badge Header) */}
          {/* ================================================================= */}
          <div className={`rounded-2xl p-4 shadow-md relative overflow-hidden ${getBadgeStyle(aiData.match_badge.tier)}`}>
            <div className="absolute right-3 top-3 opacity-10">
              <ShieldCheck className="w-24 h-24 text-white" />
            </div>

            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-blinkit-yellow min-w-0 truncate">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-blinkit-yellow text-gray-900 shrink-0" />
                <span className="truncate">BLINKIT DECISION ASSISTANT</span>
              </div>
              <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-semibold text-white whitespace-nowrap shrink-0 border border-white/20">
                Buy with Confidence
              </span>
            </div>

            <div className="text-xl font-extrabold tracking-tight mb-1 text-white flex items-center gap-2">
              {aiData.match_badge.tier === 'Not Recommended' && (
                <ShieldAlert className="w-6 h-6 text-amber-300 shrink-0" />
              )}
              <span>{aiData.match_badge.tier}</span>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed max-w-lg">
              {aiData.match_badge.subtitle}
            </p>
          </div>

          {/* ================================================================= */}
          {/* 2. WHY THIS RECOMMENDATION */}
          {/* ================================================================= */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
              <Sparkles className="w-4 h-4 text-blinkit-green" />
              <span>Why this recommendation</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              {aiData.why_this_fits_you}
            </p>
          </div>

          {/* ================================================================= */}
          {/* 3. SUPPORTING EVIDENCE */}
          {/* ================================================================= */}
          <ExplainableCard checklist={aiData.why_you_are_seeing_this} />

          {/* ================================================================= */}
          {/* 4. THINGS TO KNOW (Trade-offs & Customer Praise) */}
          {/* ================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Praise */}
            <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 border-b border-emerald-100 pb-2">
                <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Customer praise signals</span>
              </div>
              <ul className="space-y-1.5">
                {aiData.what_customers_love.map((bullet, idx) => (
                  <li key={idx} className="text-xs text-emerald-950 flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Things to Know */}
            <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 border-b border-amber-100 pb-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Things to know & trade-offs</span>
              </div>
              <ul className="space-y-1.5">
                {aiData.things_to_know.map((bullet, idx) => (
                  <li key={idx} className="text-xs text-amber-950 flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 5. RECOMMENDED ALTERNATIVE (Only when appropriate or negative path) */}
          {/* ================================================================= */}
          <ComparativeCard
            currentBrand={product.brand}
            comparisons={aiData.why_over_similar_options}
            matchTier={aiData.match_badge.tier}
          />

          {/* ================================================================= */}
          {/* 6. ASK AI (Optional Follow-Up Questions) */}
          {/* ================================================================= */}
          <AskAIWidget product={product} category={product.category} />

          {/* AI Memory Widget */}
          <AIMemoryWidget
            productName={product.name}
            productId={product.id}
            existingMemories={userMemories}
            onSaveMemory={onSaveMemory}
          />

          {/* Sticky Bottom Action */}
          <div className="sticky bottom-0 pt-4 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs text-gray-400 block">Total Price</span>
              <span className="text-lg font-black text-gray-900">₹{product.price}</span>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                isInCart
                  ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                  : 'bg-blinkit-green hover:bg-blinkit-green-dark text-white shadow-blinkit-green/20'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ADDED TO CART</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART & BUY</span>
                </>
              )}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
