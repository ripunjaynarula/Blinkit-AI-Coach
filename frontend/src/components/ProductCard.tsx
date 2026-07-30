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
    <div className="bg-white rounded-2xl border border-gray-100 p-3.5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group relative">
      {/* Beginner Badge */}
      {begScore >= 9.0 && (
        <div className="absolute top-3 left-3 z-10 bg-blinkit-green-light border border-blinkit-green/30 text-blinkit-green text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <span>Top Beginner Choice</span>
        </div>
      )}

      {/* Product Image */}
      <div 
        onClick={() => onOpenCoach(product)}
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 cursor-pointer group-hover:scale-[1.02] transition-transform"
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Hover AI Prompt */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
          <span className="bg-white text-blinkit-green text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blinkit-green" />
            Buy with Confidence
          </span>
        </div>
      </div>

      {/* Info */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span className="font-semibold text-blinkit-green">{product.brand}</span>
          <span className="flex items-center gap-1 text-amber-500 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {product.rating} ({product.review_count})
          </span>
        </div>

        <h3 
          onClick={() => onOpenCoach(product)}
          className="font-bold text-gray-900 text-sm line-clamp-2 cursor-pointer hover:text-blinkit-green transition-colors mb-1.5 leading-snug"
        >
          {product.name}
        </h3>

        <div className="text-[11px] text-gray-500 mb-3">
          {product.serving_size}
        </div>
      </div>

      {/* Price & Action */}
      <div className="pt-2 border-t border-gray-50 flex items-center justify-between gap-2">
        <div>
          <span className="text-xs text-gray-400 block -mb-0.5">Price</span>
          <span className="text-base font-extrabold text-gray-900">₹{product.price}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenCoach(product)}
            title="Open AI Shopping Guide"
            className="p-2 rounded-xl bg-blinkit-yellow-light text-gray-900 hover:bg-blinkit-yellow border border-blinkit-yellow/50 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-gray-900" />
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all active:scale-95 border ${
              isInCart
                ? 'bg-blinkit-green text-white border-blinkit-green'
                : 'bg-white text-blinkit-green border-blinkit-green hover:bg-blinkit-green hover:text-white'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
