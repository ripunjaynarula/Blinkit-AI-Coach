'use client';

import React from 'react';
import { Search, ShoppingCart, ShieldCheck, MapPin, Zap } from 'lucide-react';
import { CategoryPills } from './CategoryPills';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenMemory: () => void;
  memoryCount: number;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  onOpenMemory,
  memoryCount,
  activeCategory,
  onSelectCategory
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Banner */}
      <div className="bg-blinkit-green text-white text-xs py-1.5 px-3 sm:px-4 flex items-center justify-between font-medium">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-blinkit-yellow fill-blinkit-yellow shrink-0" />
          <span className="truncate">Delivery in <b>10 minutes</b></span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="hidden sm:inline font-semibold opacity-95">Blinkit AI Coach • <span className="text-blinkit-yellow">Buy with Confidence</span></span>
          <button 
            onClick={onOpenMemory}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-[11px] font-medium transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-blinkit-yellow shrink-0" />
            <span>AI Memory ({memoryCount})</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="flex items-baseline cursor-pointer">
            <span className="text-xl sm:text-2xl font-extrabold text-blinkit-yellow tracking-tighter">blink</span>
            <span className="text-xl sm:text-2xl font-extrabold text-blinkit-green tracking-tighter">it</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-blinkit-green" />
            <div>
              <span className="font-semibold text-gray-900 block leading-tight">Home - Indiranagar</span>
              <span className="text-[10px] text-gray-500 block leading-tight">Bengaluru, Karnataka</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 min-w-0 max-w-2xl relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coffee, protein, skincare..."
            className="w-full bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 focus:border-blinkit-green rounded-xl pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none transition-all shadow-inner"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 bg-blinkit-green hover:bg-blinkit-green-dark text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">My Cart</span>
            {cartCount > 0 && (
              <span className="bg-blinkit-yellow text-gray-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Pills Bar inside Sticky Header */}
      <CategoryPills
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />
    </header>
  );
};
