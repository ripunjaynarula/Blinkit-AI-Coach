import { Product } from './api';

export interface MemoryItem {
  id: string;
  product_id: string;
  product_name: string;
  rating: 'loved' | 'okay' | 'avoid';
  tags: string[];
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Initial state getters
export function getInitialMemory(): MemoryItem[] {
  return [
    {
      id: 'mem-1',
      product_id: 'coff-01',
      product_name: 'Nescafé Classic Instant',
      rating: 'loved',
      tags: ['Smooth', 'Instant Prep'],
      date: '2026-07-20'
    }
  ];
}
