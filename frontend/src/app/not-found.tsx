import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-blinkit-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-gray-100 space-y-4">
        <div className="w-14 h-14 bg-emerald-100 text-blinkit-green rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-gray-900">404 - Page Not Found</h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          The product category or page you are looking for does not exist on Blinkit AI Shopping Coach.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-blinkit-green hover:bg-blinkit-green-dark text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blinkit Store</span>
        </Link>
      </div>
    </div>
  );
}
