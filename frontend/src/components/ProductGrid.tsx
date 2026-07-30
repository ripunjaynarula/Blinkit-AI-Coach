'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../lib/api';

interface ProductGridProps {
  products: Product[];
  onOpenCoach: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartProductIds: string[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onOpenCoach,
  onAddToCart,
  cartProductIds
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 max-w-lg mx-auto my-12 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
        <p className="text-sm text-gray-500">Try refining your search terms or selecting a different category pill above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onOpenCoach={onOpenCoach}
          onAddToCart={onAddToCart}
          isInCart={cartProductIds.includes(p.id)}
        />
      ))}
    </div>
  );
};
