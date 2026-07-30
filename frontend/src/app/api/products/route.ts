import { NextResponse } from 'next/server';
import products from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let items = products as any[];

  if (category) {
    items = items.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json(items);
}
