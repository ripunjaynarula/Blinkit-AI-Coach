'use client';

import { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-blinkit-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-gray-100 space-y-4">
        <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h2 className="text-xl font-extrabold text-gray-900">Something went wrong</h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          {error.message || 'An unexpected error occurred in the Blinkit AI Shopping Coach UI.'}
        </p>

        <button
          onClick={() => reset()}
          className="w-full bg-blinkit-green hover:bg-blinkit-green-dark text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all shadow-md active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
