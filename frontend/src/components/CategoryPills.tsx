'use client';

import React from 'react';
import { Coffee, Dumbbell, Sparkles, LayoutGrid } from 'lucide-react';

interface CategoryPillsProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  const categories = [
    { id: 'all', name: 'All Categories', icon: LayoutGrid, count: '54 items' },
    { id: 'Coffee', name: 'Coffee', icon: Coffee, count: '18 products' },
    { id: 'Protein Powder', name: 'Protein Powder', icon: Dumbbell, count: '18 products' },
    { id: 'Skincare', name: 'Skincare', icon: Sparkles, count: '18 products' },
  ];

  return (
    <div className="bg-white border-t border-gray-100 py-2 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id === 'all' ? '' : cat.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border shrink-0 ${
                isActive
                  ? 'bg-blinkit-green text-white border-blinkit-green shadow-md shadow-blinkit-green/20 scale-[1.02]'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-blinkit-yellow' : 'text-blinkit-green'}`} />
              <div className="text-left">
                <span className="block leading-tight font-bold text-xs sm:text-sm">{cat.name}</span>
                <span className={`block text-[10px] ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
