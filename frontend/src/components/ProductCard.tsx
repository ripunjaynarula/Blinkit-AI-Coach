'use client';

import React from 'react';
import { Star, ShieldCheck, Plus, Check } from 'lucide-react';
import { Product } from '../lib/api';

interface ProductCardProps {
  product: Product;
  onOpenCoach: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenCoach,
  onAddToCart,
  isInCart
}) => {
  const begScore = product.beginner_friendliness?.score || 8.0;
  
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3.5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group relative overflow-hidden h-full">
      {/* Beginner Badge */}
      {begScore >= 9.0 && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-blinkit-green-light border border-blinkit-green/30 text-blinkit-green text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <span>Top Beginner Choice</span>
        </div>
      )}

      {/* Product Image */}
      <div 
        onClick={() => onOpenCoach(product)}
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2 sm:mb-3 cursor-pointer group-hover:scale-[1.02] transition-transform"
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Hover AI Prompt */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
          <span className="bg-white text-blinkit-green text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-lg flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blinkit-green shrink-0" />
            <span>Buy with Confidence</span>
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between mb-2">
        <div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-400 mb-1">
            <span className="font-semibold text-blinkit-green truncate mr-1">{product.brand}</span>
            <span className="flex items-center gap-0.5 text-amber-500 font-medium shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              {product.rating} ({product.review_count})
            </span>
          </div>

          <h3 
            onClick={() => onOpenCoach(product)}
            className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 cursor-pointer hover:text-blinkit-green transition-colors mb-1 leading-snug"
          >
            {product.name}
          </h3>
        </div>

        <div className="text-[10px] sm:text-[11px] text-gray-500 truncate">
          {product.serving_size}
        </div>
      </div>

      {/* Price & Action */}
      <div className="pt-2 border-t border-gray-50 flex items-center justify-between gap-1 min-w-0">
        <div className="min-w-0 flex-1">
          <span className="text-[9px] sm:text-[10px] text-gray-400 block -mb-0.5 leading-none">Price</span>
          <span className="text-xs sm:text-base font-extrabold text-gray-900 truncate block">₹{product.price}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onOpenCoach(product)}
            title="Open AI Decision Assistant"
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-blinkit-yellow-light text-gray-900 hover:bg-blinkit-yellow border border-blinkit-yellow/50 transition-colors shrink-0"
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-900" />
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-1 transition-all active:scale-95 border shrink-0 ${
              isInCart
                ? 'bg-blinkit-green text-white border-blinkit-green'
                : 'bg-white text-blinkit-green border-blinkit-green hover:bg-blinkit-green hover:text-white'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
